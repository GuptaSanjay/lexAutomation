const { Given, When, Then } = require("cucumber");
// const { expect } = require("chai");

Given(/^I am logged in to salesforce$/, async function () {
  await driver.get("https://test.salesforcessss.com/");

});

When(/^I create a new customer$/, function () {

});
When(/^I create a new zquote$/, function () {

});