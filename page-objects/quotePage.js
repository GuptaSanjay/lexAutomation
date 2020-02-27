'use strict';
const enums = require('../enum/const');
const scenarioSession = require('../scenarioSession/scenarioSessionData');
const webDriverHelper = require('../webdriver/webdriverHelper');
const taxProperties = require('../data/taxProperties');
const TAX = '.zqu__billingtax__c.displayedText';
const TOTAL = '.LIST_TOTAL.displayedText';

/**
 * Calculate tax from given total amount and tax divisor
 * @param totalAmount
 * @param divisor
 * @returns {String}
 */
function calculateTaxByDividor(totalAmount, divisor) {
  return (totalAmount / divisor).toFixed(1);
}

/**
 * Calculate tax from given total amount and tax multiplier
 * @param totalAmount
 * @param multiplier
 * @returns {number}
 */
function calculateTaxByMultiplier(totalAmount, multiplier) {
  let tax = totalAmount * multiplier / 100;
  return Number(tax);
}

/**
 * Returns list of expected tax calculated for UK based on total amount
 * @param totalAmount
 * @returns {Array}
 */
function calculateGBRTax(totalAmount) {
  let result = [];
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getUKTax1()));
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getUKTax2()));
  return result;
}

/**
 * Returns list of expected tax calculated for IRL based on total amount
 * @param totalAmount
 * @returns {Array}
 */
function calculateIRLTax(totalAmount) {
  let result = [];
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getIrelandTax1()));
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getIrelandTax2()));
  return result;
}

/**
 * Returns list of expected tax calculated for ITA based on total amount
 * @param totalAmount
 * @returns {Array}
 */
function calculateITATax(totalAmount) {
  let result = [];
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getItalyTax()));
  return result;
}

/**
 * Returns list of expected tax calculated for FRA based on total amount
 * @param totalAmount
 * @returns {Array}
 */
function calculateFRATax(totalAmount) {
  let result = [];
  result.push(calculateTaxByDividor(totalAmount, taxProperties.getFranceTax()));
  return result;
}

/**
 * Returns list of expected tax calculated for FRA based on total amount
 * @param totalAmount
 * @returns {Array}
 */
function calculateCANTax(totalAmount) {
  let result = [];
  let tax = calculateTaxByMultiplier(totalAmount, taxProperties.getCanadaTax());
  result.push((tax - 0.01).toFixed(2).toString());
  result.push(tax.toFixed(2).toString());
  result.push((tax + 0.01).toFixed(2).toString());
  return result;
}

/**
 * Returns list of expected tax calculated for USA based on total amount and city
 * @param totalAmount
 * @returns {Array}
 */
function calculateUSATax(totalAmount) {
  let result = [];
  let usaTax = '';
  let town = scenarioSession.getAddressTown();
  switch (town) {
    case "New York":
      usaTax = taxProperties.getUSATax1();
      break;
    case "Boston":
      usaTax = taxProperties.getUSATax2();
      break;
    case "Texas City":
      usaTax = taxProperties.getUSATax3();
      break;
  }
  let tax = calculateTaxByMultiplier(totalAmount, usaTax);
  result.push((tax - 0.01).toFixed(2).toString());
  result.push(tax.toFixed(2).toString());
  result.push((tax + 0.01).toFixed(2).toString());
  return result;

}

module.exports = {
  switchToIframe: async function () {
    await webDriverHelper.switchToIframe();
  },

  // /**
  //  * Validate if the tax has been calculated correctly
  //  * @returns {Promise<boolean>}
  //  */
  // isTaxCorrect: async function () {
  //   let sourceCountry = scenarioSession.getSourceCountry();
  //   let correctTaxCount = 0;
  //   let expectedTax = '';
  //
  //   if(sourceCountry === enums.SourceCountry.USA || sourceCountry === enums.SourceCountry.CAN){
  //     let totalList = await webDriverHelper.getElementText(TOTAL);
  //     let taxList = await webDriverHelper.getElementText(TAX);
  //     let actualTaxList = [];
  //     taxList.forEach(element => {
  //       actualTaxList.push(Number(element).toFixed(2).toString());
  //     });
  //
  //     for (let i = 0; i < totalList.length; i++)
  //     {
  //       switch (sourceCountry) {
  //         case enums.SourceCountry.USA:
  //           expectedTax = calculateUSATax(totalList[i]);
  //           break;
  //         case enums.SourceCountry.CAN:
  //           expectedTax = calculateCANTax(totalList[i]);
  //           break;
  //       }
  //       if(expectedTax.includes(actualTaxList[i])){
  //         correctTaxCount++;
  //       }
  //     }
  //     return correctTaxCount === totalList.length;
  //   } else {
  //     let total = await webDriverHelper.getElementText(TOTAL).then(function (total) {
  //       if(Array.isArray(total)){
  //         return total.filter(tot => tot !== "0.00")[0];
  //       }
  //       return total;
  //     });
  //     let actualTax = await webDriverHelper.getElementText(TAX).then(function (tax) {
  //       if(Array.isArray(tax)){
  //         return tax.filter(tx => tx !== "0.00")[0];
  //       }
  //       return tax;
  //     });
  //     switch (sourceCountry) {
  //       case enums.SourceCountry.GBR:
  //         expectedTax = calculateGBRTax(total);
  //         break;
  //       case enums.SourceCountry.IRL:
  //         expectedTax = calculateIRLTax(total);
  //         break;
  //       case enums.SourceCountry.ITA:
  //         expectedTax = calculateITATax(total);
  //         break;
  //       case enums.SourceCountry.FRA:
  //         expectedTax = calculateFRATax(total);
  //         break;
  //
  //     }
  //     return expectedTax.includes(actualTax);
  //   }
  // },

  /**
   * Return the list of rate plan total from quote page
   * @returns {Promise<void>}
   */
  getTotalList: async function () {
    let total = [];
    let totalList =  await webDriverHelper.getElementText(TOTAL);
    if(Array.isArray(totalList)){
      return totalList;
    }else {
      total[0] = totalList;
    }
    return total;
    },

  /**
   * Return the list of rate plan tax from quote page
   * @returns {Promise<void>}
   */
  getTaxList: async function () {
    let tax=[];
    let taxList = await webDriverHelper.getElementText(TAX);
    if(Array.isArray(taxList)){
       return taxList;
    } else {
      tax[0] = taxList;
    }
    return tax;
    },

  /**
   *
   * @param taxList
   * @returns {Promise<[]>}
   */
  createActualTaxList: async function (taxList) {
    let actualTaxList = [];
    let i = 0;
      taxList.forEach(t => {
        if (t !== '0.00') {
          actualTaxList[i] = parseFloat(t).toFixed(1);
          i++;
        }
      });
    return actualTaxList;
  },

  expectedTaxList: async function (totalList) {
    let sourceCountry = scenarioSession.getSourceCountry();
    let expectedTax = [];
    let j = 0;

    for (let i = 0; i <= totalList.length; i++) {
      let tax;
      if (totalList[i] === '0.00') {
        continue;
      }
      switch (sourceCountry) {
        case enums.SourceCountry.GBR:
          tax = calculateGBRTax(totalList[i]);
          tax.forEach(t => {
            expectedTax[j] = t;
            j++;
          });
          break;
        case enums.SourceCountry.IRL:
          tax = calculateIRLTax(totalList[i]);
          tax.forEach(t => {
            expectedTax[j] = t;
            j++;
          });
          break;
      }
    }
    return expectedTax;
  }

};
