import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BASIC_MODELS } from '@models';
import { uuid } from 'uuidv4';

export class AppProvider {
  public static readonly init = (): TypeOrmModuleOptions => {
    return {
      name: uuid(),
      type: 'mysql',
      host: process.env.GGCLOUD_SQL_HOST,
      port: parseInt(process.env.GGCLOUD_SQL_POST),
      username: process.env.GGCLOUD_SQL_USERNAME,
      password: process.env.GGCLOUD_SQL_PASS,
      database: process.env.GGCLOUD_SQL_DATABASE,
      entities: [...BASIC_MODELS],
      synchronize: true,
      dropSchema: false,
      autoLoadEntities: true,
    }
  }
}