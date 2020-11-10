'use strict'

var logs = [
    { // Logs for Logger class (js/logger.js). Use it if you wanna throw custom error.
      code: '001',
      name: 'There is not search line!',
      message: 'Check the class/id name is right or add the search line on the page.',
      lineNumber: -1,
      fileName: 'js/search.js',
      custom: true,
      method: console.error
    },
    {
      code: '002',
      name: 'You did not give any elements!',
      message: 'Check the elements/classes are right or add these to the config.js',
      lineNumber: -1,
      fileName: 'js/search.js',
      custom: true,
      method: console.error
    },
    {
      code: '003',
      name: 'Wrong property!',
      message: 'You cannot use this method untill you set this property of the class!',
      lineNumber: -1,
      fileName: 'js/toggle-examples.js',
      custom: true,
      method: console.error
    },
    {
      code: '004',
      name: 'Block id is null!',
      message: 'Function cannot get the element. It returns null.',
      lineNumber: -1,
      fileName: 'js/toggle-examples.js',
      custom: true,
      method: console.error
    },
    {
      code: '005',
      name: 'The selctor returned null!',
      message: 'The code block has not any line ( .code-box>.code-box__item>.code )',
      lineNumber: -1,
      fileName: 'js/toggle-examples.js',
      custom: true,
      method: console.warn
    }
  ]

var highlightingStyles = { // Colorizer styles settings for Highlighter
  default: Colorizer.white,
  keyword: Colorizer.green,
  symbol: Colorizer.blue,
  number: Colorizer.pastelGreen,
  comment: Colorizer.gray,
  arrow: Colorizer.red,
  link: Colorizer.oceanic,
  function: Colorizer.purple,
  par: Colorizer.pairsOrange,
  'string.start': Colorizer.pairsOrange,
  'string.end': Colorizer.pairsOrange,
  'string.content': Colorizer.yellow
},
  rules = { // Highlighter rules
    start: [
      // Add a rule for searching it into
      // string (and feed it into highlight function if you didn't)
      {
        name: 'comment',
        // It's just working. I can advice don't touch it.
        exp: /\/\/[a-zA-Zа-яА-Я0-9&@\s\[\]{}()-=+~\\!.]+/i
      },
      {
        name: 'space',
        exp: /\s+/
      },
      {
        name: 'function', // Local/Global functions highlighting
        exp: /console|getElementsByClassName|getElementsByTagName|getElementById|qeurySelector|typeof|add|remove|delete|contains|substring|md5|factorial|hash|includes|push|shift|pop|unshift|Date/i
      },
      {
        name: 'string.start',
        exp: /'|"|`/,
        next: 'string_next'
      },
      {
        name: 'number',
        exp: /(\+-)?\d+(\.\d+)?|NaN/
      },
      {
        name: 'par.open',
        exp: /\(/
      },
      {
        name: 'par.close',
        exp: /\)/
      },
      {
        name: 'keyword',
        exp: /(await|break|document|body|width|height|style|async|do|catch|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|super|switch|static|this|throw|try|True|typeof|var|void|while|with|yield)\b/i // SO BIG
      },
      {
        name: 'arrow',
        exp: /[=-]\p{S}/ui
      },
      {
        name: 'link',
        exp: /http(s)?:\/\/[a-zA-Zа-яА-Я0-9%&=#.\/\\!.]+/
      },
      {
        name: 'symbol',
        // How is it working i dunno lol
        exp: /\|\||&&|[\$!%@&\*+:;,.\\|\\{\\}/=-]|\p{S}/
      },
      {
        name: 'word',
        exp: /[a-zA-Z_\$]+[a-zA-Z0-9_\$]/
      },
    ],
    string_next: [
      {
        name: 'string.escape',
        exp: /\\./
      },
      {
        name: 'string.end',
        exp: /'|"|`/,
        exit: true
      },
      {
        name: 'string.content',
        exp: /./,
        join: true
      }
    ]
  }

var d = document,
      requests = { // Searcher settings
        name: 'elements',
        searchLine: '#search-line',
        logs: logs,
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
      logs: logs, // Logs for Logger
      rules: rules, // Rules for Highlighter
      styles: highlightingStyles, // Styles for Colorizer
      resultBox: '.code-box_result'
      // Change these ones if you change html names of classes or add elements
      // Create a new object for each code-box
    }
  ]

var preLink = 'https://sha1om.github.io/myproject/',
    // Compact-menu settings
    menuProps = {
     element: '.compact-menu',
     preLink: preLink,
     logs: logs,
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

