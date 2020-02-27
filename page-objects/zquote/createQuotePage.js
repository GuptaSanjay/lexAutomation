'use strict';
const wd = require('../../runtime/webDriverHelper');

const webDriverHelper = require('../../webdriver/webdriverHelper');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');
const SOURCE_SELECT = './/label[.="*Source"]/../following-sibling::td[1]/div/select';
const SOURCE_COUNTRY_SELECT = './/label[.="*Source Country"]/../following-sibling::td[1]/div/select';
const COMMUNICATION_PROFILE =  './/label[contains(text(),"Communication Profile")]/../following-sibling::td[1]/div/div/input';
const NEXT_BUTTON = './/button[.="Next"]';
const IFRAME = './/*[starts-with(@name, "vfFrameId")]';

module.exports = {
  selectSource: async function (sourceValue) {
    return wd.selectByValue(sourceValue);
    // return webDriverHelper.waitAndSelectByValue(SOURCE_SELECT, sourceValue);
  },

  selectSourceCountry: async function(){
    let country = scenarioSession.getSourceCountry();
    return wd.selectByValue(country);
    // return webDriverHelper.waitAndSelectByValue(SOURCE_COUNTRY_SELECT, country);
  },

  clickNext: async function () {
    return wd.click(NEXT_BUTTON);
  },

  switchToIframe: async function(){
    await wd.switchToIframe();
    // await webDriverHelper.waitForIFrame();
    // await webDriverHelper.switchToIframe()
  },

};