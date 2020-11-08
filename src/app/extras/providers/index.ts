import { BASIC_MODELS, BPMN_MODELS, FORM_MODELS, CUSTOMER_MODELS, ACCOUNT_MODELS, SERVICE_MODELS } from '@models';
import * as admin from 'firebase-admin';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { uuid } from 'uuidv4';
import { FIREBASE_NOTIFICATION_SERVICE, FIREBASE_STORAGE_SERVICE } from '@types';

export class AppProvider {

  public static readonly init = () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const firebaseAuth = require('../../../../capstone-crm-firebase-adminsdk-w3o3s-85b298087b.json');
    admin.initializeApp({
      credential: admin.credential.cert(firebaseAuth),
      databaseURL: "https://capstone-crm.firebaseio.com",
      storageBucket: "capstone-crm.appspot.com"
    });
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          console.log(process.env);
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const mysql = require('mysql2/promise');
          await mysql.createConnection({
            host: process.env.GGCLOUD_SQL_HOST,
            user: process.env.GGCLOUD_SQL_USERNAME,
            password: '123456',
          }).then((conn => conn.query(`CREATE SCHEMA IF NOT EXISTS ${process.env.GGCLOUD_SQL_DATABASE}`)));
          const connection = createConnection({
            name: uuid(),
            type: 'mysql',
            host: process.env.GGCLOUD_SQL_HOST,
            port: parseInt(process.env.GGCLOUD_SQL_POST),
            username: process.env.GGCLOUD_SQL_USERNAME,
            password: '123456',
            database: process.env.GGCLOUD_SQL_DATABASE,
            entities: [...BASIC_MODELS, ...BPMN_MODELS, ...FORM_MODELS, ...CUSTOMER_MODELS, ...ACCOUNT_MODELS, ...SERVICE_MODELS],
            synchronize: true,
            logging: true,

          });

          return connection;
        }
      },
      {
        provide: FIREBASE_NOTIFICATION_SERVICE,
        useFactory: async () => {
          return admin.messaging();
        }
      },
      {
        provide: FIREBASE_STORAGE_SERVICE,
        useFactory: async () => {
          return admin.storage();
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
