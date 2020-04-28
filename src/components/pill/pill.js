const pill = $('.js-pill');
let checkIn = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
let checkOut = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

function changeDate(type, date) {
  switch (type.toLowerCase()) {
    case 'прибытие':
      checkIn = date;
      break;
    case 'выезд':
      checkOut = date;
      break;
    default:
      throw Error('wrong datepicker title');
  }
}

function changeCost(formattedDate, date, inst) {
  const type = inst.$el.parent().parent()[0].querySelector('h3').textContent;
  changeDate(type, date);
  const newDays = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (newDays > -1) {
    const price = parseInt($('.js-pill__room-price', pill)[0].dataset.price, 10);
    $('.js-pill__cost-text', pill)[0].textContent = `${price.toLocaleString().replace(/,/g, ' ')}₽ x ${newDays} суток`;
    $('.js-pill__cost-cost', pill)[0].textContent = `${(price * newDays).toLocaleString().replace(/,/g, ' ')}₽`;
    let finalCost = 0;
    $('[class$=-cost]:not(.js-pill__summary-cost)', pill).each((i, element) => {
      finalCost += parseInt(element.textContent.replace('₽', '').replace(' ', ''), 10);
    });
    $('.js-pill__summary-cost', pill)[0].textContent = `${finalCost.toLocaleString().replace(/,/g, ' ')}₽`;
  } else {
    throw new Error('wrong dates');
  }
}

function setDate(index, element) {
  $(element).datepicker({
    onSelect: changeCost,
  }).data('datepicker').selectDate(new Date(element.dataset.date));
}

$('.js-datepicker-input', pill).each(setDate);
