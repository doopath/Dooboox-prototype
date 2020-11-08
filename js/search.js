'use strict'

document.addEventListener('DOMContentLoaded', () => {
  // See all configuration properties in config.(min.)js
  class Searcher {
    constructor(options) {
      this._elements = options.elements
      this._searchLine = options.searchLine // Require

      this.name = options.name // Why not

      // Utils
      this._d = document
      this._ge = {
        qs: el => { return this._d.querySelector(el) },
        qsa: el => { return this._d.querySelectorAll(el) }
      },
      this._logs = [
        {
          code: '001',
          name: 'There is not search line!',
          message: 'Check the class/id name is right or add the search line on the page.',
          lineNumber: -1,
          fileName: 'js/main.js',
          custom: true,
          method: console.error,
        },
        {
          code: '002',
          name: 'You did not give any elements!',
          message: 'Check the elements/classes are right or add these to the config.js',
          lineNumber: -1,
          fileName: 'js/main.js',
          custom: true,
          method: console.error,
        }
      ]
    }

    search() {
      try {
        if (this._ge.qs(this._searchLine) == null) { // You'll get error if you haven't
          let lineNumber = new Error().lineNumber + 1
          this._logs[0].lineNumber = lineNumber
          throw this._logs[0] // these ones
        } else if (this._elements == undefined) {
          let lineNumber = new Error().lineNumber + 1
          this._logs[1].lineNumber = lineNumber
          throw this._logs[1] // these ones
        }

        this._responsive(this._searchLine)

        this._ge.qs(this._searchLine).oninput = () => { // Adds the event
          this._elements.forEach( e => {
            this._found(this._searchLine, e) // Find expression in each element
            this._separator() // Adds margin-top for a separator
          })
        }
      } catch (e) {
        this._log(e)
      }
    }

    _found(input, elements) {
      // Get the search request
      try {
        let req = this._ge.qs(input).value.toLowerCase().trim()

        if (req != '' ) { // Only if search request isn't equal 0
          this._ge.qsa(elements).forEach( e => {
            const innerPosition = e.innerText.toLowerCase().search(req)

            if (innerPosition != -1) { // If that boy has found an expression on a page
              let reqString = e.innerText

              this._show(e) // Get over here
              e.innerHTML = this._marker(reqString, innerPosition, req.length)
              // Makes places of found expression are visible
            } else {
              this._hide(e) // Go away
            }
          })
        } else { // Then you'll get it
          this._ge.qsa(elements).forEach( e => {
            this._show(e)
            e.innerText = this._markerRemove(e.innerText) // Remove those ones
          })

          this._ge.qsa('.separator').forEach( e => { // Reset separator styles
            e.style.marginTop = '60px'
          })
        }
      } catch (e) {
        this._log(e)
      }
    }

    _responsive(searcher) {
      // Set the respolnsive styles for the searcher
      try {
        if (this._d.body.clientWidth <= 791 && this._d.body.clientWidth > 450) {
          // Only while 450px < bodyWidth < 791px is true
          this._ge.qs('#clicker').onclick = e => { // Checks event
            e.target.classList.toggle('clicker_active')
            e.target.parentNode.classList.toggle('search__box_active')

            this._ge.qs(this._searchLine).value = '' // Show any elements on a page
            this._found(this._searchLine, this._elements)

            if (this._d.body.clientWidth <= 760 // Apply some styles
              && e.target.classList.contains('clicker_active')) {
              let bodyWidth = this._d.body.clientWidth // get and set body width

              if (bodyWidth <= 500) {
                // Set an offset for transform the header title
                var offset = (bodyWidth / 100 * 40) + 'px'
              } else if (bodyWidth <= 610) {
                var offset = (bodyWidth / 100 * 30) + 'px'
              } else if (bodyWidth > 610) {
                var offset = (bodyWidth / 100 * 20) + 'px'
              }
              this._ge.qs('.header__title').style.transform = `translate(${offset}, 0)`
            } else {
              // Reset styles
              this._ge.qs('.header__title').style.transform = 'translate(0, 0)'
            }
          }
        }
      } catch (e) {
        this._log(e)
      }
    }

    _separator() { // When some elements have property display:none the button
                  // slide down and it can be fix by add a bigger margin for
                 // a separator
      try {
        if (this._ge.qs(this._elements[3]).classList.contains('_hidden')) {
          // If the title are hidden
        // Check the settings (requests) properties index out!
          this._ge.qsa('.separator').forEach( e => {
            e.style.marginTop = '70px'
          })
        }

        if (this._ge.qs(this._elements[2]).classList.contains('_hidden')) {
          // If the text are hidden
          this._ge.qsa('.separator').forEach( e => {
            e.style.marginTop = '90px'
          })
        }
      } catch (e) {
        this._log(e)
      }
    }

    _marker(line, position, length) {
      // Colorizes part of string by tag <mark>
      try {
        return line.slice(0, position) + '<mark>' + line.slice(
          position, position + length) + '</mark>' + line.slice(
            position + length)
      } catch (e) {
        this._log(e)
      }
    }

    _markerRemove(line) {
     // Remove any markers from line
      try {
        return line.replace('<mark>', '').replace('</mark>', '')
      } catch (e) {
        this._log(e)
      }
    }

    _hide(element) { // Hide element
      try {
        if (!element.classList.contains('_hidden')) {
          element.classList.add('_hidden')
        }
      } catch (e) {
        this._log(e)
      }
    }

    _show(element) { // Show element (disable display: none)
      try {
        if (element.classList.contains('_hidden')) {
          element.classList.remove('_hidden')
        }
      } catch (e) {
        this._log(e)
      }
    }

    // Tests and logs

    _log(e) { // Make a log and send to logger
      let log = {
        code: e.code,
        name: e.name,
        message: e.message,
        lineNumber: e.lineNumber,
        fileName: e.fileName,
        custom: e.custom,
        method: e.method
      }

      this._logToConsole(log) // Sending
    }

    _logToConsole(log) {
      if (log.custom === true) {
        this._showLog(log) // You haven't much time, do it!
      } else {
        log.code = '000' // Reset code
        log.method = console.error // Reset method
        this._showLog(log) // Show log
      }
    }

    _showLog(log) { // Write log to the console
      log.method(`Code: ` + log.code + `\n Name: ` + log.name + `\n Message: ` + log.message + `\n Line: ` + log.lineNumber + `\n File: ` + log.fileName)
    }
  }

  // Let's get it done
  let req = new Searcher(requests)
  req.search()
})
