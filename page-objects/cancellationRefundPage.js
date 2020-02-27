'use strict';
const webDriverHelper = require('../webdriver/webdriverHelper');
const FULL_CANCELLATION_OPTION = './/label[.=" Full Cancellation"]';
const PARTIAL_CANCELLATION_OPTION = './/label[.=" Partial Cancellation"]';
const CANCEL_REFUND_OPTION = './/label[contains(text(), "Cancel & Refund")]';
const CANCEL_END_OF_INVOICE = './/label[contains(text(), "Cancel End Of Invoice")]';
const BILL_CYCLE_DAY = './/th[.="Bill Cycle Day"]/following-sibling::td/span';
const NEW_QUANTITIES = './/th[.="New Quantity"]/../../following-sibling::tbody/tr/td[6]/span';
const SUBSCRIPITION_START_DATE = './/th[.="Subscription Start Date"]/following-sibling::td/span';
const SUBMIT_BUTTON = './/button[.="Submit"]';
const CANCEL_AND_REFUND_BUTTON= './/input[@value="Cancel And Refund"]';
const CONTINUE_TO_SUBMIT_BUTTON = './/input[@value="Continue to Submit"]';
const FIRST_FLYOUT_BUTTON = './/table[@id="ratePlanChargeTable"]/tbody/tr[1]/td/table[@class="subColumns"]/tbody/tr[1]/td/div/div[@class="flyoutButton"]';
const REMOVE_PRODUCT_NAME = './/table[@id="ratePlanChargeTable"]/tbody/tr[1]/td/table[@class="subColumns"]/tbody/tr[1]/td/div/div[@class="flyout"]/ul/li[starts-with(.,"Remove")]';
const NEW_QUANTITY_PARTIAL = './/table[@id="ratePlanChargeTable"]/tbody/tr[@class="odd"][1]/td[6]';
const QTY_FLYOUT_BUTTON = './/td[.="5"]/preceding-sibling::td[4]/table[@class="subColumns"]/tbody/tr[1]/td/div/div[@class="flyoutButton"]';
const QTY_PRODUCT_QTY = './/td[.="5"]/preceding-sibling::td[4]/table[@class="subColumns"]/tbody/tr[1]/td/div/div[@class="flyout"]/ul/li[starts-with(.,"Update Qty")]';
const DECREASE_QUANTITY = './/*[@id="j_id0:j_id347:j_id348:j_id353:j_id354:j_id355:j_id357"]/table/tbody/tr/td[2]/div[2]';
const SAVE_BUTTON = './/input[@value="save"]';
const DONT_CHARGE_ETF_CHECKBOX = './/*[.="Don\'t Charge ETF"]/following-sibling::td/input';
const REASON_ETF_NOT_CHARGED_SELECT = './/*[.="Reason ETF Not Charged"]/following-sibling::td/select';


module.exports = {
  chooseCancellationType: async function(cancellationType){
    if (cancellationType === 'Full Cancellation') {
      await webDriverHelper.waitAndClick(FULL_CANCELLATION_OPTION);
    }else if (cancellationType === 'Partial Cancellation') {
      await webDriverHelper.waitAndClick(PARTIAL_CANCELLATION_OPTION);
    }
  },

  chooseCancellationAction: async function(cancellationAction){
    if(cancellationAction === 'Cancel & Refund'){
      await webDriverHelper.waitAndClick(CANCEL_REFUND_OPTION);
    } else if (cancellationAction === 'Cancel with ETF'){
      await webDriverHelper.waitAndClick(CANCEL_END_OF_INVOICE);
    }
  },

  getBillCycleDay: async function() {
    return  webDriverHelper.getElementText(BILL_CYCLE_DAY);
  },

  getSubscriptionStartDate: async function() {
    return webDriverHelper.getElementText(SUBSCRIPITION_START_DATE);
  },

  getAllNewQuantity: async function() {
    return webDriverHelper.getElementText(NEW_QUANTITIES);
  },

  completeCancellation: async function() {
    await webDriverHelper.waitAndClick(SUBMIT_BUTTON);
    await webDriverHelper.waitAndClick(CANCEL_AND_REFUND_BUTTON);
  },

  completeCancellationWithETF: async function(option) {
    await webDriverHelper.waitAndClick(SUBMIT_BUTTON);
    switch (option) {
      case 'Paid Later':
        await webDriverHelper.waitAndClick(DONT_CHARGE_ETF_CHECKBOX);
        await webDriverHelper.waitAndSelectByValue(REASON_ETF_NOT_CHARGED_SELECT, 'Outstanding Balance to be paid later');
        break;
      case 'ETF Waived':
        await webDriverHelper.waitAndClick(DONT_CHARGE_ETF_CHECKBOX);
        await webDriverHelper.waitAndSelectByValue(REASON_ETF_NOT_CHARGED_SELECT, 'Waived');
        break;
    }
    await webDriverHelper.waitAndClick(CONTINUE_TO_SUBMIT_BUTTON);
  },

  // clickCancelAndRefund: async function() {
  //   await webDriverHelper.waitAndClick(CANCEL_AND_REFUND_BUTTON);
  // },

  removeAProductForPartialCancellation: async function() {
    await webDriverHelper.waitAndScroll(FIRST_FLYOUT_BUTTON);
    await webDriverHelper.waitAndClick(FIRST_FLYOUT_BUTTON);
    await webDriverHelper.waitAndClick(REMOVE_PRODUCT_NAME);
  },

  updateQuantityForPartialCancellation: async function(){
    await webDriverHelper.waitAndScroll(QTY_FLYOUT_BUTTON);
    await webDriverHelper.waitAndClick(QTY_FLYOUT_BUTTON);
    await webDriverHelper.waitAndScroll(QTY_PRODUCT_QTY);
    await webDriverHelper.waitAndClick(QTY_PRODUCT_QTY);
    await webDriverHelper.waitAndClick(DECREASE_QUANTITY);
    await webDriverHelper.waitAndClick(SAVE_BUTTON);
  },

  getCancelledProductNewQuantity: async function(){
    await webDriverHelper.getElementText(NEW_QUANTITY_PARTIAL);
  }
};