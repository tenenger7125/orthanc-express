// app.ts

import express from 'express';

import { env } from './config';

const app = express();

app.set('port', env.port);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 대기중');
});
