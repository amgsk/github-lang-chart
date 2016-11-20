var token = document.getElementById('token');
var saveButton = document.getElementById('save');

saveButton.addEventListener('click', function() {
  chrome.storage.local.set({
    githubToken: token.value
  }, function() {
    var flush = document.createElement('div');
    flush.innerHTML = 'Success.';

    token.parentElement.appendChild(flush);

    setTimeout(function() {
      flush.remove();
    }, 1000);
  });
});

