export const environment = {
  databases: {
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
  },
};
