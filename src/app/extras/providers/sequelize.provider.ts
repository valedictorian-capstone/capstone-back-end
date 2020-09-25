import { Sequelize } from 'sequelize-typescript';
import { BASIC_MODELS, BPMN_MODELS } from 'src/app/models';

export class SequelizeProvider {
  public static readonly init = () => {
    return {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const databases = {
          development: {
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456cb',
            database: 'crm',
          },
          production: {
            dialect: 'mysql',
            host: process.env.GGCLOUD_SQL_IP,
            port: 3306,
            username: process.env.GGCLOUD_SQL_USER,
            password: process.env.GGCLOUD_SQL_PASS,
            database: process.env.GGCLOUD_SQL_SCHEMA,
          },
        };
        const config = databases.production;
        const sequelize = new Sequelize({
          models: [...BASIC_MODELS, ...BPMN_MODELS], ...config as any,
          dialect: config.dialect,
          host: config.host,
          name: config.database,
          password: config.password,
          pool: {
              // connectionLimit: 1000,
              // acquire: 300000000,
              // idle: 100000000,
              max: 1000,
              min: 0,
          },
          repositoryMode: true,
          username: config.username,
          validateOnly: false,
        });
        await sequelize.sync();
        return sequelize;
      },
    };
  };
}
