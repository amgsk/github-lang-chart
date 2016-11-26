'use strict';

const util = require('./util');

const ChartCanvas = function() {
  return {
    create : (title) => {
      let divWrapper = document.createElement('div');

      // show chartblock title
      let chartBlockTitle = document.createElement('h2');
      chartBlockTitle.className = 'f4 mb-2 text-normal';
      chartBlockTitle.innerHTML = title;
      divWrapper.appendChild(chartBlockTitle);

      // create chart canvas
      let chartOuterDiv = document.createElement('div');
      chartOuterDiv.className = 'mb-5 border border-gray-dark rounded-1 py-2';
      let canvas = document.createElement('canvas');
      chartOuterDiv.appendChild(canvas);
      divWrapper.appendChild(chartOuterDiv);

      if (util.isAuthorPage()) {
        let target = document.querySelector('.js-contribution-graph');
        target.parentElement.insertBefore(divWrapper, target);
      }

      if (util.isOrganizationPage()) {

        let targets = document.querySelectorAll('.text-normal');
        let t = null;
        targets.forEach(function (el) {
          if (el.innerHTML === 'Top languages') {
            t = el.parentElement;
          }
        });
        t.parentNode.insertBefore(divWrapper, t);
      }

      return canvas;
    }
  };
}();
module.exports = ChartCanvas;
