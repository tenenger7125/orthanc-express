import { Dialect } from 'sequelize';
import SequelizeAuto from 'sequelize-auto';

import { env } from '@/config';
import { PATH } from '@/constant/path';

import config from './sequelize-config.json';

const sequelizeConfig = config[env.nodeEnv];

/**
 * "c" camelCase |
 * "k" kebab-case |
 * "l" lower_case |
 * "o" original (db) |
 * "p" PascalCase |
 * "u" UPPER_CASE
 */

const auto = new SequelizeAuto(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
  lang: 'ts',
  host: sequelizeConfig.host,
  dialect: sequelizeConfig.dialect as Dialect,
  directory: PATH.DB_MODEL_PATH, // where to write files
  port: 3306,
  caseModel: 'p', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'p', // file names created for each model use camelCase.js not snake_case.js
  singularize: true, // convert plural table names to singular model names
  additional: {
    timestamps: true,
    // ...options added to each model
  },
  useDefine: false,
  skipTables: ['SequelizeMeta'],
});

auto.run().then(() => {
  console.log('DB table auto generate');
  // console.log(data.tables); // table and field list
  // console.log(data.foreignKeys); // table foreign key list
  // console.log(data.indexes); // table indexes
  // console.log(data.hasTriggerTables); // tables that have triggers
  // console.log(data.relations); // relationships between models
  // console.log(data.text); // text of generated models
});
