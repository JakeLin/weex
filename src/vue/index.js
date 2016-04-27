// todo:
// - register components
// - fire event
// - callback
// - append="tree|node"
// - return callback
// - get root dom

var Vue = require('vue')
var Node = global.WeexNode

function overrideVue(Vue) {
  // override init and inject vuex init procedure
  const _init = Vue.prototype._init
  Vue.prototype._init = function (options = {}) {
    options.init = options.init ? [wxInit].concat(options.init) : wxInit
    _init.call(this, options)
  }

  function wxInit () {
    const options = this.$options
    const parentOptions = options.parent && options.parent.$options

    if (options.el) { // root vm
      const instanceId = global.__TMP_WEEX_INSTANCE_ID__
      const config = global.__TMP_WEEX_INSTANCE_CONFIG__
      const externalData = global.__TMP_WEEX_INSTANCE_DATA__
      const methodConfig = global.__TMP_WEEX_INSTANCE_METHOD_CONFIG__
      delete global.__TMP_WEEX_INSTANCE_ID__
      delete global.__TMP_WEEX_INSTANCE_CONFIG__
      delete global.__TMP_WEEX_INSTANCE_DATA__
      delete global.__TMP_WEEX_INSTANCE_METHOD_CONFIG__
      this.$instanceId = instanceId
      options.instanceId = instanceId
      options.globalConfig = config
      options.methodConfig = methodConfig
      const dataOption = options.data
      const data = typeof dataOption === 'function' ? dataOption() : dataOption
      options.data = Object.assign(data, externalData)
    }

    if (!options.globalConfig &&
      (parentOptions && parentOptions.globalConfig)) {
      options.globalConfig = parentOptions.globalConfig
    }

    if (!options.methodConfig &&
      (parentOptions && parentOptions.methodConfig)) {
      options.methodConfig = parentOptions.methodConfig
    }
  }

  return Vue
}

Vue = overrideVue(Vue)

const globalMethodConfig = {}
const globalInstance = {}

global.createInstance = function createInstance(
  instanceId, appCode, config /* {bundleUrl, debug} */, data) {
  const methodConfig = {callbacks: [], events: [], uid: 1}
  globalMethodConfig[instanceId] = methodConfig

  global.__TMP_WEEX_INSTANCE_ID__ = instanceId
  global.__TMP_WEEX_INSTANCE_CONFIG__ = config
  global.__TMP_WEEX_INSTANCE_DATA__ = data
  global.__TMP_WEEX_INSTANCE_METHOD_CONFIG__ = methodConfig

  function requireNativeModule(name) {
    const nativeModule = nativeModules[name] || []
    const output = {}
    for (const methodName in nativeModule) {
      const defaultArgs = nativeModule[methodName]
      output[methodName] = (...args) => {
        const finalArgs = []
        defaultArgs.forEach((arg, index) => {
          const value = args[index]
          finalArgs[index] = normalize(value, methodConfig)
        })
        callNative(instanceId, [{module: name, method: methodName, args: finalArgs}])
      }
    }
    return output
  }

  // create weex instance
  callNative(instanceId, [{module: 'dom', method: 'createBody',
    args: [{'ref': '_root', type: 'list', attr: {}, style: {}}]}])

  const start = new Function('Vue', '__weex_require_module__', appCode)
  const subVue = Vue.extend({})
  const instance = start(subVue, requireNativeModule)
  globalInstance[instanceId] = instance
}

function normalize(v, config) {
  var type = typof(v)

  switch (type) {
    case 'undefined':
    case 'null':
      return ''
    case 'regexp':
      return v.toString()
    case 'date':
      return v.toISOString()
    case 'number':
    case 'string':
    case 'boolean':
    case 'array':
    case 'object':
      if (v instanceof Node) {
        return v.ref
      }
      return v
    case 'function':
      config.callbacks[++config.uid] = v
      return config.uid.toString()
    default:
      return JSON.stringify(v)
  }
}

global.destroyInstance = function destroyInstance(instanceId) {
  const instance = globalInstance[instanceId]
  delete globalInstance[instanceId]
  delete globalMethodConfig[instanceId]
  instance.$destroy()
}

global.refreshInstance = function refreshInstance(instanceId, data) {
  const instance = globalInstance[instanceId]
  for (const key in data) {
    Vue.set(instance, key, data[key])
  }
}

global.getRoot = function getRoot(instanceId) {
  const instance = globalInstance[instanceId]
  return 'getRoot', instance.$el.toJSON()
}

global.callJS = function callJS(instanceId, tasks) {
  const methodConfig = globalMethodConfig[instanceId] || {}

  tasks.forEach(task => {
    const args = task.args

    if (task.method === 'fireEvent') {
      const nodeId = args[0]
      const type = args[1]
      const e = args[2] || {}
      const node = methodConfig.events[nodeId]
      const context = node.context
      const handlers = node.handlers[type]

      e.type = type
      e.target = node.el
      e.timestamp = Date.now()

      handlers.forEach(handle => {
        handle.call(context, e)
      })
    }

    if (task.method === 'callback') {
      const callbackId = args[0]
      const data = args[1]
      const ifKeepAlive = args[2]
      const callback = methodConfig.callbacks[callbackId]

      if (typeof callback === 'function') {
        callback(data) // data is already a object, @see: lib/framework.js

        if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
          methodConfig.callbacks[callbackId] = undefined
        }
      }
    }
  })
}

const nativeModules = {}

global.registerModules = function registerModules(modules) {
  for (const name in modules) {
    if (!nativeModules[name]) {
      nativeModules[name] = {}
    }
    modules[name].forEach(method => {
      nativeModules[name][method.name] = method.args
    })
  }
}

const nativeComponents = {}

global.registerComponents = function registerComponents(components) {
  const config = Vue.config
  const newComponents = {}
  if (Array.isArray(components)) {
    components.forEach(component =>  {
      if (!component) {
        return
      }
      if (typeof component === 'string') {
        nativeComponents[component] = true
        newComponents[component] = true
      } else if (typeof component === 'object' && typeof component.type === 'string') {
        nativeComponents[component.type] = component
        newComponents[component.type] = true
      }
    })
    const oldIsReservedTag = config.isReservedTag
    config.isReservedTag = name => {
      return newComponents[name] || oldIsReservedTag(name)
    }
  }
}

// global.callNative = function callNative() {}
