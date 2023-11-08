import {UserController} from "../controllers/UserController.js";
import express from 'express';

const router = express.Router();

const routes = (channel) => {
  const controller = new UserController(channel);

  router.post(`/`, controller.create);
  router.get('/:id', controller.getById);
  router.put('/:id', controller.update);
}

export { routes, router };
