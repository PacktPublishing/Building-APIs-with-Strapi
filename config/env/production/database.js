const { parse } = require('pg-connection-string');
const dbConfig = parse(process.env.DATABASE_URL || '');

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
});
