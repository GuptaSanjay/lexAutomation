const {After,Before,AfterAll} = require("cucumber");
const reporter = require('cucumber-html-reporter');

// Before(function () {
//   return driver.manage().window().setSize(1680, 1050);
// });

After(async function (scenario) {
  let world = this;
  if (scenario.result.status === "failed") {
    await driver.takeScreenshot().then(function (screenShot) {
      world.attach(screenShot, 'image/png');
    });
  } else {
    await driver.takeScreenshot().then(function (screenShot) {
      world.attach(screenShot, 'image/png');
    });
  }
  await driver.quit();
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