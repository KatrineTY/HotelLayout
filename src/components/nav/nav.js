import toggleClass from '../common/_functions.js'

(function () {
  $('.js-nav__container').on('click.nav', e => toggleClass(e.delegateTarget, 'nav__container--opened'));
}());

(function () {
  $('.js-nav-toggle').on('click.nav', e => {
    toggleClass(e.delegateTarget, 'nav-toggle--opened')
    toggleClass(e.delegateTarget.parentNode.getElementsByClassName("js-nav__links")[0], 'nav__links--opened')
  })
}());