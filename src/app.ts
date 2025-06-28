import express from 'express';

import { env } from '@/config';
import { connect } from '@/database';
import router from '@/router';

const app = express();

app.set('port', env.port);

app.use('/', router);

const server = app.listen(app.get('port'), async () => {
  console.log(`✅ PORT ${app.get('port')}: 서버 실행 성공`);

  try {
    await connect(); // db connect
  } catch (e) {
    console.log('❔ 오류 원인', e);
    server.close(() => process.exit(-1));
  }
});
