'use strict'

var logger = require('../logger')
var Component = require('./component')

// attrs:
//   - href
function A (data) {
  Component.call(this, data)
}

A.prototype = Object.create(Component.prototype)

A.prototype.create = function () {
  var node = document.createElement('a')
  node.classList.add('weex-container')
  this.node = node
  node.addEventListener('click', function (e) {
    location.href = this.href
  })
  this.node.style.textDecoration = 'none'
  return node
}

A.prototype.attr = {
	href: function (val) {
		val += ''
		if (!val) {
			return logger.warn('href of <a> should not be a null value.')
		}
		this.href = val
		this.node.setAttribute('href', val)
	}
}

module.exports = A
