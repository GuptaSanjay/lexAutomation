'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const ACCOUNT_PAGE_BREADCRUMB_LINK = './/span[.="Account Name"]/following-sibling::div/div/div/a';
const STATUS = './/span[.="Status"]/following-sibling::div/div/span';
const FULFILMENT_TYPE = '(.//span[.="Fulfilment Type"]/../following-sibling::div/span/span)[last()]';
const FULFILMENT_PARTNER = '(.//span[.="Fulfilment Partner"]/../following-sibling::div/span/span)[last()]';
const JOB_STATUS = './/*[.="Job Name"]/../../../../../following-sibling::tbody/tr[last()]/td[5]';
const JOB_REFERENCE_NUMBER = './/*[.="Job Name"]/../../../../../following-sibling::tbody/tr[last()]/td[4]';
const ORDER_PRODUCT_STATUS = '(.//*[.="Product"]/../../../../../following-sibling::tbody/tr[last()]/td[4])[last()]';
const DETAILS_TAB = '(.//span[.="Details"])[last()]';
const RELATED_TAB = '(.//span[.="Related"])[last()]';
const ACCOUNT_NAME = './/*[@title="Account Name"]/following-sibling::div/div/div/a';
module.exports = {


  navigateToAccountPage: async function (){
    await webDriverHelper.scrollToTop();
    return webDriverHelper.waitAndClick(ACCOUNT_NAME);
    // return webDriverHelper.navigateBack();
  },

  getStatus: async function() {
    return webDriverHelper.getElementText(STATUS);
  },

  getFulfillmentType: async function(){
    return webDriverHelper.getElementText(FULFILMENT_TYPE);
  },

  getFulfillmentPartner: async function(){
    return webDriverHelper.getElementText(FULFILMENT_PARTNER);
  },

  getJobStatus: async function(){
    return webDriverHelper.getElementText(JOB_STATUS);
  },

  getJobReferenceNumber: async function(){
    return webDriverHelper.getElementText(JOB_REFERENCE_NUMBER);
  },

  getOrderProductsStatus: async function(){
    return webDriverHelper.getElementText(ORDER_PRODUCT_STATUS);
  },

  clickRelatedTab: async function() {
    return webDriverHelper.waitAndClick(RELATED_TAB);
  },

  clickDetailsTab: async function(){
    return webDriverHelper.waitAndClick(DETAILS_TAB);
  }

};

