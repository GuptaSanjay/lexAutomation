'use strict';
const { Given, When, Then } = require("cucumber");
const headerPage = require('../../page-objects/headerPage');
const utilLib = require('../../lib/utilLib');
const subscriptionListPage = require('../../page-objects/subscriptionListPage');
const subscriptionPage = require('../../page-objects/subscriptionsPage');
const commonPage = require('../../page-objects/commonPage');
const casePage = require('../../page-objects/casePage');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');
const assert = require('../../lib/assertLib');
const cancellationRefundPage = require('../../page-objects/cancellationRefundPage');
const etfPage = require('../../page-objects/etfPage');
const enums = require('../../enum/const');

When(/^I navigate to (.*) active subscription$/, async function (subscriptionView) {
  await headerPage.navigateToSubscriptionPage();
  await subscriptionListPage.selectSubscriptionView(subscriptionView);
  await subscriptionListPage.clickRecentSubscription();
});

When(/^I take record of the following from Subscription Page (.*) tab$/, async function (tab, dataTable) {
  if(tab==='related'){
    //await subscriptionPage.clickRelatedTab();
    await commonPage.loadFullPage();
  }
  let list = utilLib.convertGerkinRowToArray(dataTable);
  for (let i = 0; i < list.length; i++) {
    let field = list[i];
    switch (field) {
      case 'Account Name':
        await subscriptionPage.getAccountName().then(accountName => scenarioSession.setAccountName(accountName));
        break;
      case 'Version':
        await subscriptionPage.getVersion().then(version => scenarioSession.setSubscriptionVersion(version));
        break;
      case 'Subscription Name':
        await subscriptionPage.getSubscriptionName().then(subscriptionName => scenarioSession.setSubscriptionName(subscriptionName));
        break;
      case 'Subscription Start Date':
        await subscriptionPage.getSubscriptionStartDate().then(subscriptionStartDate => scenarioSession.setSubscriptionStartDate(subscriptionStartDate));
        break;
      case 'Subscription Rate Plan Count':
        await subscriptionPage.getSubscriptionRowCount().then(subscriptionRowCount => scenarioSession.setSubscriptionRowCount(subscriptionRowCount));
        break;
      case 'Product Quantity':
        await subscriptionPage.getProductQuantity().then(subscriptionProductQuantity => scenarioSession.setSubscriptionProductQuantity(subscriptionProductQuantity));
        break;
      case 'Order Status':
        // await subscriptionPage.getOrderStatus();
        break;
    }
  }
});

Given(/^I cancel the subscription$/, async function () {
  await subscriptionPage.clickCancelSubscription();
  await subscriptionPage.fillReturnForm();
  await subscriptionPage.setCancelSubscriptionForm()
});

// Given(/^I navigate to case page from subscription page$/, async function () {
//   await subscriptionPage.clickRelatedTab();
//   await commonPage.loadFullPage();
//   await subscriptionPage.clickCasesHeading();
//   await subscriptionPage.clickRecentCase();
// });

Then(/^I validate the following on case page (.*) tab$/, async function (tab, dataTable) {
  let rows = dataTable.raw();
  if (tab === 'details'){
    await casePage.clickDetailsTab();
  }
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
    switch (field) {
      case 'Status':
        actualResult = await casePage.getStatus();
        break;
      case 'Case Record Type':
        actualResult = await casePage.getCaseRecordType();
        break;
      case 'Subscription':
        expectedResult = scenarioSession.getSubscriptionName();
        actualResult = await casePage.getSubscription();
        break;
      case 'ETF Status':
        actualResult = await casePage.getETFStatus();
    }
    assert.validate(field, condition, expectedResult, actualResult);
  }
});

When(/^I process the cancellation for case with following$/, async function (dataTable) {
  let rows = dataTable.raw();
  let cancellationType = rows[0][1];
  let cancellationAction = rows[1][1];
  //await casePage.clickShowMoreActions();
  await casePage.clickProcessCancellation();
  await commonPage.switchToIframe();
  await cancellationRefundPage.chooseCancellationType(cancellationType);
  await cancellationRefundPage.chooseCancellationAction(cancellationAction);
});

Then(/^I validate the following on cancel and refund page$/, async function (dataTable) {
  let rows = dataTable.raw();
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
    switch (field) {
      case 'Cancelled Product Quantity':
        actualResult = await cancellationRefundPage.getCancelledProductNewQuantity();
        break;
      case 'New Quantity':
        actualResult = await cancellationRefundPage.getAllNewQuantity();
        break;
      case 'Bill Cycle Day':
        actualResult = await cancellationRefundPage.getBillCycleDay();
        break;
      case 'Subscription Start Date':
        actualResult = await cancellationRefundPage.getSubscriptionStartDate();
        break;
    }
    //TODO Implement assertion
  }
});

When(/^I click submit for cancellation$/, async function () {
  await cancellationRefundPage.completeCancellation();
  await driver.pause(10000);
});

When(/^I click submit for cancellation with (.*)$/, async function (option) {
  await cancellationRefundPage.completeCancellationWithETF(option);
});

Then(/^I take record of the following from Case Page$/, async function (dataTable) {
  let data = utilLib.convertGerkinRowToArray(dataTable);
  for (const element of data) {
    switch (element) {
      case "Refunded Amount":
        await casePage.getRefundedAmount().then(refundedAmount => scenarioSession.setRefundedAmount(refundedAmount));
        break;
      case "ETF Amount":
        await casePage.getETFAmount().then(refundedAmount => scenarioSession.setETFAmount(refundedAmount));
        break;
    }
  }
});

Given(/^I navigate to subscription page from case page$/, async function () {
  await casePage.navigateToSubscriptionPage();
});

When(/^I remove a product from order products list$/,  async function () {
  await cancellationRefundPage.removeAProductForPartialCancellation();
});

Then(/^I should see the Total Refund Amount to be (.*)$/, async function (refundedAmount) {
  let actualResult = await casePage.getRefundedAmount();
  scenarioSession.setRefundedAmount(actualResult);
  assert.validate("Refunded Amount", enums.Assertion.IS_EQUAL, actualResult, refundedAmount);
});

When(/^I update quantity of the product by decreasing one from products list$/, async function () {
 await cancellationRefundPage.updateQuantityForPartialCancellation();
});

When(/^I click on pay outstanding ETF$/, async function () {
  await casePage.clickShowMoreActions();
  await casePage.clickPayOutstandingETF()
});

Then(/^I validate the following on ETF Subscription Page$/,async function (dataTable) {
  await commonPage.switchToIframe();
  let rows = dataTable.raw();
  for (let i = 1; i < rows.length; i++) {
    let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
    switch (field) {
      case 'Subscription':
        actualResult = await etfPage.getSubscription();
        expectedResult = scenarioSession.getSubscriptionName();
        break;
      case 'ETF Status':
        actualResult = await etfPage.getETFStatus();
        break;
      case 'ETF Amount':
        actualResult = await etfPage.getETFAmount();
        expectedResult = scenarioSession.getETFAmount();
        break;
    }
    assert.validate(field, condition, expectedResult, actualResult);
  }
});

When(/^I click on Process Payment on ETF Subscription Page$/, async function () {
  await etfPage.clickProcessPayment();
});