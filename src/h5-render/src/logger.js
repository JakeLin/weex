var config = require('./config')

var logger = {
	log: function () {},
	warn: function () {},
	error: function () {}
}

function hijack() {
	if (console.log) {
		logger.log = function () {
			console.log.apply(
				console,
				['[h5-render]'].concat(Array.prototype.slice.call(arguments, 0))
			)
		}
	}

	if (console.warn) {
		logger.warn = function () {
			console.warn.apply(
				console,
				['[h5-render]'].concat(Array.prototype.slice.call(arguments, 0))
			)
		}
	}

	if (console.error) {
		logger.error = function () {
			console.error.apply(
				console,
				['[h5-render]'].concat(Array.prototype.slice.call(arguments, 0))
			)
		}
	}
}

if (config.debug && console) {
	hijack()
}

module.exports = logger