document.addEventListener('DOMContentLoaded', () => {
  const d = document,
    u_index = '#u_index',
    delay = '0.5s',
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
    preLink = 'https://sha1om.github.io/myproject/',
    homePage = preLink,
    toHome = '#to-home',
    submenuTriggers = [
      {
        name: 'themes_sublist',
        value: '#themes',
        link: preLink + 'themes.html',
        target: '.menu-sublist__box',
        targetList: '.menu-sublist',
        items: '.menu-sublist__item'
      }
    ],
    authorName = '.author__name',

    links = [
      { 
        name: 'themes',
        value: '#themes',
        link: preLink + 'themes.html'
      },
      { 
        name: 'about-the-project',
        value: '#about-the-project',
        link: preLink + 'about.html'
      },
      { 
        name: 'authors',
        value: '#authors',
        link: preLink + 'authors.html'
      },
      { 
        name: 'how-this-is-working',
        value: '#how-this-is-working',
        link: preLink + 'how.html'
      }
    ]

  function addDelay(s) {
    //checks if it's the index page (if not it gives an error =/)
    if(typeof delay == "string" && d.querySelector(u_index)) {
      d.querySelector('.text').setAttribute('data-wow-delay', s)
    }
  }

  function showExample(buttonName, arrowName, codeBoxName, gearsName, resultName, title1, title2) {
    if (d.querySelector(u_index)) { //checks if it's the index page (if not it gives an error =/)
      d.querySelector(buttonName).addEventListener('click', e => {
        if(d.querySelector(buttonName).getAttribute('title') == 'Показать пример') {
          d.querySelector(buttonName).setAttribute('title', 'Скрыть пример')
        } else {
          d.querySelector(buttonName).setAttribute('title', 'Показать пример')
        }
        let box_active = ['code__box_active', 'wow', 'fadeInLeft']

        d.querySelector(codeBoxName).classList.toggle(box_active[0])
        d.querySelector(codeBoxName).classList.toggle(box_active[1])
        d.querySelector(codeBoxName).classList.toggle(box_active[2])

        d.querySelector(resultName).classList.toggle(box_active[0])
        d.querySelector(resultName).classList.toggle(box_active[1])
        d.querySelector(resultName).classList.toggle(box_active[2])

        d.querySelector(arrowName).classList.toggle('arrow__active')
        d.querySelector(gearsName).classList.toggle('gears__block_active')
        d.querySelector(title1).classList.toggle('h-title')
        d.querySelector(title2).classList.toggle('h-title')
      });
    }
  }

  function setStringNumber(parent, preparent, className) {
    var attr = parent + ' ' + preparent + ' ' + className;
    var items = d.querySelectorAll(attr)
    for(let i = 0; i <= items.length; i++) {
      if (items[i] != undefined) {
        items[i].innerHTML = i + 1
      }
    }
  }

  function linkReplace(vars) {
    vars.forEach(link => d.querySelector(link.value).setAttribute('href', link.link))
  }

  function redirectToHome(button) {
    if (d.querySelector(u_index) == null && d.body.clientWidth > 600) {
      let element = d.querySelector(button)
      element.style.display = 'grid'
      if (element.classList.contains('fadeInLeft')) {
        element.classList.remove('fadeInLeft')
        element.classList.add('fadeInLeft')
      }
      element.classList.add('wow', 'fadeInLeft')
      element.addEventListener('click', () => {
        window.location = homePage
      })
    }
  }

  function codeScrolling(codeBlock, codeItem, screenWidth, lineWidth) {
    if (d.body.clientWidth <= screenWidth) {
      let lines = d.querySelectorAll(codeBlock + ' ' + codeItem)
      lines.forEach(line => {
        if (line.innerText.length >= lineWidth) {
          let lineLength = '800px'
          d.querySelector(codeItem).style.width = lineLength
          d.querySelector(codeBlock).classList.add('code__box-scrolling')
          lines.forEach(line => line.style.width = lineLength)
        }
      })
    }
  }

  function colorCapsLetters(element, className) {
    let string = element.innerHTML,
      result = ''
    for (let i = 0; i < string.length; i++) {
      if (string[i].match(/[A-Z]/g) != null){
        if (string[i].match(/[A-Z]/g)[0] === string[i]) {
          result += `<span class="${className}">${string[i]}</span>`
        }
      } else {
        result += string[i]
      }
    }
    element.innerHTML = result
  }

  function colorCapsNamesLetters(elements, className) {
    elements = d.querySelectorAll(elements)
    elements.forEach(element => colorCapsLetters(element, className))
  }

  function submenu(items) {
    items.forEach(item => {
      d.querySelector('.menu__list ' + item.value).addEventListener('mouseover', e => {
        d.querySelector('.main__content').style.marginTop = '82px'
        d.querySelector(item.target).style.display = 'block'

        d.querySelector(item.value).addEventListener('mouseout', e => {
          d.querySelector('.main__content').style.marginTop = '0px'
          d.querySelector(item.target).style.display = 'none'
        })
      })
      d.querySelector(item.target).addEventListener('mouseover', e => {
        d.querySelector('.main__content').style.marginTop = '82px'
        d.querySelector(item.target).style.display = 'block'

        d.querySelector(item.target).addEventListener('mouseout', e => {
          d.querySelector('.main__content').style.marginTop = '0px'
          d.querySelector(item.target).style.display = 'none'
        })
      })
    })
  }

  codeScrolling(codeBox_1, codeBoxItem, 600, 60) //adds a scrollbar to codebox
  codeScrolling(codeBox_2, codeBoxItem, 600, 82)

  showExample(contentButton_1, arrow_1, codeBox_1, gearsBlock, codeBox_2, hTitle_1, hTitle_2) //show the code-box, titles and gears; reverse the arrow and toggle item's position
  addDelay(delay) //make a delay of the animation

  setStringNumber(codeBox_1, codeBoxItem, stringNumber) //set a number of a string of the code-box
  setStringNumber(codeBox_2, codeBoxItem, stringNumber)

  linkReplace(links) //add links for the items of the menu list
  
  redirectToHome(toHome) //if you had clicked on the button you will be redirected to the home page

  colorCapsNamesLetters(authorName, 'caps') //adds class "caps" for caps-letters in any words
  
  submenu(submenuTriggers) //get subitems for a menu item when it's hovering
})
