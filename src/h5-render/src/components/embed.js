'use strict'

var Component = require('./component')
var utils = require('../utils')

var ID_PREFIX = 'weex_embed_'

function _generateId() {
  return ID_PREFIX + utils.getRandom(10)
}

function Embed (data, nodeType) {
  var attr = data.attr
  if (attr) {
    this.source = attr.src
    this.loader = attr.loader || 'xhr'
    this.jsonpCallback = attr.jsonpCallback
  }
  Component.call(this, data, nodeType)
  this.initWeex()
}

Embed.prototype = Object.create(Component.prototype)

Embed.prototype.create = function () {
  var node = document.createElement('div')
  node.id = this.id
  node.style.overflow = 'scroll'
  // node.classList.add('weex-container')
  return node
}

Embed.prototype.initWeex = function () {
  this.id = _generateId()
  this.node.id = this.id
  var config = {
    appId: this.id,
    source: this.source,
    bundleUrl: this.source,
    loader: this.loader,
    jsonpCallback: this.jsonpCallback,
    width: this.node.getBoundingClientRect().width,
    rootId: this.id,
    embed: true
  }
  window.weex.init(config)
}

Embed.prototype.destroyWeex = function () {
  this.id && window.destroyInstance(this.id)
  // TODO: unbind events and clear doms.
  this.node.innerHTML = ''
}

Embed.prototype.reloadWeex = function () {
  this.destroyWeex()
  this.initWeex()
}

// not recommended, because of the leak of memory.
Embed.prototype.attr = {
  src: function (value) {
    this.src = value
    this.reloadWeex()
  }
}

module.exports = Embed
