const util = function() {

  const authorNameSelector = document.querySelector('.vcard-username');
  const organizationSelector = document.querySelector('.org-name');

  return {
    isChartTargetPage : function() {
      return /^https:\/\/github.com\/[a-zA-Z0-9\-]+$/.test(window.location.href);
    },
    isAuthorPage : function() {
      return this.isChartTargetPage() && authorNameSelector !== null;
    },
    isOrganizationPage : function() {
      return this.isChartTargetPage() && organizationSelector !== null;
    },
    getTargetName : function() {
      return window.location.pathname.replace(/\//g,'')
    },
  };
}();

module.exports = util;
