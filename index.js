var events = ['onadd', 'onupdate', 'ondiscard']

module.exports = hooks

function hooks (morphdom) {
  if (!callable(morphdom)) throw new Error('morphdom must be a function')

  return function main (fromNode, toNode, opts) {
    if (typeof opts === 'undefined') opts = {}

    return morphdom(fromNode, toNode, {
      onBeforeElUpdated: function (fromEl, toEl) {
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

      onNodeAdded: function (node) {
        if (callable(node.onadd)) node.onadd(node)
        if (callable(opts.onNodeAdded)) opts.onNodeAdded(node)
      },

      onElUpdated: function (el) {
        if (callable(el.onupdate)) el.onupdate(el)
        if (callable(opts.onElUpdated)) opts.onElUpdated(el)
      },

      onNodeDiscarded: function (node) {
        if (callable(node.ondiscard)) node.ondiscard(node)
        if (callable(opts.onNodeDiscarded)) opts.onNodeDiscarded(node)
      },
      
      childrenOnly: opts.childrenOnly
    })
  }
}

function callable (fn) {
  return typeof fn === 'function'
}
