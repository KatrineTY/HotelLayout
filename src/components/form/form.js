$('.js-button--form').on('click', () => {
  console.log($('.js-datepicker__input').datepicker().data('datepicker').selectedDates.length)
  if ($('.js-datepicker__input').datepicker().data('datepicker').selectedDates.length !== 0) {
    sessionStorage.setItem('dates',
      JSON.stringify($('.js-datepicker__input').datepicker().data('datepicker').selectedDates.map(d => d.toLocaleDateString())));
  }
  if ($('.dropdown[data-type="guests"]').length > 0) {
    sessionStorage.setItem('guests', JSON.stringify($('.dropdown[data-type="guests"]').find('.js-input-number__input').map((i,item) => item.value)));
  }
})


