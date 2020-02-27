'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');
const CUSTOMER_ACCOUNT_LINK = './/a[.="Customer Accounts"]';

module.exports = {
  clickCustomerAccountLink: async function () {
    await webDriverHelper.waitAndClick(CUSTOMER_ACCOUNT_LINK);
  },
};