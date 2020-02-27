'use strict';
const wd = require('../../runtime/webDriverHelper')
const webDriverHelper = require('../../webdriver/webdriverHelper');
const SINGLE_SALES_PROCESS_SELECT_BUTTON = './/span[.="Select"]';
const ADD_BASE_PRODUCT_BUTTON = './/span[.="Add Base Products"]';
const SEARCH_INPUT = '.searchInput';
const SEARCH_ICON = '.searchButton';
const CONFIGURE_BUTTON = '.configureButton';
const DONE_BUTTON = '.doneButton';
const NEXT_BUTTON = '.nextButton';

module.exports = {
  selectProduct: async function (ratePlan) {

    await wd.click(SINGLE_SALES_PROCESS_SELECT_BUTTON);
    await wd.click(ADD_BASE_PRODUCT_BUTTON);
    await wd.setValue(SEARCH_INPUT, ratePlan);
    await wd.click(SEARCH_ICON);
    await driver.sleep(10000);
    await wd.click(CONFIGURE_BUTTON);
    await wd.click(DONE_BUTTON);

  },

  clickNext: async function () {
    await wd.click(NEXT_BUTTON);
    // await webDriverHelper.waitForPageLoad();
  },

  switchToIframe: async function(){
    await webDriverHelper.waitForIFrame();
    let iframeName = await webDriverHelper.getElementAttribute('.//*[starts-with(@name, "vfFrameId")]', 'name');
    await webDriverHelper.switchToIframe( iframeName);
  },
};