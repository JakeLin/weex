/**
 * @fileOverview
 * ViewModel Constructor & definition
 */

import * as _ from '../util'
import * as scope from './instance/scope'
import * as compiler from './compiler'
import * as directive from './directive'
import * as domHelper from './dom-helper'
import * as events from './events'

import {registerModules, registerMethods} from '../app/register'

function callOldReadyEntry(vm, component) {
  if (component.methods &&
      component.methods.ready) {
    _.warn('"exports.methods.ready" is deprecated, ' +
      'please use "exports.created" instead')
    component.methods.ready.call(vm)
  }
}

/**
 * ViewModel constructor
 *
 * @param {string} type
 * @param {object} parentVm   which contains _app
 * @param {object} parentEl   root element or frag block
 * @param {object} mergedData external data
 * @param {object} externalEvents external events
 */
export default function Vm(
  type,
  parentVm,
  parentEl,
  mergedData,
  externalEvents
) {
  this._parent = parentVm._realParent ? parentVm._realParent : parentVm
  this._app = parentVm._app
  parentVm._childrenVms && parentVm._childrenVms.push(this)

  const component = this._app.customComponentMap[type] || {}
  const data = component.data || {}

  this._options = component
  this._methods = component.methods || {}
  this._computed = component.computed || {}
  this._css = component.style || {}
  this._ids = {}
  this._watchers = []
  this._vmEvents = {}
  this._childrenVms = []
  this._type = type

  // bind events and lifecycles
  this._initEvents(externalEvents)

  _.debug(`"init" lifecycle in Vm(${this._type})`)
  this.$emit('hook:init')
  this._inited = true
  // proxy data and methods
  // observe data and add this to vms
  this._data = typeof data === 'function' ? data() : data
  if (mergedData) {
    _.extend(this._data, mergedData)
  }
  this._initScope()

  _.debug(`"created" lifecycle in Vm(${this._type})`)
  this.$emit('hook:created')
  this._created = true
  // backward old ready entry
  callOldReadyEntry(this, component)

  // if no parentElement then specify the documentElement
  this._parentEl = parentEl || this._app.doc.documentElement
  this._build()
}

_.extend(Vm.prototype, scope, compiler, directive, domHelper, events)
_.extend(Vm, {
  registerModules,
  registerMethods
})