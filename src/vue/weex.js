(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue"] = factory();
	else
		root["Vue"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1)['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(2);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _patch = __webpack_require__(31);
	
	var _nodeOps = __webpack_require__(32);
	
	var nodeOps = _interopRequireWildcard(_nodeOps);
	
	var _index3 = __webpack_require__(34);
	
	var _index4 = _interopRequireDefault(_index3);
	
	var _index5 = __webpack_require__(35);
	
	var _index6 = _interopRequireDefault(_index5);
	
	var _index7 = __webpack_require__(37);
	
	var _index8 = _interopRequireDefault(_index7);
	
	var _util = __webpack_require__(43);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// install platform specific utils
	_index2.default.config.isUnknownElement = _util.isUnknownElement;
	_index2.default.config.isReservedTag = _util.isReservedTag;
	
	// install platform runtime directives
	_index2.default.options.directives = _index4.default;
	
	// install platform patch function
	var modules = _index6.default.concat(_index8.default);
	_index2.default.prototype.__patch__ = (0, _patch.createPatchFunction)({ nodeOps: nodeOps, modules: modules });
	
	// wrap mount
	_index2.default.prototype.$mount = function (el) {
	  this.$el = el && (0, _util.query)(el, this.$instanceId);
	  this._mount();
	};
	
	exports.default = _index2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _index = __webpack_require__(3);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _index3 = __webpack_require__(26);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _index3.initGlobalAPI)(_index2.default);
	
	_index2.default.version = '2.0.0-alpha.0';
	
	exports.default = _index2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vue;
	
	var _proxy = __webpack_require__(4);
	
	var _state = __webpack_require__(16);
	
	var _render = __webpack_require__(19);
	
	var _events = __webpack_require__(25);
	
	var _lifecycle = __webpack_require__(23);
	
	var _index = __webpack_require__(5);
	
	var uid = 0;
	
	function Vue(options) {
	  this._init(options);
	}
	
	Vue.prototype._init = function (options) {
	  // a uid
	  this._uid = uid++;
	  // a flag to avoid this being observed
	  this._isVue = true;
	  // merge options
	  this.$options = (0, _index.mergeOptions)(this.constructor.options, options || {}, this);
	  if (true) {
	    (0, _proxy.initProxy)(this);
	  } else {
	    this._renderProxy = this;
	  }
	  (0, _lifecycle.initLifecycle)(this);
	  (0, _events.initEvents)(this);
	  (0, _lifecycle.callHook)(this, 'init');
	  (0, _state.initState)(this);
	  (0, _lifecycle.callHook)(this, 'created');
	  (0, _render.initRender)(this);
	};
	
	Vue.prototype.$nextTick = function (fn) {
	  (0, _index.nextTick)(fn, this);
	};
	
	(0, _state.stateMixin)(Vue);
	(0, _events.eventsMixin)(Vue);
	(0, _lifecycle.lifecycleMixin)(Vue);
	(0, _render.renderMixin)(Vue);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initProxy = undefined;
	
	var _index = __webpack_require__(5);
	
	var hasProxy = void 0,
	    proxyHandlers = void 0,
	    initProxy = void 0;
	
	if (true) {
	  (function () {
	    var allowedGlobals = (0, _index.makeMap)('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl');
	
	    hasProxy = typeof Proxy !== 'undefined' && Proxy.toString().match(/native code/);
	
	    proxyHandlers = {
	      has: function has(target, key) {
	        var has = key in target;
	        var isAllowedGlobal = allowedGlobals(key);
	        if (!has && !isAllowedGlobal) {
	          (0, _index.warn)('Trying to access non-existent property "' + key + '" while rendering.', target);
	        }
	        return !isAllowedGlobal;
	      }
	    };
	
	    exports.initProxy = initProxy = function initProxy(vm) {
	      if (hasProxy) {
	        vm._renderProxy = new Proxy(vm, proxyHandlers);
	      } else {
	        vm._renderProxy = vm;
	      }
	    };
	  })();
	}
	
	exports.initProxy = initProxy;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(6);
	
	Object.keys(_util).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _util[key];
	    }
	  });
	});
	
	var _lang = __webpack_require__(7);
	
	Object.keys(_lang).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _lang[key];
	    }
	  });
	});
	
	var _env = __webpack_require__(8);
	
	Object.keys(_env).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _env[key];
	    }
	  });
	});
	
	var _options = __webpack_require__(9);
	
	Object.keys(_options).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _options[key];
	    }
	  });
	});
	
	var _debug = __webpack_require__(11);
	
	Object.keys(_debug).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _debug[key];
	    }
	  });
	});
	
	var _props = __webpack_require__(15);
	
	Object.keys(_props).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _props[key];
	    }
	  });
	});
	
	var _index = __webpack_require__(12);
	
	Object.defineProperty(exports, 'defineReactive', {
	  enumerable: true,
	  get: function get() {
	    return _index.defineReactive;
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.renderString = renderString;
	exports.makeMap = makeMap;
	exports.remove = remove;
	exports.hasOwn = hasOwn;
	exports.isPrimitive = isPrimitive;
	exports.cached = cached;
	exports.bind = bind;
	exports.toArray = toArray;
	exports.extend = extend;
	exports.isObject = isObject;
	exports.isPlainObject = isPlainObject;
	/**
	 * Convert a value to a string that is actually rendered.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	
	function renderString(val) {
	  return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 *
	 * @param {String} str
	 * @param {Boolean} expectsLowerCase
	 * @return {Function}
	 */
	
	function makeMap(str, expectsLowerCase) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase ? function (val) {
	    return map[val.toLowerCase()];
	  } : function (val) {
	    return map[val];
	  };
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	
	var isBuiltInTag = exports.isBuiltInTag = makeMap('slot,component,render,transition', true);
	
	/**
	 * Remove an item from an array
	 *
	 * @param {Array} arr
	 * @param {*} item
	 */
	
	function remove(arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1);
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if value is primitive
	 *
	 * @param {*} value
	 * @return {Boolean}
	 */
	
	function isPrimitive(value) {
	  return typeof value === 'string' || typeof value === 'number';
	}
	
	/**
	 * Create a cached version of a pure function.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cached(fn) {
	  var cache = Object.create(null);
	  return function cachedFn(str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str));
	  };
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	var camelize = exports.camelize = cached(function (str) {
	  return str.replace(camelizeRE, toUpper);
	});
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	var hyphenate = exports.hyphenate = cached(function (str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	});
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  for (var key in from) {
	    to[key] = from[key];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = Array.isArray;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isReserved = isReserved;
	exports.def = def;
	exports.parsePath = parsePath;
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	
	var bailRE = /[^\w\.]/;
	function parsePath(path) {
	  if (bailRE.test(path)) {
	    return;
	  } else {
	    path = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < path.length; i++) {
	        if (!obj) return;
	        obj = obj[path[i]];
	      }
	      return obj;
	    };
	  }
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global MutationObserver */
	
	// can we use __proto__?
	var hasProto = exports.hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = exports.inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	// detect devtools
	var devtools = exports.devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
	var isWechat = UA && UA.indexOf('micromessenger') > 0;
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = exports.nextTick = function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined' && !(isWechat && isIos)) {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function timerFunc() {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    // webpack attempts to inject a shim for setImmediate
	    // if it is used as a global, so we have to work around that to
	    // avoid bundling unnecessary code.
	    var context = inBrowser ? window : typeof global !== 'undefined' ? global : {};
	    timerFunc = context.setImmediate || setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	}();
	
	var _Set = void 0;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && Set.toString().match(/native code/)) {
	  // use native Set when available.
	  exports._Set = _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  exports._Set = _Set = function _Set() {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}
	
	exports._Set = _Set;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mergeOptions = mergeOptions;
	exports.resolveAsset = resolveAsset;
	
	var _index = __webpack_require__(3);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _debug = __webpack_require__(11);
	
	var _index3 = __webpack_require__(12);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = _config2.default.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!(0, _util.hasOwn)(to, key)) {
	      (0, _index3.set)(to, key, fromVal);
	    } else if ((0, _util.isObject)(toVal) && (0, _util.isObject)(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      ("development") !== 'production' && (0, _debug.warn)('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    ("development") !== 'production' && (0, _debug.warn)('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	function mergeHook(parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : (0, _util.isArray)(childVal) ? childVal : [childVal] : parentVal;
	}
	
	_config2.default._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? (0, _util.extend)(res, childVal) : res;
	}
	
	_config2.default._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  (0, _util.extend)(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !(0, _util.isArray)(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  (0, _util.extend)(ret, parentVal);
	  (0, _util.extend)(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components;
	    var def;
	    for (var key in components) {
	      if ((0, _util.isBuiltInTag)(key) || _config2.default.isReservedTag(key)) {
	        ("development") !== 'production' && (0, _debug.warn)('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if ((0, _util.isPlainObject)(def)) {
	        components[key] = _index2.default.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  if (!props) return;
	  var res = {};
	  var i = void 0,
	      val = void 0,
	      name = void 0;
	  if ((0, _util.isArray)(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = (0, _util.camelize)(val);
	        res[name] = { type: null };
	      } else if (true) {
	        (0, _debug.warn)('props must be strings when using array syntax.');
	      }
	    }
	  } else if ((0, _util.isPlainObject)(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = (0, _util.camelize)(key);
	      res[name] = (0, _util.isPlainObject)(val) ? val : { type: val };
	    }
	  }
	  options.props = res;
	}
	
	function guardDirectives(options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      if (typeof dirs[key] === 'function') {
	        dirs[key] = { update: dirs[key] };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  guardDirectives(child);
	  if (true) {
	    if (child.propsData && !vm) {
	      (0, _debug.warn)('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!(0, _util.hasOwn)(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = (0, _util.camelize)(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (("development") !== 'production' && warnMissing && !res) {
	    (0, _debug.warn)('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	
	  /**
	   * Preserve whitespaces between elements.
	   */
	
	  preserveWhitespace: true,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	
	  isReservedTag: function isReservedTag() {
	    return false;
	  },
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	
	  isUnknownElement: function isUnknownElement() {
	    return false;
	  },
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'transition'],
	
	  /**
	   * List of lifecycle hooks.
	   *
	   * @type {Array}
	   */
	
	  _lifecycleHooks: ['init', 'created', 'beforeMount', 'mounted', 'ready', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed'],
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.warn = undefined;
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warn = void 0;
	var formatComponentName = void 0;
	
	if (true) {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	
	    exports.warn = warn = function warn(msg, vm) {
	      if (hasConsole && !_config2.default.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };
	
	    formatComponentName = function formatComponentName(vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + (0, _util.hyphenate)(name) + '>)' : '';
	    };
	  })();
	}
	
	exports.warn = warn;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.observerState = undefined;
	exports.Observer = Observer;
	exports.observe = observe;
	exports.defineReactive = defineReactive;
	exports.set = set;
	exports.del = del;
	exports.proxy = proxy;
	exports.unproxy = unproxy;
	
	var _dep = __webpack_require__(13);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _array = __webpack_require__(14);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var arrayKeys = Object.getOwnPropertyNames(_array.arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	
	var observerState = exports.observerState = {
	  shouldConvert: true
	};
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new _dep2.default();
	  (0, _index.def)(value, '__ob__', this);
	  if ((0, _index.isArray)(value)) {
	    var augment = _index.hasProto ? protoAugment : copyAugment;
	    augment(value, _array.arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  for (var key in obj) {
	    this.convert(key, obj[key]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  (0, _index.remove)(this.vms, vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */
	
	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    (0, _index.def)(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!(0, _index.isObject)(value)) {
	    return;
	  }
	  var ob;
	  if ((0, _index.hasOwn)(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (observerState.shouldConvert && ((0, _index.isArray)(value) || (0, _index.isPlainObject)(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new _dep2.default();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (_dep2.default.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if ((0, _index.isArray)(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	function set(obj, key, val) {
	  if ((0, _index.isArray)(obj)) {
	    return obj.splice(key, 1, val);
	  }
	  if ((0, _index.hasOwn)(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      proxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!(0, _index.hasOwn)(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj.$forceUpdate();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      unproxy(vm, key);
	      vm.$forceUpdate();
	    }
	  }
	}
	
	function proxy(vm, key) {
	  if (!(0, _index.isReserved)(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter() {
	        return vm._data[key];
	      },
	      set: function proxySetter(val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}
	
	function unproxy(vm, key) {
	  if (!(0, _index.isReserved)(key)) {
	    delete vm[key];
	  }
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Dep;
	
	var _index = __webpack_require__(5);
	
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	function Dep() {
	  this.id = uid++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  (0, _index.remove)(this.subs, sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.arrayMethods = undefined;
	
	var _index = __webpack_require__(5);
	
	var arrayProto = Array.prototype;
	var arrayMethods = exports.arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  (0, _index.def)(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.validateProp = validateProp;
	
	var _util = __webpack_require__(6);
	
	var _index = __webpack_require__(12);
	
	var _debug = __webpack_require__(11);
	
	function validateProp(vm, key, propsData) {
	  if (!propsData) return;
	  var prop = vm.$options.props[key];
	  var absent = (0, _util.hasOwn)(propsData, key);
	  var value = propsData[key];
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    _index.observerState.shouldConvert = true;
	    (0, _index.observe)(value);
	    _index.observerState.shouldConvert = false;
	  }
	  if (true) {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value;
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */
	
	function getPropDefaultValue(vm, prop, name) {
	  // no default, return undefined
	  if (!(0, _util.hasOwn)(prop, 'default')) {
	    // absent boolean value defaults to false
	    return prop.type === Boolean ? false : undefined;
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ((0, _util.isObject)(def)) {
	    ("development") !== 'production' && (0, _debug.warn)('Invalid default value for prop "' + name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function ? def.call(vm) : def;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {String} name
	 * @param {*} value
	 * @param {Vue} vm
	 * @param {Boolean} absent
	 */
	
	function assertProp(prop, name, value, vm, absent) {
	  if (prop.required && absent) {
	    ("development") !== 'production' && (0, _debug.warn)('Missing required prop: "' + name + '"', vm);
	    return false;
	  }
	  if (value == null) {
	    return true;
	  }
	  var type = prop.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!(0, _util.isArray)(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (true) {
	      (0, _debug.warn)('Invalid prop: type check failed for prop "' + name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      ("development") !== 'production' && (0, _debug.warn)('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */
	
	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = (0, _util.isPlainObject)(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = (0, _util.isArray)(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}
	
	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */
	
	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}
	
	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initState = initState;
	exports.stateMixin = stateMixin;
	
	var _watcher = __webpack_require__(17);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _dep = __webpack_require__(13);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _index = __webpack_require__(12);
	
	var _index2 = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initState(vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	  initWatch(vm);
	}
	
	function initProps(vm) {
	  var props = vm.$options.props;
	  var propsData = vm.$options.propsData;
	  if (props) {
	    var keys = vm.$options.propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    _index.observerState.shouldConvert = isRoot;
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      (0, _index.defineReactive)(vm, key, (0, _index2.validateProp)(vm, key, propsData));
	    }
	    _index.observerState.shouldConvert = true;
	  }
	}
	
	function initData(vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function' ? data() : data || {};
	  if (!(0, _index2.isPlainObject)(data)) {
	    data = {};
	    ("development") !== 'production' && (0, _index2.warn)('data functions should return an object.', vm);
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    (0, _index.proxy)(vm, keys[i]);
	  }
	  // observe data
	  (0, _index.observe)(data, vm);
	}
	
	function noop() {}
	
	function initComputed(vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = makeComputedGetter(userDef, vm);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, vm) : (0, _index2.bind)(userDef.get, vm) : noop;
	        def.set = userDef.set ? (0, _index2.bind)(userDef.set, vm) : noop;
	      }
	      Object.defineProperty(vm, key, def);
	    }
	  }
	}
	
	function makeComputedGetter(getter, owner) {
	  var watcher = new _watcher2.default(owner, getter, null, {
	    lazy: true
	  });
	  return function computedGetter() {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (_dep2.default.target) {
	      watcher.depend();
	    }
	    return watcher.value;
	  };
	}
	
	function initMethods(vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = (0, _index2.bind)(methods[key], vm);
	    }
	  }
	}
	
	function initWatch(vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if ((0, _index2.isArray)(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}
	
	function createWatcher(vm, key, handler) {
	  var options = void 0;
	  if ((0, _index2.isPlainObject)(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}
	
	function stateMixin(Vue) {
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        setData(this, newData);
	      }
	    }
	  });
	
	  Vue.prototype.$watch = function (fn, cb, options) {
	    options = options || {};
	    options.user = true;
	    var watcher = new _watcher2.default(this, fn, cb, options);
	    if (options.immediate) {
	      cb.call(this, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	}
	
	function setData(vm, newData) {
	  newData = newData || {};
	  var oldData = vm._data;
	  vm._data = newData;
	  var keys, key, i;
	  // unproxy keys not present in new data
	  keys = Object.keys(oldData);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (!(key in newData)) {
	      (0, _index.unproxy)(vm, key);
	    }
	  }
	  // proxy keys not already proxied,
	  // and trigger change for changed values
	  keys = Object.keys(newData);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (!(0, _index2.hasOwn)(vm, key)) {
	      // new property
	      (0, _index.proxy)(vm, key);
	    }
	  }
	  oldData.__ob__.removeVm(vm);
	  (0, _index.observe)(newData, vm);
	  vm.$forceUpdate();
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Watcher;
	
	var _dep = __webpack_require__(13);
	
	var _dep2 = _interopRequireDefault(_dep);
	
	var _batcher = __webpack_require__(18);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var uid = 0;
	var prevTarget = void 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    (0, _index.extend)(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _index._Set();
	  this.newDepIds = new _index._Set();
	  // parse expression for getter
	  if (isFn) {
	    this.getter = expOrFn;
	  } else {
	    this.getter = (0, _index.parsePath)(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      ("development") !== 'production' && (0, _index.warn)('Failed watching path: ' + expOrFn + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
	    }
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  prevTarget = _dep2.default.target;
	  _dep2.default.target = this;
	};
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  _dep2.default.target = prevTarget;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    (0, _batcher.pushWatcher)(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    ((0, _index.isObject)(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      this.cb.call(this.vm, value, oldValue);
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = _dep2.default.target;
	  this.value = this.get();
	  this.dirty = false;
	  _dep2.default.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      (0, _index.remove)(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 * @param {Set} seen
	 */
	
	var seenObjects = new _index._Set();
	function traverse(val, seen) {
	  var i = void 0,
	      keys = void 0,
	      isA = void 0,
	      isO = void 0;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  isA = (0, _index.isArray)(val);
	  isO = (0, _index.isObject)(val);
	  if (isA || isO) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i], seen);
	      }
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) {
	        traverse(val[keys[i]], seen);
	      }
	    }
	  }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pushWatcher = pushWatcher;
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	
	var queueIndex;
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  queue.sort(queueSorter);
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  resetBatcherState();
	}
	
	/**
	 * Sort queue before flush.
	 * This ensures components are updated from parent to child
	 * so there will be no duplicate updates, e.g. a child was
	 * pushed into the queue first and then its parent's props
	 * changed.
	 */
	
	function queueSorter(a, b) {
	  return a.id - b.id;
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (queueIndex = 0; queueIndex < queue.length; queueIndex++) {
	    var watcher = queue[queueIndex];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (("development") !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > _config2.default._maxUpdateCount) {
	        (0, _index.warn)('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    if (internalQueueDepleted && !watcher.user) {
	      // an internal watcher triggered by a user watcher...
	      // let's run it immediately after current user watcher is done.
	      userQueue.splice(queueIndex + 1, 0, watcher);
	    } else {
	      // push watcher into appropriate queue
	      var q = watcher.user ? userQueue : queue;
	      has[id] = q.length;
	      q.push(watcher);
	      // queue the flush
	      if (!waiting) {
	        waiting = true;
	        (0, _index.nextTick)(flushBatcherQueue);
	      }
	    }
	  }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderState = undefined;
	exports.initRender = initRender;
	exports.renderMixin = renderMixin;
	
	var _createElement = __webpack_require__(20);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _helpers = __webpack_require__(24);
	
	var _util = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var renderState = exports.renderState = {
	  activeInstance: null
	};
	
	function initRender(vm) {
	  vm._vnode = null;
	  vm._mounted = false;
	  vm._staticTrees = null;
	  vm.$slots = {};
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = (0, _util.bind)(_createElement2.default, vm);
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}
	
	function renderMixin(Vue) {
	  Vue.prototype._render = function () {
	    var prev = renderState.activeInstance;
	    renderState.activeInstance = this;
	    var _$options = this.$options;
	    var render = _$options.render;
	    var _renderChildren = _$options._renderChildren;
	    // resolve slots. becaues slots are rendered in parent scope,
	    // we set the activeInstance to parent.
	
	    if (_renderChildren) {
	      resolveSlots(this, _renderChildren);
	    }
	    // render self
	    var vnode = render.call(this._renderProxy);
	    // restore render state
	    renderState.activeInstance = prev;
	    return vnode;
	  };
	
	  // shorthands used in render functions
	  Vue.prototype.__h__ = _createElement2.default;
	
	  // toString for mustaches
	  Vue.prototype.__toString__ = _util.renderString;
	
	  // render v-for
	  Vue.prototype.__renderList__ = function (val, render) {
	    var ret = void 0,
	        i = void 0,
	        l = void 0,
	        keys = void 0,
	        key = void 0;
	    if ((0, _util.isArray)(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i, i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i, i);
	      }
	    } else if ((0, _util.isObject)(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], i, key);
	      }
	    }
	    return ret;
	  };
	
	  // register ref
	  Vue.prototype.__registerRef__ = function (key, ref, vFor, remove) {
	    var refs = this.$refs;
	    if (remove) {
	      if (vFor) {
	        remove(refs[key], ref);
	      } else {
	        refs[key] = undefined;
	      }
	    } else {
	      if (vFor) {
	        if (refs[key]) {
	          refs[key].push(ref);
	        } else {
	          refs[key] = [ref];
	        }
	      } else {
	        refs[key] = ref;
	      }
	    }
	  };
	}
	
	function resolveSlots(vm, children) {
	  if (children) {
	    children = (0, _helpers.flatten)((0, _util.isArray)(children) ? children : children());
	    var slots = { default: children };
	    var i = children.length;
	    var name = void 0,
	        child = void 0;
	    while (i--) {
	      child = children[i];
	      if (name = child.data && child.data.slot) {
	        var slot = slots[name] || (slots[name] = []);
	        if (child.tag === 'template') {
	          slot.push.apply(slot, child.children);
	        } else {
	          slot.push(child);
	        }
	        children.splice(i, 1);
	      }
	    }
	    vm.$slots = slots;
	  }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createElement;
	
	var _vnode = __webpack_require__(21);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _createComponent = __webpack_require__(22);
	
	var _helpers = __webpack_require__(24);
	
	var _render = __webpack_require__(19);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createElement(tag, data, children, namespace) {
	  var context = this;
	  var parent = _render.renderState.activeInstance;
	  if (typeof tag === 'string') {
	    var Ctor = void 0;
	    if (_config2.default.isReservedTag(tag)) {
	      return (0, _vnode2.default)(tag, data, (0, _helpers.flatten)(children), undefined, undefined, namespace, context);
	    } else if (Ctor = (0, _index.resolveAsset)(context.$options, 'components', tag)) {
	      return (0, _createComponent.createComponent)(Ctor, data, parent, children, context);
	    } else {
	      if (true) {
	        if (!namespace && _config2.default.isUnknownElement(tag)) {
	          (0, _index.warn)('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	      return (0, _vnode2.default)(tag, data, (0, _helpers.flatten)(children && children()), undefined, undefined, namespace, context);
	    }
	  } else {
	    return (0, _createComponent.createComponent)(tag, data, parent, children, context);
	  }
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = VNode;
	function VNode(tag, data, children, text, elm, ns, context) {
	  return {
	    tag: tag,
	    data: data,
	    children: children,
	    text: text,
	    elm: elm,
	    ns: ns,
	    context: context,
	    key: data && data.key
	  };
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createComponent = createComponent;
	
	var _index = __webpack_require__(3);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _vnode = __webpack_require__(21);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _lifecycle = __webpack_require__(23);
	
	var _index3 = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
	var hooksToMerge = Object.keys(hooks);
	
	function createComponent(Ctor, data, parent, children, context) {
	  if (("development") !== 'production' && children && typeof children !== 'function') {
	    (0, _index3.warn)('A component\'s children should be a function that returns the ' + 'children array. This allows the component to track the children ' + 'dependencies and optimizes re-rendering.');
	  }
	  if (!Ctor) {
	    return;
	  }
	  if ((0, _index3.isObject)(Ctor)) {
	    Ctor = _index2.default.extend(Ctor);
	  }
	  if (("development") !== 'production' && typeof Ctor !== 'function') {
	    (0, _index3.warn)('Invalid Component definition: ' + Ctor, parent);
	    return;
	  }
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered.
	        parent.$forceUpdate();
	      });
	      return;
	    }
	  }
	
	  data = data || {};
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);
	
	  // extract props
	  var propsData = extractProps(data, Ctor);
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  if (listeners) {
	    data.on = null;
	  }
	
	  // return a placeholder vnode
	  var name = Ctor.options.name ? '-' + Ctor.options.name : '';
	  var vnode = (0, _vnode2.default)('vue-component-' + Ctor.cid + name, data, undefined, undefined, undefined, undefined, context);
	  vnode.componentOptions = { Ctor: Ctor, propsData: propsData, listeners: listeners, parent: parent, children: children };
	  return vnode;
	}
	
	function init(vnode) {
	  var _vnode$componentOptio = vnode.componentOptions;
	  var Ctor = _vnode$componentOptio.Ctor;
	  var propsData = _vnode$componentOptio.propsData;
	  var listeners = _vnode$componentOptio.listeners;
	  var parent = _vnode$componentOptio.parent;
	  var children = _vnode$componentOptio.children;
	
	  var child = new Ctor({
	    parent: parent,
	    propsData: propsData,
	    _parentVnode: vnode,
	    _parentListeners: listeners,
	    _renderChildren: children
	  });
	  // if this is a server-rendered mount,
	  // the vnode would already have an element.
	  // otherwise the child sets the parent vnode's elm when mounted
	  // and when updated.
	  child.$mount(vnode.elm);
	  vnode.child = child;
	}
	
	function prepatch(oldVnode, vnode) {
	  var _vnode$componentOptio2 = vnode.componentOptions;
	  var listeners = _vnode$componentOptio2.listeners;
	  var propsData = _vnode$componentOptio2.propsData;
	  var children = _vnode$componentOptio2.children;
	
	  vnode.child = oldVnode.child;
	  vnode.child._updateFromParent(propsData, // updated props
	  listeners, // updated listeners
	  vnode, // new parent vnode
	  children // new children
	  );
	}
	
	function insert(vnode) {
	  (0, _lifecycle.callHook)(vnode.child, 'ready');
	}
	
	function destroy(vnode) {
	  vnode.child.$destroy();
	}
	
	function resolveAsyncComponent(factory, cb) {
	  if (factory.resolved) {
	    // cached
	    cb(factory.resolved);
	  } else if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    (function () {
	      factory.requested = true;
	      var cbs = factory.pendingCallbacks = [cb];
	      factory(function resolve(res) {
	        if ((0, _index3.isObject)(res)) {
	          res = _index2.default.extend(res);
	        }
	        // cache resolved
	        factory.resolved = res;
	        // invoke callbacks
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }, function reject(reason) {
	        ("development") !== 'production' && (0, _index3.warn)('Failed to resolve async component: ' + factory + (reason ? '\nReason: ' + reason : ''));
	      });
	    })();
	  }
	}
	
	function extractProps(data, Ctor) {
	  // we are only extrating raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return;
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var staticAttrs = data.staticAttrs;
	  if (!attrs && !props) {
	    return res;
	  }
	  for (var key in propOptions) {
	    var altKey = (0, _index3.hyphenate)(key);
	    checkProp(res, attrs, key, altKey) || checkProp(res, props, key, altKey) || checkProp(res, staticAttrs, key, altKey);
	  }
	  return res;
	}
	
	function checkProp(res, hash, key, altKey) {
	  if (hash) {
	    if ((0, _index3.hasOwn)(hash, key)) {
	      res[key] = hash[key];
	      delete hash[key];
	      return true;
	    } else if ((0, _index3.hasOwn)(hash, altKey)) {
	      res[key] = hash[altKey];
	      delete hash[altKey];
	      return true;
	    }
	  }
	}
	
	function mergeHooks(data) {
	  if (data.hook) {
	    for (var i = 0; i < hooksToMerge.length; i++) {
	      var key = hooksToMerge[i];
	      var fromParent = data.hook[key];
	      var ours = hooks[key];
	      data.hook[key] = fromParent ? mergeHook(ours, fromParent) : ours;
	    }
	  } else {
	    data.hook = hooks;
	  }
	}
	
	function mergeHook(a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __);
	    b(_, __);
	  };
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initLifecycle = initLifecycle;
	exports.lifecycleMixin = lifecycleMixin;
	exports.callHook = callHook;
	
	var _watcher = __webpack_require__(17);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _index = __webpack_require__(5);
	
	var _index2 = __webpack_require__(12);
	
	var _helpers = __webpack_require__(24);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initLifecycle(vm) {
	  var options = vm.$options;
	
	  vm.$parent = options.parent;
	  vm.$root = vm.$parent ? vm.$parent.$root : vm;
	  if (vm.$parent) {
	    vm.$parent.$children.push(vm);
	  }
	
	  vm.$children = [];
	  vm.$refs = {};
	
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin(Vue) {
	  Vue.prototype._mount = function () {
	    var _this = this;
	
	    if (!this.$options.render) {
	      this.$options.render = function () {
	        return _this.$createElement('div');
	      };
	      if (true) {
	        if (this.$options.template) {
	          (0, _index.warn)('You are using the runtime-only build of Vue where the template ' + 'option is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', this);
	        } else {
	          (0, _index.warn)('Failed to mount component: template or render function not defined.', this);
	        }
	      }
	    }
	    // render static sub-trees for once on mount
	    var staticRenderFns = this.$options.staticRenderFns;
	    if (staticRenderFns) {
	      this._staticTrees = new Array(staticRenderFns.length);
	      for (var i = 0; i < staticRenderFns.length; i++) {
	        this._staticTrees[i] = staticRenderFns[i].call(this._renderProxy);
	      }
	    }
	    this._watcher = new _watcher2.default(this, this._render, this._update);
	    this._update(this._watcher.value);
	    this._mounted = true;
	    // root instance, call ready on self
	    if (this.$root === this) {
	      callHook(this, 'ready');
	    }
	    return this;
	  };
	
	  Vue.prototype._update = function (vnode) {
	    if (this._mounted) {
	      callHook(this, 'beforeUpdate');
	    }
	    var parentNode = this.$options._parentVnode;
	    // set vnode parent before patch
	    vnode.parent = parentNode;
	    if (!this._vnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      this.$el = this.__patch__(this.$el, vnode);
	    } else {
	      this.$el = this.__patch__(this._vnode, vnode);
	    }
	    this._vnode = vnode;
	    // set parent vnode element after patch
	    if (parentNode) {
	      parentNode.elm = this.$el;
	    }
	    if (this._mounted) {
	      callHook(this, 'updated');
	    }
	  };
	
	  Vue.prototype._updateFromParent = function (propsData, listeners, parentVnode, children) {
	    var _this2 = this;
	
	    this.$options._parentVnode = parentVnode;
	    this.$options._renderChildren = children;
	    // update props
	    if (propsData && this.$options.props) {
	      _index2.observerState.shouldConvert = false;
	      var propKeys = this.$options.propKeys;
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        this[key] = (0, _index.validateProp)(this, key, propsData);
	      }
	      _index2.observerState.shouldConvert = true;
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = this.$options._parentListeners;
	      this.$options._parentListeners = listeners;
	      (0, _helpers.updateListeners)(listeners, oldListeners || {}, function (event, handler) {
	        _this2.$on(event, handler);
	      });
	    }
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    this._watcher.update();
	  };
	
	  Vue.prototype.$destroy = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    callHook(this, 'beforeDestroy');
	    this._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      (0, _index.remove)(parent.$children, this);
	    }
	    // unregister ref
	    if (this._ref) {
	      this._context.$refs[this._ref] = undefined;
	    }
	    // teardown watchers
	    var i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // call the last hook...
	    this._isDestroyed = true;
	    callHook(this, 'destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function callHook(vm, hook) {
	  vm.$emit('pre-hook:' + hook);
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flatten = flatten;
	exports.updateListeners = updateListeners;
	
	var _index = __webpack_require__(5);
	
	var _vnode = __webpack_require__(21);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function flatten(children) {
	  if (typeof children === 'string') {
	    return [(0, _vnode2.default)(undefined, undefined, undefined, children)];
	  }
	  if ((0, _index.isArray)(children)) {
	    var res = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i];
	      // flatten nested
	      if ((0, _index.isArray)(c)) {
	        res.push.apply(res, flatten(c));
	      } else if ((0, _index.isPrimitive)(c)) {
	        // convert primitive to vnode
	        res.push((0, _vnode2.default)(undefined, undefined, undefined, c));
	      } else if (c) {
	        res.push(c);
	      }
	    }
	    return res;
	  }
	}
	
	function updateListeners(on, oldOn, add) {
	  var name = void 0,
	      cur = void 0,
	      old = void 0,
	      event = void 0,
	      capture = void 0;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (old === undefined) {
	      capture = name.charAt(0) === '!';
	      event = capture ? name.slice(1) : name;
	      if ((0, _index.isArray)(cur)) {
	        add(event, arrInvoker(cur), capture);
	      } else {
	        cur = { fn: cur };
	        on[name] = cur;
	        add(event, fnInvoker(cur), capture);
	      }
	    } else if ((0, _index.isArray)(old)) {
	      old.length = cur.length;
	      for (var i = 0; i < old.length; i++) {
	        old[i] = cur[i];
	      }on[name] = old;
	    } else {
	      old.fn = cur;
	      on[name] = old;
	    }
	  }
	}
	
	function arrInvoker(arr) {
	  return function (ev) {
	    for (var i = 0; i < arr.length; i++) {
	      arr[i](ev);
	    }
	  };
	}
	
	function fnInvoker(o) {
	  return function (ev) {
	    o.fn(ev);
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initEvents = initEvents;
	exports.eventsMixin = eventsMixin;
	
	var _index = __webpack_require__(5);
	
	var _helpers = __webpack_require__(24);
	
	function initEvents(vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    (0, _helpers.updateListeners)(listeners, {}, function (event, handler) {
	      vm.$on(event, handler);
	    });
	  }
	}
	
	function eventsMixin(Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      this._events = Object.create(null);
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? (0, _index.toArray)(cbs) : cbs;
	      var args = (0, _index.toArray)(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(this, args);
	      }
	    }
	  };
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initGlobalAPI = initGlobalAPI;
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(5);
	
	var util = _interopRequireWildcard(_index);
	
	var _use = __webpack_require__(27);
	
	var _mixin = __webpack_require__(28);
	
	var _extend = __webpack_require__(29);
	
	var _assets = __webpack_require__(30);
	
	var _index2 = __webpack_require__(12);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initGlobalAPI(Vue) {
	  Vue.config = _config2.default;
	  Vue.util = util;
	  Vue.set = _index2.set;
	  Vue.delete = _index2.del;
	  Vue.nextTick = util.nextTick;
	
	  Vue.options = {
	    directives: Object.create(null),
	    filters: Object.create(null),
	    components: Object.create(null),
	    transitions: Object.create(null)
	  };
	
	  (0, _use.initUse)(Vue);
	  (0, _mixin.initMixin)(Vue);
	  (0, _extend.initExtend)(Vue);
	  (0, _assets.initAssetRegisters)(Vue);
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initUse = initUse;
	
	var _index = __webpack_require__(5);
	
	function initUse(Vue) {
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = (0, _index.toArray)(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initMixin = initMixin;
	
	var _index = __webpack_require__(5);
	
	function initMixin(Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = (0, _index.mergeOptions)(Vue.options, mixin);
	  };
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initExtend = initExtend;
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initExtend(Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (true) {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        (0, _index.warn)('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = function VueComponent(options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = (0, _index.mergeOptions)(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    _config2.default._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.initAssetRegisters = initAssetRegisters;
	
	var _config = __webpack_require__(10);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initAssetRegisters(Vue) {
	  /**
	     * Create asset registration methods with the following
	     * signature:
	     *
	     * @param {String} id
	     * @param {*} definition
	     */
	
	  _config2.default._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (true) {
	          if (type === 'component' && _config2.default.isReservedTag(id)) {
	            (0, _index.warn)('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && (0, _index.isPlainObject)(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createPatchFunction = createPatchFunction;
	
	var _vnode = __webpack_require__(21);
	
	var _vnode2 = _interopRequireDefault(_vnode);
	
	var _index = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Virtual DOM implementation based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * with custom modifications.
	 */
	
	var emptyNode = (0, _vnode2.default)('', {}, []);
	var hooks = ['create', 'update', 'remove', 'destroy'];
	
	function isUndef(s) {
	  return s === undefined;
	}
	
	function isDef(s) {
	  return s !== undefined;
	}
	
	function sameVnode(vnode1, vnode2) {
	  return vnode1.key === vnode2.key && vnode1.tag === vnode2.tag;
	}
	
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	  var i = void 0,
	      key = void 0;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) map[key] = i;
	  }
	  return map;
	}
	
	function createPatchFunction(backend) {
	  var i = void 0,
	      j = void 0;
	  var cbs = {};
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
	    }
	  }
	
	  function emptyNodeAt(elm) {
	    return (0, _vnode2.default)(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
	  }
	
	  function createRmCb(childElm, listeners) {
	    function remove() {
	      if (--remove.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove.listeners = listeners;
	    return remove;
	  }
	
	  function removeElement(el) {
	    var parent = nodeOps.parentNode(el);
	    nodeOps.removeChild(parent, el);
	  }
	
	  function createElm(vnode, insertedVnodeQueue) {
	    var i = void 0,
	        elm = void 0;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	        return vnode.elm;
	      }
	    }
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      elm = vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag);
	      if (Array.isArray(children)) {
	        for (i = 0; i < children.length; ++i) {
	          nodeOps.appendChild(elm, createElm(children[i], insertedVnodeQueue));
	        }
	      } else if ((0, _index.isPrimitive)(vnode.text)) {
	        nodeOps.appendChild(elm, nodeOps.createTextNode(vnode.text));
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    } else {
	      elm = vnode.elm = nodeOps.createTextNode(vnode.text);
	    }
	    return vnode.elm;
	  }
	
	  function invokeCreateHooks(vnode, insertedVnodeQueue) {
	    for (var _i = 0; _i < cbs.create.length; ++_i) {
	      cbs.create[_i](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) i.create(emptyNode, vnode);
	      if (i.insert) insertedVnodeQueue.push(vnode);
	    }
	  }
	
	  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }
	
	  function invokeDestroyHook(vnode) {
	    var i = void 0,
	        j = void 0;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
	      for (i = 0; i < cbs.destroy.length; ++i) {
	        cbs.destroy[i](vnode);
	      }if (isDef(i = vnode.children)) {
	        for (j = 0; j < vnode.children.length; ++j) {
	          invokeDestroyHook(vnode.children[j]);
	        }
	      }
	      if (isDef(i = vnode.child)) {
	        invokeDestroyHook(i._vnode);
	      }
	    }
	  }
	
	  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          invokeDestroyHook(ch);
	          removeAndInvokeRemoveHook(ch);
	        } else {
	          // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook(vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }
	
	  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx = void 0,
	        idxInOld = void 0,
	        elmToMove = void 0,
	        before = void 0;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	          oldEndVnode = oldCh[--oldEndIdx];
	        } else if (sameVnode(oldStartVnode, newStartVnode)) {
	          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	          oldStartVnode = oldCh[++oldStartIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else if (sameVnode(oldEndVnode, newEndVnode)) {
	          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldStartVnode, newEndVnode)) {
	          // Vnode moved right
	          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	          nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	          oldStartVnode = oldCh[++oldStartIdx];
	          newEndVnode = newCh[--newEndIdx];
	        } else if (sameVnode(oldEndVnode, newStartVnode)) {
	          // Vnode moved left
	          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	          nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	          oldEndVnode = oldCh[--oldEndIdx];
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	          idxInOld = oldKeyToIdx[newStartVnode.key];
	          if (isUndef(idxInOld)) {
	            // New element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            elmToMove = oldCh[idxInOld];
	            if (("development") !== 'production' && !elmToMove) {
	              (0, _index.warn)('Duplicate track-by key: ' + idxInOld + '. ' + 'Make sure each v-for item has a unique track-by key.');
	            }
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            nodeOps.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	    var i = void 0,
	        hook = void 0;
	    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    // skip nodes with v-pre
	    if (isDef(i = vnode.data) && i.pre) {
	      return;
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (oldVnode === vnode) return;
	    if (!sameVnode(oldVnode, vnode)) {
	      var parentElm = nodeOps.parentNode(oldVnode.elm);
	      elm = createElm(vnode, insertedVnodeQueue);
	      nodeOps.insertBefore(parentElm, elm, oldVnode.elm);
	      removeVnodes(parentElm, [oldVnode], 0, 0);
	      return;
	    }
	    if (isDef(vnode.data)) {
	      for (i = 0; i < cbs.update.length; ++i) {
	        cbs.update[i](oldVnode, vnode);
	      }i = vnode.data.hook;
	      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '');
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(hook) && isDef(i = hook.postpatch)) {
	      i(oldVnode, vnode);
	    }
	  }
	
	  function invokeInsertHook(queue) {
	    for (i = 0; i < queue.length; ++i) {
	      queue[i].data.hook.insert(queue[i]);
	    }
	  }
	
	  function hydrate(elm, vnode, insertedVnodeQueue) {
	    if (true) {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false;
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode);
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	        return true;
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = elm.childNodes;
	        for (var _i2 = 0; _i2 < children.length; _i2++) {
	          var success = hydrate(childNodes[_i2], children[_i2], insertedVnodeQueue);
	          if (!success) {
	            return false;
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    }
	    return true;
	  }
	
	  function assertNodeMatch(node, vnode) {
	    if (vnode.tag) {
	      if (vnode.tag.indexOf('vue-component') === 0) {
	        return true;
	      } else {
	        return vnode.tag === node.tagName.toLowerCase() && (vnode.children ? vnode.children.length === node.childNodes.length : node.childNodes.length === 0);
	      }
	    } else {
	      return (0, _index.renderString)(vnode.text) === node.data;
	    }
	  }
	
	  return function patch(oldVnode, vnode) {
	    var elm, parent;
	    var insertedVnodeQueue = [];
	
	    if (!oldVnode) {
	      // empty mount, create new root element
	      createElm(vnode, insertedVnodeQueue);
	    } else {
	      if (sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue);
	      } else {
	        if (isUndef(oldVnode.tag)) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(insertedVnodeQueue);
	              return oldVnode;
	            } else if (true) {
	              (0, _index.warn)('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. Bailing hydration and performing ' + 'full client-side render.');
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);
	
	        createElm(vnode, insertedVnodeQueue);
	
	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm));
	          removeVnodes(parent, [oldVnode], 0, 0);
	        }
	      }
	    }
	
	    invokeInsertHook(insertedVnodeQueue);
	    return vnode.elm;
	  };
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.namespaceMap = undefined;
	exports.createElement = createElement;
	exports.createElementNS = createElementNS;
	exports.createTextNode = createTextNode;
	exports.insertBefore = insertBefore;
	exports.removeChild = removeChild;
	exports.appendChild = appendChild;
	exports.parentNode = parentNode;
	exports.nextSibling = nextSibling;
	exports.tagName = tagName;
	exports.setTextContent = setTextContent;
	
	var _native = __webpack_require__(33);
	
	var namespaceMap = exports.namespaceMap = {};
	
	function createElement(tagName) {
	  return new _native.Node(tagName);
	}
	
	function createElementNS(namespace, tagName) {
	  return new _native.Node(namespace + ':' + tagName);
	}
	
	function createTextNode(text) {
	  return new _native.Node('text', { attr: { value: text } });
	}
	
	function insertBefore(node, target, before) {
	  node.insertBefore(target, before);
	}
	
	function removeChild(node, child) {
	  node.removeChild(child);
	}
	
	function appendChild(node, child) {
	  node.appendChild(child);
	}
	
	function parentNode(node) {
	  return node.parentNode;
	}
	
	function nextSibling(node) {
	  return node.nextSibling;
	}
	
	function tagName(node) {
	  return node.tagName;
	}
	
	function setTextContent(node, text) {
	  node.setAttribute('value', text);
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Node = Node;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	/**
	 * new Node(tagName, data)
	 *
	 * - instanceId
	 * - nodeId
	 * - tagName: (read-only)
	 *
	 * - nextSibling: (read-only)
	 * - previousSibling: (read-only)
	 *
	 * - children[]: (read-only)
	 * - index: (read-only)
	 *
	 * - attr{k: v}: (read-only)
	 * - style{k: v}: (read-only)
	 * - event{type: handler}: (read-only)
	 *
	 * - appendChild(child)
	 * - insertBefore(target, before)
	 * - removeChild(child)
	 *
	 * - setAttribute(key, value)
	 * - setStyle(key, value)
	 * - addEventListener(type, handler)
	 * - removeEventListener(type)
	 */
	
	var latestNodeId = 1;
	// let hackFirstNode = true
	
	function Node(tagName, data) {
	  data = data || {};
	  this.instanceId = '';
	  this.nodeId = latestNodeId++;
	  this.tagName = tagName;
	  this.attr = data.attr || {};
	  this.style = data.style || {};
	  this.event = data.event || {};
	  this.parentNode = null;
	  this.nextSibling = null;
	  this.children = [];
	  this.attached = false;
	}
	
	global.WeexNode = Node;
	
	Node.prototype.setAttribute = function setAttribute(key, value) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  if (value == null) {
	    delete this.attr[key];
	  } else {
	    this.attr[key] = value;
	  }
	  if (this.attached) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'updateAttrs', args: [String(this.nodeId), _defineProperty({}, key, value)] }]);
	  }
	};
	
	Node.prototype.hasAttribute = function setAttribute(key) {
	  return !(this[key] == null);
	};
	
	Node.prototype.removeAttribute = function setAttribute(key) {
	  if (this[key] == null) {
	    return;
	  }
	  delete this.attr[key];
	  if (this.attached) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'updateAttr', args: [String(this.nodeId), _defineProperty({}, key, null)] }]);
	  }
	};
	
	Node.prototype.setStyle = function setStyle(key, value) {
	  if (this.style[key] === value) {
	    return;
	  }
	  if (value == null) {
	    delete this.style[key];
	  } else {
	    this.style[key] = value;
	  }
	  if (this.attached) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'updateStyle', args: [String(this.nodeId), _defineProperty({}, key, value)] }]);
	  }
	};
	
	Node.prototype.addEventListener = function addEventListener(type, handler, ctx) {
	  var events = this.event;
	  var needAddEvent = false;
	  if (!events[type]) {
	    events[type] = true;
	    needAddEvent = true;
	  }
	  var descriptor = ctx.events[this.nodeId];
	  if (!descriptor) {
	    descriptor = ctx.events[this.nodeId] = { context: ctx, el: this, handlers: {} };
	  }
	  if (!descriptor.handlers[type]) {
	    descriptor.handlers[type] = [];
	  }
	  descriptor.handlers[type].push(handler);
	
	  if (this.attached && needAddEvent) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'addEvent', args: [String(this.nodeId), type] }]);
	  }
	};
	
	Node.prototype.appendChild = function appendChild(child) {
	  if (!child) {
	    return;
	  }
	
	  var children = this.children;
	  var length = children.length;
	  var lastChild = children[length - 1];
	
	  // affected: this, child, lastChild
	  // x children, parentNode, nextSibling
	
	  // this.parentNode
	  // this.nextSibling
	  this.children.push(child);
	
	  child.parentNode = this;
	  // child.nextSibling
	  // child.children
	
	  if (lastChild) {
	    // lastChild.parentNode
	    lastChild.nextSibling = child;
	    // lastChild.children
	  }
	
	  child.attached = this.attached;
	
	  if (!child.instanceId && this.instanceId) {
	    child.instanceId = this.instanceId;
	    attachAll(child);
	  }
	
	  if (this.attached && !this._uselessNode) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'addElement', args: [String(this.nodeId), child.toJSON(), -1] }]);
	  }
	};
	
	Node.prototype.insertBefore = function insertBefore(target, before) {
	  if (!target) {
	    return;
	  }
	
	  if (before && before.nextSibling === target) {
	    return;
	  }
	
	  if (!target.instanceId && this.instanceId) {
	    target.instanceId = this.instanceId;
	  }
	
	  var children = this.children;
	  var targetParent = target.parentNode;
	
	  // affected: target parent, target before, this, target, before
	  // x children, parentNode, nextSibling
	
	  if (targetParent) {
	    var targetParentChildren = targetParent && targetParent.children;
	    var targetIndex = targetParentChildren && targetParentChildren.indexOf(target);
	    var targetBefore = targetParentChildren && targetParentChildren[targetIndex - 1];
	    var targetAfter = targetParentChildren && targetParentChildren[targetIndex + 1];
	
	    // targetParent.parentNode
	    // targetParent.nextSibling
	    targetParentChildren.splice(targetIndex, 1);
	
	    if (targetBefore) {
	      // targetBefore.parentNode
	      targetBefore.nextSibling = targetAfter;
	      // targetBefore.children
	    }
	  }
	
	  var beforeIndex = children.indexOf(before);
	  if (beforeIndex < 0) {
	    beforeIndex = children.length - 1;
	  }
	
	  // this.parentNode
	  // this.nextSibling
	  this.children.splice(beforeIndex + 1, null, target);
	
	  target.parentNode = this;
	  target.nextSibling = children[beforeIndex + 2];
	  // target.children
	
	  if (before) {
	    // before.parentNode
	    before.nextSibling = target;
	    // before.children
	  }
	
	  if (this.attached && target.attached) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'moveElement', args: [String(target.nodeId), this.nodeId, beforeIndex + 1] }]);
	  } else if (this.attached && !target.attached) {
	    target.attached = true;
	    attachAll(target);
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'addElement', args: [String(this.nodeId), target.toJSON(), beforeIndex + 1] }]);
	  }
	};
	
	Node.prototype.removeChild = function removeChild(child) {
	  if (!child) {
	    return;
	  }
	
	  var childIndex = this.children.indexOf(child);
	  var before = this.children[childIndex - 1];
	
	  // affected: child, this, before
	  // x children, parentNode, nextSibling
	
	  child.parentNode = undefined;
	  child.nextSibling = undefined;
	  // child.children
	
	  // this.parentNode
	  // this.nextSibling
	  this.children.splice(childIndex, 1);
	
	  if (before) {
	    // before.parentNode
	    before.nextSibling = this.children[childIndex];
	    // before.children
	  }
	
	  if (this.attached && !child._uselessNode) {
	    global.callNative(this.instanceId, [{ module: 'dom', method: 'removeElement', args: [String(child.nodeId)] }]);
	  }
	
	  // todo: remove all node and remove all events
	};
	
	Node.prototype.toJSON = function toJSON() {
	  var ref = String(this.nodeId);
	  var type = this.tagName;
	  var attr = this.attr;
	  var style = this.style;
	  var event = Object.keys(this.event);
	  var children = this.children;
	  return { ref: ref, type: type, attr: attr, style: style, event: event, children: children.map(function (child) {
	      return child.toJSON();
	    }) };
	};
	
	function attachAll(node) {
	  var instanceId = node.instanceId;
	  var attached = node.attached;
	  node.children.forEach(function (child) {
	    child.instanceId = instanceId;
	    child.attached = attached;
	    attachAll(child);
	  });
	}
	
	// function detachAll (node) {}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _directives = __webpack_require__(36);
	
	var _directives2 = _interopRequireDefault(_directives);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = [_directives2.default];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _options = __webpack_require__(9);
	
	exports.default = {
	  create: function bindDirectives(oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'bind');
	  },
	  update: function updateDirectives(oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'update', true);
	  },
	  destroy: function unbindDirectives(vnode) {
	    applyDirectives(null, vnode, 'unbind');
	  }
	};
	
	
	function applyDirectives(oldVnode, vnode, hook, update) {
	  var dirs = vnode.data.directives;
	  if (dirs) {
	    for (var i = 0; i < dirs.length; i++) {
	      var dir = dirs[i];
	      var def = (0, _options.resolveAsset)(vnode.context.$options, 'directives', dir.name, true);
	      var fn = def && def[hook];
	      if (fn) {
	        // only call update if value has changed
	        if (update) {
	          var oldValue = oldVnode.data.directives[i].value;
	          if (oldValue === dir.value) {
	            continue;
	          }
	        }
	        fn(vnode.elm, dir.value, dir.modifiers, vnode, oldVnode);
	      }
	    }
	  }
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _attrs = __webpack_require__(38);
	
	var _attrs2 = _interopRequireDefault(_attrs);
	
	var _class = __webpack_require__(39);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _events = __webpack_require__(40);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _props = __webpack_require__(41);
	
	var _props2 = _interopRequireDefault(_props);
	
	var _style = __webpack_require__(42);
	
	var _style2 = _interopRequireDefault(_style);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = [_attrs2.default, _class2.default, _events2.default, _props2.default, _style2.default];

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function updateAttrs(oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return;
	  }
	  var key = void 0,
	      cur = void 0,
	      old = void 0;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      elm.setAttribute(key, cur);
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      elm.setAttribute(key);
	    }
	  }
	}
	
	exports.default = {
	  create: function create(_, vnode) {
	    var attrs = vnode.data.staticAttrs;
	    if (attrs) {
	      for (var key in attrs) {
	        if (!vnode.elm) debugger;
	        vnode.elm.setAttribute(key, attrs[key]);
	      }
	    }
	    updateAttrs(_, vnode);
	  },
	  update: updateAttrs
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(6);
	
	function updateClass(oldVnode, vnode) {
	  var el = vnode.elm;
	  var ctx = vnode.context;
	
	  var data = vnode.data;
	  var staticClass = data.staticClass;
	  var klass = data.class;
	  if (!staticClass && !klass) {
	    return;
	  }
	
	  var classList = [];
	  if (staticClass) {
	    classList.push.apply(classList, staticClass.split(' '));
	  }
	  if (klass) {
	    classList.push.apply(classList, klass);
	  }
	
	  var style = getStyle(classList, ctx);
	  for (var key in style) {
	    el.setStyle(key, style[key]);
	  }
	}
	
	function getStyle(classList, ctx) {
	  var stylesheet = ctx.$options.style || {};
	  var result = {};
	  classList.forEach(function (name) {
	    var style = stylesheet[name];
	    (0, _util.extend)(result, style);
	  });
	  return result;
	}
	
	exports.default = {
	  create: updateClass,
	  update: updateClass
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _helpers = __webpack_require__(24);
	
	function updateDOMListeners(oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return;
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  (0, _helpers.updateListeners)(on, oldOn, function (event, handler, capture) {
	    // weex do not support bubble phase
	    vnode.elm.addEventListener(event, handler, vnode.context.$options.methodConfig);
	  });
	}
	
	exports.default = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function updateProps(oldVnode, vnode) {
	  if (!oldVnode.data.props && !vnode.data.props) {
	    return;
	  }
	  var key = void 0,
	      cur = void 0,
	      old = void 0;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.props || {};
	  var props = vnode.data.props || {};
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = undefined;
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    old = oldProps[key];
	    if (old !== cur) {
	      elm[key] = cur;
	    }
	  }
	}
	
	exports.default = {
	  create: updateProps,
	  update: updateProps
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(6);
	
	var normalize = (0, _util.cached)(function (prop) {
	  return (0, _util.camelize)(prop);
	});
	
	function updateStyle(oldVnode, vnode) {
	  if (!oldVnode.data.style && !vnode.data.style) {
	    return;
	  }
	  var cur = void 0,
	      name = void 0;
	  var elm = vnode.elm;
	  var oldStyle = oldVnode.data.style || {};
	  var style = vnode.data.style || {};
	
	  // handle array syntax
	  if ((0, _util.isArray)(style)) {
	    style = vnode.data.style = toObject(style);
	  }
	
	  for (name in oldStyle) {
	    if (!style[name]) {
	      elm.setStyle(normalize(name));
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (cur !== oldStyle[name]) {
	      elm.setStyle(normalize(name), cur);
	    }
	  }
	}
	
	function toObject(arr) {
	  var res = arr[0] || {};
	  for (var i = 1; i < arr.length; i++) {
	    if (arr[i]) {
	      (0, _util.extend)(res, arr[i]);
	    }
	  }
	  return res;
	}
	
	exports.default = {
	  create: updateStyle,
	  update: updateStyle
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isReservedTag = undefined;
	exports.mustUseProp = mustUseProp;
	exports.getTagNamespace = getTagNamespace;
	exports.isUnknownElement = isUnknownElement;
	exports.query = query;
	
	var _util = __webpack_require__(6);
	
	var _native = __webpack_require__(33);
	
	var isReservedTag = exports.isReservedTag = (0, _util.makeMap)('div,img,image,input,switch,indicator,list,scroller,cell,template,text,slider,image');
	function mustUseProp() {
	  console.log('mustUseProp');
	}
	function getTagNamespace() {
	  console.log('getTagNamespace');
	}
	function isUnknownElement() {
	  console.log('isUnknownElement');
	}
	function query(el, instanceId) {
	  var body = new _native.Node(el);
	  body.instanceId = instanceId;
	  body.nodeId = '_root';
	  body.attached = true;
	  var root = new _native.Node('div');
	  root._uselessNode = true; // hack, it'a uselessNode for weex
	  body.appendChild(root);
	  return root;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=weex.js.map