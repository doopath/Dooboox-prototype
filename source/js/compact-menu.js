"use strict"
document.addEventListener('DOMContentLoaded', () => {
  const d = document,
    element = '.compact-menu',
    preLink = 'https://sha1om.github.io/myproject/',
    links = [
      { 
        name: 'home',
        value: '#home',
        link: preLink
      },
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

  function compactMenu(element, windowWidth) {
    if (d.body.clientWidth <= windowWidth) {
      let menu = d.querySelector(element),
        curtain = d.querySelector(element + ' div'),
        openMenu = d.querySelector(element + ' p'),
        cross = d.querySelector(element + ' div .cross')

      menu.style.display = 'block'
      curtain.style.display = 'none'

      openMenu.addEventListener('click', () => {
        curtain.style.display = 'grid'
        d.body.style.overflow = 'hidden'
        cross.addEventListener('click', () => {
          curtain.style.display = 'none'
          d.body.style.overflow = 'auto'
        })
      })

      d.querySelector(element + ' div ul li a').addEventListener('click', () => {
        curtain.style.display = 'none'
        d.body.style.overflow = 'auto'
      })

    }
  }

  function setLinks(links) {
    links.forEach(link => d.querySelector('.compact-menu ' + link.value).setAttribute('href', link.link))
  }

  setLinks(links) //same function that main.js -> linkReplace
  compactMenu(element, 450) //set compact menu instead the main menu
})
