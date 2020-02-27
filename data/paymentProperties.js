'use strict';
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'payment.properties'));

module.exports = {
  getCardHolderName: function () {
    return properties.get('payment.cardHolder.name');
  },

  getCreditCardNumber: function () {
    return properties.get('payment.card.number');
  },

  getCreditCardAmexNumber: function () {
    return properties.get('payment.card.amex.number');
  },

  getCreditCardDiscoveryNumber: function () {
    return properties.get('payment.card.discovery.number');
  },

  getNewCreditCardNumber: function () {
    return properties.get('payment.card.number.new');
  },

  getCardExpiryMonth: function () {
    let month = properties.get('payment.card.expiry.month').toString();
    if (month.length < 2) {
      month = '0' + month;
    }
    return month;
  },

  getCardExpiryYear: function () {
    return properties.get('payment.card.expiry.year');
  },

  getCardCVV: function () {
    return properties.get('payment.card.cvv');
  },

  getAccountName: function () {
    return properties.get('payment.dd.account.name');
  },

  getBankName: function () {
    return properties.get('payment.dd.bank.name');
  },

  getAccountNumber: function () {
    return properties.get('payment.dd.account.number');
  },

  getSortCode: function () {
    return properties.get('payment.dd.sort.code');
  },
};
