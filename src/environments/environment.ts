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
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'crm',
    },
  },
};
