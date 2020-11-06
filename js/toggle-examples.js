"use strict"
document.addEventListener('DOMContentLoaded', () => {
  const codeBoxes = [ // Settings of code-boxes' toggle functions
    {
      name: 'codeBox_1',
      id: '#code-box_1',
      buttonId: '#toggle-button_1',
      resultBox: '.code-box_result'
      // Change these ones if you change html names of classes or add elements
      // Create a new object for each code-box
    },
    {
      name: 'codeBox_2',
      id: '#code-box_2',
      buttonId: '#toggle-button_2',
      resultBox: '.code-box_result'
    }
  ]

  class CodeBox {
    constructor(options) {
      this.name = options.name
      this.id = options.id
      this.button = options.buttonId
      this.result = options.resultBox
      this.d = document
      this.ge = { // Get elements
        qs : el => { return this.d.querySelector(el) },
        qsa : el => { return this.d.querySelectorAll(el) }
      }
    }

    toggleVisible() { // Show/Hide code box and anothers when button was clicked
      this.ge.qs(this.id + ' ' + this.button).addEventListener('click', e => {

        if (e.target.parentNode.getAttribute('title') == 'Показать пример') {
          // Here I add some styles and properties
          e.target.parentNode.setAttribute('title', 'Скрыть пример')
          e.target.parentNode.classList.add('button_active')

          this.ge.qs(this.id + ' .tp-example__box').style.display = 'block'
          this.ge.qs(this.id + ' .tp-example__box .gears__block').style.display = 'grid'

          if (this.result != undefined) { // Only if this code-box has a result block
            let boxes = this.ge.qsa(this.id + ' .tp-example__box .code-box')
            boxes.forEach( b => b.classList.add('code-box_active', 'wow', 'fadeInLeft') )
          } else {
            this.ge.qs(this.id + ' .tp-example__box .code-box').classList.add('code-box_active', 'wow', 'fadeInLeft')
          }

        } else { // Ok, I'm gonna check title and after it add/remove styles
          // Here I delete some styles and properties
          e.target.parentNode.setAttribute('title', 'Показать пример')
          e.target.parentNode.classList.remove('button_active')

          this.ge.qs(this.id + ' .tp-example__box').style.display = 'none'
          this.ge.qs(this.id + ' .tp-example__box .gears__block').style.display = 'none'
          this.ge.qs(this.id + ' .tp-example__box .code-box').classList.remove('code-box_active', 'wow', 'fadeInLeft')
        }

        if (this.result != undefined) {
          this.ge.qs(this.id + ' ' + this.result).style.display = 'block'
        }
      })

      // Apply another ones for example-box childs etc
      this.setStringNumbers(this.id + ' .tp-example__box .code-box')
      this.addScrollBar(this.id + ' .tp-example__box .code-box', 900, '900px')
      this.showResult(this.id + ' .tp-example__box')
    }

    setStringNumbers(codeBox, res) {
      /* That's can help to numerate numbers of lines */
      if (!res) { // Detect if it's not a result block (Give true as second arg)
        const fields = this.ge.qsa(codeBox + ' .code-box__item .string__number')

        fields.forEach( (f, i) => {
          if (!f.parentNode.classList.contains('res-item')) { // code-box__item without res-item
            f.innerText = i + 1
          }
        })
      } else { // If it's a result block do it ->
        const fields = this.ge.qsa(codeBox + ' .res-item .string__number')

        fields.forEach( (f, i) => f.innerText = i + 1 )
      }
    }

    addScrollBar(codeBox, screenWidth, lineWidth) {
      /* That's can help to add a scroll-bar for block */
      if (this.d.body.clientWidth <= screenWidth) {
        if (this.result != undefined) { // Only if I have result block
          let boxes = this.ge.qsa(codeBox)

          boxes.forEach( b => { // Then add the class for each elements
            b.classList.add('code-box-scrolling')

            let lines = b.childNodes

            for (let i = 1; i < lines.length; i += 2) {
              lines[i].style.width = lineWidth // There are elements like 0: #text; 1: <div>...
            }
          })

        } else { // If I have only one box (without result block)
          this.ge.qs(codeBox).classList.add('code-box-scrolling')

          const items = this.ge.qsa(codeBox + ' .code-box__item')

          items.forEach( i => i.style.width = lineWidth )
        }

      }
    }

    showResult(codeBox) {
      if (this.result != undefined) { // You cannot call it if you haven't a result block
        let box = this.ge.qs(codeBox + ' ' + this.result)

        this.setStringNumbers(codeBox + ' ' + this.result, true)
      } else { // Then you get this one
        return false
      }
    }
  }

  const box = new CodeBox(codeBoxes[0]) // Make a new object of class CodeBox

  box.toggleVisible()

})
