$('.dropdown__input').each(function () {
  $(this).on('click', e => e.target.classList.toggle("dropdown__input--opened"))
})

function changeValue(dropdown) {
  var type = $(dropdown).data('type');
  var finalValue;

  switch (type) {
    case 'appartament':
      finalValue = getAppartamentsValue(dropdown);
      break;
    case 'guests':
      finalValue = getGuestsValue(dropdown);
      break;
  }

  dropdown.getElementsByClassName('dropdown__input')[0].value = finalValue;

  if ($('.input-number input', dropdown).toArray().every(function (elem) {
    return elem.value == 0;
  })) {
    setOriginMessage(dropdown);
  }
}

function clearValue(e) {
  var dropdownInner = e.target.parentNode.parentNode;
  // var dropdownInput = dropdown.getElementsByClassName('dropdown__input')[0];
  $('.input-number_left', dropdownInner).each(function () {
    this.classList.add("input-number_left_disabled");
  });
  $('input', dropdownInner).each(function () {
    this.value = 0;
  });
  e.target.classList.add('dropdown__button_disabled');
}

function getAppartamentsValue(dropdown) {
  var finalValue = '';
  $(dropdown.getElementsByClassName('dropdown__item')).each(function () {
    var count = this.getElementsByTagName('input')[0].value;
    if (count != 0) {
      var text = this.getElementsByTagName('h3')[0].innerText.toLowerCase();
      text = chooseEnd(text, count);
      finalValue += count + ' ' + text + ', ';
    }
  })
  finalValue = finalValue.trim();
  finalValue = finalValue.substring(0, finalValue.length - 1) + '...';

  var restricted_length;
  if(dropdown.classList.contains('dropdown_middle')){
    restricted_length = 29;
  } else {
    restricted_length = 39;
  }
  if (finalValue.length > restricted_length) {
    var split = finalValue.split(',');
    finalValue = split.slice(0, split.length - 1).join(",") + '...';
  }
  return finalValue;
}

function chooseEnd(text, count) {
  switch (text) {
    case 'спальни':
      if (count == 1) {
        return 'спальня';
      } else if (count < 5) {
        return 'спальни';
      } else {
        return 'спален';
      }
      break;
    case 'кровати':
      if (count == 1) {
        return 'кровать';
      } else if (count < 5) {
        return 'кровати';
      } else {
        return 'кроватей';
      }
      break;
    case 'ванные комнаты':
      if (count == 1) {
        return 'ванная';
      } else {
        return 'ванных';
      }
      break;
  }

}

function getGuestsValue(dropdown) {
  var finalValue = 0;
  $(dropdown.getElementsByClassName('dropdown__item')).each(function () {
    var count = this.getElementsByTagName('input')[0].value;
    finalValue += parseInt(count);
  });

  if (finalValue == 1) {
    return finalValue + ' гость';
  } else if (finalValue == 0 || finalValue > 4) {
    return finalValue + ' гостей';
  } else {
    return finalValue + ' гостя';
  }

}

function updateDisableButton(dropdown) {
  if ($('.input-number input', dropdown).toArray().every(function (elem) {
    return elem.value == 0;
  })) {
    dropdown.querySelector('.dropdown__button[data-action="clear"]').classList.add('dropdown__button_disabled');
  }
}

function setOriginMessage(dropdown) {
  dropdown.querySelector('.dropdown__input').value = dropdown.querySelector('.dropdown__input').getAttribute('value');  
}

$('.dropdown__button[data-action="apply"]').on('click', e => {
  changeValue(e.target.parentNode.parentNode.parentNode);
  e.target.parentNode.parentNode.parentNode.getElementsByClassName('dropdown__input')[0].classList.toggle("dropdown__input--opened");
})
$('.dropdown__button[data-action="clear"]').on('click', clearValue)

$(document).ready(function () {
  $('.input-number_left').each(function () {
    if (this.parentNode.querySelector('input[type=number]').value == 0) {
      $(this).addClass("input-number_left_disabled");
    }
  })
  $('.dropdown_extended').each(function () {
    updateDisableButton(this);
  })
});

$('.input-number_left').each(function () {
  $(this).on('click', function () {
    this.parentNode.querySelector('input[type=number]').stepDown()
    if (this.parentNode.querySelector('input[type=number]').value == 0) {
      $(this).addClass("input-number_left_disabled");
    }
    updateDisableButton(this.parentNode.parentNode.parentNode);
    if (!this.parentNode.parentNode.parentNode.parentNode.classList.contains('dropdown_extended')) {
      changeValue(this.parentNode.parentNode.parentNode.parentNode);
    }
  })
});

$('.input-number_right').each(function () {
  $(this).on('click', function () {
    this.parentNode.querySelector('input[type=number]').stepUp();
    $(this.parentNode.querySelector('.input-number_left')).removeClass("input-number_left_disabled");
    $(this.parentNode.parentNode.parentNode.querySelector('.dropdown__button[data-action="clear"]')).removeClass("dropdown__button_disabled");
    if (!this.parentNode.parentNode.parentNode.parentNode.classList.contains('dropdown_extended')) {
      changeValue(this.parentNode.parentNode.parentNode.parentNode);
    }
  })
});