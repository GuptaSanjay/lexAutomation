'use strict';
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'tax.properties'));

module.exports ={
  getCanadaTax: function() {
    return properties.get('ca.tax');
  },

  getItalyTax: function() {
    return properties.get('it.tax.divisor');
  },

  getUKTax1: function () {
    return properties.get('uk.tax.divisor1');
  },

  getUKTax2: function () {
    return properties.get('uk.tax.divisor2');
  },

  getIrelandTax1: function () {
    return properties.get('ie.tax.divisor1');
  },

  getIrelandTax2: function () {
    return properties.get('ie.tax.divisor2');
  },

  getFranceTax: function () {
    return properties.get('fra.tax.divisor');
  },

  getUSATax1: function () {
    return properties.get('usa1.tax');
  },

  getUSATax2: function () {
    return properties.get('usa2.tax');
  },

  getUSATax3: function () {
    return properties.get('usa3.tax');
  },

};
