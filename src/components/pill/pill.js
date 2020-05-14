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
