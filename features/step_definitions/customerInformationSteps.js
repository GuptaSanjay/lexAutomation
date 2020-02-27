'use strict';
const { Given, When } = require("cucumber");
const utilLib = require('../../lib/utilLib');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');
const accountPage = require('../../page-objects/accountPage');
const subscriptionPage = require('../../page-objects/subscriptionsPage');
const orderPage = require('../../page-objects/orderPage');
const billingAccountsPage = require('../../page-objects/billingAccountPage');
const contactPage = require('../../page-objects/contactsPage');
const individualEmailResultsPage = require('../../page-objects/individualEmailResultsPage');
const commonPage = require('../../page-objects/commonPage');

When(/^I take the record count for following sections$/, {timeout: 120000},  async function (dataTable) {
  let cells = utilLib.convertGerkinRowToArray(dataTable);
  //await accountPage.clickRelatedTab();
  await commonPage.loadFullPage();
  for(const cell of cells){
    switch (cell) {
      case "Subscriptions":
        await accountPage.getSubscriptionRowCount().then( subscriptionRowCount => scenarioSession.setSubscriptionCount(subscriptionRowCount));
        break;
      case "Orders":
        await accountPage.getOrderRowCount().then(orderRowCount => scenarioSession.setOrderCount(orderRowCount));
        break;
    }
  }
});

When(/^I take record of the following from Billing Account page$/, {timeout: 120000}, async function (dataTable) {
  await commonPage.loadFullPage();
  await accountPage.clickBillingAccount();
  let cells = utilLib.convertGerkinRowToArray(dataTable);
  for (const cell of cells){
    switch (cell) {
      case "Invoice Status":
          await billingAccountsPage.getInvoiceStatus().then( invoiceStatus => scenarioSession.setBillingAccountInvoiceStatus(invoiceStatus));
        break;
      case "Payments Status":
        await billingAccountsPage.getPaymentStatus().then( paymentStatus => scenarioSession.setBillingAccountPaymentStatus(paymentStatus));
        break;
    }
  }
  await billingAccountsPage.navigateToAccountPage();
});


Given(/^I take the record count of the following from Contact page$/, async function (dataTable) {
  await accountPage.viewAllContacts();
  await contactPage.clickContacts();
  let cells = utilLib.convertGerkinRowToArray(dataTable);
  for (const cell of cells) {
    switch (cell) {
      case "Activity History":
        //TO DO - Discuss with team
        break;
      case "Email Notifications":
        await contactPage.viewAllEmailNotifications();
        await individualEmailResultsPage.getEmailNotificationCount().then( count => scenarioSession.setEmailNotificationCount(count));
        console.log(scenarioSession.getEmailNotificationCount());

        await individualEmailResultsPage.navigateToContactPage();
        await contactPage.navigateToAccountPage();
        break;
    }
  }
});
