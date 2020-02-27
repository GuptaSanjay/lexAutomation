'use strict';
const enums = require('../enum/const');
const loginProperties = require('../data/loginProperties');

module.exports = {
  /**
   * returns username based on user profile and country
   * @param userProfile
   * @param sourceCountry
   * @returns {string}
   */
  getUserNameByProfile: function (userProfile, sourceCountry) {
    let username;
    switch (userProfile) {
      case enums.UserProfile.ADMIN:
        username = loginProperties.getAdminUsername();
        break;
      case enums.UserProfile.CSA:
        if (Object.is(sourceCountry, enums.SourceCountry.CAN) || Object.is(sourceCountry, enums.SourceCountry.USA)) {
          username = loginProperties.getCSANAUsername();
        } else {
          username = loginProperties.getCSAUsername();
        }
        break;
      case enums.UserProfile.HU_CHAMPION:
        username = loginProperties.getHUChampionUsername();
        break;
      case enums.UserProfile.BIQ:
        username = loginProperties.getBIQUsername();
        break
    }
    return username + envName;
  },

  /**
   * returns pass based on user profile
   * @param userProfile
   * @returns {string}
   */
  getPasswordByProfile:function (userProfile) {
    let password;
    switch (userProfile) {
      case enums.UserProfile.HU_CHAMPION:
        password = loginProperties.getHUChampPassword();
        break;
      default: password = loginProperties.getAdminPassword();
    }
    return password;
  },



};

