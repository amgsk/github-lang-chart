"use strict";

const _ = require('lodash');
const ChartCanvas = require('./ChartCanvas');

const Top10RepoChart = function() {

  return {
    displayChart : (repositories) => {

      let sortedRepositoriesByStars = _.sortBy(repositories, 'stargazers_count').reverse();
      let top10Repositories = sortedRepositoriesByStars.slice(0, 10);

      let data = {
        labels: _.map(top10Repositories, 'name'),
        datasets: [
          {
            label: 'Star Counts',
            data: _.map(top10Repositories, 'stargazers_count'),
          },
          {
            label: 'Fork Counts',
            data: _.map(top10Repositories, 'forks_count'),
          }
        ]
      };

      new Chart(ChartCanvas.create('Top 10 Stars.'), {
        type: 'bar',
        data: data,
        options: {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      });

    }
  };
}();

module.exports = Top10RepoChart;
