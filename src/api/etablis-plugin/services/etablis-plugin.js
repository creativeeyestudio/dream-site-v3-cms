'use strict';

/**
 * etablis-plugin service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::etablis-plugin.etablis-plugin');
