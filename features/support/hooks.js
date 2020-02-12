const {After,Before,AfterAll} = require("cucumber");
const reporter = require('cucumber-html-reporter');

Before(function () {
  console.log('\x1b[33m%s\x1b[0m', 'Execution Started');
  return this.driver.manage().window().setSize(1680, 1050);
});

After(async function (scenario) {
  if (scenario.result.status === "passed") {
    return this.attach('Some text Test§', 'text/plain');
  }
  let world = this;
  if (scenario.result.status === Status.FAILED) {
    await this.driver.takeScreenshot().then(function (screenShot) {
      world.attach(screenShot, 'image/png');
    });
  }
});

After(function () {
  return this.driver.quit();
});

AfterAll(function () {
  console.log('\x1b[33m%s\x1b[0m', 'Execution Ended');

  // let options = {
  //   theme: 'bootstrap',
  //   // jsonFile: './reports/cucumber-json-report.json',
  //   // output: './reports/cucumber-html-report.html',
  //   reportSuiteAsScenarios: true,
  //   launchReport: false,
  //   metadata: {
  //     "App Version": "1.0.0",
  //     "Test Environment": "STAGING",
  //     "Browser": "Chrome  54.0.2840.98",
  //     "Platform": "Mac 10",
  //     "Parallel": "Scenarios",
  //     "Executed": "Local"
  //   }
  // };
  // // await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec
  //  reporter.generate(options);
  //  return;
  // await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec
});


//
// AfterAll(async function () {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
//   console.log("I am 3 ");
// });
//
// AfterAll(async function () {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
//   console.log("I am 2 ");
// });
//
// AfterAll(async function () {
//   await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
//   console.log("I am 1");
// });
