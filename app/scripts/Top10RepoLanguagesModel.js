'use strict';

const GitHubApi = require('./GitHubApi');
const Colors = require('./colors');

const Top10RepoLanguagesModel = function(repoLangs) {

  const init = function(repoLangs) {

    let top10RepoUniqLangs = [];
    repoLangs.forEach((repoLang) => {

      Object.keys(repoLang).forEach((language) => {
        if (top10RepoUniqLangs.indexOf(language) < 0) {
          top10RepoUniqLangs.push(language);
        }
      });
    });

    let datasets = [];
    top10RepoUniqLangs.forEach((name) => {
      let langCounts = [];
      repoLangs.forEach((lang) => {
        langCounts.push(lang[name] !== undefined ? lang[name] : 0);
      });
      datasets.push({
        label: name,
        borderWidth: 1,
        data : langCounts,
        backgroundColor: Colors.getColor(name)
      });
    });

    return datasets;
  };
  return init.call(this, repoLangs);
};

module.exports = Top10RepoLanguagesModel;
