'use strict'

var ComponentManager = require('../componentManager')
var Component = require('./component')
var utils = require('../utils')
var logger = require('../logger')

var rootCandidates = ['list', 'vlist', 'scroller']

function RootComponent(data, nodeType) {
  var id = data.rootId + '-root'
  var componentManager = ComponentManager.getInstance(data.instanceId)

  // If nodeType is in the downgrades map, just ignore it and
  // replace it with a div component.
  var downgrades = componentManager.weexInstance.downgrades
  this.data = data

  // In some situation the root component should be implemented as
  // its own type, otherwise it has to be a div component as a root.
  if (!nodeType) {
    nodeType = 'div'
  } else if (rootCandidates.indexOf(nodeType) === -1) {
    logger.warn('the root component type \'' + nodeType + '\' is not one of '
      + 'the types in [' + rootCandidates + '] list. It is auto downgraded '
      + 'to \'div\'.')
    nodeType = 'div'
  } else if (downgrades[nodeType]) {
    logger.warn('Thanks to the downgrade flags for ['
      + Object.keys(downgrades)
      + '], the root component type \'' + nodeType
      + '\' is auto downgraded to \'div\'.')
    nodeType = 'div'
  } else {
    // If the root component is not a embed element in a webpage, then
    // the html and body height should be fixed to the max height
    // of viewport.
    if (!componentManager.weexInstance.embed) {
      window.addEventListener('renderend', function () {
        this.detectRootHeight()
      }.bind(this))
    }
    logger.warn('the root component type \'' + nodeType + '\' may have '
      + 'some performance issue on some of the android devices when there '
      + 'is a huge amount of dom elements. Try to add downgrade '
      + 'flags by adding param \'downgrade_' + nodeType + '=true\' in the '
      + 'url or setting downgrade config to a array contains \'' + nodeType
      + '\' in the \'weex.init\' function. This will downgrade the root \''
      + nodeType + '\' to a \'div\', and may elevate the level of '
      + 'performance, although it has some other issues.')
    !this.data.style.height && (this.data.style.height = '100%')
  }

  data.type = nodeType
  var cmp = componentManager.createElement(data)
  cmp.node.id = id
  return cmp
}

RootComponent.prototype = Object.create(Component.prototype)

RootComponent.prototype.detectRootHeight = function () {
  var rootQuery = '#' + this.getComponentManager().weexInstance.rootId
  var rootContainer = document.querySelector(rootQuery) || document.body
  var height = rootContainer.getBoundingClientRect().height
  if (height > window.innerHeight) {
    logger.warn([
      'for scrollable root like \'list\' and \'scroller\', the height of ',
      'the root container musted be a user-specified value. Otherwise ',
      'the scrollable element may not be able to work correctly. ',
      'Current height of the root element \'' + rootQuery + '\' is ',
      height + 'px, and mostly its height should be less than the ',
      'viewport\'s height ' + window.innerHeight + 'px. Please ',
      'make sure the height is correct.'
      ].join(''))
  }
}

module.exports = RootComponent
