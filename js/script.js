$(document).ready(function() {
  let delay = '0.5s';

  function addDelay(delay) {
    if(typeof delay == "string") {
      $('.text').attr('data-wow-delay', delay);
    }
  }

  function showExample(buttonName, arrowName, codeBoxName, gearsName, resultName, title1, title2) {
    $(buttonName).on('click', function(event){
      $(codeBoxName).toggleClass('code__box_active wow fadeInLeft');
      $(arrowName).toggleClass('arrow__active');
      $(gearsName).toggleClass('gears__block_active');
      $(resultName).toggleClass('code__box_active wow fadeInLeft');
      $(title1).toggleClass('h-title');
      $(title2).toggleClass('h-title');
    });
  }

  function stringNumber(parent, preparent, className) {
    var attr = parent + ' ' + preparent + ' ' + className;
    var items = $(attr);

    for(let i = 0; i <= items.length; i++) {
      items.eq(i).html(i + 1);
    }
  }

  showExample('#add_content_button_1', '#arrow_1', '#code__box_1', '.gears__block', '#code__box_2', '#h-title_1', '#h-title_2'); //show the code-box, titles and gears; reverse the arrow and toggle item's position
  addDelay(delay); //make a delay of the animation

  stringNumber('#code__box_1', '.code__box__item', '.string__number'); //set a number of a string of the code-box
  stringNumber('#code__box_2', '.code__box__item', '.string__number');
});
