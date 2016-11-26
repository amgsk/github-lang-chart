const token = document.getElementById('token');
const chartType = document.getElementById('type');
const showTop10 = document.getElementById('top10');
const saveButton = document.getElementById('save');

let storageKeys = ['GitHubLangChartToken', 'GitHubLangChartType', 'GitHubLangChartShowTop10'];

chrome.storage.local.get(storageKeys, (data) => {

  // display saved token.
  token.value = data['GitHubLangChartToken'] || '';

  // display saved chart type.
  // The default value is doughnut.
  chartType.value = data['GitHubLangChartType'] || 'doughnut';

  console.log(data['GitHubLangChartShowTop10']);
  showTop10.checked = data['GitHubLangChartShowTop10'] || false;
});

saveButton.addEventListener('click', () => {
  chrome.storage.local.set({
    GitHubLangChartToken     : token.value,
    GitHubLangChartType      : chartType.value,
    GitHubLangChartShowTop10 : showTop10.checked
  }, () => {
    let flush = document.createElement('div');
    flush.innerHTML = 'Saved.';
    showTop10.parentElement.appendChild(flush);
    setTimeout(() => { flush.remove(); }, 1000);
  });
});

