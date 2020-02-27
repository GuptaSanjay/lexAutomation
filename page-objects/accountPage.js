'use strict';
const wd = require('../runtime/webDriverHelper');
const webDriverHelper = require('../webdriver/webdriverHelper');
// const helpers = require('klassi-cucumber-js/runtime/helpers');
const enums =require('../enum/const');
const util =require('../utility/util');
const SUBSCRIPTIONS_SECTION = './/h2/a/*[.="Subscriptions"]';
const ORDERS_SECTION = './/h2/a/*[.="Orders"]';
const VIEW_ALL_SUBSCRIPTIONS = './/*[.="Subscriptions"]/../../span[text()="View All"]';
const VIEW_ALL_ORDERS = './/*[.="Orders"]/../../span[text()="View All"]';
const VIEW_ALL_BILLING_ACCOUNTS = './/*[.="Billing Accounts"]/../../span[text()="View All"]';
const VIEW_ALL_CONTACTS = './/*[.="Contacts"]/../../span[text()="View All"]';
const ACCOUNT_TYPE = './/*[text()=\'Type\']/parent::div/parent::div/div[2]/child::span/slot[1]/slot/lightning-formatted-text';
const LASTEST_QUOTE_STATUS = './/*[.="Quote Name"]/../../../../../following-sibling::tbody/tr[1]/td[2]/span/span';
const BILLING_ACCOUNT_LINK = '(.//*[.="Billing Account Name"]/../../../../../following-sibling::tbody/tr/th/span/div/a)[last()]';
const BILLING_ACCOUNT_TITLE='.//h2/a[starts-with(.,"Billing Accounts")]/../../../../../../../../../../preceding-sibling::div[1]';
const DILIVERY_ORDER_TITLE='.//h2/a[starts-with(.,"Orders")]/../../../../../../../../../../preceding-sibling::div[1]';
const SUBSCRIPTIONS_TITLE='.//h2/a[starts-with(.,"Subscriptions")]/../../../../../../../../../../preceding-sibling::div[1]';
const RECENT_SUBSCRIPTION_LINK = '(.//*[.="Subscription Name"]/../../../../../following-sibling::tbody/tr[last()]/th/span/div/a)[last()]';
const RECENT_ORDER_LINK = './/*[.="Order Number"]/../../../../../following-sibling::tbody/tr[last()]/th/span/div/a';
//const DELIVERY_ORDER_LINK = './/td[.="Delivery"]/preceding-sibling::th';
const DELIVERY_ORDER_LINK='(.//td[.="Delivery"]/preceding-sibling::th/span/div/a)[last()]';
const INSTALLATION_ORDER_LINK = '(.//td[.="Installation"]/preceding-sibling::th/span/div/a)[last()]';
const RECENT_QUOTE_LINK = '(.//*[.="Quote Name"]/../../../../../following-sibling::tbody/tr[1]/th/span/div/a)[last()]';
const SUBSCRIPTION_ROWS = './/span[@title="Subscription Name"]/../../../../../following-sibling::tbody/tr';
const ORDER_ROWS = './/span[@title="Order Number"]/../../../../../following-sibling::tbody/tr';
const ACCOUNT_NAME = '(.//div[.="Account Name"]/following-sibling::div/span' + util.getLightningFormatedText() + ')';
const RELATED_TAB = './/a[.="Related"]';

module.exports = {
  scrollToSubscriptionSection: async function () {
    await webDriverHelper.waitAndScroll(SUBSCRIPTIONS_SECTION);
    await webDriverHelper.shortWait();
  },

  viewAllSubscription: async function () {
    await webDriverHelper.waitAndScroll('.//h2/a/*[.="Subscriptions"]/../../../../../../../preceding-sibling::div[1]');
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(VIEW_ALL_SUBSCRIPTIONS);
  },

  scrollToOrderSection: async function () {
    await webDriverHelper.waitAndScroll(ORDERS_SECTION);
    await webDriverHelper.shortWait();
  },

  viewAllOrders: async function () {
    await webDriverHelper.waitAndScroll('.//h2/a/*[.="Orders"]/../../../../../../../preceding-sibling::div[1]');
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(VIEW_ALL_ORDERS);
  },

  scrollToBillingAccount: async function () {
    await webDriverHelper.waitAndScroll(ORDERS_SECTION);
    await webDriverHelper.shortWait();
  },

  viewAllBillingAccount: async function () {
    await webDriverHelper.waitAndScroll('.//h2/a[.="Billing Accounts"]/../../../../../../../preceding-sibling::div[1]');
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(VIEW_ALL_BILLING_ACCOUNTS);
  },

  clickRelatedTab: async function(){
    await webDriverHelper.scrollToTop();
    await webDriverHelper.waitAndClick(RELATED_TAB);
  },

  getAccountName: async function() {
    return webDriverHelper.getElementText(ACCOUNT_NAME);
  },

  getSubscriptionRowCount: async function () {
    return webDriverHelper.getElementsCount(SUBSCRIPTION_ROWS);
  },

  getOrderRowCount: async function () {
    return webDriverHelper.getElementsCount(ORDER_ROWS);
  },

  viewAllContacts: function () {
    return webDriverHelper.waitAndClick(VIEW_ALL_CONTACTS);
  },

  getCustomerAccountType: async function () {
    return wd.getText(ACCOUNT_TYPE).then(accountType => {
      if (Array.isArray(accountType)) {
        let temp = accountType.filter(Boolean);
        accountType = temp[0];
      }
      return accountType;
    })
  },

  getQuoteStatus: async function () {
    // await webDriverHelper.waitAndScroll('.//h2/a/*[.="Quotes"]/../../../../../../../preceding-sibling::div[1]');
    await webDriverHelper.shortWait();
    return webDriverHelper.getElementText(LASTEST_QUOTE_STATUS);
  },

  waitAndRefreshForCondition: async function (field, condition) {
    let counter = 0;
    let accountType = await this.getCustomerAccountType();
    while (accountType !== condition && counter < 10) {
      await webDriverHelper.longDelayAndRefresh();
      accountType = await this.getCustomerAccountType();
      counter++;
    }
  },

  clickRecentSubscription: async function () {
    //await webDriverHelper.waitAndScroll('.//h2/a[.="Subscriptions"]/../../../../../../../../../../preceding-sibling::div[1]');
    await webDriverHelper.waitAndScroll(SUBSCRIPTIONS_TITLE);
    await webDriverHelper.waitAndClick(RECENT_SUBSCRIPTION_LINK);
  },

  getRecentQuoteLink: async function(){
    //await webDriverHelper.waitAndScroll('.//h2/a[starts-with(.,"Billing Accounts")]/../../../../../../../../../../preceding-sibling::div[1]')
    return await webDriverHelper.getElementAttribute(RECENT_QUOTE_LINK,'href');
  },

  getBillingAccountPageLink: async function(){
   // await webDriverHelper.waitAndScroll(BILLING_ACCOUNT_TITLE);
    return await webDriverHelper.getElementAttribute(BILLING_ACCOUNT_LINK,'href');
  },

  getSubscriptionPageLink: async function(){
    //await webDriverHelper.waitAndScroll(SUBSCRIPTIONS_TITLE);
    return await webDriverHelper.getElementAttribute(RECENT_SUBSCRIPTION_LINK,'href');
  },

  getRecentOrderLinks: async function(orderType) {
    //await webDriverHelper.waitAndScroll(DILIVERY_ORDER_TITLE);
    let orderLink = '';
    switch (orderType) {
      case enums.DeliveryOption.DELIVERY:
        orderLink = await webDriverHelper.getElementAttribute(DELIVERY_ORDER_LINK,'href');
        break;
      case enums.DeliveryOption.INSTALLATION:
        orderLink = await webDriverHelper.getElementAttribute(INSTALLATION_ORDER_LINK,'href');
        break;
      default:
        orderLink = await webDriverHelper.getElementAttribute(RECENT_ORDER_LINK,'href');
    }
    return orderLink
  }
};