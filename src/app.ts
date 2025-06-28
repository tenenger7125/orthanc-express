import express from 'express';

import { env } from '@/config';
import router from '@/router';

const app = express();

app.set('port', env.port);

app.use('/', router);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번에서 대기중');
});
