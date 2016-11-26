var token = document.getElementById('token');
var chartType = document.getElementById('type');
var saveButton = document.getElementById('save');

chrome.storage.local.get(['GitHubLangChartToken', 'GitHubLangChartType'], function (data) {

  // display saved token.
  token.value = data.GitHubLangChartToken || '';

  // display saved chart type.
  // The default value is doughnut.
  chartType.value = data.GitHubLangChartType || 'doughnut';
});

saveButton.addEventListener('click', function() {
  chrome.storage.local.set({
    GitHubLangChartToken: token.value,
    GitHubLangChartType : chartType.value
  }, function() {
    var flush = document.createElement('div');
    flush.innerHTML = 'Saved.';

    chartType.parentElement.appendChild(flush);

    setTimeout(function() {
      flush.remove();
    }, 1000);
  });
});

