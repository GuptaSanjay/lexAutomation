'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const paymentProperties = require('../data/paymentProperties');

const I_FRAME = 'j_id18';
const PAYMENT_IFRAME = 'z_hppm_iframe';
const ACCEPT_BUTTON = './/input[@value="Accept"]';
const CHECKOUT_LINK = './/a[.="Checkout"]';
const QUOTE_CHECK = './/small[starts-with(text(),"I understand")]';
const TC_CHECK = './/small[starts-with(text(),"I agree to the Hive")]';
const NEXT_STEP_BUTTON = './/*[@value="Next step"]';
const DELIVERY_NEXT_STEP = './/button[.="Next step"]';
const CARD_NUMBER_INPUT = './/input[@id="input-creditCardNumber"]';
const MONTH_INPUT = './/select[@id="input-creditCardExpirationMonth"]';
const YEAR_INPUT = './/select[@id="input-creditCardExpirationYear"]';
const CSV_INPUT = './/input[@id="input-cardSecurityCode"]';

module.exports = {

  clickAccept: async function () {
    await webDriverHelper.switchToIframeByNameOrId(I_FRAME);
    await webDriverHelper.waitAndClick('.//*[@title="Accept Cookies"]'); //ACCEPT COOKIES
    await webDriverHelper.waitAndClick(ACCEPT_BUTTON);
  },

  clickCheckout: async function () {
    await webDriverHelper.waitAndClick(CHECKOUT_LINK);
  },

  acceptTermsConditions: async function (quoteType) {
    if (quoteType === 'In-day' || quoteType === 'Future-day' || quoteType === 'Install') {
      await webDriverHelper.waitAndClick(QUOTE_CHECK);
    }
    await webDriverHelper.waitAndClick(TC_CHECK);
  },

  clickNextStep: async function () {
    await webDriverHelper.waitAndClick(NEXT_STEP_BUTTON);
  },

  setPaymentDetails: async function () {
    await webDriverHelper.switchToIframeByNameOrId(PAYMENT_IFRAME);
    await webDriverHelper.waitAndSetValue(CARD_NUMBER_INPUT, paymentProperties.getCreditCardNumber());
    await webDriverHelper.waitAndSelectByValue(MONTH_INPUT, paymentProperties.getCardExpiryMonth());
    await webDriverHelper.waitAndSelectByValue(YEAR_INPUT, paymentProperties.getCardExpiryYear());
    await webDriverHelper.waitAndSetValue(CSV_INPUT, paymentProperties.getCardCVV());
  },

  clickPaySecurlyNow: async function () {
     await browser.execute(async () =>  await document.querySelector('#submitButton').click());

//    await webDriverHelper.waitAndClick(PAY_SECURLY_NOW);
  },

  selectInstallationAppointment: async function() {
    const APPOINTMENT_OPTION = '(.//*[@class="btn btn-outline-primary btn-block pick-appointment am"])[1]';
    return webDriverHelper.waitAndClick(APPOINTMENT_OPTION);
  },

  clickInstallationNextStep: async function() {
    const INSTALLATION_NEXT_STEP = './/a[.="Next step"]';
    return webDriverHelper.waitAndClick(INSTALLATION_NEXT_STEP)
  },

  clickDeliveryNextStep: async function() {
    await webDriverHelper.waitAndClick(DELIVERY_NEXT_STEP);
  }
};
