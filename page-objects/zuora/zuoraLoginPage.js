'use strict';
const webDriverHelper = require('../../webdriver/webdriverHelper');
const loginPorperties = require('../../data/loginProperties');

const USERNAME_INPUT = './/*[@id="id_username"]';
const  PASSWORD_INPUT = './/*[@id="id_password"]';
const LOGIN_BUTTON = './/*[@class="btn-login"]';

module.exports = {
  login: async function () {
    await webDriverHelper.waitAndSetValue(USERNAME_INPUT, loginPorperties.getZuoraUsername()+envName);
    await webDriverHelper.waitAndSetValue(PASSWORD_INPUT, loginPorperties.getZuoraPassword());
    await webDriverHelper.waitAndClick(LOGIN_BUTTON);
  }
};