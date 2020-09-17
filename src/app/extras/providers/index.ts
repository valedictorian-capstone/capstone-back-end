import { Sequelize } from 'sequelize-typescript';
import { BASIC_MODELS, BPMN_MODELS } from 'src/app/models';
import { environment } from 'src/environments/environment';
export class SequelizeProvider {
  public static readonly init = () => {
    return {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const config: any = environment.databases.development;
        const sequelize = new Sequelize({
          models: [...BASIC_MODELS, ...BPMN_MODELS],
          ...config,
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
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mysql = require('mysql2/promise');
        await mysql.createConnection({
          host: config.host,
          user: config.username,
          password: config.password,
        }).then(conn => conn.query(`CREATE SCHEMA IF NOT EXISTS ${config.database}`))
          .then(async () => await sequelize.sync());
        return sequelize;
      },
    };
  };
}
