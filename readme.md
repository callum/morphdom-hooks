# morphdom-hooks

Lifecycle hooks for morphdom

# example

```js
const hooks = require('./')
const morphdom = hooks(require('morphdom'))

// create a button with some lifecycle handlers attached to it
function button () {
  const b = document.createElement('button')
  b.onadd = console.log.bind(console, 'button added to page!')
  b.onupdate = console.log.bind(console, 'button updated in page!')
  b.ondiscard = console.log.bind(console, 'button discarded from page!')
  return b
}

const div0 = document.createElement('div')
document.body.appendChild(div0)

const div1 = document.createElement('div')
const button0 = button()
div1.appendChild(button0)
morphdom(div0, div1)
// logs 'button added to page!'

const div2 = document.createElement('div')
const button1 = button()
button1.style.color = 'red'
div2.appendChild(button1)
morphdom(div0, div2)
// logs 'button updated in page!'

const div3 = document.createElement('div')
morphdom(div0, div3)
// logs 'button discarded from page!'
```
