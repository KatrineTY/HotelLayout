let pill = $('.js-pill');
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
  let newDays = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  if (newDays > -1) {
    let price = parseInt($('.js-pill__room-cost', pill)[0].dataset.price);
    $('.js-pill__cost-text', pill)[0].textContent = `${price.toLocaleString().replace(/,/g, ' ')}₽ x ${newDays} суток`;
    $('.js-pill__cost-cost', pill)[0].textContent = `${(price * newDays).toLocaleString().replace(/,/g, ' ')}₽`;
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
