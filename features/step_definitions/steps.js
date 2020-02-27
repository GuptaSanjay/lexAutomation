// const { Given, When, Then } = require("cucumber");
// // const { expect } = require("chai");
// const wd = require('../../runtime/webDriverHelper');
//
// Given(/^I am logged in to salesforce$/, {timeout: 36000}, async function () {
//   await driver.get("https://test.salesforce.com/");
//
//
//   await wd.setValueByElementId('username', 'autotest.lightuser@bgch.co.uk.octopus.test');
//   await wd.setValueByElementId('password1', 'Liverpool99');
//   await wd.clickByElementId('Login');
//
//    let name = await driver.findElement({xpath:'.//*[starts-with(@name, "vfFrameId")]'}).getAttribute('name');
//    await driver.switchTo().frame(name);
//     await driver.findElement({xpath:'.//*[@data-id="saveButton"]'}).then(async function (el) {
//       await el.click();
//     });
// });
//
// When(/^I create a new customer$/, function () {
//
// });
// When(/^I create a new zquote$/, function () {
//
// });