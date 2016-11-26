"use strict";

const util = require('./util');
const GitHubApi = require('./GitHubApi');
const ChartCanvas = require('./ChartCanvas');
const Top10ChartModel = require('./Top10ChartModel');

const Top10Chart = function() {

  return {
    displayChart : (token, author, repos) => {

      let sortedRepositoriesByStars = _.sortBy(repos, 'stargazers_count').reverse();
      let top10Repositories = sortedRepositoriesByStars.slice(0, 10);
      let request_urls = _.map(top10Repositories, 'languages_url');

      GitHubApi.getAuthorRepoLanguages(token, request_urls).then(function(repoLangs) {
        let datasets = new Top10ChartModel(repoLangs);

        let data = {
          labels: _.map(top10Repositories, 'name'),
          datasets: datasets,
        };

        new Chart(ChartCanvas.create('Language Rate in Repository. It Shows the Top 10 repositories of star counts.'), {
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
      });

    }
  };
}();

module.exports = Top10Chart;
