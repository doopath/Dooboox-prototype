$(document).ready(function() {
  let delay = '0.5s';

  function addDelay(delay) {
    if(typeof delay == "string") {
      $('.text').attr('data-wow-delay', delay);
    }
  }

  function showExample(buttonName, codeBoxName) {
    $(buttonName).on('click', function(event){
      $(codeBoxName).toggleClass('code__box_active wow fadeInLeft');
      $(buttonName).toggleClass('button_active');
    });
  }

  function stringNumber(parent, preparent, className) {
    var attr = parent + ' ' + preparent + ' ' + className;
    var items = $(attr);

    for(let i = 0; i <= items.length; i++) {
      items.eq(i).html(i + 1);
    }
  }

  addDelay(delay);
  stringNumber('#code__box_1', '.code__box__item', '.string__number');
  showExample('#add_content_button_1', '#code__box_1');
});
