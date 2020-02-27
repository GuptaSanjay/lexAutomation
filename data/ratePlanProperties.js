'use strict';

const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'ratePlan.properties'));

module.exports = {
  /**
   * Returns a rate plan based on passed rate plan type
   * @param ratePlanType
   * @returns {String}
   */
  getRatePlan: function (ratePlanType) {
    return properties.get(ratePlanType);
  },

  // getRatePlanType: function (ratePlanType) {
  //   let ratePlanDeliveryInstall;
  //   if (ratePlanType.includes("DELIVERY")){
  //     ratePlanType = 'DELIVERY';
  //   }
  // }


};