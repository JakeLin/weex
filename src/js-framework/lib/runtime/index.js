import frameworks from './frameworks'

const versionRegExp = /^\/\/ *(\{[^\}]*\}) *\r?\n/

function checkVersion (code) {
  let info
  const result = versionRegExp.exec(code)
  if (result) {
    try {
      info = JSON.parse(result[1])
    } catch (e) {}
  }
  return info
}

const instanceMap = {}

export function createInstance (id, code, config, data) {
  let info = instanceMap[id]
  if (!info) {
    info = checkVersion(code) || {}
    if (!frameworks[info.framework]) {
      info.framework = 'Weex'
    }
    instanceMap[id] = info
    return frameworks[info.framework].createInstance(id, code, config, data)
  }
  return new Error(`invalid instance id "${id}"`)
}

const methods = {
  createInstance
}

function genInit(methodName) {
  methods[methodName] = function (...args) {
    for (const name in frameworks) {
      const framework = frameworks[name]
      if (framework && framework[methodName]) {
        framework[methodName](...args)
      }
    }
  }
}

['registerComponents', 'registerModules', 'registerMethods'].forEach(genInit)

function genInstance(methodName) {
  methods[methodName] = function (...args) {
    const id = args[0]
    const info = instanceMap[id]
    if (info && frameworks[info.framework]) {
      return frameworks[info.framework][methodName](...args)
    }
    return new Error(`invalid instance id "${id}"`)
  }
}

['destroyInstance', 'refreshInstance', 'callJS', 'getRoot'].forEach(genInstance)

methods.receiveTasks = methods.callJS

export default methods
