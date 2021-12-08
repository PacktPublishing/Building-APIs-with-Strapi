'use strict';

/**
 * classroom service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::classroom.classroom');
