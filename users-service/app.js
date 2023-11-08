import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import amqp from 'amqplib';
import { routes, router } from './routes/users.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

let connection, channel;

async function connectQueue() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_CONNECTION);
    channel = await connection.createChannel();

    await channel.assertQueue(process.env.RABBITMQ_QUEUE);
  } catch (err) {
    console.log(err);
  }
}

connectQueue()
  .then((value) => {
    routes(channel);
    app.use('/users', router);
  })
  .catch(err => {
    console.log(err);
  });

app.listen(process.env.USERS_PORT, () => {
  console.log(`listening to port ${process.env.USERS_PORT}`);
})
  .on('error', (err) => {
    console.log(err);
    process.exit();
  })