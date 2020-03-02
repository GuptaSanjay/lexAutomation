'use strict';

const program = require('commander');
const path = require('path');

// program
//   .version('0.0.1')
//   .description('Something')
//   .option('-c, --context <path>', 'contextual root path for project-specific features, steps, objects etc', './')
//   .option('-f, --featuresPath <path>', 'path to feature definitions. defaults to ./features', 'features')
//   .option('-s, --steps <path>', 'path to step definitions. defaults to ./step_definitions', 'step_definitions')
//   .option('-p, --pageObjects <path>', 'path to page objects. defaults to ./page-objects', 'page-objects')
//   .option('-e, --email [optional]', 'email for sending reports to stakeholders')
//   .option('-u, --updateBaselineImage [optional]', 'automatically update the baseline image after a failed comparison')
//   .option('-d, --disableReport [optional]', 'Disables the auto opening the browser with test report')
//   .option('-o, --sharedObjects [paths]', 'path to shared objects (repeatable). defaults to ./shared-objects', collectPaths, ['shared-objects'])
//   .option('-n, --environment [<path>]', 'name of environment to run the framework / test in. default to test', /^(test|dev|uat|prod)$/i, 'dev')
//   .option('-b, --browser [optional]', 'name of browser to use. defaults to chrome', /^(chrome|firefox)$/i, 'chrome')
//   .option('-r, --reports <path>', 'output path to save reports. defaults to ./reports', 'reports')
//   .option('-t, --tags <tagName>', 'name of tag to run')
//   // .option('-g, --reportName [optional]', 'basename for report files e.g. use report for report.json', global.reportName)
//   .option('-x, --extraSettings [optional]','further piped configs split with pipes','')
//   .option('-w, --remoteService [optional]', 'which remote driver service, if any, should be used e.g. browserstack', '')
//
//
//   .parse(process.argv);

program
  .version('0.0.1')
  .description('Something')
  .option('-n, --environment [<path d="">]', 'name of environment to run the framework / test in. default to test', /^(test|dev|uat|prod)$/i, 'dev')
  .option('-b, --browser [optional]', 'name of browser to use. defaults to chrome', /^(chrome|firefox)$/i, 'chrome')
  .option('-t, --tags <tagName>', 'name of tag to run')
  .option('-p, --reportPath <path d="">', 'output path to save reports. defaults to ./reports', 'reports')
  .option('-r, --reportName [optional]', 'basename for report files e.g. use report for report.json', 'cucumber-json-report')
  .option('-w, --remoteService [optional]', 'address of the selenium grid', '')
  .option('-s, --steps <path d="">', 'path to step definitions. defaults to ./step_definitions', 'step_definitions')
  .parse(process.argv);

program.on('--help', function(){
  console.log('For more details please visit https://github.com/larryg01/klassi-cucumber-js#readme\n');
});


let settings = {
  projectRoot:program.context,
  reportName:program.reportName,
  browserName:program.browser,
  disableReport:program.disableReport,
  updateBaselineImage: program.updateBaselineImage,
  defaultTimeout:(300000 * 1000), // 5 mins
  remoteService:program.remoteService
};

global.settings = settings;

global.envName = program.environment;

//initialise the run arguments
let runArgs = [];
console.log(process.argv);
runArgs.push(process.argv[0], process.argv[1]);

//setting report path and report name
let reportPath = 'json:./'+program.reportPath;
let reportName = '/'+program.reportName+'.json';
runArgs.push('-f', reportPath+reportName);

//if tags are passed to run specific tests
if(program.tags) {
  runArgs.push('-t', program.tags);
}

// /** add cucumber world as first required script (this sets up the globals)
//  */
runArgs.push('-r', path.resolve(__dirname, './support/world.js'));
runArgs.push('-r', path.resolve(__dirname, './support/hooks.js'));

/** add path to import step definitions
 */
runArgs.push('-r', path.resolve('./features/'+program.steps));


let cliArgs = {argv : runArgs, cwd: process.cwd(), stdout: process.stdout};
let cli = new (require('cucumber').Cli)(cliArgs);
console.log("Before CLI RUN");
cli.run();
console.log("After CLI RUN");
