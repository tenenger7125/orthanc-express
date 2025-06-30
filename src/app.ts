import express from 'express';

import { env } from '@/config';
import { dbConnect } from '@/database';
import router from '@/router';
import { dicomStoreScpConnect } from '@/util/dicom-store-scp';

const app = express();

app.set('port', env.port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const server = app.listen(app.get('port'), async () => {
  console.log(`✅ PORT ${app.get('port')}: 서버 실행 성공`);

  try {
    await dbConnect(); // db connect
    await dicomStoreScpConnect(); // store-scp
  } catch (e) {
    console.log('❔ 오류 원인', e);
    server.close(() => process.exit(-1));
  }
});
