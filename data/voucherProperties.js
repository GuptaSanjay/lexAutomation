'use strict';

const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'voucher.properties'));

module.exports = {
  /**
   * Returns a voucher code based on passed voucher type
   * @param voucherType
   * @returns {String}
   */
  getVoucherCode: function (voucherType) {
    return properties.get(voucherType);
  }
};