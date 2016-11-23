'use strict';

var Storage = function() {
  return {
    get : (keys) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(keys, (items) => {
          var error = chrome.runtime.lastError;
          error ? reject(error) : resolve(items);
        });
      });
    },
    set : (items) => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.set(items, () => {
          var error = chrome.runtime.lastError;
          error ? reject(error) : resolve();
        });
      });
    },
  };
}();
module.exports = Storage;
