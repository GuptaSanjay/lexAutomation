'use strict';

const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'errorMessage.properties'));

module.exports = {
  /**
   * Returns a rate plan based on passed rate plan type
   * @param errorMessage
   * @returns {String}
   */
  getErrorMessage: function (errorMessage) {
    return properties.get(errorMessage);
  },
};