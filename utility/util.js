'use strict';
let linkify = true;
module.exports = {
  /**
   * Get current date and time dd/mm/yyy 00:00:00
   */
  getCurrentTimeStamp: function () {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds= today.getSeconds();

    if (hours < 10){
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    let todayDateStamp = this.getTodayDateStamp();
    return todayDateStamp+hours.toString()+minutes.toString()+seconds.toString();
  },

  getTodayDateStamp: function(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd.toString()+mm.toString()+yyyy.toString();
  },

  createWMISNumber: function() {
    return '1' + new Date().getTime().toString().substr(0,9);
  },

  createMobileNumber: function () {
    return "+4475" + new Date().getTime().toString().substr(0,8);
  },

  /**
   * Return the post element identifier string for formatted text based on linkify (on/off)
   * @returns {string}
   */
  getLightningFormatedText: function () {
    let postFix = '';
    if (linkify === true) {
      postFix = '/slot/slot/lightning-formatted-text';
    } else {
      postFix = '/span';
    }
    return postFix;
  },

  /**
   * Return the post element identifier string for formatted number based on linkify (on/off)
   * @returns {string}
   */
  getLightningFormatedNumber: function () {
    let postFix = '';
    if (linkify === true) {
      postFix = '/slot/slot/lightning-formatted-number';
    } else {
      postFix = '/span';
    }
    return postFix;
  },

  /**
   * Return the post element identifier string for formatted link based on linkify (on/off)
   * @returns {string}
   */
  getLightningForceHoverableLink: function () {
    let postFix = '';
    if (linkify === true) {
      postFix = '/slot/slot/force-lookup/div/force-hoverable-link/div/a';
    } else {
      postFix = '/a';
    }
    return postFix;
  },

  /**
   * Return the post element identifier string for formatted link based on linkify (on/off)
   * @returns {string}
   */
  getLightningForceRecordType: function () {
    let postFix = '';
    if (linkify === true) {
      postFix = '/slot/slot/force-record-type/div/div/span';
    } else {
      postFix = '/div/div';
    }
    return postFix;
  }
};
