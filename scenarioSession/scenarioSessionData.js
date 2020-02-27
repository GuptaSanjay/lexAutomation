'use strict';
var scenarioData = new Map();

module.exports = {
  /**
   * Set source country with given source country name
   * @param sourceCountryName
   */
  setSourceCountry: function (sourceCountryName) {
    scenarioData.set('sourceCountry', sourceCountryName);
  },

  /**
   * Returns source country name
   * @returns {String}
   */
  getSourceCountry: function () {
    return scenarioData.get('sourceCountry');
  },

  /**
   * Set rate plan with given rate plan
   * @param ratePlan
   */
  setRatePlan: function (ratePlan) {
    scenarioData.set('ratePlan', ratePlan);
  },

  /**
   * Set rate plan payment type as onetime or recurring
   * @param ratePlanPaymentType
   */
  setRatePlanPaymentType: function (ratePlanPaymentType) {
    scenarioData.set('ratePlanPaymentType', ratePlanPaymentType);
  },

  /**
   * Returns rate plan
   * @returns {String}
   */
  getRatePlan: function () {
    let ratePlan = scenarioData.get('ratePlan');
    if (typeof ratePlan === 'undefined') {
      return '';
    } else {
      return ratePlan;
    }
  },

  /**
   * Returns rate plan payment type as onetime or recurring
   * @returns {String}
   */
  getRatePlanPaymentType: function () {
    return scenarioData.get('ratePlanPaymentType');
  },

  /**
   * Set first name with given first name
   * @param firstName
   */
  setCustomerFirstName: function (firstName) {
    scenarioData.set('firstname', firstName);
  },

  /**
   * Returns customer first name
   * @returns {String}
   */
  getCustomerFirstName: function () {
    return scenarioData.get('firstname');
  },

  /**
   * Set last name with given last name
   * @param lastName
   */
  setCustomerLastName: function (lastName) {
    scenarioData.set('lastname', lastName);
  },

  /**
   * Return customer last name
   * @returns {String}
   */
  getCustomerLastName: function () {
    return scenarioData.get('lastname');
  },

  /**
   * Set customer email with given email
   * @param email
   */
  setCustomerEmail: function (email) {
    // ToDo add the prefix and postfix to email
    scenarioData.set('email', email);
  },

  /**
   * Returns customer email
   * @returns {String}
   */
  getCustomerEmail: function () {
    return scenarioData.get('email');
  },

  /**
   * Set customer locale with given locale
   * @param locale
   */
  setCustomerLocale: function (locale) {
    scenarioData.set('locale', locale);
  },

  /**
   * Returns customer locale
   * @returns {String}
   */
  getCustomerLocale: function () {
    return scenarioData.get('locale');
  },

  /**
   * Set customer locale name with given locale
   * @param localeName
   */
  setCustomerLocaleName: function (localeName) {
    scenarioData.set('localeName', localeName);
  },

  /**
   * Returns customer locale name
   * @returns {String}
   */
  getCustomerLocaleName: function () {
    return scenarioData.get('localeName');
  },

  /**
   * Set customer lead source with given lead source
   * @param leadSource
   */
  setCustomerLeadSource: function (leadSource) {
    scenarioData.set('leadSource', leadSource);
  },

  /**
   * Returns customer lead source
   * @returns {String}
   */
  getCustomerLeadSource: function () {
    return scenarioData.get('leadSource');
  },

  /**
   * Set customer currency with given currency
   * @param currency
   */
  setCustomerCurrency: function (currency) {
    scenarioData.set('currency', currency);
  },

  /**
   * Returns customer currency
   * @returns {String}
   */
  getCustomerCurrency: function () {
    return scenarioData.get('currency');
  },

  /**
   * Set time zone for customer with given
   */
  setTimeZone: function (timeZone) {
    scenarioData.set('timeZone', timeZone);
  },

  /**
   * Return customer timeZone
   * @returns {any}
   */
  getTimeZone: function () {
    return scenarioData.get('timeZone');
  },

  /**
   * Set address line 1 with given address
   */
  setAddressLine1: function (addressLine1) {
    scenarioData.set('addressLine1', addressLine1);
  },

  /**
   * Returns the address line 1
   * @returns {String}
   */
  getAddressLine1: function () {
    return scenarioData.get('addressLine1');
  },

  /**
   * Set address town with given town
   * @param addressTown
   */
  setAddressTown: function (addressTown) {
    scenarioData.set('addressTown', addressTown);
  },

  /**
   * Returns the address town
   * @returns {String}
   */
  getAddressTown: function () {
    return scenarioData.get('addressTown');
  },

  /**
   * Set address county with given county
   * @param addressCounty
   */
  setAddressCounty: function (addressCounty) {
    scenarioData.set('addressCounty', addressCounty);
  },

  /**
   * Returns address county
   * @returns {String}
   */
  getAddressCounty: function () {
    return scenarioData.get('addressCounty');
  },

  /**
   * Set address post code with given postcode
   * @param addressPostCode
   */
  setAddressPostCode: function (addressPostCode) {
    scenarioData.set('addressPostCode', addressPostCode);
  },

  /**
   * Returns the address postcode
   * @returns {String}
   */
  getAddressPostCode: function () {
    return scenarioData.get('addressPostCode');
  },

  /**
   * Set address country with given country
   * @param addressCountry
   */
  setAddressCountry: function (addressCountry) {
    scenarioData.set('addressCountry', addressCountry);
  },

  /**
   * Returns the address country
   */
  getAddressCountry: function () {
    return scenarioData.get('addressCountry');
  },

  /**
   * Set voucher code with given voucher code
   * @param voucherCode
   */
  setVoucherCode: function (voucherCode) {
    scenarioData.set('voucherCode', voucherCode);
  },

  /**
   * Returns the voucher code
   * @returns {any}
   */
  getVoucherCode: function () {
    return scenarioData.get('voucherCode');
  },

  /**
   * Set voucher type with given voucher type
   * @param voucherType
   */
  setVoucherType: function (voucherType) {
    scenarioData.set('voucherType', voucherType);
  },

  /**
   * Returns the voucher type
   * @returns {any}
   */
  getVoucherType: function () {
    return scenarioData.get('voucherType');
  },

  setSubscriptionCount: function (subscriptionCount) {
    scenarioData.set('subscriptionCount', subscriptionCount);
  },

  getSubscriptionCount: function () {
    return scenarioData.get('subscriptionCount');
  },

  setOrderCount: function (orderCount) {
    scenarioData.set('orderCount', orderCount);
  },

  getOrderCount: function () {
    return scenarioData.get('orderCount');
  },

  setBillingAccountInvoiceStatus: function (invoiceStatus) {
    scenarioData.set('billingAccountInvoiceStatus', invoiceStatus);
  },

  getBillingAccountInvoiceStatus: function () {
    return scenarioData.set('billingAccountInvoiceStatus',);
  },

  setBillingAccountPaymentStatus: function (paymentStatus) {
    scenarioData.set('billingAccountPaymentStatus', paymentStatus);
  },

  getBillingAccountPaymentStatus: function () {
    scenarioData.set('billingAccountPaymentStatus');
  },

  setEmailNotificationCount: function (emailNotificationCount) {
    scenarioData.set('emailNotificationCount', emailNotificationCount);
  },

  getEmailNotificationCount: function () {
    return scenarioData.get('emailNotificationCount');
  },

  setWMISNumber: function (wmisNumber) {
    scenarioData.set('wmisNumber', wmisNumber);
  },

  getWMISNumber: function () {
    return scenarioData.get('wmisNumber');
  },

  setAccountName: function (accountName) {
    scenarioData.set('accountName', accountName);
  },

  getAccountName: function () {
    return scenarioData.get('accountName');
  },

  setSubscriptionName: function (subscriptionName) {
    scenarioData.set('subscriptionName', subscriptionName);
  },

  getSubscriptionName: function () {
    return scenarioData.get('subscriptionName');
  },

  setSubscriptionVersion: function (subscriptionVersion) {
    scenarioData.set('subscriptionVersion', subscriptionVersion);
  },

  getSubscriptionVersion: function () {
    return scenarioData.get('subscriptionVersion');
  },

  setSubscriptionStartDate: function (subscriptionStartDate) {
    scenarioData.set('subscriptionStartDate', subscriptionStartDate);
  },

  getSubscriptionStartDate: function () {
    return scenarioData.get('subscriptionStartDate');
  },

  setRefundedAmount: function (refundedAmount) {
    scenarioData.set('refundedAmount', refundedAmount);
  },

  getRefundedAmount: function () {
    return scenarioData.get('refundedAmount');
  },

  setETFAmount: function (etfAmount) {
    scenarioData.set('etfAmount', etfAmount);
  },

  getETFAmount: function () {
    return scenarioData.get('etfAmount');
  },

  setSubscriptionRowCount: function (subscriptionRowCount) {
    scenarioData.set('subscriptionRowCount', subscriptionRowCount);
  },

  getSubscriptionRowCount: function () {
    return scenarioData.get('subscriptionRowCount');
  },

  setSubscriptionProductQuantity: function (subscriptionProductQuantity) {
    scenarioData.set('subscriptionProductQuantity', subscriptionProductQuantity);
  },

  getSubscriptionProductQuantity: function () {
    return scenarioData.get('subscriptionProductQuantity');
  },

  setBillingAccountPageLink: function (billingAccountLink) {
    scenarioData.set('billingAccountLink',billingAccountLink);
  },

  getBillingAccountPageLink: function () {
    return scenarioData.get('billingAccountLink');
  },

  setSubscriptionPageLink:function (subscriptionPageLink) {
    scenarioData.set('subscriptionPageLink',subscriptionPageLink);
  },

  getSubscriptionPageLink: function () {
    return scenarioData.get('subscriptionPageLink');
  },

  setOrderDeliveryPageLink: function (orderPageLink) {
    scenarioData.set('orderDeliveryPageLink',orderPageLink);
  },

  getOrderDeliveryPageLink:function () {
    return scenarioData.get('orderDeliveryPageLink');
  },
  setOrderInstallationPageLink: function (orderPageLink) {
    scenarioData.set('orderInstallationPageLink',orderPageLink);
  },

  getOrderInstallationPageLink:function () {
    return scenarioData.get('orderInstallationPageLink');
  },

  setRecentQuoteLink: function (recentQuoteLink) {
    scenarioData.set('recentQuoteLink',recentQuoteLink);
  },

  getRecentQuoteLink: function () {
    return scenarioData.get('recentQuoteLink');

  },
};

