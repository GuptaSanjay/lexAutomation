'use strict';

const program = require('commander');

program
  .version(pjson.version)
  .description(pjson.description)
  .option('-c, --context <path>', 'contextual root path for project-specific features, steps, objects etc', './')
  .option('-f, --featuresPath <path>', 'path to feature definitions. defaults to ./features', 'features')
  .option('-s, --steps <path>', 'path to step definitions. defaults to ./step_definitions', 'step_definitions')
  .option('-p, --pageObjects <path>', 'path to page objects. defaults to ./page-objects', 'page-objects')
  .option('-e, --email [optional]', 'email for sending reports to stakeholders')
  .option('-u, --updateBaselineImage [optional]', 'automatically update the baseline image after a failed comparison')
  .option('-d, --disableReport [optional]', 'Disables the auto opening the browser with test report')
  .option('-o, --sharedObjects [paths]', 'path to shared objects (repeatable). defaults to ./shared-objects', collectPaths, ['shared-objects'])
  .option('-n, --environment [<path>]', 'name of environment to run the framework / test in. default to test', /^(test|dev|uat|prod)$/i, 'dev')
  .option('-b, --browser [optional]', 'name of browser to use. defaults to chrome', /^(chrome|firefox)$/i, 'chrome')
  .option('-r, --reports <path>', 'output path to save reports. defaults to ./reports', 'reports')
  .option('-t, --tags <tagName>', 'name of tag to run')
  .option('-g, --reportName [optional]', 'basename for report files e.g. use report for report.json', global.reportName)
  .option('-x, --extraSettings [optional]','further piped configs split with pipes','')
  .option('-w, --remoteService [optional]', 'which remote driver service, if any, should be used e.g. browserstack', '')

  .parse(process.argv);

program.on('--help', function(){
  console.log('For more details please visit https://github.com/larryg01/klassi-cucumber-js#readme\n');
});


global.browserName = program.browser;
global.envName = 'test';
