var Language = require('./language');
var _ = require('lodash');
var Colors = require('./colors');

var LanguageModel = function(repos) {

  var init = function(repos) {

    var languagesArray = [];
    repos.forEach(function(repo) {
      languagesArray.push(new Language(repo.language, 0, null));
    });

    // unique with count languages
    var uniqueLanguages = _.uniqBy(languagesArray, 'language');
    var countByLanguages = _.countBy(languagesArray, 'language');
    uniqueLanguages.forEach(function(ul) {
      ul.count = countByLanguages[ul.language];
      ul.color = Colors.getColor(ul.language);
    });

    // sort languages # count desc↓↓
    var sortedUniqueLanguages = _.sortBy(uniqueLanguages, 'count').reverse();

    return {
      'languages' : _.map(sortedUniqueLanguages, 'language'),
      'counts'    : this.counts = _.map(sortedUniqueLanguages, 'count'),
      'colors'    : this.colors = _.map(sortedUniqueLanguages, 'color'),
    };
  };
  return init.call(this, repos);
};

module.exports = LanguageModel;
