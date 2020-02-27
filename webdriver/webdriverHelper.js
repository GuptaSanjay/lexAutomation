// 'use strict';
// module.exports = {
//   /**
//    * Get the text of an Element
//    * @param selector
//    * @returns text
//    */
//   getElementText: async function (selector) {
//     return driver.waitForExist(selector, 10000).pause(1000).then(function () {
//       return driver.getText(selector).then(function (text) {
//         return text;
//       });
//     });
//   },
//
//   // /**
//   //  * Get the text of an Element
//   //  * @param selector
//   //  * @returns text
//   //  */
//   // getTextSelec: async function (selector) {
//   //   await driver.waitForVisible(selector, LONG_DELAY_MILLISECOND);
//   //   await driver.waitForEnabled(selector, SHORT_DELAY_MILLISECOND);
//   //   await driver.scroll(selector);
//   //   await driver.click(selector);
//   //   await driver.getText(selector);
//   // },
//
//
//   /**
//    * Get the href link from an element
//    * @param selector
//    * @returns {String|String[]|*|string}
//    */
//   getLink: function (selector) {
//     return driver.getAttribute(selector, 'href');
//   },
//
//   refreshPage: async function () {
//     await driver.refresh();
//   },
//
//   longDelayAndRefresh: async function () {
//     try {
//       await driver.pause(10000);
//       await driver.refresh();
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   shortWait: async function () {
//     try {
//       await driver.pause(SHORT_DELAY_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   mediumWait: async function () {
//     try {
//       await driver.pause(MID_DELAY_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   longWait: async function () {
//     try {
//       await driver.pause(LONG_DELAY_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   waitAndScroll: async function (selector) {
//     try {
//       await driver.waitForVisible(selector, LONG_DELAY_MILLISECOND);
//       await driver.waitForEnabled(selector, SHORT_DELAY_MILLISECOND);
//       await driver.scroll(selector);
//       await driver.pause(DELAY_500_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   waitAndClick: async function (selector) {
//     try {
//       await driver.waitForVisible(selector, EXTRA_LONG_DELAY_MILLISECOND);
//       await driver.waitForVisible(selector, EXTRA_LONG_DELAY_MILLISECOND);
//       await driver.waitForEnabled(selector, LONG_DELAY_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//     await driver.click(selector);
//     await driver.pause(DELAY_500_MILLISECOND);
//   },
//
//   waitScrollClick: async function (selector) {
//     try {
//       await driver.waitForVisible(selector, LONG_DELAY_MILLISECOND);
//       await driver.waitForEnabled(selector, SHORT_DELAY_MILLISECOND);
//       await driver.scroll(selector);
//       await driver.click(selector);
//       await driver.pause(DELAY_500_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   waitAndSetValue: async function (selector, value) {
//     try {
//       await driver.waitForEnabled(selector, MID_DELAY_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//     await driver.setValue(selector, value);
//   },
//
//   getIframeName: async function () {
//     let iframeSelector = './/*[starts-with(@name, "vfFrameId")]';
//     await driver.waitForVisible(iframeSelector, EXTRA_LONG_DELAY_MILLISECOND);
//     await driver.waitForEnabled(iframeSelector, SHORT_DELAY_MILLISECOND);
//     let frameName = await driver.getAttribute(iframeSelector, 'name');
//     return frameName;
//   },
//
//   switchToFirstIframe: async function () {
//     let iframe;
//     let iframeName = await this.getIframeName();
//     iframe = iframeName[iframeName.length - 2];
//     await this.switchToIframeByNameOrId(iframe);
//     iframe = iframeName[iframeName.length - 1];
//     return this.switchToIframeByNameOrId(iframe);
//   },
//
//   switchToIframe: async function () {
//     let iframe;
//     let iframeName = await this.getIframeName();
//     if (Array.isArray(iframeName)) {
//       iframe = iframeName[iframeName.length - 1];
//     } else {
//       iframe = iframeName;
//     }
//     return this.switchToIframeByNameOrId(iframe);
//   },
//
//   waitForIFrame: async function () {
//     let iframeSelector = './/*[starts-with(@name, "vfFrameId")]';
//     await driver.waitForVisible(iframeSelector, EXTRA_LONG_DELAY_MILLISECOND);
//     await driver.waitForEnabled(iframeSelector, SHORT_DELAY_MILLISECOND);
//   },
//
//   switchToIframeByNameOrId: async function (iframe) {
//     try {
//       await driver.frame(iframe);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//   },
//
//   waitAndSelectByValue: async function (selector, value) {
//     try {
//       await driver.waitForVisible(selector, LONG_DELAY_MILLISECOND);
//       await driver.waitForEnabled(selector, MID_DELAY_MILLISECOND);
//       await driver.pause(DELAY_500_MILLISECOND);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//     driver.selectByValue(selector, value);
//   },
//
//   getElementsCount: async function (selector) {
//     return driver.elements(selector).then(function (res) {
//       return res.value.length;
//     });
//   },
//
//   getElementAttribute: async function (selector, attributeName) {
//     let attribute;
//     try {
//       await driver.waitForVisible(selector, LONG_DELAY_MILLISECOND);
//       await driver.waitForEnabled(selector, SHORT_DELAY_MILLISECOND);
//       attribute = driver.getAttribute(selector, attributeName);
//     } catch (err) {
//       log.error(err.message);
//       throw err;
//     }
//     return attribute;
//   },
//
//   waitForPageLoad: async function () {
//     let currentUrl;
//     await driver.getUrl().then(function (url) {
//         currentUrl = url;
//       }
//     ).then(async function () {
//         await driver.waitUntil(async function () {
//           return driver.getUrl().then(function (url) {
//             return url !== currentUrl;
//           });
//         }, 40000);
//       }
//     )
//   },
//
//   navigateBack: function () {
//     return driver.back();
//   },
//
//   scrollToTop: async function(){
//     await driver.scroll(0,0);
//   }
// };