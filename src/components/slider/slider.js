require('ion-rangeslider/js/ion.rangeSlider');
require('ion-rangeslider/css/ion.rangeSlider.min.css');

const $slider = $('.js-slider__input');
$slider.ionRangeSlider({
  type: 'double',
  min: 0,
  max: 15000,
  from: 5000,
  to: 10000,
  hide_min_max: true,
  hide_from_to: true,
});

$slider.on('change', function () {
  const $inp = $(this);
  const from = $inp.data('from');
  const to = $inp.data('to');
  this.parentNode.querySelector('.js-slider__value').innerHTML = `${from}₽ - ${to}₽`;
});
