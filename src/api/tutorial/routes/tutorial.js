'use strict';

/**
 * tutorial router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tutorial.tutorial', {
  except: ['find'],
  config: {
    update: {
      policies: ['is-manager'],
    },
    delete: {
      policies: ['is-manager'],
    },
  },
});
