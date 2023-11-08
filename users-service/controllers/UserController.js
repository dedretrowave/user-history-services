import {passwordHash} from "../helpers/passwordHash.js";
import {UserModel} from "../models/UserModel.js";
import autoBind from 'auto-bind';
import {responses} from "../helpers/Response.js";
import {events} from "../helpers/events.js";

export class UserController {
  constructor(mqChannel) {
    this.mqChannel = mqChannel;
    this.model = new UserModel();
    autoBind(this);
    console.log('Controller Loaded');
  }

  async create(req, res) {
    try {
      req.body.password = await passwordHash(req.body.password);

      const existingUser = await this.model.getByEmail(req.body.email);

      if (existingUser) {
        return responses
          .badRequest(res, {
            message: 'User already exists',
          });
      }

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const newUser = await this.model.create(user);

      this.mqChannel.sendToQueue(process.env.RABBITMQ_QUEUE,
        Buffer.from(JSON.stringify({
        event: events.USER_CREATED,
        data: newUser,
      })));
      responses
        .success(res, {
          message: 'User created',
          user,
        })
    } catch (err) {
      console.log(err);

      responses
        .serverError(res, {
        error: err
      });
    }
  }

  async getById(req, res) {
    try {
      const userId = req.params.id;

      const user = await this.model.getById(userId);

      if (!user) {
        responses
          .notFound(res, {
            message: 'User not found',
          })
      } else {
        this.mqChannel.sendToQueue(
          process.env.RABBITMQ_QUEUE,
          Buffer.from(
            JSON.stringify({
              event: events.USER_READ,
              data: user,
            }
            )));

        responses
          .success(res, {
            user,
          })
      }
    } catch(err) {
      console.log(err);
      responses
        .serverError(res, {
          error: err,
        })
    }
  }

  async update(req, res) {
    try {
      const userId = req.params.id;

      const existingUser = await this.model.getById(userId);

      if (!existingUser) {
        return responses
          .notFound(res, {
            message: 'User Not Found'
          })
      }

      const updatedUser = await this.model.update(userId, req.body);

      this.mqChannel.sendToQueue(process.env.RABBITMQ_QUEUE,
        Buffer.from(JSON.stringify({
        event: events.USER_UPDATED,
        data: updatedUser
      })));

      return responses
        .success(res, {
          message: 'User updated!',
          data: updatedUser,
        });
    } catch(err) {
      console.log(err);

      responses
        .serverError(res, {
          message: 'User Update failed',
        })
    }
  }
}