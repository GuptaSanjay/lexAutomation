'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const addressProperties = require('../data/addressProperties');


const NEW_BUTTON = './/a[.="New"]';
const LINE_1_INPUT = './/input[contains(@id,"line1")]';
const LINE_2_INPUT = './/input[contains(@id,"line2")]';
const TOWN_INPUT = './/input[contains(@id,"city")]';
const POSTCODE_INPUT = './/input[contains(@id,"postcode")]';
const COUNTRY_INPUT = './/input[contains(@id,"country")]';
const SAVE_BUTTON = './/input[@value="Save"]';
const SHOW_MORE = './/a[@title="Show one more action"]/lightning-icon';
const NEW_AGENT_QUOTE_BUTTON = '(.//button[.="New Agent Quote"])[last()]';      /*'.//a[@title="New Agent Quote"]';*/
const NEW_ENGINEER_QUOTE_BUTTON = '(.//button[.="New Engineer Quote"])[last()]';    /*'.//a[@title="New Engineer Quote"]';*/


module.exports = {
  clickNewButton: async function(){
    await webDriverHelper.waitAndClick(NEW_BUTTON);
  },

  setAddressInformation: async function(){
    await webDriverHelper.waitAndSetValue(COUNTRY_INPUT, addressProperties.getAddressCountryENGQUOTE());
    await webDriverHelper.waitAndSetValue(POSTCODE_INPUT, addressProperties.getAddressPostCodeENGQUOTE());
    await webDriverHelper.waitAndSetValue(TOWN_INPUT, addressProperties.getAddressTownENGQUOTE());
    await webDriverHelper.waitAndSetValue(LINE_2_INPUT, addressProperties.getAddressLine2ENGQUOTE());
    await webDriverHelper.waitAndSetValue(LINE_1_INPUT, addressProperties.getAddressLine1ENGQUOTE());
    },

  clickSave: async function(){
    await webDriverHelper.waitAndClick(SAVE_BUTTON);
  },

  clickNewAgentQuoteButton: async function(){
    await webDriverHelper.shortWait();
    // await webDriverHelper.refreshPage();
    // await webDriverHelper.shortWait();
    //await webDriverHelper.waitAndClick(SHOW_MORE);
    await webDriverHelper.waitAndClick(NEW_AGENT_QUOTE_BUTTON);
  },

  clickNewEngineerQuoteButton: async function(){
    await webDriverHelper.refreshPage();
    await webDriverHelper.mediumWait();
    await webDriverHelper.waitAndClick(NEW_ENGINEER_QUOTE_BUTTON);
  }
};