'use strict'

var utils = require('../utils')

var _senderMap = {}

function Sender(instance) {
  if (!(this instanceof Sender)) {
    return new Sender(instance)
  }
  this.instanceId = instance.instanceId
  this.weexInstance = instance
  _senderMap[this.instanceId] = this
}

function _send(instanceId, msg) {
  callJS(instanceId, [msg])
}

Sender.getSender = function (instanceId) {
  return _senderMap[instanceId]
}

Sender.prototype = {

  // perform a callback to jsframework.
  performCallback: function (callbackId, data, keepAlive) {
    var args = [callbackId]
    data && args.push(data)
    keepAlive && args.push(keepAlive)
    _send(this.instanceId, {
      method: 'callback',
      args: args
    })
  },

  fireEvent: function (ref, type, event) {
    if (event._alreadyFired) {
      // stop bubbling up in virtual dom tree.
      return
    }
    // do not prevent default, otherwise the touchstart
    // event will no longer trigger a click event
    event._alreadyFired = true
    var evt = utils.extend({}, event)
    // The event.target must be the standard event's currentTarget.
    evt.target = evt.currentTarget
    evt.value = event.target.value
    evt.timestamp = Date.now()
    _send(this.instanceId, {
      method: 'fireEvent',
      args: [ref, type, evt]
    })
  }

}

module.exports = Sender