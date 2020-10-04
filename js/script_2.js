$(document).ready(function() {
  let delay = '0.5s',
    contentButton_1 = '#add_content_button_1',
    arrow_1 = '#arrow_1',
    codeBox_1 = '#code__box_1',
    codeBox_2 = '#code__box_2',
    gearsBlock = '.gears__block',
    hTitle_1 = '#h-title_1',
    hTitle_2 = '#h-title_2',
    codeBoxItem = '.code__box__item',
    stringNumber = '.string__number',

    themesId = '#themes',
    projectInfoId = '#about-the-project',
    contentId = '#content',
    howThisIsWorkingId = '#how-this-is-working',

    fakeLink = 'https://google.com';

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

  function linkReplace(linkName, url) {
    String(url);
    $(linkName).on('click', function(event) {
      window.location.replace(url);
    });
  }

  showExample(contentButton_1, arrow_1, codeBox_1, gearsBlock, codeBox_2, hTitle_1, hTitle_2); //show the code-box, titles and gears; reverse the arrow and toggle item's position
  addDelay(delay); //make a delay of the animation

  stringNumber(codeBox_1, codeBoxItem, '.string__number'); //set a number of a string of the code-box
  stringNumber(codeBox_2, codeBoxItem, '.string__number');

  linkReplace(themesId, fakeLink); //make a redirect when a link was clicked
  linkReplace(projectInfoId, fakeLink);
  linkReplace(contentId, fakeLink);
  linkReplace(howThisIsWorkingId, fakeLink);
});
