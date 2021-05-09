module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '16c34eedf3bcad7ce2c8f308a017d1ef'),
  },
});
