require('paginationjs/dist/pagination.js');
require('slick-carousel/slick/slick.min.js');
require('slick-carousel/slick/slick.css');

let template = require('../card/cardTemplate.pug');

const VARS = {
  PAGE_SIZE: 12,
};

const page = [
{pics: './assets/img/card1.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '888', kind: 'люкс', price: 9990, reviewsCount: 145, countOfStars: 5},
{pics: './assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '840', kind: '', price: 9990, reviewsCount: 65, countOfStars: 4},
{pics: './assets/img/card3.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '980', kind: 'люкс', price: 8500, reviewsCount: 35, countOfStars:3},
{pics: './assets/img/card4.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '856', kind: '', price: 7300, reviewsCount: 19, countOfStars: 5},
{pics: './assets/img/card5.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '740', kind: '', price: 6000, reviewsCount: 44, countOfStars: 4},
{pics: './assets/img/card6.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '982', kind: '', price: 5800, reviewsCount: 56, countOfStars: 3},
{pics: './assets/img/card7.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '678', kind: '', price: 5500, reviewsCount: 45, countOfStars: 5},
{pics: './assets/img/card8.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '450', kind: '', price: 5300, reviewsCount: 39, countOfStars: 4},
{pics: './assets/img/card9.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '350', kind: '', price: 5000, reviewsCount: 77, countOfStars: 3},
{pics: './assets/img/card10.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '666', kind: '', price: 5000, reviewsCount: 25, countOfStars: 5},
{pics: './assets/img/card11.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '444', kind: '', price: 5000, reviewsCount: 15, countOfStars: 3},
{pics: './assets/img/card12.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg;./assets/img/card2.jpg', number: '352', kind: '', price: 5000, reviewsCount: 55, countOfStars: 3},
]

function simpleTemplating(data) {
  let html = '<ul class="paginator__data-list">';
  $.each(data, (index, item) => {
    html += template(page[item % 12]);
  });
  html += '</ul>';
  return html;
}

function getPaginatorMessage(currentPage, totalPage, totalNumber) {
  const total = totalNumber > 100 ? '100+' : totalNumber;
  const current = `${VARS.PAGE_SIZE * (currentPage - 1) + 1} - ${Math.min(VARS.PAGE_SIZE * currentPage, totalNumber)}`;
  return `${current} из ${total} вариантов аренды`;
}

$('.paginator__pagination').pagination({
  inlineStyle: false,
  ulClassName: 'paginator__pagination-list',
  prevText: '<svg class="icon paginator__button paginator__button-prev"><use xlink:href="#arrow-right"></use></svg>',
  nextText: '<svg class="icon paginator__button"><use xlink:href="#arrow-right"></use></svg>',
  pageRange: 1,
  dataSource: [...Array(170).keys()],
  pageSize: VARS.PAGE_SIZE,
  showNavigator: true,
  formatNavigator: getPaginatorMessage,
  position: 'top',
  callback(data, pagination) {
    const html = simpleTemplating(data);
    $('.paginator__data').html(html);
  },
  afterPaging() {
    $('.js-card__slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      prevArrow: '<div class="card__slider-button card__slider-button--prev"><svg class="card__slider-arrow card__slider-arrow--prev"><use xlink:href="#expansion"></use></svg></div>',
      nextArrow: '<div class="card__slider-button card__slider-button--next"><svg class="card__slider-arrow card__slider-arrow--next"><use xlink:href="#expansion"></use></svg></div>',
    });
  }
});
