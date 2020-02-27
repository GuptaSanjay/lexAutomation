'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const scenarioSession = require('../scenarioSession/scenarioSessionData');
const util = require('../utility/util');

const RELATED_TAB = '(.//a[@id="relatedListsTab__item"])[last()]';
const DETAILS_TAB = '(.//a[@id="detailTab__item"])[last()]';

const PRODUCT_RATE_PLANS_INPUT = './/input[@title="Search Product Rate Plans"]';
const QUANTITY_INPUT = './/span[.="Quantity"]/../following-sibling::input';
const SAVE_ENGINEER_QUOTE_LINE_ITEM_BUTTON = './/button[@title="Save"]';

const MORE_ACTIONS = '(.//span[.="Show more actions"]/..)[last()]';   /*'li > div > div.uiPopupTrigger';*/
const COMPLETE_SALE_OVER_THE_PHONE_LINK = './/a[.="Complete Sale Over The Phone"]'; /*'(.//button[.="Complete Sale Over The Phone"])[last()]'*/;//Remote browser size issue

const STATUS = '(.//span[.="Status"]/../following-sibling::div/span'+util.getLightningFormatedText()+')[1]';
// const RECORD_TYPE = './/span[.="Record Type"]/../following-sibling::div/span/slot/slot/force-record-type/div/div/span'; 23-09-2019
const RECORD_TYPE = './/span[.="Record Type"]/../following-sibling::div/span'+util.getLightningForceRecordType();
const QUOTE_DATE = './/span[.="Quote Date/Time"]/../following-sibling::div/span'+util.getLightningFormatedText();
const EXPIRY_DATE = '(.//span[.="Expiry Date/Time"]/../following-sibling::div/span'+util.getLightningFormatedText()+')[1]';
const IN_DAY_PRODUCTS = './/span[.="In-Day Products"]/../following-sibling::div/span'+util.getLightningFormatedNumber();
const FUTURE_DAY_PRODUCTS = './/span[.="Future-Day Products"]/../following-sibling::div/span'+util.getLightningFormatedNumber();
const DELIVERY_PRODUCTS = './/span[.="Delivery Products"]/../following-sibling::div/span'+util.getLightningFormatedNumber();

const TYPE_SELECT = './/span/span[.="Type"]/../following-sibling::div/div/div/div/a';
const IN_DAY_OPTION = './/a[.="In-day"]';
const FUTURE_DAY_OPTION = './/a[.="Future-day"]';
const NON_INSTALL_OPTION = './/a[.="Non-Install"]';
const TITLE_INPUT = ".//span[.='Title']/../following-sibling::div/div/div/div/a";
const OPTION_MR = './/a[.="Mr"]';
const FIRST_NAME_INPUT = './/span[.="First Name"]/../following-sibling::input';
const LAST_NAME_INPUT = './/span[.="Last Name"]/../following-sibling::input';
const EMAIL_INPUT = './/span[.="Email"]/../following-sibling::input';
const MOBILE_INPUT = './/span[.="Mobile"]/../following-sibling::input';

const SAVE_AGENT_DETAILS_BUTTON = './/button[@title="Save"]/span[.="Save"]';
const SUBSCRIPTION = './/span[.="Subscription"]/../following-sibling::div/span/slot/slot/force-lookup/div/force-hoverable-link/div/a';
const JOB = './/span[.="Job"]/../following-sibling::div/span/slot/slot/force-lookup/div/force-hoverable-link/div/a';
const CONTACT = './/span[.="Contact"]/../following-sibling::div/span/slot/slot/force-lookup/div/force-hoverable-link/div/a';

const ENGINEER_QUOTE_LINE_ITEMS_QUANTITY = './/th[@title="Engineer Quote Line Item Name"]/../../following-sibling::tbody/tr/td[4]/span/span';
const ENGINEER_QUOTE_LINE_ITEMS_PRICE = './/th[@title="Engineer Quote Line Item Name"]/../../following-sibling::tbody/tr/td[5]/span/span';
const ENGINEER_QUOTE_LINE_ITEMS_TOTAL_PRICE = './/th[@title="Engineer Quote Line Item Name"]/../../following-sibling::tbody/tr/td[6]/span/span';
const ENGINEER_QUOTE_LINE_ITEMS_JOB_TIME = './/th[@title="Engineer Quote Line Item Name"]/../../following-sibling::tbody/tr/td[8]/span/span';
const BACK_BUTTON = '(.//input[@value=" Back "])[2]';

module.exports = {
  clickRelatedTab: async function () {
    await webDriverHelper.mediumWait();
    await webDriverHelper.waitAndClick(RELATED_TAB);
  },

  clickDetailsTab: async function () {
    await webDriverHelper.waitAndClick(DETAILS_TAB);
  },

  clickNewEngineerQuoteLineItemButton: async function () {
    // await browser.execute(async () => await document.querySelector('div div div div ul li:nth-child(1) > a.forceActionLink').click());
    // await browser.execute(async () =>  await document.querySelector('.//a[@title="New"]').click());
    // await webDriverHelper.waitAndClick('.//a[.="Engineer Quote History"]');
    await webDriverHelper.waitAndClick('.//a[@title="New"]');
  },

  setEngineerQuoteLineItemDetails: async function (quoteType) {
    let ratePlan = '';
    switch (quoteType) {
      case 'In-day':
        ratePlan = 'Hive 2 - In Day - £179';
        break;
      case 'Future-day':
      case 'Install':
        ratePlan = 'Hive 2 - Standard - £249';
        break;
      case 'Delivery':
        ratePlan = 'Welcome Home Plan (Screw) - £10.75';
        break;
      case 'Non-Install':
        ratePlan = 'Welcome Home Plan without hub (Bayonet) - £7.42';
        break;
    }
    await webDriverHelper.waitAndSetValue(PRODUCT_RATE_PLANS_INPUT, ratePlan);
    await webDriverHelper.waitAndClick('.//li[@class="lookup__item  default uiAutocompleteOption forceSearchInputLookupDesktopOption"]');
    await webDriverHelper.waitAndSetValue(QUANTITY_INPUT, '1');
  },

  clickSaveEngineerQuoteLineItemDetails: async function () {
    await webDriverHelper.waitAndClick(SAVE_ENGINEER_QUOTE_LINE_ITEM_BUTTON);
  },

  setEngineerQuoteContactDetails: async function () {
    await webDriverHelper.waitAndClick(TITLE_INPUT);
    await webDriverHelper.waitAndClick(OPTION_MR);
    await webDriverHelper.waitAndSetValue(FIRST_NAME_INPUT, scenarioSession.getCustomerFirstName());
    await webDriverHelper.waitAndSetValue(LAST_NAME_INPUT, 'Eng Quote');
    await webDriverHelper.waitAndSetValue(EMAIL_INPUT, scenarioSession.getCustomerEmail());
    await webDriverHelper.waitAndSetValue(MOBILE_INPUT, util.createMobileNumber());
  },

  clickSaveEngineerQuote: async function () {
    await webDriverHelper.waitAndClick(SAVE_AGENT_DETAILS_BUTTON);
  },

  selectType: async function (quoteType) {
    await webDriverHelper.waitAndClick(TYPE_SELECT);
    switch (quoteType) {
      case 'In-day':
        await webDriverHelper.waitAndClick(IN_DAY_OPTION);
        break;
      case 'Future-day':
        await webDriverHelper.waitAndClick(FUTURE_DAY_OPTION);
        break;
      case 'Non-Install':
        await webDriverHelper.waitAndClick(NON_INSTALL_OPTION);
        break;
    }
  },

  getStatus: async function () {
    return webDriverHelper.getElementText(STATUS);
  },

  getRecordType: async function () {
    return webDriverHelper.getElementText(RECORD_TYPE);
  },

  getQuoteDate: async function () {
    return webDriverHelper.getElementText(QUOTE_DATE);
  },

  getExpiryDate: async function () {
    return webDriverHelper.getElementText(EXPIRY_DATE);
  },

  getInDayProducts: async function() {
    return webDriverHelper.getElementText(IN_DAY_PRODUCTS);
  },

  getFutureDayProducts: async function(){
    return webDriverHelper.getElementText(FUTURE_DAY_PRODUCTS);
  },

  getDeliveryProducts:async function() {
    return webDriverHelper.getElementText(DELIVERY_PRODUCTS);
  },

  getEngineerQuoteLineItemsQuantity: function () {
    return webDriverHelper.getElementText(ENGINEER_QUOTE_LINE_ITEMS_QUANTITY);
  },

  getEngineerQuoteLineItemsPrice: function () {
    return webDriverHelper.getElementText(ENGINEER_QUOTE_LINE_ITEMS_PRICE);
  },

  getEngineerQuoteLineItemsTotalPrice: function () {
    return webDriverHelper.getElementText(ENGINEER_QUOTE_LINE_ITEMS_TOTAL_PRICE);
  },

  getEngineerQuoteLineItemsJobTime: function () {
    return webDriverHelper.getElementText(ENGINEER_QUOTE_LINE_ITEMS_JOB_TIME)
  },

  clickCompleteSaleOverThePhone: async function () {
    await webDriverHelper.waitAndClick(MORE_ACTIONS);
    await webDriverHelper.waitAndClick(COMPLETE_SALE_OVER_THE_PHONE_LINK);
  },


  clickBack: async function() {
    await webDriverHelper.waitAndClick(BACK_BUTTON);
  },

  getSubscription: async function() {
    return webDriverHelper.getElementText(SUBSCRIPTION);
  },

  getJob: async function() {
    return webDriverHelper.getElementText(JOB);
  },

  getContact: async function() {
    return webDriverHelper.getElementText(CONTACT);
  },

  waitAndRefreshForCondition: async function (field, condition) {
    let counter = 0;
    let status = await this.getStatus();
    while (status !== condition && counter < 10) {
      await webDriverHelper.longDelayAndRefresh();
      status = await this.getStatus();
      counter++;
    }
  },
};
