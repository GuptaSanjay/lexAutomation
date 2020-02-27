'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');

const SUBSCRIPTION = './/th[.="Subscription"]/following-sibling::td/span/a';
const ETF_STATUS = './/th[.="Early Termination Fee Status"]/following-sibling::td/span';
const ETF_AMOUNT  = './/th[.="Early Termination Fee Amount"]/following-sibling::td/span';
const PROCESS_PAYMENT_BUTTON = './/input[@value="Process Payment"]';

module.exports = {
  getSubscription: async function(){
    return webDriverHelper.getElementText(SUBSCRIPTION);
  },

  getETFStatus: async function() {
    return webDriverHelper.getElementText(ETF_STATUS);
  },

  getETFAmount: async function() {
    return webDriverHelper.getElementText(ETF_AMOUNT);
  },

  clickProcessPayment: async function() {
    await webDriverHelper.waitAndClick(PROCESS_PAYMENT_BUTTON);
  }
};