var $ = require('jquery')
var template = require("./pages/test.pug");


$('#button').on('click', function () {
  console.log('button')
  sessionStorage.setItem('myVar', '123');
})

$(document).ready(() => {
  console.log("ready");
  console.log($('#button'));
  
  $('#button')[0].text = sessionStorage.getItem('myVar') ? sessionStorage.getItem('myVar') : 'button';
  sessionStorage.removeItem('myVar')
})
