module.exports = function() {

  const _request = function(path, token, data){
    return new Promise(function (resolve, reject) {
      let req = new XMLHttpRequest();

      req.open('GET', `https://api.github.com${path}`, true);
      req.setRequestHeader('Accept','application/vnd.github.v3.raw+json');
      req.setRequestHeader('Content-Type','application/json;charset=UTF-8');

      if (token) {
        req.setRequestHeader('Authorization', `token ${token}`);
      }

      req.onreadystatechange = function() {
        if( this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(this.responseText));
        }
      };
      req.onerror = function () {
        reject(new Error(req.statusText));
      };
      req.send(data);
    });
  };

  return {
    getAuthorRepositories: function(token ,author) {

      const getRepository = function (token, author, page) {
        let url = `/users/${author}/repos?page=${page}&per_page=100`;
        return _request(url, token, null);
      };

      const getRepositories = function(token, info) {

        if (info['public_repos'] === 0) {
          return Promise().resolve([]);
        }

        function recordValue(results, value) {
          return Array.prototype.concat.apply(results, value);
        }
        const pushValue = recordValue.bind(null, []);

        let requests = [];
        let require_request_count = Math.ceil(info['public_repos'] / 100);
        for (let i = 0; i < require_request_count; i++) {
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

