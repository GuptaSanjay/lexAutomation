'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');
const NEXT_BUTTON = './/input[@value="Next"]';

module.exports = {
  clickNext: function () {
    return webDriverHelper.waitAndClick(NEXT_BUTTON);
  }
};