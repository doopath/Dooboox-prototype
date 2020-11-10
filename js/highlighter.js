'use strict'

//Highlighter
class Highlighter extends Logger {
  // It cannot work with angle brackets! Don't feed those to it!
  highlight(string, rules, styles) {
    try {
      return this._parse(string, rules.start, rules) // Get array like [{{rule} token}]
        .map(({ token, rule }) => {                 // or something like this
          const ruleNameItems = rule.name.split('.') // Get array like ['string', 'open']
          const styleFunctions = Object.entries(styles)
            .filter(([ styleName ]) => {
              return styleName
                .split('.')
                .every(styleNameItem => ruleNameItems.includes(styleNameItem))
            })
            .map(([, func]) => func)

          if (!styleFunctions.length) return styles.default(token)

          return styleFunctions.reduce((res, func) => func(res), token)
        })
        .join('')
    } catch (e) {
      this._log(e) // Logger function
    }
  }

  _parse (string, rules, globalRules, internal = false) {
    // _parse any (symbols/keywords/smth) from string
    try {
      if (typeof rules === 'string') rules = globalRules[rules]
      if (!rules) return [] // If we have no rules

      let strLeft = string,
          index = 0

      const tokens = []

      while (true) {
        // Find token
        const found = this._findToken(strLeft, rules, globalRules)

        if (!found.length) break // If we haven't found anything

        found.forEach( item => {
          // Create a token and put all from an item and an index in it
          const token = { ...item, index }

          strLeft = strLeft.substring(item.token.length) // Offset a line
          index += item.token.length // Index increment

          tokens.push(token) // Push a token to the tokens
        })

        // Only if we need to go away on level up
        if (internal && found.some(({ rule }) => rule.exit)) break
      }
      // Give any tokens to highlight function
      return tokens.reduceRight((res, token) => {
        if (token.rule.join && res[0] && res[0].rule === token.rule)
          res[0].token = token.token + res[0].token
        else res.unshift(token)

        return res
      }, [])
    } catch (e) {
      this._log(e)
    }
  }

  _findToken(string, rules, globalRules) { // Find token (keyword/number/smth)
    try {
      for (let rule of rules) { // Get each rule from of rules
        const match = rule.exp.exec(string) // Exec rule for string (find token)

        if (!match) continue // If we haven't found anything - continue (get new)
        if (match.index !== 0) continue // If we have found something but isn't
                                      // zero pos - continue
        const [token] = match // Get first element from match (match[0])

        return [
          { rule, token }, // Give these ones to the _parse function
          ...this._parse(string.substring(token.length), rule.next, globalRules, true)
        ]
      }
      return [] // Or return this one
    } catch (e) {
      this._log(e)
    }
  }
}
