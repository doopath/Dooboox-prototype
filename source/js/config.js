'use strict'

var d = document,
      requests = { // Searcher settings
        name: 'elements',
        searchLine: '#search-line',
        elements: [
          '.tp-title',
          '.tp-subtitle',
          '.tp-text',
          '.tp-quote' // Add an element if you wanna search in it
        ]
       }

var codeBoxes = [ // Settings of code-boxes' toggle functions
      {
        name: 'codeBox_1',
        id: '#code-box_1',
        button: '.button',
        resultBox: '.code-box_result'
        // Change these ones if you change html names of classes or add elements
        // Create a new object for each code-box
      },
    ]

var preLink = 'https://sha1om.github.io/myproject/',
      menuProps = {
      element: '.compact-menu',
      preLink: preLink,
      links: [
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
      ],
      windowWidth: 450
    }
