import { BASIC_MODELS } from '@models';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { uuid } from 'uuidv4';

export class AppProvider {
  public static readonly init = () => {
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => (createConnection({
          name: uuid(),
          type: 'mysql',
          host: process.env.GGCLOUD_SQL_HOST,
          port: parseInt(process.env.GGCLOUD_SQL_POST),
          username: process.env.GGCLOUD_SQL_USERNAME,
          password: process.env.GGCLOUD_SQL_PASS,
          database: process.env.GGCLOUD_SQL_DATABASE,
          entities: [...BASIC_MODELS],
          synchronize: true
        }))
      }
    ]
  }
  public static readonly type = (): TypeOrmModuleOptions => {
    return {
      name: uuid(),
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