// todo:
// - register components
// - fire event
// - callback
// - append="tree|node"
// - return callback
// - get root dom

var Vue = require('vue-next')
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
      delete global.__TMP_WEEX_INSTANCE_ID__
      delete global.__TMP_WEEX_INSTANCE_CONFIG__
      delete global.__TMP_WEEX_INSTANCE_DATA__
      this.$instanceId = instanceId
      options.instanceId = instanceId
      options.globalConfig = config
      const dataOption = options.data
      const data = typeof dataOption === 'function' ? dataOption() : dataOption
      options.data = Object.assign(data, externalData)
    }

    if (!options.globalConfig &&
      (parentOptions && parentOptions.globalConfig)) {
      options.globalConfig = parentOptions.globalConfig
    }
  }

  return Vue
}

Vue = overrideVue(Vue)

global.createInstance = function createInstance(
  instanceId, appCode, config /* {bundleUrl, debug} */, data) {

  global.__TMP_WEEX_INSTANCE_ID__ = instanceId
  global.__TMP_WEEX_INSTANCE_CONFIG__ = config
  global.__TMP_WEEX_INSTANCE_DATA__ = data

  const methodConfig = {callbacks: [], uid: 1}
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
  start(Vue, requireNativeModule)
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
  // destroy weex instance
  console.log('destroyInstance', instanceId)
}

global.refreshInstance = function refreshInstance(instanceId, data) {
  // refresh weex instance
  console.log('refreshInstance', instanceId)
}

global.callJS = function callJS(instanceId, tasks) {
  // handle events and callbacks
  console.log('callJS', instanceId, tasks)
}

global.getRoot = function getRoot(instanceId) {
  // return root virtual dom node
  console.log('getRoot', window.body)
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
