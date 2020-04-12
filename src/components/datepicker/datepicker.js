require("air-datepicker/dist/css/datepicker.min.css");
require('air-datepicker/dist/js/datepicker.min.js');


$('input[id*="datepicker"').datepicker({
  toggleSelected: false,
  clearButton: true,
  navTitles: {
    days: 'MM yyyy'
  },
  prevHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
  nextHtml: '<svg><use xlink:href="#arrow-right"></use></svg>',
  onHide: function(inst, animationCompleted) {
    $(inst.el).removeClass('dropdown_opened');
  },
  onShow: function(inst, animationCompleted) {
    $(inst.el).addClass('dropdown_opened');
  },
});

let applyBtn = $('<span class="datepicker--button" data-action="apply">применить</span>');
$('.datepicker--buttons').append(applyBtn)
$('input[id*="datepicker"').each(function () {
  $(this).datepicker().data('datepicker').apply = function () {
    this.$el.data('datepicker').hide();
  };
});

$('input[id*="ranged-datepicker"').datepicker({
  classes:'-ranged-',
  range:true,
  multipleDatesSeparator: ' - ',
  dateFormat: 'd M'
});





