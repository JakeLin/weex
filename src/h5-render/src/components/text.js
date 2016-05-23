'use strict'

var Atomic = require('./component')
var utils = require('../utils')

var DEFAULT_FONT_SIZE = 32
var DEFAULT_TEXT_OVERFLOW = 'ellipsis'

// attr
//  - value: text content.
//  - lines: maximum lines of the text.
function Text (data) {
  Atomic.call(this, data)
}

Text.prototype = Object.create(Atomic.prototype)

Text.prototype.create = function () {
  var node = document.createElement('div')
  node.classList.add('weex-container')
  node.style.fontSize = DEFAULT_FONT_SIZE * this.data.scale + 'px'
  this.textNode = document.createElement('span')
  // Give the developers the ability to control space
  // and line-breakers.
  this.textNode.style.whiteSpace = 'pre-wrap'
  this.textNode.style.display = '-webkit-box'
  this.textNode.style.webkitBoxOrient = 'vertical'
  this.style.lines.call(this, this.data.style.lines)
  node.appendChild(this.textNode)
  return node
}

Text.prototype.attr = {
  value: function (value) {
    var span = this.node.firstChild
    span.innerHTML = ''
    if (value == null || value === '') {
      return
    }
    span.textContent = value
    /**
     * Developers are supposed to have the ability to break text
     * lines manually. Using ``&nbsp;`` to replace text space is
     * not compatible with the ``-webkit-line-clamp``. Therefor
     * we use ``white-space: no-wrap`` instead (instead of the
     * code bellow).

      var frag = document.createDocumentFragment()
        text.split(' ').forEach(function(str) {
          var textNode = document.createTextNode(str)
          var space = document.createElement('i')
          space.innerHTML = '&nbsp;'
          frag.appendChild(space)
          frag.appendChild(textNode)
        })
        frag.removeChild(frag.firstChild)
        span.appendChild(document.createElement('br'))
        span.appendChild(frag)
      })
      span.removeChild(span.firstChild)
     */
  }
}

Text.prototype.clearAttr = function () {
  this.node.firstChild.textContent = ''
}

Text.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {

  lines: function (val) {
    val = parseInt(val)
    if (val !== val) { // NaN
      return
    }
    if (val <= 0) {
      this.textNode.style.textOverflow = ''
      this.textNode.style.overflow = 'visible'
      this.textNode.style.webkitLineClamp = ''
    } else {
      var style = this.data ? this.data.style : null
      this.textNode.style.overflow = 'hidden'
      this.textNode.style.textOverflow = style
        ? style.textOverflow
        : DEFAULT_TEXT_OVERFLOW
      this.textNode.style.webkitLineClamp = val
    }
  },

  textOverflow: function (val) {
    this.textNode.style.textOverflow = val
  }

})

module.exports = Text
