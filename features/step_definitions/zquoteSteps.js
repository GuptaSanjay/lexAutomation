'use strict';
const { Given, When, Then } = require("cucumber");
// const helpers = require('klassi-cucumber-js/runtime/helpers');
const assert = require('../../lib/assertLib');
const scenarioSession = require('../../scenarioSession/scenarioSessionData');
const utilLib = require('../../lib/utilLib');
const util = require('../../utility/util');
const ratePlanProperties = require('../../data/ratePlanProperties');
const errorMessageProperties = require('../../data/errorMessage');
const headerPage = require('../../page-objects/headerPage');
const engineerQuotePage = require('../../page-objects/engineerQuotesPage');

const enums = require('../../enum/const');
const commonPage = require('../../page-objects/commonPage');
const customerPage = require('../../page-objects/customerPage');
const createQuotePage = require('../../page-objects/zquote/createQuotePage');
const selectBundleProductPage = require('../../page-objects/zquote/productPage');
const quoteSummaryPage = require('../../page-objects/zquote/quoteSummaryPage');
const applyVoucherPage = require('../../page-objects/zquote/applyVouchersPage');
const paymentIntermediatePage = require('../../page-objects/zquote/paymentIntermediatePage');
const selectBillingAccountPage = require('../../page-objects/zquote/selectBillingAccountPage');
const paymentPage = require('../../page-objects/zquote/paymentPage');
const submitQuotePage = require('../../page-objects/zquote/submitQuotePage');
const accountPage = require('../../page-objects/accountPage');
const casePage = require('../../page-objects/casePage');
const subscriptionPage = require('../../page-objects/subscriptionsPage');
const orderPage = require('../../page-objects/orderPage');
const quotePage = require('../../page-objects/quotePage');
const deliveryAndJobBookingPage = require('../../page-objects/zquote/deliveryAndJobBookingPage');
const billingPage = require('../../page-objects/billingAccountPage');

When(/^I start a new zquote for (.*) customer$/, {timeout: 120000}, async function (customerType) {
    await customerPage.clickNewQuote();
    if (customerType === 'existing') {
        await driver.pause(10000);
        await selectBillingAccountPage.switchToIframe();
        await selectBillingAccountPage.clickNext();
    }
    await driver.sleep(10000);
    await createQuotePage.switchToIframe();
    await createQuotePage.selectSource('Direct - Phone');
    await createQuotePage.selectSourceCountry();
    await createQuotePage.clickNext();
});

When(/^I select a product with (.*) rate plan$/, {timeout: 120000}, async function (ratePlanType) {
    await driver.sleep(10000);
    let ratePlan = (ratePlanType === 'given') ? scenarioSession.getRatePlan() : ratePlanProperties.getRatePlan(ratePlanType);
    await commonPage.switchToIframe();
    await selectBundleProductPage.selectProduct(ratePlan);
    await selectBundleProductPage.clickNext();
});

Then(/^I validate following products are added (.*)$/, {timeout: 120000}, async function (ratePlans) {
    let actualRatePlanList = await ratePlans.split(",");
    await applyVoucherPage.switchToIframe();
    let expectedRatePlans = await applyVoucherPage.getRatePlansList();
    await assert.validate("RatePlans", enums.Assertion.CONTAINS, expectedRatePlans, actualRatePlanList);
});

Then(/^I proceed to step (\d+) of zquote$/, async function (step) {
    switch (step) {
        case 5:
            // await applyVoucherPage.switchToIframe();
            await applyVoucherPage.clickNext();
            break;
        case 6:
            // await applyVoucherPage.switchToIframe();
            await deliveryAndJobBookingPage.clickNext();
            break;
        case 7:
            await commonPage.switchToIframe();
            await quoteSummaryPage.clickNext();
            break;
        case 8:
            await commonPage.switchToIframe();
    }
});

Given(/^I make a delivery selection$/, async function () {
    await commonPage.switchToIframe();
    await deliveryAndJobBookingPage.selectDeliveryOption();
});

Given(/^I book a new non HAART job$/, async function () {
    let wmisNumber = util.createWMISNumber();
    scenarioSession.setWMISNumber(wmisNumber);
    await deliveryAndJobBookingPage.switchToIframe();
    await deliveryAndJobBookingPage.bookJob(wmisNumber);

});

Then(/^I make a delivery selection and book a new non HAART job$/, async function () {
    let wmisNumber = util.createWMISNumber();
    scenarioSession.setWMISNumber(wmisNumber);
    await deliveryAndJobBookingPage.switchToIframe();
    await deliveryAndJobBookingPage.selectDeliveryOption();
    await deliveryAndJobBookingPage.bookJob(wmisNumber);
});

Then(/^I select (.*) as payment method$/, async function (paymentMethod) {
    if (scenarioSession.getSourceCountry() === enums.SourceCountry.GBR) {
        await paymentIntermediatePage.switchToIframe();
        await paymentIntermediatePage.selectPaymentMethod(paymentMethod);
        await paymentIntermediatePage.clickNext();
    }
});

Then(/^I select (.*) as new payment method$/, async function (paymentMethod) {
    if (scenarioSession.getSourceCountry() === enums.SourceCountry.GBR) {
        await paymentIntermediatePage.selectPaymentMethod(paymentMethod);
        await paymentIntermediatePage.clickNext();
    }
});

Then(/^I enter (.*) payment details$/, async function (paymentMethod) {
    await commonPage.switchToIframe();
    if (paymentMethod === enums.PaymentMethod.DIRECT_DEBIT) {
        await paymentPage.enterDirectDebitDetails();
        await paymentPage.clickDirectDebit();
    } else {
        await paymentPage.enterCreditCardDetails(paymentMethod);
        await paymentPage.clickPaySecurelyNow();
    }
});

Then(/^I should see confirmation message for (.*) quote$/, async function (quoteType) {
    await commonPage.switchToIframe();
    let actualMessage = await submitQuotePage.getConfirmationMessage(quoteType);
    let expectedMessage = 'Your quote is ready to go, Click on Submit to send Subscription to Zuora';
    await assert.isEqual(actualMessage, expectedMessage, "Submit Quote Message");
});

When(/^I submit the zquote$/, async function () {
    await submitQuotePage.clickSubmit();
    await submitQuotePage.clickContinue();
});

Then(/^I validate that Quote Status is (.*)$/, async function (expectedQuoteStatus) {
    //await accountPage.clickRelatedTab();
    await commonPage.loadFullPage();
    let actualStatus = await accountPage.getQuoteStatus();
    await assert.validate('Quote Status', enums.Assertion.IS_EQUAL, expectedQuoteStatus, actualStatus);
});

When(/^I wait and refresh (.*) page for (.*) to be (.*)$/, {timeout: 180000}, async function (pageName, field, value) {
    switch (pageName) {
        case 'customer account':
            await accountPage.waitAndRefreshForCondition(field, value);
            break;
        case 'case view':
            await casePage.waitAndRefreshForCondition(field, value);
            break;
        case 'engineer quote':
            await engineerQuotePage.waitAndRefreshForCondition(field, value);
            break;
        case 'subscription':
            await subscriptionPage.waitAndRefreshForCondition(field, value);
    }
});

Then(/^I validate the tax is calculated correctly$/, {timeout: 120000}, async function () {
    // await commonPage.refreshPage();
    // await accountPage.clickRelatedTab();
    // await commonPage.loadFullPage();
    // await accountPage.clickRecentQuote();
    await helpers.loadPage(scenarioSession.getRecentQuoteLink(), 10);
    await quotePage.switchToIframe();
    let totalList = await quotePage.getTotalList();
    let taxList = await quotePage.getTaxList();
    let actualTaxList = await quotePage.createActualTaxList(taxList);
    let expectedTaxList = await quotePage.expectedTaxList(totalList);
    await assert.contains(actualTaxList, expectedTaxList, "tax");
    // await assert.isTrue(await quotePage.isTaxCorrect(), "Tax calculated");
});

Given(/^I apply voucher (.*) code$/, async function (voucherType) {
    scenarioSession.setVoucherType(voucherType);
    await applyVoucherPage.switchToIframe();
    await applyVoucherPage.applyVoucher(voucherType);
});

Then(/^I should see the voucher discount is applied$/, {timeout: 120000}, async function () {
    let voucherType = scenarioSession.getVoucherType();
    let ratePlanPaymentType = scenarioSession.getRatePlanPaymentType();
    let sourceCountry = scenarioSession.getSourceCountry();

    if (ratePlanPaymentType === enums.RatePlanPaymentType.BYO) {
        await applyVoucherPage.switchToIframe();
    }

    let amount = await applyVoucherPage.getAmount(ratePlanPaymentType);
    let discount = await applyVoucherPage.getActualDiscount(ratePlanPaymentType);
    let total = await applyVoucherPage.getTotal();

    let expectedDiscount = utilLib.calculateDiscount(sourceCountry, amount, voucherType);
    let expectedTotal = utilLib.calculateTotal(amount, discount);

    assert.validate("Discount", enums.Assertion.IS_EQUAL, expectedDiscount, discount);
    assert.validate("Total", enums.Assertion.IS_EQUAL, expectedTotal, total);
});


Then(/^I validate total and tax field on apply voucher page$/, async function () {
    await commonPage.switchToIframe();
    let isSubTotalVisible = await applyVoucherPage.isSubTotalVisible();
    let isTaxVisible = await applyVoucherPage.isTaxFieldVisible();
    let isTotalVisible = await applyVoucherPage.isTotalVisible();

    switch (scenarioSession.getSourceCountry()) {
        case enums.SourceCountry.CAN:
        case enums.SourceCountry.USA:
            assert.validate("SubTotal field visible", enums.Assertion.IS_TRUE, isSubTotalVisible);
            assert.validate("Tax field visible", enums.Assertion.IS_TRUE, isTaxVisible);
            assert.validate("Total field visible", enums.Assertion.IS_TRUE, isTotalVisible);
            break;
        case enums.SourceCountry.GBR:
        case enums.SourceCountry.IRL:
        case enums.SourceCountry.ITA:
        case enums.SourceCountry.FRA:
            assert.validate("SubTotal field visible", enums.Assertion.IS_FALSE, isSubTotalVisible);
            assert.validate("Tax field visible", enums.Assertion.IS_FALSE, isTaxVisible);
            assert.validate("Total field visible", enums.Assertion.IS_TRUE, isTotalVisible);
            break;
    }
});


When(/^I convert rate plan in BYO$/, async function () {
    let quantity = await applyVoucherPage.getOneTimeAmount().then(function (amount) {
        return applyVoucherPage.getBYOQuantity(amount);
    });
    await applyVoucherPage.updateQuantity(quantity);
    await applyVoucherPage.covertToBYO();
});

When(/^I update the quantity of selected product to (\d+)$/, async function (quantity) {
    await applyVoucherPage.switchToIframe();
    await applyVoucherPage.updateQuantity(quantity);
});

Then(/^I should see (.*) amount is populated$/, async function (amountType) {
    await applyVoucherPage.switchToIframe();
    let amount;
    if (amountType === enums.RatePlanPaymentType.ONETIME) {
        amount = await applyVoucherPage.getOneTimeAmount();
    } else if (amountType === enums.RatePlanPaymentType.RECURRING) {
        amount = await applyVoucherPage.getRecurringAmount();
    }
    assert.validate(amountType, enums.Assertion.IS_POPULATED, amount);
    assert.validate(amountType, enums.Assertion.IS_NOT_EQUAL, '0.00', amount);
});

When(/^I go back to product selection page$/, async function () {
    await applyVoucherPage.clickBack();
});

When(/^I click on new payment method$/, async function () {
    await paymentIntermediatePage.switchToIframe();
    await paymentIntermediatePage.clickNewPaymentMethod();
});

Then(/^I select an existing Card payment method$/, async function () {
    await paymentPage.switchToIframe();
    await paymentPage.selectExistingCardPaymentMethod();
    await paymentPage.clickNext();
});


Given(/^I validate on account page a new subscription is created$/, async function () {
    assert.validate("Subscription row count", enums.Assertion.INCREASED, scenarioSession.getSubscriptionCount(), await accountPage.getSubscriptionRowCount());
});


Given(/^I validate on account page a new order is created$/, async function () {
    assert.validate("Order row count", enums.Assertion.INCREASED, scenarioSession.getOrderCount(), await accountPage.getOrderRowCount());
});


When(/^I goto customer account page$/, async function () {
    await headerPage.navigateToNewCustomerAccountPage(scenarioSession.getCustomerFirstName() + " " + scenarioSession.getCustomerLastName());
});

//
// Then(/^I navigate to account page from order page$/, async function () {
//   await accountPage.navigateToAccountPage();
// });

Then(/^I should see they delivery is (.*)$/, async function (deliveryType) {
    await deliveryAndJobBookingPage.switchToIframe();
    let thresholdBoolean = await deliveryAndJobBookingPage.validateDeliveryThreshold(deliveryType);
    assert.validate("Delivery threshold", enums.Assertion.IS_TRUE, thresholdBoolean);
});

Then(/^I should see the warning message for duplicate Hive Live based on (.*)$/, async function (sourceCountry) {
    await applyVoucherPage.switchToIframe();
    let actualMessage = await applyVoucherPage.getErrorMessage();
    let expectedMessage;
    switch (sourceCountry) {
        case enums.SourceCountry.GBR:
            expectedMessage = errorMessageProperties.getErrorMessage('HIVE_LIVE_ERROR_MESSAGE_GBR');
            break;
        case enums.SourceCountry.IRL:
            expectedMessage = errorMessageProperties.getErrorMessage('HIVE_LIVE_ERROR_MESSAGE_IRL');
            break;
    }
    assert.validate("Hive Live Error", enums.Assertion.IS_EQUAL, expectedMessage, actualMessage);
});

Then(/^I store the links for following (.*) pages with (.*) rate plan$/, async function (pageType, orderType, dataTable) {
    let list = utilLib.convertGerkinRowToArray(dataTable);
    for (let i = 0; i < list.length; i++) {
        switch (pageType) {
            case 'account':
                switch (list[i]) {
                    case 'Billing':
                        scenarioSession.setBillingAccountPageLink(await accountPage.getBillingAccountPageLink());
                        break;
                    case 'Subscription':
                        scenarioSession.setSubscriptionPageLink(await accountPage.getSubscriptionPageLink());
                        break;
                    case 'Order':
                        switch (orderType) {
                            case enums.DeliveryOption.DELIVERY:
                                scenarioSession.setOrderDeliveryPageLink(await accountPage.getRecentOrderLinks(orderType));
                                break;
                            case enums.DeliveryOption.INSTALLATION:
                                scenarioSession.setOrderInstallationPageLink(await accountPage.getRecentOrderLinks(orderType));
                                break;
                            default :
                                scenarioSession.setOrderDeliveryPageLink(await accountPage.getRecentOrderLinks(enums.DeliveryOption.DELIVERY));
                                scenarioSession.setOrderInstallationPageLink(await accountPage.getRecentOrderLinks(enums.DeliveryOption.INSTALLATION));
                        }
                        break;
                    case 'Quote':
                        scenarioSession.setRecentQuoteLink(await accountPage.getRecentQuoteLink());
                        break;
                }
                break;
            case 'case':
                switch (list[i]) {
                    case 'Subscription':
                        scenarioSession.setSubscriptionPageLink(await casePage.getSubscriptionPageLink());
                        break;
                    case 'account':
                        break;
                    default:
                        break;
                }
        }
    }
});

When(/^I load (.*) account page$/, {timeout: 120000}, async function (pageType) {
    switch (pageType) {
        case 'installOrder':
            await helpers.loadPage(scenarioSession.getOrderInstallationPageLink(), 10);
            break;
        case 'billing':
            await helpers.loadPage(scenarioSession.getBillingAccountPageLink(), 10);
            break;
        case 'subscription':
            await helpers.loadPage(scenarioSession.getSubscriptionPageLink(), 10);
            break;
        case 'deliveryOrder':
            await helpers.loadPage(scenarioSession.getOrderDeliveryPageLink(), 10);
            break;
    }
});

Then(/^I validate the following on the billing account page in (.*) tab$/, {timeout: 120000}, async function (tab, dataTable) {
    if (tab === 'related') {
        //await billingPage.clickRelatedTab();
        await commonPage.loadFullPage();
    }
    let rows = dataTable.raw();
    for (let i = 1; i < rows.length; i++) {
        let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
        switch (field) {
            case 'Status':
                actualResult = await billingPage.getBillingStatus();
                break;
            case 'Bill Cycle Day':
                actualResult = await billingPage.getBillCycleDay();
                break;
            case 'Credit Card Number':
                actualResult = await billingPage.getCreditCardNumber();
                break;
            case 'Invoice Status':
                actualResult = await billingPage.getInvoiceStatus();
                break;
            case 'Invoice Payment Term':
                actualResult = await billingPage.getInvoicesPaymentTerm();
                break;
            case 'Payments Status':
                actualResult = await billingPage.getPaymentStatus();
                break;
            case 'Payment Methods Type':
                actualResult = await billingPage.getPaymentMethodsType();
                break;
        }
        assert.validate(field, condition, expectedResult, actualResult);
    }
});

Then(/^I validate the following on the subscription page in (.*) tab$/, {timeout: 120000}, async function (tab, dataTable) {
    if (tab === 'related') {
        //await subscriptionPage.clickRelatedTab();
        await commonPage.loadFullPage();
    }
    let rows = dataTable.raw();
    for (let i = 1; i < rows.length; i++) {
        let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
        switch (field) {
            case "Status":
                actualResult = await subscriptionPage.getSubscriptionStatus();
                break;
            case "Source Country":
                actualResult = await subscriptionPage.getSourceCountry();
                expectedResult = scenarioSession.getAddressCountry();
                break;
            case "Source":
                actualResult = await subscriptionPage.getSource();
                break;
            case "Version":
                actualResult = await subscriptionPage.getVersion();
                expectedResult = scenarioSession.getSubscriptionVersion();
                break;
            case 'Subscription Rate Plan Count':
                actualResult = await subscriptionPage.getSubscriptionRowCount();
                expectedResult = scenarioSession.getSubscriptionRowCount();
                break;
            case 'Order Status':
                actualResult = await subscriptionPage.getOrderStatus();
                break;
            case 'Product Quantity':
                actualResult = await subscriptionPage.getProductQuantity();
                expectedResult = scenarioSession.getSubscriptionProductQuantity()
                break;
        }
        assert.validate(field, condition, expectedResult, actualResult);
    }
});

Then(/^I validate the following on the order page in (.*) tab$/, {timeout: 120000}, async function (tab, dataTable) {
    if (tab === 'related') {
        //await orderPage.clickRelatedTab();
        await commonPage.loadFullPage();
    }
    let rows = dataTable.raw();
    for (let i = 1; i < rows.length; i++) {
        let field = rows[i][0], condition = rows[i][1], expectedResult = rows[i][2], actualResult = '';
        switch (field) {
            case 'Status':
                actualResult = await orderPage.getStatus();
                break;
            case 'Fulfilment Type':
                actualResult = await orderPage.getFulfillmentType();
                break;
            case 'Fulfilment Partner':
                actualResult = await orderPage.getFulfillmentPartner();
                break;
            case 'Job Status':
                actualResult = await orderPage.getJobStatus();
                break;
            case 'Job Reference Number':
                expectedResult = scenarioSession.getWMISNumber();
                actualResult = await orderPage.getJobReferenceNumber();
                break;
            case 'Order Products Status':
                actualResult = await orderPage.getOrderProductsStatus();
                break;
        }
        assert.validate(field, condition, expectedResult, actualResult);
    }
});