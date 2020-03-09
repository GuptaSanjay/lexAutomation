'use strict';
const enums = require('./const');
const { assert } = require('chai');

module.exports = {
  contains: function (actual, expected, message) {
    if(Array.isArray(actual)){
      assert.includeMembers(expected, actual, message);
    } else {
      assert.include(expected, actual, message);
    }

  },

  isEqual: function(actual, expected, message) {
    assert.equal(expected, actual, message);
  },

  isNotEqual: function(actual, expected, message) {
    assert.notEqual(expected, actual, message);
  },

  isPopulated: function(actual, message){
    if (Array.isArray(actual)) {
      assert.isNotEmpty(actual, message);
    }
    assert.isNotNull(actual, message);
  },

  isTrue: function(actual, message){
    assert.isTrue(actual, message);
  },

  increased: function(actual, expected, message) {
    assert.isAbove( actual, expected, message);
  },

  decreased: function(actual, expected, message) {
    assert.isBelow(actual, expected, message);
  },

  validate: function (field, condition, expected, actual) {
    switch (condition) {
      case enums.Assertion.IS_EQUAL:
        this.isEqual(actual, expected, field);
        break;
      case enums.Assertion.IS_NOT_EQUAL:
        this.isNotEqual(actual, expected, field);
        break;
      case enums.Assertion.VALIDATE:
        this.isEqual(actual, expected, field);
        break;
      case enums.Assertion.IS_POPULATED:
        this.isPopulated(actual, field);
        break;
      case enums.Assertion.INCREASED:
        this.increased(parseInt(actual), parseInt(expected), field);
        break;
      case enums.Assertion.DECREASED:
        this.decreased(parseInt(actual), parseInt(expected), field);
        break;
      case enums.Assertion.CONTAINS:
        this.contains(actual, expected, field);
        break;
      case enums.Assertion.IS_TRUE:
        this.isTrue(expected);
        break;

    }
  }
};







