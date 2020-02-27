'use strict';
// REQUIRE
const wd = require('../../runtime/webDriverHelper');
const webDriverHelper = require('../../webdriver/webdriverHelper');
const voucherProperties = require('../../data/voucherProperties');
// ELEMENTS
const RATE_PLAN_LIST = './/*[@id="voucherPage:j_id2:j_id30:voucher_pageblock:section1:ratePlanTable:tb"]/tr[position() mod 2 = 1 and position() > 0]/td[2]';
const NEXT_BUTTON = '.nextButton';
const BACK_BUTTON = '.backButton';
const QUANTITY_INPUT = './/*[@name ="voucherPage:j_id2:j_id30:voucher_pageblock:section1:ratePlanTable:0:j_id71"]';
const VOUCHER_CODE_INPUT = './/*[contains(@id, "vouCode")]';
const UPDATE_BASKET_BUTTON = './/*[@value="Update Basket"]';
const ONE_TIME_AMOUNT = './/*[contains(@id,"onetimeAmount")]';
const RECURRING_AMOUNT = './/*[contains(@id,"recurringAmount")]';
const QUANTITY = './/*[contains(@id,"recurringAmount")]/../following-sibling::td[1]/span';
const ONE_TIME_DISCOUNT = './/*[contains(@id,"discountOnetime")]';
const RECURRING_DISCOUNT = './/*[contains(@id,"discountRecurring")]';
const SUBTOTAL = './/*[.="Subtotal:"]/../following-sibling::td/span';
const TAX = './/*[.="Tax:"]/../following-sibling::td/span';
const TOTAL = './/*[.="Total:"]/../following-sibling::td/span';
const SUB_TOTAL_FIELD = './/span[.="Subtotal:"]';
const TAX_FIELD = './/span[.="Tax:"]';
const TOTAL_FIELD = './/span[.="Total:"]';
const CONVERT_BUTTON = './/*[@id="voucherPage:j_id2:j_id30:byo_pageblock_container:byo_section1:j_id120"]';
const ERROR_MESSAGE = '.messageText';

const enums = require('../../enum/const');

module.exports = {
  getRatePlansList: async function () {
    return await webDriverHelper.getElementText(RATE_PLAN_LIST);
  },

  clickNext: function () {
    return wd.click(NEXT_BUTTON);
  },

  clickBack: function () {
    return webDriverHelper.waitAndClick(BACK_BUTTON);
  },

  switchToIframe: async function () {
    await webDriverHelper.waitForIFrame();
    await webDriverHelper.switchToIframe();
  },

  applyVoucher: async function (voucherType) {
    let voucherCode = voucherProperties.getVoucherCode(voucherType);
    await webDriverHelper.waitAndSetValue(VOUCHER_CODE_INPUT, voucherCode);
    await webDriverHelper.waitAndClick(UPDATE_BASKET_BUTTON);
  },

  getAmount: async function (ratePlanPaymentType) {
    let amount;
    switch (ratePlanPaymentType) {
      case enums.RatePlanPaymentType.ONETIME:
        amount = await this.getOneTimeAmount();
        break;
      case enums.RatePlanPaymentType.RECURRING:
      case enums.RatePlanPaymentType.BYO:
        amount = await this.getRecurringAmount();
    }
    return amount;
  },

  getActualDiscount: async function (ratePlanPaymentType) {
    let discount;
    switch (ratePlanPaymentType) {
      case enums.RatePlanPaymentType.ONETIME:
        discount = await webDriverHelper.getElementText(ONE_TIME_DISCOUNT);
        break;
      case enums.RatePlanPaymentType.RECURRING:
      case enums.RatePlanPaymentType.BYO:
        discount = await webDriverHelper.getElementText(RECURRING_DISCOUNT);
    }
    return discount;
  },

  getQuantity: async function () {
    let quantity = await webDriverHelper.getElementText(QUANTITY);
    if (quantity) {
      return quantity;
    }
    return null;
  },

  getSubtotal: async function () {
    return webDriverHelper.getElementText(SUBTOTAL);
  },

  getTax: async function () {
    return webDriverHelper.getElementText(TAX);
  },

  getTotal: async function () {
    let totalAmount = await webDriverHelper.getElementText(TOTAL);
    let amount = totalAmount.split(' ');
    return parseFloat(amount[1]).toFixed(2);
  },

  isSubTotalVisible: async function () {
    return wd.isDisplayed(SUB_TOTAL_FIELD);
    // let count = await webDriverHelper.getElementsCount(SUB_TOTAL_FIELD);
    // return count > 0;
  },

  isTaxFieldVisible: async function () {
    return wd.isDisplayed(TAX_FIELD);
    //
    // let count = await webDriverHelper.getElementsCount(TAX_FIELD);
    // return count > 0;
  },

  isTotalVisible: async function () {
    return wd.isDisplayed(TOTAL_FIELD);
    // let count = await webDriverHelper.getElementsCount(TOTAL_FIELD);
    // return count > 0;
  },

  getOneTimeAmount: async function () {
    return webDriverHelper.getElementText(ONE_TIME_AMOUNT)
  },

  getRecurringAmount: async function () {
    return webDriverHelper.getElementText(RECURRING_AMOUNT)
  },

  updateQuantity: async function (quantity) {
    if (quantity > 1) {
      await webDriverHelper.waitAndSetValue(QUANTITY_INPUT, quantity);
      await webDriverHelper.waitAndClick(UPDATE_BASKET_BUTTON);
    }
  },

  covertToBYO: async function () {
    await webDriverHelper.waitAndScroll(CONVERT_BUTTON);
    await webDriverHelper.waitAndClick(CONVERT_BUTTON);
  },

  getBYOQuantity: async function (amount) {
    let count = 1;
    let totalAmount = amount;
    while (totalAmount < 250) {
      count++;
      totalAmount = amount * count;
    }
    return count;
  },

  getErrorMessage: async function() {
    return webDriverHelper.getElementText(ERROR_MESSAGE);
  }
};