const { setWorldConstructor } = require('cucumber');
const {setDefaultTimeout} = require("cucumber");

const seleniumWebdriver = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');
let chrome = require('selenium-webdriver/chrome');
let chromeDriver = require('chromedriver');
const {Before} = require("cucumber");

Before(async function () {
  let driver = await getDriverInstance();
  global.driver = driver;
})

function getDriverInstance() {
  return new seleniumWebdriver.Builder()
    .forBrowser('chrome')
     .usingServer('')
     // .usingServer('http://ec2-52-212-140-72.eu-west-1.compute.amazonaws.com:4444/wd/hub')
    .build();
}

function World({attach}) {
  this.attach = attach;

  // Returns a promise that resolves to the element
  this.waitForElement = function(locator) {
    const condition = seleniumWebdriver.until.elementLocated(locator)
    return this.driver.wait(condition)
  }
}

setWorldConstructor(World)
setDefaultTimeout(6*1000);