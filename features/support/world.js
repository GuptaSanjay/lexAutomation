const { setWorldConstructor } = require('cucumber');
const {setDefaultTimeout} = require("cucumber");

const seleniumWebdriver = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');
let chrome = require('selenium-webdriver/chrome');
let chromeDriver = require('chromedriver');

function World({attach}) {
  this.attach = attach;

  this.driver = new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    .build();

  // Returns a promise that resolves to the element
  this.waitForElement = function(locator) {
    const condition = seleniumWebdriver.until.elementLocated(locator)
    return this.driver.wait(condition)
  }
}

setWorldConstructor(World)
setDefaultTimeout(6*1000);