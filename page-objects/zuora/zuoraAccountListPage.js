'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');

module.exports = {
  clickCustomerLink: async function (customerName) {
    await webDriverHelper.waitAndClick('.//*[.="'+customerName+'"]');
  }
};