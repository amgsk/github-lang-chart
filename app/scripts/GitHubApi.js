module.exports = function() {

  var _request = function(path, token, data){
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();

      req.open('GET', `https://api.github.com${path}`, true);
      req.setRequestHeader('Accept','application/vnd.github.v3.raw+json');
      req.setRequestHeader('Content-Type','application/json;charset=UTF-8');
      req.setRequestHeader('User-Agent', 'github-lang-chart');

      if (token) {
        req.setRequestHeader('Authorization', `token ${token}`);
      }

      req.onreadystatechange = function() {
        if( this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(this.responseText));
        }
      }
      req.onerror = function () {
        reject(new Error(req.statusText));
      };
      req.send();
    });
  };

  return {
    getAuthorRepositories: function(token ,author) {

      var getRepository = function (token, author, page) {
        var url = `/users/${author}/repos?page=${page}&per_page=100`;
        return _request(url, token, null);
      };

      var getRepositories = function(token, info) {

        if (info['public_repos'] === 0) {
          return Promise().resolve([]);
        }

        function recordValue(results, value) {
          var results = Array.prototype.concat.apply(results, value);
          return results;
        }
        var pushValue = recordValue.bind(null, []);

        var requests = [];
        var require_request_count = Math.ceil(info['public_repos'] / 100);
        for (var i = 0; i < require_request_count; i++) {
          requests.push(getRepository(token, info["login"], i+1).then(pushValue));
        }
        return Promise.all(requests);
      };

      return _request(`/users/${author}`, token).then(function(data) {
        return getRepositories(token ,data);
      });
    },
  };
}();

