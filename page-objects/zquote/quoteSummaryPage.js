'use strict';
const wd = require('../../runtime/webDriverHelper');

const webDriverHelper =   require('../../webdriver/webdriverHelper');
const NEXT_BUTTON = './/button[.="Next"]';

module.exports = {
  clickNext: async function(){
   // await webDriverHelper.longWait();
   //  return webDriverHelper.waitAndClick(NEXT_BUTTON);
    return wd.click(NEXT_BUTTON);
  },

  // switchToIframe: async function(){
  //   await webDriverHelper.waitForIFrame();
  //   await webDriverHelper.switchToIframe();
  // },
};