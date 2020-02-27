'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');
const SUBSCRIPTION_STATUS = './/*[@id="id__subsciptions_[0].srpStatus"]';
const INVOICE_STATUS = './/*[@id="id__invoices_[0].invoiceStatus"]';
const REFUNDED_AMOUNT = './/*[@id="id__refunds_[0].refundAmount"]';
const PAYMENT_APPLIED = './/*[@id="id__payments_[0].paymentAmount"]';
const REFUND_STATUS = './/*[@id="id__refunds_[0].refundStatus"]';
const PAYMENT_STATUS = './/*[@id="id__payments_[0].paymentStatus"]';
const REFUNDS_TAB = './/span[.="Refunds"]';
const PAYMENTS_TAB = './/span[.="Payments"]';

module.exports = {
  clickRefundsTab: async function () {
    await webDriverHelper.waitAndScroll(REFUNDS_TAB);
    await webDriverHelper.waitAndClick(REFUNDS_TAB);
  },

  clickPaymentsTab: async function () {
    await webDriverHelper.waitAndScroll(PAYMENTS_TAB);
    await webDriverHelper.waitAndClick(PAYMENTS_TAB);
  },

  getSubscription: async function () {
    return webDriverHelper.getElementText(SUBSCRIPTION_STATUS);
  },

  getInvoiceStatus: async function () {
    return webDriverHelper.getElementText(INVOICE_STATUS);
  },

  getRefundAmount: async function () {
    return webDriverHelper.getElementText(REFUNDED_AMOUNT);
  },

  getRefundStatus: async function () {
    return webDriverHelper.getElementText(REFUND_STATUS);
  },

  getPaymentApplied: async function(){
    return webDriverHelper.getElementText(PAYMENT_APPLIED);
  },

  getPaymentStatus: async function() {
    return webDriverHelper.getElementText(PAYMENT_STATUS)
  }


};