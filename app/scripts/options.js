var token = document.getElementById('token');
var saveButton = document.getElementById('save');

chrome.storage.local.get('GitHubLangChartToken', function (data) {
  token.value = data.GitHubLangChartToken || '';
});

saveButton.addEventListener('click', function() {
  chrome.storage.local.set({
    GitHubLangChartToken: token.value
  }, function() {
    var flush = document.createElement('div');
    flush.innerHTML = 'Saved.';

    token.parentElement.appendChild(flush);

    setTimeout(function() {
      flush.remove();
    }, 1000);
  });
});

