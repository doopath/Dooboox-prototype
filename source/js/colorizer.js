'use strict'

//Colorizer
class Colorizer { // Get string as colorized html tag

  // Colors
  static white(el) { return `<span class="code-white">${el}</span>` }
  static red(el) { return `<span class="code-red">${el}</span>` }
  static orange(el) { return `<span class="code-orange">${el}</span>` }
  static yellow(el) { return `<span class="code-yellow">${el}</span>` }
  static green(el) { return `<span class="code-green">${el}</span>` }
  static lightGreen(el) { return `<span class="code-light_green">${el}</span>` }
  static oceanic(el) { return `<span class="code-oceanic">${el}</span>` }
  static blue(el) { return `<span class="code-blue">${el}</span>` }
  static lightPurple(el) { return `<span class="code-light_purple">${el}</span>` }
  static purple(el) { return `<span class="code-purple">${el}</span>` }
  static pink(el) { return `<span class="code-pink">${el}</span>` }
  static black(el) { return `<span class="code-black">${el}</span>` }
  static gray(el) { return `<span class="code-gray">${el}</span>` }

  // Styles
  static pairsOrange(el) { return `<span class="code-pairs_orange">${el}</span>` }
  static bold(el) { return `<span class="code-bold">${el}</span>` }
}
