'use strict';
const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

module.exports = {
  navigateTo: function(url){
    return driver.get(url);
  },

  setValue: function (identifier, value) {
    return this.getSFElement(identifier, '').then(el => el.sendKeys(value));
  },

  isDisplayed: function (identifier) {
    return this.getSFElements(identifier).then(els => els.length > 0);
  },

  selectByValue: function (value) {
    return this.getSFElement('.//*[@value="' + value + '"]').then(el => el.click());
  },

  click: function (identifier) {
    return this.getSFElement(identifier, '').then(el => el.click());
  },

  clickLink: function (identifier) {
    return this.getSFElement(identifier, 'Link').then(el => el.click());
  },

  getText: function (identifier) {
    return this.getSFElement(identifier, '').then(el => el.getText(identifier));
  },

  switchToLexIframe: function () {
    return this.getAttributeName('.//*[starts-with(@name, "vfFrameId")]').then(name => this.switchToIframe(name));
    // return this.getSFElement('.//*[starts-with(@name, "vfFrameId")]', '').then(el => el.getAttribute('name').then(name => driver.switchTo().frame(name)));
  },

  switchToIframe: function(name){
    driver.switchTo().frame(name);
  },

  getBy: function (identifier, identifierType){
    let by;
    if (identifierType === 'Link') {
      by = By.linkText(identifier);
    } else if (identifier.includes("#")) {
      identifier = identifier.substring(1);
      by = By.id(identifier);
    } else if (identifier.includes(".//")) {
      // identifier = identifier.substring(1);
      by = By.xpath(identifier);
    } else if (identifier.includes(".")) {
      identifier = identifier.substring(1);
      by = By.className(identifier);
    }
    return by;
  },

  getSFElement: async function (identifier, identifierType) {
    let by = this.getBy(identifier, identifierType);
    await driver.wait(until.elementLocated(by), 10000);
    let el = await driver.findElement(by);
    await driver.wait(until.elementIsEnabled(el), 10000);
    await driver.wait(until.elementIsVisible(el), 10000);
    return el;
  },

  getSFElements: async function (identifier) {
    let by = this.getBy(identifier, '');
    try {
      await driver.wait(until.elementLocated(by), 10000);
    } catch (e) {
    }
    return driver.findElements(by);
  },

  waitAndRefresh: async function(waitRefresh){
    await driver.sleep(waitRefresh);
    await driver.navigate().refresh();
  },

  waitRefreshUntilText: async function(identifier, condition, totalWait, refreshDuration){
    let count = 0;
    let maxCount = totalWait/refreshDuration;
    while (await this.getText(identifier) !== condition && count < maxCount) {
      this.waitAndRefresh(refreshDuration);
      count++;
    }
  },

  getAttributeHref: async function(identifier) {
    return this.getSFElement(identifier).then(el => el.getAttribute('href'));
  },

  getAttributeName: async function(identifier){
    return this.getSFElement(identifier).then(el => el.getAttribute('name'));
  },

  waitAndClick: async function(identifier) {
    return this.click(identifier);
  },

  waitAndSetValue: async function(identifier, value){
    return this.setValue(identifier, value);
  },
};

