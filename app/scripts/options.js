var token = document.getElementById('token');
var saveButton = document.getElementById('save');

chrome.storage.local.get('GitHubLangChartToken', function (data) {
  var saved_token = data && data.GitHubLangChartToken || null;
  if (saved_token) {
    token.value = saved_token;
  }
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

