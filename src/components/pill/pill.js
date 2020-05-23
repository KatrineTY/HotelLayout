import changeValue from '../dropdown/dropdown';

const pill = $('.js-pill');

function changeCost(formattedDate, date, inst) {
  if (inst.selectedDates.length === 2) {
    const checkIn = inst.selectedDates[0];
    const checkOut = inst.selectedDates[1];
    const newDays = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const price = parseInt($('.js-pill__room-price', pill)[0].dataset.price, 10);
    $('.js-pill__cost-text', pill)[0].textContent = `${price.toLocaleString().replace(/,/g, ' ')}₽ x ${newDays} суток`;
    $('.js-pill__cost-cost', pill)[0].textContent = `${(price * newDays).toLocaleString().replace(/,/g, ' ')}₽`;
    let finalCost = 0;
    $('[class$=-cost]:not(.js-pill__summary-cost)', pill).each((i, element) => {
      finalCost += parseInt(element.textContent.replace('₽', '').replace(' ', ''), 10);
    });
    if ($('.js-pill__services-text')[0].textContent.includes('скидка')) {
      finalCost -= parseInt($('.js-pill__services-text')[0].textContent.match(/скидка .*₽/)[0]
        .replace('скидка ', '')
        .replace('₽', '')
        .replace(' ', ''), 10);
    }
    $('.js-pill__summary-cost', pill)[0].textContent = `${finalCost.toLocaleString().replace(/,/g, ' ')}₽`;
  }

}

function setDate(index, element) {
  $(element).datepicker({
    onSelect: changeCost,
  }).data('datepicker');
}

$('.js-datepicker__input', pill).each(setDate);

$(document).ready(() => {


  if (sessionStorage.getItem('number')) {
    $('.js-pill__room-number').text(sessionStorage.getItem('number'));
    sessionStorage.removeItem('number');
  }
  if (sessionStorage.getItem('kind')) {
    $('.js-pill__room-kind').text(sessionStorage.getItem('kind'));

    sessionStorage.removeItem('kind');
  } else {
    $('.js-pill__room-kind').text('');

  }
  if (sessionStorage.getItem('price')) {
    $('.js-pill__room-price').children()[0].innerText = `${sessionStorage.getItem('price')}₽ `;
    $('.js-pill__room-price')[0].dataset.price = sessionStorage.getItem('price').replace(' ', '');
    sessionStorage.removeItem('price');
  }

  if (sessionStorage.getItem('dates')) {
    const dates = JSON.parse(sessionStorage.getItem('dates')).map((date) => new Date(date));
    $('.js-datepicker-container--separated').find('.js-dropdown__input').each(function (index) {
      this.value = new Intl.DateTimeFormat('ru', { month: '2-digit', year: 'numeric', day: '2-digit' }).format(dates[index]);
    });
    const datepicker = $('.js-datepicker-container--separated').find('.js-datepicker__input').datepicker().data('datepicker');
    dates.forEach((item) => {
      datepicker.selectDate(item);
    });
    sessionStorage.removeItem('dates');
  } else {
    const dates = [new Date(), new Date()];
    $('.js-datepicker-container--separated').find('.js-dropdown__input').each(function (index) {
      this.value = new Intl.DateTimeFormat('ru', { month: '2-digit', year: 'numeric', day: '2-digit' }).format(dates[index]);
    });
    const datepicker = $('.js-datepicker-container--separated').find('.js-datepicker__input').datepicker().data('datepicker');
    dates.forEach((item) => {
      datepicker.selectDate(item);
    });
  }

})