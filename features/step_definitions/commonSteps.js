'use strict';
const loginPage = require('../../page-objects/loginPage');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');
const loginProperties = require('../../data/loginProperties');
const ratePlanProperties = require('../../data/ratePlanProperties');
const voucherProperties = require('../../data/voucherProperties');
const headerPage = require('../../page-objects/headerPage');
const utilLib = require('../../lib/utilLib');
const accountPage = require('../../page-objects/accountPage');
const {Given} = require('cucumber');

Given(/^I am logged in as (.*) on Salesforce for (.*)$/, async function (userProfile, sourceCountry) {scenarioSession.setSourceCountry(sourceCountry);
  await driver.get(loginProperties.getSalesforceURL());
  await loginPage.loginSF(userProfile, sourceCountry);
});

Given(/^I have a rate plan (.*)$/, async function (ratePlanType ) {
  scenarioSession.setRatePlan(ratePlanProperties.getRatePlan(ratePlanType));
  return scenarioSession.setRatePlanPaymentType(utilLib.getRatePlanPaymentTypeByRatePlan(ratePlanType));
});

Given(/^I apply voucher code (.*)$/, async function (voucherType) {
  await scenarioSession.setVoucherCode(voucherProperties.getVoucherCode(voucherType))
});

Given(/^I navigate to existing customer account page with (.*) and prefix "([^"]*)"$/, async function (ratePlanType, firstNamePrefix) {
  let ratePlan = ratePlanProperties.getRatePlan(ratePlanType.replace('-NEW', ""));
  await headerPage.navigateToExistingCustomerAccountPage(ratePlan, firstNamePrefix);
  let accountName = await accountPage.getAccountName();
  let customerName = accountName.split(" ");
  scenarioSession.setCustomerFirstName(customerName[0]);
  scenarioSession.setCustomerLastName(customerName[1]);
});
