import { ACCOUNT_MODELS, BASIC_MODELS, BPMN_MODELS, CUSTOMER_MODELS, FORM_MODELS, SERVICE_MODELS } from '@models';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { uuid } from 'uuidv4';

export class AppProvider {

  public static readonly init = () => {
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          console.log(process.env);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const mysql = require('mysql2/promise');
          await mysql.createConnection({
            // host: process.env.GGCLOUD_SQL_HOST,
            host: '35.185.182.104',
            // host: 'localhost',
            user: process.env.GGCLOUD_SQL_USERNAME,
            // password: process.env.GGCLOUD_SQL_PASS,
            // password: '123456cb',
            password: '22d614a4-03c5',
          }).then((conn => conn.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.GGCLOUD_SQL_DATABASE}`)));
          const connection = createConnection({
            name: uuid(),
            type: 'mysql',
            // host: process.env.GGCLOUD_SQL_HOST,
            host: '35.185.182.104',
            // host: 'localhost',
            port: parseInt(process.env.GGCLOUD_SQL_POST),
            username: process.env.GGCLOUD_SQL_USERNAME,
            // password: process.env.GGCLOUD_SQL_PASS,
            password: '22d614a4-03c5',
            // password: '123456cb',
            database: process.env.GGCLOUD_SQL_DATABASE,
            entities: [...BASIC_MODELS, ...FORM_MODELS, ...BPMN_MODELS, ...CUSTOMER_MODELS, ...ACCOUNT_MODELS, ...SERVICE_MODELS],
            synchronize: true,
            logging: true,

          });

          return connection;
        }
      },
    ]
  }
  public static readonly type = (): TypeOrmModuleOptions => {
    return {
      type: 'mysql',
      // host: process.env.GGCLOUD_SQL_HOST,
      host: '35.185.182.104',
      port: parseInt(process.env.GGCLOUD_SQL_POST),
      username: process.env.GGCLOUD_SQL_USERNAME,
      // password: process.env.GGCLOUD_SQL_PASS,
      password: '22d614a4-03c5',
      database: process.env.GGCLOUD_SQL_DATABASE,
      entities: [...BASIC_MODELS],
      synchronize: true
    };
  }
}
