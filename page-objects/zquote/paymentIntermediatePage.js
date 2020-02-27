'use strict';
const  enums = require('../../enum/const');
const webDriverHelper = require('../../webdriver/webdriverHelper');
const CREDIT_CARD_RADIO = './/input[@value="Credit Card"]';
const DIRECT_DEBIT_RADIO = './/input[@value="Bank Transfer"]';
const NEXT_BUTTON = './/button[.="Next"]';
const NEW_PAYMENT_BUTTON = './/input[@value="New Pay Method"]';

module.exports = {
  selectPaymentMethod: async function (paymentMethod){
    if (paymentMethod === enums.PaymentMethod.CREDIT_CARD){
      await webDriverHelper.waitAndClick(CREDIT_CARD_RADIO);
    } else if (paymentMethod === enums.PaymentMethod.DIRECT_DEBIT) {
      await webDriverHelper.waitAndClick(DIRECT_DEBIT_RADIO);
    }
  },

  clickNext: function (){
    return webDriverHelper.waitAndClick(NEXT_BUTTON);
  },

  switchToIframe: async function(){
    return webDriverHelper.switchToIframe();
  },

  clickNewPaymentMethod: async function() {
    return webDriverHelper.waitAndClick(NEW_PAYMENT_BUTTON);
  }

};