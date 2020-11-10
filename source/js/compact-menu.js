'use strict'

document.addEventListener('DOMContentLoaded', () => {
  // See all configuration properties in config.(min.)js
  class CompactMenu extends Logger {
    constructor(options) {
      super() //logger constructor
      this._logs = options.logs

      // Components (require)
      this._element = options.element
      this._preLink = options.preLink
      this._links = options.links
      this._windowWidth = options.windowWidth

      // Utils
      this._d = document
      this._ge = {
        qs: el => { return this._d.querySelector(el) },
        qsa: el => { return this._d.querySelectorAll(el) },
      }
    }

    compactMenu() { // Public function
      try {
        if (this._d.body.clientWidth <= this._windowWidth) {
          let menu = this._ge.qs(this._element),
              curtain = this._ge.qs(this._element + ' div'),
              openMenu = this._ge.qs(this._element + ' p'),
              cross = this._ge.qs(this._element + ' div .cross')

          // Reset styles
          menu.style.display = 'block'
          curtain.style.display = 'none'

          // Event (open)
          openMenu.onclick = () => {
            this._setLinks(this._links)

            this._show(curtain, this._d.body)
            this._onHide(curtain, curtain, this._d.body)
            this._onHide(cross, curtain, this._d.body)
          }
        }
      } catch (e) {
        this._log(e)
      }
    }

    _onHide(click, curtain, body) { // Hide elements
      try {
        click.onclick = () => {
          this._hide(curtain, body)
        }
      } catch (e) {
        this._log(e)
      }
    }

    _setLinks(links) { // Set links for ul>li (menu items)
      try {
        links.forEach( l => {
          this._ge.qs('.compact-menu ' + l.value).setAttribute('href', l.link)
        })
      } catch (e) {
        this._log(e)
      }
    }

    _show(curtain, body) { // Show menu
      try {
        curtain.style.display = 'grid'
        body.style.overflow = 'hidden'
      } catch (e) {
        this._log(e)
      }
    }

    _hide(curtain, body) { // Hide menu
      try {
        curtain.style.display = 'none'
        body.style.overflow = 'auto'
      } catch (e) {
        this._log(e)
      }
    }
  }

  // Let's get it
  const menu = new CompactMenu(menuProps)
  menu.compactMenu()
})
