'use strict';

const Language = require('./language');
const _ = require('lodash');
const Colors = require('./colors');

const LanguageModel = function(repos) {

  const init = function(repos) {

    let languagesArray = [];
    repos.forEach(function(repo) {
      languagesArray.push(new Language(repo.language, 0, null));
    });

    // unique with count languages
    let uniqueLanguages = _.uniqBy(languagesArray, 'language');
    let countByLanguages = _.countBy(languagesArray, 'language');
    uniqueLanguages.forEach(function(ul) {
      ul.count = countByLanguages[ul.language];
      ul.color = Colors.getColor(ul.language);
    });

    // sort languages # count desc↓↓
    let sortedUniqueLanguages = _.sortBy(uniqueLanguages, 'count').reverse();

    return {
      'languages' : _.map(sortedUniqueLanguages, 'language'),
      'counts'    : this.counts = _.map(sortedUniqueLanguages, 'count'),
      'colors'    : this.colors = _.map(sortedUniqueLanguages, 'color'),
    };
  };
  return init.call(this, repos);
};

module.exports = LanguageModel;
