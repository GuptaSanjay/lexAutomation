'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const util = require('../utility/util');
const FIRST_BILLING_ACCOUNT_LINK = './/span[@title="Billing Account Name"]/../../../../../following-sibling::tbody/tr[1]/th';
const RELATED_TAB = '(.//a[@id="relatedListsTab__item"])[last()]';
const DETAILS_TAB = '(.//a[.="Details"])[2]';
const INVOICE_STATUS = './/span[.="Invoice Number"]/../../../../../following-sibling::tbody/tr[last()]/td[2]/span/span';
const INVOICE_PAYMENT_TERM = './/span[.="Invoice Number"]/../../../../../following-sibling::tbody/tr[last()]/td[9]/span/span';
const PAYMENT_STATUS = './/span[.="Payment Number"]/../../../../../following-sibling::tbody/tr[last()]/td[3]/span/span';
const STATUS = './/div[.="Status"]/following-sibling::div/span'+util.getLightningFormatedText();
const BILL_CYCLE_DAY = './/div[.="Bill Cycle Day"]/following-sibling::div/span'+util.getLightningFormatedText();
const CREDIT_CARD_NUMBER= './/div[.="Credit Card Number"]/following-sibling::div/span/slot/slot/records-formula-output/slot/lightning-formatted-text';
//const CREDIT_CARD_NUMBER = './/div[.="Credit Card Number"]/following-sibling::div/span'+util.getLightningFormatedText();
const PAYMENT_METHODS_TYPE = '(.//span[.="Payment Method Name"]/../../../../../following-sibling::tbody/tr[last()]/td[4]/span/span)[1]';

module.exports = {
  clickBillingAccount: async function () {
    return webDriverHelper.waitAndClick(FIRST_BILLING_ACCOUNT_LINK);
  },

  clickRelatedTab: async function () {
    await webDriverHelper.shortWait();
    await driver.scroll(RELATED_TAB, -1000,-1000);
    await webDriverHelper.waitAndClick(RELATED_TAB);
  },

  clickDetailsTab: async function () {
    return webDriverHelper.waitAndClick(DETAILS_TAB);
  },

  getInvoiceStatus: async function () {
    this.clickRelatedTab();
    return webDriverHelper.getElementText(INVOICE_STATUS);
  },

  getPaymentStatus: async function () {
    // await webDriverHelper.waitAndScroll(PAYMENT_STATUS)
    return webDriverHelper.getElementText(PAYMENT_STATUS);
  },

  navigateToAccountPage: async function () {
    return webDriverHelper.navigateBack();
  },

  getBillingStatus: async function () {
    return webDriverHelper.getElementText(STATUS);
  },

  getBillCycleDay: async function () {
    return webDriverHelper.getElementText(BILL_CYCLE_DAY);
  },

  getCreditCardNumber: async function () {
    return webDriverHelper.getElementText(CREDIT_CARD_NUMBER);
  },

  getInvoicesPaymentTerm: async function () {
    return webDriverHelper.getElementText(INVOICE_PAYMENT_TERM);
  },

  getPaymentMethodsType: async function () {
    return webDriverHelper.getElementText(PAYMENT_METHODS_TYPE);
  },

};