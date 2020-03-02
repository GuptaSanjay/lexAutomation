const {setWorldConstructor} = require('cucumber');
const {setDefaultTimeout} = require("cucumber");

const seleniumWebdriver = require('selenium-webdriver');
const {Before} = require("cucumber");

Before(async function () {
  console.log("Starting at Before");
  global.driver = await getDriverInstance();
});

function getDriverInstance() {
  let browser = settings.browserName;
  let remoteService = settings.remoteService;
  //http://ec2-52-212-140-72.eu-west-1.compute.amazonaws.com:4444/wd/hub

  if(remoteService) {
    return new seleniumWebdriver.Builder()
      .forBrowser(browser)
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
