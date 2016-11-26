"use strict";

const util = require('./util');
const LanguageModel = require('./LanguageModel');

const LanguageChart = function() {

  function _createCanvasWithRelationalElements() {
    let divWrapper = document.createElement('div');

    // show chartblock title
    let chartBlockTitle = document.createElement('h2');
    chartBlockTitle.className = 'f4 mb-2 text-normal';
    chartBlockTitle.innerHTML = 'Language chart';
    divWrapper.appendChild(chartBlockTitle);

    // create chart canvas
    let chartOuterDiv = document.createElement('div');
    chartOuterDiv.className = 'mb-5 border border-gray-dark rounded-1 py-2';
    let canvas = document.createElement('canvas');
    canvas.id = 'lang_chart';
    chartOuterDiv.appendChild(canvas);
    divWrapper.appendChild(chartOuterDiv);

    if (util.isAuthorPage()) {
      let target = document.querySelector('.js-contribution-graph');
      target.parentElement.insertBefore(divWrapper, target);
    }

    if (util.isOrganizationPage()) {

      let targets = document.querySelectorAll('.text-normal');
      let t = null;
      targets.forEach(function(el) {
        if (el.innerHTML === 'Top languages') {
          t = el.parentElement;
        }
      });
      t.parentNode.insertBefore(divWrapper, t);
    }

    return canvas;
  }

  return {
    displayChart : function(chartType, repos) {
      let model = new LanguageModel(repos);

      let canvas = _createCanvasWithRelationalElements();
      if (canvas) {
        new Chart(canvas, {
          type: chartType,
          data: {
            labels: model.languages,
            datasets: [
              {
                data: model.counts,
                backgroundColor: model.colors,
              }
            ]
          },
          animation: {
            animateScale: true
          },
          options: {
            responsive: true,
            onClick: function (event, legendItem) {
              if (legendItem && legendItem.length > 0) {
                let author = util.getTargetName();
                let clickedLabel = legendItem[0]._model.label.toLowerCase();

                let url = `https://github.com/${author}?utf8=%E2%9C%93&tab=repositories`;
                if (clickedLabel !== 'others') {
                  url += `&q=&type=&language=${clickedLabel}`;
                }
                window.location.href = url;
              }
            }
          }
        });
      }
    }
  };
}();

module.exports = LanguageChart;
