'use strict';

/**
 * tutorial service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tutorial.tutorial');
