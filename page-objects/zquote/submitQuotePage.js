'use strict';
const wd = require('../../runtime/webDriverHelper');
const webDriverHelper =   require('../../webdriver/webdriverHelper');
const CONFIRMATION_MESSAGE = 'table.detailList tr td.first';
const SUBMIT_BUTTON = '.nextButton';
const CONTINUE_BUTTON = './/span/span[.="Continue"]';
const iFrame = 'j_id1';

module.exports = {
  getConfirmationMessage: async function (quoteType) {
    if(quoteType === 'new'){
      // await wd.switchToIframeByNameOrId(iFrame);
    }
    return wd.getText(CONFIRMATION_MESSAGE);
  },

  clickSubmit: function(){
    return  wd.click(SUBMIT_BUTTON);
  },

  clickContinue: function(){
    return  wd.click(CONTINUE_BUTTON);
  },

  switchToIframe: function(){
    return wd.switchToIframe();
  },
};