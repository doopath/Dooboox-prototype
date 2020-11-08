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
