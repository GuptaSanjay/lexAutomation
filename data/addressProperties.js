'use strict';
const path = require('path');
const PropertiesReader = require('properties-reader');
const properties = PropertiesReader(path.join(__dirname, 'address.properties'));

module.exports = {
  getAddressLine1GBR: function(){
      return properties.get('address.line1.gbr');
  },

  getAddressTownGBR: function(){
    return properties.get('address.town.gbr');
  },

  getAddressCountyGBR: function(){
    return properties.get('address.county.gbr');
  },

  getAddressPostCodeGBR: function(){
    return properties.get('address.postcode.gbr');
  },

  getAddressCountryGBR: function(){
    return properties.get('address.country.gbr');
  },

  getAddressTimeZoneGBR: function(){
    return properties.get('address.timeZone.gbr');
  },

  getAddressLine1USA1: function(){
      return properties.get('address.line1.us1');
  },

  getAddressTownUSA1: function(){
    return properties.get('address.town.us1');
  },

  getAddressCountyUSA1: function(){
    return properties.get('address.county.us1');
  },

  getAddressPostCodeUSA1: function(){
    return properties.get('address.postcode.us1');
  },

  getAddressCountryUSA1: function(){
    return properties.get('address.country.us1');
  },

  getAddressTimeZoneUSA1: function(){
    return properties.get('address.timeZone.us1');
  },

  getAddressLine1USA2: function(){
    return properties.get('address.line1.us2');
  },

  getAddressTownUSA2: function(){
    return properties.get('address.town.us2');
  },

  getAddressCountyUSA2: function(){
    return properties.get('address.county.us2');
  },

  getAddressPostCodeUSA2: function(){
    return properties.get('address.postcode.us2');
  },

  getAddressCountryUSA2: function(){
    return properties.get('address.country.us2');
  },

  getAddressLine1USA3: function(){
    return properties.get('address.line1.us3');
  },

  getAddressTownUSA3: function(){
    return properties.get('address.town.us3');
  },

  getAddressCountyUSA3: function(){
    return properties.get('address.county.us3');
  },

  getAddressPostCodeUSA3: function(){
    return properties.get('address.postcode.us3');
  },

  getAddressCountryUSA3: function(){
    return properties.get('address.country.us3');
  },

  getAddressLine1CAN: function(){
    return properties.get('address.line1.can');
  },

  getAddressTownCAN: function(){
    return properties.get('address.town.can');
  },

  getAddressCountyCAN: function(){
    return properties.get('address.county.can');
  },

  getAddressPostCodeCAN: function(){
    return properties.get('address.postcode.can');
  },

  getAddressCountryCAN: function(){
    return properties.get('address.country.can');
  },

  getAddressTimeZoneCAN: function(){
    return properties.get('address.timeZone.can');
  },

  getAddressLine1IRL: function(){
    return properties.get('address.line1.irl');
  },

  getAddressTownIRL: function(){
    return properties.get('address.town.irl');
  },

  getAddressCountyIRL: function(){
    return properties.get('address.county.irl');
  },

  getAddressPostCodeIRL: function(){
    return properties.get('address.postcode.irl');
  },

  getAddressCountryIRL: function(){
    return properties.get('address.country.irl');
  },

  getAddressTimeZoneIRL: function(){
    return properties.get('address.timeZone.irl');
  },

  getAddressLine1ITA: function(){
    return properties.get('address.line1.ita');
  },

  getAddressTownITA: function(){
    return properties.get('address.town.ita');
  },

  getAddressCountyITA: function(){
    return properties.get('address.county.ita');
  },

  getAddressPostCodeITA: function(){
    return properties.get('address.postcode.ita');
  },

  getAddressCountryITA: function(){
    return properties.get('address.country.ita');
  },

  getAddressTimeZoneITA: function(){
    return properties.get('address.timeZone.ita');
  },

  getAddressLine1FRA: function(){
    return properties.get('address.line1.fra');
  },

  getAddressTownFRA: function(){
    return properties.get('address.town.fra');
  },

  getAddressCountyFRA: function(){
    return properties.get('address.county.fra');
  },

  getAddressPostCodeFRA: function(){
    return properties.get('address.postcode.fra');
  },

  getAddressCountryFRA: function(){
    return properties.get('address.country.fra');
  },

  getAddressTimeZoneFRA: function(){
    return properties.get('address.timeZone.fra');
  },

  getAddressLine1ENGQUOTE: function(){
    return properties.get('address.line1.engquote');
  },

  getAddressLine2ENGQUOTE: function(){
    return properties.get('address.line2.engquote');
  },

  getAddressTownENGQUOTE: function(){
    return properties.get('address.town.engquote');
  },

  getAddressPostCodeENGQUOTE: function(){
    return properties.get('address.postcode.engquote');
  },

  getAddressCountryENGQUOTE: function(){
    return properties.get('address.country.engquote');
  }
};
