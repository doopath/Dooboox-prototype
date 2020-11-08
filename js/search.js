'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const d = document,
        requests = {
          name: 'elements',
          searchLine: '#search-line',
          elements: [
            '.tp-title',
            '.tp-subtitle',
            '.tp-text',
            '.tp-quote'
          ]
         }

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
      }

    }

    search() {
      if (this._ge.qs(this._searchLine) == null) { // You'll get error if you haven't
        throw new Error('There is no search line!') // these ones
      } else if (this._elements == undefined) {
        throw new Error('There are no elements!')
      }

      this._responsive(this._searchLine)

      this._ge.qs(this._searchLine).oninput = () => { // Adds the event
        this._elements.forEach( e => {
          this._found(this._searchLine, e) // Find expression in each element
          this._separator() // Adds margin-top for a separator
        })
      }
    }

    _found(input, elements) {
      let req = this._ge.qs(input).value.toLowerCase().trim() // Get the search request

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
    }

    _responsive(searcher) { // Set the respolnsive styles for the searcher
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
    }

    _marker(line, position, length) { // Colorizes part of string by tag <mark>
      return line.slice(0, position) + '<mark>' + line.slice(
        position, position + length) + '</mark>' + line.slice(
          position + length)
    }

    _markerRemove(line) { // Remove any markers from line
      return line.replace('<mark>', '').replace('</mark>', '')
    }

    _hide(element) { // Hide element
      if (!element.classList.contains('_hidden')) {
        element.classList.add('_hidden')
      }
    }

    _show(element) { // Show element (disable display: none)
      if (element.classList.contains('_hidden')) {
        element.classList.remove('_hidden')
      }
    }

    _separator() { // When some elements have property display:none the button
                  // slide down and it can be fix by add a bigger margin for
                 // a separator
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
    }
  }

  let req = new Searcher(requests)
  req.search()

})
