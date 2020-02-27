'use strict';

const util = require('../utility/util');
const scenarioSession = require('../scenarioSession/scenarioSessionData');
const addressProperties = require('../data/addressProperties');
const enums = require('../enum/const');

/**
 * Returns customer first name
 * Creates customer first name as source country name
 * @returns {String}
 */
function createCustomerFirstName(firstNamePrefix) {
  return firstNamePrefix + scenarioSession.getSourceCountry();
}

/**
 * Returns customer last name
 * Creates customer last name by concatenating given rate plan and current time stamp
 * @returns {*}
 */
function createCustomerLastName() {
  return scenarioSession.getRatePlan() + util.getCurrentTimeStamp();
}

function createExistingCustomerSearchableName(ratePlan, firstNamePrefix) {
  if (firstNamePrefix) {
    return firstNamePrefix+scenarioSession.getSourceCountry()+ " " + ratePlan;
  } else {
    return firstNamePrefix+scenarioSession.getSourceCountry()+ " " + ratePlan + util.getTodayDateStamp();
  }

}

/**
 * Return customer email
 * Creates customer email by concatenating email prefix with customer last name and domain name
 * @returns {string}
 */
function createEmail() {
  // ToDo add the prefix and postfix to email
  return 'tester+' + scenarioSession.getCustomerLastName() + '@hivehome.com';
}

/**
 * Returns locale based on the source country
 * @returns {Locale}
 */
function getLocale() {
  let locale;
  switch (scenarioSession.getSourceCountry()) {
    case enums.SourceCountry.GBR:
      locale = enums.Locale.GBR;
      break;
    case enums.SourceCountry.USA:
      locale = enums.Locale.USA;
      break;
    case enums.SourceCountry.CAN:
      locale = enums.Locale.CAN;
      break;
    case enums.SourceCountry.FRA:
      locale = enums.Locale.FRA;
      break;
    case enums.SourceCountry.IRL:
      locale = enums.Locale.IRL;
      break;
    case enums.SourceCountry.ITA:
      locale = enums.Locale.ITA;
      break;
  }
  return locale;
}

/**
 * Returns locale based on the source country
 * @returns {LocaleName}
 */
function getLocaleName() {
  let locale;
  switch (scenarioSession.getSourceCountry()) {
    case enums.SourceCountry.GBR:
      locale = enums.LocaleName.GBR;
      break;
    case enums.SourceCountry.USA:
      locale = enums.LocaleName.GBR;
      break;
    case enums.SourceCountry.CAN:
      locale = enums.LocaleName.CAN;
      break;
    case enums.SourceCountry.FRA:
      locale = enums.LocaleName.FRA;
      break;
    case enums.SourceCountry.IRL:
      locale = enums.LocaleName.IRL;
      break;
    case enums.SourceCountry.ITA:
      locale = enums.LocaleName.ITA;
      break;
  }
  return locale;
}

/**
 * Returns lead source
 * @returns {string}
 */
function getLeadSource() {
  return 'Direct';
}

/**
 * Returns currency based on source country
 * @returns {currency}
 */
function getCurrency() {
  let currency;
  switch (scenarioSession.getSourceCountry()) {
    case enums.SourceCountry.GBR:
      currency = enums.Currency.GBP;
      break;
    case enums.SourceCountry.USA:
      currency = enums.Currency.USD;
      break;
    case enums.SourceCountry.CAN:
      currency = enums.Currency.CAD;
      break;
    case enums.SourceCountry.FRA:
    case enums.SourceCountry.IRL:
    case enums.SourceCountry.ITA:
      currency = enums.Currency.EUR;
      break;
  }
  return currency;
}

module.exports = {
  /**
   * Set scensrio session variables with customer personal details
   * @returns {Promise<void>}
   */
  createCustomerPersonalInformation: function (firstNamePrefix) {
    scenarioSession.setCustomerFirstName(createCustomerFirstName(firstNamePrefix));
    scenarioSession.setCustomerLastName(createCustomerLastName());
    scenarioSession.setCustomerEmail(createEmail());
    scenarioSession.setCustomerLocale(getLocale());
    scenarioSession.setCustomerLocaleName();
    scenarioSession.setCustomerLeadSource(getLeadSource());
  },

  createCustomerAccountInformation: function () {
    scenarioSession.setCustomerCurrency(getCurrency());
  },

  getExistingCustomerSearchableName: function (ratePlan, firstNamePrefix) {
    return createExistingCustomerSearchableName(ratePlan, firstNamePrefix);
  },

  /**
   * Set scenario session variables with customer address details
   */
  createCustomerAddressInformation: function () {
    var addressLine1, addressTown, addressCounty, addressPostCode, addressCountry, addressTimeZone;

    switch (scenarioSession.getSourceCountry()) {
      case enums.SourceCountry.GBR:
        addressLine1 = addressProperties.getAddressLine1GBR();
        addressTown = addressProperties.getAddressTownGBR();
        addressCounty = addressProperties.getAddressCountyGBR();
        addressPostCode = addressProperties.getAddressPostCodeGBR();
        addressCountry = addressProperties.getAddressCountryGBR();
        addressTimeZone = addressProperties.getAddressTimeZoneGBR();
        break;
      case enums.SourceCountry.USA:
        addressLine1 = addressProperties.getAddressLine1USA1();
        addressTown = addressProperties.getAddressTownUSA1();
        addressCounty = addressProperties.getAddressCountyUSA1();
        addressPostCode = addressProperties.getAddressPostCodeUSA1();
        addressCountry = addressProperties.getAddressCountryUSA1();
        addressTimeZone = addressProperties.getAddressTimeZoneUSA1();
        break;
      case enums.SourceCountry.CAN:
        addressLine1 = addressProperties.getAddressLine1CAN();
        addressTown = addressProperties.getAddressTownCAN();
        addressCounty = addressProperties.getAddressCountyCAN();
        addressPostCode = addressProperties.getAddressPostCodeCAN();
        addressCountry = addressProperties.getAddressCountryCAN();
        addressTimeZone = addressProperties.getAddressTimeZoneCAN();
        break;
      case enums.SourceCountry.FRA:
        addressLine1 = addressProperties.getAddressLine1FRA();
        addressTown = addressProperties.getAddressTownFRA();
        addressCounty = addressProperties.getAddressCountyFRA();
        addressPostCode = addressProperties.getAddressPostCodeFRA();
        addressCountry = addressProperties.getAddressCountryFRA();
        addressTimeZone = addressProperties.getAddressTimeZoneFRA();
        break;
      case enums.SourceCountry.IRL:
        addressLine1 = addressProperties.getAddressLine1IRL();
        addressTown = addressProperties.getAddressTownIRL();
        addressCounty = addressProperties.getAddressCountyIRL();
        addressPostCode = addressProperties.getAddressPostCodeIRL();
        addressCountry = addressProperties.getAddressCountryIRL();
        addressTimeZone = addressProperties.getAddressTimeZoneIRL();
        break;
      case enums.SourceCountry.ITA:
        addressLine1 = addressProperties.getAddressLine1ITA();
        addressTown = addressProperties.getAddressTownITA();
        addressCounty = addressProperties.getAddressCountyITA();
        addressPostCode = addressProperties.getAddressPostCodeITA();
        addressCountry = addressProperties.getAddressCountryITA();
        addressTimeZone = addressProperties.getAddressTimeZoneITA();
        break;
    }
    scenarioSession.setAddressLine1(addressLine1);
    scenarioSession.setAddressTown(addressTown);
    scenarioSession.setAddressCounty(addressCounty);
    scenarioSession.setAddressPostCode(addressPostCode);
    scenarioSession.setAddressCountry(addressCountry);
    scenarioSession.setTimeZone(addressTimeZone);
  },

  getCustomerLocaleName: function() {
    return getLocaleName();
  }
};

