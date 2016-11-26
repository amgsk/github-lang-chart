"use strict";

const util = require('./util');
const LanguageModel = require('./LanguageModel');
const ChartCanvas = require('./ChartCanvas');

const LanguageChart = function() {

  return {
    displayChart : function(chartType, repos) {
      let model = new LanguageModel(repos);

      let canvas = ChartCanvas.create('Language chart');
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
