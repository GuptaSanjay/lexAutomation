'use strict';
const RECENTLY_VIEWED_SELECT =  './/span[.="Recently Viewed"]/.././a';
const webDriverHelper = require('../webdriver/webdriverHelper');
const scenarioSession = require('../scenarioSession/scenarioSessionData');
const RECENT_SUBSCRIPTION = './/span[.="Subscription Name"]/../../../../../following-sibling::tbody/tr[1]/th/span/a';

module.exports = {
  selectSubscriptionView: async function(subscriptionView){
    await webDriverHelper.waitAndClick(RECENTLY_VIEWED_SELECT);
    let view = '';
    let sourceCountry = scenarioSession.getSourceCountry();
    switch (subscriptionView) {
      case 'Today':
        await webDriverHelper.waitAndSetValue('.//div[text()=\'Recent List Views\']/../../../../../../../input',""+sourceCountry+"");
        view = './/span[.="'+sourceCountry+'"]/..';
        break;
      case 'Partial':
        await webDriverHelper.waitAndSetValue('.//div[text()=\'Recent List Views\']/../../../../../../../input',""+sourceCountry+"_Partial");
        view = './/span[.="'+sourceCountry+'_Partial"]/..';
        break;
      case 'Zero Price':
        await webDriverHelper.waitAndSetValue('.//div[text()=\'Recent List Views\']/../../../../../../../input',""+sourceCountry+"_ZeroPrice");
        view = './/span[.="'+sourceCountry+'_ZeroPrice"]/..';
        break;
      case 'MultiQty 7 Days':
        await webDriverHelper.waitAndSetValue('.//div[text()=\'Recent List Views\']/../../../../../../../input',""+sourceCountry+"_MultiQty_Last7Days");
        view = './/span[.="'+sourceCountry+'_MultiQty_Last7Days"]/..';
        break;
      case 'ETF':
        await webDriverHelper.waitAndSetValue('.//div[text()=\'Recent List Views\']/../../../../../../../input',""+sourceCountry+"_ETF");
        view = './/span[.="'+sourceCountry+'_ETF"]/..';
        break;
    }
    await webDriverHelper.waitAndClick(view);
  },

  clickRecentSubscription: async function(){
    await webDriverHelper.shortWait();
    await webDriverHelper.waitAndClick(RECENT_SUBSCRIPTION);
  }
};