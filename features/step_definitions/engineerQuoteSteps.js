'use strict';
const assert = require('../../lib/assertLib');
const headerPage = require('../../page-objects/headerPage');
const addressPage = require('../../page-objects/addressPage');
const commonPage = require('../../page-objects/commonPage');
const customerLib = require('../../lib/customerLib');
const engineerQuotePage = require('../../page-objects/engineerQuotesPage');
const webPage = require('../../page-objects/webPage');
const {Then} = require("cucumber");
const {When} = require("cucumber");
const {Given} = require("cucumber");

Given(/^I am on General help page on web for UK$/, async function () {
  let url = 'https://qatest:ag1eeG9o@hivehome-release.herokuapp.com/support/Help_Using_Hive/HUH_Hive_Active_Light/How-do-I-turn-my-Hive-Active-Light-on-and-off-manually';
  await helpers.loadPage(url, 10);
});

When(/^I create a new Address$/, async function () {
  await headerPage.clickAddressesTab();
  await addressPage.clickNewButton();
  await commonPage.switchToIframe();
  await addressPage.setAddressInformation();
  await addressPage.clickSave();
});

When(/^I create a new Agent Quote$/, async function () {
  customerLib.createCustomerPersonalInformation('');
  await addressPage.clickNewAgentQuoteButton();
  await engineerQuotePage.setEngineerQuoteContactDetails();
  await engineerQuotePage.clickSaveEngineerQuote();
});


Given(/^I create a new (.*) engineer quote line item$/, async function (quoteType) {
  await engineerQuotePage.clickRelatedTab();
  await engineerQuotePage.clickNewEngineerQuoteLineItemButton();
  await engineerQuotePage.setEngineerQuoteLineItemDetails(quoteType);
  await engineerQuotePage.clickSaveEngineerQuoteLineItemDetails();
});

When(/^I create a new (.*) Engineer Quote$/, async function (quoteType) {
  customerLib.createCustomerPersonalInformation('');
  await addressPage.clickNewEngineerQuoteButton();
  await engineerQuotePage.selectType(quoteType);
  await engineerQuotePage.setEngineerQuoteContactDetails();
  await engineerQuotePage.clickSaveEngineerQuote();
});

Then(/^I should see the following on engineer quote page related tab/, async function (dataTable) {
  await driver.pause(2000);
  await engineerQuotePage.clickRelatedTab();
  let rows = dataTable.raw();
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0];
    let condition = rows[i][1];
    let expectedResult = rows[i][2];
    let actualResult = '';

    switch (field) {
      case "Quantity":
        actualResult = await engineerQuotePage.getEngineerQuoteLineItemsQuantity();
        break;
      case "Price":
        actualResult = await engineerQuotePage.getEngineerQuoteLineItemsPrice();
        break;
      case "Total Price":
        actualResult = await engineerQuotePage.getEngineerQuoteLineItemsTotalPrice();
        break;
      case "Job Time":
        actualResult = await engineerQuotePage.getEngineerQuoteLineItemsJobTime();
        break;
    }
    assert.validate(field, condition, expectedResult, actualResult);
  }
});


Then(/^I should see the following on engineer quote page details tab$/, async function (dataTable) {
  await engineerQuotePage.clickDetailsTab();
  let rows = dataTable.raw();
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0];
    let condition = rows[i][1];
    let expectedResult = rows[i][2];
    let actualResult = '';

    switch (field) {
      case 'Status':
      actualResult =  await engineerQuotePage.getStatus();
        break;
      case 'Record Type':
        actualResult =  await engineerQuotePage.getRecordType();
        break;
      case 'Quote Date':
        actualResult =  await engineerQuotePage.getQuoteDate();
        break;
      case 'Expiry Date':
        actualResult =  await engineerQuotePage.getExpiryDate();
        break;
      case 'Subscription':
        actualResult = await engineerQuotePage.getSubscription();
        break;
      case 'Job':
        actualResult = await engineerQuotePage.getJob();
        break;
      case 'Contact':
        actualResult = await engineerQuotePage.getContact();
        break;
      case 'In Day Products':
        actualResult = await engineerQuotePage.getInDayProducts();
        break;
      case 'Future Day Products':
        actualResult = await engineerQuotePage.getFutureDayProducts();
        break;
      case 'Delivery Products':
        actualResult = await engineerQuotePage.getDeliveryProducts();
        break;
    }
    assert.validate(field, condition, expectedResult, actualResult);
  }
});


When(/^I complete (.*) sales over the phone$/, {timeout: 180000}, async function (quoteType) {
  //await commonPage.refreshPage();
  await driver.pause(2000);
  await engineerQuotePage.clickCompleteSaleOverThePhone();
  await driver.pause(10000);
  await commonPage.switchToIframe();
  await webPage.clickAccept();
  await driver.pause(5000);
  await webPage.clickCheckout();
  await driver.pause(5000);
  await webPage.acceptTermsConditions(quoteType);
  await webPage.clickNextStep();
  if(quoteType === 'Future-day' || quoteType === 'Install'){
    await webPage.selectInstallationAppointment();
    await webPage.clickInstallationNextStep();
  } else if (quoteType ==='Non-Install' || quoteType ==='Delivery' ){
    await driver.pause(5000);
    await webPage.clickDeliveryNextStep();
  }
  await driver.pause(10000);
  await webPage.setPaymentDetails();
  await webPage.clickPaySecurlyNow();
});

When(/^I go back to engineer quote page$/, async function () {
  await commonPage.switchToIframe();
  await engineerQuotePage.clickBack();
});
