'use strict';
const {When, Then } = require("cucumber");
const customerPage = require('../../page-objects/customerPage');
const accountPage = require('../../page-objects/accountPage');
const headerPage = require('../../page-objects/headerPage');
const customerLib = require('../../lib/customerLib');
const enums = require('../../enum/const');
const assert = require('../../lib/assertLib')

When(/^I create a new customer account with prefix "([^"]*)"$/, async function (firstNamePrefix) {
  //Create customer information for form
  await customerLib.createCustomerPersonalInformation(firstNamePrefix);
  customerLib.createCustomerAccountInformation();
  customerLib.createCustomerAddressInformation();

  await headerPage.clickCreateCustomerLink();
  await customerPage.setCustomerPersonalInformationForm();
  // await customerPage.setCustomerAccountInformationForm();
  await customerPage.clickNewAddressButton();
  await customerPage.setCustomerAddressInformationForm();
  await customerPage.clickSaveAddress();
  await customerPage.clickSave();
});

Then(/^I validate account type is (Customer|Prospect)$/, async  function (accountType) {
  let actualAccountType = await accountPage.getCustomerAccountType();
  await assert.validate('\nExpected account type = '+accountType+'\n But actual value = '+actualAccountType, enums.Assertion.IS_EQUAL, accountType, actualAccountType);
  // await assert.equal(actualAccountType, accountType, '\nExpected account type = '+accountType+'\n But actual value = '+actualAccountType);
});
