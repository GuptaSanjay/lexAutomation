'use strict';
const loginLib = require('../lib/loginLib');
const wd = require('../runtime/webDriverHelper');
const USERNAME_INPUT = '#username';
const PASSWORD_INPUT = '#password';
const LOGIN_BUTTON = '#Login';

module.exports = {
  /**
   * Login on salesforce
   * @param userProfile
   * @param sourceCountry
   * @returns {Promise<void>}
   */
  loginSF: async function (userProfile, sourceCountry) {
    let username = loginLib.getUserNameByProfile(userProfile, sourceCountry);
    let password = loginLib.getPasswordByProfile(userProfile);
    await wd.setValue(USERNAME_INPUT, username);
    await wd.setValue(PASSWORD_INPUT, password);
    await wd.click(LOGIN_BUTTON);
  }
};