'use strict';

const Storage = require('./Storage');
const GitHubApi = require('./GitHubApi');
const util = require('./util');
const LanguageChart = require('./LanguageChart');
const Top10Chart = require('./Top10Chart');

function init () {

  Storage.get(['GitHubLangChartToken', 'GitHubLangChartType', 'GitHubLangChartShowTop10']).then(function(items) {

    let token = null;
    let chartType = null;
    let isShowTop10Chart = false;

    if (items) {
      token = items['GitHubLangChartToken'] ? items['GitHubLangChartToken'] : null;
      chartType = items['GitHubLangChartType'] || 'doughnut';
      isShowTop10Chart = items['GitHubLangChartShowTop10'] || false;
    }

    GitHubApi.getAuthorRepositories(token, util.getTargetName())
      .then(function (repos) {
        let author_repositories = Array.prototype.concat.apply([], repos);

        // Show Language Count Chart
        LanguageChart.displayChart(chartType, author_repositories);

        // TODO: Experimental
        // It requires multiple requests and takes time to process.
        if (isShowTop10Chart) {
          // Show Top10 Chart
          Top10Chart.displayChart(token, util.getTargetName(), author_repositories);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
}

// chart display target page is author or organization
if (util.isChartTargetPage()) {
  init();
}
