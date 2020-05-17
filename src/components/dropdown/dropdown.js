import toggleClass from '../common/_functions';

function chooseEnd(text, count) {
  let result = '';
  switch (text) {
    case 'спальни':
      if (count === 1) {
        result = 'спальня';
      } else if (count < 5) {
        result = 'спальни';
      } else {
        result = 'спален';
      }
      break;
    case 'кровати':
      if (count == 1) {
        result = 'кровать';
      } else if (count < 5) {
        result = 'кровати';
      } else {
        result = 'кроватей';
      }
      break;
    case 'ванные комнаты':
      if (count == 1) {
        result = 'ванная';
      } else {
        result = 'ванных';
      }
      break;
    default:
      result = '';
  }
  return result;
}

function getAppartamentsValue(dropdown) {
  let finalValue = '';
  $(dropdown.getElementsByClassName('js-dropdown__item')).each(function () {
    const count = this.getElementsByClassName('js-input-number__input')[0].value;
    if (count != 0) {
      let text = this.getElementsByClassName('js-dropdown__title')[0].innerText.toLowerCase();
      text = chooseEnd(text, count);
      finalValue += `${count} ${text}, `;
    }
  });
  finalValue = finalValue.trim();
  finalValue = finalValue.substring(0, finalValue.length - 1);

  const restrictedLength = dropdown.classList.contains('dropdown--M') ? 29 : 39;


  if (finalValue.length > restrictedLength) {
    const split = finalValue.split(',');
    finalValue = `${split.slice(0, split.length - 1).join(',')}`;
  }
  return `${finalValue}...`;
}

function getGuestsValue(dropdown) {
  let finalValue = 0;
  $(dropdown.getElementsByClassName('js-dropdown__item')).each(function () {
    const count = this.getElementsByClassName('js-input-number__input')[0].value;
    finalValue += parseInt(count, 10);
  });

  let children = parseInt($(dropdown.getElementsByClassName('js-dropdown__item')).last()[0]
    .getElementsByClassName('js-input-number__input')[0].value, 10);
  finalValue -= children;

  let result = '';
  if (finalValue === 1) {
    result = `${finalValue} гость`;
  } else if (finalValue === 0 || finalValue > 4) {
    result = `${finalValue} гостей`;
  } else {
    result = `${finalValue} гостя`;
  }

  if (children === 1) {
    result += `, ${children} младенец`;
  } else if (finalValue > 1) {
    result = `, ${children} младенцев`;
  }


  return result;
}

function setOriginMessage(dropdown) {
  dropdown.querySelector('.js-dropdown__input').value = dropdown.querySelector('.js-dropdown__input').getAttribute('value');
}

function updateDisableButton(dropdown) {
  if ($('.js-input-number__input', dropdown).toArray().every((elem) => elem.value === '0')) {
    dropdown.querySelector('*[data-action="clear"]').classList.add('button--hidden');
  }
}

function changeValue(dropdown) {
  const type = $(dropdown).data('type');
  let finalValue;

  switch (type) {
    case 'appartament':
      finalValue = getAppartamentsValue(dropdown);
      break;
    case 'guests':
      finalValue = getGuestsValue(dropdown);
      break;
    default:
      finalValue = '';
  }
  dropdown.getElementsByClassName('js-dropdown__input')[0].value = finalValue;
  if ($('.js-input-number__input', dropdown).toArray().every((elem) => elem.value === '0')) {
    setOriginMessage(dropdown);
  }
}

function clearValue(e) {
  const dropdownInner = e.target.parentNode.parentNode;
  $('.js-input-number__button-decrease', dropdownInner).each(function () {
    this.classList.add('input-number__button--disabled');
  });
  $('.js-input-number__input', dropdownInner).each(function () {
    this.value = 0;
  });
  e.target.classList.add('button--hidden');
}

$('.js-dropdown__input').on('click', (e) => {
  $('.dropdown--opened').each((i, elem) => {
    if (elem !== e.target.parentNode) elem.classList.remove('dropdown--opened');
  })
  toggleClass(e.target.parentNode, 'dropdown--opened')
});

$(document).ready(() => {
  $('.js-input-number__button-decrease').each(function () {
    if (this.parentNode.querySelector('.js-input-number__input').value === '0') {
      $(this).addClass('input-number__button--disabled');
    }
  });
  $('.dropdown--extended').each(function () {
    $('*[data-action="clear"]', this).on('click', clearValue);
    $('*[data-action="apply"]', this).on('click', (e) => {
      changeValue(e.target.parentNode.parentNode.parentNode);
      e.target.parentNode.parentNode.parentNode.querySelector('.dropdown__input').parentNode.classList.toggle('dropdown--opened');
    });
    updateDisableButton(this);
  });
});

$('.js-input-number__button-decrease').on('click', function () {
  this.parentNode.querySelector('input[type=number]').stepDown();
  if (this.parentNode.querySelector('input[type=number]').value === '0') {
    $(this).addClass('input-number__button--disabled');
  }
  if (!this.parentNode.parentNode.parentNode.parentNode.classList.contains('dropdown--extended')) {
    changeValue(this.parentNode.parentNode.parentNode.parentNode);
  } else {
    updateDisableButton(this.parentNode.parentNode.parentNode);
  }
});

$('.js-input-number__button-increase').each(function () {
  $(this).on('click', function () {
    this.parentNode.querySelector('input[type=number]').stepUp();
    $(this.parentNode.querySelector('.js-input-number__button-decrease')).removeClass('input-number__button--disabled');
    $(this.parentNode.parentNode.parentNode.querySelector('*[data-action="clear"]')).removeClass('button--hidden');
    if (!this.parentNode.parentNode.parentNode.parentNode.classList.contains('dropdown--extended')) {
      changeValue(this.parentNode.parentNode.parentNode.parentNode);
    }
  });
});
