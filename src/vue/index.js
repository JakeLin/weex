var Vue = require('vue-next')

global.createInstance = function createInstance(
  instanceId, appCode, config /* {bundleUrl, debug} */, data) {
  // create weex instance
  callNative('http://localhost/public/weex/src/vue/demo.html?page=demo.js', [{module: 'dom', method: 'createBody', args: [{'ref': '_root', type: 'list', attr: {}, style: {}}]}])
  eval(appCode)
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
