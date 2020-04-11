require("jquery-ui/ui/widgets/datepicker");
require('jquery-ui/themes/base/datepicker.css');
require('jquery-ui/themes/base/theme.css');

$.datepicker.setDefaults({
	closeText: "Применить",
	prevText: "Предыдущий",
	nextText: "Следующий",
	currentText: "Очистить",
	monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
	"Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
	monthNamesShort: [ "янв","фев","мар","апр","май","июн",
	"июл","авг","сен","окт","ноя","дек" ],
	dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
	dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
	dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
	weekHeader: "Нед",
	dateFormat: "dd.mm.yy",
	firstDay: 1,
  hideIfNoPrevNext: true,
  yearSuffix: "",
  showOtherMonths: true,
	selectOtherMonths: true,
	showButtonPanel: true
});


$('input[id*="datepicker"]').datepicker({
	beforeShow: function (input, inst) {
		setTimeout(function () {
				inst.dpDiv.css({
						top: $(".datepicker").offset().top + 44,
						left: $(".datepicker").offset().left
				});
		}, 0);
}
});
$.datepicker._gotoToday = function(id) {
	console.log()
	$('.ui-state-active').removeClass('ui-state-active');
	$(id).get(0).value='ДД.ММ.ГГГГ';
};