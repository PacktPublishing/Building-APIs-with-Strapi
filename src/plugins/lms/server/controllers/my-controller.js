'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('lms')
      .service('myService')
      .getWelcomeMessage();
  },
};
