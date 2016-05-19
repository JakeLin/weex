import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
const {
  expect
} = chai
chai.use(sinonChai)

import * as _ from '../../util'
import * as bundle from '../bundle'
import * as register from '../register'
import {
  Document
}
from '../dom'
import EventManager from '../event'
import Listener from '../dom-listener'
import Vm from '../../vm'
import pkg from '../../../package.json'

describe('parsing a bundle file', () => {
  const componentTemplate = {
    type: 'container',
    children: [{
      type: 'text',
      attr: {
        value: 'Hello World'
      }
    }]
  }

  after(() => {
    bundle.clearCommonModules()
  })

  describe('use define/bootstrap', () => {
    let app
    let callTasksSpy

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()

      let doc = new Document(id)
      let eventManager = new EventManager()
      let listener = new Listener(id, (tasks, callback) => {
        app.callTasks(tasks, callback)
      })
      doc.setEventManager(eventManager)
      doc.setListener(listener)

      app = {
        id,
        customComponentMap: {},
        doc,
        eventManager,
        listener,
        callbacks: {},
        callTasks: (tasks, callback) => {
          callTasksSpy(tasks)
          callback && callback()
        }
      }

      Object.assign(app, bundle)
    })

    beforeEach(() => {
      app.registerComponent = sinon.spy(register, 'registerComponent')
      app.requireComponent = sinon.spy(register, 'requireComponent')
      app.requireModule = sinon.spy(register, 'requireModule')
      Vm.registerModules = sinon.spy(register, 'registerModules')
    })

    afterEach(() => {
      callTasksSpy.reset()
      register.registerComponent.restore()
      register.requireComponent.restore()
      register.requireModule.restore()
      register.registerModules.restore()
    })

    describe('define', () => {
      it('a weex component', () => {
        app.define('@weex-component/a', (require, exports, module) => {
          module.exports = {
            template: componentTemplate
          }
        })

        expect(app.registerComponent.calledOnce).to.be.true
        expect(app.registerComponent.firstCall.args[0]).to.be.equal('a')
        expect(app.registerComponent.firstCall.args[1]).to.deep.equal({
          template: componentTemplate
        })
        expect(app.customComponentMap['a'].template)
          .to.deep.equal(componentTemplate)
      })

      it('a weex module', () => {
        const methods = [{
          name: 'createBody',
          args: []
        }]

        app.define('@weex-module/dom', (require, exports, module) => {
          module.exports = methods
        })

        expect(Vm.registerModules.calledOnce).to.be.true
        expect(Vm.registerModules.firstCall.args[0].dom)
          .to.deep.equal(methods)
      })

      it('a normal module', () => {
        app.define('./a', (require, exports, module) => {
          exports.version = '0.1'
        })
      })

      it('a npm module', () => {
        app.define('lib-httpurl', (require, exports, module) => {
          exports.version = '0.2'
        })
      })

      it('a CMD module', () => {
        app.define('kg/base', [], (require, exports, module) => {
          exports.version = '0.3'
        })
      })
    })

    describe('require', () => {
      it('a weex component', (done) => {
        app.define('@weex-component/b', (require, exports, module) => {
          var componentA = require('@weex-component/a')

          expect(app.requireComponent.calledOnce).to.be.true
          expect(app.requireComponent.firstCall.args[0]).to.be.equal('a')
          expect(componentA.template).to.be.equal(componentTemplate)
          done()
        })
      })

      it('a weex module', (done) => {
        app.define('@weex-component/c', (require, exports, module) => {
          const dom = require('@weex-module/dom')

          expect(app.requireModule.calledOnce).to.be.true
          expect(app.requireModule.firstCall.args[0]).to.be.equal('dom')
          expect(dom.createBody).to.be.a('function')
          done()
        })
      })

      it('a normal module', (done) => {
        app.define('@weex-component/d', (require, exports, module) => {
          const a = require('./a')

          expect(a.version).to.be.equal('0.1')
          done()
        })
      })

      it('a npm module', (done) => {
        app.define('@weex-component/e', (require, exports, module) => {
          const HttpUrl = require('lib-httpurl')

          expect(HttpUrl.version).to.be.equal('0.2')
          done()
        })
      })

      it('a CMD module', (done) => {
        app.define('kg/sample', ['kg/base'], (require, exports, module) => {
          const base = require('kg/base')

          expect(base.version).to.be.equal('0.3')
          done()
        })
      })
    })

    describe('bootstrap', () => {
      const ready = sinon.spy()

      before(() => {
        global.needTransformerVersion = '>=0.1 <1.0'
        app.define('@weex-component/main', (require, exports, module) => {
          module.exports = {
            template: componentTemplate,
            ready: ready
          }
        })
      })

      after(() => {
        global.needTransformerVersion = undefined
      })

      it('not a weex component', () => {
        const result = app.bootstrap('@weex-module/dom')
        expect(result).instanceof(Error)
      })

      it('a weex component', () => {
        const result = app.bootstrap(
          '@weex-component/main', {transformerVersion: '0.1.99'})

        expect(result).not.instanceof(Error)
        expect(callTasksSpy.calledTwice).to.be.true

        expect(ready.calledOnce).to.be.true

        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1.module).to.be.equal('dom')
        expect(task1.method).to.be.equal('createBody')
        expect(task1.args[0]).to.deep.equal({
          type: 'container',
          ref: '_root',
          attr: {},
          style: {}
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2.module).to.be.equal('dom')
        expect(task2.method).to.be.equal('addElement')
        expect(task2.args[1]).to.deep.equal({
          type: 'text',
          ref: '3',
          attr: {
            value: 'Hello World'
          },
          style: {}
        })
        expect(task2.args[0]).to.be.equal('_root')
        expect(task2.args[2]).to.be.equal(-1)
      })

      it('with a less wrong transformer version', () => {
        const result = app.bootstrap(
          '@weex-component/main', {transformerVersion: '0.0.1'})
        expect(result).instanceof(Error)
      })

      it('with a bigger wrong transformer version', () => {
        const result = app.bootstrap(
          '@weex-component/main', {transformerVersion: '9.9.9'})
        expect(result).instanceof(Error)
      })

    })
  })

  describe('use regsiter/render(backward compatibility)', () => {
    let app
    let callTasksSpy
    let readySpy
    let template = {
      type: 'container',
      children: [{
        type: 'text',
        attr: {
          value: 'Hello World'
        }
      },{
        type: 'custom'
      }]
    }

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()
      readySpy = sinon.spy()

      let doc = new Document(id)
      let eventManager = new EventManager()
      let listener = new Listener(id, (tasks, callback) => {
        app.callTasks(tasks, callback)
      })
      doc.setEventManager(eventManager)
      doc.setListener(listener)

      app = {
        id,
        customComponentMap: {},
        doc,
        eventManager,
        listener,
        callbacks: {},
        callTasks: (tasks, callback) => {
          callTasksSpy(tasks)
          callback && callback()
        }
      }

      Object.assign(app, bundle)
    })

    beforeEach(() => {
      app.registerComponent = sinon.spy(register, 'registerComponent')
      app.requireComponent = sinon.spy(register, 'requireComponent')
      app.requireModule = sinon.spy(register, 'requireModule')
      Vm.registerModules = sinon.spy(register, 'registerModules')
    })

    afterEach(() => {
      callTasksSpy.reset()
      register.registerComponent.restore()
      register.requireComponent.restore()
      register.requireModule.restore()
      register.registerModules.restore()
    })

    describe('register', () => {
      const readyfn = function () {
        readySpy(this)
      }

      it('a component', () => {
        app.register('custom', {
          template: componentTemplate,
          data: {
            b: 'c'
          },
          methods: {
            ready: readyfn
          }
        })


        app.register('main', {
          template: template,
          data: {
            a: 'b'
          },
          methods: {
            ready: readyfn
          }
        })

        expect(app.registerComponent.calledTwice).to.be.true

        expect(app.registerComponent.firstCall.args[0])
          .to.be.equal('custom')
        expect(app.registerComponent.firstCall.args[1]).to.deep.equal({
          template: componentTemplate,
          data: {
            b: 'c'
          },
          methods: {
            ready: readyfn
          }
        })
        expect(app.customComponentMap['custom'].template)
          .to.deep.equal(componentTemplate)

        expect(app.registerComponent.secondCall.args[0])
          .to.be.equal('main')
        expect(app.registerComponent.secondCall.args[1]).to.deep.equal({
          template: template,
          data: {
            a: 'b'
          },
          methods: {
            ready: readyfn
          }
        })
        expect(app.customComponentMap['main'].template)
          .to.deep.equal(template)
      })
    })

    describe('render', () => {
      it('a component', () => {
        app.render('main')

        expect(callTasksSpy.callCount).to.be.equal(4)

        expect(readySpy.calledTwice).to.be.true
        expect(readySpy.firstCall.args[0].a).to.be.equal('b')
        expect(readySpy.secondCall.args[0].b).to.be.equal('c')

        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1).to.deep.equal({
          module: 'dom',
          method: 'createBody',
          args: [{
            type: 'container',
            ref: '_root',
            attr: {},
            style: {}
          }]
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: ['_root', {
            type: 'text',
            ref: '3',
            attr: {
              value: 'Hello World'
            },
            style: {}
          }, -1]
        })

        const task3 = callTasksSpy.thirdCall.args[0][0]
        expect(task3).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: ['_root', {
            type: 'container',
            ref: '4',
            attr: {},
            style: {}
          }, -1]
        })

        const task4 = callTasksSpy.getCall(3).args[0][0]
        expect(task4).to.deep.equal({
          module: 'dom',
          method: 'addElement',
          args: ['4', {
            type: 'text',
            ref: '5',
            attr: {
              value: 'Hello World'
            },
            style: {}
          }, -1]
        })
      })
    })
  })

  describe('use define/require(backward compatibility)', () => {
    let app
    let callTasksSpy

    before(() => {
      const id = Date.now()
      callTasksSpy = sinon.spy()

      let doc = new Document(id)
      let eventManager = new EventManager()
      let listener = new Listener(id, (tasks, callback) => {
        app.callTasks(tasks, callback)
      })
      doc.setEventManager(eventManager)
      doc.setListener(listener)

      app = {
        id,
        customComponentMap: {},
        doc,
        eventManager,
        listener,
        callbacks: {},
        callTasks: (tasks, callback) => {
          callTasksSpy(tasks)
          callback && callback()
        }
      }

      Object.assign(app, bundle)
    })

    beforeEach(() => {
      app.registerComponent = sinon.spy(register, 'registerComponent')
      app.requireComponent = sinon.spy(register, 'requireComponent')
      app.requireModule = sinon.spy(register, 'requireModule')
      Vm.registerModules = sinon.spy(register, 'registerModules')
    })

    afterEach(() => {
      callTasksSpy.reset()
      register.registerComponent.restore()
      register.requireComponent.restore()
      register.requireModule.restore()
      register.registerModules.restore()
    })

    describe('define(old)', () => {
      it('a component', () => {
        app.define('main', (require, exports, module) => {
          module.exports = {
            template: componentTemplate
          }
        })

        expect(app.registerComponent.calledOnce).to.be.true
        expect(app.registerComponent.firstCall.args[0])
          .to.be.equal('main')
        expect(app.registerComponent.firstCall.args[1]).to.deep.equal({
          template: componentTemplate
        })
        expect(app.customComponentMap['main'].template)
          .to.deep.equal(componentTemplate)
      })
    })

    describe('require(old)', () => {
      it('a component', () => {
        app.require('main')()

        expect(callTasksSpy.calledTwice).to.be.true

        const task1 = callTasksSpy.firstCall.args[0][0]
        expect(task1.module).to.be.equal('dom')
        expect(task1.method).to.be.equal('createBody')
        expect(task1.args[0]).to.deep.equal({
          type: 'container',
          ref: '_root',
          attr: {},
          style: {}
        })

        const task2 = callTasksSpy.secondCall.args[0][0]
        expect(task2.module).to.be.equal('dom')
        expect(task2.method).to.be.equal('addElement')
        expect(task2.args[1]).to.deep.equal({
          type: 'text',
          ref: '3',
          attr: {
            value: 'Hello World'
          },
          style: {}
        })
        expect(task2.args[0]).to.be.equal('_root')
        expect(task2.args[2]).to.be.equal(-1)
      })
    })
  })
})
