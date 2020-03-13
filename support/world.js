const {setWorldConstructor} = require('cucumber');
const {setDefaultTimeout} = require("cucumber");

const seleniumWebdriver = require('selenium-webdriver');
const {Before} = require("cucumber");

global.SHORT_WAIT = 3000;  // 3 second delay in milliseconds
global.MID_WAIT = 5000;    // 5 second delay in milliseconds
global.LONG_WAIT = 10000;  // 10 second delay in milliseconds
global.EXTRA_LONG_WAIT = 20000;  // 20 second delay in milliseconds

Before(async function () {
  global.driver = await getDriverInstance();
});

function getDriverInstance() {
  let browser = settings.browserName;
  let remoteService = settings.remoteService;
  //http://ec2-52-212-140-72.eu-west-1.compute.amazonaws.com:4444/wd/hub

  if(remoteService) {
    return new seleniumWebdriver.Builder()
      .forBrowser('chrome')
      .setChromeOptions('--no-sandbox')
      .setChromeOptions('--disable-dev-shm-usage')
      .usingServer(remoteService)
      .build();

  } else {
    return new seleniumWebdriver.Builder()
        .forBrowser(browser)
        .build();
  }
}

function World({attach}) {
  this.attach = attach;

  // Returns a promise that resolves to the element
  this.waitForElement = function (locator) {
    const condition = seleniumWebdriver.until.elementLocated(locator);
    return this.driver.wait(condition);
  }
}

setWorldConstructor(World);
setDefaultTimeout(36 * 1000);
