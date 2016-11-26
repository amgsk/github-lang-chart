'use strict';

var Storage = require('./Storage');
var GitHubApi = require('./GitHubApi');
var util = require('./util');
var LanguageChart = require('./LanguageChart');

function init () {

  Storage.get(['GitHubLangChartToken', 'GitHubLangChartType']).then(function(items) {

    var token = null;
    var chartType = null;

    if (items) {
      token = items.GitHubLangChartToken ? items.GitHubLangChartToken : null;
      chartType = items.GitHubLangChartType || 'doughnut';
    }

    GitHubApi.getAuthorRepositories(token, util.getTargetName())
      .then(function (repos) {
        var author_repositories = Array.prototype.concat.apply([], repos);
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
