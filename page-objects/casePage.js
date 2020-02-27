'use strict';

const util=require('../utility/util');
const webDriverHelper = require('../webdriver/webdriverHelper');
const STATUS = '(.//div/span[.="Status"]/../following-sibling::div/span)[last()]'+util.getLightningFormatedText();
//const CASE_RECORD_TYPE = './/div[.="Case Record Type"]/following-sibling::div/span/div/div/span';
const CASE_RECORD_TYPE='.//div[.="Case Record Type"]/following-sibling::div/span'+util.getLightningForceRecordType();
//const SUBSCRIPTION = './/div/span[.="Subscription"]/../following-sibling::div/span/div/a';
const SUBSCRIPTION='.//div/span[.="Subscription"]/../following-sibling::div/span'+util.getLightningForceHoverableLink();
const SUBSCRIPTION_TITLE='(.//span[.="Subscription"])[last()]';
const DETAILS_TAB = '(.//a[.="Details"])[last()]';
//const SHOW_MORE_ACTIONS = './/a[.="Edit"]/../following-sibling::li/div/div/div/div/a';
const SHOW_MORE_ACTIONS = '(.//*[@data-aura-class="oneActionsDropDown"])[1]';
// const SHOW_MORE_ACTIONS = './/a[@title="Show 2 more actions"]';
const PROCESS_CANCELLATION = './/a[@title="Process Cancellation"]';
const PAY_OUTSTANDING_ETF = './/a[@title="Pay Outstanding ETF"]';
const REFUNDED_AMOUNT = '(.//div[.="Refunded Amount"]/following-sibling::div/span)[last()]'+util.getLightningFormatedText();
const ETF_AMOUNT = './/div[.="Early Termination Fee Amount"]/following-sibling::div/span'+util.getLightningFormatedText();
const ETF_STATUS = './/div[.="Early Termination Fee Status"]/following-sibling::div/span'+util.getLightningFormatedText();

module.exports = {

  clickDetailsTab: async function(){
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(DETAILS_TAB);
  },

  getStatus: async function() {
    return webDriverHelper.getElementText(STATUS);
  },

  getCaseRecordType: async function() {
    return webDriverHelper.getElementText(CASE_RECORD_TYPE);
  },

  getSubscription: async function() {
    return webDriverHelper.getElementText(SUBSCRIPTION);
  },

  clickShowMoreActions: async function(){
    return webDriverHelper.waitAndClick(SHOW_MORE_ACTIONS);
  },

  clickProcessCancellation: async function() {
    await webDriverHelper.shortWait();
    return webDriverHelper.waitAndClick(PROCESS_CANCELLATION);
  },

  clickPayOutstandingETF: async function(){
  return webDriverHelper.waitAndClick(PAY_OUTSTANDING_ETF);
  },

  getRefundedAmount: async function(){
    return webDriverHelper.getElementText(REFUNDED_AMOUNT);
  },

  getETFAmount: async function() {
    return webDriverHelper.getElementText(ETF_AMOUNT);
  },

  getETFStatus: async function() {
    return webDriverHelper.getElementText(ETF_STATUS);
  },

  // navigateToSubscriptionPage: async function() {
  //   //await webDriverHelper.waitAndScroll(CASE_RECORD_TYPE);
  //   await webDriverHelper.waitAndScroll(SUBSCRIPTION_TITLE);
  //   await webDriverHelper.waitAndClick(SUBSCRIPTION);
  // },
  getSubscriptionPageLink: async function(){
    return await webDriverHelper.getElementAttribute(SUBSCRIPTION,'href');
  },

  waitAndRefreshForCondition: async function (field, condition) {
    await webDriverHelper.shortWait();
    let counter = 0;
    let status = await this.getStatus();
    while (status !== condition && counter < 10) {
      await webDriverHelper.longDelayAndRefresh();
      status = await this.getStatus();
      counter++;
    }
  },
};


