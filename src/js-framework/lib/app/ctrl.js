/**
 * @fileOverview
 * instance controls from native
 *
 * - init bundle
 * - fire event
 * - callback
 * - destroy
 *
 * corresponded with the API of instance manager (framework.js)
 */

import * as _ from '../util'
import Listener from './dom-listener'

export function updateActions() {
  this.differ.flush()
  const tasks = []
  if (this.listener && this.listener.updates.length) {
    tasks.push(...this.listener.updates)
    this.listener.updates = []
  }
  if (tasks.length) {
    this.callTasks(tasks)
  }
}

export function init(code, data) {
  _.debug('Intialize an instance with', code, data)

  var result
  // @see: lib/app/bundle.js
  const define = _.bind(this.define, this)
  const bootstrap = (name, config, _data) => {
    result = this.bootstrap(name, config, _data || data)
    this.updateActions()
    this.doc.listener.createFinish()
    this.doc.close()
    _.debug(`After intialized an instance(${this.id})`)
  }

  // backward(register/render)
  const register = _.bind(this.register, this)
  const render = (name, _data) => {
    result = this.bootstrap(name, {}, _data)
  }

  const require = name => _data => {
    result = this.bootstrap(name, {}, _data)
  }

  const document = this.doc

  let functionBody
  /* istanbul ignore if */
  if (typeof code === 'function') {
    // `function () {...}` -> `{...}`
    // not very strict
    functionBody = code.toString().substr(12)
  } else if (code) {
    functionBody = code.toString()
  }

  let fn = new Function(
    'define',
    'require',
    'document',
    'bootstrap',
    'register',
    'render',
    '__weex_define__', // alias for define
    '__weex_bootstrap__', // alias for bootstrap
    functionBody
  )

  fn(
    define,
    require,
    document,
    bootstrap,
    register,
    render,
    define,
    bootstrap)

  return result
}

export function destroy() {
  _.debug(`Destory an instance(${this.id})`)

  this.id = ''
  this.eventManager = null
  this.options = null
  this.blocks = null
  this.vm = null
  this.doc = null
  this.customComponentMap = null
  this.callbacks = null
}

export function getRootElement() {
  const doc = this.doc || {}
  const body = doc.body || {}
  return body.toJSON ? body.toJSON() : {}
}

export function fireEvent(ref, type, e, domChanges) {
  _.debug(`Fire a "${type}" event on an element(${ref})`,
            `in instance(${this.id})`)

  if (Array.isArray(ref)) {
    ref.some((ref) => {
      return this.fireEvent(ref, type, e) !== false
    })
    return
  }

  const el = this.doc.getRef(ref)

  if (el) {
    e = e || {}
    e.type = type
    e.target = el
    e.timestamp = Date.now()
    if (domChanges) {
      updateElement(el, domChanges)
    }
    const result = this.eventManager.fire(el, type, e)
    this.updateActions()
    this.doc.listener.updateFinish()
    return result
  }

  return new Error(`invalid element reference "${ref}"`)
}

export function callback(callbackId, data, ifKeepAlive) {
  _.debug(`Invoke a callback(${callbackId}) with`, data,
            `in instance(${this.id})`)

  const callback = this.callbacks[callbackId]

  if (typeof callback === 'function') {
    callback(data) // data is already a object, @see: lib/framework.js

    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
      this.callbacks[callbackId] = undefined
    }

    this.updateActions()
    this.doc.listener.updateFinish()
    return
  }

  return new Error(`invalid callback id "${callbackId}"`)
}

export function refreshData(data) {
  _.debug(`Refresh with`, data,
            `in instance[${this.id}]`)

  const vm = this.vm

  if (vm && data) {
    if (typeof vm.refreshData === 'function') {
      vm.refreshData(data)
    } else {
      _.extend(vm, data)
    }
    this.updateActions()
    this.doc.listener.refreshFinish()
    return
  }

  return new Error(`invalid data "${data}"`)
}

function updateElement(el, changes) {
  const attrs = changes.attrs || {}
  for (const name in attrs) {
    el.setAttr(name, attrs)
  }
  const style = changes.style || {}
  for (const name in style) {
    el.setStyle(name, style[name])
  }
}

