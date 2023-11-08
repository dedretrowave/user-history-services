import { HistoryController } from "../controllers/HistoryController";
import express, {Router} from 'express';
import {Channel, Connection, Message} from "amqplib";
import {HistoryData} from "../models/HistoryModel";

const router: Router = express.Router();

const routes = (channel: Channel, connection: Connection): void => {
  const controller = new HistoryController();

  channel.consume(process.env.RABBITMQ_QUEUE, async (message: Message) => {
    if (message) {
      const parsedData = JSON.parse(message.content.toString());
      const data: HistoryData =
          new HistoryData(parsedData.data.id, parsedData.event);

      await controller.create(data);
      channel.ack(message);
    }
  })

  router.get('/:id', controller.getByUserId);
}

export { routes, router };
