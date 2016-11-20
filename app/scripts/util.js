var util = function() {

  var authorNameSelector = document.querySelector('.vcard-username');
  var organizationSelector = document.querySelector('.org-name');

  return {
    isChartTargetPage : function() {
      return /^https:\/\/github.com\/[a-zA-Z0-9\-]+$/.test(window.location.href);
    },
    isAuthorPage : function() {
      return this.isTargetPage() && authorNameSelector !== null;
    },
    isOrganizationPage : function() {
      return this.isTargetPage() && organizationSelector !== null;
    },
    getTargetName : function() {
      return window.location.pathname.replace(/\//g,'')
    },
  };
}();

module.exports = util;
