import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import '../index'

const {
  expect
} = chai

describe('a polyfill of', () => {
  it('Promise', () => {
    sinon.stub(console, 'warn')
    expect(typeof Promise).to.be.equal('function')
    new Promise(sinon.spy()).then(sinon.spy())
    Promise.all()
    Promise.race()
    Promise.resolve()
    Promise.reject()
    expect(console.warn.callCount).to.be.equal(6)
    console.warn.restore()
  })

  it('Object.assign', () => {
    expect(typeof Object.assign).to.be.equal('function')
  })

  it('setTimeout', () => {
    expect(typeof setTimeout).to.be.equal('function')
  })

  it('console.log', () => {
    expect(typeof console.log).to.be.equal('function')
  })
})