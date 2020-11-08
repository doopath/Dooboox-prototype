'use strict'

document.addEventListener('DOMContentLoaded', () => {
  // See all configuration properties in config.(min.)js
  class CompactMenu {
    constructor(options) {
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
          this._onHide(curtain, this._d.body)
          this._onHide(cross, this._d.body)
        }
      }
    }

    _onHide(element, body) { // Hide elements
      element.onclick = () => {
        this._hide(element, body)
      }
    }

    _setLinks(links) { // Set links for ul>li (menu items)
      links.forEach( l => {
        this._ge.qs('.compact-menu ' + l.value).setAttribute('href', l.link)
      })
    }

    _show(curtain, body) { // Show menu
      curtain.style.display = 'grid'
      body.style.overflow = 'hidden'
    }

    _hide(curtain, body) { // Hide menu
      curtain.style.display = 'none'
      body.style.overflow = 'auto'
    }
  }

  // Let's get it
  const menu = new CompactMenu(menuProps)
  menu.compactMenu()
})
