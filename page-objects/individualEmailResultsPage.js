'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const EMAIL_ROWS = './/span[@title="Name"]/../../../../../following-sibling::tbody/tr';
const CONTACT_PAGE_BREADCRUMB_LINK = './/div[@class="windowViewMode-normal oneContent active lafPageHost"]/div/div/div/div/div/div/div/nav/ol/li/a[.="Contacts"]/../following-sibling::li/a';

module.exports = {
  getEmailNotificationCount: async function () {
    return webDriverHelper.getElementsCount(EMAIL_ROWS);
  },

  navigateToContactPage: async function () {
    return webDriverHelper.waitAndClick(CONTACT_PAGE_BREADCRUMB_LINK);
  }
}