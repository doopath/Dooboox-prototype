'use strict'
document.addEventListener('DOMContentLoaded', () => {
  // See all configuration properties in config.(min.)js
  class CodeBox extends Logger {
    constructor(options) {
      super() //
      this._logs = options.logs // Logs list for Logger
      this._rules = options.rules // Rules list for Highlighter
      this._styles = options.styles

      this._name = options.name
      this._id = options.id
      this._button = options.button
      this._result = options.resultBox
      this._exampleBox = this._id + ' .tp-example__box'
      this._codeBox = this._exampleBox + ' .code-box'
      this.d = document
      this._ge = { // Get elements
        qs : el => { return this.d.querySelector(el) },
        qsa : el => { return this.d.querySelectorAll(el) }
      }
      this._logs = [ //Add error logs for the function _test
      ]
    }

    toggleVisible() { // Show/Hide code box and anothers when button was clicked
      try {
        if (this._ge.qs(this._id) === null) {
          let line = new Error().lineNumber - 1
          this._throw(logs[2], line)
        }
        this._ge.qs(this._id + ' ' + this._button).addEventListener('click', e => {

          if (this._ge.qs(this._exampleBox).style.display === 'none') {
            // Here I add some styles and properties
            e.target.parentNode.setAttribute('title', 'Скрыть пример')
            e.target.parentNode.classList.add('button_active')

            this._ge.qs(this._exampleBox).style.display = 'block'
            this._ge.qs(this._exampleBox + ' .gears__block').style.display = 'grid'

            if (this._result != undefined) { // Only if this code-box has a result block
              let boxes = this._ge.qsa(this._codeBox)
              boxes.forEach( b => b.classList.add('code-box_active', 'wow', 'fadeInLeft') )
            } else {
              this._ge.qs(this._codeBox).classList.add('code-box_active', 'wow', 'fadeInLeft')
            }
          } else {
              // Here I delete some styles and properties
              e.target.parentNode.setAttribute('title', 'Показать пример')
              e.target.parentNode.classList.remove('button_active')

              this._ge.qs(this._exampleBox).style.display = 'none'
              this._ge.qs(this._exampleBox + ' .gears__block').style.display = 'none'
              this._ge.qs(this._codeBox).classList.remove('code-box_active', 'wow', 'fadeInLeft')
          }

          if (this._result != undefined) {
            this._ge.qs(this._id + ' ' + this._result).style.display = 'block'
          }
        })

        // Apply another ones for example-box childs etc

        this._setStringNumbers(this._codeBox)
        this._showResult(this._exampleBox)
        this._addScrollBar(this._codeBox, 900, '900px')
        this._syntaxHighlighting(this._codeBox, this._styles)

      } catch (e) {
        return this._log(e)
      }
    }

    _setStringNumbers(codeBox, res) {
      /* That's can help to numerate numbers of lines */
      try {
        if (!res) { // Detect if it's not a result block (Give true as second arg)
          const fields = this._ge.qsa(codeBox + ' .code-box__item .string__number')

          fields.forEach( (f, i) => {
            if (!f.parentNode.classList.contains('res-item')) { // code-box__item without res-item
              f.innerText = i + 1
            }
          })
        } else { // If it's a result block do it ->
          const fields = this._ge.qsa(codeBox + ' .res-item .string__number')

          fields.forEach( (f, i) => f.innerText = i + 1 )
        }
      } catch (e) {
        return this._log(e)
      }
    }

    _syntaxHighlighting(codeBox) { // Highlight syntax of code example
      const lines = this._ge.qsa(codeBox + ' .code-box__item .code')
      const highlighter = new Highlighter(this._rules)

      lines.forEach( line => {
        if (!line.classList.contains('code-result')) {
          line.innerHTML = highlighter.highlight(
            line.innerText, this._rules, this._styles)
        }
      })
    }

    _addScrollBar(codeBox, screenWidth, lineWidth) {
      /* That's can help to add a scroll-bar for block */
      try {
        if (this.d.body.clientWidth <= screenWidth) {
          if (this._result != undefined) { // Only if I have result block
            let boxes = this._ge.qsa(codeBox)

            boxes.forEach( b => { // Then add the class for each elements
              b.classList.add('code-box-scrolling')

              let lines = b.childNodes

              for (let i = 1; i < lines.length; i += 2) {
                lines[i].style.width = lineWidth // There are elements like 0: #text; 1: <div>...
              }
            })

          } else { // If I have only one box (without result block)
            this._ge.qs(codeBox).classList.add('code-box-scrolling')

            const items = this._ge.qsa(codeBox + ' .code-box__item')

            items.forEach( i => i.style.width = lineWidth )
          }

        }
      } catch (e) {
        return this._log(e)
      }
    }

    _showResult(codeBox) {
      try {
        if (this._result != undefined) { // You cannot call it if you haven't a result block
          let box = this._ge.qs(codeBox + ' ' + this._result)

          this._setStringNumbers(codeBox + ' ' + this._result, true)
        } else { // Then you get this one
          return false
          let line = new Error().lineNumber - 1
          this._throw(logs[3], line)
        }
      } catch (e) {
        return this._log(e)
      }
    }
  }

  codeBoxes.forEach( b => {  // Get any code-boxes and apply all for these ones.
    const box = new CodeBox(b)
    box.toggleVisible()
  })

})
