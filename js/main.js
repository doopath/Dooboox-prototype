document.addEventListener('DOMContentLoaded', () => {
  const d = document,
    u_index = '.u_index',
    m_index = '#m_index'
    delay = '0.5s',
    codeBox = '.code__box',
    codeBoxItem = '.code__box__item',
    themesId = '#themes',
    projectInfoId = '#about-the-project',
    contentId = '#content',
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
        name: 'content',
        value: '#content',
        link: preLink + 'content.html'
      }
    ]

  function addDelay(s) {
    //checks if it's the index page (if not it gives an error =/)
    if(typeof delay == "string" && d.querySelector(m_index)) {
      d.querySelector('.text').setAttribute('data-wow-delay', s)
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

  addDelay(delay) //make a delay of the animation

  linkReplace(links) //add links for the items of the menu list
  
  redirectToHome(toHome) //if you had clicked on the button you will be redirected to the home page

  colorCapsNamesLetters(authorName, 'caps') //adds class "caps" for caps-letters in any words
  
  submenu(submenuTriggers) //get subitems for a menu item when it's hovering
})
