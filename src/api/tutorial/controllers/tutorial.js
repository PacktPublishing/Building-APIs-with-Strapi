'use strict';

/**
 *  tutorial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tutorial.tutorial');
