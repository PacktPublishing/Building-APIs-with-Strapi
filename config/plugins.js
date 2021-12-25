module.exports = env => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  lms: {
    enabled: true,
    resolve: './src/plugins/lms',
  },
});
