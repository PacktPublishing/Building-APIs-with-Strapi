module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', '.tmp/test.db'),
    },
    useNullAsDefault: true,
    pool: {
      min: 0,
      max: 1,
    },
  },
});
