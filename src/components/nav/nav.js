import toggleClass from '../common/_functions.js'

(function () {
  $('.js-nav__container').on('click.nav', e => toggleClass(e, 'nav__container--opened'))
}());