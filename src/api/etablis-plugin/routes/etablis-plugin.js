'use strict';

/**
 * etablis-plugin router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::etablis-plugin.etablis-plugin');
