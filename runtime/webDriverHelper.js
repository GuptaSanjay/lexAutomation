'use strict';
const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

module.exports = {
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

  switchToIframe: function () {
    return this.getSFElement('.//*[starts-with(@name, "vfFrameId")]', '').then(el => el.getAttribute('name').then(name => driver.switchTo().frame(name)));
  },

  switchToIframeByNameOrId: function(identifier) {
    return driver.switchTo().frame(identifier);
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
    } else if (identifier.charAt(0) === ".") {
      identifier = identifier.substring(1);
      by = By.className(identifier);
    } else {
      by = By.css(identifier);
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
};
