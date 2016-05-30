(this.nativeLog || function(s) {console.log(s)})('START JS FRAMEWORK: 0.13.10 Build 20160530');
/******/ (function(modules) { // webpackBootstrap
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

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	__webpack_require__(1);
	
	var _framework = __webpack_require__(43);
	
	var framework = _interopRequireWildcard(_framework);
	
	var _package = __webpack_require__(70);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var _loop = function _loop(methodName) {
	    global[methodName] = function () {
	        var ret = framework[methodName].apply(framework, arguments);
	        if (ret instanceof Error) {
	            console.error(ret.toString());
	        } else if (ret instanceof Array) {
	            ret.forEach(function (r) {
	                if (r instanceof Error) {
	                    console.error(r.toString());
	                }
	            });
	        }
	        return ret;
	    };
	};
	
	for (var methodName in framework) {
	    _loop(methodName);
	}
	
	Object.assign(global, {
	    frameworkVersion: _package.version,
	    needTransformerVersion: _package.optionalDependencies['weex-transformer']
	});
	
	/**
	 * register methods
	 */
	var methods = __webpack_require__(71);
	var _global = global;
	var registerMethods = _global.registerMethods;
	
	registerMethods(methods);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	__webpack_require__(40);
	
	__webpack_require__(41);
	
	__webpack_require__(42);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(23) });

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    core = __webpack_require__(7),
	    hide = __webpack_require__(8),
	    redefine = __webpack_require__(18),
	    ctx = __webpack_require__(21),
	    PROTOTYPE = 'prototype';
	
	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if (target) redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var core = module.exports = { version: '2.1.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dP = __webpack_require__(9),
	    createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(13) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var anObject = __webpack_require__(10),
	    IE8_DOM_DEFINE = __webpack_require__(12),
	    toPrimitive = __webpack_require__(16),
	    dP = Object.defineProperty;
	
	exports.f = __webpack_require__(13) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(11);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	module.exports = function (it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = !__webpack_require__(13) && !__webpack_require__(14)(function () {
	  return Object.defineProperty(__webpack_require__(15)('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(14)(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(11),
	    document = __webpack_require__(6).document
	// in old IE typeof document.createElement is 'object'
	,
	    is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(11);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    hide = __webpack_require__(8),
	    has = __webpack_require__(19),
	    SRC = __webpack_require__(20)('src'),
	    TO_STRING = 'toString',
	    $toString = Function[TO_STRING],
	    TPL = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(7).inspectSource = function (it) {
	  return $toString.call(it);
	};
	
	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === global) {
	    O[key] = val;
	  } else {
	    if (!safe) {
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if (O[key]) O[key] = val;else hide(O, key, val);
	    }
	  }
	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var id = 0,
	    px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// optional / simple context binding
	var aFunction = __webpack_require__(22);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	
	var getKeys = __webpack_require__(24),
	    gOPS = __webpack_require__(37),
	    pIE = __webpack_require__(38),
	    toObject = __webpack_require__(39),
	    IObject = __webpack_require__(27),
	    $assign = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(14)(function () {
	  var A = {},
	      B = {},
	      S = Symbol(),
	      K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) {
	    B[k] = k;
	  });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) {
	  // eslint-disable-line no-unused-vars
	  var T = toObject(target),
	      aLen = arguments.length,
	      index = 1,
	      getSymbols = gOPS.f,
	      isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]),
	        keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
	        length = keys.length,
	        j = 0,
	        key;
	    while (length > j) {
	      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	    }
	  }return T;
	} : $assign;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(25),
	    enumBugKeys = __webpack_require__(36);
	
	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = __webpack_require__(19),
	    toIObject = __webpack_require__(26),
	    arrayIndexOf = __webpack_require__(30)(false),
	    IE_PROTO = __webpack_require__(34)('IE_PROTO');
	
	module.exports = function (object, names) {
	  var O = toIObject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO) has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(27),
	    defined = __webpack_require__(29);
	module.exports = function (it) {
	  return IObject(defined(it));
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(28);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	var toString = {}.toString;
	
	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(26),
	    toLength = __webpack_require__(31),
	    toIndex = __webpack_require__(33);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this),
	        length = toLength(O.length),
	        index = toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	        if (IS_INCLUDES || index in O) {
	          if (O[index] === el) return IS_INCLUDES || index;
	        }
	      }return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.15 ToLength
	var toInteger = __webpack_require__(32),
	    min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	
	// 7.1.4 ToInteger
	var ceil = Math.ceil,
	    floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__(32),
	    max = Math.max,
	    min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var shared = __webpack_require__(35)('keys'),
	    uid = __webpack_require__(20);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var global = __webpack_require__(6),
	    SHARED = '__core-js_shared__',
	    store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	// IE 8- don't enum bug keys
	module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(29);
	module.exports = function (it) {
	  return Object(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _global = global;
	var setTimeout = _global.setTimeout;
	var setTimeoutNative = _global.setTimeoutNative;
	
	// fix no setTimeout on Android V8
	/* istanbul ignore if */
	
	if (typeof setTimeout === 'undefined' && typeof setTimeoutNative === 'function') {
	  (function () {
	    var timeoutMap = {};
	    var timeoutId = 0;
	    global.setTimeout = function (cb, time) {
	      timeoutMap[++timeoutId] = cb;
	      setTimeoutNative(timeoutId.toString(), time);
	    };
	    global.setTimeoutCallback = function (id) {
	      if (typeof timeoutMap[id] === 'function') {
	        timeoutMap[id]();
	        delete timeoutMap[id];
	      }
	    };
	  })();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 41 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.printlog = printlog;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var _global = global;
	var console = _global.console;
	
	var logLevel = void 0;
	
	var LEVEL_MAP = {
	  __ERROR: 'error',
	  __WARN: 'warn',
	  __INFO: 'info',
	  __DEBUG: 'debug',
	  __VERBOSE: 'verbose'
	};
	
	var LEVELS = ['error', 'warn', 'info', 'debug', 'verbose', 'all'];
	
	function normalize(v) {
	  var type = Object.prototype.toString.call(v);
	  if (type.toLowerCase() === '[object object]') {
	    v = JSON.stringify(v);
	  } else {
	    v = String(v);
	  }
	  return v;
	}
	
	function printlog() {
	  var _global2 = global;
	  var WXEnvironment = _global2.WXEnvironment;
	  var nativeLog = _global2.nativeLog;
	
	
	  logLevel = WXEnvironment && WXEnvironment.logLevel || 'info';
	
	  if (typeof nativeLog === 'function') {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var level = args.pop();
	    if (LEVELS.indexOf(LEVEL_MAP[level]) <= LEVELS.indexOf(logLevel)) {
	      nativeLog.apply(undefined, _toConsumableArray(args.map(function (v) {
	        return normalize(v);
	      })).concat([level]));
	    }
	  }
	}
	
	/* istanbul ignore if */
	if (typeof console === 'undefined') {
	  global.console = {
	    log: function log() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      // __VERBOSE
	      printlog.apply(undefined, args.concat(['__VERBOSE']));
	    },
	    debug: function debug() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }
	
	      // __DEBUG
	      printlog.apply(undefined, args.concat(['__DEBUG']));
	    },
	    info: function info() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }
	
	      // __INFO
	      printlog.apply(undefined, args.concat(['__INFO']));
	    },
	    warn: function warn() {
	      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }
	
	      // __WARN
	      printlog.apply(undefined, args.concat(['__WARN']));
	    },
	    error: function error() {
	      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }
	
	      // __ERROR
	      printlog.apply(undefined, args.concat(['__ERROR']));
	    }
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 42 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var MSG = 'Using "Promise" is unexpected';
	
	var UnexpectedPromise = function UnexpectedPromise() {
	  console.warn(MSG);
	
	  this.then = function () {
	    console.warn(MSG);
	  };
	};
	
	UnexpectedPromise.all = UnexpectedPromise.race = UnexpectedPromise.resolve = UnexpectedPromise.reject = function () {
	  console.warn(MSG);
	};
	
	global.Promise = UnexpectedPromise;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview Main entry, instance manager
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * - createInstance(instanceId, code, options, data)
	                                                                                                                                                                                                                                                   * - refreshInstance(instanceId, data)
	                                                                                                                                                                                                                                                   * - destroyInstance(instanceId)
	                                                                                                                                                                                                                                                   * - registerComponents(components)
	                                                                                                                                                                                                                                                   * - registerModules(modules)
	                                                                                                                                                                                                                                                   * - getRoot(instanceId)
	                                                                                                                                                                                                                                                   * - instanceMap
	                                                                                                                                                                                                                                                   * - callJS(instanceId, tasks)
	                                                                                                                                                                                                                                                   *   - fireEvent(ref, type, data)
	                                                                                                                                                                                                                                                   *   - callback(funcId, data)
	                                                                                                                                                                                                                                                   */
	
	exports.createInstance = createInstance;
	exports.refreshInstance = refreshInstance;
	exports.destroyInstance = destroyInstance;
	exports.registerComponents = registerComponents;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.getRoot = getRoot;
	exports.callJS = callJS;
	
	var _config = __webpack_require__(44);
	
	var config = _interopRequireWildcard(_config);
	
	var _app = __webpack_require__(45);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _vm = __webpack_require__(50);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var nativeComponentMap = config.nativeComponentMap;
	
	var instanceMap = {};
	
	/**
	 * create a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {string} code
	 * @param  {object} [options] option `HAS_LOG` enable print log
	 * @param  {object} [data]
	 */
	function createInstance(instanceId, code, options, data) {
	  var instance = instanceMap[instanceId];
	  options = options || {};
	
	  config.debug = options.debug;
	
	  var result;
	  if (!instance) {
	    instance = new _app2.default(instanceId, options);
	    instanceMap[instanceId] = instance;
	    result = instance.init(code, data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  return result;
	}
	
	/**
	 * refresh a Weex instance
	 *
	 * @param  {string} instanceId
	 * @param  {object} data
	 */
	function refreshInstance(instanceId, data) {
	  var instance = instanceMap[instanceId];
	  var result;
	  if (instance) {
	    result = instance.refreshData(data);
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	/**
	 * destroy a Weex instance
	 * @param  {string} instanceId
	 */
	function destroyInstance(instanceId) {
	  var instance = instanceMap[instanceId];
	  if (!instance) {
	    return new Error('invalid instance id "' + instanceId + '"');
	  }
	
	  instance.destroy();
	  delete instanceMap[instanceId];
	  return instanceMap;
	}
	
	/**
	 * register the name of each native component
	 * @param  {array} components array of name
	 */
	function registerComponents(components) {
	  if (Array.isArray(components)) {
	    components.forEach(function register(name) {
	      /* istanbul ignore if */
	      if (!name) {
	        return;
	      }
	      if (typeof name === 'string') {
	        nativeComponentMap[name] = true;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object' && typeof name.type === 'string') {
	        nativeComponentMap[name.type] = name;
	      }
	    });
	  }
	}
	
	/**
	 * register the name and methods of each module
	 * @param  {object} modules a object of modules
	 */
	function registerModules(modules) {
	  if ((typeof modules === 'undefined' ? 'undefined' : _typeof(modules)) === 'object') {
	    _vm2.default.registerModules(modules);
	  }
	}
	
	/**
	 * register the name and methods of each api
	 * @param  {object} apis a object of apis
	 */
	function registerMethods(apis) {
	  if ((typeof apis === 'undefined' ? 'undefined' : _typeof(apis)) === 'object') {
	    _vm2.default.registerMethods(apis);
	  }
	}
	
	/**
	 * get a whole element tree of an instance
	 * for debugging
	 * @param  {string} instanceId
	 * @return {object} a virtual dom tree
	 */
	function getRoot(instanceId) {
	  var instance = instanceMap[instanceId];
	  var result;
	  if (instance) {
	    result = instance.getRootElement();
	  } else {
	    result = new Error('invalid instance id "' + instanceId + '"');
	  }
	  return result;
	}
	
	var jsHandlers = {
	  fireEvent: function fireEvent(instanceId, ref, type, data, domChanges) {
	    var instance = instanceMap[instanceId];
	    var result;
	    result = instance.fireEvent(ref, type, data, domChanges);
	    return result;
	  },
	
	  callback: function callback(instanceId, funcId, data, ifLast) {
	    var instance = instanceMap[instanceId];
	    var result;
	    result = instance.callback(funcId, data, ifLast);
	    return result;
	  }
	};
	
	/**
	 * accept calls from native (event or callback)
	 *
	 * @param  {string} instanceId
	 * @param  {array} tasks list with `method` and `args`
	 */
	function callJS(instanceId, tasks) {
	  var instance = instanceMap[instanceId];
	  var results = [];
	  if (instance && Array.isArray(tasks)) {
	    tasks.forEach(function (task) {
	      var handler = jsHandlers[task.method];
	      var args = [].concat(_toConsumableArray(task.args));
	      if (typeof handler === 'function') {
	        args.unshift(instanceId);
	        results.push(handler.apply(undefined, _toConsumableArray(args)));
	      }
	    });
	  } else {
	    results.push(new Error('invalid instance id "' + instanceId + '" or tasks'));
	  }
	
	  return results;
	}

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nativeComponentMap = exports.nativeComponentMap = {
	  text: true,
	  image: true,
	  container: true,
	  slider: {
	    type: 'slider',
	    append: 'tree'
	  },
	  cell: {
	    type: 'cell',
	    append: 'tree'
	  }
	};
	
	var customComponentMap = exports.customComponentMap = {};
	
	var debug = exports.debug = false;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = AppInstance;
	
	var _util = __webpack_require__(46);
	
	var _bundle = __webpack_require__(47);
	
	var bundle = _interopRequireWildcard(_bundle);
	
	var _ctrl = __webpack_require__(65);
	
	var ctrl = _interopRequireWildcard(_ctrl);
	
	var _differ = __webpack_require__(67);
	
	var _differ2 = _interopRequireDefault(_differ);
	
	var _event = __webpack_require__(68);
	
	var _event2 = _interopRequireDefault(_event);
	
	var _domListener = __webpack_require__(66);
	
	var _domListener2 = _interopRequireDefault(_domListener);
	
	var _dom = __webpack_require__(69);
	
	var _register = __webpack_require__(63);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @fileOverview
	 * Weex instance constructor & definition
	 */
	
	function AppInstance(instanceId, options) {
	  var _this = this;
	
	  this.id = instanceId;
	  this.options = options || {};
	  this.vm = null;
	  this.doc = new _dom.Document(instanceId, this.options.bundleUrl);
	  this.customComponentMap = {};
	  this.callbacks = {};
	  this.differ = new _differ2.default(instanceId);
	  this.uid = 0;
	  this.rendered = false;
	  this.eventManager = new _event2.default();
	  this.listener = new _domListener2.default(this.id, function (tasks) {
	    _this.callTasks(tasks);
	  });
	  this.doc.setEventManager(this.eventManager);
	  this.doc.setListener(this.listener);
	}
	
	function normalize(app, v) {
	  var type = (0, _util.typof)(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	      if (v instanceof _dom.Node) {
	        return v.ref;
	      }
	      return v;
	    case 'function':
	      app.callbacks[++app.uid] = v;
	      return app.uid.toString();
	    default:
	      return JSON.stringify(v);
	  }
	}
	
	AppInstance.prototype.callTasks = function (tasks) {
	  var _this2 = this;
	
	  if ((0, _util.typof)(tasks) !== 'array') {
	    tasks = [tasks];
	  }
	
	  tasks.forEach(function (task) {
	    task.args = task.args.map(function (arg) {
	      return normalize(_this2, arg);
	    });
	  });
	
	  callNative(this.id, tasks, '-1');
	};
	
	(0, _util.extend)(AppInstance.prototype, bundle, ctrl, {
	  registerComponent: _register.registerComponent,
	  requireComponent: _register.requireComponent,
	  requireModule: _register.requireModule
	});

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.log = exports.debug = exports.info = exports.warn = exports.error = exports.indexOf = exports.define = exports.normalize = exports.typof = exports.stringify = exports.isArray = exports.isPlainObject = exports.isObject = exports.extend = exports.toArray = exports.bind = exports.camelize = exports.isReserved = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /// lang.js
	
	
	var _config = __webpack_require__(44);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Check is a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	var isReserved = exports.isReserved = function isReserved(str) {
	  str += '';
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	};
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelRE = /-(\w)/g;
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	var camelize = exports.camelize = function camelize(str) {
	  return str.replace(camelRE, toUpper);
	};
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	var bind = exports.bind = function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	};
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	var toArray = exports.toArray = function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	};
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	var extend = exports.extend = function extend(target) {
	  for (var _len = arguments.length, src = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    src[_key - 1] = arguments[_key];
	  }
	
	  if (typeof Object.assign === 'function') {
	    Object.assign.apply(Object, [target].concat(src));
	  } else {
	    var first = src.shift();
	    for (var key in first) {
	      target[key] = first[key];
	    }
	    if (src.length) {
	      extend.apply(undefined, [target].concat(src));
	    }
	  }
	  return target;
	};
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isObject = exports.isObject = function isObject(obj) {
	  return !!(obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object');
	};
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var isPlainObject = exports.isPlainObject = function isPlainObject(obj) {
	  return toString.call(obj) === '[object Object]';
	};
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = exports.isArray = function isArray(obj) {
	  return Array.isArray(obj);
	};
	
	var stringify = exports.stringify = function stringify(x) {
	  return typeof x === 'undefined' || x === null || typeof x === 'function' ? '' : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? x instanceof RegExp ? x.toString() : x instanceof Date ? JSON.parse(JSON.stringify(x)) : JSON.stringify(x) : x.toString();
	};
	
	var typof = exports.typof = function typof(v) {
	  var s = Object.prototype.toString.call(v);
	  return s.substring(8, s.length - 1).toLowerCase();
	};
	
	var normalize = exports.normalize = function normalize(v) {
	  var type = typof(v);
	
	  switch (type) {
	    case 'undefined':
	    case 'null':
	      return '';
	    case 'regexp':
	      return v.toString();
	    case 'date':
	      return v.toISOString();
	    case 'number':
	    case 'string':
	    case 'boolean':
	    case 'array':
	    case 'object':
	    case 'function':
	      return v;
	  }
	};
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	var define = exports.define = function define(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	};
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	var indexOf = exports.indexOf = function indexOf(arr, obj) {
	  for (var i = 0, l = arr.length; i < l; i++) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};
	
	var enableLog = typeof console !== 'undefined' && global.IS_PRODUCT !== true;
	
	/**
	 * @param {String} msg
	 */
	var error = exports.error = function error() {
	  var _console;
	
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }
	
	  enableLog && console.error && (_console = console).error.apply(_console, ['[JS Framework]'].concat(args));
	};
	
	/**
	 * @param {String} msg
	 */
	var warn = exports.warn = function warn() {
	  var _console2;
	
	  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    args[_key3] = arguments[_key3];
	  }
	
	  enableLog && console.warn && (_console2 = console).warn.apply(_console2, ['[JS Framework]'].concat(args));
	};
	
	/**
	 * @param {String} msg
	 */
	var info = exports.info = function info() {
	  var _console3;
	
	  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    args[_key4] = arguments[_key4];
	  }
	
	  enableLog && console.info && (_console3 = console).info.apply(_console3, ['[JS Framework]'].concat(args));
	};
	
	/**
	 * @param {String} msg
	 */
	var debug = exports.debug = function debug() {
	  var _console4;
	
	  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    args[_key5] = arguments[_key5];
	  }
	
	  enableLog && console.debug && (_console4 = console).debug.apply(_console4, ['[JS Framework]'].concat(args));
	};
	
	/**
	 * @param {String} msg
	 */
	var log = exports.log = function log() {
	  var _console5;
	
	  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	    args[_key6] = arguments[_key6];
	  }
	
	  enableLog && console.log && (_console5 = console).log.apply(_console5, ['[JS Framework]'].concat(args));
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.require = exports.define = undefined;
	exports.clearCommonModules = clearCommonModules;
	exports.bootstrap = bootstrap;
	exports.register = register;
	exports.render = render;
	
	var _semver = __webpack_require__(48);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	var _config = __webpack_require__(44);
	
	var config = _interopRequireWildcard(_config);
	
	var _vm = __webpack_require__(50);
	
	var _vm2 = _interopRequireDefault(_vm);
	
	var _downgrade = __webpack_require__(64);
	
	var downgrade = _interopRequireWildcard(_downgrade);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
	                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                   * api that invoked by js bundle code
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * - define(name, factory): define a new composed component type
	                                                                                                                                                                                                                   * - bootstrap(type, config, data): require a certain type &
	                                                                                                                                                                                                                   *         render with (optional) data
	                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                   * deprecated:
	                                                                                                                                                                                                                   * - register(type, options): register a new composed component type
	                                                                                                                                                                                                                   * - render(type, data): render by a certain type with (optional) data
	                                                                                                                                                                                                                   * - require(type)(data): require a type then render with data
	                                                                                                                                                                                                                   */
	
	var WEEX_COMPONENT_REG = /^\@weex-component\//;
	var WEEX_MODULE_REG = /^\@weex-module\//;
	var NORMAL_MODULE_REG = /^\.{1,2}\//;
	var JS_SURFIX_REG = /\.js$/;
	
	var isWeexComponent = function isWeexComponent(name) {
	  return !!name.match(WEEX_COMPONENT_REG);
	};
	var isWeexModule = function isWeexModule(name) {
	  return !!name.match(WEEX_MODULE_REG);
	};
	var isNormalModule = function isNormalModule(name) {
	  return !!name.match(NORMAL_MODULE_REG);
	};
	var isNpmModule = function isNpmModule(name) {
	  return !isWeexComponent(name) && !isWeexModule(name) && !isNormalModule(name);
	};
	
	function removeWeexPrefix(str) {
	  return str.replace(WEEX_COMPONENT_REG, '').replace(WEEX_MODULE_REG, '');
	}
	
	function removeJSSurfix(str) {
	  return str.replace(JS_SURFIX_REG, '');
	}
	
	var commonModules = {};
	
	function clearCommonModules() {
	  commonModules = {};
	}
	
	// define(name, factory) for primary usage
	// or
	// define(name, deps, factory) for compatibility
	// Notice: DO NOT use function define() {},
	// it will cause error after builded by webpack
	var define = exports.define = function define(name, deps, factory) {
	  var _this = this;
	
	  _.debug('define a component', name);
	
	  if (_.typof(deps) === 'function') {
	    factory = deps;
	    deps = [];
	  }
	
	  var _require = function _require(name) {
	    var cleanName = void 0;
	
	    if (isWeexComponent(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireComponent(cleanName);
	    }
	    if (isWeexModule(name)) {
	      cleanName = removeWeexPrefix(name);
	      return _this.requireModule(cleanName);
	    }
	    if (isNormalModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	    if (isNpmModule(name)) {
	      cleanName = removeJSSurfix(name);
	      return commonModules[name];
	    }
	  };
	  var _module = { exports: {} };
	
	  var cleanName = void 0;
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    this.registerComponent(cleanName, _module.exports);
	  } else if (isWeexModule(name)) {
	    cleanName = removeWeexPrefix(name);
	
	    factory(_require, _module.exports, _module);
	
	    _vm2.default.registerModules(_defineProperty({}, cleanName, _module.exports));
	  } else if (isNormalModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    commonModules[cleanName] = _module.exports;
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	
	    factory(_require, _module.exports, _module);
	
	    var exports = _module.exports;
	    if (exports.template || exports.style || exports.methods) {
	      // downgrade to old define method (define('componentName', factory))
	      // the exports contain one key of template, style or methods
	      // but it has risk!!!
	      this.registerComponent(cleanName, exports);
	    } else {
	      commonModules[cleanName] = _module.exports;
	    }
	  }
	};
	
	function bootstrap(name, config, data) {
	  _.debug('bootstrap for ' + name);
	
	  var cleanName = void 0;
	
	  if (isWeexComponent(name)) {
	    cleanName = removeWeexPrefix(name);
	  } else if (isNpmModule(name)) {
	    cleanName = removeJSSurfix(name);
	    // check if define by old 'define' method
	    /* istanbul ignore if */
	    if (!this.customComponentMap[cleanName]) {
	      return new Error('It\'s not a component: ' + name);
	    }
	  } else {
	    return new Error('Wrong component name: ' + name);
	  }
	
	  config = _.isPlainObject(config) ? config : {};
	
	  if (typeof config.transformerVersion === 'string' && typeof global.needTransformerVersion === 'string' && !_semver2.default.satisfies(config.transformerVersion, global.needTransformerVersion)) {
	    return new Error('JS Bundle version: ' + config.transformerVersion + ' ' + ('not compatible with ' + global.needTransformerVersion));
	  }
	
	  var _checkDowngrade = downgrade.check(config.downgrade);
	  /* istanbul ignore if */
	  if (_checkDowngrade.isDowngrade) {
	    this.callTasks([{
	      module: 'instanceWrap',
	      method: 'error',
	      args: [_checkDowngrade.errorType, _checkDowngrade.code, _checkDowngrade.errorMessage]
	    }]);
	    return new Error('Downgrade: ' + config.downgrade);
	  }
	
	  this.vm = new _vm2.default(cleanName, { _app: this }, null, data);
	}
	
	/**
	 * @deprecated
	 */
	function register(type, options) {
	  _.warn('Register is deprecated, please install lastest transformer.');
	  this.registerComponent(type, options);
	}
	
	/**
	 * @deprecated
	 */
	function render(type, data) {
	  _.warn('Render is deprecated, please install lastest transformer.');
	  return this.bootstrap(type, {}, data);
	}
	
	/**
	 * @deprecated
	 */
	function _require2(type) {
	  var _this2 = this;
	
	  _.warn('Require is deprecated, please install lastest transformer.');
	  return function (data) {
	    return _this2.bootstrap(type, {}, data);
	  };
	}
	exports.require = _require2;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports = module.exports = SemVer;
	
	// The debug function is excluded entirely from the minified version.
	/* nomin */var debug;
	/* nomin */if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' &&
	/* nomin */process.env &&
	/* nomin */process.env.NODE_DEBUG &&
	/* nomin *//\bsemver\b/i.test(process.env.NODE_DEBUG))
	  /* nomin */debug = function debug() {
	    /* nomin */var args = Array.prototype.slice.call(arguments, 0);
	    /* nomin */args.unshift('SEMVER');
	    /* nomin */console.log.apply(console, args);
	    /* nomin */
	  };
	  /* nomin */else
	  /* nomin */debug = function debug() {};
	
	// Note: this is the semver.org version of the spec that it implements
	// Not necessarily the package version of this code.
	exports.SEMVER_SPEC_VERSION = '2.0.0';
	
	var MAX_LENGTH = 256;
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
	
	// The actual regexps go on exports.re
	var re = exports.re = [];
	var src = exports.src = [];
	var R = 0;
	
	// The following Regular Expressions can be used for tokenizing,
	// validating, and parsing SemVer version strings.
	
	// ## Numeric Identifier
	// A single `0`, or a non-zero digit followed by zero or more digits.
	
	var NUMERICIDENTIFIER = R++;
	src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
	var NUMERICIDENTIFIERLOOSE = R++;
	src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';
	
	// ## Non-numeric Identifier
	// Zero or more digits, followed by a letter or hyphen, and then zero or
	// more letters, digits, or hyphens.
	
	var NONNUMERICIDENTIFIER = R++;
	src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';
	
	// ## Main Version
	// Three dot-separated numeric identifiers.
	
	var MAINVERSION = R++;
	src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')\\.' + '(' + src[NUMERICIDENTIFIER] + ')';
	
	var MAINVERSIONLOOSE = R++;
	src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' + '(' + src[NUMERICIDENTIFIERLOOSE] + ')';
	
	// ## Pre-release Version Identifier
	// A numeric identifier, or a non-numeric identifier.
	
	var PRERELEASEIDENTIFIER = R++;
	src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	var PRERELEASEIDENTIFIERLOOSE = R++;
	src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] + '|' + src[NONNUMERICIDENTIFIER] + ')';
	
	// ## Pre-release Version
	// Hyphen, followed by one or more dot-separated pre-release version
	// identifiers.
	
	var PRERELEASE = R++;
	src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] + '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';
	
	var PRERELEASELOOSE = R++;
	src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] + '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';
	
	// ## Build Metadata Identifier
	// Any combination of digits, letters, or hyphens.
	
	var BUILDIDENTIFIER = R++;
	src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';
	
	// ## Build Metadata
	// Plus sign, followed by one or more period-separated build metadata
	// identifiers.
	
	var BUILD = R++;
	src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] + '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';
	
	// ## Full Version String
	// A main version, followed optionally by a pre-release version and
	// build metadata.
	
	// Note that the only major, minor, patch, and pre-release sections of
	// the version string are capturing groups.  The build metadata is not a
	// capturing group, because it should not ever be used in version
	// comparison.
	
	var FULL = R++;
	var FULLPLAIN = 'v?' + src[MAINVERSION] + src[PRERELEASE] + '?' + src[BUILD] + '?';
	
	src[FULL] = '^' + FULLPLAIN + '$';
	
	// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
	// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
	// common in the npm registry.
	var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + '?' + src[BUILD] + '?';
	
	var LOOSE = R++;
	src[LOOSE] = '^' + LOOSEPLAIN + '$';
	
	var GTLT = R++;
	src[GTLT] = '((?:<|>)?=?)';
	
	// Something like "2.*" or "1.2.x".
	// Note that "x.x" is a valid xRange identifer, meaning "any version"
	// Only the first item is strictly required.
	var XRANGEIDENTIFIERLOOSE = R++;
	src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
	var XRANGEIDENTIFIER = R++;
	src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';
	
	var XRANGEPLAIN = R++;
	src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' + '(?:' + src[PRERELEASE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGEPLAINLOOSE = R++;
	src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' + '(?:' + src[PRERELEASELOOSE] + ')?' + src[BUILD] + '?' + ')?)?';
	
	var XRANGE = R++;
	src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
	var XRANGELOOSE = R++;
	src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';
	
	// Tilde ranges.
	// Meaning is "reasonably at or greater than"
	var LONETILDE = R++;
	src[LONETILDE] = '(?:~>?)';
	
	var TILDETRIM = R++;
	src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
	re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
	var tildeTrimReplace = '$1~';
	
	var TILDE = R++;
	src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
	var TILDELOOSE = R++;
	src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';
	
	// Caret ranges.
	// Meaning is "at least and backwards compatible with"
	var LONECARET = R++;
	src[LONECARET] = '(?:\\^)';
	
	var CARETTRIM = R++;
	src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
	re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
	var caretTrimReplace = '$1^';
	
	var CARET = R++;
	src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
	var CARETLOOSE = R++;
	src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';
	
	// A simple gt/lt/eq thing, or just "" to indicate "any version"
	var COMPARATORLOOSE = R++;
	src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
	var COMPARATOR = R++;
	src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';
	
	// An expression to strip any whitespace between the gtlt and the thing
	// it modifies, so that `> 1.2.3` ==> `>1.2.3`
	var COMPARATORTRIM = R++;
	src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] + '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';
	
	// this one has to use the /g flag
	re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
	var comparatorTrimReplace = '$1$2$3';
	
	// Something like `1.2.3 - 1.2.4`
	// Note that these all use the loose form, because they'll be
	// checked against either the strict or loose comparator form
	// later.
	var HYPHENRANGE = R++;
	src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAIN] + ')' + '\\s*$';
	
	var HYPHENRANGELOOSE = R++;
	src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' + '\\s+-\\s+' + '(' + src[XRANGEPLAINLOOSE] + ')' + '\\s*$';
	
	// Star ranges basically just allow anything at all.
	var STAR = R++;
	src[STAR] = '(<|>)?=?\\s*\\*';
	
	// Compile to actual regexp objects.
	// All are flag-free, unless they were created above with a flag.
	for (var i = 0; i < R; i++) {
	  debug(i, src[i]);
	  if (!re[i]) re[i] = new RegExp(src[i]);
	}
	
	exports.parse = parse;
	function parse(version, loose) {
	  if (version instanceof SemVer) return version;
	
	  if (typeof version !== 'string') return null;
	
	  if (version.length > MAX_LENGTH) return null;
	
	  var r = loose ? re[LOOSE] : re[FULL];
	  if (!r.test(version)) return null;
	
	  try {
	    return new SemVer(version, loose);
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.valid = valid;
	function valid(version, loose) {
	  var v = parse(version, loose);
	  return v ? v.version : null;
	}
	
	exports.clean = clean;
	function clean(version, loose) {
	  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
	  return s ? s.version : null;
	}
	
	exports.SemVer = SemVer;
	
	function SemVer(version, loose) {
	  if (version instanceof SemVer) {
	    if (version.loose === loose) return version;else version = version.version;
	  } else if (typeof version !== 'string') {
	    throw new TypeError('Invalid Version: ' + version);
	  }
	
	  if (version.length > MAX_LENGTH) throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters');
	
	  if (!(this instanceof SemVer)) return new SemVer(version, loose);
	
	  debug('SemVer', version, loose);
	  this.loose = loose;
	  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);
	
	  if (!m) throw new TypeError('Invalid Version: ' + version);
	
	  this.raw = version;
	
	  // these are actually numbers
	  this.major = +m[1];
	  this.minor = +m[2];
	  this.patch = +m[3];
	
	  if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError('Invalid major version');
	
	  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError('Invalid minor version');
	
	  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError('Invalid patch version');
	
	  // numberify any prerelease numeric ids
	  if (!m[4]) this.prerelease = [];else this.prerelease = m[4].split('.').map(function (id) {
	    if (/^[0-9]+$/.test(id)) {
	      var num = +id;
	      if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
	    }
	    return id;
	  });
	
	  this.build = m[5] ? m[5].split('.') : [];
	  this.format();
	}
	
	SemVer.prototype.format = function () {
	  this.version = this.major + '.' + this.minor + '.' + this.patch;
	  if (this.prerelease.length) this.version += '-' + this.prerelease.join('.');
	  return this.version;
	};
	
	SemVer.prototype.toString = function () {
	  return this.version;
	};
	
	SemVer.prototype.compare = function (other) {
	  debug('SemVer.compare', this.version, this.loose, other);
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return this.compareMain(other) || this.comparePre(other);
	};
	
	SemVer.prototype.compareMain = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
	};
	
	SemVer.prototype.comparePre = function (other) {
	  if (!(other instanceof SemVer)) other = new SemVer(other, this.loose);
	
	  // NOT having a prerelease is > having one
	  if (this.prerelease.length && !other.prerelease.length) return -1;else if (!this.prerelease.length && other.prerelease.length) return 1;else if (!this.prerelease.length && !other.prerelease.length) return 0;
	
	  var i = 0;
	  do {
	    var a = this.prerelease[i];
	    var b = other.prerelease[i];
	    debug('prerelease compare', i, a, b);
	    if (a === undefined && b === undefined) return 0;else if (b === undefined) return 1;else if (a === undefined) return -1;else if (a === b) continue;else return compareIdentifiers(a, b);
	  } while (++i);
	};
	
	// preminor will bump the version up to the next minor release, and immediately
	// down to pre-release. premajor and prepatch work the same way.
	SemVer.prototype.inc = function (release, identifier) {
	  switch (release) {
	    case 'premajor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor = 0;
	      this.major++;
	      this.inc('pre', identifier);
	      break;
	    case 'preminor':
	      this.prerelease.length = 0;
	      this.patch = 0;
	      this.minor++;
	      this.inc('pre', identifier);
	      break;
	    case 'prepatch':
	      // If this is already a prerelease, it will bump to the next version
	      // drop any prereleases that might already exist, since they are not
	      // relevant at this point.
	      this.prerelease.length = 0;
	      this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	    // If the input is a non-prerelease version, this acts the same as
	    // prepatch.
	    case 'prerelease':
	      if (this.prerelease.length === 0) this.inc('patch', identifier);
	      this.inc('pre', identifier);
	      break;
	
	    case 'major':
	      // If this is a pre-major version, bump up to the same major version.
	      // Otherwise increment major.
	      // 1.0.0-5 bumps to 1.0.0
	      // 1.1.0 bumps to 2.0.0
	      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
	      this.minor = 0;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'minor':
	      // If this is a pre-minor version, bump up to the same minor version.
	      // Otherwise increment minor.
	      // 1.2.0-5 bumps to 1.2.0
	      // 1.2.1 bumps to 1.3.0
	      if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
	      this.patch = 0;
	      this.prerelease = [];
	      break;
	    case 'patch':
	      // If this is not a pre-release version, it will increment the patch.
	      // If it is a pre-release it will bump up to the same patch version.
	      // 1.2.0-5 patches to 1.2.0
	      // 1.2.0 patches to 1.2.1
	      if (this.prerelease.length === 0) this.patch++;
	      this.prerelease = [];
	      break;
	    // This probably shouldn't be used publicly.
	    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
	    case 'pre':
	      if (this.prerelease.length === 0) this.prerelease = [0];else {
	        var i = this.prerelease.length;
	        while (--i >= 0) {
	          if (typeof this.prerelease[i] === 'number') {
	            this.prerelease[i]++;
	            i = -2;
	          }
	        }
	        if (i === -1) // didn't increment anything
	          this.prerelease.push(0);
	      }
	      if (identifier) {
	        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
	        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
	        if (this.prerelease[0] === identifier) {
	          if (isNaN(this.prerelease[1])) this.prerelease = [identifier, 0];
	        } else this.prerelease = [identifier, 0];
	      }
	      break;
	
	    default:
	      throw new Error('invalid increment argument: ' + release);
	  }
	  this.format();
	  this.raw = this.version;
	  return this;
	};
	
	exports.inc = inc;
	function inc(version, release, loose, identifier) {
	  if (typeof loose === 'string') {
	    identifier = loose;
	    loose = undefined;
	  }
	
	  try {
	    return new SemVer(version, loose).inc(release, identifier).version;
	  } catch (er) {
	    return null;
	  }
	}
	
	exports.diff = diff;
	function diff(version1, version2) {
	  if (eq(version1, version2)) {
	    return null;
	  } else {
	    var v1 = parse(version1);
	    var v2 = parse(version2);
	    if (v1.prerelease.length || v2.prerelease.length) {
	      for (var key in v1) {
	        if (key === 'major' || key === 'minor' || key === 'patch') {
	          if (v1[key] !== v2[key]) {
	            return 'pre' + key;
	          }
	        }
	      }
	      return 'prerelease';
	    }
	    for (var key in v1) {
	      if (key === 'major' || key === 'minor' || key === 'patch') {
	        if (v1[key] !== v2[key]) {
	          return key;
	        }
	      }
	    }
	  }
	}
	
	exports.compareIdentifiers = compareIdentifiers;
	
	var numeric = /^[0-9]+$/;
	function compareIdentifiers(a, b) {
	  var anum = numeric.test(a);
	  var bnum = numeric.test(b);
	
	  if (anum && bnum) {
	    a = +a;
	    b = +b;
	  }
	
	  return anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : a > b ? 1 : 0;
	}
	
	exports.rcompareIdentifiers = rcompareIdentifiers;
	function rcompareIdentifiers(a, b) {
	  return compareIdentifiers(b, a);
	}
	
	exports.major = major;
	function major(a, loose) {
	  return new SemVer(a, loose).major;
	}
	
	exports.minor = minor;
	function minor(a, loose) {
	  return new SemVer(a, loose).minor;
	}
	
	exports.patch = patch;
	function patch(a, loose) {
	  return new SemVer(a, loose).patch;
	}
	
	exports.compare = compare;
	function compare(a, b, loose) {
	  return new SemVer(a, loose).compare(b);
	}
	
	exports.compareLoose = compareLoose;
	function compareLoose(a, b) {
	  return compare(a, b, true);
	}
	
	exports.rcompare = rcompare;
	function rcompare(a, b, loose) {
	  return compare(b, a, loose);
	}
	
	exports.sort = sort;
	function sort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.compare(a, b, loose);
	  });
	}
	
	exports.rsort = rsort;
	function rsort(list, loose) {
	  return list.sort(function (a, b) {
	    return exports.rcompare(a, b, loose);
	  });
	}
	
	exports.gt = gt;
	function gt(a, b, loose) {
	  return compare(a, b, loose) > 0;
	}
	
	exports.lt = lt;
	function lt(a, b, loose) {
	  return compare(a, b, loose) < 0;
	}
	
	exports.eq = eq;
	function eq(a, b, loose) {
	  return compare(a, b, loose) === 0;
	}
	
	exports.neq = neq;
	function neq(a, b, loose) {
	  return compare(a, b, loose) !== 0;
	}
	
	exports.gte = gte;
	function gte(a, b, loose) {
	  return compare(a, b, loose) >= 0;
	}
	
	exports.lte = lte;
	function lte(a, b, loose) {
	  return compare(a, b, loose) <= 0;
	}
	
	exports.cmp = cmp;
	function cmp(a, op, b, loose) {
	  var ret;
	  switch (op) {
	    case '===':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a === b;
	      break;
	    case '!==':
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') a = a.version;
	      if ((typeof b === 'undefined' ? 'undefined' : _typeof(b)) === 'object') b = b.version;
	      ret = a !== b;
	      break;
	    case '':case '=':case '==':
	      ret = eq(a, b, loose);break;
	    case '!=':
	      ret = neq(a, b, loose);break;
	    case '>':
	      ret = gt(a, b, loose);break;
	    case '>=':
	      ret = gte(a, b, loose);break;
	    case '<':
	      ret = lt(a, b, loose);break;
	    case '<=':
	      ret = lte(a, b, loose);break;
	    default:
	      throw new TypeError('Invalid operator: ' + op);
	  }
	  return ret;
	}
	
	exports.Comparator = Comparator;
	function Comparator(comp, loose) {
	  if (comp instanceof Comparator) {
	    if (comp.loose === loose) return comp;else comp = comp.value;
	  }
	
	  if (!(this instanceof Comparator)) return new Comparator(comp, loose);
	
	  debug('comparator', comp, loose);
	  this.loose = loose;
	  this.parse(comp);
	
	  if (this.semver === ANY) this.value = '';else this.value = this.operator + this.semver.version;
	
	  debug('comp', this);
	}
	
	var ANY = {};
	Comparator.prototype.parse = function (comp) {
	  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var m = comp.match(r);
	
	  if (!m) throw new TypeError('Invalid comparator: ' + comp);
	
	  this.operator = m[1];
	  if (this.operator === '=') this.operator = '';
	
	  // if it literally is just '>' or '' then allow anything.
	  if (!m[2]) this.semver = ANY;else this.semver = new SemVer(m[2], this.loose);
	};
	
	Comparator.prototype.toString = function () {
	  return this.value;
	};
	
	Comparator.prototype.test = function (version) {
	  debug('Comparator.test', version, this.loose);
	
	  if (this.semver === ANY) return true;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  return cmp(version, this.operator, this.semver, this.loose);
	};
	
	exports.Range = Range;
	function Range(range, loose) {
	  if (range instanceof Range && range.loose === loose) return range;
	
	  if (!(this instanceof Range)) return new Range(range, loose);
	
	  this.loose = loose;
	
	  // First, split based on boolean or ||
	  this.raw = range;
	  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
	    return this.parseRange(range.trim());
	  }, this).filter(function (c) {
	    // throw out any that are not relevant for whatever reason
	    return c.length;
	  });
	
	  if (!this.set.length) {
	    throw new TypeError('Invalid SemVer Range: ' + range);
	  }
	
	  this.format();
	}
	
	Range.prototype.format = function () {
	  this.range = this.set.map(function (comps) {
	    return comps.join(' ').trim();
	  }).join('||').trim();
	  return this.range;
	};
	
	Range.prototype.toString = function () {
	  return this.range;
	};
	
	Range.prototype.parseRange = function (range) {
	  var loose = this.loose;
	  range = range.trim();
	  debug('range', range, loose);
	  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
	  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
	  range = range.replace(hr, hyphenReplace);
	  debug('hyphen replace', range);
	  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
	  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
	  debug('comparator trim', range, re[COMPARATORTRIM]);
	
	  // `~ 1.2.3` => `~1.2.3`
	  range = range.replace(re[TILDETRIM], tildeTrimReplace);
	
	  // `^ 1.2.3` => `^1.2.3`
	  range = range.replace(re[CARETTRIM], caretTrimReplace);
	
	  // normalize spaces
	  range = range.split(/\s+/).join(' ');
	
	  // At this point, the range is completely trimmed and
	  // ready to be split into comparators.
	
	  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
	  var set = range.split(' ').map(function (comp) {
	    return parseComparator(comp, loose);
	  }).join(' ').split(/\s+/);
	  if (this.loose) {
	    // in loose mode, throw out any that are not valid comparators
	    set = set.filter(function (comp) {
	      return !!comp.match(compRe);
	    });
	  }
	  set = set.map(function (comp) {
	    return new Comparator(comp, loose);
	  });
	
	  return set;
	};
	
	// Mostly just for testing and legacy API reasons
	exports.toComparators = toComparators;
	function toComparators(range, loose) {
	  return new Range(range, loose).set.map(function (comp) {
	    return comp.map(function (c) {
	      return c.value;
	    }).join(' ').trim().split(' ');
	  });
	}
	
	// comprised of xranges, tildes, stars, and gtlt's at this point.
	// already replaced the hyphen ranges
	// turn into a set of JUST comparators.
	function parseComparator(comp, loose) {
	  debug('comp', comp);
	  comp = replaceCarets(comp, loose);
	  debug('caret', comp);
	  comp = replaceTildes(comp, loose);
	  debug('tildes', comp);
	  comp = replaceXRanges(comp, loose);
	  debug('xrange', comp);
	  comp = replaceStars(comp, loose);
	  debug('stars', comp);
	  return comp;
	}
	
	function isX(id) {
	  return !id || id.toLowerCase() === 'x' || id === '*';
	}
	
	// ~, ~> --> * (any, kinda silly)
	// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
	// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
	// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
	// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
	// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
	function replaceTildes(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceTilde(comp, loose);
	  }).join(' ');
	}
	
	function replaceTilde(comp, loose) {
	  var r = loose ? re[TILDELOOSE] : re[TILDE];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('tilde', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p))
	      // ~1.2 == >=1.2.0- <1.3.0-
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else if (pr) {
	      debug('replaceTilde pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	    } else
	      // ~1.2.3 == >=1.2.3 <1.3.0
	      ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	
	    debug('tilde return', ret);
	    return ret;
	  });
	}
	
	// ^ --> * (any, kinda silly)
	// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
	// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
	// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
	// ^1.2.3 --> >=1.2.3 <2.0.0
	// ^1.2.0 --> >=1.2.0 <2.0.0
	function replaceCarets(comp, loose) {
	  return comp.trim().split(/\s+/).map(function (comp) {
	    return replaceCaret(comp, loose);
	  }).join(' ');
	}
	
	function replaceCaret(comp, loose) {
	  debug('caret', comp, loose);
	  var r = loose ? re[CARETLOOSE] : re[CARET];
	  return comp.replace(r, function (_, M, m, p, pr) {
	    debug('caret', comp, _, M, m, p, pr);
	    var ret;
	
	    if (isX(M)) ret = '';else if (isX(m)) ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';else if (isX(p)) {
	      if (M === '0') ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';else ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
	    } else if (pr) {
	      debug('replaceCaret pr', pr);
	      if (pr.charAt(0) !== '-') pr = '-' + pr;
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + pr + ' <' + (+M + 1) + '.0.0';
	    } else {
	      debug('no pr');
	      if (M === '0') {
	        if (m === '0') ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + m + '.' + (+p + 1);else ret = '>=' + M + '.' + m + '.' + p + ' <' + M + '.' + (+m + 1) + '.0';
	      } else ret = '>=' + M + '.' + m + '.' + p + ' <' + (+M + 1) + '.0.0';
	    }
	
	    debug('caret return', ret);
	    return ret;
	  });
	}
	
	function replaceXRanges(comp, loose) {
	  debug('replaceXRanges', comp, loose);
	  return comp.split(/\s+/).map(function (comp) {
	    return replaceXRange(comp, loose);
	  }).join(' ');
	}
	
	function replaceXRange(comp, loose) {
	  comp = comp.trim();
	  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
	  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
	    debug('xRange', comp, ret, gtlt, M, m, p, pr);
	    var xM = isX(M);
	    var xm = xM || isX(m);
	    var xp = xm || isX(p);
	    var anyX = xp;
	
	    if (gtlt === '=' && anyX) gtlt = '';
	
	    if (xM) {
	      if (gtlt === '>' || gtlt === '<') {
	        // nothing is allowed
	        ret = '<0.0.0';
	      } else {
	        // nothing is forbidden
	        ret = '*';
	      }
	    } else if (gtlt && anyX) {
	      // replace X with 0
	      if (xm) m = 0;
	      if (xp) p = 0;
	
	      if (gtlt === '>') {
	        // >1 => >=2.0.0
	        // >1.2 => >=1.3.0
	        // >1.2.3 => >= 1.2.4
	        gtlt = '>=';
	        if (xm) {
	          M = +M + 1;
	          m = 0;
	          p = 0;
	        } else if (xp) {
	          m = +m + 1;
	          p = 0;
	        }
	      } else if (gtlt === '<=') {
	        // <=0.7.x is actually <0.8.0, since any 0.7.x should
	        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
	        gtlt = '<';
	        if (xm) M = +M + 1;else m = +m + 1;
	      }
	
	      ret = gtlt + M + '.' + m + '.' + p;
	    } else if (xm) {
	      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
	    } else if (xp) {
	      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
	    }
	
	    debug('xRange return', ret);
	
	    return ret;
	  });
	}
	
	// Because * is AND-ed with everything else in the comparator,
	// and '' means "any version", just remove the *s entirely.
	function replaceStars(comp, loose) {
	  debug('replaceStars', comp, loose);
	  // Looseness is ignored here.  star is always as loose as it gets!
	  return comp.trim().replace(re[STAR], '');
	}
	
	// This function is passed to string.replace(re[HYPHENRANGE])
	// M, m, patch, prerelease, build
	// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
	// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
	// 1.2 - 3.4 => >=1.2.0 <3.5.0
	function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
	
	  if (isX(fM)) from = '';else if (isX(fm)) from = '>=' + fM + '.0.0';else if (isX(fp)) from = '>=' + fM + '.' + fm + '.0';else from = '>=' + from;
	
	  if (isX(tM)) to = '';else if (isX(tm)) to = '<' + (+tM + 1) + '.0.0';else if (isX(tp)) to = '<' + tM + '.' + (+tm + 1) + '.0';else if (tpr) to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;else to = '<=' + to;
	
	  return (from + ' ' + to).trim();
	}
	
	// if ANY of the sets match ALL of its comparators, then pass
	Range.prototype.test = function (version) {
	  if (!version) return false;
	
	  if (typeof version === 'string') version = new SemVer(version, this.loose);
	
	  for (var i = 0; i < this.set.length; i++) {
	    if (testSet(this.set[i], version)) return true;
	  }
	  return false;
	};
	
	function testSet(set, version) {
	  for (var i = 0; i < set.length; i++) {
	    if (!set[i].test(version)) return false;
	  }
	
	  if (version.prerelease.length) {
	    // Find the set of versions that are allowed to have prereleases
	    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
	    // That should allow `1.2.3-pr.2` to pass.
	    // However, `1.2.4-alpha.notready` should NOT be allowed,
	    // even though it's within the range set by the comparators.
	    for (var i = 0; i < set.length; i++) {
	      debug(set[i].semver);
	      if (set[i].semver === ANY) continue;
	
	      if (set[i].semver.prerelease.length > 0) {
	        var allowed = set[i].semver;
	        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
	      }
	    }
	
	    // Version has a -pre, but it's not one of the ones we like.
	    return false;
	  }
	
	  return true;
	}
	
	exports.satisfies = satisfies;
	function satisfies(version, range, loose) {
	  try {
	    range = new Range(range, loose);
	  } catch (er) {
	    return false;
	  }
	  return range.test(version);
	}
	
	exports.maxSatisfying = maxSatisfying;
	function maxSatisfying(versions, range, loose) {
	  return versions.filter(function (version) {
	    return satisfies(version, range, loose);
	  }).sort(function (a, b) {
	    return rcompare(a, b, loose);
	  })[0] || null;
	}
	
	exports.validRange = validRange;
	function validRange(range, loose) {
	  try {
	    // Return '*' instead of '' so that truthiness works.
	    // This will throw if it's invalid anyway
	    return new Range(range, loose).range || '*';
	  } catch (er) {
	    return null;
	  }
	}
	
	// Determine if version is less than all the versions possible in the range
	exports.ltr = ltr;
	function ltr(version, range, loose) {
	  return outside(version, range, '<', loose);
	}
	
	// Determine if version is greater than all the versions possible in the range.
	exports.gtr = gtr;
	function gtr(version, range, loose) {
	  return outside(version, range, '>', loose);
	}
	
	exports.outside = outside;
	function outside(version, range, hilo, loose) {
	  version = new SemVer(version, loose);
	  range = new Range(range, loose);
	
	  var gtfn, ltefn, ltfn, comp, ecomp;
	  switch (hilo) {
	    case '>':
	      gtfn = gt;
	      ltefn = lte;
	      ltfn = lt;
	      comp = '>';
	      ecomp = '>=';
	      break;
	    case '<':
	      gtfn = lt;
	      ltefn = gte;
	      ltfn = gt;
	      comp = '<';
	      ecomp = '<=';
	      break;
	    default:
	      throw new TypeError('Must provide a hilo val of "<" or ">"');
	  }
	
	  // If it satisifes the range it is not outside
	  if (satisfies(version, range, loose)) {
	    return false;
	  }
	
	  // From now on, variable terms are as if we're in "gtr" mode.
	  // but note that everything is flipped for the "ltr" function.
	
	  for (var i = 0; i < range.set.length; ++i) {
	    var comparators = range.set[i];
	
	    var high = null;
	    var low = null;
	
	    comparators.forEach(function (comparator) {
	      if (comparator.semver === ANY) {
	        comparator = new Comparator('>=0.0.0');
	      }
	      high = high || comparator;
	      low = low || comparator;
	      if (gtfn(comparator.semver, high.semver, loose)) {
	        high = comparator;
	      } else if (ltfn(comparator.semver, low.semver, loose)) {
	        low = comparator;
	      }
	    });
	
	    // If the edge version comparator has a operator then our version
	    // isn't outside it
	    if (high.operator === comp || high.operator === ecomp) {
	      return false;
	    }
	
	    // If the lowest version comparator has an operator and our version
	    // is less than it then it isn't higher than the range
	    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
	      return false;
	    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
	      return false;
	    }
	  }
	  return true;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49)))

/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';
	
	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Vm;
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	var _scope = __webpack_require__(51);
	
	var scope = _interopRequireWildcard(_scope);
	
	var _compiler = __webpack_require__(58);
	
	var compiler = _interopRequireWildcard(_compiler);
	
	var _directive = __webpack_require__(59);
	
	var directive = _interopRequireWildcard(_directive);
	
	var _domHelper = __webpack_require__(61);
	
	var domHelper = _interopRequireWildcard(_domHelper);
	
	var _events = __webpack_require__(62);
	
	var events = _interopRequireWildcard(_events);
	
	var _register = __webpack_require__(63);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function callOldReadyEntry(vm, component) {
	  if (component.methods && component.methods.ready) {
	    _.warn('"exports.methods.ready" is deprecated, ' + 'please use "exports.created" instead');
	    component.methods.ready.call(vm);
	  }
	}
	
	/**
	 * ViewModel constructor
	 *
	 * @param {string} type
	 * @param {object} parentVm   which contains _app
	 * @param {object} parentEl   root element or frag block
	 * @param {object} mergedData external data
	 * @param {object} externalEvents external events
	 */
	/**
	 * @fileOverview
	 * ViewModel Constructor & definition
	 */
	
	function Vm(type, parentVm, parentEl, mergedData, externalEvents) {
	  this._parent = parentVm._realParent ? parentVm._realParent : parentVm;
	  this._app = parentVm._app;
	  parentVm._childrenVms && parentVm._childrenVms.push(this);
	
	  var component = this._app.customComponentMap[type] || {};
	  var data = component.data || {};
	
	  this._options = component;
	  this._methods = component.methods || {};
	  this._computed = component.computed || {};
	  this._css = component.style || {};
	  this._ids = {};
	  this._watchers = [];
	  this._vmEvents = {};
	  this._childrenVms = [];
	  this._type = type;
	
	  // bind events and lifecycles
	  this._initEvents(externalEvents);
	
	  _.debug('"init" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:init');
	  this._inited = true;
	  // proxy data and methods
	  // observe data and add this to vms
	  this._data = typeof data === 'function' ? data() : data;
	  if (mergedData) {
	    _.extend(this._data, mergedData);
	  }
	  this._initScope();
	
	  _.debug('"created" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:created');
	  this._created = true;
	  // backward old ready entry
	  callOldReadyEntry(this, component);
	
	  // if no parentElement then specify the documentElement
	  this._parentEl = parentEl || this._app.doc.documentElement;
	  this._build();
	}
	
	_.extend(Vm.prototype, scope, compiler, directive, domHelper, events);
	_.extend(Vm, {
	  registerModules: _register.registerModules,
	  registerMethods: _register.registerMethods
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(52);
	var Observer = __webpack_require__(53);
	var Dep = __webpack_require__(55);
	
	/**
	 * Setup the scope of an instance, which contains:
	 * - observed data
	 * - computed properties
	 * - user methods
	 * - meta properties
	 */
	
	exports._initScope = function () {
	  this._initData();
	  this._initComputed();
	  this._initMethods();
	  // this._initMeta()
	};
	
	/**
	 * Initialize the data. 
	 */
	
	var KEY_WORDS = ['$index', '$value', '$event'];
	exports._initData = function () {
	  // proxy data on instance
	  var data = this._data;
	  var i, key;
	  // // make sure all props properties are observed
	  // var props = this.$options.props
	  // if (props) {
	  //   i = props.length
	  //   while (i--) {
	  //     key = _.camelize(props[i])
	  //     if (!(key in data)) {
	  //       data[key] = null
	  //     }
	  //   }
	  // }
	  var keys = Object.keys(data);
	  i = keys.length;
	  while (i--) {
	    key = keys[i];
	    if (KEY_WORDS.indexOf(key) > -1 || !_.isReserved(key)) {
	      this._proxy(key);
	    }
	  }
	  // observe data
	  Observer.create(data).addVm(this);
	};
	
	// /**
	//  * Swap the isntance's $data. Called in $data's setter.
	//  *
	//  * @param {Object} newData
	//  */
	
	// exports._setData = function (newData) {
	//   newData = newData || {}
	//   var oldData = this._data
	//   this._data = newData
	//   var keys, key, i
	//   // unproxy keys not present in new data
	//   keys = Object.keys(oldData)
	//   i = keys.length
	//   while (i--) {
	//     key = keys[i]
	//     if (!_.isReserved(key) && !(key in newData)) {
	//       this._unproxy(key)
	//     }
	//   }
	//   // proxy keys not already proxied,
	//   // and trigger change for changed values
	//   keys = Object.keys(newData)
	//   i = keys.length
	//   while (i--) {
	//     key = keys[i]
	//     if (!this.hasOwnProperty(key) && !_.isReserved(key)) {
	//       // new property
	//       this._proxy(key)
	//     }
	//   }
	//   oldData.__ob__.removeVm(this)
	//   Observer.create(newData).addVm(this)
	//   this._digest()
	// }
	
	/**
	 * Proxy a property, so that
	 * vm.prop === vm._data.prop
	 *
	 * @param {String} key
	 */
	
	exports._proxy = function (key) {
	  // need to store ref to self here
	  // because these getter/setters might
	  // be called by child instances!
	  var self = this;
	  Object.defineProperty(self, key, {
	    configurable: true,
	    enumerable: true,
	    get: function proxyGetter() {
	      return self._data[key];
	    },
	    set: function proxySetter(val) {
	      self._data[key] = val;
	    }
	  });
	};
	
	/**
	 * Unproxy a property.
	 *
	 * @param {String} key
	 */
	
	exports._unproxy = function (key) {
	  /* istanbul ignore next */
	  delete this[key];
	};
	
	// /**
	//  * Force update on every watcher in scope.
	//  */
	
	// exports._digest = function () {
	//   var i = this._watchers.length
	//   while (i--) {
	//     this._watchers[i].update()
	//   }
	//   var children = this._children
	//   i = children.length
	//   while (i--) {
	//     var child = children[i]
	//     if (child.$options.inherit) {
	//       child._digest()
	//     }
	//   }
	// }
	
	/**
	 * Setup computed properties. They are essentially
	 * special getter/setters
	 */
	
	function noop() {}
	exports._initComputed = function () {
	  // var computed = this.$options.computed
	  var computed = this._computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      var def = {
	        enumerable: true,
	        configurable: true
	      };
	      if (typeof userDef === 'function') {
	        def.get = _.bind(userDef, this);
	        def.set = noop;
	      } else {
	        def.get = userDef.get ? _.bind(userDef.get, this) : noop;
	        def.set = userDef.set ? _.bind(userDef.set, this) : noop;
	      }
	      Object.defineProperty(this, key, def);
	    }
	  }
	};
	
	/**
	 * Setup instance methods. Methods must be bound to the
	 * instance since they might be called by children
	 * inheriting them.
	 */
	
	exports._initMethods = function () {
	  // var methods = this.$options.methods
	  var methods = this._methods;
	  if (methods) {
	    for (var key in methods) {
	      this[key] = _.bind(methods[key], this);
	    }
	  }
	};
	
	// /**
	//  * Initialize meta information like $index, $key & $value.
	//  */

	// exports._initMeta = function () {
	//   var metas = this.$options._meta
	//   if (metas) {
	//     for (var key in metas) {
	//       this._defineMeta(key, metas[key])
	//     }
	//   }
	// }

	// /**
	//  * Define a meta property, e.g $index, $key, $value
	//  * which only exists on the vm instance but not in $data.
	//  *
	//  * @param {String} key
	//  * @param {*} value
	//  */

	// exports._defineMeta = function (key, value) {
	//   var dep = new Dep()
	//   Object.defineProperty(this, key, {
	//     enumerable: true,
	//     configurable: true,
	//     get: function metaGetter () {
	//       if (Observer.target) {
	//         Observer.target.addDep(dep)
	//       }
	//       return value
	//     },
	//     set: function metaSetter (val) {
	//       if (val !== value) {
	//         value = val
	//         dep.notify()
	//       }
	//     }
	//   })
	// }

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// required for code in instance/observer
	module.exports = __webpack_require__(46);

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(52);
	var config = __webpack_require__(54);
	var Dep = __webpack_require__(55);
	var arrayMethods = __webpack_require__(56);
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	__webpack_require__(57);
	
	var uid = 0;
	
	/**
	 * Type enums
	 */
	
	var ARRAY = 0;
	var OBJECT = 1;
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  target.__proto__ = src;
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  var i = keys.length;
	  var key;
	  while (i--) {
	    key = keys[i];
	    _.define(target, key, src[key]);
	  }
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @param {Number} type
	 * @constructor
	 */
	
	function Observer(value, type) {
	  this.id = ++uid;
	  this.value = value;
	  this.active = true;
	  this.deps = [];
	  _.define(value, '__ob__', this);
	  if (type === ARRAY) {
	    var augment = config.proto && _.hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else if (type === OBJECT) {
	    this.walk(value);
	  }
	}
	
	Observer.target = null;
	
	var p = Observer.prototype;
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @return {Observer|undefined}
	 * @static
	 */
	
	Observer.create = function (value) {
	  if (value && value.hasOwnProperty('__ob__') && value.__ob__ instanceof Observer) {
	    return value.__ob__;
	  } else if (_.isArray(value)) {
	    return new Observer(value, ARRAY);
	  } else if (_.isPlainObject(value) && !value._isVue // avoid Vue instance
	  ) {
	      return new Observer(value, OBJECT);
	    }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object. Properties prefixed with `$` or `_`
	 * and accessor properties are ignored.
	 *
	 * @param {Object} obj
	 */
	
	p.walk = function (obj) {
	  var keys = Object.keys(obj);
	  var i = keys.length;
	  var key, prefix;
	  while (i--) {
	    key = keys[i];
	    prefix = key.charCodeAt(0);
	    if (prefix !== 0x24 && prefix !== 0x5F) {
	      // skip $ or _
	      this.convert(key, obj[key]);
	    }
	  }
	};
	
	/**
	 * Try to carete an observer for a child value,
	 * and if value is array, link dep to the array.
	 *
	 * @param {*} val
	 * @return {Dep|undefined}
	 */
	
	p.observe = function (val) {
	  return Observer.create(val);
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	p.observeArray = function (items) {
	  var i = items.length;
	  while (i--) {
	    this.observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	p.convert = function (key, val) {
	  var ob = this;
	  var childOb = ob.observe(val);
	  var dep = new Dep();
	  if (childOb) {
	    childOb.deps.push(dep);
	  }
	  Object.defineProperty(ob.value, key, {
	    enumerable: true,
	    configurable: true,
	    get: function get() {
	      // Observer.target is a watcher whose getter is
	      // currently being evaluated.
	      if (ob.active && Observer.target) {
	        Observer.target.addDep(dep);
	      }
	      return val;
	    },
	    set: function set(newVal) {
	      if (newVal === val) return;
	      // remove dep from old value
	      var oldChildOb = val && val.__ob__;
	      if (oldChildOb) {
	        oldChildOb.deps.$remove(dep);
	      }
	      val = newVal;
	      // add dep to new value
	      var newChildOb = ob.observe(newVal);
	      if (newChildOb) {
	        newChildOb.deps.push(dep);
	      }
	      dep.notify();
	    }
	  });
	};
	
	/**
	 * Notify change on all self deps on an observer.
	 * This is called when a mutable value mutates. e.g.
	 * when an Array's mutating methods are called, or an
	 * Object's $add/$delete are called.
	 */
	
	p.notify = function () {
	  var deps = this.deps;
	  for (var i = 0, l = deps.length; i < l; i++) {
	    deps[i].notify();
	  }
	};
	
	/**
	 * Add an owner vm, so that when $add/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	p.addVm = function (vm) {
	  (this.vms = this.vms || []).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	p.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	module.exports = Observer;

/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = { proto: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(52);
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	
	function Dep() {
	  this.subs = [];
	}
	
	var p = Dep.prototype;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	p.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	p.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	p.notify = function () {
	  // stablize the subscriber list first
	  var subs = _.toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	module.exports = Dep;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(52);
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  _.define(arrayMethods, method, function mutator() {
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
	    ob.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	_.define(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = index + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	_.define(arrayProto, '$remove', function $remove(index) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  if (typeof index !== 'number') {
	    index = _.indexOf(this, index);
	  }
	  if (index > -1) {
	    this.splice(index, 1);
	  }
	});
	
	module.exports = arrayMethods;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(52);
	var objProto = Object.prototype;
	
	/**
	 * Add a new property to an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	_.define(objProto, '$add', function $add(key, val) {
	  if (this.hasOwnProperty(key)) return;
	  var ob = this.__ob__;
	  if (!ob || _.isReserved(key)) {
	    this[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      // vm._digest() // todo
	    }
	  }
	});
	
	/**
	 * Set a property on an observed object, calling add to
	 * ensure the property is observed.
	 *
	 * @param {String} key
	 * @param {*} val
	 * @public
	 */
	
	_.define(objProto, '$set', function $set(key, val) {
	  this.$add(key, val);
	  this[key] = val;
	});
	
	/**
	 * Deletes a property from an observed object
	 * and emits corresponding event
	 *
	 * @param {String} key
	 * @public
	 */
	
	_.define(objProto, '$delete', function $delete(key) {
	  if (!this.hasOwnProperty(key)) return;
	  delete this[key];
	  var ob = this.__ob__;
	  if (!ob || _.isReserved(key)) {
	    return;
	  }
	  ob.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      // vm._digest() // todo
	    }
	  }
	});

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * ViewModel template parser & data-binding process
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * required:
	                                                                                                                                                                                                                                                   * index.js: Vm
	                                                                                                                                                                                                                                                   * dom-helper.js: _createElement, _createBlock
	                                                                                                                                                                                                                                                   * dom-helper.js: _attachTarget, _moveTarget, _removeTarget
	                                                                                                                                                                                                                                                   * directive.js: _bindElement, _bindSubVm, _watch
	                                                                                                                                                                                                                                                   * events.js: $on
	                                                                                                                                                                                                                                                   */
	
	exports._build = _build;
	exports._compile = _compile;
	exports._targetIsFragment = _targetIsFragment;
	exports._targetIsContent = _targetIsContent;
	exports._targetNeedCheckRepeat = _targetNeedCheckRepeat;
	exports._targetNeedCheckShown = _targetNeedCheckShown;
	exports._targetNeedCheckType = _targetNeedCheckType;
	exports._targetIsComposed = _targetIsComposed;
	exports._compileFragment = _compileFragment;
	exports._compileRepeat = _compileRepeat;
	exports._compileShown = _compileShown;
	exports._compileType = _compileType;
	exports._compileCustomComponent = _compileCustomComponent;
	exports._compileNativeComponent = _compileNativeComponent;
	exports._compileChildren = _compileChildren;
	exports._bindRepeat = _bindRepeat;
	exports._bindShown = _bindShown;
	exports._watchBlock = _watchBlock;
	exports._mergeContext = _mergeContext;
	
	var _util = __webpack_require__(52);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * build(externalDirs)
	 *   createVm()
	 *   merge(externalDirs, dirs)
	 *   compile(template, parentNode)
	 *     if (type is content) create contentNode
	 *     else if (dirs have v-for) foreach -> create context
	 *       -> compile(templateWithoutFor, parentNode): diff(list) onchange
	 *     else if (dirs have v-if) assert
	 *       -> compile(templateWithoutIf, parentNode): toggle(shown) onchange
	 *     else if (type is native)
	 *       set(dirs): update(id/attr/style/class) onchange
	 *       append(template, parentNode)
	 *       foreach childNodes -> compile(childNode, template)
	 *     else if (type is custom)
	 *       addChildVm(vm, parentVm)
	 *       build(externalDirs)
	 *       foreach childNodes -> compile(childNode, template)
	 */
	function _build() {
	  var opt = this._options || {};
	  var template = opt.template || {};
	
	  if (opt.replace) {
	    if (template.children && template.children.length === 1) {
	      this._compile(template.children[0], this._parentEl);
	    } else {
	      this._compile(template.children, this._parentEl);
	    }
	  } else {
	    this._compile(template, this._parentEl);
	  }
	
	  _.debug('"ready" lifecycle in Vm(' + this._type + ')');
	  this.$emit('hook:ready');
	  this._ready = true;
	}
	
	/**
	 * Generate elements by child or children and append to parent elements.
	 * Root element info would be merged if has. The first argument may be an array
	 * if the root element with options.replace has not only one child.
	 *
	 * @param {object|array} target
	 * @param {object}       dest
	 * @param {object}       meta
	 */
	function _compile(target, dest, meta) {
	  var context = this;
	  if (context._targetIsFragment(target)) {
	    context._compileFragment(target, dest, meta);
	    return;
	  }
	  meta = meta || {};
	  if (context._targetIsContent(target)) {
	    _.debug('compile "content" block by', target);
	    context._content = context._createBlock(dest);
	    return;
	  }
	
	  if (context._targetNeedCheckRepeat(target, meta)) {
	    _.debug('compile "repeat" logic by', target);
	    context._compileRepeat(target, dest);
	    return;
	  }
	  if (context._targetNeedCheckShown(target, meta)) {
	    _.debug('compile "if" logic by', target);
	    context._compileShown(target, dest, meta);
	    return;
	  }
	  var typeGetter = meta.type || target.type;
	  if (context._targetNeedCheckType(typeGetter, meta)) {
	    context._compileType(target, dest, typeGetter, meta);
	    return;
	  }
	  var type = typeGetter;
	  if (context._targetIsComposed(target, type)) {
	    _.debug('compile composed component by', target);
	    context._compileCustomComponent(target, dest, type, meta);
	    return;
	  }
	  _.debug('compile native component by', target);
	  context._compileNativeComponent(target, dest, type);
	}
	
	/**
	 * Check if target is a fragment (an array).
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsFragment(target) {
	  return Array.isArray(target);
	}
	
	/**
	 * Check if target type is content/slot.
	 *
	 * @param  {object}  target
	 * @return {boolean}
	 */
	function _targetIsContent(target) {
	  return target.type === 'content' || target.type === 'slot';
	}
	
	/**
	 * Check if target need to compile by a list.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckRepeat(target, meta) {
	  return !meta.hasOwnProperty('repeat') && target.repeat;
	}
	
	/**
	 * Check if target need to compile by a boolean value.
	 *
	 * @param  {object}  target
	 * @param  {object}  meta
	 * @return {boolean}
	 */
	function _targetNeedCheckShown(target, meta) {
	  return !meta.hasOwnProperty('shown') && target.shown;
	}
	
	/**
	 * Check if target need to compile by a dynamic type.
	 *
	 * @param  {string|function} typeGetter
	 * @param  {object}          meta
	 * @return {boolean}
	 */
	function _targetNeedCheckType(typeGetter, meta) {
	  return typeof typeGetter === 'function' && !meta.hasOwnProperty('type');
	}
	
	/**
	 * Check if this kind of component is composed.
	 *
	 * @param  {string}  type
	 * @return {boolean}
	 */
	function _targetIsComposed(target, type) {
	  if (this._app && this._app.customComponentMap && type) {
	    return !!this._app.customComponentMap[type];
	  }
	  return !!target.component;
	}
	
	/**
	 * Compile a list of targets.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileFragment(target, dest, meta) {
	  var _this = this;
	
	  var fragBlock = this._createBlock(dest);
	  target.forEach(function (child) {
	    _this._compile(child, fragBlock, meta);
	  });
	}
	
	/**
	 * Compile a target with repeat directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 */
	function _compileRepeat(target, dest) {
	  var repeat = target.repeat;
	  var oldStyle = typeof repeat === 'function';
	  var getter = repeat.getter || repeat.expression || repeat;
	  if (typeof getter !== 'function') {
	    getter = function getter() {
	      return [];
	    };
	  }
	  var key = repeat.key || '$index';
	  var value = repeat.value || '$value';
	  var trackBy = repeat.trackBy || target.trackBy || target.attr && target.attr.trackBy || key;
	
	  var fragBlock = this._createBlock(dest);
	  fragBlock.children = [];
	  fragBlock.data = [];
	  fragBlock.vms = [];
	
	  this._bindRepeat(target, fragBlock, { getter: getter, key: key, value: value, trackBy: trackBy, oldStyle: oldStyle });
	}
	
	/**
	 * Compile a target with if directive.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {object} meta
	 */
	function _compileShown(target, dest, meta) {
	  var newMeta = { shown: true };
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  if (meta.repeat) {
	    newMeta.repeat = meta.repeat;
	  }
	
	  this._bindShown(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a target with dynamic component type.
	 *
	 * @param {object}   target
	 * @param {object}   dest
	 * @param {function} typeGetter
	 */
	function _compileType(target, dest, typeGetter, meta) {
	  var _this2 = this;
	
	  var type = typeGetter.call(this);
	  var newMeta = Object.assign({ type: type }, meta);
	  var fragBlock = this._createBlock(dest);
	
	  if (dest.element && dest.children) {
	    dest.children.push(fragBlock);
	  }
	
	  this._watch(typeGetter, function (value) {
	    var newMeta = Object.assign({ type: value }, meta);
	    _this2._removeBlock(fragBlock, true);
	    _this2._compile(target, fragBlock, newMeta);
	  });
	
	  this._compile(target, fragBlock, newMeta);
	}
	
	/**
	 * Compile a composed component.
	 *
	 * @param {object} target
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileCustomComponent(target, dest, type, meta) {
	  var Vm = this.constructor;
	  var context = this;
	  var subVm = new Vm(type, context, dest, undefined, {
	    'hook:init': function hookInit() {
	      context._setId(target.id, null, this);
	    },
	    'hook:created': function hookCreated() {
	      context._bindSubVm(this, target, meta.repeat);
	    },
	    'hook:ready': function hookReady() {
	      if (this._content) {
	        context._compileChildren(target, this._content);
	      }
	    }
	  });
	  this._bindSubVmAfterInitialized(subVm, target);
	}
	
	/**
	 * Generate element from template and attach to the dest if needed.
	 * The time to attach depends on whether the mode status is node or tree.
	 *
	 * @param {object} template
	 * @param {object} dest
	 * @param {string} type
	 */
	function _compileNativeComponent(template, dest, type) {
	
	  this._applyNaitveComponentOptions(template);
	
	  var element = void 0;
	  if (dest.ref === '_documentElement') {
	    // if its parent is documentElement then it's a body
	    _.debug('compile to create body for', type);
	    element = this._createBody(type);
	  } else {
	    _.debug('compile to create element for', type);
	    element = this._createElement(type);
	  }
	  // TODO it was a root element when not in a fragment
	  if (!this._rootEl) {
	    this._rootEl = element;
	  }
	
	  this._bindElement(element, template);
	
	  if (template.attr && template.attr.append) {
	    // backward, append prop in attr
	    template.append = template.attr.append;
	  }
	
	  if (template.append) {
	    // give the append attribute for ios adaptation
	    element.attr = element.attr || {};
	    element.attr.append = template.append;
	  }
	
	  var treeMode = template.append === 'tree';
	  if (!treeMode) {
	    _.debug('compile to append single node for', element);
	    this._attachTarget(element, dest);
	  }
	  this._compileChildren(template, element);
	  if (treeMode) {
	    _.debug('compile to append whole tree for', element);
	    this._attachTarget(element, dest);
	  }
	}
	
	/**
	 * Set all children to a certain parent element.
	 *
	 * @param {object} template
	 * @param {object} dest
	 */
	function _compileChildren(template, dest) {
	  var _this3 = this;
	
	  var children = template.children;
	  if (children && children.length) {
	    children.forEach(function (child) {
	      _this3._compile(child, dest);
	    });
	  }
	}
	
	/**
	 * Watch the list update and refresh the changes.
	 *
	 * @param {object} target
	 * @param {object} fragBlock {vms, data, children}
	 * @param {object} info      {getter, key, value, trackBy, oldStyle}
	 */
	function _bindRepeat(target, fragBlock, info) {
	  var _this4 = this;
	
	  var vms = fragBlock.vms;
	  var children = fragBlock.children;
	  var getter = info.getter;
	  var trackBy = info.trackBy;
	  var oldStyle = info.oldStyle;
	
	  var keyName = info.key;
	  var valueName = info.value;
	
	  function compileItem(item, index, context) {
	    var mergedData = void 0;
	    if (oldStyle) {
	      mergedData = item;
	      if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	        mergedData[keyName] = index;
	        if (!mergedData.hasOwnProperty('INDEX')) {
	          Object.defineProperty(mergedData, 'INDEX', {
	            value: function value() {
	              _.warn('"INDEX" in repeat is deprecated,' + ' please use "$index" instead');
	            }
	          });
	        }
	      }
	    } else {
	      mergedData = {};
	      mergedData[keyName] = index;
	      mergedData[valueName] = item;
	    }
	    context = context._mergeContext(mergedData);
	    vms.push(context);
	    context._compile(target, fragBlock, { repeat: item });
	  }
	
	  var list = this._watchBlock(fragBlock, getter, 'repeat', function (data) {
	    _.debug('the "repeat" item has changed', data);
	
	    if (!fragBlock) {
	      return;
	    }
	
	    var oldChildren = children.slice();
	    var oldVms = vms.slice();
	    var oldData = fragBlock.data.slice();
	    // 1. collect all new refs track by
	    var trackMap = {};
	    var reusedMap = {};
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : index;
	      /* istanbul ignore if */
	      if (key == null || key === '') {
	        return;
	      }
	      trackMap[key] = item;
	    });
	
	    // 2. remove unused element foreach old item
	    var reusedList = [];
	    oldData.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : index;
	      if (trackMap.hasOwnProperty(key)) {
	        reusedMap[key] = {
	          item: item, index: index, key: key,
	          target: oldChildren[index],
	          vm: oldVms[index]
	        };
	        reusedList.push(item);
	      } else {
	        _this4._removeTarget(oldChildren[index]);
	      }
	    });
	
	    // 3. create new element foreach new item
	    children.length = 0;
	    vms.length = 0;
	    fragBlock.data = data.slice();
	    fragBlock.updateMark = fragBlock.start;
	
	    data.forEach(function (item, index) {
	      var key = trackBy ? item[trackBy] : index;
	      var reused = reusedMap[key];
	      if (reused) {
	        if (reused.item === reusedList[0]) {
	          reusedList.shift();
	        } else {
	          reusedList.$remove(reused.item);
	          _this4._moveTarget(reused.target, fragBlock.updateMark, true);
	        }
	        children.push(reused.target);
	        vms.push(reused.vm);
	        reused.vm[keyName] = index;
	        fragBlock.updateMark = reused.target;
	      } else {
	        compileItem(item, index, _this4);
	      }
	    });
	
	    delete fragBlock.updateMark;
	  });
	
	  fragBlock.data = list.slice(0);
	  list.forEach(function (item, index) {
	    compileItem(item, index, _this4);
	  });
	}
	
	/**
	 * Watch the display update and add/remove the element.
	 *
	 * @param  {object} target
	 * @param  {object} fragBlock
	 * @param  {object} context
	 */
	function _bindShown(target, fragBlock, meta) {
	  var _this5 = this;
	
	  var display = this._watchBlock(fragBlock, target.shown, 'shown', function (display) {
	    _.debug('the "if" item was changed', display);
	
	    if (!fragBlock || !!fragBlock.display === !!display) {
	      return;
	    }
	    fragBlock.display = !!display;
	    if (display) {
	      _this5._compile(target, fragBlock, meta);
	    } else {
	      _this5._removeBlock(fragBlock, true);
	    }
	  });
	
	  fragBlock.display = !!display;
	  if (display) {
	    this._compile(target, fragBlock, meta);
	  }
	}
	
	/**
	 * Watch calc value changes and append certain type action to differ.
	 * It is used for if or repeat data-binding generator.
	 *
	 * @param  {object}   fragBlock
	 * @param  {function} calc
	 * @param  {string}   type
	 * @param  {function} handler
	 * @return {any}      init value of calc
	 */
	function _watchBlock(fragBlock, calc, type, handler) {
	  var differ = this && this._app && this._app.differ;
	  var config = {};
	  var depth = (fragBlock.element.depth || 0) + 1;
	
	  return this._watch(calc, function (value) {
	    config.latestValue = value;
	    if (differ && !config.recorded) {
	      differ.append(type, depth, fragBlock.blockId, function () {
	        var latestValue = config.latestValue;
	        handler(latestValue);
	        config.recorded = false;
	        config.latestValue = undefined;
	      });
	    }
	    config.recorded = true;
	  });
	}
	
	/**
	 * Clone a context and merge certain data.
	 *
	 * @param  {object} mergedData
	 * @return {object}
	 */
	function _mergeContext(mergedData) {
	  var context = Object.create(this);
	  context._data = mergedData;
	  context._initData();
	  context._initComputed();
	  context._realParent = this;
	  return context;
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview
	                                                                                                                                                                                                                                                   * Directive Parser
	                                                                                                                                                                                                                                                   */
	
	exports._applyNaitveComponentOptions = _applyNaitveComponentOptions;
	exports._bindElement = _bindElement;
	exports._bindSubVm = _bindSubVm;
	exports._bindSubVmAfterInitialized = _bindSubVmAfterInitialized;
	exports._setId = _setId;
	exports._setAttr = _setAttr;
	exports._setClass = _setClass;
	exports._setStyle = _setStyle;
	exports._setEvent = _setEvent;
	exports._bindEvents = _bindEvents;
	exports._bindDir = _bindDir;
	exports._bindKey = _bindKey;
	exports._watch = _watch;
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	var _watcher = __webpack_require__(60);
	
	var _watcher2 = _interopRequireDefault(_watcher);
	
	var _config = __webpack_require__(44);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SETTERS = {
	  attr: 'setAttr',
	  style: 'setStyle',
	  event: 'addEvent'
	};
	
	/**
	 * apply the native component's options(specified by template.type)
	 * to the template
	 */
	function _applyNaitveComponentOptions(template) {
	  var type = template.type;
	
	  var options = _config.nativeComponentMap[type];
	
	  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
	    _.extend(template, options);
	  }
	}
	
	/**
	 * bind all id, attr, classnames, style, events to an element
	 */
	function _bindElement(el, template) {
	  this._setId(template.id, el, this);
	  this._setAttr(el, template.attr);
	  this._setClass(el, template.classList);
	  this._setStyle(el, template.style);
	  this._bindEvents(el, template.events);
	}
	
	/**
	 * bind all props to sub vm and bind all style, events to the root element
	 * of the sub vm if it doesn't have a replaced multi-node fragment
	 */
	function _bindSubVm(subVm, template, repeatItem) {
	  subVm = subVm || {};
	  template = template || {};
	
	  var options = subVm._options || {};
	
	  // bind props
	  var props = options.props;
	
	  if (Array.isArray(props)) {
	    props = props.reduce(function (result, value) {
	      result[value] = true;
	      return result;
	    }, {});
	  }
	
	  mergeProps(repeatItem, props, this, subVm);
	  mergeProps(template.attr, props, this, subVm);
	}
	
	function _bindSubVmAfterInitialized(subVm, template) {
	  mergeClassStyle(template.classList, this, subVm);
	  mergeStyle(template.style, this, subVm);
	  mergeEvent(template.events, this, subVm);
	}
	
	function mergeProps(target, props, vm, subVm) {
	  if (!target) {
	    return;
	  }
	
	  var _loop = function _loop(key) {
	    if (!props || props[key]) {
	      var value = target[key];
	      if (typeof value === 'function') {
	        var returnValue = vm._watch(value, function (v) {
	          subVm[key] = v;
	        });
	        subVm[key] = returnValue;
	      } else {
	        subVm[key] = value;
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop(key);
	  }
	}
	
	function mergeStyle(target, vm, subVm) {
	  var _loop2 = function _loop2(key) {
	    var value = target[key];
	    if (typeof value === 'function') {
	      var returnValue = vm._watch(value, function (v) {
	        if (subVm._rootEl) {
	          subVm._rootEl.setStyle(key, v);
	        }
	      });
	      subVm._rootEl.setStyle(key, returnValue);
	    } else {
	      if (subVm._rootEl) {
	        subVm._rootEl.setStyle(key, value);
	      }
	    }
	  };
	
	  for (var key in target) {
	    _loop2(key);
	  }
	}
	
	function mergeClassStyle(target, vm, subVm) {
	  var css = vm._options && vm._options.style || {};
	
	  /* istanbul ignore if */
	  if (!subVm._rootEl) {
	    return;
	  }
	
	  if (typeof target === 'function') {
	    var _value = vm._watch(target, function (v) {
	      setClassStyle(subVm._rootEl, css, v);
	    });
	    setClassStyle(subVm._rootEl, css, _value);
	  } else if (target != null) {
	    setClassStyle(subVm._rootEl, css, target);
	  }
	}
	
	function mergeEvent(target, vm, subVm) {
	  if (target && subVm._rootEl) {
	    for (var type in target) {
	      var handler = vm[target[type]];
	      if (handler) {
	        subVm._rootEl.addEvent(type, _.bind(handler, vm));
	      }
	    }
	  }
	}
	
	/**
	 * bind id to an element
	 * each id is unique in a whole vm
	 */
	function _setId(id, el, vm) {
	  var _this = this;
	
	  var map = Object.create(null);
	
	  Object.defineProperties(map, {
	    vm: {
	      value: vm,
	      writable: false,
	      configurable: false
	    },
	    el: {
	      get: function get() {
	        return el || vm._rootEl;
	      },
	      configurable: false
	    }
	  });
	
	  if (typeof id === 'function') {
	    var handler = id;
	    id = handler.call(this);
	    if (id) {
	      this._ids[id] = map;
	    }
	    this._watch(handler, function (newId) {
	      if (newId) {
	        _this._ids[newId] = map;
	      }
	    });
	  } else if (id && typeof id === 'string') {
	    this._ids[id] = map;
	  }
	}
	
	/**
	 * bind attr to an element
	 */
	function _setAttr(el, attr) {
	  this._bindDir(el, 'attr', attr);
	}
	
	function setClassStyle(el, css, classList) {
	  var classStyle = {};
	  var length = classList.length;
	
	  for (var i = 0; i < length; i++) {
	    var style = css[classList[i]];
	    if (style) {
	      for (var key in style) {
	        classStyle[key] = style[key];
	      }
	    }
	  }
	  el.setClassStyle(classStyle);
	}
	
	/**
	 * bind classnames to an element
	 */
	function _setClass(el, classList) {
	
	  if (typeof classList !== 'function' && !Array.isArray(classList)) {
	    return;
	  }
	  if (Array.isArray(classList) && !classList.length) {
	    el.setClassStyle({});
	    return;
	  }
	
	  var style = this._options && this._options.style || {};
	  if (typeof classList === 'function') {
	    var _value2 = this._watch(classList, function (v) {
	      setClassStyle(el, style, v);
	    });
	    setClassStyle(el, style, _value2);
	  } else {
	    setClassStyle(el, style, classList);
	  }
	}
	
	/**
	 * bind style to an element
	 */
	function _setStyle(el, style) {
	  this._bindDir(el, 'style', style);
	}
	
	/**
	 * add an event type and handler to an element and generate a dom update
	 */
	function _setEvent(el, type, handler) {
	  el.addEvent(type, _.bind(handler, this));
	}
	
	/**
	 * add all events of an element
	 */
	function _bindEvents(el, events) {
	  if (!events) {
	    return;
	  }
	  var keys = Object.keys(events);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var handler = events[key];
	    if (typeof handler === 'string') {
	      handler = this[handler];
	      /* istanbul ignore if */
	      if (!handler) {
	        _.error('The method "' + handler + '" is not defined.');
	      }
	    }
	    this._setEvent(el, key, handler);
	  }
	}
	
	/**
	 * set a series of members as a kind of an element
	 * for example: style, attr, ...
	 * if the value is a function then bind the data changes
	 */
	function _bindDir(el, name, data) {
	  if (!data) {
	    return;
	  }
	  var keys = Object.keys(data);
	  var i = keys.length;
	  while (i--) {
	    var key = keys[i];
	    var _value3 = data[key];
	    if (typeof _value3 === 'function') {
	      this._bindKey(el, name, key, _value3);
	    } else {
	      el[SETTERS[name]](key, _value3);
	    }
	  }
	}
	
	/**
	 * bind data changes to a certain key to a name series in an element
	 */
	function _bindKey(el, name, key, calc) {
	  var _this2 = this;
	
	  var methodName = SETTERS[name];
	  var obj = el[name];
	  // watch the calc, and returns a value by calc.call()
	  var value = this._watch(calc, function (value) {
	    function handler() {
	      el[methodName](key, value);
	    }
	    var differ = _this2 && _this2._app && _this2._app.differ;
	    if (differ) {
	      differ.append('element', el.depth, el.ref, handler);
	    } else {
	      handler();
	    }
	  });
	
	  el[methodName](key, value);
	}
	
	/**
	 * watch a calc function and callback if the calc value changes
	 */
	function _watch(calc, callback) {
	  var watcher = new _watcher2.default(this, calc, function (value, oldValue) {
	    /* istanbul ignore if */
	    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' && value === oldValue) {
	      return;
	    }
	    callback(value);
	  });
	
	  return watcher.value;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * The MIT License (MIT)
	 *
	 * Copyright (c) 2013-2015 Yuxi Evan You
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	
	var _ = __webpack_require__(52);
	// var config = require('./config')
	var Observer = __webpack_require__(53);
	// var expParser = require('./parsers/expression')
	// var batcher = require('./batcher')
	var uid = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Function} [preProcess]
	 * @constructor
	 */
	
	// function Watcher (vm, expression, cb, options) {
	function Watcher(vm, update, cb) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // this.expression = expression
	  this.cb = cb;
	  this.id = ++uid; // uid for batching
	  this.active = true;
	  // options = options || {}
	  // this.deep = !!options.deep
	  // this.user = !!options.user
	  // this.twoWay = !!options.twoWay
	  // this.filters = options.filters
	  // this.preProcess = options.preProcess
	  this.deps = [];
	  this.newDeps = [];
	  // parse expression for getter/setter
	  // var res = expParser.parse(expression, options.twoWay)
	  // this.getter = res.get
	  // this.setter = res.set
	  this.getter = update;
	  this.value = this.get();
	}
	
	var p = Watcher.prototype;
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	p.addDep = function (dep) {
	  var newDeps = this.newDeps;
	  var old = this.deps;
	  if (_.indexOf(newDeps, dep) < 0) {
	    newDeps.push(dep);
	    var i = _.indexOf(old, dep);
	    if (i < 0) {
	      dep.addSub(this);
	    } else {
	      old[i] = null;
	    }
	  }
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	p.get = function () {
	  this.beforeGet();
	  var vm = this.vm;
	  var value;
	  try {
	    value = this.getter.call(vm, vm);
	    /* istanbul ignore next */
	  } catch (e) {
	    _.error('A error occurred when binding data in ', this.getter);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = vm._applyFilters(value, null, this.filters, false);
	  }
	  this.afterGet();
	  return value;
	};
	
	// /**
	//  * Set the corresponding value with the setter.
	//  *
	//  * @param {*} value
	//  */
	
	// p.set = function (value) {
	//   var vm = this.vm
	//   if (this.filters) {
	//     value = vm._applyFilters(
	//       value, this.value, this.filters, true)
	//   }
	//   try {
	//     this.setter.call(vm, vm, value)
	//   } catch (e) {
	//     // if (config.warnExpressionErrors) {
	//       _.warn(
	//         'Error when evaluating setter "' +
	//         this.expression + '":\n   ' + e
	//       )
	//     // }
	//   }
	// }
	
	/**
	 * Prepare for dependency collection.
	 */
	
	p.beforeGet = function () {
	  Observer.target = this;
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	p.afterGet = function () {
	  Observer.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (dep) {
	      dep.removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	  this.newDeps = [];
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	
	// p.update = function () {
	//   if (!config.async || config.debug) {
	//     this.run()
	//   } else {
	//     batcher.push(this)
	//   }
	// }
	
	// /**
	//  * Batcher job interface.
	//  * Will be called by the batcher.
	//  */
	
	// p.run = function () {
	p.update = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value || Array.isArray(value) || this.deep) {
	      var oldValue = this.value;
	      this.value = value;
	      this.cb(value, oldValue);
	    }
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	p.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
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
	 * @param {Object} obj
	 */
	
	function traverse(obj) {
	  var key, val, i;
	  for (key in obj) {
	    val = obj[key];
	    if (_.isArray(val)) {
	      i = val.length;
	      while (i--) {
	        traverse(val[i]);
	      }
	    } else if (_.isObject(val)) {
	      traverse(val);
	    }
	  }
	}
	
	module.exports = Watcher;

/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._createBody = _createBody;
	exports._createElement = _createElement;
	exports._createBlock = _createBlock;
	exports._createBlockStart = _createBlockStart;
	exports._createBlockEnd = _createBlockEnd;
	exports._attachTarget = _attachTarget;
	exports._moveTarget = _moveTarget;
	exports._moveElement = _moveElement;
	exports._moveBlock = _moveBlock;
	exports._removeTarget = _removeTarget;
	exports._removeElement = _removeElement;
	exports._removeBlock = _removeBlock;
	/**
	 * @fileOverview Document & Element Helpers.
	 *
	 * required:
	 * Document#: createElement, createComment, getRef
	 * Element#: appendChild, insertBefore, removeChild, nextSibling
	 */
	
	/**
	 * Create a body by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createBody(type) {
	  var doc = this._app.doc;
	  return doc.createBody(type);
	}
	
	/**
	 * Create an element by type
	 * Using this._app.doc
	 *
	 * @param  {string} type
	 */
	function _createElement(type) {
	  var doc = this._app.doc;
	  return doc.createElement(type);
	}
	
	/**
	 * Create and return a frag block for an element.
	 * The frag block has a starter, ender and the element itself.
	 *
	 * @param  {object} element
	 */
	function _createBlock(element) {
	  var start = this._createBlockStart();
	  var end = this._createBlockEnd();
	  var blockId = lastestBlockId++;
	  if (element.element) {
	    element.element.insertBefore(start, element.end);
	    element.element.insertBefore(end, element.end);
	    element = element.element;
	  } else {
	    element.appendChild(start);
	    element.appendChild(end);
	  }
	  return { start: start, end: end, element: element, blockId: blockId };
	}
	
	var lastestBlockId = 1;
	
	/**
	 * Create and return a block starter.
	 * Using this._app.doc
	 */
	function _createBlockStart() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('start');
	  return anchor;
	}
	
	/**
	 * Create and return a block ender.
	 * Using this._app.doc
	 */
	function _createBlockEnd() {
	  var doc = this._app.doc;
	  var anchor = doc.createComment('end');
	  return anchor;
	}
	
	/**
	 * Attach target to a certain dest using appendChild by default.
	 * If the dest is a frag block then insert before the ender.
	 * If the target is a frag block then attach the starter and ender in order.
	 *
	 * @param  {object} target
	 * @param  {object} dest
	 */
	function _attachTarget(target, dest) {
	
	  if (dest.element) {
	    var before = dest.end;
	    var after = dest.updateMark;
	    // push new target for watch list update later
	    if (dest.children) {
	      dest.children.push(target);
	    }
	    // for check repeat case
	    if (after) {
	      this._moveTarget(target, after);
	      dest.updateMark = target.element ? target.end : target;
	    } else if (target.element) {
	      dest.element.insertBefore(target.start, before);
	      dest.element.insertBefore(target.end, before);
	    } else {
	      dest.element.insertBefore(target, before);
	    }
	  } else {
	    if (target.element) {
	      dest.appendChild(target.start);
	      dest.appendChild(target.end);
	    } else {
	      dest.appendChild(target);
	    }
	  }
	}
	
	/**
	 * Move target before a certain element. The target maybe block or element.
	 *
	 * @param  {object} target
	 * @param  {object} before
	 */
	function _moveTarget(target, after) {
	  if (target.element) {
	    this._moveBlock(target, after);
	  } else {
	    this._moveElement(target, after);
	  }
	}
	
	/**
	 * Move element before a certain element.
	 *
	 * @param  {object} element
	 * @param  {object} before
	 */
	function _moveElement(element, after) {
	  var doc = this._app.doc;
	  var parent = doc.getRef(after.parentRef);
	
	  if (parent) {
	    parent.insertAfter(element, after);
	  }
	}
	
	/**
	 * Move all elements of the block before a certain element.
	 *
	 * @param  {object} fragBlock
	 * @param  {object} before
	 */
	function _moveBlock(fragBlock, after) {
	  var doc = this._app.doc;
	  var parent = doc.getRef(after.parentRef);
	
	  if (parent) {
	    (function () {
	      var el = fragBlock.start;
	      var group = [el];
	
	      while (el && el !== fragBlock.end) {
	        el = el.next();
	        group.push(el);
	      }
	
	      var temp = after;
	      group.forEach(function (el) {
	        parent.insertAfter(el, temp);
	        temp = el;
	      });
	    })();
	  }
	}
	
	/**
	 * Remove target from DOM tree.
	 * If the target is a frag block then call _removeBlock
	 *
	 * @param  {object} target
	 */
	function _removeTarget(target) {
	
	  if (target.element) {
	    this._removeBlock(target);
	  } else {
	    this._removeElement(target);
	  }
	}
	
	/**
	 * Remove a certain element.
	 * Using this._app.doc
	 *
	 * @param  {object} target
	 */
	function _removeElement(target) {
	  var doc = this._app.doc;
	  var parent = doc.getRef(target.parentRef);
	
	  if (parent) {
	    parent.removeChild(target);
	  }
	}
	
	/**
	 * Remove a frag block.
	 * The second param decides whether the block self should be removed too.
	 *
	 * @param  {object}  fragBlock
	 * @param  {Boolean} preserveBlock=false
	 */
	function _removeBlock(fragBlock) {
	  var _this = this;
	
	  var preserveBlock = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var result = [];
	  var el = fragBlock.start.next();
	
	  while (el && el !== fragBlock.end) {
	    result.push(el);
	    el = el.next();
	  }
	
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.start);
	  }
	  result.forEach(function (el) {
	    _this._removeElement(el);
	  });
	  if (!preserveBlock) {
	    this._removeElement(fragBlock.end);
	  }
	}

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$emit = $emit;
	exports.$dispatch = $dispatch;
	exports.$broadcast = $broadcast;
	exports.$on = $on;
	exports.$off = $off;
	exports._initEvents = _initEvents;
	function Evt(type, detail) {
	  if (detail instanceof Evt) {
	    return detail;
	  }
	
	  this.timestamp = Date.now();
	  this.detail = detail;
	  this.type = type;
	
	  var shouldStop = false;
	  this.stop = function () {
	    shouldStop = true;
	  };
	  this.hasStopped = function () {
	    return shouldStop;
	  };
	}
	
	function $emit(type, detail) {
	  var _this = this;
	
	  var events = this._vmEvents;
	  var handlerList = events[type];
	  if (handlerList) {
	    (function () {
	      var evt = new Evt(type, detail);
	      handlerList.forEach(function (handler) {
	        handler.call(_this, evt);
	      });
	    })();
	  }
	}
	
	function $dispatch(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._parent && this._parent.$dispatch) {
	    this._parent.$dispatch(type, evt);
	  }
	}
	
	function $broadcast(type, detail) {
	  var evt = new Evt(type, detail);
	  this.$emit(type, evt);
	
	  if (!evt.hasStopped() && this._childrenVms) {
	    this._childrenVms.forEach(function (subVm) {
	      subVm.$broadcast(type, evt);
	    });
	  }
	}
	
	function $on(type, handler) {
	  if (!type || typeof handler !== 'function') {
	    return;
	  }
	  var events = this._vmEvents;
	  var handlerList = events[type] || [];
	  handlerList.push(handler);
	  events[type] = handlerList;
	
	  // fixed old version lifecycle design
	  if (type === 'hook:ready' && this._ready) {
	    this.$emit('hook:ready');
	  }
	}
	
	function $off(type, handler) {
	  if (!type) {
	    return;
	  }
	  var events = this._vmEvents;
	  if (!handler) {
	    delete events[type];
	    return;
	  }
	  var handlerList = events[type];
	  if (!handlerList) {
	    return;
	  }
	  handlerList.$remove(handler);
	}
	
	var LIFE_CYCLE_TYPES = ['init', 'created', 'ready'];
	
	function _initEvents(externalEvents) {
	  var _this2 = this;
	
	  var options = this._options || {};
	  var events = options.events || {};
	  for (var type1 in events) {
	    this.$on(type1, events[type1]);
	  }
	  for (var type2 in externalEvents) {
	    this.$on(type2, externalEvents[type2]);
	  }
	  LIFE_CYCLE_TYPES.forEach(function (type) {
	    _this2.$on('hook:' + type, options[type]);
	  });
	}

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.clearModules = clearModules;
	exports.getModule = getModule;
	exports.requireModule = requireModule;
	exports.registerModules = registerModules;
	exports.registerMethods = registerMethods;
	exports.requireComponent = requireComponent;
	exports.registerComponent = registerComponent;
	var nativeModules = {};
	
	function assignModules(modules, ifReplace) {
	  var _loop = function _loop(moduleName) {
	
	    // init `modules[moduleName][]`
	    var methods = nativeModules[moduleName];
	    if (!methods) {
	      methods = {};
	      nativeModules[moduleName] = methods;
	    }
	
	    // push each non-existed new method
	    modules[moduleName].forEach(function (method) {
	      if (typeof method === 'string') {
	        method = {
	          name: method
	        };
	      }
	
	      if (!methods[method.name] || ifReplace) {
	        methods[method.name] = method;
	      }
	    });
	  };
	
	  for (var moduleName in modules) {
	    _loop(moduleName);
	  }
	}
	
	function assignApis(Ctor, apis) {
	  var p = Ctor.prototype;
	
	  for (var apiName in apis) {
	    if (!p.hasOwnProperty(apiName)) {
	      p[apiName] = apis[apiName];
	    }
	  }
	}
	
	function clearModules() {
	  nativeModules = {};
	}
	
	function getModule(moduleName) {
	  return nativeModules[moduleName];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireModule(moduleName) {
	  var _this = this;
	
	  var methods = nativeModules[moduleName];
	  var target = {};
	
	  var _loop2 = function _loop2(methodName) {
	    target[methodName] = function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      return _this.callTasks({
	        module: moduleName,
	        method: methodName,
	        args: args
	      });
	    };
	  };
	
	  for (var methodName in methods) {
	    _loop2(methodName);
	  }
	
	  return target;
	}
	
	/**
	 * @context Vm
	 */
	function registerModules(modules, ifReplace) {
	  assignModules(modules, ifReplace);
	}
	
	/**
	 * @context Vm
	 */
	function registerMethods(apis) {
	  assignApis(this, apis);
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function requireComponent(name) {
	  var customComponentMap = this.customComponentMap;
	
	  return customComponentMap[name];
	}
	
	/**
	 * @context a instance of AppInstance
	 */
	function registerComponent(name, exports) {
	  var customComponentMap = this.customComponentMap;
	
	
	  if (customComponentMap[name]) {
	    throw new Error('define a component(' + name + ') that already exists');
	  }
	
	  customComponentMap[name] = exports;
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.normalizeVersion = normalizeVersion;
	exports.getError = getError;
	exports.check = check;
	
	var _semver = __webpack_require__(48);
	
	var _semver2 = _interopRequireDefault(_semver);
	
	var _util = __webpack_require__(46);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * [normalizeVersion description]
	 * @param  {String} Version. ie: 1, 1.0, 1.0.0
	 * @return {String} Version
	 */
	function normalizeVersion(v) {
	  var isValid = _semver2.default.valid(v) ? true : false;
	  if (isValid) {
	    return v;
	  }
	
	  v = typeof v === 'string' ? v : '';
	  var split = v.split('.');
	  var i = 0;
	  var result = [];
	
	  while (i < 3) {
	    var s = typeof split[i] === 'string' && split[i] ? split[i] : '0';
	    result.push(s);
	    i++;
	  }
	
	  return result.join('.');
	}
	
	function getError(key, val, criteria) {
	  var result = {
	    isDowngrade: true,
	    errorType: 1,
	    code: 1000
	  };
	  var getMsg = function getMsg(key, val, criteria) {
	    return 'Downgrade[' + key + '] :: deviceInfo ' + val + ' matched criteria ' + criteria;
	  };
	  var _key = key.toLowerCase();
	
	  result.errorMessage = getMsg(key, val, criteria);
	
	  if (_key.indexOf('osversion') >= 0) {
	    result.code = 1001;
	  } else if (_key.indexOf('appversion') >= 0) {
	    result.code = 1002;
	  } else if (_key.indexOf('weexversion') >= 0) {
	    result.code = 1003;
	  } else if (_key.indexOf('devicemodel') >= 0) {
	    result.code = 1004;
	  }
	
	  return result;
	}
	
	/**
	 * WEEX framework input(deviceInfo)
	 * {
	 *   platform: 'iOS' or 'android'
	 *   osVersion: '1.0.0' or '1.0' or '1'
	 *   appVersion: '1.0.0' or '1.0' or '1'
	 *   weexVersion: '1.0.0' or '1.0' or '1'
	 *   dDeviceModel: 'MODEL_NAME'
	 * }
	 *
	 * downgrade config(config)
	 * {
	 *   ios: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   },
	 *   android: {
	 *     osVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     appVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     weexVersion: '>1.0.0' or '>=1.0.0' or '<1.0.0' or '<=1.0.0' or '1.0.0'
	 *     deviceModel: ['modelA', 'modelB', ...]
	 *   }
	 * }
	 *
	 *
	 * @param  {object} deviceInfo Weex SDK framework input
	 * @param  {object} config     user input
	 * @return {Object}            { isDowngrade: true/false, errorMessage... }
	 */
	function check(config, deviceInfo) {
	  deviceInfo = deviceInfo || global.WXEnvironment;
	  deviceInfo = (0, _util.isPlainObject)(deviceInfo) ? deviceInfo : {};
	  config = (0, _util.isPlainObject)(config) ? config : {};
	  var platform = deviceInfo.platform || 'unknow';
	  var dPlatform = platform.toLowerCase();
	  var cObj = config[dPlatform] || {};
	
	  var result = {
	    isDowngrade: false // defautl is pass
	  };
	
	  for (var i in deviceInfo) {
	    var key = i;
	    var keyLower = key.toLowerCase();
	    var val = deviceInfo[i];
	    var isVersion = keyLower.indexOf('version') >= 0 ? true : false;
	    var isDeviceModel = keyLower.indexOf('devicemodel') >= 0 ? true : false;
	    var criteria = cObj[i];
	
	    if (criteria && isVersion) {
	      var c = this.normalizeVersion(criteria);
	      var d = this.normalizeVersion(deviceInfo[i]);
	
	      if (_semver2.default.satisfies(d, c)) {
	        result = (0, _util.extend)(this.getError(key, val, criteria));
	        break;
	      }
	    } else if (isDeviceModel) {
	      var _criteria = (0, _util.typof)(criteria) === 'array' ? criteria : [criteria];
	      if (_criteria.indexOf(val) >= 0) {
	        result = (0, _util.extend)(this.getError(key, val, criteria));
	        break;
	      }
	    }
	  }
	
	  return result;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.updateActions = updateActions;
	exports.init = init;
	exports.destroy = destroy;
	exports.getRootElement = getRootElement;
	exports.fireEvent = fireEvent;
	exports.callback = callback;
	exports.refreshData = refreshData;
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	var _domListener = __webpack_require__(66);
	
	var _domListener2 = _interopRequireDefault(_domListener);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
	                                                                                                                                                                                                     * @fileOverview
	                                                                                                                                                                                                     * instance controls from native
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * - init bundle
	                                                                                                                                                                                                     * - fire event
	                                                                                                                                                                                                     * - callback
	                                                                                                                                                                                                     * - destroy
	                                                                                                                                                                                                     *
	                                                                                                                                                                                                     * corresponded with the API of instance manager (framework.js)
	                                                                                                                                                                                                     */
	
	function updateActions() {
	  this.differ.flush();
	  var tasks = [];
	  if (this.listener && this.listener.updates.length) {
	    tasks.push.apply(tasks, _toConsumableArray(this.listener.updates));
	    this.listener.updates = [];
	  }
	  if (tasks.length) {
	    this.callTasks(tasks);
	  }
	}
	
	function init(code, data) {
	  var _this = this;
	
	  _.debug('Intialize an instance with', code, data);
	
	  var result;
	  // @see: lib/app/bundle.js
	  var define = _.bind(this.define, this);
	  var bootstrap = function bootstrap(name, config, _data) {
	    result = _this.bootstrap(name, config, _data || data);
	    _this.updateActions();
	    _this.doc.listener.createFinish();
	    _this.doc.close();
	    _.debug('After intialized an instance(' + _this.id + ')');
	  };
	
	  // backward(register/render)
	  var register = _.bind(this.register, this);
	  var render = function render(name, _data) {
	    result = _this.bootstrap(name, {}, _data);
	  };
	
	  var require = function require(name) {
	    return function (_data) {
	      result = _this.bootstrap(name, {}, _data);
	    };
	  };
	
	  var document = this.doc;
	
	  var functionBody = void 0;
	  /* istanbul ignore if */
	  if (typeof code === 'function') {
	    // `function () {...}` -> `{...}`
	    // not very strict
	    functionBody = code.toString().substr(12);
	  } else if (code) {
	    functionBody = code.toString();
	  }
	
	  var fn = new Function('define', 'require', 'document', 'bootstrap', 'register', 'render', '__weex_define__', // alias for define
	  '__weex_bootstrap__', // alias for bootstrap
	  functionBody);
	
	  fn(define, require, document, bootstrap, register, render, define, bootstrap);
	
	  return result;
	}
	
	function destroy() {
	  _.debug('Destory an instance(' + this.id + ')');
	
	  this.id = '';
	  this.eventManager = null;
	  this.options = null;
	  this.blocks = null;
	  this.vm = null;
	  this.doc = null;
	  this.customComponentMap = null;
	  this.callbacks = null;
	}
	
	function getRootElement() {
	  var doc = this.doc || {};
	  var body = doc.body || {};
	  return body.toJSON ? body.toJSON() : {};
	}
	
	function fireEvent(ref, type, e, domChanges) {
	  var _this2 = this;
	
	  _.debug('Fire a "' + type + '" event on an element(' + ref + ')', 'in instance(' + this.id + ')');
	
	  if (Array.isArray(ref)) {
	    ref.some(function (ref) {
	      return _this2.fireEvent(ref, type, e) !== false;
	    });
	    return;
	  }
	
	  var el = this.doc.getRef(ref);
	
	  if (el) {
	    e = e || {};
	    e.type = type;
	    e.target = el;
	    e.timestamp = Date.now();
	    if (domChanges) {
	      updateElement(el, domChanges);
	    }
	    var result = this.eventManager.fire(el, type, e);
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    return result;
	  }
	
	  return new Error('invalid element reference "' + ref + '"');
	}
	
	function callback(callbackId, data, ifKeepAlive) {
	  _.debug('Invoke a callback(' + callbackId + ') with', data, 'in instance(' + this.id + ')');
	
	  var callback = this.callbacks[callbackId];
	
	  if (typeof callback === 'function') {
	    callback(data); // data is already a object, @see: lib/framework.js
	
	    if (typeof ifKeepAlive === 'undefined' || ifKeepAlive === false) {
	      this.callbacks[callbackId] = undefined;
	    }
	
	    this.updateActions();
	    this.doc.listener.updateFinish();
	    return;
	  }
	
	  return new Error('invalid callback id "' + callbackId + '"');
	}
	
	function refreshData(data) {
	  _.debug('Refresh with', data, 'in instance[' + this.id + ']');
	
	  var vm = this.vm;
	
	  if (vm && data) {
	    if (typeof vm.refreshData === 'function') {
	      vm.refreshData(data);
	    } else {
	      _.extend(vm, data);
	    }
	    this.updateActions();
	    this.doc.listener.refreshFinish();
	    return;
	  }
	
	  return new Error('invalid data "' + data + '"');
	}
	
	function updateElement(el, changes) {
	  var attrs = changes.attrs || {};
	  for (var name in attrs) {
	    el.setAttr(name, attrs[name], true);
	  }
	  var style = changes.style || {};
	  for (var _name in style) {
	    el.setStyle(_name, style[_name], true);
	  }
	}

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = Listener;
	exports.createAction = createAction;
	function Listener(id, handler) {
	  this.id = id;
	  this.batched = false;
	  this.updates = [];
	  if (typeof handler === 'function') {
	    this.handler = handler;
	  }
	}
	
	Listener.prototype.createFinish = function (callback) {
	  var handler = this.handler;
	  handler([createAction('createFinish', [])], callback);
	};
	
	Listener.prototype.updateFinish = function (callback) {
	  var handler = this.handler;
	  handler([createAction('updateFinish', [])], callback);
	};
	
	Listener.prototype.refreshFinish = function (callback) {
	  var handler = this.handler;
	  handler([createAction('refreshFinish', [])], callback);
	};
	
	Listener.prototype.createBody = function (element, ref) {
	  var actions = [createAction('createBody', [element.toJSON()])];
	  this.addActions(actions);
	};
	
	Listener.prototype.addElement = function (element, ref, index) {
	  if (!(index >= 0)) {
	    index = -1;
	  }
	  this.addActions(createAction('addElement', [ref, element.toJSON(), index]));
	};
	
	Listener.prototype.removeElement = function (ref) {
	  if (Array.isArray(ref)) {
	    var actions = ref.map(function (r) {
	      return createAction('removeElement', [r]);
	    });
	    this.addActions(actions);
	  } else {
	    this.addActions(createAction('removeElement', [ref]));
	  }
	};
	
	Listener.prototype.moveElement = function (targetRef, parentRef, index) {
	  this.addActions(createAction('moveElement', [targetRef, parentRef, index]));
	};
	
	Listener.prototype.setAttr = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  this.addActions(createAction('updateAttrs', [ref, result]));
	};
	
	Listener.prototype.setStyle = function (ref, key, value) {
	  var result = {};
	  result[key] = value;
	  this.addActions(createAction('updateStyle', [ref, result]));
	};
	
	Listener.prototype.setStyles = function (ref, style) {
	  this.addActions(createAction('updateStyle', [ref, style]));
	};
	
	Listener.prototype.addEvent = function (ref, type) {
	  this.addActions(createAction('addEvent', [ref, type]));
	};
	
	Listener.prototype.removeEvent = function (ref, type) {
	  this.addActions(createAction('removeEvent', [ref, type]));
	};
	
	Listener.prototype.handler = function (actions, cb) {
	  cb && cb();
	};
	
	Listener.prototype.addActions = function (actions) {
	  var updates = this.updates;
	  var handler = this.handler;
	
	  if (!Array.isArray(actions)) {
	    actions = [actions];
	  }
	
	  if (this.batched) {
	    updates.push.apply(updates, actions);
	  } else {
	    handler(actions);
	  }
	};
	
	function createAction(name, args) {
	  return { module: 'dom', method: name, args: args };
	}

/***/ },
/* 67 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Differ = function () {
	  function Differ(id) {
	    _classCallCheck(this, Differ);
	
	    this.id = id;
	    this.map = [];
	    this.hooks = [];
	  }
	
	  _createClass(Differ, [{
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return this.map.length === 0;
	    }
	  }, {
	    key: 'append',
	    value: function append(type, depth, ref, handler) {
	      var map = this.map;
	      if (!map[depth]) {
	        map[depth] = {};
	      }
	      var group = map[depth];
	      if (!group[type]) {
	        group[type] = {};
	      }
	      if (type === 'element') {
	        if (!group[type][ref]) {
	          group[type][ref] = [];
	        }
	        group[type][ref].push(handler);
	      } else {
	        group[type][ref] = handler;
	      }
	    }
	  }, {
	    key: 'flush',
	    value: function flush() {
	      var map = this.map.slice();
	      this.map.length = 0;
	      map.forEach(function (group) {
	        callTypeMap(group, 'repeat');
	        callTypeMap(group, 'shown');
	        callTypeList(group, 'element');
	      });
	
	      var hooks = this.hooks.slice();
	      this.hooks.length = 0;
	      hooks.forEach(function (fn) {
	        fn();
	      });
	
	      if (!this.isEmpty()) {
	        this.flush();
	      }
	    }
	  }, {
	    key: 'then',
	    value: function then(fn) {
	      this.hooks.push(fn);
	    }
	  }]);
	
	  return Differ;
	}();
	
	exports.default = Differ;
	
	
	function callTypeMap(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    map[ref]();
	  }
	}
	
	function callTypeList(group, type) {
	  var map = group[type];
	  for (var ref in map) {
	    var list = map[ref];
	    list.forEach(function (handler) {
	      handler();
	    });
	  }
	}

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * @fileOverview event manager
	                                                                                                                                                                                                                                                   */
	
	exports.default = EventManager;
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function EventManager() {
	  this.els = [];
	  this.targets = [];
	}
	
	EventManager.prototype._get = function (el, force) {
	  var index = _.indexOf(this.els, el);
	  var target;
	  if (index >= 0) {
	    target = this.targets[index];
	  } else if (force) {
	    target = { el: el, events: {} };
	    this.els.push(el);
	    this.targets.push(target);
	  }
	  return target;
	};
	
	EventManager.prototype.add = function (el, type, handler) {
	  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !el || typeof type !== 'string' || !type || typeof handler !== 'function') {
	    return;
	  }
	  var target = this._get(el, true);
	  target.events[type] = handler;
	};
	
	EventManager.prototype.remove = function (el, type) {
	  if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) !== 'object' || !el || typeof type !== 'string' || !type) {
	    return;
	  }
	  var target = this._get(el);
	  if (target) {
	    delete target.events[type];
	  }
	};
	
	EventManager.prototype.fire = function (el, type, e) {
	  var target = this._get(el);
	  var handler, el;
	  if (target) {
	    el = target.el;
	    handler = target.events[type];
	    if (typeof handler === 'function') {
	      return handler.call(el, e);
	    }
	  }
	};

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Document = Document;
	exports.destroyDocument = destroyDocument;
	exports.Node = Node;
	exports.Element = Element;
	exports.Comment = Comment;
	/**
	 * @fileOverview
	 * A simple virtual dom implementation
	 */
	
	var DEFAULT_TAG_NAME = 'div';
	
	var instanceMap = exports.instanceMap = {};
	
	function Document(id, url) {
	  id = id ? id.toString() : '';
	  this.id = id;
	  this.URL = url;
	  this.nextRef = 1;
	  this.nodeMap = {};
	  this.listener = null;
	  this.eventManager = null;
	  this.closed = false;
	  instanceMap[id] = this;
	
	  this.createDocumentElement();
	}
	
	function destroyDocument(id) {
	  delete instanceMap[id];
	}
	
	Document.prototype.open = function () {
	  this.closed = false;
	  if (this.listener) {
	    this.listener.batched = false;
	  }
	};
	Document.prototype.close = function () {
	  this.closed = true;
	  if (this.listener) {
	    this.listener.batched = true;
	  }
	};
	
	Document.prototype.setEventManager = function (eventManager) {
	  this.eventManager = eventManager;
	};
	
	Document.prototype.setListener = function (listener) {
	  this.listener = listener;
	  listener.batched = !!this.closed;
	};
	
	Document.prototype.addRef = function (el) {
	  el.ref = this.nextRef.toString();
	  this.nodeMap[el.ref] = el;
	  this.nextRef++;
	};
	
	Document.prototype.getRef = function (ref) {
	  return this.nodeMap[ref];
	};
	
	Document.prototype.removeRef = function (ref) {
	  delete this.nodeMap[ref];
	};
	
	Document.prototype.createDocumentElement = function (type, props) {
	  if (!this.documentElement) {
	    this.documentElement = new Element(type, props, this);
	    this.nodeMap._documentElement = this.documentElement;
	    this.documentElement.ref = '_documentElement';
	    this.documentElement.attached = true;
	  }
	
	  return this.documentElement;
	};
	
	Document.prototype.createBody = function (type, props) {
	  if (!this.body) {
	    this.body = new Element(type, props, this);
	    this.nodeMap._root = this.body;
	    this.body.ref = '_root';
	    this.body.depth = 1;
	  }
	
	  return this.body;
	};
	
	Document.prototype.createElement = function (tagName, props) {
	  return new Element(tagName, props, this);
	};
	
	Document.prototype.createComment = function (text) {
	  return new Comment(text, this);
	};
	
	function Node() {}
	
	Node.prototype.create = function (instanceId) {
	  this.parentRef = null;
	  this.attached = false;
	  if (instanceId) {
	    this.instanceId = instanceId;
	    var doc = instanceMap[instanceId];
	    doc.addRef(this);
	  }
	};
	
	Node.prototype.destroy = function () {
	  var ref = this.ref;
	  var instanceId = this.instanceId;
	  if (instanceId) {
	    var doc = instanceMap[instanceId];
	    doc.removeRef(ref);
	  }
	
	  var children = this.children || [];
	  var length = children.length;
	  for (var i = 0; i < length; i++) {
	    children[i].destroy();
	  }
	};
	
	Node.prototype.getRenderer = function () {
	  var doc = instanceMap[this.instanceId];
	  return doc.listener;
	};
	
	Node.prototype.next = function () {
	  var instanceId = this.instanceId;
	  var doc = instanceMap[instanceId];
	  var parent = doc.getRef(this.parentRef);
	  if (parent) {
	    return parent.children[parent.children.indexOf(this) + 1];
	  }
	};
	
	Node.prototype.prev = function () {
	  var instanceId = this.instanceId;
	  var doc = instanceMap[instanceId];
	  var parent = doc.getRef(this.parentRef);
	  if (parent) {
	    return parent.children[parent.children.indexOf(this) - 1];
	  }
	};
	
	function Element() {
	  var type = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_TAG_NAME : arguments[0];
	  var props = arguments[1];
	  var ownerDocument = arguments[2];
	
	  props = props || {};
	  this.create(ownerDocument.id);
	  this.ownerDocument = ownerDocument;
	  this.type = type;
	  this.attr = props.attr || {};
	  this.classStyle = props.classStyle || {};
	  this.style = props.style || {};
	  this.event = [];
	  this.children = [];
	  this.pureChildren = [];
	}
	
	Element.prototype = new Node();
	
	Element.prototype.appendChild = function (node) {
	
	  removeIfExisted(node);
	  node.parentRef = this.ref;
	  this.children.push(node);
	
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    setDetached(node);
	  }
	
	  if (node instanceof Element) {
	    this.pureChildren.push(node);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        if (this.ref === '_documentElement') {
	          // if its parent is documentElement then it's a body
	          renderer.createBody(node, this.ref);
	        } else {
	          renderer.addElement(node, this.ref);
	        }
	      }
	    }
	  }
	};
	
	Element.prototype.insertBefore = function (node, before) {
	
	  if (node.parentRef === this.ref) {
	    moveBefore(node, before, this.children);
	    if (node instanceof Element) {
	      var pureBeforeIndex = movePureBefore(node, before, this.pureChildren);
	      if (pureBeforeIndex >= 0 && this.attached) {
	        var renderer = this.getRenderer();
	        if (renderer) {
	          renderer.moveElement(node.ref, this.ref, pureBeforeIndex);
	        }
	      }
	    }
	    return;
	  }
	
	  removeIfExisted(node);
	
	  var children = this.children;
	  var index = children.indexOf(before);
	
	  node.parentRef = this.ref;
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    setDetached(node);
	  }
	  children.splice(index, 0, node);
	
	  if (node instanceof Element) {
	    var pureChildren = this.pureChildren;
	    var pureIndex = getPureAfter(before, pureChildren);
	
	    pureChildren.splice(pureIndex, 0, node);
	
	    if (this.attached) {
	      var _renderer = this.getRenderer();
	      if (_renderer) {
	        _renderer.addElement(node, this.ref, pureIndex);
	      }
	    }
	  }
	};
	
	Element.prototype.insertAfter = function (node, after) {
	
	  if (node.parentRef === this.ref) {
	    moveAfter(node, after, this.children);
	    if (node instanceof Element) {
	      var pureAfterIndex = movePureAfter(node, after, this.pureChildren);
	      if (pureAfterIndex >= 0 && this.attached) {
	        var renderer = this.getRenderer();
	        if (renderer) {
	          renderer.moveElement(node.ref, this.ref, pureAfterIndex);
	        }
	      }
	    }
	    return;
	  }
	
	  removeIfExisted(node);
	
	  var children = this.children;
	  var index = children.indexOf(after);
	
	  node.parentRef = this.ref;
	  if (this.attached) {
	    setAttached(node, this.depth);
	  } else {
	    /* istanbul ignore next */
	    setDetached(node);
	  }
	  children.splice(index + 1, 0, node);
	
	  if (node instanceof Element) {
	    var pureChildren = this.pureChildren;
	    var pureIndex = getPureBefore(after, pureChildren);
	
	    pureChildren.splice(pureIndex + 1, 0, node);
	
	    if (this.attached) {
	      var _renderer2 = this.getRenderer();
	      if (_renderer2) {
	        _renderer2.addElement(node, this.ref, pureIndex + 1);
	      }
	    }
	  }
	};
	
	Element.prototype.removeChild = function (node, preserved) {
	  var children = this.children;
	  var index = children.indexOf(node);
	
	  setDetached(node);
	
	  if (index >= 0) {
	    node.parentRef = null;
	    children.splice(index, 1);
	    if (!preserved) {
	      node.destroy();
	    }
	  }
	
	  if (node instanceof Element) {
	    this.pureChildren.$remove(node);
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.removeElement(node.ref);
	      }
	    }
	  }
	};
	
	Element.prototype.clear = function () {
	  var children = this.children;
	  var length = children.length;
	  for (var i = 0; i < length; i++) {
	    var child = children[i];
	    child.parentRef = null;
	    setDetached(child);
	    child.destroy();
	  }
	  children.length = 0;
	
	  if (this.attached) {
	    var refs = this.pureChildren.map(function (child) {
	      return child.ref;
	    });
	    this.pureChildren.length = 0;
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.removeElement(refs);
	    }
	  }
	};
	
	function moveBefore(node, before, children) {
	  var targetIndex = children.indexOf(node);
	  var beforeIndex = children.indexOf(before);
	
	  /* istanbul ignore next */
	  if (targetIndex === beforeIndex || targetIndex + 1 === beforeIndex) {
	    return -1;
	  }
	
	  var newIndex = targetIndex < beforeIndex ? beforeIndex - 1 : beforeIndex;
	  children.splice(targetIndex, 1);
	  children.splice(newIndex, 0, node);
	
	  return beforeIndex;
	}
	
	function movePureBefore(node, before, pureChildren) {
	  var pureTargetIndex = pureChildren.indexOf(node);
	  var pureBeforeIndex = getPureAfter(before, pureChildren);
	
	  /* istanbul ignore next */
	  if (pureTargetIndex === pureBeforeIndex || pureTargetIndex + 1 === pureBeforeIndex) {
	    return -1;
	  }
	
	  var pureNewIndex = pureTargetIndex < pureBeforeIndex ? pureBeforeIndex - 1 : pureBeforeIndex;
	
	  pureChildren.splice(pureTargetIndex, 1);
	  pureChildren.splice(pureNewIndex, 0, node);
	
	  return pureBeforeIndex;
	}
	
	function getPureAfter(node, pureChildren) {
	  var pureIndex = pureChildren.indexOf(node);
	  while (node && pureIndex < 0) {
	    node = node.next();
	    pureIndex = pureChildren.indexOf(node);
	  }
	  if (pureIndex < 0) {
	    pureIndex = pureChildren.length;
	  }
	  return pureIndex;
	}
	
	function moveAfter(node, after, children) {
	  var targetIndex = children.indexOf(node);
	  var afterIndex = children.indexOf(after);
	
	  /* istanbul ignore next */
	  if (targetIndex === afterIndex || targetIndex === afterIndex + 1) {
	    return -1;
	  }
	
	  var newIndex = targetIndex < afterIndex ? afterIndex : afterIndex + 1;
	  children.splice(targetIndex, 1);
	  children.splice(newIndex, 0, node);
	
	  return afterIndex;
	}
	
	function movePureAfter(node, after, pureChildren) {
	  var pureTargetIndex = pureChildren.indexOf(node);
	  var pureAfterIndex = getPureBefore(after, pureChildren);
	
	  /* istanbul ignore next */
	  if (pureTargetIndex === pureAfterIndex || pureTargetIndex === pureAfterIndex + 1) {
	    return -1;
	  }
	
	  var pureNewIndex = pureTargetIndex < pureAfterIndex ? pureAfterIndex : pureAfterIndex + 1;
	
	  pureChildren.splice(pureTargetIndex, 1);
	  pureChildren.splice(pureNewIndex, 0, node);
	
	  return pureAfterIndex + 1;
	}
	
	function getPureBefore(node, pureChildren) {
	  var pureIndex = pureChildren.indexOf(node);
	  while (node && pureIndex < 0) {
	    node = node.prev();
	    pureIndex = pureChildren.indexOf(node);
	  }
	  /* istanbul ignore next */
	  if (pureIndex < 0) {
	    pureIndex = -1;
	  }
	  return pureIndex;
	}
	
	function setAttached(node, depth) {
	  if (node.ref === '_root') {
	    depth = 1;
	  } else {
	    depth = depth > 0 ? depth + 1 : 0;
	  }
	  node.attached = true;
	  node.depth = depth;
	  if (node.children) {
	    node.children.forEach(function (sub) {
	      setAttached(sub, depth);
	    });
	  }
	}
	
	function setDetached(node) {
	  node.attached = false;
	  node.depth = 0;
	  if (node.children) {
	    node.children.forEach(function (sub) {
	      setDetached(sub);
	    });
	  }
	}
	
	function removeIfExisted(node) {
	  var doc = instanceMap[node.instanceId];
	  if (doc) {
	    var existedNode = doc.getRef(node.ref);
	    if (existedNode) {
	      var existedParent = doc.getRef(existedNode.parentRef);
	      if (existedParent && existedParent.removeChild) {
	        existedParent.removeChild(existedNode, true);
	      }
	    }
	  }
	}
	
	Element.prototype.setAttr = function (key, value, silent) {
	  if (this.attr[key] === value) {
	    return;
	  }
	  this.attr[key] = value;
	  if (!silent && this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setAttr(this.ref, key, value);
	    }
	  }
	};
	
	Element.prototype.setStyle = function (key, value, silent) {
	  /* istanbul ignore if */
	  if (this.style[key] === value) {
	    return;
	  }
	  this.style[key] = value;
	  if (!silent && this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setStyle(this.ref, key, value);
	    }
	  }
	};
	
	Element.prototype.setClassStyle = function (classStyle) {
	  this.classStyle = classStyle;
	  if (this.attached) {
	    var renderer = this.getRenderer();
	    if (renderer) {
	      renderer.setStyles(this.ref, this.toStyle());
	    }
	  }
	};
	
	Element.prototype.addEvent = function (type, handler) {
	  var index = this.event.indexOf(type);
	
	  if (index < 0) {
	    this.event.push(type);
	    var eventManager = this.ownerDocument.eventManager;
	    eventManager.add(this, type, handler);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.addEvent(this.ref, type);
	      }
	    }
	  }
	};
	
	Element.prototype.removeEvent = function (type) {
	  var index = this.event.indexOf(type);
	
	  if (index >= 0) {
	    this.event.splice(index, 1);
	    var eventManager = this.ownerDocument.eventManager;
	    eventManager.remove(this, type);
	
	    if (this.attached) {
	      var renderer = this.getRenderer();
	      if (renderer) {
	        renderer.removeEvent(this.ref, type);
	      }
	    }
	  }
	};
	
	Element.prototype.toStyle = function () {
	  var result = {};
	  var classStyle = this.classStyle;
	  var style = this.style;
	  for (var name in classStyle) {
	    result[name] = classStyle[name];
	  }
	  for (var _name in style) {
	    result[_name] = style[_name];
	  }
	  return result;
	};
	
	Element.prototype.toJSON = function () {
	  var result = {
	    ref: this.ref.toString(),
	    type: this.type,
	    attr: this.attr,
	    style: this.toStyle()
	  };
	
	  if (this.event && this.event.length) {
	    result.event = this.event;
	  }
	  if (this.pureChildren && this.pureChildren.length) {
	    result.children = this.pureChildren.map(function (child) {
	      return child.toJSON();
	    });
	  }
	
	  return result;
	};
	
	Element.prototype.toString = function () {
	  return '<' + this.type + ' attr=' + JSON.stringify(this.attr) + ' style=' + JSON.stringify(this.toStyle()) + '>' + this.pureChildren.map(function (child) {
	    return child.toString();
	  }).join('') + '</' + this.type + '>';
	};
	
	function Comment(value, ownerDocument) {
	  this.create(ownerDocument.id);
	  this.type = 'comment';
	  this.value = value;
	}
	
	Comment.prototype = new Node();
	
	Comment.prototype.toString = function () {
	  return '<!-- ' + this.value + ' -->';
	};

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = {
		"name": "weex-jsframework",
		"version": "0.13.10",
		"description": "JS Framework for Weex solution which is a extendable cross-platform solution for dynamic programming and publishing projects",
		"main": "index.js",
		"scripts": {
			"dev": "webpack --watch --config ./webpack.config.js",
			"build": "webpack --config ./webpack.config.js",
			"compress": "uglifyjs dist/index.js -o dist/index.min.js",
			"lint": "jscs --config .jscsrc polyfill/*.js polyfill/__test__/*.js lib/*.js lib/__test__/*.js lib/app/*.js lib/app/__test__/*.js lib/vm/*.js lib/vm/__test__/*.js",
			"test": "mocha --compilers js:babel-core/register polyfill/__test__/*.js lib/__test__/*.js lib/**/__test__/*.js",
			"cover": "babel-node node_modules/isparta/bin/isparta cover --report text node_modules/mocha/bin/_mocha -- --reporter dot polyfill/__test__/*.js lib/__test__/*.js lib/**/__test__/*.js",
			"ci": "npm run lint && npm run cover"
		},
		"repository": {
			"type": "git",
			"url": "git@github.com:alibaba/weex.git"
		},
		"author": [
			{
				"name": "jinjiang",
				"email": "zhaojinjiang@me.com"
			},
			{
				"name": "Terry King",
				"email": "terrykingcha@gmail.com"
			}
		],
		"contributors": [
			{
				"name": "pushiming",
				"email": "pushiming@gmail.com"
			},
			{
				"name": "iskenhuang",
				"email": "iskenhuang@gmail.com"
			},
			{
				"name": "yuanyan",
				"email": "yuanyan.cao@gmail.com"
			}
		],
		"keywords": [
			"weex",
			"mvvm",
			"browser",
			"hybrid",
			"framework"
		],
		"license": "Apache-2.0",
		"dependencies": {
			"semver": "~5.1.0",
			"core-js": "~2.1.1"
		},
		"devDependencies": {
			"babel-cli": "~6.4.5",
			"babel-core": "~6.4.5",
			"babel-loader": "~6.2.1",
			"babel-preset-es2015": "~6.3.13",
			"chai": "~3.2.0",
			"isparta": "~4.0.0",
			"istanbul": "~0.4.2",
			"jscs": "~2.9.0",
			"json-loader": "^0.5.4",
			"mocha": "~2.3.4",
			"sinon": "~1.17.2",
			"sinon-chai": "~2.8.0",
			"uglify-js": "^2.6.2",
			"watch-cli": "~0.2.1",
			"webpack": "~1.12.12"
		},
		"optionalDependencies": {
			"weex-transformer": ">=0.1.5 <0.4"
		}
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$ = $;
	exports.$el = $el;
	exports.$vm = $vm;
	exports.$renderThen = $renderThen;
	exports.$scrollTo = $scrollTo;
	exports.$transition = $transition;
	exports.$getConfig = $getConfig;
	exports.$sendHttp = $sendHttp;
	exports.$openURL = $openURL;
	exports.$setTitle = $setTitle;
	exports.$call = $call;
	
	var _util = __webpack_require__(46);
	
	var _ = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * ==========================================================
	 * common
	 * ==========================================================
	 */
	
	/**
	 * @deprecated use $vm instead
	 * find the vm by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $(id) {
	  _.warn('Vm#$ is deprecated, please use Vm#$vm instead');
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * find the element by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Element}
	 */
	/**
	 * @fileOverview The api for invoking with "$" prefix
	 */
	function $el(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.el;
	  }
	}
	
	/**
	 * find the vm of the custom component by id
	 * Note: there is only one id in whole component
	 * @param  {string} id
	 * @return {Vm}
	 */
	function $vm(id) {
	  var info = this._ids[id];
	  if (info) {
	    return info.vm;
	  }
	}
	
	/**
	 * Fire when differ rendering finished
	 *
	 * @param  {Function} fn
	 */
	function $renderThen(fn) {
	  var app = this._app;
	  var differ = app.differ;
	  return differ.then(function () {
	    fn();
	  });
	}
	
	/**
	 * scroll an element specified by id into view, 
	 * moreover specify a number of offset optionally
	 * @param  {string} id
	 * @param  {number} offset
	 */
	function $scrollTo(id, offset) {
	  _.warn('Vm#$scrollTo is deprecated, ' + 'please use "require(\'@weex-module/dom\')' + '.scrollTo(el, options)" instead');
	  var el = this.$el(id);
	  if (el) {
	    var dom = this._app.requireModule('dom');
	    dom.scrollToElement(el.ref, { offset: offset });
	  }
	}
	
	/**
	 * perform transition animation on an element specified by id
	 * @param  {string}   id
	 * @param  {object}   options
	 * @param  {object}   options.styles
	 * @param  {object}   options.duration(ms)
	 * @param  {object}   [options.timingFunction]
	 * @param  {object}   [options.delay=0(ms)]
	 * @param  {Function} callback
	 */
	function $transition(id, options, callback) {
	  var _this = this;
	
	  var el = this.$el(id);
	  if (el && options && options.styles) {
	    var animation = this._app.requireModule('animation');
	    animation.transition(el.ref, options, function () {
	      _this._setStyle(el, options.styles);
	      callback && callback.apply(undefined, arguments);
	    });
	  }
	}
	
	/**
	 * get some config
	 * @return {object} some config for app instance
	 * @property {string} bundleUrl
	 * @property {boolean} debug
	 * @property {object} env
	 * @property {string} env.weexVersion(ex. 1.0.0)
	 * @property {string} env.appName(ex. TB/TM)
	 * @property {string} env.appVersion(ex. 5.0.0)
	 * @property {string} env.platform(ex. iOS/Android)
	 * @property {string} env.osVersion(ex. 7.0.0)
	 * @property {string} env.deviceModel **native only**
	 * @property {number} env.[deviceWidth=750]
	 * @property {number} env.deviceHeight
	 */
	function $getConfig(callback) {
	  var config = _.extend({
	    env: global.WXEnvironment || {}
	  }, this._app.options);
	  if (_.typof(callback) === 'function') {
	    _.warn('the callback of Vm#$getConfig(callback) is deprecated, ' + 'this api now can directly RETURN config info.');
	    callback(config);
	  }
	  return config;
	}
	
	/**
	 * @deprecated
	 * request network via http protocol
	 * @param  {object}   params
	 * @param  {Function} callback
	 */
	function $sendHttp(params, callback) {
	  _.warn('Vm#$sendHttp is deprecated, ' + 'please use "require(\'@weex-module/stream\')' + '.sendHttp(params, callback)" instead');
	  var stream = this._app.requireModule('stream');
	  stream.sendHttp(params, callback);
	}
	
	/**
	 * @deprecated
	 * open a url
	 * @param  {string} url
	 */
	function $openURL(url) {
	  _.warn('Vm#$openURL is deprecated, ' + 'please use "require(\'@weex-module/event\')' + '.openURL(url)" instead');
	  var event = this._app.requireModule('event');
	  event.openURL(url);
	}
	
	/**
	 * @deprecated 
	 * set a title for page
	 * @param  {string} title
	 */
	function $setTitle(title) {
	  _.warn('Vm#$setTitle is deprecated, ' + 'please use "require(\'@weex-module/pageInfo\')' + '.setTitle(title)" instead');
	  var pageInfo = this._app.requireModule('pageInfo');
	  pageInfo.setTitle(title);
	}
	
	/**
	 * @deprecated use "require('@weex-module/moduleName') instead"
	 * invoke a native method by specifing the name of module and method
	 * @param  {string} moduleName
	 * @param  {string} methodName
	 * @param  {...*} the rest arguments
	 */
	function $call(moduleName, methodName) {
	  _.warn('Vm#$call is deprecated, ' + 'please use "require(\'@weex-module/moduleName\')" instead');
	  var module = this._app.requireModule(moduleName);
	  if (module && module[methodName]) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    module[methodName].apply(module, args);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWVkOTk1ZDU3YmZjNjUwNjk1YzMiLCJ3ZWJwYWNrOi8vLy4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvb2JqZWN0QXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWluZGV4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcG9seWZpbGwvc2V0VGltZW91dC5qcyIsIndlYnBhY2s6Ly8vLi9wb2x5ZmlsbC9jb25zb2xlbG9nLmpzIiwid2VicGFjazovLy8uL3BvbHlmaWxsL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2ZyYW1ld29yay5qcyIsIndlYnBhY2s6Ly8vLi9saWIvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zZW12ZXIvc2VtdmVyLmpzIiwid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2xpYi92bS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vaW5zdGFuY2Uvc2NvcGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL3V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL29ic2VydmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi92bS9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL29ic2VydmVyL2RlcC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vb2JzZXJ2ZXIvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL29ic2VydmVyL29iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vY29tcGlsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3ZtL2RpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vd2F0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vZG9tLWhlbHBlci5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdm0vZXZlbnRzLmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvcmVnaXN0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kb3duZ3JhZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9jdHJsLmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvZG9tLWxpc3RlbmVyLmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvZGlmZmVyLmpzIiwid2VicGFjazovLy8uL2xpYi9hcHAvZXZlbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vcGFja2FnZS5qc29uIiwid2VicGFjazovLy8uL2xpYi9hcGkvbWV0aG9kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7S0FBWSxTOztBQUNaOzs7OzRCQUVTLFU7QUFDTCxZQUFPLFVBQVAsSUFBcUIsWUFBbUI7QUFDcEMsYUFBTSxNQUFNLFVBQVUsVUFBViw2QkFBWjtBQUNBLGFBQUksZUFBZSxLQUFuQixFQUEwQjtBQUN0QixxQkFBUSxLQUFSLENBQWMsSUFBSSxRQUFKLEVBQWQ7QUFDSCxVQUZELE1BRU8sSUFBSSxlQUFlLEtBQW5CLEVBQTBCO0FBQzdCLGlCQUFJLE9BQUosQ0FBWSxhQUFLO0FBQ2IscUJBQUksYUFBYSxLQUFqQixFQUF3QjtBQUNwQiw2QkFBUSxLQUFSLENBQWMsRUFBRSxRQUFGLEVBQWQ7QUFDSDtBQUNKLGNBSkQ7QUFLSDtBQUNELGdCQUFPLEdBQVA7QUFDSCxNQVpEOzs7QUFESixNQUFLLElBQUksVUFBVCxJQUF1QixTQUF2QixFQUFrQztBQUFBLFdBQXpCLFVBQXlCO0FBY2pD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UUFBeEI7QUFDRDs7Ozs7OztBQU9NLFVBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUM1QixLQUFFLElBQUYsQ0FBTyxnQ0FDQyw2Q0FERCxHQUVDLHdCQUZSO0FBR0EsT0FBTSxRQUFRLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBLFNBQU0sT0FBTixDQUFjLEdBQWQ7QUFDRDs7Ozs7OztBQU9NLFVBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUMvQixLQUFFLElBQUYsQ0FBTyxpQ0FDQyxnREFERCxHQUVDLDJCQUZSO0FBR0EsT0FBTSxXQUFXLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBd0IsVUFBeEIsQ0FBakI7QUFDQSxZQUFTLFFBQVQsQ0FBa0IsS0FBbEI7QUFDRDs7Ozs7Ozs7O0FBU00sVUFBUyxLQUFULENBQWUsVUFBZixFQUEyQixVQUEzQixFQUFnRDtBQUNyRCxLQUFFLElBQUYsQ0FBTyw2QkFDTCwyREFERjtBQUVBLE9BQU0sU0FBUyxLQUFLLElBQUwsQ0FBVSxhQUFWLENBQXdCLFVBQXhCLENBQWY7QUFDQSxPQUFJLFVBQVUsT0FBTyxVQUFQLENBQWQsRUFBa0M7QUFBQSx1Q0FKYSxJQUliO0FBSmEsV0FJYjtBQUFBOztBQUNoQyxZQUFPLFVBQVAsZ0JBQXNCLElBQXRCO0FBQ0Q7QUFDRixFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA1ZWQ5OTVkNTdiZmM2NTA2OTVjM1xuICoqLyIsImltcG9ydCAnLi9wb2x5ZmlsbCdcbmltcG9ydCAqIGFzIGZyYW1ld29yayBmcm9tICcuL2xpYi9mcmFtZXdvcmsnXG5pbXBvcnQge3ZlcnNpb24sIG9wdGlvbmFsRGVwZW5kZW5jaWVzfSBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZm9yIChsZXQgbWV0aG9kTmFtZSBpbiBmcmFtZXdvcmspIHtcbiAgICBnbG9iYWxbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBjb25zdCByZXQgPSBmcmFtZXdvcmtbbWV0aG9kTmFtZV0oLi4uYXJncylcbiAgICAgICAgaWYgKHJldCBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKHJldC50b1N0cmluZygpKVxuICAgICAgICB9IGVsc2UgaWYgKHJldCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXQuZm9yRWFjaChyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAociBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioci50b1N0cmluZygpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldFxuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihnbG9iYWwsIHtcbiAgICBmcmFtZXdvcmtWZXJzaW9uOiB2ZXJzaW9uLFxuICAgIG5lZWRUcmFuc2Zvcm1lclZlcnNpb246IG9wdGlvbmFsRGVwZW5kZW5jaWVzWyd3ZWV4LXRyYW5zZm9ybWVyJ11cbn0pXG5cbi8qKlxuICogcmVnaXN0ZXIgbWV0aG9kc1xuICovXG5jb25zdCBtZXRob2RzID0gcmVxdWlyZSgnLi9saWIvYXBpL21ldGhvZHMnKVxuY29uc3Qge3JlZ2lzdGVyTWV0aG9kc30gPSBnbG9iYWxcbnJlZ2lzdGVyTWV0aG9kcyhtZXRob2RzKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9pbmRleC5qc1xuICoqLyIsImltcG9ydCAnLi9vYmplY3RBc3NpZ24nXG5pbXBvcnQgJy4vc2V0VGltZW91dCdcbmltcG9ydCAnLi9jb25zb2xlbG9nJ1xuaW1wb3J0ICcuL3Byb21pc2UnXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0ICdjb3JlLWpzL2ZuL29iamVjdC9hc3NpZ24nXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL29iamVjdEFzc2lnbi5qc1xuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvZm4vb2JqZWN0L2Fzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCByZWRlZmluZSAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIHx8IChnbG9iYWxbbmFtZV0gPSB7fSkgOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdIHx8IChleHBvcnRzW1BST1RPVFlQRV0gPSB7fSlcbiAgICAsIGtleSwgb3duLCBvdXQsIGV4cDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gKG93biA/IHRhcmdldCA6IHNvdXJjZSlba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGV4cCA9IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4dGVuZCBnbG9iYWxcbiAgICBpZih0YXJnZXQpcmVkZWZpbmUodGFyZ2V0LCBrZXksIG91dCwgdHlwZSAmICRleHBvcnQuVSk7XG4gICAgLy8gZXhwb3J0XG4gICAgaWYoZXhwb3J0c1trZXldICE9IG91dCloaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcbiAgICBpZihJU19QUk9UTyAmJiBleHBQcm90b1trZXldICE9IG91dClleHBQcm90b1trZXldID0gb3V0O1xuICB9XG59O1xuZ2xvYmFsLmNvcmUgPSBjb3JlO1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19leHBvcnQuanNcbiAqKi8iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZ2xvYmFsLmpzXG4gKiovIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi4xLjUnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2NvcmUuanNcbiAqKi8iLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9faGlkZS5qc1xuICoqLyIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4gKiovIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2lzLW9iamVjdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcclxuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4gKiovIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19mYWlscy5qc1xuICoqLyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4gKiovIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFNSQyAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdzcmMnKVxuICAsIFRPX1NUUklORyA9ICd0b1N0cmluZydcbiAgLCAkdG9TdHJpbmcgPSBGdW5jdGlvbltUT19TVFJJTkddXG4gICwgVFBMICAgICAgID0gKCcnICsgJHRvU3RyaW5nKS5zcGxpdChUT19TVFJJTkcpO1xuXG5yZXF1aXJlKCcuL19jb3JlJykuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuICR0b1N0cmluZy5jYWxsKGl0KTtcbn07XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKE8sIGtleSwgdmFsLCBzYWZlKXtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgdmFsID09ICdmdW5jdGlvbic7XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgJ25hbWUnKSB8fCBoaWRlKHZhbCwgJ25hbWUnLCBrZXkpO1xuICBpZihPW2tleV0gPT09IHZhbClyZXR1cm47XG4gIGlmKGlzRnVuY3Rpb24paGFzKHZhbCwgU1JDKSB8fCBoaWRlKHZhbCwgU1JDLCBPW2tleV0gPyAnJyArIE9ba2V5XSA6IFRQTC5qb2luKFN0cmluZyhrZXkpKSk7XG4gIGlmKE8gPT09IGdsb2JhbCl7XG4gICAgT1trZXldID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIGlmKCFzYWZlKXtcbiAgICAgIGRlbGV0ZSBPW2tleV07XG4gICAgICBoaWRlKE8sIGtleSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoT1trZXldKU9ba2V5XSA9IHZhbDtcbiAgICAgIGVsc2UgaGlkZShPLCBrZXksIHZhbCk7XG4gICAgfVxuICB9XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICByZXR1cm4gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyAmJiB0aGlzW1NSQ10gfHwgJHRvU3RyaW5nLmNhbGwodGhpcyk7XG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19yZWRlZmluZS5qc1xuICoqLyIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2hhcy5qc1xuICoqLyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3VpZC5qc1xuICoqLyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fY3R4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuICoqLyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxyXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXHJcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcclxuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4gKiovIiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXHJcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcclxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXHJcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xyXG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxyXG4gICAgLCBpICAgICAgPSAwXHJcbiAgICAsIHJlc3VsdCA9IFtdXHJcbiAgICAsIGtleTtcclxuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xyXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcclxuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgfVxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbiAqKi8iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3RvLWlvYmplY3QuanNcbiAqKi8iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19pb2JqZWN0LmpzXG4gKiovIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL19jb2YuanNcbiAqKi8iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fZGVmaW5lZC5qc1xuICoqLyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4O1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbiAqKi8iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1sZW5ndGguanNcbiAqKi8iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuICoqLyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fdG8taW5kZXguanNcbiAqKi8iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxyXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcclxuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbiAqKi8iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX3NoYXJlZC5qc1xuICoqLyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcclxubW9kdWxlLmV4cG9ydHMgPSAoXHJcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcclxuKS5zcGxpdCgnLCcpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbiAqKi8iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9jb3JlLWpzL21vZHVsZXMvX29iamVjdC1nb3BzLmpzXG4gKiovIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2NvcmUtanMvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuICoqLyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vY29yZS1qcy9tb2R1bGVzL190by1vYmplY3QuanNcbiAqKi8iLCJjb25zdCB7XG4gIHNldFRpbWVvdXQsIHNldFRpbWVvdXROYXRpdmVcbn0gPSBnbG9iYWxcblxuLy8gZml4IG5vIHNldFRpbWVvdXQgb24gQW5kcm9pZCBWOFxuLyogaXN0YW5idWwgaWdub3JlIGlmICovXG5pZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnICYmXG4gIHR5cGVvZiBzZXRUaW1lb3V0TmF0aXZlID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnN0IHRpbWVvdXRNYXAgPSB7fVxuICBsZXQgdGltZW91dElkID0gMFxuICBnbG9iYWwuc2V0VGltZW91dCA9IChjYiwgdGltZSkgPT4ge1xuICAgIHRpbWVvdXRNYXBbKyt0aW1lb3V0SWRdID0gY2JcbiAgICBzZXRUaW1lb3V0TmF0aXZlKHRpbWVvdXRJZC50b1N0cmluZygpLCB0aW1lKVxuICB9XG4gIGdsb2JhbC5zZXRUaW1lb3V0Q2FsbGJhY2sgPSAoaWQpID0+IHtcbiAgICBpZiAodHlwZW9mIHRpbWVvdXRNYXBbaWRdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aW1lb3V0TWFwW2lkXSgpXG4gICAgICBkZWxldGUgdGltZW91dE1hcFtpZF1cbiAgICB9XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL3NldFRpbWVvdXQuanNcbiAqKi8iLCJjb25zdCB7Y29uc29sZX0gPSBnbG9iYWxcbmxldCBsb2dMZXZlbFxuXG5jb25zdCBMRVZFTF9NQVAgPSB7XG4gIF9fRVJST1I6ICdlcnJvcicsXG4gIF9fV0FSTjogJ3dhcm4nLFxuICBfX0lORk86ICdpbmZvJyxcbiAgX19ERUJVRzogJ2RlYnVnJyxcbiAgX19WRVJCT1NFOiAndmVyYm9zZSdcbn1cblxuY29uc3QgTEVWRUxTID0gWydlcnJvcicsICd3YXJuJywgJ2luZm8nLCAnZGVidWcnLCAndmVyYm9zZScsICdhbGwnXVxuXG5mdW5jdGlvbiBub3JtYWxpemUgKHYpIHtcbiAgdmFyIHR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodilcbiAgaWYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ1tvYmplY3Qgb2JqZWN0XScpIHtcbiAgICB2ID0gSlNPTi5zdHJpbmdpZnkodilcbiAgfSBlbHNlIHtcbiAgICB2ID0gU3RyaW5nKHYpXG4gIH1cbiAgcmV0dXJuIHZcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50bG9nKC4uLmFyZ3MpIHtcbiAgY29uc3Qge1dYRW52aXJvbm1lbnQsIG5hdGl2ZUxvZ30gPSBnbG9iYWxcblxuICBsb2dMZXZlbCA9IChXWEVudmlyb25tZW50ICYmXG4gICAgICAgICAgICAgICAgV1hFbnZpcm9ubWVudC5sb2dMZXZlbCkgfHxcbiAgICAgICAgICAgICAgICAnaW5mbydcblxuICBpZiAodHlwZW9mIG5hdGl2ZUxvZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGxldCBsZXZlbCA9IGFyZ3MucG9wKClcbiAgICBpZiAoTEVWRUxTLmluZGV4T2YoTEVWRUxfTUFQW2xldmVsXSkgPD1cbiAgICAgICAgICBMRVZFTFMuaW5kZXhPZihsb2dMZXZlbCkpIHtcbiAgICAgIG5hdGl2ZUxvZyguLi5hcmdzLm1hcCh2ID0+IG5vcm1hbGl6ZSh2KSksIGxldmVsKVxuICAgIH1cbiAgfVxufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbmlmICh0eXBlb2YgY29uc29sZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgZ2xvYmFsLmNvbnNvbGUgPSB7XG4gICAgbG9nOiAoLi4uYXJncykgPT4geyAvLyBfX1ZFUkJPU0VcbiAgICAgIHByaW50bG9nKC4uLmFyZ3MsICdfX1ZFUkJPU0UnKVxuICAgIH0sXG4gICAgZGVidWc6ICguLi5hcmdzKSA9PiB7IC8vIF9fREVCVUdcbiAgICAgIHByaW50bG9nKC4uLmFyZ3MsICdfX0RFQlVHJylcbiAgICB9LFxuICAgIGluZm86ICguLi5hcmdzKSA9PiB7IC8vIF9fSU5GT1xuICAgICAgcHJpbnRsb2coLi4uYXJncywgJ19fSU5GTycpXG4gICAgfSxcbiAgICB3YXJuOiAoLi4uYXJncykgPT4geyAvLyBfX1dBUk5cbiAgICAgIHByaW50bG9nKC4uLmFyZ3MsICdfX1dBUk4nKVxuICAgIH0sXG4gICAgZXJyb3I6ICguLi5hcmdzKSA9PiB7IC8vIF9fRVJST1JcbiAgICAgIHByaW50bG9nKC4uLmFyZ3MsICdfX0VSUk9SJylcbiAgICB9XG4gIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3BvbHlmaWxsL2NvbnNvbGVsb2cuanNcbiAqKi8iLCJjb25zdCBNU0cgPSAnVXNpbmcgXCJQcm9taXNlXCIgaXMgdW5leHBlY3RlZCdcblxuY29uc3QgVW5leHBlY3RlZFByb21pc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUud2FybihNU0cpXG5cbiAgdGhpcy50aGVuID0gKCkgPT4ge1xuICAgIGNvbnNvbGUud2FybihNU0cpXG4gIH1cbn1cblxuVW5leHBlY3RlZFByb21pc2UuYWxsID1cbiAgVW5leHBlY3RlZFByb21pc2UucmFjZSA9XG4gIFVuZXhwZWN0ZWRQcm9taXNlLnJlc29sdmUgPVxuICBVbmV4cGVjdGVkUHJvbWlzZS5yZWplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS53YXJuKE1TRylcbiAgfVxuXG5nbG9iYWwuUHJvbWlzZSA9IFVuZXhwZWN0ZWRQcm9taXNlXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9wb2x5ZmlsbC9wcm9taXNlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IE1haW4gZW50cnksIGluc3RhbmNlIG1hbmFnZXJcbiAqXG4gKiAtIGNyZWF0ZUluc3RhbmNlKGluc3RhbmNlSWQsIGNvZGUsIG9wdGlvbnMsIGRhdGEpXG4gKiAtIHJlZnJlc2hJbnN0YW5jZShpbnN0YW5jZUlkLCBkYXRhKVxuICogLSBkZXN0cm95SW5zdGFuY2UoaW5zdGFuY2VJZClcbiAqIC0gcmVnaXN0ZXJDb21wb25lbnRzKGNvbXBvbmVudHMpXG4gKiAtIHJlZ2lzdGVyTW9kdWxlcyhtb2R1bGVzKVxuICogLSBnZXRSb290KGluc3RhbmNlSWQpXG4gKiAtIGluc3RhbmNlTWFwXG4gKiAtIGNhbGxKUyhpbnN0YW5jZUlkLCB0YXNrcylcbiAqICAgLSBmaXJlRXZlbnQocmVmLCB0eXBlLCBkYXRhKVxuICogICAtIGNhbGxiYWNrKGZ1bmNJZCwgZGF0YSlcbiAqL1xuXG5pbXBvcnQgKiBhcyBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgQXBwSW5zdGFuY2UgZnJvbSAnLi9hcHAnXG5pbXBvcnQgVm0gZnJvbSAnLi92bSdcblxudmFyIHtcbiAgbmF0aXZlQ29tcG9uZW50TWFwXG59ID0gY29uZmlnXG52YXIgaW5zdGFuY2VNYXAgPSB7fVxuXG4vKipcbiAqIGNyZWF0ZSBhIFdlZXggaW5zdGFuY2VcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge3N0cmluZ30gY29kZVxuICogQHBhcmFtICB7b2JqZWN0fSBbb3B0aW9uc10gb3B0aW9uIGBIQVNfTE9HYCBlbmFibGUgcHJpbnQgbG9nXG4gKiBAcGFyYW0gIHtvYmplY3R9IFtkYXRhXVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoaW5zdGFuY2VJZCwgY29kZSwgb3B0aW9ucywgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGNvbmZpZy5kZWJ1ZyA9IG9wdGlvbnMuZGVidWdcblxuICB2YXIgcmVzdWx0XG4gIGlmICghaW5zdGFuY2UpIHtcbiAgICBpbnN0YW5jZSA9IG5ldyBBcHBJbnN0YW5jZShpbnN0YW5jZUlkLCBvcHRpb25zKVxuICAgIGluc3RhbmNlTWFwW2luc3RhbmNlSWRdID0gaW5zdGFuY2VcbiAgICByZXN1bHQgPSBpbnN0YW5jZS5pbml0KGNvZGUsIGRhdGEpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiByZWZyZXNoIGEgV2VleCBpbnN0YW5jZVxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICogQHBhcmFtICB7b2JqZWN0fSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoSW5zdGFuY2UoaW5zdGFuY2VJZCwgZGF0YSkge1xuICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICB2YXIgcmVzdWx0XG4gIGlmIChpbnN0YW5jZSkge1xuICAgIHJlc3VsdCA9IGluc3RhbmNlLnJlZnJlc2hEYXRhKGRhdGEpXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gbmV3IEVycm9yKGBpbnZhbGlkIGluc3RhbmNlIGlkIFwiJHtpbnN0YW5jZUlkfVwiYClcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogZGVzdHJveSBhIFdlZXggaW5zdGFuY2VcbiAqIEBwYXJhbSAge3N0cmluZ30gaW5zdGFuY2VJZFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUluc3RhbmNlKGluc3RhbmNlSWQpIHtcbiAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgaWYgKCFpbnN0YW5jZSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCJgKVxuICB9XG5cbiAgaW5zdGFuY2UuZGVzdHJveSgpXG4gIGRlbGV0ZSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICByZXR1cm4gaW5zdGFuY2VNYXBcbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBvZiBlYWNoIG5hdGl2ZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge2FycmF5fSBjb21wb25lbnRzIGFycmF5IG9mIG5hbWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQ29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudHMpKSB7XG4gICAgY29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbmFtZS50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBuYXRpdmVDb21wb25lbnRNYXBbbmFtZS50eXBlXSA9IG5hbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogcmVnaXN0ZXIgdGhlIG5hbWUgYW5kIG1ldGhvZHMgb2YgZWFjaCBtb2R1bGVcbiAqIEBwYXJhbSAge29iamVjdH0gbW9kdWxlcyBhIG9iamVjdCBvZiBtb2R1bGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZXMobW9kdWxlcykge1xuICBpZiAodHlwZW9mIG1vZHVsZXMgPT09ICdvYmplY3QnKSB7XG4gICAgVm0ucmVnaXN0ZXJNb2R1bGVzKG1vZHVsZXMpXG4gIH1cbn1cblxuLyoqXG4gKiByZWdpc3RlciB0aGUgbmFtZSBhbmQgbWV0aG9kcyBvZiBlYWNoIGFwaVxuICogQHBhcmFtICB7b2JqZWN0fSBhcGlzIGEgb2JqZWN0IG9mIGFwaXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhhcGlzKSB7XG4gIGlmICh0eXBlb2YgYXBpcyA9PT0gJ29iamVjdCcpIHtcbiAgICBWbS5yZWdpc3Rlck1ldGhvZHMoYXBpcylcbiAgfVxufVxuXG4vKipcbiAqIGdldCBhIHdob2xlIGVsZW1lbnQgdHJlZSBvZiBhbiBpbnN0YW5jZVxuICogZm9yIGRlYnVnZ2luZ1xuICogQHBhcmFtICB7c3RyaW5nfSBpbnN0YW5jZUlkXG4gKiBAcmV0dXJuIHtvYmplY3R9IGEgdmlydHVhbCBkb20gdHJlZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdChpbnN0YW5jZUlkKSB7XG4gIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIHZhciByZXN1bHRcbiAgaWYgKGluc3RhbmNlKSB7XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZ2V0Um9vdEVsZW1lbnQoKVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IG5ldyBFcnJvcihgaW52YWxpZCBpbnN0YW5jZSBpZCBcIiR7aW5zdGFuY2VJZH1cImApXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG52YXIganNIYW5kbGVycyA9IHtcbiAgZmlyZUV2ZW50OiBmdW5jdGlvbiBmaXJlRXZlbnQoaW5zdGFuY2VJZCwgcmVmLCB0eXBlLCBkYXRhLCBkb21DaGFuZ2VzKSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICB2YXIgcmVzdWx0XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuZmlyZUV2ZW50KHJlZiwgdHlwZSwgZGF0YSwgZG9tQ2hhbmdlcylcbiAgICByZXR1cm4gcmVzdWx0XG4gIH0sXG5cbiAgY2FsbGJhY2s6IGZ1bmN0aW9uIGNhbGxiYWNrKGluc3RhbmNlSWQsIGZ1bmNJZCwgZGF0YSwgaWZMYXN0KSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgICB2YXIgcmVzdWx0XG4gICAgcmVzdWx0ID0gaW5zdGFuY2UuY2FsbGJhY2soZnVuY0lkLCBkYXRhLCBpZkxhc3QpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG5cbi8qKlxuICogYWNjZXB0IGNhbGxzIGZyb20gbmF0aXZlIChldmVudCBvciBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGluc3RhbmNlSWRcbiAqIEBwYXJhbSAge2FycmF5fSB0YXNrcyBsaXN0IHdpdGggYG1ldGhvZGAgYW5kIGBhcmdzYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsbEpTKGluc3RhbmNlSWQsIHRhc2tzKSB7XG4gIGNvbnN0IGluc3RhbmNlID0gaW5zdGFuY2VNYXBbaW5zdGFuY2VJZF1cbiAgbGV0IHJlc3VsdHMgPSBbXVxuICBpZiAoaW5zdGFuY2UgJiYgQXJyYXkuaXNBcnJheSh0YXNrcykpIHtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGVyID0ganNIYW5kbGVyc1t0YXNrLm1ldGhvZF1cbiAgICAgIGNvbnN0IGFyZ3MgPSBbLi4udGFzay5hcmdzXVxuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChpbnN0YW5jZUlkKVxuICAgICAgICByZXN1bHRzLnB1c2goaGFuZGxlciguLi5hcmdzKSlcbiAgICAgIH1cbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIHJlc3VsdHMucHVzaChuZXcgRXJyb3IoYGludmFsaWQgaW5zdGFuY2UgaWQgXCIke2luc3RhbmNlSWR9XCIgb3IgdGFza3NgKSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9mcmFtZXdvcmsuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgbmF0aXZlQ29tcG9uZW50TWFwID0ge1xuICB0ZXh0OiB0cnVlLFxuICBpbWFnZTogdHJ1ZSxcbiAgY29udGFpbmVyOiB0cnVlLFxuICBzbGlkZXI6IHtcbiAgICB0eXBlOiAnc2xpZGVyJyxcbiAgICBhcHBlbmQ6ICd0cmVlJ1xuICB9LFxuICBjZWxsOiB7XG4gICAgdHlwZTogJ2NlbGwnLFxuICAgIGFwcGVuZDogJ3RyZWUnXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG5cbmV4cG9ydCB2YXIgZGVidWcgPSBmYWxzZVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9jb25maWcuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIFdlZXggaW5zdGFuY2UgY29uc3RydWN0b3IgJiBkZWZpbml0aW9uXG4gKi9cblxuaW1wb3J0IHt0eXBvZiwgZXh0ZW5kfSBmcm9tICcuLi91dGlsJ1xuaW1wb3J0ICogYXMgYnVuZGxlIGZyb20gJy4vYnVuZGxlJ1xuaW1wb3J0ICogYXMgY3RybCBmcm9tICcuL2N0cmwnXG5pbXBvcnQgRGlmZmVyIGZyb20gJy4vZGlmZmVyJ1xuXG5pbXBvcnQgRXZlbnRNYW5hZ2VyIGZyb20gJy4vZXZlbnQnXG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9kb20tbGlzdGVuZXInXG5pbXBvcnQge0RvY3VtZW50LCBOb2RlfSBmcm9tICcuL2RvbSdcbmltcG9ydCB7cmVnaXN0ZXJDb21wb25lbnQsIHJlcXVpcmVDb21wb25lbnQsIHJlcXVpcmVNb2R1bGV9IGZyb20gJy4vcmVnaXN0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcEluc3RhbmNlKGluc3RhbmNlSWQsIG9wdGlvbnMpIHtcbiAgdGhpcy5pZCA9IGluc3RhbmNlSWRcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLnZtID0gbnVsbFxuICB0aGlzLmRvYyA9IG5ldyBEb2N1bWVudChpbnN0YW5jZUlkLCB0aGlzLm9wdGlvbnMuYnVuZGxlVXJsKVxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IHt9XG4gIHRoaXMuY2FsbGJhY2tzID0ge31cbiAgdGhpcy5kaWZmZXIgPSBuZXcgRGlmZmVyKGluc3RhbmNlSWQpXG4gIHRoaXMudWlkID0gMFxuICB0aGlzLnJlbmRlcmVkID0gZmFsc2VcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBuZXcgRXZlbnRNYW5hZ2VyKClcbiAgdGhpcy5saXN0ZW5lciA9IG5ldyBMaXN0ZW5lcih0aGlzLmlkLCAodGFza3MpID0+IHtcbiAgICB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfSlcbiAgdGhpcy5kb2Muc2V0RXZlbnRNYW5hZ2VyKHRoaXMuZXZlbnRNYW5hZ2VyKVxuICB0aGlzLmRvYy5zZXRMaXN0ZW5lcih0aGlzLmxpc3RlbmVyKVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoYXBwLCB2KSB7XG4gIHZhciB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgJ251bGwnOlxuICAgICAgcmV0dXJuICcnXG4gICAgY2FzZSAncmVnZXhwJzpcbiAgICAgIHJldHVybiB2LnRvU3RyaW5nKClcbiAgICBjYXNlICdkYXRlJzpcbiAgICAgIHJldHVybiB2LnRvSVNPU3RyaW5nKClcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgY2FzZSAnYXJyYXknOlxuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAodiBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICAgICAgcmV0dXJuIHYucmVmXG4gICAgICB9XG4gICAgICByZXR1cm4gdlxuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIGFwcC5jYWxsYmFja3NbKythcHAudWlkXSA9IHZcbiAgICAgIHJldHVybiBhcHAudWlkLnRvU3RyaW5nKClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpXG4gIH1cbn1cblxuQXBwSW5zdGFuY2UucHJvdG90eXBlLmNhbGxUYXNrcyA9IGZ1bmN0aW9uICh0YXNrcykge1xuICBpZiAodHlwb2YodGFza3MpICE9PSAnYXJyYXknKSB7XG4gICAgdGFza3MgPSBbdGFza3NdXG4gIH1cblxuICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgdGFzay5hcmdzID0gdGFzay5hcmdzLm1hcChhcmcgPT4gbm9ybWFsaXplKHRoaXMsIGFyZykpXG4gIH0pXG5cbiAgY2FsbE5hdGl2ZSh0aGlzLmlkLCB0YXNrcywgJy0xJylcbn1cblxuZXh0ZW5kKEFwcEluc3RhbmNlLnByb3RvdHlwZSwgYnVuZGxlLCBjdHJsLCB7XG4gIHJlZ2lzdGVyQ29tcG9uZW50LFxuICByZXF1aXJlQ29tcG9uZW50LFxuICByZXF1aXJlTW9kdWxlXG59KVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2luZGV4LmpzXG4gKiovIiwiLy8vIGxhbmcuanNcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vY29uZmlnJ1xuXG4vKipcbiAqIENoZWNrIGlzIGEgc3RyaW5nIHN0YXJ0cyB3aXRoICQgb3IgX1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cblxuZXhwb3J0IHZhciBpc1Jlc2VydmVkID0gKHN0cikgPT4ge1xuICBzdHIgKz0gJydcbiAgbGV0IGMgPSAoc3RyICsgJycpLmNoYXJDb2RlQXQoMClcbiAgcmV0dXJuIGMgPT09IDB4MjQgfHwgYyA9PT0gMHg1RlxufVxuXG4vKipcbiAqIENhbWVsaXplIGEgaHlwaGVuLWRlbG1pdGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cblxubGV0IGNhbWVsUkUgPSAvLShcXHcpL2dcbmZ1bmN0aW9uIHRvVXBwZXIgKF8sIGMpIHtcbiAgcmV0dXJuIGMgPyBjLnRvVXBwZXJDYXNlICgpIDogJydcbn1cbmV4cG9ydCB2YXIgY2FtZWxpemUgPSAoc3RyKSA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbFJFLCB0b1VwcGVyKVxufVxuXG4vKipcbiAqIFNpbXBsZSBiaW5kLCBmYXN0ZXIgdGhhbiBuYXRpdmVcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGN0eFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cblxuZXhwb3J0IHZhciBiaW5kID0gZnVuY3Rpb24gKGZuLCBjdHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgbGV0IGwgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbn1cblxuLyoqXG4gKiBDb252ZXJ0IGFuIEFycmF5LWxpa2Ugb2JqZWN0IHRvIGEgcmVhbCBBcnJheS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5LWxpa2V9IGxpc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc3RhcnRdIC0gc3RhcnQgaW5kZXhcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5cbmV4cG9ydCB2YXIgdG9BcnJheSA9IChsaXN0LCBzdGFydCkgPT4ge1xuICBzdGFydCA9IHN0YXJ0IHx8IDBcbiAgbGV0IGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0XG4gIGxldCByZXQgPSBuZXcgQXJyYXkoaSlcbiAgd2hpbGUgKGktLSkge1xuICAgIHJldFtpXSA9IGxpc3RbaSArIHN0YXJ0XVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRvXG4gKiBAcGFyYW0ge09iamVjdH0gZnJvbVxuICovXG5cbmV4cG9ydCB2YXIgZXh0ZW5kID0gKHRhcmdldCwgLi4uc3JjKSA9PiB7XG4gIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zcmMpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZmlyc3QgPSBzcmMuc2hpZnQoKVxuICAgIGZvciAoY29uc3Qga2V5IGluIGZpcnN0KSB7XG4gICAgICB0YXJnZXRba2V5XSA9IGZpcnN0W2tleV1cbiAgICB9XG4gICAgaWYgKHNyYy5sZW5ndGgpIHtcbiAgICAgIGV4dGVuZCh0YXJnZXQsIC4uLnNyYylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmV4cG9ydCB2YXIgaXNPYmplY3QgPSAob2JqKSA9PiB7XG4gIHJldHVybiAhIShvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpXG59XG5cbi8qKlxuICogU3RyaWN0IG9iamVjdCB0eXBlIGNoZWNrLiBPbmx5IHJldHVybnMgdHJ1ZVxuICogZm9yIHBsYWluIEphdmFTY3JpcHQgb2JqZWN0cy5cbiAqXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5sZXQgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5leHBvcnQgdmFyIGlzUGxhaW5PYmplY3QgPSAob2JqKSA9PiB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5cbi8qKlxuICogQXJyYXkgdHlwZSBjaGVjay5cbiAqXG4gKiBAcGFyYW0geyp9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5leHBvcnQgdmFyIGlzQXJyYXkgPSAob2JqKSA9PiB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG9iailcbn1cblxuZXhwb3J0IHZhciBzdHJpbmdpZnkgPSAoeCkgPT4ge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICd1bmRlZmluZWQnIHx8IHggPT09IG51bGwgfHwgdHlwZW9mKHgpID09PSAnZnVuY3Rpb24nXG4gICAgPyAnJ1xuICAgIDogdHlwZW9mIHggPT09ICdvYmplY3QnXG4gICAgICA/IHggaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICAgPyB4LnRvU3RyaW5nKClcbiAgICAgICAgOiB4IGluc3RhbmNlb2YgRGF0ZVxuICAgICAgICAgID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh4KSlcbiAgICAgICAgICA6IEpTT04uc3RyaW5naWZ5KHgpXG4gICAgICA6IHgudG9TdHJpbmcoKVxufVxuXG5leHBvcnQgdmFyIHR5cG9mID0gKHYpID0+IHtcbiAgbGV0IHMgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodilcbiAgcmV0dXJuIHMuc3Vic3RyaW5nKDgsIHMubGVuZ3RoIC0gMSkudG9Mb3dlckNhc2UoKVxufVxuXG5leHBvcnQgdmFyIG5vcm1hbGl6ZSA9ICh2KSA9PiB7XG4gIGxldCB0eXBlID0gdHlwb2YodilcblxuICBzd2l0Y2godHlwZSkge1xuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgICByZXR1cm4gJydcbiAgICBjYXNlICdyZWdleHAnOlxuICAgICAgcmV0dXJuIHYudG9TdHJpbmcoKVxuICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgcmV0dXJuIHYudG9JU09TdHJpbmcoKVxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICBjYXNlICdhcnJheSc6XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICByZXR1cm4gdlxuICB9XG59XG5cbi8qKlxuICogRGVmaW5lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBbZW51bWVyYWJsZV1cbiAqL1xuXG5leHBvcnQgdmFyIGRlZmluZSA9IChvYmosIGtleSwgdmFsLCBlbnVtZXJhYmxlKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgIHZhbHVlOiB2YWwsXG4gICAgZW51bWVyYWJsZTogISFlbnVtZXJhYmxlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vKipcbiAqIE1hbnVhbCBpbmRleE9mIGJlY2F1c2UgaXQncyBzbGlnaHRseSBmYXN0ZXIgdGhhblxuICogbmF0aXZlLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyclxuICogQHBhcmFtIHsqfSBvYmpcbiAqL1xuXG5leHBvcnQgdmFyIGluZGV4T2YgPSAoYXJyLCBvYmopID0+IHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaVxuICB9XG4gIHJldHVybiAtMVxufVxuXG5jb25zdCBlbmFibGVMb2cgPSB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgJiYgZ2xvYmFsLklTX1BST0RVQ1QgIT09IHRydWVcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCB2YXIgZXJyb3IgPSAoLi4uYXJncykgPT4ge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5lcnJvciAmJiBjb25zb2xlLmVycm9yKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gbXNnXG4gKi9cbmV4cG9ydCB2YXIgd2FybiA9ICguLi5hcmdzKSA9PiB7XG4gIGVuYWJsZUxvZyAmJiBjb25zb2xlLndhcm4gJiYgY29uc29sZS53YXJuKCdbSlMgRnJhbWV3b3JrXScsIC4uLmFyZ3MpXG59XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgdmFyIGluZm8gPSAoLi4uYXJncykgPT4ge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5pbmZvICYmIGNvbnNvbGUuaW5mbygnW0pTIEZyYW1ld29ya10nLCAuLi5hcmdzKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IHZhciBkZWJ1ZyA9ICguLi5hcmdzKSA9PiB7XG4gIGVuYWJsZUxvZyAmJiBjb25zb2xlLmRlYnVnICYmIGNvbnNvbGUuZGVidWcoJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IHZhciBsb2cgPSAoLi4uYXJncykgPT4ge1xuICBlbmFibGVMb2cgJiYgY29uc29sZS5sb2cgJiYgY29uc29sZS5sb2coJ1tKUyBGcmFtZXdvcmtdJywgLi4uYXJncylcbn1cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi91dGlsL2luZGV4LmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBhcGkgdGhhdCBpbnZva2VkIGJ5IGpzIGJ1bmRsZSBjb2RlXG4gKlxuICogLSBkZWZpbmUobmFtZSwgZmFjdG9yeSk6IGRlZmluZSBhIG5ldyBjb21wb3NlZCBjb21wb25lbnQgdHlwZVxuICogLSBib290c3RyYXAodHlwZSwgY29uZmlnLCBkYXRhKTogcmVxdWlyZSBhIGNlcnRhaW4gdHlwZSAmXG4gKiAgICAgICAgIHJlbmRlciB3aXRoIChvcHRpb25hbCkgZGF0YVxuICpcbiAqIGRlcHJlY2F0ZWQ6XG4gKiAtIHJlZ2lzdGVyKHR5cGUsIG9wdGlvbnMpOiByZWdpc3RlciBhIG5ldyBjb21wb3NlZCBjb21wb25lbnQgdHlwZVxuICogLSByZW5kZXIodHlwZSwgZGF0YSk6IHJlbmRlciBieSBhIGNlcnRhaW4gdHlwZSB3aXRoIChvcHRpb25hbCkgZGF0YVxuICogLSByZXF1aXJlKHR5cGUpKGRhdGEpOiByZXF1aXJlIGEgdHlwZSB0aGVuIHJlbmRlciB3aXRoIGRhdGFcbiAqL1xuXG5pbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIGNvbmZpZyBmcm9tICcuLi9jb25maWcnXG5pbXBvcnQgVm0gZnJvbSAnLi4vdm0nXG5pbXBvcnQgKiBhcyBkb3duZ3JhZGUgZnJvbSAnLi9kb3duZ3JhZGUnXG5cbmNvbnN0IFdFRVhfQ09NUE9ORU5UX1JFRyA9IC9eXFxAd2VleC1jb21wb25lbnRcXC8vXG5jb25zdCBXRUVYX01PRFVMRV9SRUcgPSAvXlxcQHdlZXgtbW9kdWxlXFwvL1xuY29uc3QgTk9STUFMX01PRFVMRV9SRUcgPSAvXlxcLnsxLDJ9XFwvL1xuY29uc3QgSlNfU1VSRklYX1JFRyA9IC9cXC5qcyQvXG5cbmNvbnN0IGlzV2VleENvbXBvbmVudCA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfQ09NUE9ORU5UX1JFRylcbmNvbnN0IGlzV2VleE1vZHVsZSA9IG5hbWUgPT4gISFuYW1lLm1hdGNoKFdFRVhfTU9EVUxFX1JFRylcbmNvbnN0IGlzTm9ybWFsTW9kdWxlID0gbmFtZSA9PiAhIW5hbWUubWF0Y2goTk9STUFMX01PRFVMRV9SRUcpXG5jb25zdCBpc05wbU1vZHVsZSA9IG5hbWUgPT4gIWlzV2VleENvbXBvbmVudChuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzV2VleE1vZHVsZShuYW1lKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIWlzTm9ybWFsTW9kdWxlKG5hbWUpXG5cbmZ1bmN0aW9uIHJlbW92ZVdlZXhQcmVmaXgoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShXRUVYX0NPTVBPTkVOVF9SRUcsICcnKVxuICAgICAgICAgIC5yZXBsYWNlKFdFRVhfTU9EVUxFX1JFRywgJycpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUpTU3VyZml4KHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoSlNfU1VSRklYX1JFRywgJycpXG59XG5cbmxldCBjb21tb25Nb2R1bGVzID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ29tbW9uTW9kdWxlcygpIHtcbiAgY29tbW9uTW9kdWxlcyA9IHt9XG59XG5cbi8vIGRlZmluZShuYW1lLCBmYWN0b3J5KSBmb3IgcHJpbWFyeSB1c2FnZVxuLy8gb3Jcbi8vIGRlZmluZShuYW1lLCBkZXBzLCBmYWN0b3J5KSBmb3IgY29tcGF0aWJpbGl0eVxuLy8gTm90aWNlOiBETyBOT1QgdXNlIGZ1bmN0aW9uIGRlZmluZSgpIHt9LFxuLy8gaXQgd2lsbCBjYXVzZSBlcnJvciBhZnRlciBidWlsZGVkIGJ5IHdlYnBhY2tcbmV4cG9ydCB2YXIgZGVmaW5lID0gZnVuY3Rpb24gKG5hbWUsIGRlcHMsIGZhY3RvcnkpIHtcbiAgXy5kZWJ1ZygnZGVmaW5lIGEgY29tcG9uZW50JywgbmFtZSlcblxuICBpZiAoXy50eXBvZihkZXBzKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZhY3RvcnkgPSBkZXBzXG4gICAgZGVwcyA9IFtdXG4gIH1cblxuICBsZXQgX3JlcXVpcmUgPSAobmFtZSkgPT4ge1xuICAgIGxldCBjbGVhbk5hbWVcblxuICAgIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICAgIGNsZWFuTmFtZSA9IHJlbW92ZVdlZXhQcmVmaXgobmFtZSlcbiAgICAgIHJldHVybiB0aGlzLnJlcXVpcmVDb21wb25lbnQoY2xlYW5OYW1lKVxuICAgIH1cbiAgICBpZiAoaXNXZWV4TW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gICAgICByZXR1cm4gdGhpcy5yZXF1aXJlTW9kdWxlKGNsZWFuTmFtZSlcbiAgICB9XG4gICAgaWYgKGlzTm9ybWFsTW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZXNbbmFtZV1cbiAgICB9XG4gICAgaWYgKGlzTnBtTW9kdWxlKG5hbWUpKSB7XG4gICAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgICAgcmV0dXJuIGNvbW1vbk1vZHVsZXNbbmFtZV1cbiAgICB9XG4gIH1cbiAgbGV0IF9tb2R1bGUgPSB7ZXhwb3J0czoge319XG5cbiAgbGV0IGNsZWFuTmFtZVxuICBpZiAoaXNXZWV4Q29tcG9uZW50KG5hbWUpKSB7XG4gICAgY2xlYW5OYW1lID0gcmVtb3ZlV2VleFByZWZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgdGhpcy5yZWdpc3RlckNvbXBvbmVudChjbGVhbk5hbWUsIF9tb2R1bGUuZXhwb3J0cylcbiAgfSBlbHNlIGlmIChpc1dlZXhNb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG5cbiAgICBmYWN0b3J5KF9yZXF1aXJlLCBfbW9kdWxlLmV4cG9ydHMsIF9tb2R1bGUpXG5cbiAgICBWbS5yZWdpc3Rlck1vZHVsZXMoe1xuICAgICAgW2NsZWFuTmFtZV06IF9tb2R1bGUuZXhwb3J0c1xuICAgIH0pXG4gIH0gZWxzZSBpZiAoaXNOb3JtYWxNb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgY29tbW9uTW9kdWxlc1tjbGVhbk5hbWVdID0gX21vZHVsZS5leHBvcnRzXG4gIH0gZWxzZSBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuXG4gICAgZmFjdG9yeShfcmVxdWlyZSwgX21vZHVsZS5leHBvcnRzLCBfbW9kdWxlKVxuXG4gICAgbGV0IGV4cG9ydHMgPSBfbW9kdWxlLmV4cG9ydHNcbiAgICBpZiAoZXhwb3J0cy50ZW1wbGF0ZSB8fFxuICAgICAgICBleHBvcnRzLnN0eWxlIHx8XG4gICAgICAgIGV4cG9ydHMubWV0aG9kcykge1xuICAgICAgLy8gZG93bmdyYWRlIHRvIG9sZCBkZWZpbmUgbWV0aG9kIChkZWZpbmUoJ2NvbXBvbmVudE5hbWUnLCBmYWN0b3J5KSlcbiAgICAgIC8vIHRoZSBleHBvcnRzIGNvbnRhaW4gb25lIGtleSBvZiB0ZW1wbGF0ZSwgc3R5bGUgb3IgbWV0aG9kc1xuICAgICAgLy8gYnV0IGl0IGhhcyByaXNrISEhXG4gICAgICB0aGlzLnJlZ2lzdGVyQ29tcG9uZW50KGNsZWFuTmFtZSwgZXhwb3J0cylcbiAgICB9IGVsc2Uge1xuICAgICAgY29tbW9uTW9kdWxlc1tjbGVhbk5hbWVdID0gX21vZHVsZS5leHBvcnRzXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXAobmFtZSwgY29uZmlnLCBkYXRhKSB7XG4gIF8uZGVidWcoYGJvb3RzdHJhcCBmb3IgJHtuYW1lfWApXG5cbiAgbGV0IGNsZWFuTmFtZVxuXG4gIGlmIChpc1dlZXhDb21wb25lbnQobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVXZWV4UHJlZml4KG5hbWUpXG4gIH0gZWxzZSBpZiAoaXNOcG1Nb2R1bGUobmFtZSkpIHtcbiAgICBjbGVhbk5hbWUgPSByZW1vdmVKU1N1cmZpeChuYW1lKVxuICAgIC8vIGNoZWNrIGlmIGRlZmluZSBieSBvbGQgJ2RlZmluZScgbWV0aG9kXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmN1c3RvbUNvbXBvbmVudE1hcFtjbGVhbk5hbWVdKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGBJdCdzIG5vdCBhIGNvbXBvbmVudDogJHtuYW1lfWApXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYFdyb25nIGNvbXBvbmVudCBuYW1lOiAke25hbWV9YClcbiAgfVxuXG4gIGNvbmZpZyA9IF8uaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cblxuICBpZiAodHlwZW9mIGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24gPT09ICdzdHJpbmcnICYmXG4gICAgdHlwZW9mIGdsb2JhbC5uZWVkVHJhbnNmb3JtZXJWZXJzaW9uID09PSAnc3RyaW5nJyAmJlxuICAgICFzZW12ZXIuc2F0aXNmaWVzKGNvbmZpZy50cmFuc2Zvcm1lclZlcnNpb24sXG4gICAgICBnbG9iYWwubmVlZFRyYW5zZm9ybWVyVmVyc2lvbikpIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBKUyBCdW5kbGUgdmVyc2lvbjogJHtjb25maWcudHJhbnNmb3JtZXJWZXJzaW9ufSBgICtcbiAgICAgIGBub3QgY29tcGF0aWJsZSB3aXRoICR7Z2xvYmFsLm5lZWRUcmFuc2Zvcm1lclZlcnNpb259YClcbiAgfVxuXG4gIGxldCBfY2hlY2tEb3duZ3JhZGUgPSBkb3duZ3JhZGUuY2hlY2soY29uZmlnLmRvd25ncmFkZSlcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChfY2hlY2tEb3duZ3JhZGUuaXNEb3duZ3JhZGUpIHtcbiAgICB0aGlzLmNhbGxUYXNrcyhbe1xuICAgICAgbW9kdWxlOiAnaW5zdGFuY2VXcmFwJyxcbiAgICAgIG1ldGhvZDogJ2Vycm9yJyxcbiAgICAgIGFyZ3M6IFtcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmVycm9yVHlwZSxcbiAgICAgICAgX2NoZWNrRG93bmdyYWRlLmNvZGUsXG4gICAgICAgIF9jaGVja0Rvd25ncmFkZS5lcnJvck1lc3NhZ2VcbiAgICAgIF1cbiAgICB9XSlcbiAgICByZXR1cm4gbmV3IEVycm9yKGBEb3duZ3JhZGU6ICR7Y29uZmlnLmRvd25ncmFkZX1gKVxuICB9XG5cbiAgdGhpcy52bSA9IG5ldyBWbShjbGVhbk5hbWUsIHtfYXBwOiB0aGlzfSwgbnVsbCwgZGF0YSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIodHlwZSwgb3B0aW9ucykge1xuICBfLndhcm4oJ1JlZ2lzdGVyIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSBpbnN0YWxsIGxhc3Rlc3QgdHJhbnNmb3JtZXIuJylcbiAgdGhpcy5yZWdpc3RlckNvbXBvbmVudCh0eXBlLCBvcHRpb25zKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodHlwZSwgZGF0YSkge1xuICBfLndhcm4oJ1JlbmRlciBpcyBkZXByZWNhdGVkLCBwbGVhc2UgaW5zdGFsbCBsYXN0ZXN0IHRyYW5zZm9ybWVyLicpXG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcCh0eXBlLCB7fSwgZGF0YSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZSh0eXBlKSB7XG4gIF8ud2FybignUmVxdWlyZSBpcyBkZXByZWNhdGVkLCBwbGVhc2UgaW5zdGFsbCBsYXN0ZXN0IHRyYW5zZm9ybWVyLicpXG4gIHJldHVybiAoZGF0YSkgPT4ge1xuICAgIHJldHVybiB0aGlzLmJvb3RzdHJhcCh0eXBlLCB7fSwgZGF0YSlcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2J1bmRsZS5qc1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFNlbVZlcjtcblxuLy8gVGhlIGRlYnVnIGZ1bmN0aW9uIGlzIGV4Y2x1ZGVkIGVudGlyZWx5IGZyb20gdGhlIG1pbmlmaWVkIHZlcnNpb24uXG4vKiBub21pbiAqLyB2YXIgZGVidWc7XG4vKiBub21pbiAqLyBpZiAodHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmXG4gICAgLyogbm9taW4gKi8gcHJvY2Vzcy5lbnYgJiZcbiAgICAvKiBub21pbiAqLyBwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmXG4gICAgLyogbm9taW4gKi8gL1xcYnNlbXZlclxcYi9pLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpXG4gIC8qIG5vbWluICovIGRlYnVnID0gZnVuY3Rpb24oKSB7XG4gICAgLyogbm9taW4gKi8gdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgIC8qIG5vbWluICovIGFyZ3MudW5zaGlmdCgnU0VNVkVSJyk7XG4gICAgLyogbm9taW4gKi8gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgLyogbm9taW4gKi8gfTtcbi8qIG5vbWluICovIGVsc2VcbiAgLyogbm9taW4gKi8gZGVidWcgPSBmdW5jdGlvbigpIHt9O1xuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnO1xuXG52YXIgTUFYX0xFTkdUSCA9IDI1NjtcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHwgOTAwNzE5OTI1NDc0MDk5MTtcblxuLy8gVGhlIGFjdHVhbCByZWdleHBzIGdvIG9uIGV4cG9ydHMucmVcbnZhciByZSA9IGV4cG9ydHMucmUgPSBbXTtcbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdO1xudmFyIFIgPSAwO1xuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG52YXIgTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJdID0gJzB8WzEtOV1cXFxcZConO1xudmFyIE5VTUVSSUNJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gPSAnWzAtOV0rJztcblxuXG4vLyAjIyBOb24tbnVtZXJpYyBJZGVudGlmaWVyXG4vLyBaZXJvIG9yIG1vcmUgZGlnaXRzLCBmb2xsb3dlZCBieSBhIGxldHRlciBvciBoeXBoZW4sIGFuZCB0aGVuIHplcm8gb3Jcbi8vIG1vcmUgbGV0dGVycywgZGlnaXRzLCBvciBoeXBoZW5zLlxuXG52YXIgTk9OTlVNRVJJQ0lERU5USUZJRVIgPSBSKys7XG5zcmNbTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonO1xuXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG52YXIgTUFJTlZFUlNJT04gPSBSKys7XG5zcmNbTUFJTlZFUlNJT05dID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBNQUlOVkVSU0lPTkxPT1NFID0gUisrO1xuc3JjW01BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW05VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknO1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUiA9IFIrKztcbnNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1tOVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1tOT05OVU1FUklDSURFTlRJRklFUl0gKyAnKSc7XG5cbnZhciBQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdID0gJyg/OicgKyBzcmNbTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW05PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJztcblxuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnZhciBQUkVSRUxFQVNFID0gUisrO1xuc3JjW1BSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUl0gKyAnKSopKSc7XG5cbnZhciBQUkVSRUxFQVNFTE9PU0UgPSBSKys7XG5zcmNbUFJFUkVMRUFTRUxPT1NFXSA9ICcoPzotPygnICsgc3JjW1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1tQUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJztcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGEgSWRlbnRpZmllclxuLy8gQW55IGNvbWJpbmF0aW9uIG9mIGRpZ2l0cywgbGV0dGVycywgb3IgaHlwaGVucy5cblxudmFyIEJVSUxESURFTlRJRklFUiA9IFIrKztcbnNyY1tCVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnO1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YVxuLy8gUGx1cyBzaWduLCBmb2xsb3dlZCBieSBvbmUgb3IgbW9yZSBwZXJpb2Qtc2VwYXJhdGVkIGJ1aWxkIG1ldGFkYXRhXG4vLyBpZGVudGlmaWVycy5cblxudmFyIEJVSUxEID0gUisrO1xuc3JjW0JVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW0JVSUxESURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbQlVJTERJREVOVElGSUVSXSArICcpKikpJztcblxuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudmFyIEZVTEwgPSBSKys7XG52YXIgRlVMTFBMQUlOID0gJ3Y/JyArIHNyY1tNQUlOVkVSU0lPTl0gK1xuICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/Jztcblxuc3JjW0ZVTExdID0gJ14nICsgRlVMTFBMQUlOICsgJyQnO1xuXG4vLyBsaWtlIGZ1bGwsIGJ1dCBhbGxvd3MgdjEuMi4zIGFuZCA9MS4yLjMsIHdoaWNoIHBlb3BsZSBkbyBzb21ldGltZXMuXG4vLyBhbHNvLCAxLjAuMGFscGhhMSAocHJlcmVsZWFzZSB3aXRob3V0IHRoZSBoeXBoZW4pIHdoaWNoIGlzIHByZXR0eVxuLy8gY29tbW9uIGluIHRoZSBucG0gcmVnaXN0cnkuXG52YXIgTE9PU0VQTEFJTiA9ICdbdj1cXFxcc10qJyArIHNyY1tNQUlOVkVSU0lPTkxPT1NFXSArXG4gICAgICAgICAgICAgICAgIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgc3JjW0JVSUxEXSArICc/JztcblxudmFyIExPT1NFID0gUisrO1xuc3JjW0xPT1NFXSA9ICdeJyArIExPT1NFUExBSU4gKyAnJCc7XG5cbnZhciBHVExUID0gUisrO1xuc3JjW0dUTFRdID0gJygoPzo8fD4pPz0/KSc7XG5cbi8vIFNvbWV0aGluZyBsaWtlIFwiMi4qXCIgb3IgXCIxLjIueFwiLlxuLy8gTm90ZSB0aGF0IFwieC54XCIgaXMgYSB2YWxpZCB4UmFuZ2UgaWRlbnRpZmVyLCBtZWFuaW5nIFwiYW55IHZlcnNpb25cIlxuLy8gT25seSB0aGUgZmlyc3QgaXRlbSBpcyBzdHJpY3RseSByZXF1aXJlZC5cbnZhciBYUkFOR0VJREVOVElGSUVSTE9PU0UgPSBSKys7XG5zcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1tOVU1FUklDSURFTlRJRklFUkxPT1NFXSArICd8eHxYfFxcXFwqJztcbnZhciBYUkFOR0VJREVOVElGSUVSID0gUisrO1xuc3JjW1hSQU5HRUlERU5USUZJRVJdID0gc3JjW05VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJztcblxudmFyIFhSQU5HRVBMQUlOID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1tYUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAnKT8pPyc7XG5cbnZhciBYUkFOR0VQTEFJTkxPT1NFID0gUisrO1xuc3JjW1hSQU5HRVBMQUlOTE9PU0VdID0gJ1t2PVxcXFxzXSooJyArIHNyY1tYUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW1hSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86JyArIHNyY1tQUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/JztcblxudmFyIFhSQU5HRSA9IFIrKztcbnNyY1tYUkFOR0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKicgKyBzcmNbWFJBTkdFUExBSU5dICsgJyQnO1xudmFyIFhSQU5HRUxPT1NFID0gUisrO1xuc3JjW1hSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyonICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudmFyIExPTkVUSUxERSA9IFIrKztcbnNyY1tMT05FVElMREVdID0gJyg/On4+PyknO1xuXG52YXIgVElMREVUUklNID0gUisrO1xuc3JjW1RJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0xPTkVUSUxERV0gKyAnXFxcXHMrJztcbnJlW1RJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1tUSUxERVRSSU1dLCAnZycpO1xudmFyIHRpbGRlVHJpbVJlcGxhY2UgPSAnJDF+JztcblxudmFyIFRJTERFID0gUisrO1xuc3JjW1RJTERFXSA9ICdeJyArIHNyY1tMT05FVElMREVdICsgc3JjW1hSQU5HRVBMQUlOXSArICckJztcbnZhciBUSUxERUxPT1NFID0gUisrO1xuc3JjW1RJTERFTE9PU0VdID0gJ14nICsgc3JjW0xPTkVUSUxERV0gKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnJCc7XG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG52YXIgTE9ORUNBUkVUID0gUisrO1xuc3JjW0xPTkVDQVJFVF0gPSAnKD86XFxcXF4pJztcblxudmFyIENBUkVUVFJJTSA9IFIrKztcbnNyY1tDQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1tMT05FQ0FSRVRdICsgJ1xcXFxzKyc7XG5yZVtDQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ0FSRVRUUklNXSwgJ2cnKTtcbnZhciBjYXJldFRyaW1SZXBsYWNlID0gJyQxXic7XG5cbnZhciBDQVJFVCA9IFIrKztcbnNyY1tDQVJFVF0gPSAnXicgKyBzcmNbTE9ORUNBUkVUXSArIHNyY1tYUkFOR0VQTEFJTl0gKyAnJCc7XG52YXIgQ0FSRVRMT09TRSA9IFIrKztcbnNyY1tDQVJFVExPT1NFXSA9ICdeJyArIHNyY1tMT05FQ0FSRVRdICsgc3JjW1hSQU5HRVBMQUlOTE9PU0VdICsgJyQnO1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudmFyIENPTVBBUkFUT1JMT09TRSA9IFIrKztcbnNyY1tDT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW0dUTFRdICsgJ1xcXFxzKignICsgTE9PU0VQTEFJTiArICcpJHxeJCc7XG52YXIgQ09NUEFSQVRPUiA9IFIrKztcbnNyY1tDT01QQVJBVE9SXSA9ICdeJyArIHNyY1tHVExUXSArICdcXFxccyooJyArIEZVTExQTEFJTiArICcpJHxeJCc7XG5cblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnZhciBDT01QQVJBVE9SVFJJTSA9IFIrKztcbnNyY1tDT01QQVJBVE9SVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW0dUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBMT09TRVBMQUlOICsgJ3wnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJztcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbQ09NUEFSQVRPUlRSSU1dID0gbmV3IFJlZ0V4cChzcmNbQ09NUEFSQVRPUlRSSU1dLCAnZycpO1xudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnO1xuXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG52YXIgSFlQSEVOUkFOR0UgPSBSKys7XG5zcmNbSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1tYUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW1hSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKiQnO1xuXG52YXIgSFlQSEVOUkFOR0VMT09TRSA9IFIrKztcbnNyY1tIWVBIRU5SQU5HRUxPT1NFXSA9ICdeXFxcXHMqKCcgKyBzcmNbWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1tYUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCc7XG5cbi8vIFN0YXIgcmFuZ2VzIGJhc2ljYWxseSBqdXN0IGFsbG93IGFueXRoaW5nIGF0IGFsbC5cbnZhciBTVEFSID0gUisrO1xuc3JjW1NUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConO1xuXG4vLyBDb21waWxlIHRvIGFjdHVhbCByZWdleHAgb2JqZWN0cy5cbi8vIEFsbCBhcmUgZmxhZy1mcmVlLCB1bmxlc3MgdGhleSB3ZXJlIGNyZWF0ZWQgYWJvdmUgd2l0aCBhIGZsYWcuXG5mb3IgKHZhciBpID0gMDsgaSA8IFI7IGkrKykge1xuICBkZWJ1ZyhpLCBzcmNbaV0pO1xuICBpZiAoIXJlW2ldKVxuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pO1xufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5mdW5jdGlvbiBwYXJzZSh2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcilcbiAgICByZXR1cm4gdmVyc2lvbjtcblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIHIgPSBsb29zZSA/IHJlW0xPT1NFXSA6IHJlW0ZVTExdO1xuICBpZiAoIXIudGVzdCh2ZXJzaW9uKSlcbiAgICByZXR1cm4gbnVsbDtcblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnRzLnZhbGlkID0gdmFsaWQ7XG5mdW5jdGlvbiB2YWxpZCh2ZXJzaW9uLCBsb29zZSkge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIGxvb3NlKTtcbiAgcmV0dXJuIHYgPyB2LnZlcnNpb24gOiBudWxsO1xufVxuXG5cbmV4cG9ydHMuY2xlYW4gPSBjbGVhbjtcbmZ1bmN0aW9uIGNsZWFuKHZlcnNpb24sIGxvb3NlKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBsb29zZSk7XG4gIHJldHVybiBzID8gcy52ZXJzaW9uIDogbnVsbDtcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXI7XG5cbmZ1bmN0aW9uIFNlbVZlcih2ZXJzaW9uLCBsb29zZSkge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIGVsc2VcbiAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnZlcnNpb247XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBWZXJzaW9uOiAnICsgdmVyc2lvbik7XG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKTtcblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgbG9vc2UpO1xuICB0aGlzLmxvb3NlID0gbG9vc2U7XG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gobG9vc2UgPyByZVtMT09TRV0gOiByZVtGVUxMXSk7XG5cbiAgaWYgKCFtKVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pO1xuXG4gIHRoaXMucmF3ID0gdmVyc2lvbjtcblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV07XG4gIHRoaXMubWlub3IgPSArbVsyXTtcbiAgdGhpcy5wYXRjaCA9ICttWzNdO1xuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLm1pbm9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1pbm9yIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMClcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHBhdGNoIHZlcnNpb24nKVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pXG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gIGVsc2VcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZDtcbiAgICB9KTtcblxuICB0aGlzLmJ1aWxkID0gbVs1XSA/IG1bNV0uc3BsaXQoJy4nKSA6IFtdO1xuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2g7XG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHRoaXMudmVyc2lvbiArPSAnLScgKyB0aGlzLnByZXJlbGVhc2Uuam9pbignLicpO1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy52ZXJzaW9uO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLmxvb3NlLCBvdGhlcik7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlTWFpbiA9IGZ1bmN0aW9uKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSlcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMubG9vc2UpO1xuXG4gIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnModGhpcy5tYWpvciwgb3RoZXIubWFqb3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5taW5vciwgb3RoZXIubWlub3IpIHx8XG4gICAgICAgICBjb21wYXJlSWRlbnRpZmllcnModGhpcy5wYXRjaCwgb3RoZXIucGF0Y2gpO1xufTtcblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKVxuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5sb29zZSk7XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aClcbiAgICByZXR1cm4gLTE7XG4gIGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKVxuICAgIHJldHVybiAxO1xuICBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpXG4gICAgcmV0dXJuIDA7XG5cbiAgdmFyIGkgPSAwO1xuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLnByZXJlbGVhc2VbaV07XG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldO1xuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKTtcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAwO1xuICAgIGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZClcbiAgICAgIHJldHVybiAtMTtcbiAgICBlbHNlIGlmIChhID09PSBiKVxuICAgICAgY29udGludWU7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKTtcbiAgfSB3aGlsZSAoKytpKTtcbn07XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24ocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vciA9IDA7XG4gICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcik7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAncHJlcGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhbHJlYWR5IGEgcHJlcmVsZWFzZSwgaXQgd2lsbCBidW1wIHRvIHRoZSBuZXh0IHZlcnNpb25cbiAgICAgIC8vIGRyb3AgYW55IHByZXJlbGVhc2VzIHRoYXQgbWlnaHQgYWxyZWFkeSBleGlzdCwgc2luY2UgdGhleSBhcmUgbm90XG4gICAgICAvLyByZWxldmFudCBhdCB0aGlzIHBvaW50LlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDA7XG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKTtcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpO1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHwgdGhpcy5wYXRjaCAhPT0gMCB8fCB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLm1ham9yKys7XG4gICAgICB0aGlzLm1pbm9yID0gMDtcbiAgICAgIHRoaXMucGF0Y2ggPSAwO1xuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW107XG4gICAgICBicmVhaztcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5taW5vcisrO1xuICAgICAgdGhpcy5wYXRjaCA9IDA7XG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3BhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgbm90IGEgcHJlLXJlbGVhc2UgdmVyc2lvbiwgaXQgd2lsbCBpbmNyZW1lbnQgdGhlIHBhdGNoLlxuICAgICAgLy8gSWYgaXQgaXMgYSBwcmUtcmVsZWFzZSBpdCB3aWxsIGJ1bXAgdXAgdG8gdGhlIHNhbWUgcGF0Y2ggdmVyc2lvbi5cbiAgICAgIC8vIDEuMi4wLTUgcGF0Y2hlcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjAgcGF0Y2hlcyB0byAxLjIuMVxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMucGF0Y2grKztcbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdO1xuICAgICAgYnJlYWs7XG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKVxuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF07XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrO1xuICAgICAgICAgICAgaSA9IC0yO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIC8vIGRpZG4ndCBpbmNyZW1lbnQgYW55dGhpbmdcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UucHVzaCgwKTtcbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSlcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpO1xuICB9XG4gIHRoaXMuZm9ybWF0KCk7XG4gIHRoaXMucmF3ID0gdGhpcy52ZXJzaW9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuaW5jID0gaW5jO1xuZnVuY3Rpb24gaW5jKHZlcnNpb24sIHJlbGVhc2UsIGxvb3NlLCBpZGVudGlmaWVyKSB7XG4gIGlmICh0eXBlb2YobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZTtcbiAgICBsb29zZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uO1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbmV4cG9ydHMuZGlmZiA9IGRpZmY7XG5mdW5jdGlvbiBkaWZmKHZlcnNpb24xLCB2ZXJzaW9uMikge1xuICBpZiAoZXEodmVyc2lvbjEsIHZlcnNpb24yKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKTtcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMik7XG4gICAgaWYgKHYxLnByZXJlbGVhc2UubGVuZ3RoIHx8IHYyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgICAgaWYgKHYxW2tleV0gIT09IHYyW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiAncHJlJytrZXk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJ3ByZXJlbGVhc2UnO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnM7XG5cbnZhciBudW1lcmljID0gL15bMC05XSskLztcbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKSB7XG4gIHZhciBhbnVtID0gbnVtZXJpYy50ZXN0KGEpO1xuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKTtcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthO1xuICAgIGIgPSArYjtcbiAgfVxuXG4gIHJldHVybiAoYW51bSAmJiAhYm51bSkgPyAtMSA6XG4gICAgICAgICAoYm51bSAmJiAhYW51bSkgPyAxIDpcbiAgICAgICAgIGEgPCBiID8gLTEgOlxuICAgICAgICAgYSA+IGIgPyAxIDpcbiAgICAgICAgIDA7XG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnM7XG5mdW5jdGlvbiByY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKTtcbn1cblxuZXhwb3J0cy5tYWpvciA9IG1ham9yO1xuZnVuY3Rpb24gbWFqb3IoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1ham9yO1xufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3I7XG5mdW5jdGlvbiBtaW5vcihhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3I7XG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaDtcbmZ1bmN0aW9uIHBhdGNoKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaDtcbn1cblxuZXhwb3J0cy5jb21wYXJlID0gY29tcGFyZTtcbmZ1bmN0aW9uIGNvbXBhcmUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLmNvbXBhcmUoYik7XG59XG5cbmV4cG9ydHMuY29tcGFyZUxvb3NlID0gY29tcGFyZUxvb3NlO1xuZnVuY3Rpb24gY29tcGFyZUxvb3NlKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgdHJ1ZSk7XG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZTtcbmZ1bmN0aW9uIHJjb21wYXJlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKTtcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydDtcbmZ1bmN0aW9uIHNvcnQobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnQ7XG5mdW5jdGlvbiByc29ydChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5yY29tcGFyZShhLCBiLCBsb29zZSk7XG4gIH0pO1xufVxuXG5leHBvcnRzLmd0ID0gZ3Q7XG5mdW5jdGlvbiBndChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwO1xufVxuXG5leHBvcnRzLmx0ID0gbHQ7XG5mdW5jdGlvbiBsdChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwO1xufVxuXG5leHBvcnRzLmVxID0gZXE7XG5mdW5jdGlvbiBlcShhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPT09IDA7XG59XG5cbmV4cG9ydHMubmVxID0gbmVxO1xuZnVuY3Rpb24gbmVxKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMDtcbn1cblxuZXhwb3J0cy5ndGUgPSBndGU7XG5mdW5jdGlvbiBndGUoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDA7XG59XG5cbmV4cG9ydHMubHRlID0gbHRlO1xuZnVuY3Rpb24gbHRlKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8PSAwO1xufVxuXG5leHBvcnRzLmNtcCA9IGNtcDtcbmZ1bmN0aW9uIGNtcChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgdmFyIHJldDtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKSBhID0gYS52ZXJzaW9uO1xuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JykgYiA9IGIudmVyc2lvbjtcbiAgICAgIHJldCA9IGEgPT09IGI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICchPT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JykgYSA9IGEudmVyc2lvbjtcbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpIGIgPSBiLnZlcnNpb247XG4gICAgICByZXQgPSBhICE9PSBiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnJzogY2FzZSAnPSc6IGNhc2UgJz09JzogcmV0ID0gZXEoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBjYXNlICchPSc6IHJldCA9IG5lcShhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz4nOiByZXQgPSBndChhLCBiLCBsb29zZSk7IGJyZWFrO1xuICAgIGNhc2UgJz49JzogcmV0ID0gZ3RlKGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPCc6IHJldCA9IGx0KGEsIGIsIGxvb3NlKTsgYnJlYWs7XG4gICAgY2FzZSAnPD0nOiByZXQgPSBsdGUoYSwgYiwgbG9vc2UpOyBicmVhaztcbiAgICBkZWZhdWx0OiB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG9wZXJhdG9yOiAnICsgb3ApO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3I7XG5mdW5jdGlvbiBDb21wYXJhdG9yKGNvbXAsIGxvb3NlKSB7XG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSBsb29zZSlcbiAgICAgIHJldHVybiBjb21wO1xuICAgIGVsc2VcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlO1xuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKVxuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG5cbiAgZGVidWcoJ2NvbXBhcmF0b3InLCBjb21wLCBsb29zZSk7XG4gIHRoaXMubG9vc2UgPSBsb29zZTtcbiAgdGhpcy5wYXJzZShjb21wKTtcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSlcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gIGVsc2VcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb247XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKTtcbn1cblxudmFyIEFOWSA9IHt9O1xuQ29tcGFyYXRvci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihjb21wKSB7XG4gIHZhciByID0gdGhpcy5sb29zZSA/IHJlW0NPTVBBUkFUT1JMT09TRV0gOiByZVtDT01QQVJBVE9SXTtcbiAgdmFyIG0gPSBjb21wLm1hdGNoKHIpO1xuXG4gIGlmICghbSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKTtcblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXTtcbiAgaWYgKHRoaXMub3BlcmF0b3IgPT09ICc9JylcbiAgICB0aGlzLm9wZXJhdG9yID0gJyc7XG5cbiAgLy8gaWYgaXQgbGl0ZXJhbGx5IGlzIGp1c3QgJz4nIG9yICcnIHRoZW4gYWxsb3cgYW55dGhpbmcuXG4gIGlmICghbVsyXSlcbiAgICB0aGlzLnNlbXZlciA9IEFOWTtcbiAgZWxzZVxuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLmxvb3NlKTtcbn07XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlO1xufTtcblxuQ29tcGFyYXRvci5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMubG9vc2UpO1xuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZKVxuICAgIHJldHVybiB0cnVlO1xuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpXG4gICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5sb29zZSk7XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5sb29zZSk7XG59O1xuXG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZTtcbmZ1bmN0aW9uIFJhbmdlKHJhbmdlLCBsb29zZSkge1xuICBpZiAoKHJhbmdlIGluc3RhbmNlb2YgUmFuZ2UpICYmIHJhbmdlLmxvb3NlID09PSBsb29zZSlcbiAgICByZXR1cm4gcmFuZ2U7XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG5cbiAgdGhpcy5sb29zZSA9IGxvb3NlO1xuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2U7XG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpO1xuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGg7XG4gIH0pO1xuXG4gIGlmICghdGhpcy5zZXQubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBTZW1WZXIgUmFuZ2U6ICcgKyByYW5nZSk7XG4gIH1cblxuICB0aGlzLmZvcm1hdCgpO1xufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24oY29tcHMpIHtcbiAgICByZXR1cm4gY29tcHMuam9pbignICcpLnRyaW0oKTtcbiAgfSkuam9pbignfHwnKS50cmltKCk7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnJhbmdlO1xufTtcblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbihyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLmxvb3NlO1xuICByYW5nZSA9IHJhbmdlLnRyaW0oKTtcbiAgZGVidWcoJ3JhbmdlJywgcmFuZ2UsIGxvb3NlKTtcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbSFlQSEVOUkFOR0VMT09TRV0gOiByZVtIWVBIRU5SQU5HRV07XG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSk7XG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKTtcbiAgLy8gYD4gMS4yLjMgPCAxLjIuNWAgPT4gYD4xLjIuMyA8MS4yLjVgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVtDT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSk7XG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbQ09NUEFSQVRPUlRSSU1dKTtcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW1RJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpO1xuXG4gIC8vIGBeIDEuMi4zYCA9PiBgXjEuMi4zYFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSk7XG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpO1xuXG4gIC8vIEF0IHRoaXMgcG9pbnQsIHRoZSByYW5nZSBpcyBjb21wbGV0ZWx5IHRyaW1tZWQgYW5kXG4gIC8vIHJlYWR5IHRvIGJlIHNwbGl0IGludG8gY29tcGFyYXRvcnMuXG5cbiAgdmFyIGNvbXBSZSA9IGxvb3NlID8gcmVbQ09NUEFSQVRPUkxPT1NFXSA6IHJlW0NPTVBBUkFUT1JdO1xuICB2YXIgc2V0ID0gcmFuZ2Uuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJykuc3BsaXQoL1xccysvKTtcbiAgaWYgKHRoaXMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24oY29tcCkge1xuICAgICAgcmV0dXJuICEhY29tcC5tYXRjaChjb21wUmUpO1xuICAgIH0pO1xuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCBsb29zZSk7XG4gIH0pO1xuXG4gIHJldHVybiBzZXQ7XG59O1xuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzO1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyhyYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpLnNldC5tYXAoZnVuY3Rpb24oY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJyk7XG4gIH0pO1xufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygnY2FyZXQnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgbG9vc2UpO1xuICBkZWJ1ZygndGlsZGVzJywgY29tcCk7XG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKTtcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBsb29zZSk7XG4gIGRlYnVnKCdzdGFycycsIGNvbXApO1xuICByZXR1cm4gY29tcDtcbn1cblxuZnVuY3Rpb24gaXNYKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKic7XG59XG5cbi8vIH4sIH4+IC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gfjIsIH4yLngsIH4yLngueCwgfj4yLCB+PjIueCB+PjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gfjIuMCwgfjIuMC54LCB+PjIuMCwgfj4yLjAueCAtLT4gPj0yLjAuMCA8Mi4xLjBcbi8vIH4xLjIsIH4xLjIueCwgfj4xLjIsIH4+MS4yLnggLS0+ID49MS4yLjAgPDEuMy4wXG4vLyB+MS4yLjMsIH4+MS4yLjMgLS0+ID49MS4yLjMgPDEuMy4wXG4vLyB+MS4yLjAsIH4+MS4yLjAgLS0+ID49MS4yLjAgPDEuMy4wXG5mdW5jdGlvbiByZXBsYWNlVGlsZGVzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlKGNvbXAsIGxvb3NlKSB7XG4gIHZhciByID0gbG9vc2UgPyByZVtUSUxERUxPT1NFXSA6IHJlW1RJTERFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKTtcbiAgICB2YXIgcmV0O1xuXG4gICAgaWYgKGlzWChNKSlcbiAgICAgIHJldCA9ICcnO1xuICAgIGVsc2UgaWYgKGlzWChtKSlcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICBlbHNlIGlmIChpc1gocCkpXG4gICAgICAvLyB+MS4yID09ID49MS4yLjAtIDwxLjMuMC1cbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgZWxzZSBpZiAocHIpIHtcbiAgICAgIGRlYnVnKCdyZXBsYWNlVGlsZGUgcHInLCBwcik7XG4gICAgICBpZiAocHIuY2hhckF0KDApICE9PSAnLScpXG4gICAgICAgIHByID0gJy0nICsgcHI7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfSBlbHNlXG4gICAgICAvLyB+MS4yLjMgPT0gPj0xLjIuMyA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG5cbiAgICBkZWJ1ZygndGlsZGUgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuLy8gXiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIF4yLCBeMi54LCBeMi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMi4wLCBeMi4wLnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyBeMS4yLCBeMS4yLnggLS0+ID49MS4yLjAgPDIuMC4wXG4vLyBeMS4yLjMgLS0+ID49MS4yLjMgPDIuMC4wXG4vLyBeMS4yLjAgLS0+ID49MS4yLjAgPDIuMC4wXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXRzKGNvbXAsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wLnRyaW0oKS5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBsb29zZSk7XG4gIH0pLmpvaW4oJyAnKTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0KGNvbXAsIGxvb3NlKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIGxvb3NlKTtcbiAgdmFyIHIgPSBsb29zZSA/IHJlW0NBUkVUTE9PU0VdIDogcmVbQ0FSRVRdO1xuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpO1xuICAgIHZhciByZXQ7XG5cbiAgICBpZiAoaXNYKE0pKVxuICAgICAgcmV0ID0gJyc7XG4gICAgZWxzZSBpZiAoaXNYKG0pKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIGVsc2UgaWYgKGlzWChwKSkge1xuICAgICAgaWYgKE0gPT09ICcwJylcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKTtcbiAgICAgIGlmIChwci5jaGFyQXQoMCkgIT09ICctJylcbiAgICAgICAgcHIgPSAnLScgKyBwcjtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJylcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJztcbiAgICAgIH0gZWxzZVxuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpO1xuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKVxuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgICB9IGVsc2VcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJztcbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgbG9vc2UpO1xuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbihjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpO1xuICB9KS5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VYUmFuZ2UoY29tcCwgbG9vc2UpIHtcbiAgY29tcCA9IGNvbXAudHJpbSgpO1xuICB2YXIgciA9IGxvb3NlID8gcmVbWFJBTkdFTE9PU0VdIDogcmVbWFJBTkdFXTtcbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbihyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpO1xuICAgIHZhciB4TSA9IGlzWChNKTtcbiAgICB2YXIgeG0gPSB4TSB8fCBpc1gobSk7XG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApO1xuICAgIHZhciBhbnlYID0geHA7XG5cbiAgICBpZiAoZ3RsdCA9PT0gJz0nICYmIGFueVgpXG4gICAgICBndGx0ID0gJyc7XG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgZm9yYmlkZGVuXG4gICAgICAgIHJldCA9ICcqJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKVxuICAgICAgICBtID0gMDtcbiAgICAgIGlmICh4cClcbiAgICAgICAgcCA9IDA7XG5cbiAgICAgIGlmIChndGx0ID09PSAnPicpIHtcbiAgICAgICAgLy8gPjEgPT4gPj0yLjAuMFxuICAgICAgICAvLyA+MS4yID0+ID49MS4zLjBcbiAgICAgICAgLy8gPjEuMi4zID0+ID49IDEuMi40XG4gICAgICAgIGd0bHQgPSAnPj0nO1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxO1xuICAgICAgICAgIG0gPSAwO1xuICAgICAgICAgIHAgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICAgICAgbSA9ICttICsgMTtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSlcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICB9XG5cbiAgICAgIHJldCA9IGd0bHQgKyBNICsgJy4nICsgbSArICcuJyArIHA7XG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnO1xuICAgIH0gZWxzZSBpZiAoeHApIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCc7XG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpO1xuXG4gICAgcmV0dXJuIHJldDtcbiAgfSk7XG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMoY29tcCwgbG9vc2UpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIGxvb3NlKTtcbiAgLy8gTG9vc2VuZXNzIGlzIGlnbm9yZWQgaGVyZS4gIHN0YXIgaXMgYWx3YXlzIGFzIGxvb3NlIGFzIGl0IGdldHMhXG4gIHJldHVybiBjb21wLnRyaW0oKS5yZXBsYWNlKHJlW1NUQVJdLCAnJyk7XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW0hZUEhFTlJBTkdFXSlcbi8vIE0sIG0sIHBhdGNoLCBwcmVyZWxlYXNlLCBidWlsZFxuLy8gMS4yIC0gMy40LjUgPT4gPj0xLjIuMCA8PTMuNC41XG4vLyAxLjIuMyAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMCBBbnkgMy40Lnggd2lsbCBkb1xuLy8gMS4yIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wXG5mdW5jdGlvbiBoeXBoZW5SZXBsYWNlKCQwLFxuICAgICAgICAgICAgICAgICAgICAgICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICAgICAgICAgICAgICAgICAgICAgICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuXG4gIGlmIChpc1goZk0pKVxuICAgIGZyb20gPSAnJztcbiAgZWxzZSBpZiAoaXNYKGZtKSlcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnO1xuICBlbHNlIGlmIChpc1goZnApKVxuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCc7XG4gIGVsc2VcbiAgICBmcm9tID0gJz49JyArIGZyb207XG5cbiAgaWYgKGlzWCh0TSkpXG4gICAgdG8gPSAnJztcbiAgZWxzZSBpZiAoaXNYKHRtKSlcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJztcbiAgZWxzZSBpZiAoaXNYKHRwKSlcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJztcbiAgZWxzZSBpZiAodHByKVxuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwcjtcbiAgZWxzZVxuICAgIHRvID0gJzw9JyArIHRvO1xuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKCk7XG59XG5cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbih2ZXJzaW9uKSB7XG4gIGlmICghdmVyc2lvbilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJylcbiAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLmxvb3NlKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24pKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZnVuY3Rpb24gdGVzdFNldChzZXQsIHZlcnNpb24pIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xuICAgICAgZGVidWcoc2V0W2ldLnNlbXZlcik7XG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIucHJlcmVsZWFzZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBhbGxvd2VkID0gc2V0W2ldLnNlbXZlcjtcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydHMuc2F0aXNmaWVzID0gc2F0aXNmaWVzO1xuZnVuY3Rpb24gc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBsb29zZSkge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSk7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pO1xufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nO1xuZnVuY3Rpb24gbWF4U2F0aXNmeWluZyh2ZXJzaW9ucywgcmFuZ2UsIGxvb3NlKSB7XG4gIHJldHVybiB2ZXJzaW9ucy5maWx0ZXIoZnVuY3Rpb24odmVyc2lvbikge1xuICAgIHJldHVybiBzYXRpc2ZpZXModmVyc2lvbiwgcmFuZ2UsIGxvb3NlKTtcbiAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIHJjb21wYXJlKGEsIGIsIGxvb3NlKTtcbiAgfSlbMF0gfHwgbnVsbDtcbn1cblxuZXhwb3J0cy52YWxpZFJhbmdlID0gdmFsaWRSYW5nZTtcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UocmFuZ2UsIGxvb3NlKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKS5yYW5nZSB8fCAnKic7XG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0cjtcbmZ1bmN0aW9uIGx0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8JywgbG9vc2UpO1xufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0cjtcbmZ1bmN0aW9uIGd0cih2ZXJzaW9uLCByYW5nZSwgbG9vc2UpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+JywgbG9vc2UpO1xufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlO1xuZnVuY3Rpb24gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgaGlsbywgbG9vc2UpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpO1xuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgbG9vc2UpO1xuXG4gIHZhciBndGZuLCBsdGVmbiwgbHRmbiwgY29tcCwgZWNvbXA7XG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0O1xuICAgICAgbHRlZm4gPSBsdGU7XG4gICAgICBsdGZuID0gbHQ7XG4gICAgICBjb21wID0gJz4nO1xuICAgICAgZWNvbXAgPSAnPj0nO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHQ7XG4gICAgICBsdGVmbiA9IGd0ZTtcbiAgICAgIGx0Zm4gPSBndDtcbiAgICAgIGNvbXAgPSAnPCc7XG4gICAgICBlY29tcCA9ICc8PSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKTtcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgbG9vc2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXTtcblxuICAgIHZhciBoaWdoID0gbnVsbDtcbiAgICB2YXIgbG93ID0gbnVsbDtcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24oY29tcGFyYXRvcikge1xuICAgICAgaWYgKGNvbXBhcmF0b3Iuc2VtdmVyID09PSBBTlkpIHtcbiAgICAgICAgY29tcGFyYXRvciA9IG5ldyBDb21wYXJhdG9yKCc+PTAuMC4wJylcbiAgICAgIH1cbiAgICAgIGhpZ2ggPSBoaWdoIHx8IGNvbXBhcmF0b3I7XG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvcjtcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgbG9vc2UpKSB7XG4gICAgICAgIGhpZ2ggPSBjb21wYXJhdG9yO1xuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBsb29zZSkpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChsb3cub3BlcmF0b3IgPT09IGVjb21wICYmIGx0Zm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vc2VtdmVyL3NlbXZlci5qc1xuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KGRyYWluUXVldWUsIDApO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L3Byb2Nlc3MvYnJvd3Nlci5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIENvbnN0cnVjdG9yICYgZGVmaW5pdGlvblxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcbmltcG9ydCAqIGFzIHNjb3BlIGZyb20gJy4vaW5zdGFuY2Uvc2NvcGUnXG5pbXBvcnQgKiBhcyBjb21waWxlciBmcm9tICcuL2NvbXBpbGVyJ1xuaW1wb3J0ICogYXMgZGlyZWN0aXZlIGZyb20gJy4vZGlyZWN0aXZlJ1xuaW1wb3J0ICogYXMgZG9tSGVscGVyIGZyb20gJy4vZG9tLWhlbHBlcidcbmltcG9ydCAqIGFzIGV2ZW50cyBmcm9tICcuL2V2ZW50cydcblxuaW1wb3J0IHtyZWdpc3Rlck1vZHVsZXMsIHJlZ2lzdGVyTWV0aG9kc30gZnJvbSAnLi4vYXBwL3JlZ2lzdGVyJ1xuXG5mdW5jdGlvbiBjYWxsT2xkUmVhZHlFbnRyeSh2bSwgY29tcG9uZW50KSB7XG4gIGlmIChjb21wb25lbnQubWV0aG9kcyAmJlxuICAgICAgY29tcG9uZW50Lm1ldGhvZHMucmVhZHkpIHtcbiAgICBfLndhcm4oJ1wiZXhwb3J0cy5tZXRob2RzLnJlYWR5XCIgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAncGxlYXNlIHVzZSBcImV4cG9ydHMuY3JlYXRlZFwiIGluc3RlYWQnKVxuICAgIGNvbXBvbmVudC5tZXRob2RzLnJlYWR5LmNhbGwodm0pXG4gIH1cbn1cblxuLyoqXG4gKiBWaWV3TW9kZWwgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudFZtICAgd2hpY2ggY29udGFpbnMgX2FwcFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudEVsICAgcm9vdCBlbGVtZW50IG9yIGZyYWcgYmxvY2tcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXJnZWREYXRhIGV4dGVybmFsIGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBleHRlcm5hbEV2ZW50cyBleHRlcm5hbCBldmVudHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVm0oXG4gIHR5cGUsXG4gIHBhcmVudFZtLFxuICBwYXJlbnRFbCxcbiAgbWVyZ2VkRGF0YSxcbiAgZXh0ZXJuYWxFdmVudHNcbikge1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnRWbS5fcmVhbFBhcmVudCA/IHBhcmVudFZtLl9yZWFsUGFyZW50IDogcGFyZW50Vm1cbiAgdGhpcy5fYXBwID0gcGFyZW50Vm0uX2FwcFxuICBwYXJlbnRWbS5fY2hpbGRyZW5WbXMgJiYgcGFyZW50Vm0uX2NoaWxkcmVuVm1zLnB1c2godGhpcylcblxuICBjb25zdCBjb21wb25lbnQgPSB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdIHx8IHt9XG4gIGNvbnN0IGRhdGEgPSBjb21wb25lbnQuZGF0YSB8fCB7fVxuXG4gIHRoaXMuX29wdGlvbnMgPSBjb21wb25lbnRcbiAgdGhpcy5fbWV0aG9kcyA9IGNvbXBvbmVudC5tZXRob2RzIHx8IHt9XG4gIHRoaXMuX2NvbXB1dGVkID0gY29tcG9uZW50LmNvbXB1dGVkIHx8IHt9XG4gIHRoaXMuX2NzcyA9IGNvbXBvbmVudC5zdHlsZSB8fCB7fVxuICB0aGlzLl9pZHMgPSB7fVxuICB0aGlzLl93YXRjaGVycyA9IFtdXG4gIHRoaXMuX3ZtRXZlbnRzID0ge31cbiAgdGhpcy5fY2hpbGRyZW5WbXMgPSBbXVxuICB0aGlzLl90eXBlID0gdHlwZVxuXG4gIC8vIGJpbmQgZXZlbnRzIGFuZCBsaWZlY3ljbGVzXG4gIHRoaXMuX2luaXRFdmVudHMoZXh0ZXJuYWxFdmVudHMpXG5cbiAgXy5kZWJ1ZyhgXCJpbml0XCIgbGlmZWN5Y2xlIGluIFZtKCR7dGhpcy5fdHlwZX0pYClcbiAgdGhpcy4kZW1pdCgnaG9vazppbml0JylcbiAgdGhpcy5faW5pdGVkID0gdHJ1ZVxuICAvLyBwcm94eSBkYXRhIGFuZCBtZXRob2RzXG4gIC8vIG9ic2VydmUgZGF0YSBhbmQgYWRkIHRoaXMgdG8gdm1zXG4gIHRoaXMuX2RhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyA/IGRhdGEoKSA6IGRhdGFcbiAgaWYgKG1lcmdlZERhdGEpIHtcbiAgICBfLmV4dGVuZCh0aGlzLl9kYXRhLCBtZXJnZWREYXRhKVxuICB9XG4gIHRoaXMuX2luaXRTY29wZSgpXG5cbiAgXy5kZWJ1ZyhgXCJjcmVhdGVkXCIgbGlmZWN5Y2xlIGluIFZtKCR7dGhpcy5fdHlwZX0pYClcbiAgdGhpcy4kZW1pdCgnaG9vazpjcmVhdGVkJylcbiAgdGhpcy5fY3JlYXRlZCA9IHRydWVcbiAgLy8gYmFja3dhcmQgb2xkIHJlYWR5IGVudHJ5XG4gIGNhbGxPbGRSZWFkeUVudHJ5KHRoaXMsIGNvbXBvbmVudClcblxuICAvLyBpZiBubyBwYXJlbnRFbGVtZW50IHRoZW4gc3BlY2lmeSB0aGUgZG9jdW1lbnRFbGVtZW50XG4gIHRoaXMuX3BhcmVudEVsID0gcGFyZW50RWwgfHwgdGhpcy5fYXBwLmRvYy5kb2N1bWVudEVsZW1lbnRcbiAgdGhpcy5fYnVpbGQoKVxufVxuXG5fLmV4dGVuZChWbS5wcm90b3R5cGUsIHNjb3BlLCBjb21waWxlciwgZGlyZWN0aXZlLCBkb21IZWxwZXIsIGV2ZW50cylcbl8uZXh0ZW5kKFZtLCB7XG4gIHJlZ2lzdGVyTW9kdWxlcyxcbiAgcmVnaXN0ZXJNZXRob2RzXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL2luZGV4LmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBPYnNlcnZlciA9IHJlcXVpcmUoJy4uL29ic2VydmVyJylcbnZhciBEZXAgPSByZXF1aXJlKCcuLi9vYnNlcnZlci9kZXAnKVxuXG4vKipcbiAqIFNldHVwIHRoZSBzY29wZSBvZiBhbiBpbnN0YW5jZSwgd2hpY2ggY29udGFpbnM6XG4gKiAtIG9ic2VydmVkIGRhdGFcbiAqIC0gY29tcHV0ZWQgcHJvcGVydGllc1xuICogLSB1c2VyIG1ldGhvZHNcbiAqIC0gbWV0YSBwcm9wZXJ0aWVzXG4gKi9cblxuZXhwb3J0cy5faW5pdFNjb3BlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9pbml0RGF0YSgpXG4gIHRoaXMuX2luaXRDb21wdXRlZCgpXG4gIHRoaXMuX2luaXRNZXRob2RzKClcbiAgLy8gdGhpcy5faW5pdE1ldGEoKVxufVxuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIGRhdGEuIFxuICovXG5cbmNvbnN0IEtFWV9XT1JEUyA9IFsnJGluZGV4JywgJyR2YWx1ZScsICckZXZlbnQnXVxuZXhwb3J0cy5faW5pdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhXG4gIHZhciBpLCBrZXlcbiAgLy8gLy8gbWFrZSBzdXJlIGFsbCBwcm9wcyBwcm9wZXJ0aWVzIGFyZSBvYnNlcnZlZFxuICAvLyB2YXIgcHJvcHMgPSB0aGlzLiRvcHRpb25zLnByb3BzXG4gIC8vIGlmIChwcm9wcykge1xuICAvLyAgIGkgPSBwcm9wcy5sZW5ndGhcbiAgLy8gICB3aGlsZSAoaS0tKSB7XG4gIC8vICAgICBrZXkgPSBfLmNhbWVsaXplKHByb3BzW2ldKVxuICAvLyAgICAgaWYgKCEoa2V5IGluIGRhdGEpKSB7XG4gIC8vICAgICAgIGRhdGFba2V5XSA9IG51bGxcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vIH1cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKVxuICBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGtleSA9IGtleXNbaV1cbiAgICBpZiAoS0VZX1dPUkRTLmluZGV4T2Yoa2V5KSA+IC0xIHx8ICFfLmlzUmVzZXJ2ZWQoa2V5KSkge1xuICAgICAgdGhpcy5fcHJveHkoa2V5KVxuICAgIH1cbiAgfVxuICAvLyBvYnNlcnZlIGRhdGFcbiAgT2JzZXJ2ZXIuY3JlYXRlKGRhdGEpLmFkZFZtKHRoaXMpXG59XG5cbi8vIC8qKlxuLy8gICogU3dhcCB0aGUgaXNudGFuY2UncyAkZGF0YS4gQ2FsbGVkIGluICRkYXRhJ3Mgc2V0dGVyLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdEYXRhXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5fc2V0RGF0YSA9IGZ1bmN0aW9uIChuZXdEYXRhKSB7XG4vLyAgIG5ld0RhdGEgPSBuZXdEYXRhIHx8IHt9XG4vLyAgIHZhciBvbGREYXRhID0gdGhpcy5fZGF0YVxuLy8gICB0aGlzLl9kYXRhID0gbmV3RGF0YVxuLy8gICB2YXIga2V5cywga2V5LCBpXG4vLyAgIC8vIHVucHJveHkga2V5cyBub3QgcHJlc2VudCBpbiBuZXcgZGF0YVxuLy8gICBrZXlzID0gT2JqZWN0LmtleXMob2xkRGF0YSlcbi8vICAgaSA9IGtleXMubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICBrZXkgPSBrZXlzW2ldXG4vLyAgICAgaWYgKCFfLmlzUmVzZXJ2ZWQoa2V5KSAmJiAhKGtleSBpbiBuZXdEYXRhKSkge1xuLy8gICAgICAgdGhpcy5fdW5wcm94eShrZXkpXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIC8vIHByb3h5IGtleXMgbm90IGFscmVhZHkgcHJveGllZCxcbi8vICAgLy8gYW5kIHRyaWdnZXIgY2hhbmdlIGZvciBjaGFuZ2VkIHZhbHVlc1xuLy8gICBrZXlzID0gT2JqZWN0LmtleXMobmV3RGF0YSlcbi8vICAgaSA9IGtleXMubGVuZ3RoXG4vLyAgIHdoaWxlIChpLS0pIHtcbi8vICAgICBrZXkgPSBrZXlzW2ldXG4vLyAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KGtleSkgJiYgIV8uaXNSZXNlcnZlZChrZXkpKSB7XG4vLyAgICAgICAvLyBuZXcgcHJvcGVydHlcbi8vICAgICAgIHRoaXMuX3Byb3h5KGtleSlcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgb2xkRGF0YS5fX29iX18ucmVtb3ZlVm0odGhpcylcbi8vICAgT2JzZXJ2ZXIuY3JlYXRlKG5ld0RhdGEpLmFkZFZtKHRoaXMpXG4vLyAgIHRoaXMuX2RpZ2VzdCgpXG4vLyB9XG5cbi8qKlxuICogUHJveHkgYSBwcm9wZXJ0eSwgc28gdGhhdFxuICogdm0ucHJvcCA9PT0gdm0uX2RhdGEucHJvcFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqL1xuXG5leHBvcnRzLl9wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgLy8gbmVlZCB0byBzdG9yZSByZWYgdG8gc2VsZiBoZXJlXG4gIC8vIGJlY2F1c2UgdGhlc2UgZ2V0dGVyL3NldHRlcnMgbWlnaHRcbiAgLy8gYmUgY2FsbGVkIGJ5IGNoaWxkIGluc3RhbmNlcyFcbiAgdmFyIHNlbGYgPSB0aGlzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBrZXksIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICAgIHJldHVybiBzZWxmLl9kYXRhW2tleV1cbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gcHJveHlTZXR0ZXIgKHZhbCkge1xuICAgICAgc2VsZi5fZGF0YVtrZXldID0gdmFsXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIFVucHJveHkgYSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKi9cblxuZXhwb3J0cy5fdW5wcm94eSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZGVsZXRlIHRoaXNba2V5XVxufVxuXG4vLyAvKipcbi8vICAqIEZvcmNlIHVwZGF0ZSBvbiBldmVyeSB3YXRjaGVyIGluIHNjb3BlLlxuLy8gICovXG5cbi8vIGV4cG9ydHMuX2RpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgdmFyIGkgPSB0aGlzLl93YXRjaGVycy5sZW5ndGhcbi8vICAgd2hpbGUgKGktLSkge1xuLy8gICAgIHRoaXMuX3dhdGNoZXJzW2ldLnVwZGF0ZSgpXG4vLyAgIH1cbi8vICAgdmFyIGNoaWxkcmVuID0gdGhpcy5fY2hpbGRyZW5cbi8vICAgaSA9IGNoaWxkcmVuLmxlbmd0aFxuLy8gICB3aGlsZSAoaS0tKSB7XG4vLyAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV1cbi8vICAgICBpZiAoY2hpbGQuJG9wdGlvbnMuaW5oZXJpdCkge1xuLy8gICAgICAgY2hpbGQuX2RpZ2VzdCgpXG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG5cbi8qKlxuICogU2V0dXAgY29tcHV0ZWQgcHJvcGVydGllcy4gVGhleSBhcmUgZXNzZW50aWFsbHlcbiAqIHNwZWNpYWwgZ2V0dGVyL3NldHRlcnNcbiAqL1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5leHBvcnRzLl9pbml0Q29tcHV0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIHZhciBjb21wdXRlZCA9IHRoaXMuJG9wdGlvbnMuY29tcHV0ZWRcbiAgdmFyIGNvbXB1dGVkID0gdGhpcy5fY29tcHV0ZWRcbiAgaWYgKGNvbXB1dGVkKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGNvbXB1dGVkKSB7XG4gICAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV1cbiAgICAgIHZhciBkZWYgPSB7XG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRlZi5nZXQgPSBfLmJpbmQodXNlckRlZiwgdGhpcylcbiAgICAgICAgZGVmLnNldCA9IG5vb3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZi5nZXQgPSB1c2VyRGVmLmdldFxuICAgICAgICAgID8gXy5iaW5kKHVzZXJEZWYuZ2V0LCB0aGlzKVxuICAgICAgICAgIDogbm9vcFxuICAgICAgICBkZWYuc2V0ID0gdXNlckRlZi5zZXRcbiAgICAgICAgICA/IF8uYmluZCh1c2VyRGVmLnNldCwgdGhpcylcbiAgICAgICAgICA6IG5vb3BcbiAgICAgIH1cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBrZXksIGRlZilcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTZXR1cCBpbnN0YW5jZSBtZXRob2RzLiBNZXRob2RzIG11c3QgYmUgYm91bmQgdG8gdGhlXG4gKiBpbnN0YW5jZSBzaW5jZSB0aGV5IG1pZ2h0IGJlIGNhbGxlZCBieSBjaGlsZHJlblxuICogaW5oZXJpdGluZyB0aGVtLlxuICovXG5cbmV4cG9ydHMuX2luaXRNZXRob2RzID0gZnVuY3Rpb24gKCkge1xuICAvLyB2YXIgbWV0aG9kcyA9IHRoaXMuJG9wdGlvbnMubWV0aG9kc1xuICB2YXIgbWV0aG9kcyA9IHRoaXMuX21ldGhvZHNcbiAgaWYgKG1ldGhvZHMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gbWV0aG9kcykge1xuICAgICAgdGhpc1trZXldID0gXy5iaW5kKG1ldGhvZHNba2V5XSwgdGhpcylcbiAgICB9XG4gIH1cbn1cblxuLy8gLyoqXG4vLyAgKiBJbml0aWFsaXplIG1ldGEgaW5mb3JtYXRpb24gbGlrZSAkaW5kZXgsICRrZXkgJiAkdmFsdWUuXG4vLyAgKi9cblxuLy8gZXhwb3J0cy5faW5pdE1ldGEgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIHZhciBtZXRhcyA9IHRoaXMuJG9wdGlvbnMuX21ldGFcbi8vICAgaWYgKG1ldGFzKSB7XG4vLyAgICAgZm9yICh2YXIga2V5IGluIG1ldGFzKSB7XG4vLyAgICAgICB0aGlzLl9kZWZpbmVNZXRhKGtleSwgbWV0YXNba2V5XSlcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gLyoqXG4vLyAgKiBEZWZpbmUgYSBtZXRhIHByb3BlcnR5LCBlLmcgJGluZGV4LCAka2V5LCAkdmFsdWVcbi8vICAqIHdoaWNoIG9ubHkgZXhpc3RzIG9uIHRoZSB2bSBpbnN0YW5jZSBidXQgbm90IGluICRkYXRhLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbi8vICAqIEBwYXJhbSB7Kn0gdmFsdWVcbi8vICAqL1xuXG4vLyBleHBvcnRzLl9kZWZpbmVNZXRhID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbi8vICAgdmFyIGRlcCA9IG5ldyBEZXAoKVxuLy8gICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywga2V5LCB7XG4vLyAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8vICAgICBjb25maWd1cmFibGU6IHRydWUsXG4vLyAgICAgZ2V0OiBmdW5jdGlvbiBtZXRhR2V0dGVyICgpIHtcbi8vICAgICAgIGlmIChPYnNlcnZlci50YXJnZXQpIHtcbi8vICAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChkZXApXG4vLyAgICAgICB9XG4vLyAgICAgICByZXR1cm4gdmFsdWVcbi8vICAgICB9LFxuLy8gICAgIHNldDogZnVuY3Rpb24gbWV0YVNldHRlciAodmFsKSB7XG4vLyAgICAgICBpZiAodmFsICE9PSB2YWx1ZSkge1xuLy8gICAgICAgICB2YWx1ZSA9IHZhbFxuLy8gICAgICAgICBkZXAubm90aWZ5KClcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH0pXG4vLyB9XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9pbnN0YW5jZS9zY29wZS5qc1xuICoqLyIsIi8vIHJlcXVpcmVkIGZvciBjb2RlIGluIGluc3RhbmNlL29ic2VydmVyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL3V0aWwuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZycpXG52YXIgRGVwID0gcmVxdWlyZSgnLi9kZXAnKVxudmFyIGFycmF5TWV0aG9kcyA9IHJlcXVpcmUoJy4vYXJyYXknKVxudmFyIGFycmF5S2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFycmF5TWV0aG9kcylcbnJlcXVpcmUoJy4vb2JqZWN0JylcblxudmFyIHVpZCA9IDBcblxuLyoqXG4gKiBUeXBlIGVudW1zXG4gKi9cblxudmFyIEFSUkFZICA9IDBcbnZhciBPQkpFQ1QgPSAxXG5cbi8qKlxuICogQXVnbWVudCBhbiB0YXJnZXQgT2JqZWN0IG9yIEFycmF5IGJ5IGludGVyY2VwdGluZ1xuICogdGhlIHByb3RvdHlwZSBjaGFpbiB1c2luZyBfX3Byb3RvX19cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG9cbiAqL1xuXG5mdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjKSB7XG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmNcbn1cblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b1xuICovXG5cbmZ1bmN0aW9uIGNvcHlBdWdtZW50ICh0YXJnZXQsIHNyYywga2V5cykge1xuICB2YXIgaSA9IGtleXMubGVuZ3RoXG4gIHZhciBrZXlcbiAgd2hpbGUgKGktLSkge1xuICAgIGtleSA9IGtleXNbaV1cbiAgICBfLmRlZmluZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pXG4gIH1cbn1cblxuLyoqXG4gKiBPYnNlcnZlciBjbGFzcyB0aGF0IGFyZSBhdHRhY2hlZCB0byBlYWNoIG9ic2VydmVkXG4gKiBvYmplY3QuIE9uY2UgYXR0YWNoZWQsIHRoZSBvYnNlcnZlciBjb252ZXJ0cyB0YXJnZXRcbiAqIG9iamVjdCdzIHByb3BlcnR5IGtleXMgaW50byBnZXR0ZXIvc2V0dGVycyB0aGF0XG4gKiBjb2xsZWN0IGRlcGVuZGVuY2llcyBhbmQgZGlzcGF0Y2hlcyB1cGRhdGVzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSB2YWx1ZVxuICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5cbmZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSwgdHlwZSkge1xuICB0aGlzLmlkID0gKyt1aWRcbiAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZVxuICB0aGlzLmRlcHMgPSBbXVxuICBfLmRlZmluZSh2YWx1ZSwgJ19fb2JfXycsIHRoaXMpXG4gIGlmICh0eXBlID09PSBBUlJBWSkge1xuICAgIHZhciBhdWdtZW50ID0gY29uZmlnLnByb3RvICYmIF8uaGFzUHJvdG9cbiAgICAgID8gcHJvdG9BdWdtZW50XG4gICAgICA6IGNvcHlBdWdtZW50XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpXG4gICAgdGhpcy5vYnNlcnZlQXJyYXkodmFsdWUpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gT0JKRUNUKSB7XG4gICAgdGhpcy53YWxrKHZhbHVlKVxuICB9XG59XG5cbk9ic2VydmVyLnRhcmdldCA9IG51bGxcblxudmFyIHAgPSBPYnNlcnZlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBdHRlbXB0IHRvIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZSBmb3IgYSB2YWx1ZSxcbiAqIHJldHVybnMgdGhlIG5ldyBvYnNlcnZlciBpZiBzdWNjZXNzZnVsbHkgb2JzZXJ2ZWQsXG4gKiBvciB0aGUgZXhpc3Rpbmcgb2JzZXJ2ZXIgaWYgdGhlIHZhbHVlIGFscmVhZHkgaGFzIG9uZS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtPYnNlcnZlcnx1bmRlZmluZWR9XG4gKiBAc3RhdGljXG4gKi9cblxuT2JzZXJ2ZXIuY3JlYXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmIChcbiAgICB2YWx1ZSAmJlxuICAgIHZhbHVlLmhhc093blByb3BlcnR5KCdfX29iX18nKSAmJlxuICAgIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyXG4gICkge1xuICAgIHJldHVybiB2YWx1ZS5fX29iX19cbiAgfSBlbHNlIGlmIChfLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZlcih2YWx1ZSwgQVJSQVkpXG4gIH0gZWxzZSBpZiAoXG4gICAgXy5pc1BsYWluT2JqZWN0KHZhbHVlKSAmJlxuICAgICF2YWx1ZS5faXNWdWUgLy8gYXZvaWQgVnVlIGluc3RhbmNlXG4gICkge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2ZXIodmFsdWUsIE9CSkVDVClcbiAgfVxufVxuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC4gUHJvcGVydGllcyBwcmVmaXhlZCB3aXRoIGAkYCBvciBgX2BcbiAqIGFuZCBhY2Nlc3NvciBwcm9wZXJ0aWVzIGFyZSBpZ25vcmVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqL1xuXG5wLndhbGsgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuICB2YXIgaSA9IGtleXMubGVuZ3RoXG4gIHZhciBrZXksIHByZWZpeFxuICB3aGlsZSAoaS0tKSB7XG4gICAga2V5ID0ga2V5c1tpXVxuICAgIHByZWZpeCA9IGtleS5jaGFyQ29kZUF0KDApXG4gICAgaWYgKHByZWZpeCAhPT0gMHgyNCAmJiBwcmVmaXggIT09IDB4NUYpIHsgLy8gc2tpcCAkIG9yIF9cbiAgICAgIHRoaXMuY29udmVydChrZXksIG9ialtrZXldKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFRyeSB0byBjYXJldGUgYW4gb2JzZXJ2ZXIgZm9yIGEgY2hpbGQgdmFsdWUsXG4gKiBhbmQgaWYgdmFsdWUgaXMgYXJyYXksIGxpbmsgZGVwIHRvIHRoZSBhcnJheS5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7RGVwfHVuZGVmaW5lZH1cbiAqL1xuXG5wLm9ic2VydmUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiBPYnNlcnZlci5jcmVhdGUodmFsKVxufVxuXG4vKipcbiAqIE9ic2VydmUgYSBsaXN0IG9mIEFycmF5IGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKi9cblxucC5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgdmFyIGkgPSBpdGVtcy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIHRoaXMub2JzZXJ2ZShpdGVtc1tpXSlcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBwcm9wZXJ0eSBpbnRvIGdldHRlci9zZXR0ZXIgc28gd2UgY2FuIGVtaXRcbiAqIHRoZSBldmVudHMgd2hlbiB0aGUgcHJvcGVydHkgaXMgYWNjZXNzZWQvY2hhbmdlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbnAuY29udmVydCA9IGZ1bmN0aW9uIChrZXksIHZhbCkge1xuICB2YXIgb2IgPSB0aGlzXG4gIHZhciBjaGlsZE9iID0gb2Iub2JzZXJ2ZSh2YWwpXG4gIHZhciBkZXAgPSBuZXcgRGVwKClcbiAgaWYgKGNoaWxkT2IpIHtcbiAgICBjaGlsZE9iLmRlcHMucHVzaChkZXApXG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iLnZhbHVlLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIE9ic2VydmVyLnRhcmdldCBpcyBhIHdhdGNoZXIgd2hvc2UgZ2V0dGVyIGlzXG4gICAgICAvLyBjdXJyZW50bHkgYmVpbmcgZXZhbHVhdGVkLlxuICAgICAgaWYgKG9iLmFjdGl2ZSAmJiBPYnNlcnZlci50YXJnZXQpIHtcbiAgICAgICAgT2JzZXJ2ZXIudGFyZ2V0LmFkZERlcChkZXApXG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsXG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgIGlmIChuZXdWYWwgPT09IHZhbCkgcmV0dXJuXG4gICAgICAvLyByZW1vdmUgZGVwIGZyb20gb2xkIHZhbHVlXG4gICAgICB2YXIgb2xkQ2hpbGRPYiA9IHZhbCAmJiB2YWwuX19vYl9fXG4gICAgICBpZiAob2xkQ2hpbGRPYikge1xuICAgICAgICBvbGRDaGlsZE9iLmRlcHMuJHJlbW92ZShkZXApXG4gICAgICB9XG4gICAgICB2YWwgPSBuZXdWYWxcbiAgICAgIC8vIGFkZCBkZXAgdG8gbmV3IHZhbHVlXG4gICAgICB2YXIgbmV3Q2hpbGRPYiA9IG9iLm9ic2VydmUobmV3VmFsKVxuICAgICAgaWYgKG5ld0NoaWxkT2IpIHtcbiAgICAgICAgbmV3Q2hpbGRPYi5kZXBzLnB1c2goZGVwKVxuICAgICAgfVxuICAgICAgZGVwLm5vdGlmeSgpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIE5vdGlmeSBjaGFuZ2Ugb24gYWxsIHNlbGYgZGVwcyBvbiBhbiBvYnNlcnZlci5cbiAqIFRoaXMgaXMgY2FsbGVkIHdoZW4gYSBtdXRhYmxlIHZhbHVlIG11dGF0ZXMuIGUuZy5cbiAqIHdoZW4gYW4gQXJyYXkncyBtdXRhdGluZyBtZXRob2RzIGFyZSBjYWxsZWQsIG9yIGFuXG4gKiBPYmplY3QncyAkYWRkLyRkZWxldGUgYXJlIGNhbGxlZC5cbiAqL1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRlcHMgPSB0aGlzLmRlcHNcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkZXBzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGRlcHNbaV0ubm90aWZ5KClcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBhbiBvd25lciB2bSwgc28gdGhhdCB3aGVuICRhZGQvJGRlbGV0ZSBtdXRhdGlvbnNcbiAqIGhhcHBlbiB3ZSBjYW4gbm90aWZ5IG93bmVyIHZtcyB0byBwcm94eSB0aGUga2V5cyBhbmRcbiAqIGRpZ2VzdCB0aGUgd2F0Y2hlcnMuIFRoaXMgaXMgb25seSBjYWxsZWQgd2hlbiB0aGUgb2JqZWN0XG4gKiBpcyBvYnNlcnZlZCBhcyBhbiBpbnN0YW5jZSdzIHJvb3QgJGRhdGEuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxucC5hZGRWbSA9IGZ1bmN0aW9uICh2bSkge1xuICAodGhpcy52bXMgPSB0aGlzLnZtcyB8fCBbXSkucHVzaCh2bSlcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gb3duZXIgdm0uIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIG9iamVjdCBpc1xuICogc3dhcHBlZCBvdXQgYXMgYW4gaW5zdGFuY2UncyAkZGF0YSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtWdWV9IHZtXG4gKi9cblxucC5yZW1vdmVWbSA9IGZ1bmN0aW9uICh2bSkge1xuICB0aGlzLnZtcy4kcmVtb3ZlKHZtKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic2VydmVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge3Byb3RvOiB0cnVlfVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vY29uZmlnLmpzXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuLi91dGlsJylcblxuLyoqXG4gKiBBIGRlcCBpcyBhbiBvYnNlcnZhYmxlIHRoYXQgY2FuIGhhdmUgbXVsdGlwbGVcbiAqIGRpcmVjdGl2ZXMgc3Vic2NyaWJpbmcgdG8gaXQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cblxuZnVuY3Rpb24gRGVwICgpIHtcbiAgdGhpcy5zdWJzID0gW11cbn1cblxudmFyIHAgPSBEZXAucHJvdG90eXBlXG5cbi8qKlxuICogQWRkIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbnAuYWRkU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICB0aGlzLnN1YnMucHVzaChzdWIpXG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZGlyZWN0aXZlIHN1YnNjcmliZXIuXG4gKlxuICogQHBhcmFtIHtEaXJlY3RpdmV9IHN1YlxuICovXG5cbnAucmVtb3ZlU3ViID0gZnVuY3Rpb24gKHN1Yikge1xuICB0aGlzLnN1YnMuJHJlbW92ZShzdWIpXG59XG5cbi8qKlxuICogTm90aWZ5IGFsbCBzdWJzY3JpYmVycyBvZiBhIG5ldyB2YWx1ZS5cbiAqL1xuXG5wLm5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gc3RhYmxpemUgdGhlIHN1YnNjcmliZXIgbGlzdCBmaXJzdFxuICB2YXIgc3VicyA9IF8udG9BcnJheSh0aGlzLnN1YnMpXG4gIGZvciAodmFyIGkgPSAwLCBsID0gc3Vicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBzdWJzW2ldLnVwZGF0ZSgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZXBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9vYnNlcnZlci9kZXAuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGVcbnZhciBhcnJheU1ldGhvZHMgPSBPYmplY3QuY3JlYXRlKGFycmF5UHJvdG8pXG5cbi8qKlxuICogSW50ZXJjZXB0IG11dGF0aW5nIG1ldGhvZHMgYW5kIGVtaXQgZXZlbnRzXG4gKi9cblxuO1tcbiAgJ3B1c2gnLFxuICAncG9wJyxcbiAgJ3NoaWZ0JyxcbiAgJ3Vuc2hpZnQnLFxuICAnc3BsaWNlJyxcbiAgJ3NvcnQnLFxuICAncmV2ZXJzZSdcbl1cbi5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgLy8gY2FjaGUgb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBvcmlnaW5hbCA9IGFycmF5UHJvdG9bbWV0aG9kXVxuICBfLmRlZmluZShhcnJheU1ldGhvZHMsIG1ldGhvZCwgZnVuY3Rpb24gbXV0YXRvciAoKSB7XG4gICAgLy8gYXZvaWQgbGVha2luZyBhcmd1bWVudHM6XG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vY2xvc3VyZS13aXRoLWFyZ3VtZW50c1xuICAgIHZhciBpID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGkpXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuICAgIHZhciBpbnNlcnRlZFxuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd1bnNoaWZ0JzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICdzcGxpY2UnOlxuICAgICAgICBpbnNlcnRlZCA9IGFyZ3Muc2xpY2UoMilcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSBvYi5vYnNlcnZlQXJyYXkoaW5zZXJ0ZWQpXG4gICAgLy8gbm90aWZ5IGNoYW5nZVxuICAgIG9iLm5vdGlmeSgpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KVxufSlcblxuLyoqXG4gKiBTd2FwIHRoZSBlbGVtZW50IGF0IHRoZSBnaXZlbiBpbmRleCB3aXRoIGEgbmV3IHZhbHVlXG4gKiBhbmQgZW1pdHMgY29ycmVzcG9uZGluZyBldmVudC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5kZXhcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHsqfSAtIHJlcGxhY2VkIGVsZW1lbnRcbiAqL1xuXG5fLmRlZmluZShcbiAgYXJyYXlQcm90byxcbiAgJyRzZXQnLFxuICBmdW5jdGlvbiAkc2V0IChpbmRleCwgdmFsKSB7XG4gICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IGluZGV4ICsgMVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDEsIHZhbClbMF1cbiAgfVxuKVxuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCB0byByZW1vdmUgdGhlIGVsZW1lbnQgYXQgZ2l2ZW4gaW5kZXguXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4XG4gKiBAcGFyYW0geyp9IHZhbFxuICovXG5cbl8uZGVmaW5lKFxuICBhcnJheVByb3RvLFxuICAnJHJlbW92ZScsXG4gIGZ1bmN0aW9uICRyZW1vdmUgKGluZGV4KSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKCF0aGlzLmxlbmd0aCkgcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gXy5pbmRleE9mKHRoaXMsIGluZGV4KVxuICAgIH1cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG4pXG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlNZXRob2RzXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vb2JzZXJ2ZXIvYXJyYXkuanNcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4uL3V0aWwnKVxudmFyIG9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxuXG4vKipcbiAqIEFkZCBhIG5ldyBwcm9wZXJ0eSB0byBhbiBvYnNlcnZlZCBvYmplY3RcbiAqIGFuZCBlbWl0cyBjb3JyZXNwb25kaW5nIGV2ZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEBwdWJsaWNcbiAqL1xuXG5fLmRlZmluZShcbiAgb2JqUHJvdG8sXG4gICckYWRkJyxcbiAgZnVuY3Rpb24gJGFkZCAoa2V5LCB2YWwpIHtcbiAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cbiAgICB2YXIgb2IgPSB0aGlzLl9fb2JfX1xuICAgIGlmICghb2IgfHwgXy5pc1Jlc2VydmVkKGtleSkpIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIG9iLmNvbnZlcnQoa2V5LCB2YWwpXG4gICAgb2Iubm90aWZ5KClcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG4gICAgICAgIHZtLl9wcm94eShrZXkpXG4gICAgICAgIC8vIHZtLl9kaWdlc3QoKSAvLyB0b2RvXG4gICAgICB9XG4gICAgfVxuICB9XG4pXG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgb24gYW4gb2JzZXJ2ZWQgb2JqZWN0LCBjYWxsaW5nIGFkZCB0b1xuICogZW5zdXJlIHRoZSBwcm9wZXJ0eSBpcyBvYnNlcnZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHB1YmxpY1xuICovXG5cbl8uZGVmaW5lKFxuICBvYmpQcm90byxcbiAgJyRzZXQnLFxuICBmdW5jdGlvbiAkc2V0IChrZXksIHZhbCkge1xuICAgIHRoaXMuJGFkZChrZXksIHZhbClcbiAgICB0aGlzW2tleV0gPSB2YWxcbiAgfVxuKVxuXG4vKipcbiAqIERlbGV0ZXMgYSBwcm9wZXJ0eSBmcm9tIGFuIG9ic2VydmVkIG9iamVjdFxuICogYW5kIGVtaXRzIGNvcnJlc3BvbmRpbmcgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcHVibGljXG4gKi9cblxuXy5kZWZpbmUoXG4gIG9ialByb3RvLFxuICAnJGRlbGV0ZScsXG4gIGZ1bmN0aW9uICRkZWxldGUgKGtleSkge1xuICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSByZXR1cm5cbiAgICBkZWxldGUgdGhpc1trZXldXG4gICAgdmFyIG9iID0gdGhpcy5fX29iX19cbiAgICBpZiAoIW9iIHx8IF8uaXNSZXNlcnZlZChrZXkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgb2Iubm90aWZ5KClcbiAgICBpZiAob2Iudm1zKSB7XG4gICAgICB2YXIgaSA9IG9iLnZtcy5sZW5ndGhcbiAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdmFyIHZtID0gb2Iudm1zW2ldXG4gICAgICAgIHZtLl91bnByb3h5KGtleSlcbiAgICAgICAgLy8gdm0uX2RpZ2VzdCgpIC8vIHRvZG9cbiAgICAgIH1cbiAgICB9XG4gIH1cbilcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3ZtL29ic2VydmVyL29iamVjdC5qc1xuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlld1xuICogVmlld01vZGVsIHRlbXBsYXRlIHBhcnNlciAmIGRhdGEtYmluZGluZyBwcm9jZXNzXG4gKlxuICogcmVxdWlyZWQ6XG4gKiBpbmRleC5qczogVm1cbiAqIGRvbS1oZWxwZXIuanM6IF9jcmVhdGVFbGVtZW50LCBfY3JlYXRlQmxvY2tcbiAqIGRvbS1oZWxwZXIuanM6IF9hdHRhY2hUYXJnZXQsIF9tb3ZlVGFyZ2V0LCBfcmVtb3ZlVGFyZ2V0XG4gKiBkaXJlY3RpdmUuanM6IF9iaW5kRWxlbWVudCwgX2JpbmRTdWJWbSwgX3dhdGNoXG4gKiBldmVudHMuanM6ICRvblxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgY3JlYXRlVm0oKVxuICogICBtZXJnZShleHRlcm5hbERpcnMsIGRpcnMpXG4gKiAgIGNvbXBpbGUodGVtcGxhdGUsIHBhcmVudE5vZGUpXG4gKiAgICAgaWYgKHR5cGUgaXMgY29udGVudCkgY3JlYXRlIGNvbnRlbnROb2RlXG4gKiAgICAgZWxzZSBpZiAoZGlycyBoYXZlIHYtZm9yKSBmb3JlYWNoIC0+IGNyZWF0ZSBjb250ZXh0XG4gKiAgICAgICAtPiBjb21waWxlKHRlbXBsYXRlV2l0aG91dEZvciwgcGFyZW50Tm9kZSk6IGRpZmYobGlzdCkgb25jaGFuZ2VcbiAqICAgICBlbHNlIGlmIChkaXJzIGhhdmUgdi1pZikgYXNzZXJ0XG4gKiAgICAgICAtPiBjb21waWxlKHRlbXBsYXRlV2l0aG91dElmLCBwYXJlbnROb2RlKTogdG9nZ2xlKHNob3duKSBvbmNoYW5nZVxuICogICAgIGVsc2UgaWYgKHR5cGUgaXMgbmF0aXZlKVxuICogICAgICAgc2V0KGRpcnMpOiB1cGRhdGUoaWQvYXR0ci9zdHlsZS9jbGFzcykgb25jaGFuZ2VcbiAqICAgICAgIGFwcGVuZCh0ZW1wbGF0ZSwgcGFyZW50Tm9kZSlcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBjb21waWxlKGNoaWxkTm9kZSwgdGVtcGxhdGUpXG4gKiAgICAgZWxzZSBpZiAodHlwZSBpcyBjdXN0b20pXG4gKiAgICAgICBhZGRDaGlsZFZtKHZtLCBwYXJlbnRWbSlcbiAqICAgICAgIGJ1aWxkKGV4dGVybmFsRGlycylcbiAqICAgICAgIGZvcmVhY2ggY2hpbGROb2RlcyAtPiBjb21waWxlKGNoaWxkTm9kZSwgdGVtcGxhdGUpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYnVpbGQoKSB7XG4gIGNvbnN0IG9wdCA9IHRoaXMuX29wdGlvbnMgfHwge31cbiAgY29uc3QgdGVtcGxhdGUgPSBvcHQudGVtcGxhdGUgfHwge31cblxuICBpZiAob3B0LnJlcGxhY2UpIHtcbiAgICBpZiAodGVtcGxhdGUuY2hpbGRyZW4gJiYgdGVtcGxhdGUuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuWzBdLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB0aGlzLl9jb21waWxlKHRlbXBsYXRlLmNoaWxkcmVuLCB0aGlzLl9wYXJlbnRFbClcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhpcy5fY29tcGlsZSh0ZW1wbGF0ZSwgdGhpcy5fcGFyZW50RWwpXG4gIH1cblxuICBfLmRlYnVnKGBcInJlYWR5XCIgbGlmZWN5Y2xlIGluIFZtKCR7dGhpcy5fdHlwZX0pYClcbiAgdGhpcy4kZW1pdCgnaG9vazpyZWFkeScpXG4gIHRoaXMuX3JlYWR5ID0gdHJ1ZVxufVxuXG4vKipcbiAqIEdlbmVyYXRlIGVsZW1lbnRzIGJ5IGNoaWxkIG9yIGNoaWxkcmVuIGFuZCBhcHBlbmQgdG8gcGFyZW50IGVsZW1lbnRzLlxuICogUm9vdCBlbGVtZW50IGluZm8gd291bGQgYmUgbWVyZ2VkIGlmIGhhcy4gVGhlIGZpcnN0IGFyZ3VtZW50IG1heSBiZSBhbiBhcnJheVxuICogaWYgdGhlIHJvb3QgZWxlbWVudCB3aXRoIG9wdGlvbnMucmVwbGFjZSBoYXMgbm90IG9ubHkgb25lIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGFycmF5fSB0YXJnZXRcbiAqIEBwYXJhbSB7b2JqZWN0fSAgICAgICBkZXN0XG4gKiBAcGFyYW0ge29iamVjdH0gICAgICAgbWV0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NvbXBpbGUodGFyZ2V0LCBkZXN0LCBtZXRhKSB7XG4gIGxldCBjb250ZXh0ID0gdGhpc1xuICBpZiAoY29udGV4dC5fdGFyZ2V0SXNGcmFnbWVudCh0YXJnZXQpKSB7XG4gICAgY29udGV4dC5fY29tcGlsZUZyYWdtZW50KHRhcmdldCwgZGVzdCwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBtZXRhID0gbWV0YSB8fCB7fVxuICBpZiAoY29udGV4dC5fdGFyZ2V0SXNDb250ZW50KHRhcmdldCkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIFwiY29udGVudFwiIGJsb2NrIGJ5JywgdGFyZ2V0KVxuICAgIGNvbnRleHQuX2NvbnRlbnQgPSBjb250ZXh0Ll9jcmVhdGVCbG9jayhkZXN0KVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGNvbnRleHQuX3RhcmdldE5lZWRDaGVja1JlcGVhdCh0YXJnZXQsIG1ldGEpKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSBcInJlcGVhdFwiIGxvZ2ljIGJ5JywgdGFyZ2V0KVxuICAgIGNvbnRleHQuX2NvbXBpbGVSZXBlYXQodGFyZ2V0LCBkZXN0KVxuICAgIHJldHVyblxuICB9XG4gIGlmIChjb250ZXh0Ll90YXJnZXROZWVkQ2hlY2tTaG93bih0YXJnZXQsIG1ldGEpKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSBcImlmXCIgbG9naWMgYnknLCB0YXJnZXQpXG4gICAgY29udGV4dC5fY29tcGlsZVNob3duKHRhcmdldCwgZGVzdCwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCB0eXBlR2V0dGVyID0gbWV0YS50eXBlIHx8IHRhcmdldC50eXBlXG4gIGlmIChjb250ZXh0Ll90YXJnZXROZWVkQ2hlY2tUeXBlKHR5cGVHZXR0ZXIsIG1ldGEpKSB7XG4gICAgY29udGV4dC5fY29tcGlsZVR5cGUodGFyZ2V0LCBkZXN0LCB0eXBlR2V0dGVyLCBtZXRhKVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHR5cGUgPSB0eXBlR2V0dGVyXG4gIGlmIChjb250ZXh0Ll90YXJnZXRJc0NvbXBvc2VkKHRhcmdldCwgdHlwZSkpIHtcbiAgICBfLmRlYnVnKCdjb21waWxlIGNvbXBvc2VkIGNvbXBvbmVudCBieScsIHRhcmdldClcbiAgICBjb250ZXh0Ll9jb21waWxlQ3VzdG9tQ29tcG9uZW50KHRhcmdldCwgZGVzdCwgdHlwZSwgbWV0YSlcbiAgICByZXR1cm5cbiAgfVxuICBfLmRlYnVnKCdjb21waWxlIG5hdGl2ZSBjb21wb25lbnQgYnknLCB0YXJnZXQpXG4gIGNvbnRleHQuX2NvbXBpbGVOYXRpdmVDb21wb25lbnQodGFyZ2V0LCBkZXN0LCB0eXBlKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBpcyBhIGZyYWdtZW50IChhbiBhcnJheSkuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzRnJhZ21lbnQodGFyZ2V0KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldClcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0YXJnZXQgdHlwZSBpcyBjb250ZW50L3Nsb3QuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSAgdGFyZ2V0XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3RhcmdldElzQ29udGVudCh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldC50eXBlID09PSAnY29udGVudCcgfHwgdGFyZ2V0LnR5cGUgPT09ICdzbG90J1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBsaXN0LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tSZXBlYXQodGFyZ2V0LCBtZXRhKSB7XG4gIHJldHVybiAhbWV0YS5oYXNPd25Qcm9wZXJ0eSgncmVwZWF0JykgJiYgdGFyZ2V0LnJlcGVhdFxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBib29sZWFuIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gIHRhcmdldFxuICogQHBhcmFtICB7b2JqZWN0fSAgbWV0YVxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90YXJnZXROZWVkQ2hlY2tTaG93bih0YXJnZXQsIG1ldGEpIHtcbiAgcmV0dXJuICFtZXRhLmhhc093blByb3BlcnR5KCdzaG93bicpICYmIHRhcmdldC5zaG93blxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRhcmdldCBuZWVkIHRvIGNvbXBpbGUgYnkgYSBkeW5hbWljIHR5cGUuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfGZ1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgIG1ldGFcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0TmVlZENoZWNrVHlwZSh0eXBlR2V0dGVyLCBtZXRhKSB7XG4gIHJldHVybiAodHlwZW9mIHR5cGVHZXR0ZXIgPT09ICdmdW5jdGlvbicpICYmICFtZXRhLmhhc093blByb3BlcnR5KCd0eXBlJylcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGtpbmQgb2YgY29tcG9uZW50IGlzIGNvbXBvc2VkLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gIHR5cGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfdGFyZ2V0SXNDb21wb3NlZCh0YXJnZXQsIHR5cGUpIHtcbiAgaWYgKHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwICYmIHR5cGUpIHtcbiAgICByZXR1cm4gISF0aGlzLl9hcHAuY3VzdG9tQ29tcG9uZW50TWFwW3R5cGVdXG4gIH1cbiAgcmV0dXJuICEhdGFyZ2V0LmNvbXBvbmVudFxufVxuXG4vKipcbiAqIENvbXBpbGUgYSBsaXN0IG9mIHRhcmdldHMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZUZyYWdtZW50KHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuICB0YXJnZXQuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICB0aGlzLl9jb21waWxlKGNoaWxkLCBmcmFnQmxvY2ssIG1ldGEpXG4gIH0pXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIHJlcGVhdCBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlUmVwZWF0KHRhcmdldCwgZGVzdCkge1xuICBjb25zdCByZXBlYXQgPSB0YXJnZXQucmVwZWF0XG4gIGNvbnN0IG9sZFN0eWxlID0gdHlwZW9mIHJlcGVhdCA9PT0gJ2Z1bmN0aW9uJ1xuICBsZXQgZ2V0dGVyID0gcmVwZWF0LmdldHRlciB8fCByZXBlYXQuZXhwcmVzc2lvbiB8fCByZXBlYXRcbiAgaWYgKHR5cGVvZiBnZXR0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICBnZXR0ZXIgPSBmdW5jdGlvbiAoKSB7cmV0dXJuIFtdfVxuICB9XG4gIGNvbnN0IGtleSA9IHJlcGVhdC5rZXkgfHwgJyRpbmRleCdcbiAgY29uc3QgdmFsdWUgPSByZXBlYXQudmFsdWUgfHwgJyR2YWx1ZSdcbiAgY29uc3QgdHJhY2tCeSA9IHJlcGVhdC50cmFja0J5IHx8IHRhcmdldC50cmFja0J5IHx8XG4gICAgKHRhcmdldC5hdHRyICYmIHRhcmdldC5hdHRyLnRyYWNrQnkpIHx8IGtleVxuXG4gIGNvbnN0IGZyYWdCbG9jayA9IHRoaXMuX2NyZWF0ZUJsb2NrKGRlc3QpXG4gIGZyYWdCbG9jay5jaGlsZHJlbiA9IFtdXG4gIGZyYWdCbG9jay5kYXRhID0gW11cbiAgZnJhZ0Jsb2NrLnZtcyA9IFtdXG5cbiAgdGhpcy5fYmluZFJlcGVhdCh0YXJnZXQsIGZyYWdCbG9jaywge2dldHRlciwga2V5LCB2YWx1ZSwgdHJhY2tCeSwgb2xkU3R5bGV9KVxufVxuXG4vKipcbiAqIENvbXBpbGUgYSB0YXJnZXQgd2l0aCBpZiBkaXJlY3RpdmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBtZXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVNob3duKHRhcmdldCwgZGVzdCwgbWV0YSkge1xuICBjb25zdCBuZXdNZXRhID0ge3Nob3duOiB0cnVlfVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICBpZiAobWV0YS5yZXBlYXQpIHtcbiAgICBuZXdNZXRhLnJlcGVhdCA9IG1ldGEucmVwZWF0XG4gIH1cblxuICB0aGlzLl9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHRhcmdldCB3aXRoIGR5bmFtaWMgY29tcG9uZW50IHR5cGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9ICAgdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gICBkZXN0XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0eXBlR2V0dGVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfY29tcGlsZVR5cGUodGFyZ2V0LCBkZXN0LCB0eXBlR2V0dGVyLCBtZXRhKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlR2V0dGVyLmNhbGwodGhpcylcbiAgY29uc3QgbmV3TWV0YSA9IE9iamVjdC5hc3NpZ24oe3R5cGV9LCBtZXRhKVxuICBjb25zdCBmcmFnQmxvY2sgPSB0aGlzLl9jcmVhdGVCbG9jayhkZXN0KVxuXG4gIGlmIChkZXN0LmVsZW1lbnQgJiYgZGVzdC5jaGlsZHJlbikge1xuICAgIGRlc3QuY2hpbGRyZW4ucHVzaChmcmFnQmxvY2spXG4gIH1cblxuICB0aGlzLl93YXRjaCh0eXBlR2V0dGVyLCAodmFsdWUpID0+IHtcbiAgICBjb25zdCBuZXdNZXRhID0gT2JqZWN0LmFzc2lnbih7dHlwZTogdmFsdWV9LCBtZXRhKVxuICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBuZXdNZXRhKVxuICB9KVxuXG4gIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG5ld01ldGEpXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIGNvbXBvc2VkIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ3VzdG9tQ29tcG9uZW50KHRhcmdldCwgZGVzdCwgdHlwZSwgbWV0YSkge1xuICBjb25zdCBWbSA9IHRoaXMuY29uc3RydWN0b3JcbiAgY29uc3QgY29udGV4dCA9IHRoaXNcbiAgY29uc3Qgc3ViVm0gPSBuZXcgVm0odHlwZSwgY29udGV4dCwgZGVzdCwgdW5kZWZpbmVkLCB7XG4gICAgJ2hvb2s6aW5pdCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnRleHQuX3NldElkKHRhcmdldC5pZCwgbnVsbCwgdGhpcylcbiAgICB9LFxuICAgICdob29rOmNyZWF0ZWQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb250ZXh0Ll9iaW5kU3ViVm0odGhpcywgdGFyZ2V0LCBtZXRhLnJlcGVhdClcbiAgICB9LFxuICAgICdob29rOnJlYWR5JzogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgICAgY29udGV4dC5fY29tcGlsZUNoaWxkcmVuKHRhcmdldCwgdGhpcy5fY29udGVudClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHRoaXMuX2JpbmRTdWJWbUFmdGVySW5pdGlhbGl6ZWQoc3ViVm0sIHRhcmdldClcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBlbGVtZW50IGZyb20gdGVtcGxhdGUgYW5kIGF0dGFjaCB0byB0aGUgZGVzdCBpZiBuZWVkZWQuXG4gKiBUaGUgdGltZSB0byBhdHRhY2ggZGVwZW5kcyBvbiB3aGV0aGVyIHRoZSBtb2RlIHN0YXR1cyBpcyBub2RlIG9yIHRyZWUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRlbXBsYXRlXG4gKiBAcGFyYW0ge29iamVjdH0gZGVzdFxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlTmF0aXZlQ29tcG9uZW50KHRlbXBsYXRlLCBkZXN0LCB0eXBlKSB7XG5cbiAgdGhpcy5fYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zKHRlbXBsYXRlKVxuXG4gIGxldCBlbGVtZW50XG4gIGlmIChkZXN0LnJlZiA9PT0gJ19kb2N1bWVudEVsZW1lbnQnKSB7XG4gICAgLy8gaWYgaXRzIHBhcmVudCBpcyBkb2N1bWVudEVsZW1lbnQgdGhlbiBpdCdzIGEgYm9keVxuICAgIF8uZGVidWcoJ2NvbXBpbGUgdG8gY3JlYXRlIGJvZHkgZm9yJywgdHlwZSlcbiAgICBlbGVtZW50ID0gdGhpcy5fY3JlYXRlQm9keSh0eXBlKVxuICB9IGVsc2Uge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgdG8gY3JlYXRlIGVsZW1lbnQgZm9yJywgdHlwZSlcbiAgICBlbGVtZW50ID0gdGhpcy5fY3JlYXRlRWxlbWVudCh0eXBlKVxuICB9XG4gIC8vIFRPRE8gaXQgd2FzIGEgcm9vdCBlbGVtZW50IHdoZW4gbm90IGluIGEgZnJhZ21lbnRcbiAgaWYgKCF0aGlzLl9yb290RWwpIHtcbiAgICB0aGlzLl9yb290RWwgPSBlbGVtZW50XG4gIH1cblxuICB0aGlzLl9iaW5kRWxlbWVudChlbGVtZW50LCB0ZW1wbGF0ZSlcblxuICBpZiAodGVtcGxhdGUuYXR0ciAmJiB0ZW1wbGF0ZS5hdHRyLmFwcGVuZCkgeyAvLyBiYWNrd2FyZCwgYXBwZW5kIHByb3AgaW4gYXR0clxuICAgIHRlbXBsYXRlLmFwcGVuZCA9IHRlbXBsYXRlLmF0dHIuYXBwZW5kXG4gIH1cblxuICBpZiAodGVtcGxhdGUuYXBwZW5kKSB7IC8vIGdpdmUgdGhlIGFwcGVuZCBhdHRyaWJ1dGUgZm9yIGlvcyBhZGFwdGF0aW9uXG4gICAgZWxlbWVudC5hdHRyID0gZWxlbWVudC5hdHRyIHx8IHt9XG4gICAgZWxlbWVudC5hdHRyLmFwcGVuZCA9IHRlbXBsYXRlLmFwcGVuZFxuICB9XG5cbiAgY29uc3QgdHJlZU1vZGUgPSB0ZW1wbGF0ZS5hcHBlbmQgPT09ICd0cmVlJ1xuICBpZiAoIXRyZWVNb2RlKSB7XG4gICAgXy5kZWJ1ZygnY29tcGlsZSB0byBhcHBlbmQgc2luZ2xlIG5vZGUgZm9yJywgZWxlbWVudClcbiAgICB0aGlzLl9hdHRhY2hUYXJnZXQoZWxlbWVudCwgZGVzdClcbiAgfVxuICB0aGlzLl9jb21waWxlQ2hpbGRyZW4odGVtcGxhdGUsIGVsZW1lbnQpXG4gIGlmICh0cmVlTW9kZSkge1xuICAgIF8uZGVidWcoJ2NvbXBpbGUgdG8gYXBwZW5kIHdob2xlIHRyZWUgZm9yJywgZWxlbWVudClcbiAgICB0aGlzLl9hdHRhY2hUYXJnZXQoZWxlbWVudCwgZGVzdClcbiAgfVxufVxuXG4vKipcbiAqIFNldCBhbGwgY2hpbGRyZW4gdG8gYSBjZXJ0YWluIHBhcmVudCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0ZW1wbGF0ZVxuICogQHBhcmFtIHtvYmplY3R9IGRlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jb21waWxlQ2hpbGRyZW4odGVtcGxhdGUsIGRlc3QpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0ZW1wbGF0ZS5jaGlsZHJlblxuICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIHRoaXMuX2NvbXBpbGUoY2hpbGQsIGRlc3QpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIFdhdGNoIHRoZSBsaXN0IHVwZGF0ZSBhbmQgcmVmcmVzaCB0aGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge29iamVjdH0gZnJhZ0Jsb2NrIHt2bXMsIGRhdGEsIGNoaWxkcmVufVxuICogQHBhcmFtIHtvYmplY3R9IGluZm8gICAgICB7Z2V0dGVyLCBrZXksIHZhbHVlLCB0cmFja0J5LCBvbGRTdHlsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kUmVwZWF0KHRhcmdldCwgZnJhZ0Jsb2NrLCBpbmZvKSB7XG4gIGNvbnN0IHZtcyA9IGZyYWdCbG9jay52bXNcbiAgY29uc3QgY2hpbGRyZW4gPSBmcmFnQmxvY2suY2hpbGRyZW5cbiAgY29uc3Qge2dldHRlciwgdHJhY2tCeSwgb2xkU3R5bGV9ID0gaW5mb1xuICBjb25zdCBrZXlOYW1lID0gaW5mby5rZXlcbiAgY29uc3QgdmFsdWVOYW1lID0gaW5mby52YWx1ZVxuXG4gIGZ1bmN0aW9uIGNvbXBpbGVJdGVtKGl0ZW0sIGluZGV4LCBjb250ZXh0KSB7XG4gICAgbGV0IG1lcmdlZERhdGFcbiAgICBpZiAob2xkU3R5bGUpIHtcbiAgICAgIG1lcmdlZERhdGEgPSBpdGVtXG4gICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG1lcmdlZERhdGFba2V5TmFtZV0gPSBpbmRleFxuICAgICAgICBpZiAoIW1lcmdlZERhdGEuaGFzT3duUHJvcGVydHkoJ0lOREVYJykpIHtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWVyZ2VkRGF0YSwgJ0lOREVYJywge1xuICAgICAgICAgICAgdmFsdWU6ICgpID0+IHtcbiAgICAgICAgICAgICAgXy53YXJuKCdcIklOREVYXCIgaW4gcmVwZWF0IGlzIGRlcHJlY2F0ZWQsJyArXG4gICAgICAgICAgICAgICAgJyBwbGVhc2UgdXNlIFwiJGluZGV4XCIgaW5zdGVhZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG1lcmdlZERhdGEgPSB7fVxuICAgICAgbWVyZ2VkRGF0YVtrZXlOYW1lXSA9IGluZGV4XG4gICAgICBtZXJnZWREYXRhW3ZhbHVlTmFtZV0gPSBpdGVtXG4gICAgfVxuICAgIGNvbnRleHQgPSBjb250ZXh0Ll9tZXJnZUNvbnRleHQobWVyZ2VkRGF0YSlcbiAgICB2bXMucHVzaChjb250ZXh0KVxuICAgIGNvbnRleHQuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIHtyZXBlYXQ6IGl0ZW19KVxuICB9XG5cbiAgY29uc3QgbGlzdCA9IHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCBnZXR0ZXIsICdyZXBlYXQnLFxuICAgIChkYXRhKSA9PiB7XG4gICAgICBfLmRlYnVnKCd0aGUgXCJyZXBlYXRcIiBpdGVtIGhhcyBjaGFuZ2VkJywgZGF0YSlcblxuICAgICAgaWYgKCFmcmFnQmxvY2spIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9sZENoaWxkcmVuID0gY2hpbGRyZW4uc2xpY2UoKVxuICAgICAgY29uc3Qgb2xkVm1zID0gdm1zLnNsaWNlKClcbiAgICAgIGNvbnN0IG9sZERhdGEgPSBmcmFnQmxvY2suZGF0YS5zbGljZSgpXG4gICAgICAvLyAxLiBjb2xsZWN0IGFsbCBuZXcgcmVmcyB0cmFjayBieVxuICAgICAgY29uc3QgdHJhY2tNYXAgPSB7fVxuICAgICAgY29uc3QgcmV1c2VkTWFwID0ge31cbiAgICAgIGRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gdHJhY2tCeSA/IGl0ZW1bdHJhY2tCeV0gOiBpbmRleFxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgICAgaWYgKGtleSA9PSBudWxsIHx8IGtleSA9PT0gJycpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0cmFja01hcFtrZXldID0gaXRlbVxuICAgICAgfSlcblxuICAgICAgLy8gMi4gcmVtb3ZlIHVudXNlZCBlbGVtZW50IGZvcmVhY2ggb2xkIGl0ZW1cbiAgICAgIGNvbnN0IHJldXNlZExpc3QgPSBbXVxuICAgICAgb2xkRGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSB0cmFja0J5ID8gaXRlbVt0cmFja0J5XSA6IGluZGV4XG4gICAgICAgIGlmICh0cmFja01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgcmV1c2VkTWFwW2tleV0gPSB7XG4gICAgICAgICAgICBpdGVtLCBpbmRleCwga2V5LFxuICAgICAgICAgICAgdGFyZ2V0OiBvbGRDaGlsZHJlbltpbmRleF0sXG4gICAgICAgICAgICB2bTogb2xkVm1zW2luZGV4XVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXVzZWRMaXN0LnB1c2goaXRlbSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVUYXJnZXQob2xkQ2hpbGRyZW5baW5kZXhdKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyAzLiBjcmVhdGUgbmV3IGVsZW1lbnQgZm9yZWFjaCBuZXcgaXRlbVxuICAgICAgY2hpbGRyZW4ubGVuZ3RoID0gMFxuICAgICAgdm1zLmxlbmd0aCA9IDBcbiAgICAgIGZyYWdCbG9jay5kYXRhID0gZGF0YS5zbGljZSgpXG4gICAgICBmcmFnQmxvY2sudXBkYXRlTWFyayA9IGZyYWdCbG9jay5zdGFydFxuXG4gICAgICBkYXRhLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IHRyYWNrQnkgPyBpdGVtW3RyYWNrQnldIDogaW5kZXhcbiAgICAgICAgY29uc3QgcmV1c2VkID0gcmV1c2VkTWFwW2tleV1cbiAgICAgICAgaWYgKHJldXNlZCkge1xuICAgICAgICAgIGlmIChyZXVzZWQuaXRlbSA9PT0gcmV1c2VkTGlzdFswXSkge1xuICAgICAgICAgICAgcmV1c2VkTGlzdC5zaGlmdCgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldXNlZExpc3QuJHJlbW92ZShyZXVzZWQuaXRlbSlcbiAgICAgICAgICAgIHRoaXMuX21vdmVUYXJnZXQocmV1c2VkLnRhcmdldCwgZnJhZ0Jsb2NrLnVwZGF0ZU1hcmssIHRydWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkcmVuLnB1c2gocmV1c2VkLnRhcmdldClcbiAgICAgICAgICB2bXMucHVzaChyZXVzZWQudm0pXG4gICAgICAgICAgcmV1c2VkLnZtW2tleU5hbWVdID0gaW5kZXhcbiAgICAgICAgICBmcmFnQmxvY2sudXBkYXRlTWFyayA9IHJldXNlZC50YXJnZXRcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZGVsZXRlIGZyYWdCbG9jay51cGRhdGVNYXJrXG4gICAgfVxuICApXG5cbiAgZnJhZ0Jsb2NrLmRhdGEgPSBsaXN0LnNsaWNlKDApXG4gIGxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICBjb21waWxlSXRlbShpdGVtLCBpbmRleCwgdGhpcylcbiAgfSlcbn1cblxuLyoqXG4gKiBXYXRjaCB0aGUgZGlzcGxheSB1cGRhdGUgYW5kIGFkZC9yZW1vdmUgdGhlIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZnJhZ0Jsb2NrXG4gKiBAcGFyYW0gIHtvYmplY3R9IGNvbnRleHRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kU2hvd24odGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpIHtcbiAgY29uc3QgZGlzcGxheSA9IHRoaXMuX3dhdGNoQmxvY2soZnJhZ0Jsb2NrLCB0YXJnZXQuc2hvd24sICdzaG93bicsXG4gICAgKGRpc3BsYXkpID0+IHtcbiAgICAgIF8uZGVidWcoJ3RoZSBcImlmXCIgaXRlbSB3YXMgY2hhbmdlZCcsIGRpc3BsYXkpXG5cbiAgICAgIGlmICghZnJhZ0Jsb2NrIHx8ICEhZnJhZ0Jsb2NrLmRpc3BsYXkgPT09ICEhZGlzcGxheSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGZyYWdCbG9jay5kaXNwbGF5ID0gISFkaXNwbGF5XG4gICAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICB0aGlzLl9jb21waWxlKHRhcmdldCwgZnJhZ0Jsb2NrLCBtZXRhKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUJsb2NrKGZyYWdCbG9jaywgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIClcblxuICBmcmFnQmxvY2suZGlzcGxheSA9ICEhZGlzcGxheVxuICBpZiAoZGlzcGxheSkge1xuICAgIHRoaXMuX2NvbXBpbGUodGFyZ2V0LCBmcmFnQmxvY2ssIG1ldGEpXG4gIH1cbn1cblxuLyoqXG4gKiBXYXRjaCBjYWxjIHZhbHVlIGNoYW5nZXMgYW5kIGFwcGVuZCBjZXJ0YWluIHR5cGUgYWN0aW9uIHRvIGRpZmZlci5cbiAqIEl0IGlzIHVzZWQgZm9yIGlmIG9yIHJlcGVhdCBkYXRhLWJpbmRpbmcgZ2VuZXJhdG9yLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxjXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgdHlwZVxuICogQHBhcmFtICB7ZnVuY3Rpb259IGhhbmRsZXJcbiAqIEByZXR1cm4ge2FueX0gICAgICBpbml0IHZhbHVlIG9mIGNhbGNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaEJsb2NrKGZyYWdCbG9jaywgY2FsYywgdHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBkaWZmZXIgPSB0aGlzICYmIHRoaXMuX2FwcCAmJiB0aGlzLl9hcHAuZGlmZmVyXG4gIGNvbnN0IGNvbmZpZyA9IHt9XG4gIGNvbnN0IGRlcHRoID0gKGZyYWdCbG9jay5lbGVtZW50LmRlcHRoIHx8IDApICsgMVxuXG4gIHJldHVybiB0aGlzLl93YXRjaChjYWxjLCAodmFsdWUpID0+IHtcbiAgICBjb25maWcubGF0ZXN0VmFsdWUgPSB2YWx1ZVxuICAgIGlmIChkaWZmZXIgJiYgIWNvbmZpZy5yZWNvcmRlZCkge1xuICAgICAgZGlmZmVyLmFwcGVuZCh0eXBlLCBkZXB0aCwgZnJhZ0Jsb2NrLmJsb2NrSWQsICgpID0+IHtcbiAgICAgICAgY29uc3QgbGF0ZXN0VmFsdWUgPSBjb25maWcubGF0ZXN0VmFsdWVcbiAgICAgICAgaGFuZGxlcihsYXRlc3RWYWx1ZSlcbiAgICAgICAgY29uZmlnLnJlY29yZGVkID0gZmFsc2VcbiAgICAgICAgY29uZmlnLmxhdGVzdFZhbHVlID0gdW5kZWZpbmVkXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25maWcucmVjb3JkZWQgPSB0cnVlXG4gIH0pXG59XG5cbi8qKlxuICogQ2xvbmUgYSBjb250ZXh0IGFuZCBtZXJnZSBjZXJ0YWluIGRhdGEuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBtZXJnZWREYXRhXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbWVyZ2VDb250ZXh0KG1lcmdlZERhdGEpIHtcbiAgY29uc3QgY29udGV4dCA9IE9iamVjdC5jcmVhdGUodGhpcylcbiAgY29udGV4dC5fZGF0YSA9IG1lcmdlZERhdGFcbiAgY29udGV4dC5faW5pdERhdGEoKVxuICBjb250ZXh0Ll9pbml0Q29tcHV0ZWQoKVxuICBjb250ZXh0Ll9yZWFsUGFyZW50ID0gdGhpc1xuICByZXR1cm4gY29udGV4dFxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vY29tcGlsZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIERpcmVjdGl2ZSBQYXJzZXJcbiAqL1xuXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbmltcG9ydCBXYXRjaGVyIGZyb20gJy4vd2F0Y2hlcidcbmltcG9ydCB7bmF0aXZlQ29tcG9uZW50TWFwfSBmcm9tICcuLi9jb25maWcnXG5cbmNvbnN0IFNFVFRFUlMgPSB7XG4gIGF0dHI6ICdzZXRBdHRyJyxcbiAgc3R5bGU6ICdzZXRTdHlsZScsXG4gIGV2ZW50OiAnYWRkRXZlbnQnXG59XG5cbi8qKlxuICogYXBwbHkgdGhlIG5hdGl2ZSBjb21wb25lbnQncyBvcHRpb25zKHNwZWNpZmllZCBieSB0ZW1wbGF0ZS50eXBlKVxuICogdG8gdGhlIHRlbXBsYXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYXBwbHlOYWl0dmVDb21wb25lbnRPcHRpb25zKHRlbXBsYXRlKSB7XG4gIGNvbnN0IHt0eXBlfSA9IHRlbXBsYXRlXG4gIGNvbnN0IG9wdGlvbnMgPSBuYXRpdmVDb21wb25lbnRNYXBbdHlwZV1cblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgXy5leHRlbmQodGVtcGxhdGUsIG9wdGlvbnMpXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGFsbCBpZCwgYXR0ciwgY2xhc3NuYW1lcywgc3R5bGUsIGV2ZW50cyB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEVsZW1lbnQoZWwsIHRlbXBsYXRlKSB7XG4gIHRoaXMuX3NldElkKHRlbXBsYXRlLmlkLCBlbCwgdGhpcylcbiAgdGhpcy5fc2V0QXR0cihlbCwgdGVtcGxhdGUuYXR0cilcbiAgdGhpcy5fc2V0Q2xhc3MoZWwsIHRlbXBsYXRlLmNsYXNzTGlzdClcbiAgdGhpcy5fc2V0U3R5bGUoZWwsIHRlbXBsYXRlLnN0eWxlKVxuICB0aGlzLl9iaW5kRXZlbnRzKGVsLCB0ZW1wbGF0ZS5ldmVudHMpXG59XG5cbi8qKlxuICogYmluZCBhbGwgcHJvcHMgdG8gc3ViIHZtIGFuZCBiaW5kIGFsbCBzdHlsZSwgZXZlbnRzIHRvIHRoZSByb290IGVsZW1lbnRcbiAqIG9mIHRoZSBzdWIgdm0gaWYgaXQgZG9lc24ndCBoYXZlIGEgcmVwbGFjZWQgbXVsdGktbm9kZSBmcmFnbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmRTdWJWbShzdWJWbSwgdGVtcGxhdGUsIHJlcGVhdEl0ZW0pIHtcbiAgc3ViVm0gPSBzdWJWbSB8fCB7fVxuICB0ZW1wbGF0ZSA9IHRlbXBsYXRlIHx8IHt9XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHN1YlZtLl9vcHRpb25zIHx8IHt9XG5cbiAgLy8gYmluZCBwcm9wc1xuICBsZXQgcHJvcHMgPSBvcHRpb25zLnByb3BzXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcHMpKSB7XG4gICAgcHJvcHMgPSBwcm9wcy5yZWR1Y2UoKHJlc3VsdCwgdmFsdWUpID0+IHtcbiAgICAgIHJlc3VsdFt2YWx1ZV0gPSB0cnVlXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSwge30pXG4gIH1cblxuICBtZXJnZVByb3BzKHJlcGVhdEl0ZW0sIHByb3BzLCB0aGlzLCBzdWJWbSlcbiAgbWVyZ2VQcm9wcyh0ZW1wbGF0ZS5hdHRyLCBwcm9wcywgdGhpcywgc3ViVm0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfYmluZFN1YlZtQWZ0ZXJJbml0aWFsaXplZChzdWJWbSwgdGVtcGxhdGUpIHtcbiAgbWVyZ2VDbGFzc1N0eWxlKHRlbXBsYXRlLmNsYXNzTGlzdCwgdGhpcywgc3ViVm0pXG4gIG1lcmdlU3R5bGUodGVtcGxhdGUuc3R5bGUsIHRoaXMsIHN1YlZtKVxuICBtZXJnZUV2ZW50KHRlbXBsYXRlLmV2ZW50cywgdGhpcywgc3ViVm0pXG59XG5cbmZ1bmN0aW9uIG1lcmdlUHJvcHModGFyZ2V0LCBwcm9wcywgdm0sIHN1YlZtKSB7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgZm9yIChjb25zdCBrZXkgaW4gdGFyZ2V0KSB7XG4gICAgaWYgKCFwcm9wcyB8fCBwcm9wc1trZXldKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtrZXldXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gdm0uX3dhdGNoKHZhbHVlLCBmdW5jdGlvbiAodikge1xuICAgICAgICAgIHN1YlZtW2tleV0gPSB2XG4gICAgICAgIH0pXG4gICAgICAgIHN1YlZtW2tleV0gPSByZXR1cm5WYWx1ZVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN1YlZtW2tleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZVN0eWxlKHRhcmdldCwgdm0sIHN1YlZtKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIHRhcmdldCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGFyZ2V0W2tleV1cbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IHZtLl93YXRjaCh2YWx1ZSwgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHN1YlZtLl9yb290RWwpIHtcbiAgICAgICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHN1YlZtLl9yb290RWwuc2V0U3R5bGUoa2V5LCByZXR1cm5WYWx1ZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoc3ViVm0uX3Jvb3RFbCkge1xuICAgICAgICBzdWJWbS5fcm9vdEVsLnNldFN0eWxlKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlQ2xhc3NTdHlsZSh0YXJnZXQsIHZtLCBzdWJWbSkge1xuICB2YXIgY3NzID0gdm0uX29wdGlvbnMgJiYgdm0uX29wdGlvbnMuc3R5bGUgfHwge31cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFzdWJWbS5fcm9vdEVsKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHZhbHVlID0gdm0uX3dhdGNoKHRhcmdldCwgIHYgPT4ge1xuICAgICAgc2V0Q2xhc3NTdHlsZShzdWJWbS5fcm9vdEVsLCBjc3MsIHYpXG4gICAgfSlcbiAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdmFsdWUpXG4gIH0gZWxzZSBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICBzZXRDbGFzc1N0eWxlKHN1YlZtLl9yb290RWwsIGNzcywgdGFyZ2V0KVxuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlRXZlbnQodGFyZ2V0LCB2bSwgc3ViVm0pIHtcbiAgaWYgKHRhcmdldCAmJiBzdWJWbS5fcm9vdEVsKSB7XG4gICAgZm9yIChjb25zdCB0eXBlIGluIHRhcmdldCkge1xuICAgICAgY29uc3QgaGFuZGxlciA9IHZtW3RhcmdldFt0eXBlXV1cbiAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIHN1YlZtLl9yb290RWwuYWRkRXZlbnQodHlwZSwgXy5iaW5kKGhhbmRsZXIsIHZtKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGlkIHRvIGFuIGVsZW1lbnRcbiAqIGVhY2ggaWQgaXMgdW5pcXVlIGluIGEgd2hvbGUgdm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9zZXRJZChpZCwgZWwsIHZtKSB7XG4gIGNvbnN0IG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhtYXAsIHtcbiAgICB2bToge1xuICAgICAgdmFsdWU6IHZtLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG4gICAgZWw6IHtcbiAgICAgIGdldDogKCkgPT4gZWwgfHwgdm0uX3Jvb3RFbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgaWYgKHR5cGVvZiBpZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGhhbmRsZXIgPSBpZFxuICAgIGlkID0gaGFuZGxlci5jYWxsKHRoaXMpXG4gICAgaWYgKGlkKSB7XG4gICAgICB0aGlzLl9pZHNbaWRdID0gbWFwXG4gICAgfVxuICAgIHRoaXMuX3dhdGNoKGhhbmRsZXIsIChuZXdJZCkgPT4ge1xuICAgICAgaWYgKG5ld0lkKSB7XG4gICAgICAgIHRoaXMuX2lkc1tuZXdJZF0gPSBtYXBcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGVsc2UgaWYgKGlkICYmIHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcbiAgICB0aGlzLl9pZHNbaWRdID0gbWFwXG4gIH1cbn1cblxuLyoqXG4gKiBiaW5kIGF0dHIgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldEF0dHIoZWwsIGF0dHIpIHtcbiAgdGhpcy5fYmluZERpcihlbCwgJ2F0dHInLCBhdHRyKVxufVxuXG5mdW5jdGlvbiBzZXRDbGFzc1N0eWxlKGVsLCBjc3MsIGNsYXNzTGlzdCkge1xuICBjb25zdCBjbGFzc1N0eWxlID0ge31cbiAgY29uc3QgbGVuZ3RoID0gY2xhc3NMaXN0Lmxlbmd0aFxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzdHlsZSA9IGNzc1tjbGFzc0xpc3RbaV1dXG4gICAgaWYgKHN0eWxlKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBzdHlsZSkge1xuICAgICAgICBjbGFzc1N0eWxlW2tleV0gPSBzdHlsZVtrZXldXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsLnNldENsYXNzU3R5bGUoY2xhc3NTdHlsZSlcbn1cblxuLyoqXG4gKiBiaW5kIGNsYXNzbmFtZXMgdG8gYW4gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldENsYXNzKGVsLCBjbGFzc0xpc3QpIHtcblxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCAhPT0gJ2Z1bmN0aW9uJyAmJiAhQXJyYXkuaXNBcnJheShjbGFzc0xpc3QpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2xhc3NMaXN0KSAmJiAhY2xhc3NMaXN0Lmxlbmd0aCkge1xuICAgIGVsLnNldENsYXNzU3R5bGUoe30pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBzdHlsZSA9IHRoaXMuX29wdGlvbnMgJiYgdGhpcy5fb3B0aW9ucy5zdHlsZSB8fCB7fVxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fd2F0Y2goY2xhc3NMaXN0LCAgdiA9PiB7XG4gICAgICBzZXRDbGFzc1N0eWxlKGVsLCBzdHlsZSwgdilcbiAgICB9KVxuICAgIHNldENsYXNzU3R5bGUoZWwsIHN0eWxlLCB2YWx1ZSlcbiAgfVxuICBlbHNlIHtcbiAgICBzZXRDbGFzc1N0eWxlKGVsLCBzdHlsZSwgY2xhc3NMaXN0KVxuICB9XG59XG5cbi8qKlxuICogYmluZCBzdHlsZSB0byBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfc2V0U3R5bGUoZWwsIHN0eWxlKSB7XG4gIHRoaXMuX2JpbmREaXIoZWwsICdzdHlsZScsIHN0eWxlKVxufVxuXG4vKipcbiAqIGFkZCBhbiBldmVudCB0eXBlIGFuZCBoYW5kbGVyIHRvIGFuIGVsZW1lbnQgYW5kIGdlbmVyYXRlIGEgZG9tIHVwZGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3NldEV2ZW50KGVsLCB0eXBlLCBoYW5kbGVyKSB7XG4gIGVsLmFkZEV2ZW50KHR5cGUsIF8uYmluZChoYW5kbGVyLCB0aGlzKSlcbn1cblxuLyoqXG4gKiBhZGQgYWxsIGV2ZW50cyBvZiBhbiBlbGVtZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfYmluZEV2ZW50cyhlbCwgZXZlbnRzKSB7XG4gIGlmICghZXZlbnRzKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cylcbiAgbGV0IGkgPSBrZXlzLmxlbmd0aFxuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXVxuICAgIGxldCBoYW5kbGVyID0gZXZlbnRzW2tleV1cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICBoYW5kbGVyID0gdGhpc1toYW5kbGVyXVxuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgXy5lcnJvcihgVGhlIG1ldGhvZCBcIiR7aGFuZGxlcn1cIiBpcyBub3QgZGVmaW5lZC5gKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zZXRFdmVudChlbCwga2V5LCBoYW5kbGVyKVxuICB9XG59XG5cbi8qKlxuICogc2V0IGEgc2VyaWVzIG9mIG1lbWJlcnMgYXMgYSBraW5kIG9mIGFuIGVsZW1lbnRcbiAqIGZvciBleGFtcGxlOiBzdHlsZSwgYXR0ciwgLi4uXG4gKiBpZiB0aGUgdmFsdWUgaXMgYSBmdW5jdGlvbiB0aGVuIGJpbmQgdGhlIGRhdGEgY2hhbmdlc1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2JpbmREaXIoZWwsIG5hbWUsIGRhdGEpIHtcbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGRhdGEpXG4gIGxldCBpID0ga2V5cy5sZW5ndGhcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV1cbiAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2JpbmRLZXkoZWwsIG5hbWUsIGtleSwgdmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsW1NFVFRFUlNbbmFtZV1dKGtleSwgdmFsdWUpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogYmluZCBkYXRhIGNoYW5nZXMgdG8gYSBjZXJ0YWluIGtleSB0byBhIG5hbWUgc2VyaWVzIGluIGFuIGVsZW1lbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9iaW5kS2V5KGVsLCBuYW1lLCBrZXksIGNhbGMpIHtcbiAgY29uc3QgbWV0aG9kTmFtZSA9IFNFVFRFUlNbbmFtZV1cbiAgY29uc3Qgb2JqID0gZWxbbmFtZV1cbiAgLy8gd2F0Y2ggdGhlIGNhbGMsIGFuZCByZXR1cm5zIGEgdmFsdWUgYnkgY2FsYy5jYWxsKClcbiAgY29uc3QgdmFsdWUgPSB0aGlzLl93YXRjaChjYWxjLCAodmFsdWUpID0+IHtcbiAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbiAgICB9XG4gICAgY29uc3QgZGlmZmVyID0gdGhpcyAmJiB0aGlzLl9hcHAgJiYgdGhpcy5fYXBwLmRpZmZlclxuICAgIGlmIChkaWZmZXIpIHtcbiAgICAgIGRpZmZlci5hcHBlbmQoJ2VsZW1lbnQnLCBlbC5kZXB0aCwgZWwucmVmLCBoYW5kbGVyKVxuICAgIH0gZWxzZSB7XG4gICAgICBoYW5kbGVyKClcbiAgICB9XG4gIH0pXG5cbiAgZWxbbWV0aG9kTmFtZV0oa2V5LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiB3YXRjaCBhIGNhbGMgZnVuY3Rpb24gYW5kIGNhbGxiYWNrIGlmIHRoZSBjYWxjIHZhbHVlIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF93YXRjaChjYWxjLCBjYWxsYmFjaykge1xuICBjb25zdCB3YXRjaGVyID0gbmV3IFdhdGNoZXIodGhpcywgY2FsYywgZnVuY3Rpb24gKHZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHZhbHVlID09PSBvbGRWYWx1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNhbGxiYWNrKHZhbHVlKVxuICB9KVxuXG4gIHJldHVybiB3YXRjaGVyLnZhbHVlXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9kaXJlY3RpdmUuanNcbiAqKi8iLCIvKipcbiAqIFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMy0yMDE1IFl1eGkgRXZhbiBZb3VcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBfID0gcmVxdWlyZSgnLi91dGlsJylcbi8vIHZhciBjb25maWcgPSByZXF1aXJlKCcuL2NvbmZpZycpXG52YXIgT2JzZXJ2ZXIgPSByZXF1aXJlKCcuL29ic2VydmVyJylcbi8vIHZhciBleHBQYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcnMvZXhwcmVzc2lvbicpXG4vLyB2YXIgYmF0Y2hlciA9IHJlcXVpcmUoJy4vYmF0Y2hlcicpXG52YXIgdWlkID0gMFxuXG4vKipcbiAqIEEgd2F0Y2hlciBwYXJzZXMgYW4gZXhwcmVzc2lvbiwgY29sbGVjdHMgZGVwZW5kZW5jaWVzLFxuICogYW5kIGZpcmVzIGNhbGxiYWNrIHdoZW4gdGhlIGV4cHJlc3Npb24gdmFsdWUgY2hhbmdlcy5cbiAqIFRoaXMgaXMgdXNlZCBmb3IgYm90aCB0aGUgJHdhdGNoKCkgYXBpIGFuZCBkaXJlY3RpdmVzLlxuICpcbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtTdHJpbmd9IGV4cHJlc3Npb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNiXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogICAgICAgICAgICAgICAgIC0ge0FycmF5fSBmaWx0ZXJzXG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gdHdvV2F5XG4gKiAgICAgICAgICAgICAgICAgLSB7Qm9vbGVhbn0gZGVlcFxuICogICAgICAgICAgICAgICAgIC0ge0Jvb2xlYW59IHVzZXJcbiAqICAgICAgICAgICAgICAgICAtIHtGdW5jdGlvbn0gW3ByZVByb2Nlc3NdXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuXG4vLyBmdW5jdGlvbiBXYXRjaGVyICh2bSwgZXhwcmVzc2lvbiwgY2IsIG9wdGlvbnMpIHtcbmZ1bmN0aW9uIFdhdGNoZXIgKHZtLCB1cGRhdGUsIGNiKSB7XG4gIHRoaXMudm0gPSB2bVxuICB2bS5fd2F0Y2hlcnMucHVzaCh0aGlzKVxuICAvLyB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uXG4gIHRoaXMuY2IgPSBjYlxuICB0aGlzLmlkID0gKyt1aWQgLy8gdWlkIGZvciBiYXRjaGluZ1xuICB0aGlzLmFjdGl2ZSA9IHRydWVcbiAgLy8gb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgLy8gdGhpcy5kZWVwID0gISFvcHRpb25zLmRlZXBcbiAgLy8gdGhpcy51c2VyID0gISFvcHRpb25zLnVzZXJcbiAgLy8gdGhpcy50d29XYXkgPSAhIW9wdGlvbnMudHdvV2F5XG4gIC8vIHRoaXMuZmlsdGVycyA9IG9wdGlvbnMuZmlsdGVyc1xuICAvLyB0aGlzLnByZVByb2Nlc3MgPSBvcHRpb25zLnByZVByb2Nlc3NcbiAgdGhpcy5kZXBzID0gW11cbiAgdGhpcy5uZXdEZXBzID0gW11cbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyL3NldHRlclxuICAvLyB2YXIgcmVzID0gZXhwUGFyc2VyLnBhcnNlKGV4cHJlc3Npb24sIG9wdGlvbnMudHdvV2F5KVxuICAvLyB0aGlzLmdldHRlciA9IHJlcy5nZXRcbiAgLy8gdGhpcy5zZXR0ZXIgPSByZXMuc2V0XG4gIHRoaXMuZ2V0dGVyID0gdXBkYXRlXG4gIHRoaXMudmFsdWUgPSB0aGlzLmdldCgpXG59XG5cbnZhciBwID0gV2F0Y2hlci5wcm90b3R5cGVcblxuLyoqXG4gKiBBZGQgYSBkZXBlbmRlbmN5IHRvIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIEBwYXJhbSB7RGVwfSBkZXBcbiAqL1xuXG5wLmFkZERlcCA9IGZ1bmN0aW9uIChkZXApIHtcbiAgdmFyIG5ld0RlcHMgPSB0aGlzLm5ld0RlcHNcbiAgdmFyIG9sZCA9IHRoaXMuZGVwc1xuICBpZiAoXy5pbmRleE9mKG5ld0RlcHMsIGRlcCkgPCAwKSB7XG4gICAgbmV3RGVwcy5wdXNoKGRlcClcbiAgICB2YXIgaSA9IF8uaW5kZXhPZihvbGQsIGRlcClcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIGRlcC5hZGRTdWIodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgb2xkW2ldID0gbnVsbFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEV2YWx1YXRlIHRoZSBnZXR0ZXIsIGFuZCByZS1jb2xsZWN0IGRlcGVuZGVuY2llcy5cbiAqL1xuXG5wLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5iZWZvcmVHZXQoKVxuICB2YXIgdm0gPSB0aGlzLnZtXG4gIHZhciB2YWx1ZVxuICB0cnkge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBfLmVycm9yKCdBIGVycm9yIG9jY3VycmVkIHdoZW4gYmluZGluZyBkYXRhIGluICcsIHRoaXMuZ2V0dGVyKVxuICB9XG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgaWYgKHRoaXMuZGVlcCkge1xuICAgIHRyYXZlcnNlKHZhbHVlKVxuICB9XG4gIGlmICh0aGlzLnByZVByb2Nlc3MpIHtcbiAgICB2YWx1ZSA9IHRoaXMucHJlUHJvY2Vzcyh2YWx1ZSlcbiAgfVxuICBpZiAodGhpcy5maWx0ZXJzKSB7XG4gICAgdmFsdWUgPSB2bS5fYXBwbHlGaWx0ZXJzKHZhbHVlLCBudWxsLCB0aGlzLmZpbHRlcnMsIGZhbHNlKVxuICB9XG4gIHRoaXMuYWZ0ZXJHZXQoKVxuICByZXR1cm4gdmFsdWVcbn1cblxuLy8gLyoqXG4vLyAgKiBTZXQgdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgd2l0aCB0aGUgc2V0dGVyLlxuLy8gICpcbi8vICAqIEBwYXJhbSB7Kn0gdmFsdWVcbi8vICAqL1xuXG4vLyBwLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuLy8gICB2YXIgdm0gPSB0aGlzLnZtXG4vLyAgIGlmICh0aGlzLmZpbHRlcnMpIHtcbi8vICAgICB2YWx1ZSA9IHZtLl9hcHBseUZpbHRlcnMoXG4vLyAgICAgICB2YWx1ZSwgdGhpcy52YWx1ZSwgdGhpcy5maWx0ZXJzLCB0cnVlKVxuLy8gICB9XG4vLyAgIHRyeSB7XG4vLyAgICAgdGhpcy5zZXR0ZXIuY2FsbCh2bSwgdm0sIHZhbHVlKVxuLy8gICB9IGNhdGNoIChlKSB7XG4vLyAgICAgLy8gaWYgKGNvbmZpZy53YXJuRXhwcmVzc2lvbkVycm9ycykge1xuLy8gICAgICAgXy53YXJuKFxuLy8gICAgICAgICAnRXJyb3Igd2hlbiBldmFsdWF0aW5nIHNldHRlciBcIicgK1xuLy8gICAgICAgICB0aGlzLmV4cHJlc3Npb24gKyAnXCI6XFxuICAgJyArIGVcbi8vICAgICAgIClcbi8vICAgICAvLyB9XG4vLyAgIH1cbi8vIH1cblxuLyoqXG4gKiBQcmVwYXJlIGZvciBkZXBlbmRlbmN5IGNvbGxlY3Rpb24uXG4gKi9cblxucC5iZWZvcmVHZXQgPSBmdW5jdGlvbiAoKSB7XG4gIE9ic2VydmVyLnRhcmdldCA9IHRoaXNcbn1cblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5cbnAuYWZ0ZXJHZXQgPSBmdW5jdGlvbiAoKSB7XG4gIE9ic2VydmVyLnRhcmdldCA9IG51bGxcbiAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgZGVwID0gdGhpcy5kZXBzW2ldXG4gICAgaWYgKGRlcCkge1xuICAgICAgZGVwLnJlbW92ZVN1Yih0aGlzKVxuICAgIH1cbiAgfVxuICB0aGlzLmRlcHMgPSB0aGlzLm5ld0RlcHNcbiAgdGhpcy5uZXdEZXBzID0gW11cbn1cblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKi9cblxuLy8gcC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4vLyAgIGlmICghY29uZmlnLmFzeW5jIHx8IGNvbmZpZy5kZWJ1Zykge1xuLy8gICAgIHRoaXMucnVuKClcbi8vICAgfSBlbHNlIHtcbi8vICAgICBiYXRjaGVyLnB1c2godGhpcylcbi8vICAgfVxuLy8gfVxuXG4vLyAvKipcbi8vICAqIEJhdGNoZXIgam9iIGludGVyZmFjZS5cbi8vICAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBiYXRjaGVyLlxuLy8gICovXG5cbi8vIHAucnVuID0gZnVuY3Rpb24gKCkge1xucC51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KClcbiAgICBpZiAoXG4gICAgICB2YWx1ZSAhPT0gdGhpcy52YWx1ZSB8fFxuICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHxcbiAgICAgIHRoaXMuZGVlcFxuICAgICkge1xuICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZVxuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlXG4gICAgICB0aGlzLmNiKHZhbHVlLCBvbGRWYWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YmNyaWJlciBsaXN0LlxuICovXG5cbnAudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gdm0ncyB3YXRjaGVyIGxpc3RcbiAgICAvLyB3ZSBjYW4gc2tpcCB0aGlzIGlmIHRoZSB2bSBpZiBiZWluZyBkZXN0cm95ZWRcbiAgICAvLyB3aGljaCBjYW4gaW1wcm92ZSB0ZWFyZG93biBwZXJmb3JtYW5jZS5cbiAgICBpZiAoIXRoaXMudm0uX2lzQmVpbmdEZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMudm0uX3dhdGNoZXJzLiRyZW1vdmUodGhpcylcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdGhpcy5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzKVxuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlXG4gICAgdGhpcy52bSA9IHRoaXMuY2IgPSB0aGlzLnZhbHVlID0gbnVsbFxuICB9XG59XG5cblxuLyoqXG4gKiBSZWNydXNpdmVseSB0cmF2ZXJzZSBhbiBvYmplY3QgdG8gZXZva2UgYWxsIGNvbnZlcnRlZFxuICogZ2V0dGVycywgc28gdGhhdCBldmVyeSBuZXN0ZWQgcHJvcGVydHkgaW5zaWRlIHRoZSBvYmplY3RcbiAqIGlzIGNvbGxlY3RlZCBhcyBhIFwiZGVlcFwiIGRlcGVuZGVuY3kuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICovXG5cbmZ1bmN0aW9uIHRyYXZlcnNlIChvYmopIHtcbiAgdmFyIGtleSwgdmFsLCBpXG4gIGZvciAoa2V5IGluIG9iaikge1xuICAgIHZhbCA9IG9ialtrZXldXG4gICAgaWYgKF8uaXNBcnJheSh2YWwpKSB7XG4gICAgICBpID0gdmFsLmxlbmd0aFxuICAgICAgd2hpbGUgKGktLSkge3RyYXZlcnNlKHZhbFtpXSl9XG4gICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIHRyYXZlcnNlKHZhbClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXRjaGVyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS93YXRjaGVyLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IERvY3VtZW50ICYgRWxlbWVudCBIZWxwZXJzLlxuICpcbiAqIHJlcXVpcmVkOlxuICogRG9jdW1lbnQjOiBjcmVhdGVFbGVtZW50LCBjcmVhdGVDb21tZW50LCBnZXRSZWZcbiAqIEVsZW1lbnQjOiBhcHBlbmRDaGlsZCwgaW5zZXJ0QmVmb3JlLCByZW1vdmVDaGlsZCwgbmV4dFNpYmxpbmdcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIGJvZHkgYnkgdHlwZVxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICpcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJvZHkodHlwZSkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIHJldHVybiBkb2MuY3JlYXRlQm9keSh0eXBlKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50IGJ5IHR5cGVcbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHR5cGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50KHR5cGUpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodHlwZSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGZyYWcgYmxvY2sgZm9yIGFuIGVsZW1lbnQuXG4gKiBUaGUgZnJhZyBibG9jayBoYXMgYSBzdGFydGVyLCBlbmRlciBhbmQgdGhlIGVsZW1lbnQgaXRzZWxmLlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZWxlbWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrKGVsZW1lbnQpIHtcbiAgY29uc3Qgc3RhcnQgPSB0aGlzLl9jcmVhdGVCbG9ja1N0YXJ0KClcbiAgY29uc3QgZW5kID0gdGhpcy5fY3JlYXRlQmxvY2tFbmQoKVxuICBjb25zdCBibG9ja0lkID0gbGFzdGVzdEJsb2NrSWQrK1xuICBpZiAoZWxlbWVudC5lbGVtZW50KSB7XG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShzdGFydCwgZWxlbWVudC5lbmQpXG4gICAgZWxlbWVudC5lbGVtZW50Lmluc2VydEJlZm9yZShlbmQsIGVsZW1lbnQuZW5kKVxuICAgIGVsZW1lbnQgPSBlbGVtZW50LmVsZW1lbnRcbiAgfVxuICBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKHN0YXJ0KVxuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoZW5kKVxuICB9XG4gIHJldHVybiB7c3RhcnQsIGVuZCwgZWxlbWVudCwgYmxvY2tJZH1cbn1cblxubGV0IGxhc3Rlc3RCbG9ja0lkID0gMVxuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgYmxvY2sgc3RhcnRlci5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9jcmVhdGVCbG9ja1N0YXJ0KCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdzdGFydCcpXG4gIHJldHVybiBhbmNob3Jcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGJsb2NrIGVuZGVyLlxuICogVXNpbmcgdGhpcy5fYXBwLmRvY1xuICovXG5leHBvcnQgZnVuY3Rpb24gX2NyZWF0ZUJsb2NrRW5kKCkge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IGFuY2hvciA9IGRvYy5jcmVhdGVDb21tZW50KCdlbmQnKVxuICByZXR1cm4gYW5jaG9yXG59XG5cbi8qKlxuICogQXR0YWNoIHRhcmdldCB0byBhIGNlcnRhaW4gZGVzdCB1c2luZyBhcHBlbmRDaGlsZCBieSBkZWZhdWx0LlxuICogSWYgdGhlIGRlc3QgaXMgYSBmcmFnIGJsb2NrIHRoZW4gaW5zZXJ0IGJlZm9yZSB0aGUgZW5kZXIuXG4gKiBJZiB0aGUgdGFyZ2V0IGlzIGEgZnJhZyBibG9jayB0aGVuIGF0dGFjaCB0aGUgc3RhcnRlciBhbmQgZW5kZXIgaW4gb3JkZXIuXG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSAge29iamVjdH0gZGVzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2F0dGFjaFRhcmdldCh0YXJnZXQsIGRlc3QpIHtcblxuICBpZiAoZGVzdC5lbGVtZW50KSB7XG4gICAgY29uc3QgYmVmb3JlID0gZGVzdC5lbmRcbiAgICBjb25zdCBhZnRlciA9IGRlc3QudXBkYXRlTWFya1xuICAgIC8vIHB1c2ggbmV3IHRhcmdldCBmb3Igd2F0Y2ggbGlzdCB1cGRhdGUgbGF0ZXJcbiAgICBpZiAoZGVzdC5jaGlsZHJlbikge1xuICAgICAgZGVzdC5jaGlsZHJlbi5wdXNoKHRhcmdldClcbiAgICB9XG4gICAgLy8gZm9yIGNoZWNrIHJlcGVhdCBjYXNlXG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICB0aGlzLl9tb3ZlVGFyZ2V0KHRhcmdldCwgYWZ0ZXIpXG4gICAgICBkZXN0LnVwZGF0ZU1hcmsgPSB0YXJnZXQuZWxlbWVudCA/IHRhcmdldC5lbmQgOiB0YXJnZXRcbiAgICB9XG4gICAgZWxzZSBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuZWxlbWVudC5pbnNlcnRCZWZvcmUodGFyZ2V0LnN0YXJ0LCBiZWZvcmUpXG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldC5lbmQsIGJlZm9yZSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkZXN0LmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRhcmdldCwgYmVmb3JlKVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0LnN0YXJ0KVxuICAgICAgZGVzdC5hcHBlbmRDaGlsZCh0YXJnZXQuZW5kKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRlc3QuYXBwZW5kQ2hpbGQodGFyZ2V0KVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGFyZ2V0IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC4gVGhlIHRhcmdldCBtYXliZSBibG9jayBvciBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0gIHtvYmplY3R9IGJlZm9yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX21vdmVUYXJnZXQodGFyZ2V0LCBhZnRlcikge1xuICBpZiAodGFyZ2V0LmVsZW1lbnQpIHtcbiAgICB0aGlzLl9tb3ZlQmxvY2sodGFyZ2V0LCBhZnRlcilcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9tb3ZlRWxlbWVudCh0YXJnZXQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBlbGVtZW50IGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGVsZW1lbnRcbiAqIEBwYXJhbSAge29iamVjdH0gYmVmb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfbW92ZUVsZW1lbnQoZWxlbWVudCwgYWZ0ZXIpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5fYXBwLmRvY1xuICBjb25zdCBwYXJlbnQgPSBkb2MuZ2V0UmVmKGFmdGVyLnBhcmVudFJlZilcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50Lmluc2VydEFmdGVyKGVsZW1lbnQsIGFmdGVyKVxuICB9XG59XG5cbi8qKlxuICogTW92ZSBhbGwgZWxlbWVudHMgb2YgdGhlIGJsb2NrIGJlZm9yZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IGZyYWdCbG9ja1xuICogQHBhcmFtICB7b2JqZWN0fSBiZWZvcmVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9tb3ZlQmxvY2soZnJhZ0Jsb2NrLCBhZnRlcikge1xuICBjb25zdCBkb2MgPSB0aGlzLl9hcHAuZG9jXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYoYWZ0ZXIucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnRcbiAgICBjb25zdCBncm91cCA9IFtlbF1cblxuICAgIHdoaWxlIChlbCAmJiBlbCAhPT0gZnJhZ0Jsb2NrLmVuZCkge1xuICAgICAgZWwgPSBlbC5uZXh0KClcbiAgICAgIGdyb3VwLnB1c2goZWwpXG4gICAgfVxuXG4gICAgbGV0IHRlbXAgPSBhZnRlclxuICAgIGdyb3VwLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QWZ0ZXIoZWwsIHRlbXApXG4gICAgICB0ZW1wID0gZWxcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIHRhcmdldCBmcm9tIERPTSB0cmVlLlxuICogSWYgdGhlIHRhcmdldCBpcyBhIGZyYWcgYmxvY2sgdGhlbiBjYWxsIF9yZW1vdmVCbG9ja1xuICpcbiAqIEBwYXJhbSAge29iamVjdH0gdGFyZ2V0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfcmVtb3ZlVGFyZ2V0KHRhcmdldCkge1xuXG4gIGlmICh0YXJnZXQuZWxlbWVudCkge1xuICAgIHRoaXMuX3JlbW92ZUJsb2NrKHRhcmdldClcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLl9yZW1vdmVFbGVtZW50KHRhcmdldClcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhIGNlcnRhaW4gZWxlbWVudC5cbiAqIFVzaW5nIHRoaXMuX2FwcC5kb2NcbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9IHRhcmdldFxuICovXG5leHBvcnQgZnVuY3Rpb24gX3JlbW92ZUVsZW1lbnQodGFyZ2V0KSB7XG4gIGNvbnN0IGRvYyA9IHRoaXMuX2FwcC5kb2NcbiAgY29uc3QgcGFyZW50ID0gZG9jLmdldFJlZih0YXJnZXQucGFyZW50UmVmKVxuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQucmVtb3ZlQ2hpbGQodGFyZ2V0KVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZnJhZyBibG9jay5cbiAqIFRoZSBzZWNvbmQgcGFyYW0gZGVjaWRlcyB3aGV0aGVyIHRoZSBibG9jayBzZWxmIHNob3VsZCBiZSByZW1vdmVkIHRvby5cbiAqXG4gKiBAcGFyYW0gIHtvYmplY3R9ICBmcmFnQmxvY2tcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHByZXNlcnZlQmxvY2s9ZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9yZW1vdmVCbG9jayhmcmFnQmxvY2ssIHByZXNlcnZlQmxvY2sgPSBmYWxzZSkge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBsZXQgZWwgPSBmcmFnQmxvY2suc3RhcnQubmV4dCgpXG5cbiAgd2hpbGUgKGVsICYmIGVsICE9PSBmcmFnQmxvY2suZW5kKSB7XG4gICAgcmVzdWx0LnB1c2goZWwpXG4gICAgZWwgPSBlbC5uZXh0KClcbiAgfVxuXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLnN0YXJ0KVxuICB9XG4gIHJlc3VsdC5mb3JFYWNoKChlbCkgPT4ge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZWwpXG4gIH0pXG4gIGlmICghcHJlc2VydmVCbG9jaykge1xuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQoZnJhZ0Jsb2NrLmVuZClcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi92bS9kb20taGVscGVyLmpzXG4gKiovIiwiZnVuY3Rpb24gRXZ0KHR5cGUsIGRldGFpbCkge1xuICBpZiAoZGV0YWlsIGluc3RhbmNlb2YgRXZ0KSB7XG4gICAgcmV0dXJuIGRldGFpbFxuICB9XG5cbiAgdGhpcy50aW1lc3RhbXAgPSBEYXRlLm5vdygpXG4gIHRoaXMuZGV0YWlsID0gZGV0YWlsXG4gIHRoaXMudHlwZSA9IHR5cGVcblxuICBsZXQgc2hvdWxkU3RvcCA9IGZhbHNlXG4gIHRoaXMuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaG91bGRTdG9wID0gdHJ1ZVxuICB9XG4gIHRoaXMuaGFzU3RvcHBlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hvdWxkU3RvcFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkZW1pdCh0eXBlLCBkZXRhaWwpIHtcbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV1cbiAgaWYgKGhhbmRsZXJMaXN0KSB7XG4gICAgbGV0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICAgIGhhbmRsZXJMaXN0LmZvckVhY2goKGhhbmRsZXIpID0+IHtcbiAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBldnQpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJGRpc3BhdGNoKHR5cGUsIGRldGFpbCkge1xuICBjb25zdCBldnQgPSBuZXcgRXZ0KHR5cGUsIGRldGFpbClcbiAgdGhpcy4kZW1pdCh0eXBlLCBldnQpXG5cbiAgaWYgKCFldnQuaGFzU3RvcHBlZCgpICYmIHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQuJGRpc3BhdGNoKSB7XG4gICAgdGhpcy5fcGFyZW50LiRkaXNwYXRjaCh0eXBlLCBldnQpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uICRicm9hZGNhc3QodHlwZSwgZGV0YWlsKSB7XG4gIGNvbnN0IGV2dCA9IG5ldyBFdnQodHlwZSwgZGV0YWlsKVxuICB0aGlzLiRlbWl0KHR5cGUsIGV2dClcblxuICBpZiAoIWV2dC5oYXNTdG9wcGVkKCkgJiYgdGhpcy5fY2hpbGRyZW5WbXMpIHtcbiAgICB0aGlzLl9jaGlsZHJlblZtcy5mb3JFYWNoKChzdWJWbSkgPT4ge1xuICAgICAgc3ViVm0uJGJyb2FkY2FzdCh0eXBlLCBldnQpXG4gICAgfSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gJG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0eXBlIHx8IHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgY29uc3QgaGFuZGxlckxpc3QgPSBldmVudHNbdHlwZV0gfHwgW11cbiAgaGFuZGxlckxpc3QucHVzaChoYW5kbGVyKVxuICBldmVudHNbdHlwZV0gPSBoYW5kbGVyTGlzdFxuXG4gIC8vIGZpeGVkIG9sZCB2ZXJzaW9uIGxpZmVjeWNsZSBkZXNpZ25cbiAgaWYgKHR5cGUgPT09ICdob29rOnJlYWR5JyAmJiB0aGlzLl9yZWFkeSkge1xuICAgIHRoaXMuJGVtaXQoJ2hvb2s6cmVhZHknKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiAkb2ZmKHR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZXZlbnRzID0gdGhpcy5fdm1FdmVudHNcbiAgaWYgKCFoYW5kbGVyKSB7XG4gICAgZGVsZXRlIGV2ZW50c1t0eXBlXVxuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGhhbmRsZXJMaXN0ID0gZXZlbnRzW3R5cGVdXG4gIGlmICghaGFuZGxlckxpc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuICBoYW5kbGVyTGlzdC4kcmVtb3ZlKGhhbmRsZXIpXG59XG5cbmNvbnN0IExJRkVfQ1lDTEVfVFlQRVMgPSBbJ2luaXQnLCAnY3JlYXRlZCcsICdyZWFkeSddXG5cbmV4cG9ydCBmdW5jdGlvbiBfaW5pdEV2ZW50cyhleHRlcm5hbEV2ZW50cykge1xuICBjb25zdCBvcHRpb25zID0gdGhpcy5fb3B0aW9ucyB8fCB7fVxuICBjb25zdCBldmVudHMgPSBvcHRpb25zLmV2ZW50cyB8fCB7fVxuICBmb3IgKGNvbnN0IHR5cGUxIGluIGV2ZW50cykge1xuICAgIHRoaXMuJG9uKHR5cGUxLCBldmVudHNbdHlwZTFdKVxuICB9XG4gIGZvciAoY29uc3QgdHlwZTIgaW4gZXh0ZXJuYWxFdmVudHMpIHtcbiAgICB0aGlzLiRvbih0eXBlMiwgZXh0ZXJuYWxFdmVudHNbdHlwZTJdKVxuICB9XG4gIExJRkVfQ1lDTEVfVFlQRVMuZm9yRWFjaCgodHlwZSkgPT4ge1xuICAgIHRoaXMuJG9uKGBob29rOiR7dHlwZX1gLCBvcHRpb25zW3R5cGVdKVxuICB9KVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdm0vZXZlbnRzLmpzXG4gKiovIiwibGV0IG5hdGl2ZU1vZHVsZXMgPSB7fVxuXG5mdW5jdGlvbiBhc3NpZ25Nb2R1bGVzKG1vZHVsZXMsIGlmUmVwbGFjZSkge1xuXG4gIGZvciAoY29uc3QgbW9kdWxlTmFtZSBpbiBtb2R1bGVzKSB7XG5cbiAgICAvLyBpbml0IGBtb2R1bGVzW21vZHVsZU5hbWVdW11gXG4gICAgbGV0IG1ldGhvZHMgPSBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG4gICAgaWYgKCFtZXRob2RzKSB7XG4gICAgICBtZXRob2RzID0ge31cbiAgICAgIG5hdGl2ZU1vZHVsZXNbbW9kdWxlTmFtZV0gPSBtZXRob2RzXG4gICAgfVxuXG4gICAgLy8gcHVzaCBlYWNoIG5vbi1leGlzdGVkIG5ldyBtZXRob2RcbiAgICBtb2R1bGVzW21vZHVsZU5hbWVdLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1ldGhvZCA9IHtcbiAgICAgICAgICBuYW1lOiBtZXRob2RcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1ldGhvZHNbbWV0aG9kLm5hbWVdIHx8IGlmUmVwbGFjZSkge1xuICAgICAgICBtZXRob2RzW21ldGhvZC5uYW1lXSA9IG1ldGhvZFxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduQXBpcyhDdG9yLCBhcGlzKSB7XG4gIGNvbnN0IHAgPSBDdG9yLnByb3RvdHlwZVxuXG4gIGZvciAoY29uc3QgYXBpTmFtZSBpbiBhcGlzKSB7XG4gICAgaWYgKCFwLmhhc093blByb3BlcnR5KGFwaU5hbWUpKSB7XG4gICAgICBwW2FwaU5hbWVdID0gYXBpc1thcGlOYW1lXVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXJNb2R1bGVzKCkge1xuICBuYXRpdmVNb2R1bGVzID0ge31cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1vZHVsZShtb2R1bGVOYW1lKSB7XG4gIHJldHVybiBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG59XG5cbi8qKlxuICogQGNvbnRleHQgYSBpbnN0YW5jZSBvZiBBcHBJbnN0YW5jZVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKSB7XG4gIGNvbnN0IG1ldGhvZHMgPSBuYXRpdmVNb2R1bGVzW21vZHVsZU5hbWVdXG4gIGNvbnN0IHRhcmdldCA9IHt9XG5cbiAgZm9yIChjb25zdCBtZXRob2ROYW1lIGluIG1ldGhvZHMpIHtcbiAgICB0YXJnZXRbbWV0aG9kTmFtZV0gPSAoLi4uYXJncykgPT4gdGhpcy5jYWxsVGFza3Moe1xuICAgICAgbW9kdWxlOiBtb2R1bGVOYW1lLFxuICAgICAgbWV0aG9kOiBtZXRob2ROYW1lLFxuICAgICAgYXJnczogYXJnc1xuICAgIH0pXG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpIHtcbiAgYXNzaWduTW9kdWxlcyhtb2R1bGVzLCBpZlJlcGxhY2UpXG59XG5cbi8qKlxuICogQGNvbnRleHQgVm1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kcyhhcGlzKSB7XG4gIGFzc2lnbkFwaXModGhpcywgYXBpcylcbn1cblxuLyoqXG4gKiBAY29udGV4dCBhIGluc3RhbmNlIG9mIEFwcEluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXF1aXJlQ29tcG9uZW50KG5hbWUpIHtcbiAgY29uc3Qge2N1c3RvbUNvbXBvbmVudE1hcH0gPSB0aGlzXG4gIHJldHVybiBjdXN0b21Db21wb25lbnRNYXBbbmFtZV1cbn1cblxuLyoqXG4gKiBAY29udGV4dCBhIGluc3RhbmNlIG9mIEFwcEluc3RhbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZWdpc3RlckNvbXBvbmVudChuYW1lLCBleHBvcnRzKSB7XG4gIGNvbnN0IHtjdXN0b21Db21wb25lbnRNYXB9ID0gdGhpc1xuXG4gIGlmIChjdXN0b21Db21wb25lbnRNYXBbbmFtZV0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGRlZmluZSBhIGNvbXBvbmVudCgke25hbWV9KSB0aGF0IGFscmVhZHkgZXhpc3RzYClcbiAgfVxuXG4gIGN1c3RvbUNvbXBvbmVudE1hcFtuYW1lXSA9IGV4cG9ydHNcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvcmVnaXN0ZXIuanNcbiAqKi8iLCJpbXBvcnQgc2VtdmVyIGZyb20gJ3NlbXZlcidcbmltcG9ydCB7ZXh0ZW5kLCBpc1BsYWluT2JqZWN0LCB0eXBvZn0gIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogW25vcm1hbGl6ZVZlcnNpb24gZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtTdHJpbmd9IFZlcnNpb24uIGllOiAxLCAxLjAsIDEuMC4wXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFZlcnNpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVZlcnNpb24gKHYpIHtcbiAgY29uc3QgaXNWYWxpZCA9IHNlbXZlci52YWxpZCh2KSA/IHRydWUgOiBmYWxzZVxuICBpZiAoaXNWYWxpZCkge1xuICAgIHJldHVybiB2XG4gIH1cblxuICB2ID0gdHlwZW9mICh2KSA9PT0gJ3N0cmluZycgPyB2IDogJydcbiAgY29uc3Qgc3BsaXQgPSB2LnNwbGl0KCcuJylcbiAgbGV0IGkgPSAwXG4gIGxldCByZXN1bHQgPSBbXVxuXG4gIHdoaWxlIChpIDwgMykge1xuICAgIGNvbnN0IHMgPSB0eXBlb2YgKHNwbGl0W2ldKSA9PT0gJ3N0cmluZycgJiYgc3BsaXRbaV0gPyBzcGxpdFtpXSA6ICcwJ1xuICAgIHJlc3VsdC5wdXNoKHMpXG4gICAgaSsrXG4gIH1cblxuICByZXR1cm4gcmVzdWx0LmpvaW4oJy4nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXJyb3IgKGtleSwgdmFsLCBjcml0ZXJpYSkge1xuICBsZXQgcmVzdWx0ID0ge1xuICAgIGlzRG93bmdyYWRlOiB0cnVlLFxuICAgIGVycm9yVHlwZTogMSxcbiAgICBjb2RlOiAxMDAwXG4gIH1cbiAgbGV0IGdldE1zZyA9IGZ1bmN0aW9uIChrZXksIHZhbCwgY3JpdGVyaWEpIHtcbiAgICByZXR1cm4gJ0Rvd25ncmFkZVsnICsga2V5ICsgJ10gOjogZGV2aWNlSW5mbyAnXG4gICAgICArIHZhbCArICcgbWF0Y2hlZCBjcml0ZXJpYSAnICsgY3JpdGVyaWFcbiAgfVxuICBjb25zdCBfa2V5ID0ga2V5LnRvTG93ZXJDYXNlKClcblxuICByZXN1bHQuZXJyb3JNZXNzYWdlID0gZ2V0TXNnKGtleSwgdmFsLCBjcml0ZXJpYSlcblxuICBpZiAoX2tleS5pbmRleE9mKCdvc3ZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAxXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ2FwcHZlcnNpb24nKSA+PSAwKSB7XG4gICAgcmVzdWx0LmNvZGUgPSAxMDAyXG4gIH1lbHNlIGlmIChfa2V5LmluZGV4T2YoJ3dlZXh2ZXJzaW9uJykgPj0gMCkge1xuICAgIHJlc3VsdC5jb2RlID0gMTAwM1xuICB9ZWxzZSBpZiAoX2tleS5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDApIHtcbiAgICByZXN1bHQuY29kZSA9IDEwMDRcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBXRUVYIGZyYW1ld29yayBpbnB1dChkZXZpY2VJbmZvKVxuICoge1xuICogICBwbGF0Zm9ybTogJ2lPUycgb3IgJ2FuZHJvaWQnXG4gKiAgIG9zVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgYXBwVmVyc2lvbjogJzEuMC4wJyBvciAnMS4wJyBvciAnMSdcbiAqICAgd2VleFZlcnNpb246ICcxLjAuMCcgb3IgJzEuMCcgb3IgJzEnXG4gKiAgIGREZXZpY2VNb2RlbDogJ01PREVMX05BTUUnXG4gKiB9XG4gKlxuICogZG93bmdyYWRlIGNvbmZpZyhjb25maWcpXG4gKiB7XG4gKiAgIGlvczoge1xuICogICAgIG9zVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgYXBwVmVyc2lvbjogJz4xLjAuMCcgb3IgJz49MS4wLjAnIG9yICc8MS4wLjAnIG9yICc8PTEuMC4wJyBvciAnMS4wLjAnXG4gKiAgICAgd2VleFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGRldmljZU1vZGVsOiBbJ21vZGVsQScsICdtb2RlbEInLCAuLi5dXG4gKiAgIH0sXG4gKiAgIGFuZHJvaWQ6IHtcbiAqICAgICBvc1ZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIGFwcFZlcnNpb246ICc+MS4wLjAnIG9yICc+PTEuMC4wJyBvciAnPDEuMC4wJyBvciAnPD0xLjAuMCcgb3IgJzEuMC4wJ1xuICogICAgIHdlZXhWZXJzaW9uOiAnPjEuMC4wJyBvciAnPj0xLjAuMCcgb3IgJzwxLjAuMCcgb3IgJzw9MS4wLjAnIG9yICcxLjAuMCdcbiAqICAgICBkZXZpY2VNb2RlbDogWydtb2RlbEEnLCAnbW9kZWxCJywgLi4uXVxuICogICB9XG4gKiB9XG4gKlxuICpcbiAqIEBwYXJhbSAge29iamVjdH0gZGV2aWNlSW5mbyBXZWV4IFNESyBmcmFtZXdvcmsgaW5wdXRcbiAqIEBwYXJhbSAge29iamVjdH0gY29uZmlnICAgICB1c2VyIGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgICAgICAgeyBpc0Rvd25ncmFkZTogdHJ1ZS9mYWxzZSwgZXJyb3JNZXNzYWdlLi4uIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrIChjb25maWcsIGRldmljZUluZm8pIHtcbiAgZGV2aWNlSW5mbyA9IGRldmljZUluZm8gfHwgZ2xvYmFsLldYRW52aXJvbm1lbnRcbiAgZGV2aWNlSW5mbyA9IGlzUGxhaW5PYmplY3QoZGV2aWNlSW5mbykgPyBkZXZpY2VJbmZvIDoge31cbiAgY29uZmlnID0gaXNQbGFpbk9iamVjdChjb25maWcpID8gY29uZmlnIDoge31cbiAgY29uc3QgcGxhdGZvcm0gPSBkZXZpY2VJbmZvLnBsYXRmb3JtIHx8ICd1bmtub3cnXG4gIGNvbnN0IGRQbGF0Zm9ybSA9IHBsYXRmb3JtLnRvTG93ZXJDYXNlKClcbiAgY29uc3QgY09iaiA9IGNvbmZpZ1tkUGxhdGZvcm1dIHx8IHt9XG5cbiAgbGV0IHJlc3VsdCA9IHtcbiAgICBpc0Rvd25ncmFkZTogZmFsc2UgLy8gZGVmYXV0bCBpcyBwYXNzXG4gIH1cblxuICBmb3IgKGxldCBpIGluIGRldmljZUluZm8pIHtcbiAgICBjb25zdCBrZXkgPSBpXG4gICAgY29uc3Qga2V5TG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IHZhbCA9IGRldmljZUluZm9baV1cbiAgICBjb25zdCBpc1ZlcnNpb24gPSBrZXlMb3dlci5pbmRleE9mKCd2ZXJzaW9uJykgPj0gMCA/IHRydWUgOiBmYWxzZVxuICAgIGNvbnN0IGlzRGV2aWNlTW9kZWwgPSBrZXlMb3dlci5pbmRleE9mKCdkZXZpY2Vtb2RlbCcpID49IDAgPyB0cnVlIDogZmFsc2VcbiAgICBjb25zdCBjcml0ZXJpYSA9IGNPYmpbaV1cblxuICAgIGlmIChjcml0ZXJpYSAmJiBpc1ZlcnNpb24pIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLm5vcm1hbGl6ZVZlcnNpb24oY3JpdGVyaWEpXG4gICAgICBjb25zdCBkID0gdGhpcy5ub3JtYWxpemVWZXJzaW9uKGRldmljZUluZm9baV0pXG5cbiAgICAgIGlmIChzZW12ZXIuc2F0aXNmaWVzKGQsIGMpKSB7XG4gICAgICAgIHJlc3VsdCA9IGV4dGVuZCh0aGlzLmdldEVycm9yKGtleSwgdmFsLCBjcml0ZXJpYSkpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfWVsc2UgaWYgKGlzRGV2aWNlTW9kZWwpIHtcbiAgICAgIGNvbnN0IF9jcml0ZXJpYSA9IHR5cG9mKGNyaXRlcmlhKSA9PT0gJ2FycmF5JyA/IGNyaXRlcmlhIDogW2NyaXRlcmlhXVxuICAgICAgaWYgKF9jcml0ZXJpYS5pbmRleE9mKHZhbCkgPj0gMCkge1xuICAgICAgICByZXN1bHQgPSBleHRlbmQodGhpcy5nZXRFcnJvcihrZXksIHZhbCwgY3JpdGVyaWEpKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZG93bmdyYWRlLmpzXG4gKiovIiwiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3XG4gKiBpbnN0YW5jZSBjb250cm9scyBmcm9tIG5hdGl2ZVxuICpcbiAqIC0gaW5pdCBidW5kbGVcbiAqIC0gZmlyZSBldmVudFxuICogLSBjYWxsYmFja1xuICogLSBkZXN0cm95XG4gKlxuICogY29ycmVzcG9uZGVkIHdpdGggdGhlIEFQSSBvZiBpbnN0YW5jZSBtYW5hZ2VyIChmcmFtZXdvcmsuanMpXG4gKi9cblxuaW1wb3J0ICogYXMgXyBmcm9tICcuLi91dGlsJ1xuaW1wb3J0IExpc3RlbmVyIGZyb20gJy4vZG9tLWxpc3RlbmVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWN0aW9ucygpIHtcbiAgdGhpcy5kaWZmZXIuZmx1c2goKVxuICBjb25zdCB0YXNrcyA9IFtdXG4gIGlmICh0aGlzLmxpc3RlbmVyICYmIHRoaXMubGlzdGVuZXIudXBkYXRlcy5sZW5ndGgpIHtcbiAgICB0YXNrcy5wdXNoKC4uLnRoaXMubGlzdGVuZXIudXBkYXRlcylcbiAgICB0aGlzLmxpc3RlbmVyLnVwZGF0ZXMgPSBbXVxuICB9XG4gIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICB0aGlzLmNhbGxUYXNrcyh0YXNrcylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChjb2RlLCBkYXRhKSB7XG4gIF8uZGVidWcoJ0ludGlhbGl6ZSBhbiBpbnN0YW5jZSB3aXRoJywgY29kZSwgZGF0YSlcblxuICB2YXIgcmVzdWx0XG4gIC8vIEBzZWU6IGxpYi9hcHAvYnVuZGxlLmpzXG4gIGNvbnN0IGRlZmluZSA9IF8uYmluZCh0aGlzLmRlZmluZSwgdGhpcylcbiAgY29uc3QgYm9vdHN0cmFwID0gKG5hbWUsIGNvbmZpZywgX2RhdGEpID0+IHtcbiAgICByZXN1bHQgPSB0aGlzLmJvb3RzdHJhcChuYW1lLCBjb25maWcsIF9kYXRhIHx8IGRhdGEpXG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICB0aGlzLmRvYy5saXN0ZW5lci5jcmVhdGVGaW5pc2goKVxuICAgIHRoaXMuZG9jLmNsb3NlKClcbiAgICBfLmRlYnVnKGBBZnRlciBpbnRpYWxpemVkIGFuIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcbiAgfVxuXG4gIC8vIGJhY2t3YXJkKHJlZ2lzdGVyL3JlbmRlcilcbiAgY29uc3QgcmVnaXN0ZXIgPSBfLmJpbmQodGhpcy5yZWdpc3RlciwgdGhpcylcbiAgY29uc3QgcmVuZGVyID0gKG5hbWUsIF9kYXRhKSA9PiB7XG4gICAgcmVzdWx0ID0gdGhpcy5ib290c3RyYXAobmFtZSwge30sIF9kYXRhKVxuICB9XG5cbiAgY29uc3QgcmVxdWlyZSA9IG5hbWUgPT4gX2RhdGEgPT4ge1xuICAgIHJlc3VsdCA9IHRoaXMuYm9vdHN0cmFwKG5hbWUsIHt9LCBfZGF0YSlcbiAgfVxuXG4gIGNvbnN0IGRvY3VtZW50ID0gdGhpcy5kb2NcblxuICBsZXQgZnVuY3Rpb25Cb2R5XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGNvZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBgZnVuY3Rpb24gKCkgey4uLn1gIC0+IGB7Li4ufWBcbiAgICAvLyBub3QgdmVyeSBzdHJpY3RcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKCkuc3Vic3RyKDEyKVxuICB9IGVsc2UgaWYgKGNvZGUpIHtcbiAgICBmdW5jdGlvbkJvZHkgPSBjb2RlLnRvU3RyaW5nKClcbiAgfVxuXG4gIGxldCBmbiA9IG5ldyBGdW5jdGlvbihcbiAgICAnZGVmaW5lJyxcbiAgICAncmVxdWlyZScsXG4gICAgJ2RvY3VtZW50JyxcbiAgICAnYm9vdHN0cmFwJyxcbiAgICAncmVnaXN0ZXInLFxuICAgICdyZW5kZXInLFxuICAgICdfX3dlZXhfZGVmaW5lX18nLCAvLyBhbGlhcyBmb3IgZGVmaW5lXG4gICAgJ19fd2VleF9ib290c3RyYXBfXycsIC8vIGFsaWFzIGZvciBib290c3RyYXBcbiAgICBmdW5jdGlvbkJvZHlcbiAgKVxuXG4gIGZuKFxuICAgIGRlZmluZSxcbiAgICByZXF1aXJlLFxuICAgIGRvY3VtZW50LFxuICAgIGJvb3RzdHJhcCxcbiAgICByZWdpc3RlcixcbiAgICByZW5kZXIsXG4gICAgZGVmaW5lLFxuICAgIGJvb3RzdHJhcClcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95KCkge1xuICBfLmRlYnVnKGBEZXN0b3J5IGFuIGluc3RhbmNlKCR7dGhpcy5pZH0pYClcblxuICB0aGlzLmlkID0gJydcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBudWxsXG4gIHRoaXMub3B0aW9ucyA9IG51bGxcbiAgdGhpcy5ibG9ja3MgPSBudWxsXG4gIHRoaXMudm0gPSBudWxsXG4gIHRoaXMuZG9jID0gbnVsbFxuICB0aGlzLmN1c3RvbUNvbXBvbmVudE1hcCA9IG51bGxcbiAgdGhpcy5jYWxsYmFja3MgPSBudWxsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290RWxlbWVudCgpIHtcbiAgY29uc3QgZG9jID0gdGhpcy5kb2MgfHwge31cbiAgY29uc3QgYm9keSA9IGRvYy5ib2R5IHx8IHt9XG4gIHJldHVybiBib2R5LnRvSlNPTiA/IGJvZHkudG9KU09OKCkgOiB7fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyZUV2ZW50KHJlZiwgdHlwZSwgZSwgZG9tQ2hhbmdlcykge1xuICBfLmRlYnVnKGBGaXJlIGEgXCIke3R5cGV9XCIgZXZlbnQgb24gYW4gZWxlbWVudCgke3JlZn0pYCxcbiAgICAgICAgICAgIGBpbiBpbnN0YW5jZSgke3RoaXMuaWR9KWApXG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmVmKSkge1xuICAgIHJlZi5zb21lKChyZWYpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmZpcmVFdmVudChyZWYsIHR5cGUsIGUpICE9PSBmYWxzZVxuICAgIH0pXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBlbCA9IHRoaXMuZG9jLmdldFJlZihyZWYpXG5cbiAgaWYgKGVsKSB7XG4gICAgZSA9IGUgfHwge31cbiAgICBlLnR5cGUgPSB0eXBlXG4gICAgZS50YXJnZXQgPSBlbFxuICAgIGUudGltZXN0YW1wID0gRGF0ZS5ub3coKVxuICAgIGlmIChkb21DaGFuZ2VzKSB7XG4gICAgICB1cGRhdGVFbGVtZW50KGVsLCBkb21DaGFuZ2VzKVxuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmV2ZW50TWFuYWdlci5maXJlKGVsLCB0eXBlLCBlKVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIudXBkYXRlRmluaXNoKClcbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGVsZW1lbnQgcmVmZXJlbmNlIFwiJHtyZWZ9XCJgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FsbGJhY2soY2FsbGJhY2tJZCwgZGF0YSwgaWZLZWVwQWxpdmUpIHtcbiAgXy5kZWJ1ZyhgSW52b2tlIGEgY2FsbGJhY2soJHtjYWxsYmFja0lkfSkgd2l0aGAsIGRhdGEsXG4gICAgICAgICAgICBgaW4gaW5zdGFuY2UoJHt0aGlzLmlkfSlgKVxuXG4gIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbY2FsbGJhY2tJZF1cblxuICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2soZGF0YSkgLy8gZGF0YSBpcyBhbHJlYWR5IGEgb2JqZWN0LCBAc2VlOiBsaWIvZnJhbWV3b3JrLmpzXG5cbiAgICBpZiAodHlwZW9mIGlmS2VlcEFsaXZlID09PSAndW5kZWZpbmVkJyB8fCBpZktlZXBBbGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuY2FsbGJhY2tzW2NhbGxiYWNrSWRdID0gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBY3Rpb25zKClcbiAgICB0aGlzLmRvYy5saXN0ZW5lci51cGRhdGVGaW5pc2goKVxuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihgaW52YWxpZCBjYWxsYmFjayBpZCBcIiR7Y2FsbGJhY2tJZH1cImApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWZyZXNoRGF0YShkYXRhKSB7XG4gIF8uZGVidWcoYFJlZnJlc2ggd2l0aGAsIGRhdGEsXG4gICAgICAgICAgICBgaW4gaW5zdGFuY2VbJHt0aGlzLmlkfV1gKVxuXG4gIGNvbnN0IHZtID0gdGhpcy52bVxuXG4gIGlmICh2bSAmJiBkYXRhKSB7XG4gICAgaWYgKHR5cGVvZiB2bS5yZWZyZXNoRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdm0ucmVmcmVzaERhdGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgXy5leHRlbmQodm0sIGRhdGEpXG4gICAgfVxuICAgIHRoaXMudXBkYXRlQWN0aW9ucygpXG4gICAgdGhpcy5kb2MubGlzdGVuZXIucmVmcmVzaEZpbmlzaCgpXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKGBpbnZhbGlkIGRhdGEgXCIke2RhdGF9XCJgKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50KGVsLCBjaGFuZ2VzKSB7XG4gIGNvbnN0IGF0dHJzID0gY2hhbmdlcy5hdHRycyB8fCB7fVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gYXR0cnMpIHtcbiAgICBlbC5zZXRBdHRyKG5hbWUsIGF0dHJzW25hbWVdLCB0cnVlKVxuICB9XG4gIGNvbnN0IHN0eWxlID0gY2hhbmdlcy5zdHlsZSB8fCB7fVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGUpIHtcbiAgICBlbC5zZXRTdHlsZShuYW1lLCBzdHlsZVtuYW1lXSwgdHJ1ZSlcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvY3RybC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKGlkLCBoYW5kbGVyKSB7XG4gIHRoaXMuaWQgPSBpZFxuICB0aGlzLmJhdGNoZWQgPSBmYWxzZVxuICB0aGlzLnVwZGF0ZXMgPSBbXVxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmhhbmRsZXIgPSBoYW5kbGVyXG4gIH1cbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmNyZWF0ZUZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbignY3JlYXRlRmluaXNoJywgW10pXSwgY2FsbGJhY2spXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS51cGRhdGVGaW5pc2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgY29uc3QgaGFuZGxlciA9IHRoaXMuaGFuZGxlclxuICBoYW5kbGVyKFtjcmVhdGVBY3Rpb24oJ3VwZGF0ZUZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVmcmVzaEZpbmlzaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG4gIGhhbmRsZXIoW2NyZWF0ZUFjdGlvbigncmVmcmVzaEZpbmlzaCcsIFtdKV0sIGNhbGxiYWNrKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uIChlbGVtZW50LCByZWYpIHtcbiAgY29uc3QgYWN0aW9ucyA9IFtjcmVhdGVBY3Rpb24oJ2NyZWF0ZUJvZHknLCBbZWxlbWVudC50b0pTT04oKV0pXVxuICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgcmVmLCBpbmRleCkge1xuICBpZiAoIShpbmRleCA+PSAwKSkge1xuICAgIGluZGV4ID0gLTFcbiAgfVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdhZGRFbGVtZW50JywgW3JlZiwgZWxlbWVudC50b0pTT04oKSwgaW5kZXhdKSlcbn1cblxuTGlzdGVuZXIucHJvdG90eXBlLnJlbW92ZUVsZW1lbnQgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICBjb25zdCBhY3Rpb25zID0gcmVmLm1hcCgocikgPT4gY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JdKSlcbiAgICB0aGlzLmFkZEFjdGlvbnMoYWN0aW9ucylcbiAgfVxuICBlbHNlIHtcbiAgICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCdyZW1vdmVFbGVtZW50JywgW3JlZl0pKVxuICB9XG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5tb3ZlRWxlbWVudCA9IGZ1bmN0aW9uICh0YXJnZXRSZWYsIHBhcmVudFJlZiwgaW5kZXgpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbignbW92ZUVsZW1lbnQnLCBbdGFyZ2V0UmVmLCBwYXJlbnRSZWYsIGluZGV4XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRBdHRyID0gZnVuY3Rpb24gKHJlZiwga2V5LCB2YWx1ZSkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICByZXN1bHRba2V5XSA9IHZhbHVlXG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3VwZGF0ZUF0dHJzJywgW3JlZiwgcmVzdWx0XSkpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChyZWYsIGtleSwgdmFsdWUpIHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICB0aGlzLmFkZEFjdGlvbnMoY3JlYXRlQWN0aW9uKCd1cGRhdGVTdHlsZScsIFtyZWYsIHJlc3VsdF0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuc2V0U3R5bGVzID0gZnVuY3Rpb24gKHJlZiwgc3R5bGUpIHtcbiAgdGhpcy5hZGRBY3Rpb25zKGNyZWF0ZUFjdGlvbigndXBkYXRlU3R5bGUnLCBbcmVmLCBzdHlsZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ2FkZEV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiAocmVmLCB0eXBlKSB7XG4gIHRoaXMuYWRkQWN0aW9ucyhjcmVhdGVBY3Rpb24oJ3JlbW92ZUV2ZW50JywgW3JlZiwgdHlwZV0pKVxufVxuXG5MaXN0ZW5lci5wcm90b3R5cGUuaGFuZGxlciA9IGZ1bmN0aW9uIChhY3Rpb25zLCBjYikge1xuICBjYiAmJiBjYigpXG59XG5cbkxpc3RlbmVyLnByb3RvdHlwZS5hZGRBY3Rpb25zID0gZnVuY3Rpb24gKGFjdGlvbnMpIHtcbiAgY29uc3QgdXBkYXRlcyA9IHRoaXMudXBkYXRlc1xuICBjb25zdCBoYW5kbGVyID0gdGhpcy5oYW5kbGVyXG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSB7XG4gICAgYWN0aW9ucyA9IFthY3Rpb25zXVxuICB9XG5cbiAgaWYgKHRoaXMuYmF0Y2hlZCkge1xuICAgIHVwZGF0ZXMucHVzaC5hcHBseSh1cGRhdGVzLCBhY3Rpb25zKVxuICB9XG4gIGVsc2Uge1xuICAgIGhhbmRsZXIoYWN0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQWN0aW9uKG5hbWUsIGFyZ3MpIHtcbiAgcmV0dXJuIHttb2R1bGU6ICdkb20nLCBtZXRob2Q6IG5hbWUsIGFyZ3M6IGFyZ3N9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZG9tLWxpc3RlbmVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlmZmVyIHtcbiAgY29uc3RydWN0b3IgKGlkKSB7XG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5tYXAgPSBbXVxuICAgIHRoaXMuaG9va3MgPSBbXVxuICB9XG4gIGlzRW1wdHkgKCkge1xuICAgIHJldHVybiB0aGlzLm1hcC5sZW5ndGggPT09IDBcbiAgfVxuICBhcHBlbmQgKHR5cGUsIGRlcHRoLCByZWYsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBtYXAgPSB0aGlzLm1hcFxuICAgIGlmICghbWFwW2RlcHRoXSkge1xuICAgICAgbWFwW2RlcHRoXSA9IHt9XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwID0gbWFwW2RlcHRoXVxuICAgIGlmICghZ3JvdXBbdHlwZV0pIHtcbiAgICAgIGdyb3VwW3R5cGVdID0ge31cbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdlbGVtZW50Jykge1xuICAgICAgaWYgKCFncm91cFt0eXBlXVtyZWZdKSB7XG4gICAgICAgIGdyb3VwW3R5cGVdW3JlZl0gPSBbXVxuICAgICAgfVxuICAgICAgZ3JvdXBbdHlwZV1bcmVmXS5wdXNoKGhhbmRsZXIpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZ3JvdXBbdHlwZV1bcmVmXSA9IGhhbmRsZXJcbiAgICB9XG4gIH1cbiAgZmx1c2ggKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwLnNsaWNlKClcbiAgICB0aGlzLm1hcC5sZW5ndGggPSAwXG4gICAgbWFwLmZvckVhY2goKGdyb3VwKSA9PiB7XG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3JlcGVhdCcpXG4gICAgICBjYWxsVHlwZU1hcChncm91cCwgJ3Nob3duJylcbiAgICAgIGNhbGxUeXBlTGlzdChncm91cCwgJ2VsZW1lbnQnKVxuICAgIH0pXG5cbiAgICBjb25zdCBob29rcyA9IHRoaXMuaG9va3Muc2xpY2UoKVxuICAgIHRoaXMuaG9va3MubGVuZ3RoID0gMFxuICAgIGhvb2tzLmZvckVhY2goKGZuKSA9PiB7XG4gICAgICBmbigpXG4gICAgfSlcblxuICAgIGlmICghdGhpcy5pc0VtcHR5KCkpIHtcbiAgICAgIHRoaXMuZmx1c2goKVxuICAgIH1cbiAgfVxuICB0aGVuIChmbikge1xuICAgIHRoaXMuaG9va3MucHVzaChmbilcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxsVHlwZU1hcChncm91cCwgdHlwZSkge1xuICBjb25zdCBtYXAgPSBncm91cFt0eXBlXVxuICBmb3IgKGNvbnN0IHJlZiBpbiBtYXApIHtcbiAgICBtYXBbcmVmXSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbFR5cGVMaXN0KGdyb3VwLCB0eXBlKSB7XG4gIGNvbnN0IG1hcCA9IGdyb3VwW3R5cGVdXG4gIGZvciAoY29uc3QgcmVmIGluIG1hcCkge1xuICAgIGNvbnN0IGxpc3QgPSBtYXBbcmVmXVxuICAgIGxpc3QuZm9yRWFjaCgoaGFuZGxlcikgPT4ge2hhbmRsZXIoKX0pXG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL2FwcC9kaWZmZXIuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXcgZXZlbnQgbWFuYWdlclxuICovXG5cbmltcG9ydCAqIGFzIF8gZnJvbSAnLi4vdXRpbCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRXZlbnRNYW5hZ2VyKCkge1xuICB0aGlzLmVscyA9IFtdXG4gIHRoaXMudGFyZ2V0cyA9IFtdXG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuX2dldCA9IGZ1bmN0aW9uIChlbCwgZm9yY2UpIHtcbiAgdmFyIGluZGV4ID0gXy5pbmRleE9mKHRoaXMuZWxzLCBlbClcbiAgdmFyIHRhcmdldFxuICBpZiAoaW5kZXggPj0gMCkge1xuICAgIHRhcmdldCA9IHRoaXMudGFyZ2V0c1tpbmRleF1cbiAgfVxuICBlbHNlIGlmIChmb3JjZSkge1xuICAgIHRhcmdldCA9IHtlbDogZWwsIGV2ZW50czoge319XG4gICAgdGhpcy5lbHMucHVzaChlbClcbiAgICB0aGlzLnRhcmdldHMucHVzaCh0YXJnZXQpXG4gIH1cbiAgcmV0dXJuIHRhcmdldFxufVxuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlbCwgdHlwZSwgaGFuZGxlcikge1xuICBpZiAodHlwZW9mIGVsICE9PSAnb2JqZWN0JyB8fCAhZWwgfHxcbiAgICB0eXBlb2YgdHlwZSAhPT0gJ3N0cmluZycgfHwgIXR5cGUgfHxcbiAgICB0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0YXJnZXQgPSB0aGlzLl9nZXQoZWwsIHRydWUpXG4gIHRhcmdldC5ldmVudHNbdHlwZV0gPSBoYW5kbGVyXG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGVsLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZWwgIT09ICdvYmplY3QnIHx8ICFlbCB8fFxuICAgIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJyB8fCAhdHlwZSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciB0YXJnZXQgPSB0aGlzLl9nZXQoZWwpXG4gIGlmICh0YXJnZXQpIHtcbiAgICBkZWxldGUgdGFyZ2V0LmV2ZW50c1t0eXBlXVxuICB9XG59XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uIChlbCwgdHlwZSwgZSkge1xuICB2YXIgdGFyZ2V0ID0gdGhpcy5fZ2V0KGVsKVxuICB2YXIgaGFuZGxlciwgZWxcbiAgaWYgKHRhcmdldCkge1xuICAgIGVsID0gdGFyZ2V0LmVsXG4gICAgaGFuZGxlciA9IHRhcmdldC5ldmVudHNbdHlwZV1cbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBoYW5kbGVyLmNhbGwoZWwsIGUpXG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcHAvZXZlbnQuanNcbiAqKi8iLCIvKipcbiAqIEBmaWxlT3ZlcnZpZXdcbiAqIEEgc2ltcGxlIHZpcnR1YWwgZG9tIGltcGxlbWVudGF0aW9uXG4gKi9cblxuY29uc3QgREVGQVVMVF9UQUdfTkFNRSA9ICdkaXYnXG5cbmV4cG9ydCBjb25zdCBpbnN0YW5jZU1hcCA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBEb2N1bWVudChpZCwgdXJsKSB7XG4gIGlkID0gaWQgPyBpZC50b1N0cmluZygpIDogJydcbiAgdGhpcy5pZCA9IGlkXG4gIHRoaXMuVVJMID0gdXJsXG4gIHRoaXMubmV4dFJlZiA9IDFcbiAgdGhpcy5ub2RlTWFwID0ge31cbiAgdGhpcy5saXN0ZW5lciA9IG51bGxcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBudWxsXG4gIHRoaXMuY2xvc2VkID0gZmFsc2VcbiAgaW5zdGFuY2VNYXBbaWRdID0gdGhpc1xuXG4gIHRoaXMuY3JlYXRlRG9jdW1lbnRFbGVtZW50KClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3lEb2N1bWVudChpZCkge1xuICBkZWxldGUgaW5zdGFuY2VNYXBbaWRdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IGZhbHNlXG4gIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lci5iYXRjaGVkID0gZmFsc2VcbiAgfVxufVxuRG9jdW1lbnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsb3NlZCA9IHRydWVcbiAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyLmJhdGNoZWQgPSB0cnVlXG4gIH1cbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIChldmVudE1hbmFnZXIpIHtcbiAgdGhpcy5ldmVudE1hbmFnZXIgPSBldmVudE1hbmFnZXJcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLnNldExpc3RlbmVyID0gZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lclxuICBsaXN0ZW5lci5iYXRjaGVkID0gISF0aGlzLmNsb3NlZFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuYWRkUmVmID0gZnVuY3Rpb24gKGVsKSB7XG4gIGVsLnJlZiA9IHRoaXMubmV4dFJlZi50b1N0cmluZygpXG4gIHRoaXMubm9kZU1hcFtlbC5yZWZdID0gZWxcbiAgdGhpcy5uZXh0UmVmKytcbn1cblxuRG9jdW1lbnQucHJvdG90eXBlLmdldFJlZiA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgcmV0dXJuIHRoaXMubm9kZU1hcFtyZWZdXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5yZW1vdmVSZWYgPSBmdW5jdGlvbiAocmVmKSB7XG4gIGRlbGV0ZSB0aGlzLm5vZGVNYXBbcmVmXVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRG9jdW1lbnRFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIHByb3BzKSB7XG4gIGlmICghdGhpcy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudCA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fZG9jdW1lbnRFbGVtZW50ID0gdGhpcy5kb2N1bWVudEVsZW1lbnRcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5yZWYgPSAnX2RvY3VtZW50RWxlbWVudCdcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5hdHRhY2hlZCA9IHRydWVcbiAgfVxuXG4gIHJldHVybiB0aGlzLmRvY3VtZW50RWxlbWVudFxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlQm9keSA9IGZ1bmN0aW9uICh0eXBlLCBwcm9wcykge1xuICBpZiAoIXRoaXMuYm9keSkge1xuICAgIHRoaXMuYm9keSA9IG5ldyBFbGVtZW50KHR5cGUsIHByb3BzLCB0aGlzKVxuICAgIHRoaXMubm9kZU1hcC5fcm9vdCA9IHRoaXMuYm9keVxuICAgIHRoaXMuYm9keS5yZWYgPSAnX3Jvb3QnXG4gICAgdGhpcy5ib2R5LmRlcHRoID0gMVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuYm9keVxufVxuXG5Eb2N1bWVudC5wcm90b3R5cGUuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0YWdOYW1lLCBwcm9wcykge1xuICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIHRoaXMpXG59XG5cbkRvY3VtZW50LnByb3RvdHlwZS5jcmVhdGVDb21tZW50ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgcmV0dXJuIG5ldyBDb21tZW50KHRleHQsIHRoaXMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlKCkge1xufVxuXG5Ob2RlLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoaW5zdGFuY2VJZCkge1xuICB0aGlzLnBhcmVudFJlZiA9IG51bGxcbiAgdGhpcy5hdHRhY2hlZCA9IGZhbHNlXG4gIGlmIChpbnN0YW5jZUlkKSB7XG4gICAgdGhpcy5pbnN0YW5jZUlkID0gaW5zdGFuY2VJZFxuICAgIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gICAgZG9jLmFkZFJlZih0aGlzKVxuICB9XG59XG5cbk5vZGUucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHJlZiA9IHRoaXMucmVmXG4gIGNvbnN0IGluc3RhbmNlSWQgPSB0aGlzLmluc3RhbmNlSWRcbiAgaWYgKGluc3RhbmNlSWQpIHtcbiAgICBjb25zdCBkb2MgPSBpbnN0YW5jZU1hcFtpbnN0YW5jZUlkXVxuICAgIGRvYy5yZW1vdmVSZWYocmVmKVxuICB9XG5cbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuIHx8IFtdXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY2hpbGRyZW5baV0uZGVzdHJveSgpXG4gIH1cbn1cblxuTm9kZS5wcm90b3R5cGUuZ2V0UmVuZGVyZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW3RoaXMuaW5zdGFuY2VJZF1cbiAgcmV0dXJuIGRvYy5saXN0ZW5lclxufVxuXG5Ob2RlLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpICsgMV1cbiAgfVxufVxuXG5Ob2RlLnByb3RvdHlwZS5wcmV2ID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBpbnN0YW5jZUlkID0gdGhpcy5pbnN0YW5jZUlkXG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW2luc3RhbmNlSWRdXG4gIGNvbnN0IHBhcmVudCA9IGRvYy5nZXRSZWYodGhpcy5wYXJlbnRSZWYpXG4gIGlmIChwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmNoaWxkcmVuW3BhcmVudC5jaGlsZHJlbi5pbmRleE9mKHRoaXMpIC0gMV1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRWxlbWVudCh0eXBlPURFRkFVTFRfVEFHX05BTUUsIHByb3BzLCBvd25lckRvY3VtZW50KSB7XG4gIHByb3BzID0gcHJvcHMgfHwge31cbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy5vd25lckRvY3VtZW50ID0gb3duZXJEb2N1bWVudFxuICB0aGlzLnR5cGUgPSB0eXBlXG4gIHRoaXMuYXR0ciA9IHByb3BzLmF0dHIgfHwge31cbiAgdGhpcy5jbGFzc1N0eWxlID0gcHJvcHMuY2xhc3NTdHlsZSB8fCB7fVxuICB0aGlzLnN0eWxlID0gcHJvcHMuc3R5bGUgfHwge31cbiAgdGhpcy5ldmVudCA9IFtdXG4gIHRoaXMuY2hpbGRyZW4gPSBbXVxuICB0aGlzLnB1cmVDaGlsZHJlbiA9IFtdXG59XG5cbkVsZW1lbnQucHJvdG90eXBlID0gbmV3IE5vZGUoKVxuXG5FbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgcmVtb3ZlSWZFeGlzdGVkKG5vZGUpXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cblxuICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICB0aGlzLnB1cmVDaGlsZHJlbi5wdXNoKG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICBpZiAodGhpcy5yZWYgPT09ICdfZG9jdW1lbnRFbGVtZW50Jykge1xuICAgICAgICAgIC8vIGlmIGl0cyBwYXJlbnQgaXMgZG9jdW1lbnRFbGVtZW50IHRoZW4gaXQncyBhIGJvZHlcbiAgICAgICAgICByZW5kZXJlci5jcmVhdGVCb2R5KG5vZGUsIHRoaXMucmVmKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJlbmRlcmVyLmFkZEVsZW1lbnQobm9kZSwgdGhpcy5yZWYpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKG5vZGUsIGJlZm9yZSkge1xuXG4gIGlmIChub2RlLnBhcmVudFJlZiA9PT0gdGhpcy5yZWYpIHtcbiAgICBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVCZWZvcmVJbmRleCA9IG1vdmVQdXJlQmVmb3JlKG5vZGUsIGJlZm9yZSwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUJlZm9yZUluZGV4ID49IDAgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgICByZW5kZXJlci5tb3ZlRWxlbWVudChub2RlLnJlZiwgdGhpcy5yZWYsIHB1cmVCZWZvcmVJbmRleClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUlmRXhpc3RlZChub2RlKVxuXG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2YoYmVmb3JlKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9XG4gIGVsc2Uge1xuICAgIHNldERldGFjaGVkKG5vZGUpXG4gIH1cbiAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXgsIDAsIG5vZGUpXG5cbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5hZGRFbGVtZW50KG5vZGUsIHRoaXMucmVmLCBwdXJlSW5kZXgpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKG5vZGUsIGFmdGVyKSB7XG5cbiAgaWYgKG5vZGUucGFyZW50UmVmID09PSB0aGlzLnJlZikge1xuICAgIG1vdmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5jaGlsZHJlbilcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IHB1cmVBZnRlckluZGV4ID0gbW92ZVB1cmVBZnRlcihub2RlLCBhZnRlciwgdGhpcy5wdXJlQ2hpbGRyZW4pXG4gICAgICBpZiAocHVyZUFmdGVySW5kZXggPj0gMCAmJiB0aGlzLmF0dGFjaGVkKSB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICAgIHJlbmRlcmVyLm1vdmVFbGVtZW50KG5vZGUucmVmLCB0aGlzLnJlZiwgcHVyZUFmdGVySW5kZXgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW1vdmVJZkV4aXN0ZWQobm9kZSlcblxuICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5cbiAgY29uc3QgaW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIG5vZGUucGFyZW50UmVmID0gdGhpcy5yZWZcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBzZXRBdHRhY2hlZChub2RlLCB0aGlzLmRlcHRoKVxuICB9IGVsc2Uge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgc2V0RGV0YWNoZWQobm9kZSlcbiAgfVxuICBjaGlsZHJlbi5zcGxpY2UoaW5kZXggKyAxLCAwLCBub2RlKVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGNvbnN0IHB1cmVDaGlsZHJlbiA9IHRoaXMucHVyZUNoaWxkcmVuXG4gICAgY29uc3QgcHVyZUluZGV4ID0gZ2V0UHVyZUJlZm9yZShhZnRlciwgcHVyZUNoaWxkcmVuKVxuXG4gICAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlSW5kZXggKyAxLCAwLCBub2RlKVxuXG4gICAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgICBpZiAocmVuZGVyZXIpIHtcbiAgICAgICAgcmVuZGVyZXIuYWRkRWxlbWVudChub2RlLCB0aGlzLnJlZiwgcHVyZUluZGV4ICsgMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAobm9kZSwgcHJlc2VydmVkKSB7XG4gIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5jaGlsZHJlblxuICBjb25zdCBpbmRleCA9IGNoaWxkcmVuLmluZGV4T2Yobm9kZSlcblxuICBzZXREZXRhY2hlZChub2RlKVxuXG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgbm9kZS5wYXJlbnRSZWYgPSBudWxsXG4gICAgY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKVxuICAgIGlmICghcHJlc2VydmVkKSB7XG4gICAgICBub2RlLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIHRoaXMucHVyZUNoaWxkcmVuLiRyZW1vdmUobm9kZSlcbiAgICBpZiAodGhpcy5hdHRhY2hlZCkge1xuICAgICAgY29uc3QgcmVuZGVyZXIgPSB0aGlzLmdldFJlbmRlcmVyKClcbiAgICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgICByZW5kZXJlci5yZW1vdmVFbGVtZW50KG5vZGUucmVmKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuXG4gIGNvbnN0IGxlbmd0aCA9IGNoaWxkcmVuLmxlbmd0aFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGQgPSBjaGlsZHJlbltpXVxuICAgIGNoaWxkLnBhcmVudFJlZiA9IG51bGxcbiAgICBzZXREZXRhY2hlZChjaGlsZClcbiAgICBjaGlsZC5kZXN0cm95KClcbiAgfVxuICBjaGlsZHJlbi5sZW5ndGggPSAwXG5cbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZWZzID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQucmVmKVxuICAgIHRoaXMucHVyZUNoaWxkcmVuLmxlbmd0aCA9IDBcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIucmVtb3ZlRWxlbWVudChyZWZzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtb3ZlQmVmb3JlKG5vZGUsIGJlZm9yZSwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGJlZm9yZUluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihiZWZvcmUpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRhcmdldEluZGV4ID09PSBiZWZvcmVJbmRleCB8fCB0YXJnZXRJbmRleCArIDEgPT09IGJlZm9yZUluZGV4KSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBuZXdJbmRleCA9IHRhcmdldEluZGV4IDwgYmVmb3JlSW5kZXggPyBiZWZvcmVJbmRleCAtIDEgOiBiZWZvcmVJbmRleFxuICBjaGlsZHJlbi5zcGxpY2UodGFyZ2V0SW5kZXgsIDEpXG4gIGNoaWxkcmVuLnNwbGljZShuZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gYmVmb3JlSW5kZXhcbn1cblxuZnVuY3Rpb24gbW92ZVB1cmVCZWZvcmUobm9kZSwgYmVmb3JlLCBwdXJlQ2hpbGRyZW4pIHtcbiAgY29uc3QgcHVyZVRhcmdldEluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgY29uc3QgcHVyZUJlZm9yZUluZGV4ID0gZ2V0UHVyZUFmdGVyKGJlZm9yZSwgcHVyZUNoaWxkcmVuKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmIChwdXJlVGFyZ2V0SW5kZXggPT09IHB1cmVCZWZvcmVJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCArIDEgPT09IHB1cmVCZWZvcmVJbmRleCkge1xuICAgIHJldHVybiAtMVxuICB9XG5cbiAgY29uc3QgcHVyZU5ld0luZGV4ID0gcHVyZVRhcmdldEluZGV4IDwgcHVyZUJlZm9yZUluZGV4XG4gICAgPyBwdXJlQmVmb3JlSW5kZXggLSAxXG4gICAgOiBwdXJlQmVmb3JlSW5kZXhcblxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVUYXJnZXRJbmRleCwgMSlcbiAgcHVyZUNoaWxkcmVuLnNwbGljZShwdXJlTmV3SW5kZXgsIDAsIG5vZGUpXG5cbiAgcmV0dXJuIHB1cmVCZWZvcmVJbmRleFxufVxuXG5mdW5jdGlvbiBnZXRQdXJlQWZ0ZXIobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUubmV4dCgpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IHB1cmVDaGlsZHJlbi5sZW5ndGhcbiAgfVxuICByZXR1cm4gcHVyZUluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVBZnRlcihub2RlLCBhZnRlciwgY2hpbGRyZW4pIHtcbiAgY29uc3QgdGFyZ2V0SW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKG5vZGUpXG4gIGNvbnN0IGFmdGVySW5kZXggPSBjaGlsZHJlbi5pbmRleE9mKGFmdGVyKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCB8fCB0YXJnZXRJbmRleCA9PT0gYWZ0ZXJJbmRleCArIDEpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuXG4gIGNvbnN0IG5ld0luZGV4ID0gdGFyZ2V0SW5kZXggPCBhZnRlckluZGV4ID8gYWZ0ZXJJbmRleCA6IGFmdGVySW5kZXggKyAxXG4gIGNoaWxkcmVuLnNwbGljZSh0YXJnZXRJbmRleCwgMSlcbiAgY2hpbGRyZW4uc3BsaWNlKG5ld0luZGV4LCAwLCBub2RlKVxuXG4gIHJldHVybiBhZnRlckluZGV4XG59XG5cbmZ1bmN0aW9uIG1vdmVQdXJlQWZ0ZXIobm9kZSwgYWZ0ZXIsIHB1cmVDaGlsZHJlbikge1xuICBjb25zdCBwdXJlVGFyZ2V0SW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICBjb25zdCBwdXJlQWZ0ZXJJbmRleCA9IGdldFB1cmVCZWZvcmUoYWZ0ZXIsIHB1cmVDaGlsZHJlbilcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZVRhcmdldEluZGV4ID09PSBwdXJlQWZ0ZXJJbmRleCB8fFxuICAgIHB1cmVUYXJnZXRJbmRleCA9PT0gcHVyZUFmdGVySW5kZXggKyAxKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cblxuICBjb25zdCBwdXJlTmV3SW5kZXggPSBwdXJlVGFyZ2V0SW5kZXggPCBwdXJlQWZ0ZXJJbmRleFxuICAgID8gcHVyZUFmdGVySW5kZXhcbiAgICA6IHB1cmVBZnRlckluZGV4ICsgMVxuXG4gIHB1cmVDaGlsZHJlbi5zcGxpY2UocHVyZVRhcmdldEluZGV4LCAxKVxuICBwdXJlQ2hpbGRyZW4uc3BsaWNlKHB1cmVOZXdJbmRleCwgMCwgbm9kZSlcblxuICByZXR1cm4gcHVyZUFmdGVySW5kZXggKyAxXG59XG5cbmZ1bmN0aW9uIGdldFB1cmVCZWZvcmUobm9kZSwgcHVyZUNoaWxkcmVuKSB7XG4gIGxldCBwdXJlSW5kZXggPSBwdXJlQ2hpbGRyZW4uaW5kZXhPZihub2RlKVxuICB3aGlsZSAobm9kZSAmJiBwdXJlSW5kZXggPCAwKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldigpXG4gICAgcHVyZUluZGV4ID0gcHVyZUNoaWxkcmVuLmluZGV4T2Yobm9kZSlcbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAocHVyZUluZGV4IDwgMCkge1xuICAgIHB1cmVJbmRleCA9IC0xXG4gIH1cbiAgcmV0dXJuIHB1cmVJbmRleFxufVxuXG5mdW5jdGlvbiBzZXRBdHRhY2hlZChub2RlLCBkZXB0aCkge1xuICBpZiAobm9kZS5yZWYgPT09ICdfcm9vdCcpIHtcbiAgICBkZXB0aCA9IDFcbiAgfVxuICBlbHNlIHtcbiAgICBkZXB0aCA9IGRlcHRoID4gMCA/IGRlcHRoICsgMSA6IDBcbiAgfVxuICBub2RlLmF0dGFjaGVkID0gdHJ1ZVxuICBub2RlLmRlcHRoID0gZGVwdGhcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKHN1YikgPT4ge1xuICAgICAgc2V0QXR0YWNoZWQoc3ViLCBkZXB0aClcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNldERldGFjaGVkKG5vZGUpIHtcbiAgbm9kZS5hdHRhY2hlZCA9IGZhbHNlXG4gIG5vZGUuZGVwdGggPSAwXG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChzdWIpID0+IHtcbiAgICAgIHNldERldGFjaGVkKHN1YilcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUlmRXhpc3RlZChub2RlKSB7XG4gIGNvbnN0IGRvYyA9IGluc3RhbmNlTWFwW25vZGUuaW5zdGFuY2VJZF1cbiAgaWYgKGRvYykge1xuICAgIGNvbnN0IGV4aXN0ZWROb2RlID0gZG9jLmdldFJlZihub2RlLnJlZilcbiAgICBpZiAoZXhpc3RlZE5vZGUpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWRQYXJlbnQgPSBkb2MuZ2V0UmVmKGV4aXN0ZWROb2RlLnBhcmVudFJlZilcbiAgICAgIGlmIChleGlzdGVkUGFyZW50ICYmIGV4aXN0ZWRQYXJlbnQucmVtb3ZlQ2hpbGQpIHtcbiAgICAgICAgZXhpc3RlZFBhcmVudC5yZW1vdmVDaGlsZChleGlzdGVkTm9kZSwgdHJ1ZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBzaWxlbnQpIHtcbiAgaWYgKHRoaXMuYXR0cltrZXldID09PSB2YWx1ZSkge1xuICAgIHJldHVyblxuICB9XG4gIHRoaXMuYXR0cltrZXldID0gdmFsdWVcbiAgaWYgKCFzaWxlbnQgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRBdHRyKHRoaXMucmVmLCBrZXksIHZhbHVlKVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBzaWxlbnQpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0aGlzLnN0eWxlW2tleV0gPT09IHZhbHVlKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5zdHlsZVtrZXldID0gdmFsdWVcbiAgaWYgKCFzaWxlbnQgJiYgdGhpcy5hdHRhY2hlZCkge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5nZXRSZW5kZXJlcigpXG4gICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICByZW5kZXJlci5zZXRTdHlsZSh0aGlzLnJlZiwga2V5LCB2YWx1ZSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuc2V0Q2xhc3NTdHlsZSA9IGZ1bmN0aW9uIChjbGFzc1N0eWxlKSB7XG4gIHRoaXMuY2xhc3NTdHlsZSA9IGNsYXNzU3R5bGVcbiAgaWYgKHRoaXMuYXR0YWNoZWQpIHtcbiAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgIGlmIChyZW5kZXJlcikge1xuICAgICAgcmVuZGVyZXIuc2V0U3R5bGVzKHRoaXMucmVmLCB0aGlzLnRvU3R5bGUoKSlcbiAgICB9XG4gIH1cbn1cblxuRWxlbWVudC5wcm90b3R5cGUuYWRkRXZlbnQgPSBmdW5jdGlvbiAodHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBpbmRleCA9IHRoaXMuZXZlbnQuaW5kZXhPZih0eXBlKVxuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICB0aGlzLmV2ZW50LnB1c2godHlwZSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5hZGQodGhpcywgdHlwZSwgaGFuZGxlcilcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLmFkZEV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIGNvbnN0IGluZGV4ID0gdGhpcy5ldmVudC5pbmRleE9mKHR5cGUpXG5cbiAgaWYgKGluZGV4ID49IDApIHtcbiAgICB0aGlzLmV2ZW50LnNwbGljZShpbmRleCwgMSlcbiAgICBsZXQgZXZlbnRNYW5hZ2VyID0gdGhpcy5vd25lckRvY3VtZW50LmV2ZW50TWFuYWdlclxuICAgIGV2ZW50TWFuYWdlci5yZW1vdmUodGhpcywgdHlwZSlcblxuICAgIGlmICh0aGlzLmF0dGFjaGVkKSB7XG4gICAgICBjb25zdCByZW5kZXJlciA9IHRoaXMuZ2V0UmVuZGVyZXIoKVxuICAgICAgaWYgKHJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyLnJlbW92ZUV2ZW50KHRoaXMucmVmLCB0eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5FbGVtZW50LnByb3RvdHlwZS50b1N0eWxlID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBjb25zdCBjbGFzc1N0eWxlID0gdGhpcy5jbGFzc1N0eWxlXG4gIGNvbnN0IHN0eWxlID0gdGhpcy5zdHlsZVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gY2xhc3NTdHlsZSkge1xuICAgIHJlc3VsdFtuYW1lXSA9IGNsYXNzU3R5bGVbbmFtZV1cbiAgfVxuICBmb3IgKGNvbnN0IG5hbWUgaW4gc3R5bGUpIHtcbiAgICByZXN1bHRbbmFtZV0gPSBzdHlsZVtuYW1lXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuRWxlbWVudC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCByZXN1bHQgPSB7XG4gICAgcmVmOiB0aGlzLnJlZi50b1N0cmluZygpLFxuICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICBhdHRyOiB0aGlzLmF0dHIsXG4gICAgc3R5bGU6IHRoaXMudG9TdHlsZSgpXG4gIH1cblxuICBpZiAodGhpcy5ldmVudCAmJiB0aGlzLmV2ZW50Lmxlbmd0aCkge1xuICAgIHJlc3VsdC5ldmVudCA9IHRoaXMuZXZlbnRcbiAgfVxuICBpZiAodGhpcy5wdXJlQ2hpbGRyZW4gJiYgdGhpcy5wdXJlQ2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmNoaWxkcmVuID0gdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9KU09OKCkpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbkVsZW1lbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJzwnICsgdGhpcy50eXBlICtcbiAgICAnIGF0dHI9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMuYXR0cikgK1xuICAgICcgc3R5bGU9JyArIEpTT04uc3RyaW5naWZ5KHRoaXMudG9TdHlsZSgpKSArICc+JyArXG4gICAgdGhpcy5wdXJlQ2hpbGRyZW4ubWFwKChjaGlsZCkgPT4gY2hpbGQudG9TdHJpbmcoKSkuam9pbignJykgK1xuICAgICc8LycgKyB0aGlzLnR5cGUgKyAnPidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENvbW1lbnQodmFsdWUsIG93bmVyRG9jdW1lbnQpIHtcbiAgdGhpcy5jcmVhdGUob3duZXJEb2N1bWVudC5pZClcbiAgdGhpcy50eXBlID0gJ2NvbW1lbnQnXG4gIHRoaXMudmFsdWUgPSB2YWx1ZVxufVxuXG5Db21tZW50LnByb3RvdHlwZSA9IG5ldyBOb2RlKClcblxuQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnPCEtLSAnICsgdGhpcy52YWx1ZSArICcgLS0+J1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvYXBwL2RvbS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcIm5hbWVcIjogXCJ3ZWV4LWpzZnJhbWV3b3JrXCIsXG5cdFwidmVyc2lvblwiOiBcIjAuMTMuMTBcIixcblx0XCJkZXNjcmlwdGlvblwiOiBcIkpTIEZyYW1ld29yayBmb3IgV2VleCBzb2x1dGlvbiB3aGljaCBpcyBhIGV4dGVuZGFibGUgY3Jvc3MtcGxhdGZvcm0gc29sdXRpb24gZm9yIGR5bmFtaWMgcHJvZ3JhbW1pbmcgYW5kIHB1Ymxpc2hpbmcgcHJvamVjdHNcIixcblx0XCJtYWluXCI6IFwiaW5kZXguanNcIixcblx0XCJzY3JpcHRzXCI6IHtcblx0XHRcImRldlwiOiBcIndlYnBhY2sgLS13YXRjaCAtLWNvbmZpZyAuL3dlYnBhY2suY29uZmlnLmpzXCIsXG5cdFx0XCJidWlsZFwiOiBcIndlYnBhY2sgLS1jb25maWcgLi93ZWJwYWNrLmNvbmZpZy5qc1wiLFxuXHRcdFwiY29tcHJlc3NcIjogXCJ1Z2xpZnlqcyBkaXN0L2luZGV4LmpzIC1vIGRpc3QvaW5kZXgubWluLmpzXCIsXG5cdFx0XCJsaW50XCI6IFwianNjcyAtLWNvbmZpZyAuanNjc3JjIHBvbHlmaWxsLyouanMgcG9seWZpbGwvX190ZXN0X18vKi5qcyBsaWIvKi5qcyBsaWIvX190ZXN0X18vKi5qcyBsaWIvYXBwLyouanMgbGliL2FwcC9fX3Rlc3RfXy8qLmpzIGxpYi92bS8qLmpzIGxpYi92bS9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJ0ZXN0XCI6IFwibW9jaGEgLS1jb21waWxlcnMganM6YmFiZWwtY29yZS9yZWdpc3RlciBwb2x5ZmlsbC9fX3Rlc3RfXy8qLmpzIGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi8qKi9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJjb3ZlclwiOiBcImJhYmVsLW5vZGUgbm9kZV9tb2R1bGVzL2lzcGFydGEvYmluL2lzcGFydGEgY292ZXIgLS1yZXBvcnQgdGV4dCBub2RlX21vZHVsZXMvbW9jaGEvYmluL19tb2NoYSAtLSAtLXJlcG9ydGVyIGRvdCBwb2x5ZmlsbC9fX3Rlc3RfXy8qLmpzIGxpYi9fX3Rlc3RfXy8qLmpzIGxpYi8qKi9fX3Rlc3RfXy8qLmpzXCIsXG5cdFx0XCJjaVwiOiBcIm5wbSBydW4gbGludCAmJiBucG0gcnVuIGNvdmVyXCJcblx0fSxcblx0XCJyZXBvc2l0b3J5XCI6IHtcblx0XHRcInR5cGVcIjogXCJnaXRcIixcblx0XHRcInVybFwiOiBcImdpdEBnaXRodWIuY29tOmFsaWJhYmEvd2VleC5naXRcIlxuXHR9LFxuXHRcImF1dGhvclwiOiBbXG5cdFx0e1xuXHRcdFx0XCJuYW1lXCI6IFwiamluamlhbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJ6aGFvamluamlhbmdAbWUuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcIlRlcnJ5IEtpbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJ0ZXJyeWtpbmdjaGFAZ21haWwuY29tXCJcblx0XHR9XG5cdF0sXG5cdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJwdXNoaW1pbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJwdXNoaW1pbmdAZ21haWwuY29tXCJcblx0XHR9LFxuXHRcdHtcblx0XHRcdFwibmFtZVwiOiBcImlza2VuaHVhbmdcIixcblx0XHRcdFwiZW1haWxcIjogXCJpc2tlbmh1YW5nQGdtYWlsLmNvbVwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRcIm5hbWVcIjogXCJ5dWFueWFuXCIsXG5cdFx0XHRcImVtYWlsXCI6IFwieXVhbnlhbi5jYW9AZ21haWwuY29tXCJcblx0XHR9XG5cdF0sXG5cdFwia2V5d29yZHNcIjogW1xuXHRcdFwid2VleFwiLFxuXHRcdFwibXZ2bVwiLFxuXHRcdFwiYnJvd3NlclwiLFxuXHRcdFwiaHlicmlkXCIsXG5cdFx0XCJmcmFtZXdvcmtcIlxuXHRdLFxuXHRcImxpY2Vuc2VcIjogXCJBcGFjaGUtMi4wXCIsXG5cdFwiZGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcInNlbXZlclwiOiBcIn41LjEuMFwiLFxuXHRcdFwiY29yZS1qc1wiOiBcIn4yLjEuMVwiXG5cdH0sXG5cdFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcblx0XHRcImJhYmVsLWNsaVwiOiBcIn42LjQuNVwiLFxuXHRcdFwiYmFiZWwtY29yZVwiOiBcIn42LjQuNVwiLFxuXHRcdFwiYmFiZWwtbG9hZGVyXCI6IFwifjYuMi4xXCIsXG5cdFx0XCJiYWJlbC1wcmVzZXQtZXMyMDE1XCI6IFwifjYuMy4xM1wiLFxuXHRcdFwiY2hhaVwiOiBcIn4zLjIuMFwiLFxuXHRcdFwiaXNwYXJ0YVwiOiBcIn40LjAuMFwiLFxuXHRcdFwiaXN0YW5idWxcIjogXCJ+MC40LjJcIixcblx0XHRcImpzY3NcIjogXCJ+Mi45LjBcIixcblx0XHRcImpzb24tbG9hZGVyXCI6IFwiXjAuNS40XCIsXG5cdFx0XCJtb2NoYVwiOiBcIn4yLjMuNFwiLFxuXHRcdFwic2lub25cIjogXCJ+MS4xNy4yXCIsXG5cdFx0XCJzaW5vbi1jaGFpXCI6IFwifjIuOC4wXCIsXG5cdFx0XCJ1Z2xpZnktanNcIjogXCJeMi42LjJcIixcblx0XHRcIndhdGNoLWNsaVwiOiBcIn4wLjIuMVwiLFxuXHRcdFwid2VicGFja1wiOiBcIn4xLjEyLjEyXCJcblx0fSxcblx0XCJvcHRpb25hbERlcGVuZGVuY2llc1wiOiB7XG5cdFx0XCJ3ZWV4LXRyYW5zZm9ybWVyXCI6IFwiPj0wLjEuNSA8MC40XCJcblx0fVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcGFja2FnZS5qc29uXG4gKiogbW9kdWxlIGlkID0gNzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQGZpbGVPdmVydmlldyBUaGUgYXBpIGZvciBpbnZva2luZyB3aXRoIFwiJFwiIHByZWZpeFxuICovXG5pbXBvcnQgKiBhcyBfIGZyb20gJy4uL3V0aWwnXG5cbi8qKlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogY29tbW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgJHZtIGluc3RlYWRcbiAqIGZpbmQgdGhlIHZtIGJ5IGlkXG4gKiBOb3RlOiB0aGVyZSBpcyBvbmx5IG9uZSBpZCBpbiB3aG9sZSBjb21wb25lbnRcbiAqIEBwYXJhbSAge3N0cmluZ30gaWRcbiAqIEByZXR1cm4ge1ZtfVxuICovXG5leHBvcnQgZnVuY3Rpb24gJChpZCkge1xuICBfLndhcm4oJ1ZtIyQgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBWbSMkdm0gaW5zdGVhZCcpXG4gIGNvbnN0IGluZm8gPSB0aGlzLl9pZHNbaWRdXG4gIGlmIChpbmZvKSB7XG4gICAgcmV0dXJuIGluZm8udm1cbiAgfVxufVxuXG4vKipcbiAqIGZpbmQgdGhlIGVsZW1lbnQgYnkgaWRcbiAqIE5vdGU6IHRoZXJlIGlzIG9ubHkgb25lIGlkIGluIHdob2xlIGNvbXBvbmVudFxuICogQHBhcmFtICB7c3RyaW5nfSBpZFxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRlbChpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLmVsXG4gIH1cbn1cblxuLyoqXG4gKiBmaW5kIHRoZSB2bSBvZiB0aGUgY3VzdG9tIGNvbXBvbmVudCBieSBpZFxuICogTm90ZTogdGhlcmUgaXMgb25seSBvbmUgaWQgaW4gd2hvbGUgY29tcG9uZW50XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcmV0dXJuIHtWbX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICR2bShpZCkge1xuICBjb25zdCBpbmZvID0gdGhpcy5faWRzW2lkXVxuICBpZiAoaW5mbykge1xuICAgIHJldHVybiBpbmZvLnZtXG4gIH1cbn1cblxuLyoqXG4gKiBGaXJlIHdoZW4gZGlmZmVyIHJlbmRlcmluZyBmaW5pc2hlZFxuICpcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICovXG5leHBvcnQgZnVuY3Rpb24gJHJlbmRlclRoZW4oZm4pIHtcbiAgY29uc3QgYXBwID0gdGhpcy5fYXBwXG4gIGNvbnN0IGRpZmZlciA9IGFwcC5kaWZmZXJcbiAgcmV0dXJuIGRpZmZlci50aGVuKCgpID0+IHtcbiAgICBmbigpXG4gIH0pXG59XG5cbi8qKlxuICogc2Nyb2xsIGFuIGVsZW1lbnQgc3BlY2lmaWVkIGJ5IGlkIGludG8gdmlldywgXG4gKiBtb3Jlb3ZlciBzcGVjaWZ5IGEgbnVtYmVyIG9mIG9mZnNldCBvcHRpb25hbGx5XG4gKiBAcGFyYW0gIHtzdHJpbmd9IGlkXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG9mZnNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gJHNjcm9sbFRvKGlkLCBvZmZzZXQpIHtcbiAgXy53YXJuKCdWbSMkc2Nyb2xsVG8gaXMgZGVwcmVjYXRlZCwgJysgXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9kb21cXCcpJyArIFxuICAgICAgICAgICcuc2Nyb2xsVG8oZWwsIG9wdGlvbnMpXCIgaW5zdGVhZCcpXG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCkge1xuICAgIGNvbnN0IGRvbSA9IHRoaXMuX2FwcC5yZXF1aXJlTW9kdWxlKCdkb20nKVxuICAgIGRvbS5zY3JvbGxUb0VsZW1lbnQoZWwucmVmLCB7b2Zmc2V0OiBvZmZzZXR9KVxuICB9XG59XG5cbi8qKlxuICogcGVyZm9ybSB0cmFuc2l0aW9uIGFuaW1hdGlvbiBvbiBhbiBlbGVtZW50IHNwZWNpZmllZCBieSBpZFxuICogQHBhcmFtICB7c3RyaW5nfSAgIGlkXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9uc1xuICogQHBhcmFtICB7b2JqZWN0fSAgIG9wdGlvbnMuc3R5bGVzXG4gKiBAcGFyYW0gIHtvYmplY3R9ICAgb3B0aW9ucy5kdXJhdGlvbihtcylcbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy50aW1pbmdGdW5jdGlvbl1cbiAqIEBwYXJhbSAge29iamVjdH0gICBbb3B0aW9ucy5kZWxheT0wKG1zKV1cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJHRyYW5zaXRpb24oaWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVsID0gdGhpcy4kZWwoaWQpXG4gIGlmIChlbCAmJiBvcHRpb25zICYmIG9wdGlvbnMuc3R5bGVzKSB7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ2FuaW1hdGlvbicpXG4gICAgYW5pbWF0aW9uLnRyYW5zaXRpb24oZWwucmVmLCBvcHRpb25zLCAoLi4uYXJncykgPT4ge1xuICAgICAgdGhpcy5fc2V0U3R5bGUoZWwsIG9wdGlvbnMuc3R5bGVzKVxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soLi4uYXJncylcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogZ2V0IHNvbWUgY29uZmlnXG4gKiBAcmV0dXJuIHtvYmplY3R9IHNvbWUgY29uZmlnIGZvciBhcHAgaW5zdGFuY2VcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBidW5kbGVVcmxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGVidWdcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBlbnZcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYud2VleFZlcnNpb24oZXguIDEuMC4wKVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVudi5hcHBOYW1lKGV4LiBUQi9UTSlcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuYXBwVmVyc2lvbihleC4gNS4wLjApXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZW52LnBsYXRmb3JtKGV4LiBpT1MvQW5kcm9pZClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYub3NWZXJzaW9uKGV4LiA3LjAuMClcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlbnYuZGV2aWNlTW9kZWwgKipuYXRpdmUgb25seSoqXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LltkZXZpY2VXaWR0aD03NTBdXG4gKiBAcHJvcGVydHkge251bWJlcn0gZW52LmRldmljZUhlaWdodFxuICovXG5leHBvcnQgZnVuY3Rpb24gJGdldENvbmZpZyhjYWxsYmFjaykge1xuICBjb25zdCBjb25maWcgPSBfLmV4dGVuZCh7XG4gICAgZW52OiBnbG9iYWwuV1hFbnZpcm9ubWVudCB8fCB7fVxuICB9LCB0aGlzLl9hcHAub3B0aW9ucylcbiAgaWYgKF8udHlwb2YoY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XG4gICAgXy53YXJuKCd0aGUgY2FsbGJhY2sgb2YgVm0jJGdldENvbmZpZyhjYWxsYmFjaykgaXMgZGVwcmVjYXRlZCwgJyArXG4gICAgICAndGhpcyBhcGkgbm93IGNhbiBkaXJlY3RseSBSRVRVUk4gY29uZmlnIGluZm8uJylcbiAgICBjYWxsYmFjayhjb25maWcpXG4gIH1cbiAgcmV0dXJuIGNvbmZpZ1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiByZXF1ZXN0IG5ldHdvcmsgdmlhIGh0dHAgcHJvdG9jb2xcbiAqIEBwYXJhbSAge29iamVjdH0gICBwYXJhbXNcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZnVuY3Rpb24gJHNlbmRIdHRwKHBhcmFtcywgY2FsbGJhY2spIHtcbiAgXy53YXJuKCdWbSMkc2VuZEh0dHAgaXMgZGVwcmVjYXRlZCwgJysgXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9zdHJlYW1cXCcpJyArIFxuICAgICAgICAgICcuc2VuZEh0dHAocGFyYW1zLCBjYWxsYmFjaylcIiBpbnN0ZWFkJylcbiAgY29uc3Qgc3RyZWFtID0gdGhpcy5fYXBwLnJlcXVpcmVNb2R1bGUoJ3N0cmVhbScpXG4gIHN0cmVhbS5zZW5kSHR0cChwYXJhbXMsIGNhbGxiYWNrKVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBvcGVuIGEgdXJsXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHVybFxuICovXG5leHBvcnQgZnVuY3Rpb24gJG9wZW5VUkwodXJsKSB7XG4gIF8ud2FybignVm0jJG9wZW5VUkwgaXMgZGVwcmVjYXRlZCwgJysgXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9ldmVudFxcJyknICsgXG4gICAgICAgICAgJy5vcGVuVVJMKHVybClcIiBpbnN0ZWFkJylcbiAgY29uc3QgZXZlbnQgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgnZXZlbnQnKVxuICBldmVudC5vcGVuVVJMKHVybClcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBcbiAqIHNldCBhIHRpdGxlIGZvciBwYWdlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRpdGxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiAkc2V0VGl0bGUodGl0bGUpIHtcbiAgXy53YXJuKCdWbSMkc2V0VGl0bGUgaXMgZGVwcmVjYXRlZCwgJysgXG4gICAgICAgICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9wYWdlSW5mb1xcJyknICsgXG4gICAgICAgICAgJy5zZXRUaXRsZSh0aXRsZSlcIiBpbnN0ZWFkJylcbiAgY29uc3QgcGFnZUluZm8gPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZSgncGFnZUluZm8nKVxuICBwYWdlSW5mby5zZXRUaXRsZSh0aXRsZSlcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2UgXCJyZXF1aXJlKCdAd2VleC1tb2R1bGUvbW9kdWxlTmFtZScpIGluc3RlYWRcIlxuICogaW52b2tlIGEgbmF0aXZlIG1ldGhvZCBieSBzcGVjaWZpbmcgdGhlIG5hbWUgb2YgbW9kdWxlIGFuZCBtZXRob2RcbiAqIEBwYXJhbSAge3N0cmluZ30gbW9kdWxlTmFtZVxuICogQHBhcmFtICB7c3RyaW5nfSBtZXRob2ROYW1lXG4gKiBAcGFyYW0gIHsuLi4qfSB0aGUgcmVzdCBhcmd1bWVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uICRjYWxsKG1vZHVsZU5hbWUsIG1ldGhvZE5hbWUsIC4uLmFyZ3MpIHtcbiAgXy53YXJuKCdWbSMkY2FsbCBpcyBkZXByZWNhdGVkLCAnICsgXG4gICAgJ3BsZWFzZSB1c2UgXCJyZXF1aXJlKFxcJ0B3ZWV4LW1vZHVsZS9tb2R1bGVOYW1lXFwnKVwiIGluc3RlYWQnKVxuICBjb25zdCBtb2R1bGUgPSB0aGlzLl9hcHAucmVxdWlyZU1vZHVsZShtb2R1bGVOYW1lKVxuICBpZiAobW9kdWxlICYmIG1vZHVsZVttZXRob2ROYW1lXSkge1xuICAgIG1vZHVsZVttZXRob2ROYW1lXSguLi5hcmdzKVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9hcGkvbWV0aG9kcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=