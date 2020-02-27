'use strict';
const wd = require('../runtime/webDriverHelper')
const webDriverHelper = require('../webdriver/webdriverHelper');

const VIEW_ALL='.//span[@class="view-all-label"]';
const VIEW_ALL_LAST='(.//span[@class="view-all-label"])[last()]';

module.exports = {
  loadFullPage: async function(){
    await webDriverHelper.mediumWait();
    let count = await webDriverHelper.getElementsCount(VIEW_ALL);
    await webDriverHelper.waitAndScroll(VIEW_ALL_LAST);
    await webDriverHelper.shortWait();
    let newCount = await webDriverHelper.getElementsCount(VIEW_ALL);
    while (count !== newCount){
      count = newCount;
      await webDriverHelper.waitAndScroll(VIEW_ALL_LAST);
      await webDriverHelper.shortWait();
      newCount = await webDriverHelper.getElementsCount(VIEW_ALL);
    }
  },

  refreshPage: async function(){
    await webDriverHelper.refreshPage();
  },

  switchToIframe: async function(){
    await wd.switchToIframe();
  },
};
