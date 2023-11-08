import express from "express";
import cors from 'cors';
import amqp from 'amqplib';
import { Connection, Channel } from "amqplib";
import { routes, router } from './routes/history';
import dotenv from "dotenv";

dotenv.config();
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let connection: Connection, channel: Channel;

async function connectQueue() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_CONNECTION || '');
    channel = await connection.createChannel();

    await channel.assertQueue(process.env.RABBITMQ_QUEUE || '');

    routes(channel, connection);
  } catch (err) {
    console.log(err);
  }
}

connectQueue()
    .then(() => {
      app.use('/history', router);

      app.listen(process.env.HISTORY_PORT, () => {
        console.log(`listening to port ${process.env.HISTORY_PORT}`);
      })
          .on('error', (err) => {
            console.log(err);
            process.exit();
          })
    });