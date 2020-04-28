require('slick-carousel/slick/slick.min.js');
require('slick-carousel/slick/slick.css');


$('.js-card__slider').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true,
  prevArrow: '<div class="card__slider-button card__slider-button--prev"><svg class="card__slider-arrow card__slider-arrow--prev"><use xlink:href="#expansion"></use></svg></div>',
  nextArrow: '<div class="card__slider-button card__slider-button--next"><svg class="card__slider-arrow card__slider-arrow--next"><use xlink:href="#expansion"></use></svg></div>',
});