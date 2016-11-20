var GithubApi = require('./GithubApi');
var util = require('./util');
var LanguageModel = require('./LanguageModel');

function displayChart(repos) {
  var model = new LanguageModel(repos);

  var canvas = createCanvasWithRelationalElements();
  if (canvas) {
    new Chart(canvas ,{
      type: 'doughnut',
      data: {
        labels: model.languages,
        datasets: [
          {
            data: model.counts,
            backgroundColor: model.colors,
          }
        ]
      },
      animation : {
        animateScale: true
      },
      options : {
        responsive: true,
      }
    });
  }
}

function createCanvasWithRelationalElements() {
  var divWrapper = document.createElement('div');

  // show chartblock title
  var chartBlockTitle = document.createElement('h2');
  chartBlockTitle.className = 'f4 mb-2 text-normal';
  chartBlockTitle.innerHTML = 'Language chart';
  divWrapper.appendChild(chartBlockTitle);

  // create chart canvas
  var chartOuterDiv = document.createElement('div');
  chartOuterDiv.className = 'mb-5 border border-gray-dark rounded-1 py-2';
  var canvas = document.createElement('canvas');
  canvas.id = 'lang_chart';
  chartOuterDiv.appendChild(canvas);
  divWrapper.appendChild(chartOuterDiv);


  if (util.isAuthorPage()) {
    var target = document.querySelector('.js-contribution-graph');
    target.parentElement.insertBefore(divWrapper, target);
  }

  if (util.isOrganizationPage()) {

    var targets = document.querySelectorAll('.text-normal');
    var t = null;
    targets.forEach(function(el) {
      if (el.innerHTML === 'Top languages') {
        t = el.parentElement;
      }
    });
    t.parentNode.insertBefore(divWrapper, t);
  }

  return canvas;
}

function init () {

  chrome.storage.local.get('githubToken', function (data) {

    var token = data && data.githubToken ? data.githubToken : null;

    GithubApi.getAuthorRepositories(token, util.getTargetName())
      .then(function (repos) {
        var author_repositories = Array.prototype.concat.apply([], repos);
        displayChart(author_repositories);
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
