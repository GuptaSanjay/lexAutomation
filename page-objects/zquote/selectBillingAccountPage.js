'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');
const IFRAME = './/*[starts-with(@name, "vfFrameId")]';
const NEXT_BUTTON = './/button[.="Next"]';


module.exports ={
  switchToIframe: async function(){
    await webDriverHelper.waitForIFrame();
    await webDriverHelper.switchToIframe();
  },

  clickNext: async function(){
    return webDriverHelper.waitAndClick(NEXT_BUTTON);
  }
};