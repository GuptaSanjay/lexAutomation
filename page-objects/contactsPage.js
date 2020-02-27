'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');

const FIRST_CONTACT_LINK = './/span[.="Contact Name"]/../../../../../following-sibling::tbody/tr/th/span/a';
const EMAIL_NOTIFICATIONS = './/a/span[.="Email Notifications"]';
const VIEW_ALL_EMAIL_NOTIFICATIONS = './/a/span[.="Email Notifications"]';
const ACCOUNT_NAME_LINK = './/*[.="Account Name"]/following-sibling::div/div/div/a';

module.exports = {
  clickContacts: async function(){
    return webDriverHelper.waitAndClick(FIRST_CONTACT_LINK);
  },

  viewAllEmailNotifications:async function() {
    return webDriverHelper.waitAndClick(VIEW_ALL_EMAIL_NOTIFICATIONS);
  },

  navigateToAccountPage : async function() {
    return webDriverHelper.waitAndClick(ACCOUNT_NAME_LINK);
  }
};