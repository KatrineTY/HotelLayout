$('.dropdown__input').each(function() {
  $(this).on('click', e => e.target.classList.toggle("dropdown__input_open"))
})

