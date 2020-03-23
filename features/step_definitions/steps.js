const { Given, When, Then } = require("cucumber");
const wd = require('../../runtime/webDriverHelper');

Given(/^I am a valid user$/, function () {
  wd.navigateTo('https://github.com/settings/keys');
});