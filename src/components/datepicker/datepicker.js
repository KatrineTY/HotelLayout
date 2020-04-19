import toggleClass from '../common/_functions';

require('air-datepicker/dist/css/datepicker.min.css');
require('air-datepicker/dist/js/datepicker.min.js');


$('.js-datepicker-input').datepicker({
  classes: 'js-datepicker',
  toggleSelected: false,
  navTitles: {
    days: 'MM yyyy',
  },
  prevHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
  nextHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
  onHide(inst) {
    toggleClass(inst.el.parentNode, 'dropdown--opened');
  },
  onShow(inst) {
    toggleClass(inst.el.parentNode, 'dropdown--opened');
  },
});


$('.js-datepicker-input').each(function () {
  $(this).datepicker().data('datepicker').apply = function () {
    this.$el.data('datepicker').hide();
  };
});


$('.js-datepicker-input--ranged').datepicker({
  classes: '-ranged- js-datepicker',
  range: true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'd M',
});

// TODO: change it...
// TODO: try to disconnect cells from input
$('.js-datepicker').each(function () {
  $(this).append($('<div/>', { class: 'datepicker--buttons' }));
  const buttonsContainer = this.getElementsByClassName('datepicker--buttons')[0];
  $(buttonsContainer).append($('<button class="button datepicker--button" data-action="clear">очистить</button>'));
  $(buttonsContainer).append($('<button class="button  button--purple datepicker--button" data-action="apply">применить</button>'));
});