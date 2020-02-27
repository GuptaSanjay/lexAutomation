'use strict';
const wd = require('../../runtime/webDriverHelper');
const webDriverHelper = require('../../webdriver/webdriverHelper');
const DELIVERY_OPTION = './/*[@name="selectedRatePlan"][1]';
const NON_HAART_JOB_BOOKING_BUTTON = './/input[@value=" Non HAART job booking "]';
const JOB_REFERENCE_NUMBER = './/*[@id="j_id0:j_id1:j_id32:deliveryJobBooking:j_id207:tblJobAppointmentEdit:0:j_id212"]';
const SCHEDULE_DATE = '.dateFormat a';
const SCHEDULE_SLOT = './/*[@id="j_id0:j_id1:j_id32:deliveryJobBooking:j_id207:tblJobAppointmentEdit:0:j_id216"]';
const SAVE_JOB = './/input[@value=" Save Job "]';
const NEXT_BUTTON = './/button[.="Next"]';
const AM_SLOT = 'AM';
const TRACKED_DELIVERY_RATE_PLAN_NAME_UK = './/td[.="DELIVERY: 1st Class Tracked Delivery"]/preceding-sibling::td[2]';

const UK_FREE_STR = "1st Class Tracked Delivery - £0.00";
const UK_PAID_STR = "1st Class Tracked Delivery - £2.95";

module.exports = {
  switchToIframe: async function () {
    await webDriverHelper.waitForIFrame();
    let iframeName = await webDriverHelper.getElementAttribute('.//*[starts-with(@name, "vfFrameId")]', 'name');
    await webDriverHelper.switchToIframe( iframeName);
  },

  selectDeliveryOption: async function () {
    await wd.click(DELIVERY_OPTION);
  },

  bookJob: async function (wmisNumber) {
    await webDriverHelper.waitAndClick(NON_HAART_JOB_BOOKING_BUTTON);
    await webDriverHelper.waitAndSetValue(JOB_REFERENCE_NUMBER, wmisNumber);
    await webDriverHelper.waitAndClick(SCHEDULE_DATE);
    await webDriverHelper.waitAndSelectByValue(SCHEDULE_SLOT, AM_SLOT);
    await webDriverHelper.waitAndClick(SAVE_JOB);
  },

  clickNext: async function () {
    // await webDriverHelper.shortWait();
    await wd.click(NEXT_BUTTON);
  },

  validateDeliveryThreshold: async function(deliveryType) {
    let expectedResult = (deliveryType === 'FREE') ? UK_FREE_STR : UK_PAID_STR;
    let actualResult = await webDriverHelper.getElementText(TRACKED_DELIVERY_RATE_PLAN_NAME_UK);
    return actualResult === expectedResult;
  }
};