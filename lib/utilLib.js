'use strict';
const enums = require('../enum/const');


module.exports = {
  convertGerkinRowToArray: function (dataTable) {
    let result = [];
    dataTable.raw()[0].forEach(elem => result.push(elem));
    return result;
  },

  calculateDiscount: function (sourceCountry, amount, voucherType) {
    let discountedAmount;
    switch (voucherType) {
      case enums.Voucher.ONETIME_PERCENTAGE:
      case enums.Voucher.RECURRING_PERCENTAGE:
      case enums.Voucher.UNIVERSAL_PERCENTAGE:
        discountedAmount = amount / 10;
        break;
      case enums.Voucher.ONETIME_FIXED:
      case enums.Voucher.RECURRING_FIXED:
      case enums.Voucher.UNIVERSAL_FIXED:
        discountedAmount = 1;
        break;
      case "100-PERCENT":
        discountedAmount = 0;
        break;
    }
    if (sourceCountry.includes(enums.SourceCountry.CAN) || sourceCountry.includes(enums.SourceCountry.USA)) {
      if (discountedAmount !== 0) {
        discountedAmount = discountedAmount + 0.01;
      }
    }
    return discountedAmount.toFixed(2).toString();
  },

  calculateTotal: function (amount, discount) {
    let total =  parseFloat(amount) - parseFloat(discount);
    return total.toFixed(2);
  },

  // calculateFullAmount: function (sourceCountry, discount, subtotal, total) {
  //   let fullAmount;
  //   if (sourceCountry.includes(enums.SourceCountry.CAN) || sourceCountry.includes(enums.SourceCountry.USA)) {
  //     fullAmount = parseFloat(discount) + parseFloat(total);
  //   } else {
  //     fullAmount = parseFloat(discount) + parseFloat(subtotal);
  //   }
  //   return fullAmount;
  // },

  getRatePlanPaymentTypeByRatePlan: function (ratePlanType) {
    let ratePlanPaymentType = enums.RatePlanPaymentType.RECURRING;
    if (ratePlanType.includes(enums.RatePlanPaymentType.ONETIME)) {
      ratePlanPaymentType = enums.RatePlanPaymentType.ONETIME;
    } else if (ratePlanType.includes(enums.RatePlanPaymentType.RECURRING)) {
      ratePlanPaymentType = enums.RatePlanPaymentType.RECURRING;
    } else if (ratePlanPaymentType.includes(enums.RatePlanPaymentType.BYO)) {
      ratePlanPaymentType = enums.RatePlanPaymentType.BYO;
    }
    return ratePlanPaymentType;
  },

  removeCurrency: function (amount) {
    let amnt = amount.split("(");
    return amnt[0].replace(/EUR | EUR|GBP | GBP/ , '').trim();
  }
};



