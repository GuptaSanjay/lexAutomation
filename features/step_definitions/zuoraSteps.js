'use strict';
const {When, Then } = require("cucumber");
const assert = require('../../lib/assertLib');
const util = require('../../lib/utilLib');
const zuoraLoginPage = require('../../page-objects/zuora/zuoraLoginPage');
const zuorahomePage = require('../../page-objects/zuora/zuoraHomePage');
const zuoraAccountPage = require('../../page-objects/zuora/zuoraAccountPage');
const zuoraAccountListPage = require('../../page-objects/zuora/zuoraAccountListPage');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');


When(/^I am logged in on Zuora$/, async function () {
  await helpers.loadPage('https://apisandbox.zuora.com/apps/newlogin.do', 10);
  await zuoraLoginPage.login();

});

When(/^I navigate to given customer account page on zuora$/, async function () {
  await zuorahomePage.clickCustomerAccountLink();
  await zuoraAccountListPage.clickCustomerLink(scenarioSession.getAccountName());

});

Then(/^I should see following (.*) information on zuora customer account page$/, async function (infType, dataTable) {
  if(infType === 'refund'){
    await zuoraAccountPage.clickRefundsTab();
  } if (infType === 'payments') {
    await zuoraAccountPage.clickPaymentsTab();
  }
  let rows = dataTable.raw();
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0];
    let condition = rows[i][1];
    let expectedResult = rows[i][2];
    let actualResult = '';

    switch (field) {
      case 'Subscription Status':
        actualResult = await zuoraAccountPage.getSubscription();
        break;
      case 'Invoice Status':
        actualResult = await zuoraAccountPage.getInvoiceStatus();
        break;
      case 'Refunded Amount':
        actualResult = await zuoraAccountPage.getRefundAmount();
        actualResult = util.removeCurrency(actualResult);
        expectedResult = util.removeCurrency(scenarioSession.getRefundedAmount());
        break;
      case 'Refund Status':
        actualResult = await zuoraAccountPage.getRefundStatus();
        break;
      case 'ETF amount':
        actualResult = await zuoraAccountPage.getPaymentApplied();
        actualResult = util.removeCurrency(actualResult);
        expectedResult = util.removeCurrency(scenarioSession.getETFAmount());
        break;
      case 'Payment Status':
        actualResult = await zuoraAccountPage.getPaymentStatus();
        break;
    }
    assert.validate(field, condition, expectedResult, actualResult);

  }
});