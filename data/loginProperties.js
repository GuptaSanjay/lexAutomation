'use strict';

const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'login.properties'));

module.exports = {
  /**
   * Returns salesforce url
   * @returns {String}
   */
  getSalesforceURL: function () {
    return properties.get('salesforce.url');
  },

  /**
   * Returns admin username
   * @returns {String}
   */
  getAdminUsername: function () {
    return properties.get('admin.salesforce.username');
  },

  /**
   * Returns CSA username
   * @returns {String}
   */
  getCSAUsername:function () {
    return properties.get('csa.salesforce.username');
  },

  /**
   * Returns NA CSA username
   * @returns {String}
   */
  getCSANAUsername: function () {
    return properties.get('csana.salesforce.username');
  },

  /**
   * Returns HU Champion username
   */
  getHUChampionUsername: function () {
    return properties.get('huchamp.salesforce.username');
  },

  /**
   * Returns HU Champion username
   */
  getBIQUsername: function () {
    return properties.get('biq.salesforce.username');
  },

  /**
   * Returns admin password
   * @returns {String}
   */
  getAdminPassword: function () {
    return properties.get('admin.salesforce.password');
  },

  /**
   * Returns admin password
   * @returns {String}
   */
  getHUChampPassword: function () {
    return properties.get('huchamp.salesforce.password');
  },

  getZuoraUsername: function() {
    return properties.get('zuora.username');
  },

  getZuoraPassword: function () {
    return properties.get('zuora.password');
  }
};