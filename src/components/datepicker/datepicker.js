require('air-datepicker/dist/css/datepicker.min.css');
require('air-datepicker/dist/js/datepicker.min.js');


$('.js-datepicker__input').datepicker({
  inline: true,
  classes: '-ranged- js-datepicker',
  toggleSelected: false,
  range: true,
  navTitles: {
    days: 'MM yyyy',
  },
  prevHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
  nextHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
});

const longFormatter = new Intl.DateTimeFormat('ru', { month: '2-digit', year: 'numeric', day: '2-digit' });
const shortFormatter = new Intl.DateTimeFormat('ru', { month: 'short', day: 'numeric' });

$('.js-datepicker__input').each(function () {
  $(this).datepicker().data('datepicker').apply = function () {
    if (this.selectedDates.length === 0) {
      this.$el[0].parentNode.querySelector('.js-dropdown__input').value = '';
    } else {
      const datepickers = this.$el[0].parentNode.getElementsByClassName('js-dropdown__input');
      if (datepickers.length === 2) {
        datepickers[0].value = longFormatter.format(this.selectedDates[0]);
        datepickers[1].value = longFormatter.format(this.selectedDates[1]);
      } else {
        datepickers[0].value = `${shortFormatter.format(this.selectedDates[0]).replace('.', '')} - ${shortFormatter.format(this.selectedDates[1]).replace('.', '')}`;
      }
      Array.prototype.forEach.call(this.$el[0].parentNode.getElementsByClassName('js-dropdown'), (el) => {
        el.classList.remove('dropdown--opened');
      });
    }
  };
});

$('.js-datepicker').each(function () {
  $(this).append($('<div/>', { class: 'datepicker--buttons' }));
  const buttonsContainer = this.getElementsByClassName('datepicker--buttons')[0];
  $(buttonsContainer).append($('<button class="button js-button datepicker--button" data-action="clear">очистить</button>'));
  $(buttonsContainer).append($('<button class="button js-button button--purple datepicker--button" data-action="apply">применить</button>'));
});


if (sessionStorage.getItem('dates') && $('.js-datepicker-container').length > 0) {
  const dates = JSON.parse(sessionStorage.getItem('dates')).map((date) => new Date(date));
  const datepicker = $('.js-datepicker-container').find('.js-datepicker__input').datepicker().data('datepicker');
  dates.forEach((item) => {
    datepicker.selectDate(item);
  });
  $('.js-datepicker-container').find('.js-dropdown__input')[0].value = 
  `${shortFormatter.format(dates[0]).replace('.', '')} - ${shortFormatter.format(dates[1]).replace('.', '')}`;
  sessionStorage.removeItem('dates');
}