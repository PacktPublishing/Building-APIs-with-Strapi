'use strict';

/**
 * info service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::info.info');
