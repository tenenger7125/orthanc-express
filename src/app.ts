// app.ts

import express from 'express';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 대기중');
});
