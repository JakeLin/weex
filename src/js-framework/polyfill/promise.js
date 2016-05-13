const MSG = 'Using "Promise" is unexpected'

const UnexpectedPromise = function () {
  console.warn(MSG)

  this.then = () => {
    console.warn(MGS)
  }
}

UnexpectedPromise.all =
  UnexpectedPromise.race =
  UnexpectedPromise.resolve =
  UnexpectedPromise.reject = function () {
    console.warn(MSG)
  }

global.Promise = UnexpectedPromise