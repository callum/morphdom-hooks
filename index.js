const assert = require('assert')
const events = ['onadd', 'onupdate', 'ondiscard']

module.exports = hooks

function hooks (morphdom) {
  assert.equal(typeof morphdom, 'function', 'morphdom must be a function')

  return function main (fromNode, toNode, opts) {
    if (typeof opts === 'undefined') opts = {}

    return morphdom(fromNode, toNode, {
      onBeforeElUpdated (fromEl, toEl) {
        events.forEach(function (event) {
          if (callable(toEl[event])) {
            fromEl[event] = toEl[event]
          } else if (callable(fromEl[event])) {
            delete fromEl[event]
          }
        })
        if (callable(opts.onBeforeElUpdated)) {
          return opts.onBeforeElUpdated(fromEl, toEl)
        }
      },

      onNodeAdded (node) {
        if (callable(node.onadd)) node.onadd(node)
        if (callable(opts.onNodeAdded)) opts.onNodeAdded(node)
      },

      onElUpdated (el) {
        if (callable(el.onupdate)) el.onupdate(el)
        if (callable(opts.onElUpdated)) opts.onElUpdated(el)
      },

      onNodeDiscarded (node) {
        if (callable(node.ondiscard)) node.ondiscard(node)
        if (callable(opts.onNodeDiscarded)) opts.onNodeDiscarded(node)
      }
    })
  }
}

function callable (fn) {
  return typeof fn === 'function'
}
