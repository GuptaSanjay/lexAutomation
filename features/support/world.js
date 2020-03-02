const { setWorldConstructor } = require('cucumber');
const {setDefaultTimeout} = require("cucumber");

const seleniumWebdriver = require('selenium-webdriver');
const {Before} = require("cucumber");

Before(async function () {
  global.driver = await getDriverInstance();
});

function getDriverInstance() {
  let browser =  settings.browserName;

  return new seleniumWebdriver.Builder()
    .forBrowser('chrome')
    // .usingServer('')
    .usingServer('http://ec2-52-212-140-72.eu-west-1.compute.amazonaws.com:4444/wd/hub')
    .build();
}

function World({attach}) {
  this.attach = attach;

  // Returns a promise that resolves to the element
  this.waitForElement = function(locator) {
    const condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition);
  }
}

setWorldConstructor(World);
setDefaultTimeout(36*1000);
