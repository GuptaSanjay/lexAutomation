'use strict';
const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

module.exports = {

  navigateTo: function (url) {
    return driver.get(url);
  },
  //*******Attribute*******//
  getAttributeHref: async function (identifier) {
    return this.getSFElement(identifier).then(el => el.getAttribute('href'));
  },

  getAttributeName: async function (identifier) {
    return this.getSFElement(identifier).then(el => el.getAttribute('name'));
  },


  getElementsCount: async function(identifier){
    let el = await this.getSFElements(identifier);
    return el.length;
  },

  //*******Click*******//
  click: function (identifier) {
    return this.getSFElement(identifier, '').then(el => el.click());
  },

  clickLink: function (identifier) {
    return this.getSFElement(identifier, 'Link').then(el => el.click());
  },

  //*******Get*******//
  getBy: function (identifier, identifierType) {
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

  getText: function (identifier) {
    return this.getSFElement(identifier, '').then(el => el.getText(identifier));
  },

  //*******Iframe*******//
  switchToLexIframe: async function () {
    const partialLexIframeName = '(.//*[starts-with(@name, "vfFrameId")])[last()]';
    await this.isDisplayed(partialLexIframeName);
    await this.getAttributeName(partialLexIframeName).then(name => this.switchToIframe(name));
    // return this.getSFElement('.//*[starts-with(@name, "vfFrameId")]', '').then(el => el.getAttribute('name').then(name => driver.switchTo().frame(name)));
  },

  switchToIframe: function (name) {
    return driver.switchTo().frame(name);
  },

  //*******Is*******//
  isDisplayed: function (identifier) {
    return this.getSFElements(identifier).then(els => els.length > 0);
  },

  //*******Scroll*******//
  scrollToElement: async function (identifier) {
    let element = this.getSFElement(identifier, '');
    await driver.executeScript('arguments[0].scrollIntoView();', element);
  },

  scrollFullPage: async function () {
    let el = await this.getSFElements('.//div');
    let existingDivCount = el.length;
    let newDivCount = 0;
    while (newDivCount < existingDivCount) {
      await driver.executeScript('window.scrollBy(0,600)');
      driver.sleep(2000);
      newDivCount = existingDivCount;
      el = await this.getSFElements('.//div');
      existingDivCount = el.length;
    }
  }
  ,

  //*******Select*******//
  selectByValue: function (value) {
    return this.getSFElement('.//*[@value="' + value + '"]').then(el => el.click());
  },

  //*******Set Value*******//
  setValue: function (identifier, value) {
    return this.getSFElement(identifier, '').then(el => el.sendKeys(value));
  },

  //*******Wait*******
  waitShort: async function () {
    return this.wait(SHORT_WAIT);
  },

  waitMedium: async function () {
    return this.wait(MID_WAIT);
  },

  waitLong: async function () {
    return this.wait(LONG_WAIT);
  },

  waitExtraLong: async function () {
    return this.wait(EXTRA_LONG_WAIT);
  },

  wait: async function (waitTime) {
    return driver.sleep(waitTime);
  },

  //*******Wait and Refresh*******//
  waitAndRefresh: async function (waitRefresh) {
    await this.wait(waitRefresh);
    await driver.navigate().refresh();
  },

  waitRefreshUntilText: async function (identifier, condition, totalWait, refreshDuration) {
    let count = 0;
    let maxCount = totalWait / refreshDuration;
    while (await this.getText(identifier) !== condition && count < maxCount) {
      this.waitAndRefresh(refreshDuration);
      count++;
    }
    return this.getText(identifier);
  },

  clickInvisibleElement: async function(identifiers){
    let identifier = 'input[name="commit"]';
    await driver.executeScript(identifier).then(async () => {document.querySelector(identifier).click()});
  },

  //*******Legacy START*******
  waitAndClick: async function (identifier) {
    return this.click(identifier);
  },

  waitAndSetValue: async function (identifier, value) {
    return this.setValue(identifier, value);
  },

  getElementText: async function (identifier) {
    return this.getText(identifier);
  },

};

