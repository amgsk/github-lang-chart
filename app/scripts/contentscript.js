'use strict';

const Storage = require('./Storage');
const GitHubApi = require('./GitHubApi');
const util = require('./util');
const LanguageChart = require('./LanguageChart');

function init () {

  Storage.get(['GitHubLangChartToken', 'GitHubLangChartType']).then(function(items) {

    let token = null;
    let chartType = null;

    if (items) {
      token = items.GitHubLangChartToken ? items.GitHubLangChartToken : null;
      chartType = items.GitHubLangChartType || 'doughnut';
    }

    GitHubApi.getAuthorRepositories(token, util.getTargetName())
      .then(function (repos) {
        let author_repositories = Array.prototype.concat.apply([], repos);
        LanguageChart.displayChart(chartType, author_repositories);
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
