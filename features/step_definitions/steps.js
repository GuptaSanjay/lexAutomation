const { Given, When, Then } = require("cucumber");
// const { expect } = require("chai");

Given(/^I am logged in to salesforce$/, {timeout: 18000}, async function () {
  await driver.get("https://test.salesforce.com/");

  await driver.findElement({id:'username'}).then(async function (el) {
    await el.sendKeys('autotest.lightuser@bgch.co.uk.octopus.test');
  });
  await driver.sleep(1000);

  await driver.findElement({id:'password'}).then(async function (el) {
    await el.sendKeys('Liverpool99');
  });
  await driver.sleep(1000);

  await driver.findElement({id:'Login'}).then(async function (el) {
    await el.click();
  });
  await driver.sleep(10000);
});

When(/^I create a new customer$/, function () {

});
When(/^I create a new zquote$/, function () {

});