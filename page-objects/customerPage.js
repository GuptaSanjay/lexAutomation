'use strict';
const wd = require('../runtime/webDriverHelper');
const webDriverHelper = require('../webdriver/webdriverHelper');
const scenarioSession = require('../scenarioSession/scenarioSessionData');

const FIRSTNAME_INPUT = './/input[@name="firstName"]';
const LASTNAME_INPUT = './/input[@name="lastName"]';
const LOCALE_SELECT = './/select[@name="localePicklist"]';
const LEAD_SOURCE_SELECT = './/select[@name="leadSourcePicklist"]';
const EMAIL_INPUT = './/input[@name="email"]';
const CURRENCY_SELECT = './/select[@name="accountCurrencyPicklist"]';

const ADDRESS_TAB = './/a[.="Address"]';

const NEW_ADDRESS_BUTTON = './/button[.="New"]';
const ADDRESS_COUNTRY_INPUT = './/input[@name="country"]';
const ADDRESS_POSTCODE_INPUT = './/input[@name="postcode"]';
const ADDRESS_COUNTY_INPUT = './/input[@name="town"]';
const ADDRESS_TOWN_INPUT = './/input[@name="town"]';
const ADDRESS_LINE1_INPUT = './/input[@name="line1"]';
const TIME_ZONE_SELECT = './/select[@name="timeZonePicklist"]';
const SAVE_ADDRESS_BUTTON = './/*[@title="Save"]';
const SAVE_BUTTON = './/button[.="Save"]';
const NEW_QUOTE_LINK = 'New Quote';
const SHOW_2_MORE_ACTIONS = './/a[@title="Show 2 more actions"]';
module.exports = {
  /**
   * Set new customer personal information
   * @returns {Promise<void>}
   */
  setCustomerPersonalInformationForm: async function () {
    let firstName = scenarioSession.getCustomerFirstName();
    let lastName = scenarioSession.getCustomerLastName();
    let email = scenarioSession.getCustomerEmail();
    let locale = scenarioSession.getCustomerLocale();
    let leadSource = scenarioSession.getCustomerLeadSource();
    let currency = scenarioSession.getCustomerCurrency();

    await wd.setValue(FIRSTNAME_INPUT, firstName);
    await wd.setValue(LASTNAME_INPUT, lastName);
    await wd.setValue(EMAIL_INPUT,email);
    await wd.setValue(LOCALE_SELECT, locale);
    await wd.setValue(LEAD_SOURCE_SELECT, leadSource);
    await wd.setValue(CURRENCY_SELECT, currency);
  },


  /**
   * Click new address button
   * @returns {Promise<void>}
   */
  clickNewAddressButton: async function() {
    await wd.click(ADDRESS_TAB);
    await wd.click(NEW_ADDRESS_BUTTON)
  },

  /**
   * Set new address for customer
   * @returns {Promise<void>}
   */
  setCustomerAddressInformationForm: async function(){
    let timeZone = scenarioSession.getTimeZone();
    let country = scenarioSession.getAddressCountry();
    let postcode = scenarioSession.getAddressPostCode();
    let county = scenarioSession.getAddressCounty();
    let town = scenarioSession.getAddressTown();
    let line1 = scenarioSession.getAddressLine1();

    await wd.setValue(ADDRESS_LINE1_INPUT, line1);
    await wd.setValue(ADDRESS_TOWN_INPUT, town);
    await wd.setValue(ADDRESS_POSTCODE_INPUT, postcode);
    await wd.setValue(ADDRESS_COUNTY_INPUT, county);
    await wd.setValue(ADDRESS_COUNTRY_INPUT, country);
    await wd.setValue(TIME_ZONE_SELECT, timeZone);
  },

  /**
   * Click save address button
   */
  clickSaveAddress: async function() {
    await wd.click(SAVE_ADDRESS_BUTTON);
  },

  /**
   * Click save button
   * @returns {Promise<void>}
   */
  clickSave: async function(){
    await wd.click(SAVE_BUTTON)
  },

  /**
   * Click new quote button
   */
  clickNewQuote: async function(){
    // await webDriverHelper.waitAndClick(SHOW_2_MORE_ACTIONS);
    return wd.clickLink(NEW_QUOTE_LINK);
  },
};
