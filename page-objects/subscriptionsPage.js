'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const util = require('../utility/util');
const customerLib = require('../lib/customerLib');

const SUBSCRIPTION_STATUS = '(.//div/span[.="Status"]/../following-sibling::div/span' + util.getLightningFormatedText() + ')[last()]';
const SOURCE_COUNTRY = '(.//div/span[.="Source Country"]/../following-sibling::div/span' + util.getLightningFormatedText() + ')[last()]';
const SOURCE = '(.//div/span[.="Source"]/../following-sibling::div/span' + util.getLightningFormatedText() + ')[last()]';

const RELATED_TAB = './/a[.="Related"]';
// const ACCOUNT_NAME = './/span[.="Account"]/../following-sibling::div/span/slot/slot/force-lookup/div/force-hoverable-link/div/a'; 23-09-2019
const ACCOUNT_NAME = './/span[.="Account"]/../following-sibling::div/span' + util.getLightningForceHoverableLink();

const VERSION = '(.//span[.="Version"]/../following-sibling::div/span' + util.getLightningFormatedNumber() + ')[last()]';
const SUBSCRIPTION_NAME = '(.//div/span[.="Subscription Name"]/../following-sibling::div/span' + util.getLightningFormatedText() + ')[last()]';
const SUBSCRIPTION_START_DATE = '(.//span[.="Subscription Start Date"]/../following-sibling::div/span' + util.getLightningFormatedText() + ')[last()]';
const SUBSCRIPTION_ORDER_STATUS = './/span[.="Order Number"]/../../../../../following-sibling::tbody/tr[1]/td[2]';
const SUBSCRIPTION_ROW_COUNT = './/*[.="Subscription Rate Plan Name (Short Name)"]/../../../../../following-sibling::tbody/tr';
const PRODUCT_QUANTITY = '(.//*[.="Quantity"]/../../../../../following-sibling::tbody/tr/td[4]/span/span)[1]';
const CANCEL_SUBSCRIPTION_BUTTON = './/button[@type=\'button\'and text()="Cancel Subscription"]';

const SUBJECT_INPUT = './/span[.="Subject"]/../following-sibling::input';
const CASE_SOURCE_SELECT = './/span[.="Case Source"]/../following-sibling::div/div/div/div/a';
const CASE_SOURCE_PHONE = './/a[.="Phone"]';
const LOCALE_SELECT = './/span[.="Locale"]/../following-sibling::div/div/div/div/a';

const POINT_OF_CUSTOMER_JOURNEY_SELECT = './/span[.="Point of Customer Journey"]/../following-sibling::div/div/div/div/a';
const POINT_OF_CUSTOMER_JOURNEY_BEFORE_INSTALL_APPOINTMENT = './/a[.="Before Install Appointment"]';
const CANCELLATION_REASON_SELECT = './/*[.="Cancellation Reason"]/../following-sibling::div/div/div/div/a';
const CANCELLATION_REASON_SELECT_CUSTOMER_REQUEST = './/a[.="Customer Request"]';
const PRODUCT_AREA_SELECT = './/*[.="Product Area"]/../following-sibling::div/div/div/div/a';
const PRODUCT_AREA_ACTIVE_LIGHT = './/a[.="Active Light"]';
const SAVE_BUTTON = '(.//span[.="Save"])[last()]';
const RECENT_CASE = './/*[.="Case Number"]/../../../../../following-sibling::tbody/tr[last()]/th/span/a';
const CASES_HEADING = '(.//*[@title="Cases"])[last()]';
const RAISE_RETURN_SELECT = './/*[@name="needReturn"]';
const RETURN_OPTION_NO = './/span[@title="No"]';
const RETURN_REASON_SELECT = './/*[@name="noReturnReason"]';
const RETURN_REASON_OPTION = './/*[@title="Product removed by engineer"]';
const PROCEED_BUTTON = './/*[@title="Proceed"]';

module.exports = {

  navigateToAccountPage: function () {
    return webDriverHelper.navigateBack();
  },

  clickRelatedTab: async function () {
    await webDriverHelper.mediumWait();
    await webDriverHelper.scrollToTop();
    await webDriverHelper.waitAndClick(RELATED_TAB);
  },

  getSubscriptionStatus: async function () {
    return webDriverHelper.getElementText(SUBSCRIPTION_STATUS);
    // return webDriverHelper.getElementText(SUBSCRIPTION_STATUS).then(subscriptionStatus => {
    //   if (Array.isArray(subscriptionStatus)) {
    //     let temp = subscriptionStatus.filter(Boolean);
    //     subscriptionStatus = temp[0];
    //   }
    //   return subscriptionStatus;
    // })
  },

  getSourceCountry: async function () {
    return webDriverHelper.getElementText(SOURCE_COUNTRY);
  },

  getSource: async function () {
    return webDriverHelper.getElementText(SOURCE);
  },

  getAccountName: async function () {
    return webDriverHelper.getElementText(ACCOUNT_NAME);
  },

  getVersion: async function () {
    return webDriverHelper.getElementText(VERSION);
  },

  getSubscriptionName: async function () {
    return webDriverHelper.getElementText(SUBSCRIPTION_NAME);
  },

  getSubscriptionStartDate: async function () {
    return webDriverHelper.getElementText(SUBSCRIPTION_START_DATE);
  },

  getSubscriptionRowCount: async function () {
    return webDriverHelper.getElementsCount(SUBSCRIPTION_ROW_COUNT);
  },

  getProductQuantity: async function () {
    return webDriverHelper.getElementText(PRODUCT_QUANTITY);
  },

  getOrderStatus: async function () {
    return webDriverHelper.getElementText(SUBSCRIPTION_ORDER_STATUS);
  },

  clickCancelSubscription: async function () {
    await webDriverHelper.waitAndClick(CANCEL_SUBSCRIPTION_BUTTON);
  },

  setCancelSubscriptionForm: async function () {
    await webDriverHelper.waitAndSetValue(SUBJECT_INPUT, "Cancellation");
    await webDriverHelper.waitAndClick(CASE_SOURCE_SELECT);
    await webDriverHelper.waitAndClick(CASE_SOURCE_PHONE);
    await webDriverHelper.waitAndClick(LOCALE_SELECT);
    const locale = customerLib.getCustomerLocaleName();
    await webDriverHelper.waitAndClick('.//li/a[.="' + locale + '"]');
    await webDriverHelper.waitAndClick(POINT_OF_CUSTOMER_JOURNEY_SELECT);
    await webDriverHelper.waitAndClick(POINT_OF_CUSTOMER_JOURNEY_BEFORE_INSTALL_APPOINTMENT);
    await webDriverHelper.waitAndClick(CANCELLATION_REASON_SELECT);
    await webDriverHelper.waitAndClick(CANCELLATION_REASON_SELECT_CUSTOMER_REQUEST);
    await webDriverHelper.waitAndClick(PRODUCT_AREA_SELECT);
    await webDriverHelper.waitAndClick(PRODUCT_AREA_ACTIVE_LIGHT);
    await webDriverHelper.waitAndClick(SAVE_BUTTON);
  },

  clickCasesHeading: async function () {
    // await browser.execute(async () => await document.querySelector('h2 > a[title~=Cases]').click());
    await webDriverHelper.waitAndClick(CASES_HEADING);
  },

  clickRecentCase: async function () {
    await webDriverHelper.waitAndClick(RECENT_CASE);
  },

  fillReturnForm: async function () {
    await webDriverHelper.waitAndClick(RAISE_RETURN_SELECT);
    await webDriverHelper.waitAndClick(RETURN_OPTION_NO);
    await webDriverHelper.waitAndClick(RETURN_REASON_SELECT);
    await webDriverHelper.waitAndClick(RETURN_REASON_OPTION);
    await webDriverHelper.waitAndClick(PROCEED_BUTTON);
  },

  waitAndRefreshForCondition: async function (field, condition) {
    let counter = 0;
    if (field === 'Status') {
      let status = await this.getSubscriptionStatus();
      while (status !== condition && counter < 10) {
        await webDriverHelper.longDelayAndRefresh();
        status = await this.getSubscriptionStatus();
        counter++;
      }
    } else if (field === 'Version') {
      let version = await this.getVersion();
      while (version !== condition && counter < 10) {
        await webDriverHelper.longDelayAndRefresh();
        version = await this.getVersion();
        counter++;
      }
    }
  },
};
