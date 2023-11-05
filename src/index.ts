import express from 'express';
import { NODE_ENV, PORT } from './config/config';

const app = express();

app.listen(PORT, () => {
  console.log(`Api running in mode ${NODE_ENV} port ${PORT}`);
})