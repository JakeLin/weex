// todo:
// - register components
// - register modules
// - fire event
// - callback
// - append="tree|node"
// - return callback
// - get root dom

var Vue = require('vue-next')

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
      console.log(options.data)
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

  // create weex instance
  callNative(instanceId, [{module: 'dom', method: 'createBody',
    args: [{'ref': '_root', type: 'list', attr: {}, style: {}}]}])

  const start = new Function('Vue', appCode)
  global.__TMP_WEEX_INSTANCE_ID__ = instanceId
  global.__TMP_WEEX_INSTANCE_CONFIG__ = config
  global.__TMP_WEEX_INSTANCE_DATA__ = data
  start(Vue)
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

global.registerModules = function registerModules(modules) {
  // register all modules & methods
  console.log('registerModules', modules)
}

global.registerComponents = function registerComponents(components) {
  // register all components
  console.log('registerComponents', components)
}

// global.callNative = function callNative() {}
