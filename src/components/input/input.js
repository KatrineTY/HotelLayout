function fillStars(e) {
  e.preventDefault();
  if (e.target.nodeName === 'LABEL') {
    let prevElem = $(e.target).prev();
    let nextElem = $(e.target).next();
    const isChecked = !e.target.querySelector('.js-input-button__input').checked
      || (nextElem[0] && nextElem[0].querySelector('.js-input-button__input').checked);

    e.target.querySelector('.js-input-button__input').checked = isChecked;
    while (prevElem.length === 1) {
      prevElem[0].querySelector('.js-input-button__input').checked = isChecked;
      prevElem = prevElem.prev();
    }
    while (nextElem.length === 1) {
      nextElem[0].querySelector('.js-input-button__input').checked = false;
      nextElem = nextElem.next();
    }
  }
}

$('.js-input-button--star').on('click', fillStars);
