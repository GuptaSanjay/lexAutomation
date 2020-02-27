'use strict';
// const helpers = require('klassi-cucumber-js/runtime/helpers');
const wd = require('../runtime/webDriverHelper');
const webDriverHelper = require('../webdriver/webdriverHelper');
const customerLib = require('../lib/customerLib');

const SEARCH_SALESFORCE = './/*[@title="Search Salesforce"]';
const ONE_APP_LAUNCHER = './/one-app-launcher-header/button';
const SUBSCRIPTION_LINK = './/span/span[.="Subscriptions"]';
const MENU_LINK = './/span[.=\'Create Customer\']/..';

module.exports = {
  elements: {
    menuLink: './/*[@class="slds-icon-waffle"]',
    salesnServiceLink: './/a[.="BGCH - Sales & Service" and @class="appTileTitleNoDesc"]',
    createCustomerLink: './/*[.="Create Customer"]/..    ',
  },

  /**
   * Navigate to sales and service section
   * @returns {Promise<void>}
   */
  navigateToSalesAndService: async function () {
    await helpers.waitAndClick(this.elements.menuLink);
    await helpers.waitAndClick(this.elements.salesnServiceLink);
  },

  clickCreateCustomerLink: function() {
    return wd.click(MENU_LINK);
  },

  navigateToExistingCustomerAccountPage: async function (ratePlan, firstNamePrefix) {
    await webDriverHelper.shortWait();
    let existingCustomerName = customerLib.getExistingCustomerSearchableName(ratePlan, firstNamePrefix);
    await webDriverHelper.waitAndSetValue(SEARCH_SALESFORCE, existingCustomerName);
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick('.//div[.="Account"]/../..');
  },

  navigateToNewCustomerAccountPage: async function (customerName) {
    await helpers.loadPage('https://connectedhome--test.lightning.force.com/lightning/page/home', 10);
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick('.//*[@data-id="Account"]');
    await webDriverHelper.waitAndClick('.//th/span/a[.="'+customerName+'"]');
  },

  clickAddressesTab: async function(){
    await webDriverHelper.waitAndClick('.//*[@data-id="0KD200000003KYqGAM"]');
  },

  navigateToSubscriptionPage: async function() {
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(ONE_APP_LAUNCHER);
    await webDriverHelper.shortWait();
    //await webDriverHelper.waitAndClick(SUBSCRIPTION_LINK);
    await webDriverHelper.waitAndClick('.//*[@type=\'button\' and text()=\'View All\']');
    await webDriverHelper.mediumWait();
    let subscription=await webDriverHelper.getElementAttribute('.//p[starts-with(.,\'Subscriptions\')]/../../../..','href');
    await helpers.loadPage(subscription,10);
    //await webDriverHelper.waitScrollClick('.//p[starts-with(.,\'Subscriptions\')]/../../../..');
    //await webDriverHelper.waitAndScroll('.//*[text()=\'Subscriptions\']');
    //await webDriverHelper.waitAndClick('.//*[text()=\'Subscriptions\']');

  }
};