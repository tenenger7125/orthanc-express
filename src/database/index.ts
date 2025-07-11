import { type Dialect, Sequelize } from 'sequelize';

import { env } from '@/config';

import { initModels } from './models/init-models';
import config from './sequelize-config.json';

export const dbConnect = async () => {
  try {
    const sequelizeConfig = config[env.nodeEnv];

    const db = {
      sequelize: new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
        host: sequelizeConfig.host,
        dialect: sequelizeConfig.dialect as Dialect,
        logging: false,
      }),
    };

    initModels(db.sequelize);
    console.log('✅ 데이터 베이스 연결 성공');
  } catch (e) {
    console.error('❌ 데이터 베이스 연결 실패');
    throw e;
  }
};
