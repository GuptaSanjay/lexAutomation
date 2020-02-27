'use strict';
const wd =  require('../../runtime/webDriverHelper');
const webDriverHelper = require('../../webdriver/webdriverHelper');
const paymentProperties = require('../../data/paymentProperties');
const enums = require('../../enum/const');
const CARDHOLDER_NAME_INPUT = './/*[@id="input-creditCardHolderName"]';
const CREDITCARD_NUMBER_INPUT = './/*[@id="input-creditCardNumber"]';
const CREDITCARD_EXPIRY_MONTH_SELECT = './/*[@id="input-creditCardExpirationMonth"]';
const CREDITCARD_EXPIRY_YEAR_SELECT = './/*[@id="input-creditCardExpirationYear"]';
const CREDITCARD_CVV_INPUT = './/*[@id="input-cardSecurityCode"]';
const PAY_SECURELY_BUTTON = './/*[@id="submitButton"]';
const ACCOUNT_NAME_INPUT = './/*[@id="input-bankAccountName"]';
const BANK_NAME_INPUT = './/*[@id="input-bankName"]';
const ACCOUNT_NUMBER_INPUT = './/*[@id="input-bankAccountNumber"]';
const SORT_CODE_INPUT = './/*[@id="input-bankCode"]';
const AGREEMENT_CHECKBOX = './/*[@id="field_agreement_checkbox"]';
const DIRECT_DEBIT_SUBMIT_BUTTON = './/*[@id="submitButton"]';
const DIRECT_DEBIT_MANDATE_BUTTON = './/body/div/div/a[.="Confirm"]';
const EXISTING_PAYMENT_METHOD = './/input[@type="radio"]';
const NEXT_BUTTON = './/button[.="Next"]';
const iFrame = 'j_id1';
const paymentIFrame = 'z_hppm_iframe';

module.exports = {
  enterCreditCardDetails: async function (paymentMethod) {
    await wd.switchToIframeByNameOrId(iFrame);
    await wd.switchToIframeByNameOrId(paymentIFrame);
    let creditCardNumber;
    switch (paymentMethod) {
      case enums.PaymentMethod.CREDIT_CARD_AMEX:
        creditCardNumber = paymentProperties.getCreditCardAmexNumber();
        break;
      case enums.PaymentMethod.CREDIT_CARD_DISCOVERY:
        creditCardNumber = paymentProperties.getCreditCardDiscoveryNumber();
        break;
      case enums.PaymentMethod.CREDIT_CARD_NEW:
        creditCardNumber = paymentProperties.getNewCreditCardNumber();
        break;
      default:
        creditCardNumber = paymentProperties.getCreditCardNumber();
        break;
    }
    await wd.setValue(CARDHOLDER_NAME_INPUT, paymentProperties.getCardHolderName());
    await wd.setValue(CREDITCARD_NUMBER_INPUT, creditCardNumber);
    await wd.setValue(CREDITCARD_EXPIRY_MONTH_SELECT, paymentProperties.getCardExpiryMonth());
    await wd.setValue(CREDITCARD_EXPIRY_YEAR_SELECT, paymentProperties.getCardExpiryYear());
    await wd.setValue(CREDITCARD_CVV_INPUT, paymentProperties.getCardCVV());
  },

  enterDirectDebitDetails: async function() {
    await webDriverHelper.switchToIframeByNameOrId(iFrame);
    await webDriverHelper.switchToIframeByNameOrId(paymentIFrame);
    await webDriverHelper.waitAndSetValue(ACCOUNT_NAME_INPUT, paymentProperties.getAccountName());
    await webDriverHelper.waitAndSetValue(BANK_NAME_INPUT, paymentProperties.getBankName());
    await webDriverHelper.waitAndSetValue(ACCOUNT_NUMBER_INPUT, paymentProperties.getAccountNumber());
    await webDriverHelper.waitAndSetValue(SORT_CODE_INPUT, paymentProperties.getSortCode());
    await webDriverHelper.waitAndClick(AGREEMENT_CHECKBOX);
  },

  clickPaySecurelyNow: function() {
    return wd.click(PAY_SECURELY_BUTTON);
  },

  switchToIframe: async function(){
    return webDriverHelper.switchToIframe();
  },

  clickDirectDebit: async function() {
    await webDriverHelper.waitAndClick(DIRECT_DEBIT_SUBMIT_BUTTON);
    await webDriverHelper.waitAndClick(DIRECT_DEBIT_MANDATE_BUTTON);
  },

  selectExistingCardPaymentMethod: async function(){
    await webDriverHelper.waitAndClick(EXISTING_PAYMENT_METHOD);
  },

  clickNext: async function(){
   await webDriverHelper.waitAndClick(NEXT_BUTTON);
  }
};