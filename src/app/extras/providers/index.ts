import { BASIC_MODELS, BPMN_MODELS, FORM_MODELS, CUSTOMER_MODELS } from '@models';
import { ConfigService } from '@nestjs/config/dist/config.service';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { uuid } from 'uuidv4';

export class AppProvider {
  public static readonly init = () => {
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
          console.log(process.env);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const mysql = require('mysql2/promise');
          await mysql.createConnection({
            host: process.env.GGCLOUD_SQL_HOST,
            user: process.env.GGCLOUD_SQL_USERNAME,
            password: process.env.GGCLOUD_SQL_PASS,
          }).then((conn => conn.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.GGCLOUD_SQL_DATABASE}`)));
          const connection = createConnection({
            name: uuid(),
            type: 'mysql',
            host: process.env.GGCLOUD_SQL_HOST,
            port: parseInt(process.env.GGCLOUD_SQL_POST),
            username: process.env.GGCLOUD_SQL_USERNAME,
            password: process.env.GGCLOUD_SQL_PASS,
            database: process.env.GGCLOUD_SQL_DATABASE,
            entities: [...BASIC_MODELS, ...BPMN_MODELS, ...FORM_MODELS, ...CUSTOMER_MODELS],
            synchronize: true,
            logging: true,

          });
          return connection;
        }
      }
    ]
  }
  public static readonly type = (): TypeOrmModuleOptions => {
    return {
      type: 'mysql',
      host: process.env.GGCLOUD_SQL_HOST,
      port: parseInt(process.env.GGCLOUD_SQL_POST),
      username: process.env.GGCLOUD_SQL_USERNAME,
      password: process.env.GGCLOUD_SQL_PASS,
      database: process.env.GGCLOUD_SQL_DATABASE,
      entities: [...BASIC_MODELS],
      synchronize: true
    };
  }
}