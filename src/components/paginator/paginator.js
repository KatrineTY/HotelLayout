require('paginationjs/dist/pagination.js');

const VARS = {
  PAGE_SIZE: 12,
};

function simpleTemplating(data) {
  let html = '<ul class="paginator__data-list">';
  $.each(data, (index, item) => {
    html += `<li>${item}</li>`;
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
  dataSource: [...Array(105).keys()].splice(1),
  pageSize: VARS.PAGE_SIZE,
  showNavigator: true,
  formatNavigator: getPaginatorMessage,
  position: 'top',
  callback(data, pagination) {
    const html = simpleTemplating(data);
    $('.paginator__data').html(html);
  },
});
