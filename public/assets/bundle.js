function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);
  _classCheckPrivateStaticFieldDescriptor(descriptor, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);
  _classCheckPrivateStaticFieldDescriptor(descriptor, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
  _classCheckPrivateStaticAccess(receiver, classConstructor);
  return method;
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
function _classCheckPrivateStaticAccess(receiver, classConstructor) {
  if (receiver !== classConstructor) {
    throw new TypeError("Private static access of wrong provenance");
  }
}
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) {
  if (descriptor === undefined) {
    throw new TypeError("attempted to " + action + " private static field before its declaration");
  }
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]

    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];
      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules

var applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }
  return navigator.userAgent;
}

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement$1(element) ? getWindow(element) : window,
    visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      } // $FlowFixMe[prop-missing]: need a better way to handle this...

      next = next.parentNode || next.host;
    } while (next);
  } // Give up, the result is false

  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement$1(element) ? element.ownerDocument :
  // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot ||
    // step into the shadow DOM of the parent of a slotted node
    element.parentNode || (
    // DOM Element detected
    isShadowRoot(element) ? element.host : null) ||
    // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback
  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) ||
  // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block

function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);
    if (elementCss.position === 'fixed') {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.

function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state,
    name = _ref.name,
    options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';
  if (!arrowElement || !popperOffsets) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state,
    options = _ref2.options;
  var _options$element = options.element,
    arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;
  if (arrowElement == null) {
    return;
  } // CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (process.env.NODE_ENV !== "production") {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }
    return;
  }
  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules

var arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
    y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper = _ref2.popper,
    popperRect = _ref2.popperRect,
    placement = _ref2.placement,
    variation = _ref2.variation,
    offsets = _ref2.offsets,
    position = _ref2.position,
    gpuAcceleration = _ref2.gpuAcceleration,
    adaptive = _ref2.adaptive,
    roundOffsets = _ref2.roundOffsets,
    isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
    x = _offsets$x === void 0 ? 0 : _offsets$x,
    _offsets$y = offsets.y,
    y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';
    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);
      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it

    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height :
      // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width :
      // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, getWindow(popper)) : {
    x: x,
    y: y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state,
    options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
    gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
    _options$adaptive = options.adaptive,
    adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
    _options$roundOffsets = options.roundOffsets,
    roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (process.env.NODE_ENV !== "production") {
    var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';
    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules

var computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state,
    instance = _ref.instance,
    options = _ref.options;
  var _options$scroll = options.scroll,
    scroll = _options$scroll === void 0 ? true : _options$scroll,
    _options$resize = options.resize,
    resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }
  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }
  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }
    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules

var eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
    overflow = _getComputedStyle.overflow,
    overflowX = _getComputedStyle.overflowX,
    overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList :
  // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`

function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement$1(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414

  return clippingParents.filter(function (clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents

function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
    element = _ref.element,
    placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    _options$placement = _options.placement,
    placement = _options$placement === void 0 ? state.placement : _options$placement,
    _options$strategy = _options.strategy,
    strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
    _options$boundary = _options.boundary,
    boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
    _options$rootBoundary = _options.rootBoundary,
    rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
    _options$elementConte = _options.elementContext,
    elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
    _options$altBoundary = _options.altBoundary,
    altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
    _options$padding = _options.padding,
    padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }
  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options,
    placement = _options.placement,
    boundary = _options.boundary,
    rootBoundary = _options.rootBoundary,
    padding = _options.padding,
    flipVariations = _options.flipVariations,
    _options$allowedAutoP = _options.allowedAutoPlacements,
    allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
    if (process.env.NODE_ENV !== "production") {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...

  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
    specifiedFallbackPlacements = options.fallbackPlacements,
    padding = options.padding,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    _options$flipVariatio = options.flipVariations,
    flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
    allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];
  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);
        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules

var flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state,
    name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules

var hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
      placement: placement
    })) : offset,
    skidding = _ref[0],
    distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state,
    options = _ref2.options,
    name = _ref2.name;
  var _options$offset = options.offset,
    offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
    x = _data$state$placement.x,
    y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

var offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
    name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules

var popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
    options = _ref.options,
    name = _ref.name;
  var _options$mainAxis = options.mainAxis,
    checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
    _options$altAxis = options.altAxis,
    checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
    boundary = options.boundary,
    rootBoundary = options.rootBoundary,
    altBoundary = options.altBoundary,
    padding = options.padding,
    _options$tether = options.tether,
    tether = _options$tether === void 0 ? true : _options$tether,
    _options$tetherOffset = options.tetherOffset,
    tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === 'x' ? top : left;
    var _altSide = mainAxis === 'x' ? bottom : right;
    var _offset = popperOffsets[altAxis];
    var _len = altAxis === 'y' ? 'height' : 'width';
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules

var preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.

function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' ||
    // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }
    return pending;
  };
}

function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }
          break;
        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }
          break;
        case 'phase':
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }
          break;
        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }
          break;
        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }
          break;
        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }
          break;
        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }
          break;
        case 'options':
        case 'data':
          break;
        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }
      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions,
    _generatorOptions$def = _generatorOptions.defaultModifiers,
    defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
    _generatorOptions$def2 = _generatorOptions.defaultOptions,
    defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (process.env.NODE_ENV !== "production") {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }
          var _getComputedStyle = getComputedStyle$1(popper),
            marginTop = _getComputedStyle.marginTop,
            marginRight = _getComputedStyle.marginRight,
            marginBottom = _getComputedStyle.marginBottom,
            marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer

          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements,
          reference = _state$elements.reference,
          popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (process.env.NODE_ENV !== "production") {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        } // Store the reference and popper rects to be read by modifiers

        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (process.env.NODE_ENV !== "production") {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index],
            fn = _state$orderedModifie.fn,
            _state$orderedModifie2 = _state$orderedModifie.options,
            _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
            name = _state$orderedModifie.name;
          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference, popper)) {
      if (process.env.NODE_ENV !== "production") {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
          _ref3$options = _ref3.options,
          options = _ref3$options === void 0 ? {} : _ref3$options,
          effect = _ref3.effect;
        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });
          var noopFn = function noopFn() {};
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers$1
}); // eslint-disable-next-line import/no-unused-modules

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

var Popper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  afterMain: afterMain,
  afterRead: afterRead,
  afterWrite: afterWrite,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  auto: auto,
  basePlacements: basePlacements,
  beforeMain: beforeMain,
  beforeRead: beforeRead,
  beforeWrite: beforeWrite,
  bottom: bottom,
  clippingParents: clippingParents,
  computeStyles: computeStyles$1,
  createPopper: createPopper,
  createPopperBase: createPopper$2,
  createPopperLite: createPopper$1,
  detectOverflow: detectOverflow,
  end: end,
  eventListeners: eventListeners,
  flip: flip$1,
  hide: hide$1,
  left: left,
  main: main,
  modifierPhases: modifierPhases,
  offset: offset$1,
  placements: placements,
  popper: popper,
  popperGenerator: popperGenerator,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1,
  read: read,
  reference: reference,
  right: right,
  start: start,
  top: top,
  variationPlacements: variationPlacements,
  viewport: viewport,
  write: write
});

var _KEY_TO_DIRECTION;

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var elementMap = new Map();
var Data = {
  set: function set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }
    var instanceMap = elementMap.get(element);

    // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used
    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error("Bootstrap doesn't allow more than one instance per element. Bound instance: ".concat(Array.from(instanceMap.keys())[0], "."));
      return;
    }
    instanceMap.set(key, instance);
  },
  get: function get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }
    return null;
  },
  remove: function remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }
    var instanceMap = elementMap.get(element);
    instanceMap.delete(key);

    // free up element references if there are no instances left for an element
    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var MAX_UID = 1000000;
var MILLISECONDS_MULTIPLIER = 1000;
var TRANSITION_END = 'transitionend';

/**
 * Properly escape IDs selectors to handle weird IDs
 * @param {string} selector
 * @returns {string}
 */
var parseSelector = function parseSelector(selector) {
  if (selector && window.CSS && window.CSS.escape) {
    // document.querySelector needs escaping to handle IDs (html5+) containing for instance /
    selector = selector.replace(/#([^\s"#']+)/g, function (match, id) {
      return "#".concat(CSS.escape(id));
    });
  }
  return selector;
};

// Shout-out Angus Croll (https://goo.gl/pxwQGp)
var toType = function toType(object) {
  if (object === null || object === undefined) {
    return "".concat(object);
  }
  return Object.prototype.toString.call(object).match(/\s([a-z]+)/i)[1].toLowerCase();
};

/**
 * Public Util API
 */

var getUID = function getUID(prefix) {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));
  return prefix;
};
var getTransitionDurationFromElement = function getTransitionDurationFromElement(element) {
  if (!element) {
    return 0;
  }

  // Get transition-duration of the element
  var _window$getComputedSt = window.getComputedStyle(element),
    transitionDuration = _window$getComputedSt.transitionDuration,
    transitionDelay = _window$getComputedSt.transitionDelay;
  var floatTransitionDuration = Number.parseFloat(transitionDuration);
  var floatTransitionDelay = Number.parseFloat(transitionDelay);

  // Return 0 if element or transition duration is not found
  if (!floatTransitionDuration && !floatTransitionDelay) {
    return 0;
  }

  // If multiple durations are defined, take the first
  transitionDuration = transitionDuration.split(',')[0];
  transitionDelay = transitionDelay.split(',')[0];
  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
};
var triggerTransitionEnd = function triggerTransitionEnd(element) {
  element.dispatchEvent(new Event(TRANSITION_END));
};
var isElement = function isElement(object) {
  if (!object || _typeof(object) !== 'object') {
    return false;
  }
  if (typeof object.jquery !== 'undefined') {
    object = object[0];
  }
  return typeof object.nodeType !== 'undefined';
};
var getElement = function getElement(object) {
  // it's a jQuery object or a node element
  if (isElement(object)) {
    return object.jquery ? object[0] : object;
  }
  if (typeof object === 'string' && object.length > 0) {
    return document.querySelector(parseSelector(object));
  }
  return null;
};
var isVisible = function isVisible(element) {
  if (!isElement(element) || element.getClientRects().length === 0) {
    return false;
  }
  var elementIsVisible = getComputedStyle(element).getPropertyValue('visibility') === 'visible';
  // Handle `details` element as its content may falsie appear visible when it is closed
  var closedDetails = element.closest('details:not([open])');
  if (!closedDetails) {
    return elementIsVisible;
  }
  if (closedDetails !== element) {
    var summary = element.closest('summary');
    if (summary && summary.parentNode !== closedDetails) {
      return false;
    }
    if (summary === null) {
      return false;
    }
  }
  return elementIsVisible;
};
var isDisabled = function isDisabled(element) {
  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    return true;
  }
  if (element.classList.contains('disabled')) {
    return true;
  }
  if (typeof element.disabled !== 'undefined') {
    return element.disabled;
  }
  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
};
var findShadowRoot = function findShadowRoot(element) {
  if (!document.documentElement.attachShadow) {
    return null;
  }

  // Can find the shadow root otherwise it'll return the document
  if (typeof element.getRootNode === 'function') {
    var root = element.getRootNode();
    return root instanceof ShadowRoot ? root : null;
  }
  if (element instanceof ShadowRoot) {
    return element;
  }

  // when we don't find a shadow root
  if (!element.parentNode) {
    return null;
  }
  return findShadowRoot(element.parentNode);
};
var noop = function noop() {};

/**
 * Trick to restart an element's animation
 *
 * @param {HTMLElement} element
 * @return void
 *
 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
 */
var reflow = function reflow(element) {
  element.offsetHeight; // eslint-disable-line no-unused-expressions
};

var getjQuery = function getjQuery() {
  if (window.jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
    return window.jQuery;
  }
  return null;
};
var DOMContentLoadedCallbacks = [];
var onDOMContentLoaded = function onDOMContentLoaded(callback) {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!DOMContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', function () {
        for (var _i = 0, _DOMContentLoadedCall = DOMContentLoadedCallbacks; _i < _DOMContentLoadedCall.length; _i++) {
          var _callback = _DOMContentLoadedCall[_i];
          _callback();
        }
      });
    }
    DOMContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};
var isRTL = function isRTL() {
  return document.documentElement.dir === 'rtl';
};
var defineJQueryPlugin = function defineJQueryPlugin(plugin) {
  onDOMContentLoaded(function () {
    var $ = getjQuery();
    /* istanbul ignore if */
    if ($) {
      var name = plugin.NAME;
      var JQUERY_NO_CONFLICT = $.fn[name];
      $.fn[name] = plugin.jQueryInterface;
      $.fn[name].Constructor = plugin;
      $.fn[name].noConflict = function () {
        $.fn[name] = JQUERY_NO_CONFLICT;
        return plugin.jQueryInterface;
      };
    }
  });
};
var execute = function execute(possibleCallback) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : possibleCallback;
  return typeof possibleCallback === 'function' ? possibleCallback.apply(void 0, _toConsumableArray(args)) : defaultValue;
};
var executeAfterTransition = function executeAfterTransition(callback, transitionElement) {
  var waitForTransition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!waitForTransition) {
    execute(callback);
    return;
  }
  var durationPadding = 5;
  var emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
  var called = false;
  var handler = function handler(_ref) {
    var target = _ref.target;
    if (target !== transitionElement) {
      return;
    }
    called = true;
    transitionElement.removeEventListener(TRANSITION_END, handler);
    execute(callback);
  };
  transitionElement.addEventListener(TRANSITION_END, handler);
  setTimeout(function () {
    if (!called) {
      triggerTransitionEnd(transitionElement);
    }
  }, emulatedDuration);
};

/**
 * Return the previous/next element of a list.
 *
 * @param {array} list    The list of elements
 * @param activeElement   The active element
 * @param shouldGetNext   Choose to get next or previous element
 * @param isCycleAllowed
 * @return {Element|elem} The proper element
 */
var getNextActiveElement = function getNextActiveElement(list, activeElement, shouldGetNext, isCycleAllowed) {
  var listLength = list.length;
  var index = list.indexOf(activeElement);

  // if the element does not exist in the list return an element
  // depending on the direction and if cycle is allowed
  if (index === -1) {
    return !shouldGetNext && isCycleAllowed ? list[listLength - 1] : list[0];
  }
  index += shouldGetNext ? 1 : -1;
  if (isCycleAllowed) {
    index = (index + listLength) % listLength;
  }
  return list[Math.max(0, Math.min(index, listLength - 1))];
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/event-handler.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var namespaceRegex = /[^.]*(?=\..*)\.|.*/;
var stripNameRegex = /\..*/;
var stripUidRegex = /::\d+$/;
var eventRegistry = {}; // Events storage
var uidEvent = 1;
var customEvents = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
};
var nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);

/**
 * Private methods
 */

function makeEventUid(element, uid) {
  return uid && "".concat(uid, "::").concat(uidEvent++) || element.uidEvent || uidEvent++;
}
function getElementEvents(element) {
  var uid = makeEventUid(element);
  element.uidEvent = uid;
  eventRegistry[uid] = eventRegistry[uid] || {};
  return eventRegistry[uid];
}
function bootstrapHandler(element, fn) {
  return function handler(event) {
    hydrateObj(event, {
      delegateTarget: element
    });
    if (handler.oneOff) {
      EventHandler.off(element, event.type, fn);
    }
    return fn.apply(element, [event]);
  };
}
function bootstrapDelegationHandler(element, selector, fn) {
  return function handler(event) {
    var domElements = element.querySelectorAll(selector);
    for (var target = event.target; target && target !== this; target = target.parentNode) {
      var _iterator = _createForOfIteratorHelper(domElements),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var domElement = _step.value;
          if (domElement !== target) {
            continue;
          }
          hydrateObj(event, {
            delegateTarget: target
          });
          if (handler.oneOff) {
            EventHandler.off(element, event.type, selector, fn);
          }
          return fn.apply(target, [event]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };
}
function findHandler(events, callable) {
  var delegationSelector = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return Object.values(events).find(function (event) {
    return event.callable === callable && event.delegationSelector === delegationSelector;
  });
}
function normalizeParameters(originalTypeEvent, handler, delegationFunction) {
  var isDelegated = typeof handler === 'string';
  // TODO: tooltip passes `false` instead of selector, so we need to check
  var callable = isDelegated ? delegationFunction : handler || delegationFunction;
  var typeEvent = getTypeEvent(originalTypeEvent);
  if (!nativeEvents.has(typeEvent)) {
    typeEvent = originalTypeEvent;
  }
  return [isDelegated, callable, typeEvent];
}
function addHandler(element, originalTypeEvent, handler, delegationFunction, oneOff) {
  if (typeof originalTypeEvent !== 'string' || !element) {
    return;
  }
  var _normalizeParameters = normalizeParameters(originalTypeEvent, handler, delegationFunction),
    _normalizeParameters2 = _slicedToArray(_normalizeParameters, 3),
    isDelegated = _normalizeParameters2[0],
    callable = _normalizeParameters2[1],
    typeEvent = _normalizeParameters2[2];

  // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
  // this prevents the handler from being dispatched the same way as mouseover or mouseout does
  if (originalTypeEvent in customEvents) {
    var wrapFunction = function wrapFunction(fn) {
      return function (event) {
        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
          return fn.call(this, event);
        }
      };
    };
    callable = wrapFunction(callable);
  }
  var events = getElementEvents(element);
  var handlers = events[typeEvent] || (events[typeEvent] = {});
  var previousFunction = findHandler(handlers, callable, isDelegated ? handler : null);
  if (previousFunction) {
    previousFunction.oneOff = previousFunction.oneOff && oneOff;
    return;
  }
  var uid = makeEventUid(callable, originalTypeEvent.replace(namespaceRegex, ''));
  var fn = isDelegated ? bootstrapDelegationHandler(element, handler, callable) : bootstrapHandler(element, callable);
  fn.delegationSelector = isDelegated ? handler : null;
  fn.callable = callable;
  fn.oneOff = oneOff;
  fn.uidEvent = uid;
  handlers[uid] = fn;
  element.addEventListener(typeEvent, fn, isDelegated);
}
function removeHandler(element, events, typeEvent, handler, delegationSelector) {
  var fn = findHandler(events[typeEvent], handler, delegationSelector);
  if (!fn) {
    return;
  }
  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
  delete events[typeEvent][fn.uidEvent];
}
function removeNamespacedHandlers(element, events, typeEvent, namespace) {
  var storeElementEvent = events[typeEvent] || {};
  for (var _i2 = 0, _Object$entries = Object.entries(storeElementEvent); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
      handlerKey = _Object$entries$_i[0],
      event = _Object$entries$_i[1];
    if (handlerKey.includes(namespace)) {
      removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
    }
  }
}
function getTypeEvent(event) {
  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
  event = event.replace(stripNameRegex, '');
  return customEvents[event] || event;
}
var EventHandler = {
  on: function on(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, false);
  },
  one: function one(element, event, handler, delegationFunction) {
    addHandler(element, event, handler, delegationFunction, true);
  },
  off: function off(element, originalTypeEvent, handler, delegationFunction) {
    if (typeof originalTypeEvent !== 'string' || !element) {
      return;
    }
    var _normalizeParameters3 = normalizeParameters(originalTypeEvent, handler, delegationFunction),
      _normalizeParameters4 = _slicedToArray(_normalizeParameters3, 3),
      isDelegated = _normalizeParameters4[0],
      callable = _normalizeParameters4[1],
      typeEvent = _normalizeParameters4[2];
    var inNamespace = typeEvent !== originalTypeEvent;
    var events = getElementEvents(element);
    var storeElementEvent = events[typeEvent] || {};
    var isNamespace = originalTypeEvent.startsWith('.');
    if (typeof callable !== 'undefined') {
      // Simplest case: handler is passed, remove that listener ONLY.
      if (!Object.keys(storeElementEvent).length) {
        return;
      }
      removeHandler(element, events, typeEvent, callable, isDelegated ? handler : null);
      return;
    }
    if (isNamespace) {
      for (var _i3 = 0, _Object$keys = Object.keys(events); _i3 < _Object$keys.length; _i3++) {
        var elementEvent = _Object$keys[_i3];
        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
      }
    }
    for (var _i4 = 0, _Object$entries2 = Object.entries(storeElementEvent); _i4 < _Object$entries2.length; _i4++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i4], 2),
        keyHandlers = _Object$entries2$_i[0],
        event = _Object$entries2$_i[1];
      var handlerKey = keyHandlers.replace(stripUidRegex, '');
      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
        removeHandler(element, events, typeEvent, event.callable, event.delegationSelector);
      }
    }
  },
  trigger: function trigger(element, event, args) {
    if (typeof event !== 'string' || !element) {
      return null;
    }
    var $ = getjQuery();
    var typeEvent = getTypeEvent(event);
    var inNamespace = event !== typeEvent;
    var jQueryEvent = null;
    var bubbles = true;
    var nativeDispatch = true;
    var defaultPrevented = false;
    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }
    var evt = hydrateObj(new Event(event, {
      bubbles: bubbles,
      cancelable: true
    }), args);
    if (defaultPrevented) {
      evt.preventDefault();
    }
    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }
    if (evt.defaultPrevented && jQueryEvent) {
      jQueryEvent.preventDefault();
    }
    return evt;
  }
};
function hydrateObj(obj) {
  var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _loop = function _loop() {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i5], 2),
      key = _Object$entries3$_i[0],
      value = _Object$entries3$_i[1];
    try {
      obj[key] = value;
    } catch (_unused) {
      Object.defineProperty(obj, key, {
        configurable: true,
        get: function get() {
          return value;
        }
      });
    }
  };
  for (var _i5 = 0, _Object$entries3 = Object.entries(meta); _i5 < _Object$entries3.length; _i5++) {
    _loop();
  }
  return obj;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(value) {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  if (value === Number(value).toString()) {
    return Number(value);
  }
  if (value === '' || value === 'null') {
    return null;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch (_unused) {
    return value;
  }
}
function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, function (chr) {
    return "-".concat(chr.toLowerCase());
  });
}
var Manipulator = {
  setDataAttribute: function setDataAttribute(element, key, value) {
    element.setAttribute("data-bs-".concat(normalizeDataKey(key)), value);
  },
  removeDataAttribute: function removeDataAttribute(element, key) {
    element.removeAttribute("data-bs-".concat(normalizeDataKey(key)));
  },
  getDataAttributes: function getDataAttributes(element) {
    if (!element) {
      return {};
    }
    var attributes = {};
    var bsKeys = Object.keys(element.dataset).filter(function (key) {
      return key.startsWith('bs') && !key.startsWith('bsConfig');
    });
    var _iterator2 = _createForOfIteratorHelper(bsKeys),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var key = _step2.value;
        var pureKey = key.replace(/^bs/, '');
        pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
        attributes[pureKey] = normalizeData(element.dataset[key]);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return attributes;
  },
  getDataAttribute: function getDataAttribute(element, key) {
    return normalizeData(element.getAttribute("data-bs-".concat(normalizeDataKey(key))));
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/config.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Class definition
 */
var Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);
  }
  _createClass(Config, [{
    key: "_getConfig",
    value: function _getConfig(config) {
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      return config;
    }
  }, {
    key: "_mergeConfigObj",
    value: function _mergeConfigObj(config, element) {
      var jsonConfig = isElement(element) ? Manipulator.getDataAttribute(element, 'config') : {}; // try to parse

      return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, this.constructor.Default), _typeof(jsonConfig) === 'object' ? jsonConfig : {}), isElement(element) ? Manipulator.getDataAttributes(element) : {}), _typeof(config) === 'object' ? config : {});
    }
  }, {
    key: "_typeCheckConfig",
    value: function _typeCheckConfig(config) {
      var configTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.DefaultType;
      for (var _i6 = 0, _Object$entries4 = Object.entries(configTypes); _i6 < _Object$entries4.length; _i6++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i6], 2),
          property = _Object$entries4$_i[0],
          expectedTypes = _Object$entries4$_i[1];
        var value = config[property];
        var valueType = isElement(value) ? 'element' : toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new TypeError("".concat(this.constructor.NAME.toUpperCase(), ": Option \"").concat(property, "\" provided type \"").concat(valueType, "\" but expected type \"").concat(expectedTypes, "\"."));
        }
      }
    }
  }], [{
    key: "Default",
    get:
    // Getters
    function get() {
      return {};
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return {};
    }
  }, {
    key: "NAME",
    get: function get() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
  }]);
  return Config;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var VERSION = '5.3.0-alpha2';

/**
 * Class definition
 */
var BaseComponent = /*#__PURE__*/function (_Config) {
  _inherits(BaseComponent, _Config);
  var _super = _createSuper(BaseComponent);
  function BaseComponent(element, config) {
    var _this;
    _classCallCheck(this, BaseComponent);
    _this = _super.call(this);
    element = getElement(element);
    if (!element) {
      return _possibleConstructorReturn(_this);
    }
    _this._element = element;
    _this._config = _this._getConfig(config);
    Data.set(_this._element, _this.constructor.DATA_KEY, _assertThisInitialized(_this));
    return _this;
  }

  // Public
  _createClass(BaseComponent, [{
    key: "dispose",
    value: function dispose() {
      Data.remove(this._element, this.constructor.DATA_KEY);
      EventHandler.off(this._element, this.constructor.EVENT_KEY);
      var _iterator3 = _createForOfIteratorHelper(Object.getOwnPropertyNames(this)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var propertyName = _step3.value;
          this[propertyName] = null;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "_queueCallback",
    value: function _queueCallback(callback, element) {
      var isAnimated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      executeAfterTransition(callback, element, isAnimated);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = this._mergeConfigObj(config, this._element);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }

    // Static
  }], [{
    key: "getInstance",
    value: function getInstance(element) {
      return Data.get(getElement(element), this.DATA_KEY);
    }
  }, {
    key: "getOrCreateInstance",
    value: function getOrCreateInstance(element) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.getInstance(element) || new this(element, _typeof(config) === 'object' ? config : null);
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return "bs.".concat(this.NAME);
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return ".".concat(this.DATA_KEY);
    }
  }, {
    key: "eventName",
    value: function eventName(name) {
      return "".concat(name).concat(this.EVENT_KEY);
    }
  }]);
  return BaseComponent;
}(Config);
/**
 * --------------------------------------------------------------------------
 * Bootstrap dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var getSelector = function getSelector(element) {
  var selector = element.getAttribute('data-bs-target');
  if (!selector || selector === '#') {
    var hrefAttribute = element.getAttribute('href');

    // The only valid content that could double as a selector are IDs or classes,
    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
    // `document.querySelector` will rightfully complain it is invalid.
    // See https://github.com/twbs/bootstrap/issues/32273
    if (!hrefAttribute || !hrefAttribute.includes('#') && !hrefAttribute.startsWith('.')) {
      return null;
    }

    // Just in case some CMS puts out a full URL with the anchor appended
    if (hrefAttribute.includes('#') && !hrefAttribute.startsWith('#')) {
      hrefAttribute = "#".concat(hrefAttribute.split('#')[1]);
    }
    selector = hrefAttribute && hrefAttribute !== '#' ? hrefAttribute.trim() : null;
  }
  return parseSelector(selector);
};
var SelectorEngine = {
  find: function find(selector) {
    var _ref2;
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(Element.prototype.querySelectorAll.call(element, selector)));
  },
  findOne: function findOne(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return Element.prototype.querySelector.call(element, selector);
  },
  children: function children(element, selector) {
    var _ref3;
    return (_ref3 = []).concat.apply(_ref3, _toConsumableArray(element.children)).filter(function (child) {
      return child.matches(selector);
    });
  },
  parents: function parents(element, selector) {
    var parents = [];
    var ancestor = element.parentNode.closest(selector);
    while (ancestor) {
      parents.push(ancestor);
      ancestor = ancestor.parentNode.closest(selector);
    }
    return parents;
  },
  prev: function prev(element, selector) {
    var previous = element.previousElementSibling;
    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }
      previous = previous.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next: function next(element, selector) {
    var next = element.nextElementSibling;
    while (next) {
      if (next.matches(selector)) {
        return [next];
      }
      next = next.nextElementSibling;
    }
    return [];
  },
  focusableChildren: function focusableChildren(element) {
    var focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(function (selector) {
      return "".concat(selector, ":not([tabindex^=\"-\"])");
    }).join(',');
    return this.find(focusables, element).filter(function (el) {
      return !isDisabled(el) && isVisible(el);
    });
  },
  getSelectorFromElement: function getSelectorFromElement(element) {
    var selector = getSelector(element);
    if (selector) {
      return SelectorEngine.findOne(selector) ? selector : null;
    }
    return null;
  },
  getElementFromSelector: function getElementFromSelector(element) {
    var selector = getSelector(element);
    return selector ? SelectorEngine.findOne(selector) : null;
  },
  getMultipleElementsFromSelector: function getMultipleElementsFromSelector(element) {
    var selector = getSelector(element);
    return selector ? SelectorEngine.find(selector) : [];
  }
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
var enableDismissTrigger = function enableDismissTrigger(component) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'hide';
  var clickEvent = "click.dismiss".concat(component.EVENT_KEY);
  var name = component.NAME;
  EventHandler.on(document, clickEvent, "[data-bs-dismiss=\"".concat(name, "\"]"), function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }
    if (isDisabled(this)) {
      return;
    }
    var target = SelectorEngine.getElementFromSelector(this) || this.closest(".".concat(name));
    var instance = component.getOrCreateInstance(target);

    // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method
    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$f = 'alert';
var DATA_KEY$a = 'bs.alert';
var EVENT_KEY$b = ".".concat(DATA_KEY$a);
var EVENT_CLOSE = "close".concat(EVENT_KEY$b);
var EVENT_CLOSED = "closed".concat(EVENT_KEY$b);
var CLASS_NAME_FADE$5 = 'fade';
var CLASS_NAME_SHOW$8 = 'show';

/**
 * Class definition
 */
var Alert = /*#__PURE__*/function (_BaseComponent) {
  _inherits(Alert, _BaseComponent);
  var _super2 = _createSuper(Alert);
  function Alert() {
    _classCallCheck(this, Alert);
    return _super2.apply(this, arguments);
  }
  _createClass(Alert, [{
    key: "close",
    value:
    // Public
    function close() {
      var _this2 = this;
      var closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);
      if (closeEvent.defaultPrevented) {
        return;
      }
      this._element.classList.remove(CLASS_NAME_SHOW$8);
      var isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);
      this._queueCallback(function () {
        return _this2._destroyElement();
      }, this._element, isAnimated);
    }

    // Private
  }, {
    key: "_destroyElement",
    value: function _destroyElement() {
      this._element.remove();
      EventHandler.trigger(this._element, EVENT_CLOSED);
      this.dispose();
    }

    // Static
  }], [{
    key: "NAME",
    get:
    // Getters
    function get() {
      return NAME$f;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Alert.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config](this);
      });
    }
  }]);
  return Alert;
}(BaseComponent);
/**
 * Data API implementation
 */
enableDismissTrigger(Alert, 'close');

/**
 * jQuery
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$e = 'button';
var DATA_KEY$9 = 'bs.button';
var EVENT_KEY$a = ".".concat(DATA_KEY$9);
var DATA_API_KEY$6 = '.data-api';
var CLASS_NAME_ACTIVE$3 = 'active';
var SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
var EVENT_CLICK_DATA_API$6 = "click".concat(EVENT_KEY$a).concat(DATA_API_KEY$6);

/**
 * Class definition
 */
var Button = /*#__PURE__*/function (_BaseComponent2) {
  _inherits(Button, _BaseComponent2);
  var _super3 = _createSuper(Button);
  function Button() {
    _classCallCheck(this, Button);
    return _super3.apply(this, arguments);
  }
  _createClass(Button, [{
    key: "toggle",
    value:
    // Public
    function toggle() {
      // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
      this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
    }

    // Static
  }], [{
    key: "NAME",
    get:
    // Getters
    function get() {
      return NAME$e;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Button.getOrCreateInstance(this);
        if (config === 'toggle') {
          data[config]();
        }
      });
    }
  }]);
  return Button;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, function (event) {
  event.preventDefault();
  var button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  var data = Button.getOrCreateInstance(button);
  data.toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/swipe.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$d = 'swipe';
var EVENT_KEY$9 = '.bs.swipe';
var EVENT_TOUCHSTART = "touchstart".concat(EVENT_KEY$9);
var EVENT_TOUCHMOVE = "touchmove".concat(EVENT_KEY$9);
var EVENT_TOUCHEND = "touchend".concat(EVENT_KEY$9);
var EVENT_POINTERDOWN = "pointerdown".concat(EVENT_KEY$9);
var EVENT_POINTERUP = "pointerup".concat(EVENT_KEY$9);
var POINTER_TYPE_TOUCH = 'touch';
var POINTER_TYPE_PEN = 'pen';
var CLASS_NAME_POINTER_EVENT = 'pointer-event';
var SWIPE_THRESHOLD = 40;
var Default$c = {
  endCallback: null,
  leftCallback: null,
  rightCallback: null
};
var DefaultType$c = {
  endCallback: '(function|null)',
  leftCallback: '(function|null)',
  rightCallback: '(function|null)'
};

/**
 * Class definition
 */
var Swipe = /*#__PURE__*/function (_Config2) {
  _inherits(Swipe, _Config2);
  var _super4 = _createSuper(Swipe);
  function Swipe(element, config) {
    var _this3;
    _classCallCheck(this, Swipe);
    _this3 = _super4.call(this);
    _this3._element = element;
    if (!element || !Swipe.isSupported()) {
      return _possibleConstructorReturn(_this3);
    }
    _this3._config = _this3._getConfig(config);
    _this3._deltaX = 0;
    _this3._supportPointerEvents = Boolean(window.PointerEvent);
    _this3._initEvents();
    return _this3;
  }

  // Getters
  _createClass(Swipe, [{
    key: "dispose",
    value:
    // Public
    function dispose() {
      EventHandler.off(this._element, EVENT_KEY$9);
    }

    // Private
  }, {
    key: "_start",
    value: function _start(event) {
      if (!this._supportPointerEvents) {
        this._deltaX = event.touches[0].clientX;
        return;
      }
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX;
      }
    }
  }, {
    key: "_end",
    value: function _end(event) {
      if (this._eventIsPointerPenTouch(event)) {
        this._deltaX = event.clientX - this._deltaX;
      }
      this._handleSwipe();
      execute(this._config.endCallback);
    }
  }, {
    key: "_move",
    value: function _move(event) {
      this._deltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this._deltaX;
    }
  }, {
    key: "_handleSwipe",
    value: function _handleSwipe() {
      var absDeltaX = Math.abs(this._deltaX);
      if (absDeltaX <= SWIPE_THRESHOLD) {
        return;
      }
      var direction = absDeltaX / this._deltaX;
      this._deltaX = 0;
      if (!direction) {
        return;
      }
      execute(direction > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var _this4 = this;
      if (this._supportPointerEvents) {
        EventHandler.on(this._element, EVENT_POINTERDOWN, function (event) {
          return _this4._start(event);
        });
        EventHandler.on(this._element, EVENT_POINTERUP, function (event) {
          return _this4._end(event);
        });
        this._element.classList.add(CLASS_NAME_POINTER_EVENT);
      } else {
        EventHandler.on(this._element, EVENT_TOUCHSTART, function (event) {
          return _this4._start(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHMOVE, function (event) {
          return _this4._move(event);
        });
        EventHandler.on(this._element, EVENT_TOUCHEND, function (event) {
          return _this4._end(event);
        });
      }
    }
  }, {
    key: "_eventIsPointerPenTouch",
    value: function _eventIsPointerPenTouch(event) {
      return this._supportPointerEvents && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$c;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$c;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$d;
    }
  }, {
    key: "isSupported",
    value: function isSupported() {
      return 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }]);
  return Swipe;
}(Config);
/**
 * --------------------------------------------------------------------------
 * Bootstrap carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var NAME$c = 'carousel';
var DATA_KEY$8 = 'bs.carousel';
var EVENT_KEY$8 = ".".concat(DATA_KEY$8);
var DATA_API_KEY$5 = '.data-api';
var ARROW_LEFT_KEY$1 = 'ArrowLeft';
var ARROW_RIGHT_KEY$1 = 'ArrowRight';
var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var ORDER_NEXT = 'next';
var ORDER_PREV = 'prev';
var DIRECTION_LEFT = 'left';
var DIRECTION_RIGHT = 'right';
var EVENT_SLIDE = "slide".concat(EVENT_KEY$8);
var EVENT_SLID = "slid".concat(EVENT_KEY$8);
var EVENT_KEYDOWN$1 = "keydown".concat(EVENT_KEY$8);
var EVENT_MOUSEENTER$1 = "mouseenter".concat(EVENT_KEY$8);
var EVENT_MOUSELEAVE$1 = "mouseleave".concat(EVENT_KEY$8);
var EVENT_DRAG_START = "dragstart".concat(EVENT_KEY$8);
var EVENT_LOAD_DATA_API$3 = "load".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
var EVENT_CLICK_DATA_API$5 = "click".concat(EVENT_KEY$8).concat(DATA_API_KEY$5);
var CLASS_NAME_CAROUSEL = 'carousel';
var CLASS_NAME_ACTIVE$2 = 'active';
var CLASS_NAME_SLIDE = 'slide';
var CLASS_NAME_END = 'carousel-item-end';
var CLASS_NAME_START = 'carousel-item-start';
var CLASS_NAME_NEXT = 'carousel-item-next';
var CLASS_NAME_PREV = 'carousel-item-prev';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ITEM = '.carousel-item';
var SELECTOR_ACTIVE_ITEM = SELECTOR_ACTIVE + SELECTOR_ITEM;
var SELECTOR_ITEM_IMG = '.carousel-item img';
var SELECTOR_INDICATORS = '.carousel-indicators';
var SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
var SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
var KEY_TO_DIRECTION = (_KEY_TO_DIRECTION = {}, _defineProperty(_KEY_TO_DIRECTION, ARROW_LEFT_KEY$1, DIRECTION_RIGHT), _defineProperty(_KEY_TO_DIRECTION, ARROW_RIGHT_KEY$1, DIRECTION_LEFT), _KEY_TO_DIRECTION);
var Default$b = {
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  ride: false,
  touch: true,
  wrap: true
};
var DefaultType$b = {
  interval: '(number|boolean)',
  // TODO:v6 remove boolean support
  keyboard: 'boolean',
  pause: '(string|boolean)',
  ride: '(boolean|string)',
  touch: 'boolean',
  wrap: 'boolean'
};

/**
 * Class definition
 */
var Carousel = /*#__PURE__*/function (_BaseComponent3) {
  _inherits(Carousel, _BaseComponent3);
  var _super5 = _createSuper(Carousel);
  function Carousel(element, config) {
    var _this5;
    _classCallCheck(this, Carousel);
    _this5 = _super5.call(this, element, config);
    _this5._interval = null;
    _this5._activeElement = null;
    _this5._isSliding = false;
    _this5.touchTimeout = null;
    _this5._swipeHelper = null;
    _this5._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, _this5._element);
    _this5._addEventListeners();
    if (_this5._config.ride === CLASS_NAME_CAROUSEL) {
      _this5.cycle();
    }
    return _this5;
  }

  // Getters
  _createClass(Carousel, [{
    key: "next",
    value:
    // Public
    function next() {
      this._slide(ORDER_NEXT);
    }
  }, {
    key: "nextWhenVisible",
    value: function nextWhenVisible() {
      // FIXME TODO use `document.visibilityState`
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && isVisible(this._element)) {
        this.next();
      }
    }
  }, {
    key: "prev",
    value: function prev() {
      this._slide(ORDER_PREV);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this._isSliding) {
        triggerTransitionEnd(this._element);
      }
      this._clearInterval();
    }
  }, {
    key: "cycle",
    value: function cycle() {
      var _this6 = this;
      this._clearInterval();
      this._updateInterval();
      this._interval = setInterval(function () {
        return _this6.nextWhenVisible();
      }, this._config.interval);
    }
  }, {
    key: "_maybeEnableCycle",
    value: function _maybeEnableCycle() {
      var _this7 = this;
      if (!this._config.ride) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this7.cycle();
        });
        return;
      }
      this.cycle();
    }
  }, {
    key: "to",
    value: function to(index) {
      var _this8 = this;
      var items = this._getItems();
      if (index > items.length - 1 || index < 0) {
        return;
      }
      if (this._isSliding) {
        EventHandler.one(this._element, EVENT_SLID, function () {
          return _this8.to(index);
        });
        return;
      }
      var activeIndex = this._getItemIndex(this._getActive());
      if (activeIndex === index) {
        return;
      }
      var order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;
      this._slide(order, items[index]);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._swipeHelper) {
        this._swipeHelper.dispose();
      }
      _get(_getPrototypeOf(Carousel.prototype), "dispose", this).call(this);
    }

    // Private
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      config.defaultInterval = config.interval;
      return config;
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this9 = this;
      if (this._config.keyboard) {
        EventHandler.on(this._element, EVENT_KEYDOWN$1, function (event) {
          return _this9._keydown(event);
        });
      }
      if (this._config.pause === 'hover') {
        EventHandler.on(this._element, EVENT_MOUSEENTER$1, function () {
          return _this9.pause();
        });
        EventHandler.on(this._element, EVENT_MOUSELEAVE$1, function () {
          return _this9._maybeEnableCycle();
        });
      }
      if (this._config.touch && Swipe.isSupported()) {
        this._addTouchEventListeners();
      }
    }
  }, {
    key: "_addTouchEventListeners",
    value: function _addTouchEventListeners() {
      var _this10 = this;
      var _iterator4 = _createForOfIteratorHelper(SelectorEngine.find(SELECTOR_ITEM_IMG, this._element)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var img = _step4.value;
          EventHandler.on(img, EVENT_DRAG_START, function (event) {
            return event.preventDefault();
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var endCallBack = function endCallBack() {
        if (_this10._config.pause !== 'hover') {
          return;
        }

        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling

        _this10.pause();
        if (_this10.touchTimeout) {
          clearTimeout(_this10.touchTimeout);
        }
        _this10.touchTimeout = setTimeout(function () {
          return _this10._maybeEnableCycle();
        }, TOUCHEVENT_COMPAT_WAIT + _this10._config.interval);
      };
      var swipeConfig = {
        leftCallback: function leftCallback() {
          return _this10._slide(_this10._directionToOrder(DIRECTION_LEFT));
        },
        rightCallback: function rightCallback() {
          return _this10._slide(_this10._directionToOrder(DIRECTION_RIGHT));
        },
        endCallback: endCallBack
      };
      this._swipeHelper = new Swipe(this._element, swipeConfig);
    }
  }, {
    key: "_keydown",
    value: function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }
      var direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        this._slide(this._directionToOrder(direction));
      }
    }
  }, {
    key: "_getItemIndex",
    value: function _getItemIndex(element) {
      return this._getItems().indexOf(element);
    }
  }, {
    key: "_setActiveIndicatorElement",
    value: function _setActiveIndicatorElement(index) {
      if (!this._indicatorsElement) {
        return;
      }
      var activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      var newActiveIndicator = SelectorEngine.findOne("[data-bs-slide-to=\"".concat(index, "\"]"), this._indicatorsElement);
      if (newActiveIndicator) {
        newActiveIndicator.classList.add(CLASS_NAME_ACTIVE$2);
        newActiveIndicator.setAttribute('aria-current', 'true');
      }
    }
  }, {
    key: "_updateInterval",
    value: function _updateInterval() {
      var element = this._activeElement || this._getActive();
      if (!element) {
        return;
      }
      var elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);
      this._config.interval = elementInterval || this._config.defaultInterval;
    }
  }, {
    key: "_slide",
    value: function _slide(order) {
      var _this11 = this;
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (this._isSliding) {
        return;
      }
      var activeElement = this._getActive();
      var isNext = order === ORDER_NEXT;
      var nextElement = element || getNextActiveElement(this._getItems(), activeElement, isNext, this._config.wrap);
      if (nextElement === activeElement) {
        return;
      }
      var nextElementIndex = this._getItemIndex(nextElement);
      var triggerEvent = function triggerEvent(eventName) {
        return EventHandler.trigger(_this11._element, eventName, {
          relatedTarget: nextElement,
          direction: _this11._orderToDirection(order),
          from: _this11._getItemIndex(activeElement),
          to: nextElementIndex
        });
      };
      var slideEvent = triggerEvent(EVENT_SLIDE);
      if (slideEvent.defaultPrevented) {
        return;
      }
      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        // TODO: change tests that use empty divs to avoid this check
        return;
      }
      var isCycling = Boolean(this._interval);
      this.pause();
      this._isSliding = true;
      this._setActiveIndicatorElement(nextElementIndex);
      this._activeElement = nextElement;
      var directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
      var orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);
      var completeCallBack = function completeCallBack() {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        _this11._isSliding = false;
        triggerEvent(EVENT_SLID);
      };
      this._queueCallback(completeCallBack, activeElement, this._isAnimated());
      if (isCycling) {
        this.cycle();
      }
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_SLIDE);
    }
  }, {
    key: "_getActive",
    value: function _getActive() {
      return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);
    }
  }, {
    key: "_getItems",
    value: function _getItems() {
      return SelectorEngine.find(SELECTOR_ITEM, this._element);
    }
  }, {
    key: "_clearInterval",
    value: function _clearInterval() {
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }
    }
  }, {
    key: "_directionToOrder",
    value: function _directionToOrder(direction) {
      if (isRTL()) {
        return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
      }
      return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
    }
  }, {
    key: "_orderToDirection",
    value: function _orderToDirection(order) {
      if (isRTL()) {
        return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
      }
      return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$b;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$b;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$c;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Carousel.getOrCreateInstance(this, config);
        if (typeof config === 'number') {
          data.to(config);
          return;
        }
        if (typeof config === 'string') {
          if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }
          data[config]();
        }
      });
    }
  }]);
  return Carousel;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, function (event) {
  var target = SelectorEngine.getElementFromSelector(this);
  if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
    return;
  }
  event.preventDefault();
  var carousel = Carousel.getOrCreateInstance(target);
  var slideIndex = this.getAttribute('data-bs-slide-to');
  if (slideIndex) {
    carousel.to(slideIndex);
    carousel._maybeEnableCycle();
    return;
  }
  if (Manipulator.getDataAttribute(this, 'slide') === 'next') {
    carousel.next();
    carousel._maybeEnableCycle();
    return;
  }
  carousel.prev();
  carousel._maybeEnableCycle();
});
EventHandler.on(window, EVENT_LOAD_DATA_API$3, function () {
  var carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);
  var _iterator5 = _createForOfIteratorHelper(carousels),
    _step5;
  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var carousel = _step5.value;
      Carousel.getOrCreateInstance(carousel);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$b = 'collapse';
var DATA_KEY$7 = 'bs.collapse';
var EVENT_KEY$7 = ".".concat(DATA_KEY$7);
var DATA_API_KEY$4 = '.data-api';
var EVENT_SHOW$6 = "show".concat(EVENT_KEY$7);
var EVENT_SHOWN$6 = "shown".concat(EVENT_KEY$7);
var EVENT_HIDE$6 = "hide".concat(EVENT_KEY$7);
var EVENT_HIDDEN$6 = "hidden".concat(EVENT_KEY$7);
var EVENT_CLICK_DATA_API$4 = "click".concat(EVENT_KEY$7).concat(DATA_API_KEY$4);
var CLASS_NAME_SHOW$7 = 'show';
var CLASS_NAME_COLLAPSE = 'collapse';
var CLASS_NAME_COLLAPSING = 'collapsing';
var CLASS_NAME_COLLAPSED = 'collapsed';
var CLASS_NAME_DEEPER_CHILDREN = ":scope .".concat(CLASS_NAME_COLLAPSE, " .").concat(CLASS_NAME_COLLAPSE);
var CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
var WIDTH = 'width';
var HEIGHT = 'height';
var SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
var SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
var Default$a = {
  parent: null,
  toggle: true
};
var DefaultType$a = {
  parent: '(null|element)',
  toggle: 'boolean'
};

/**
 * Class definition
 */
var Collapse = /*#__PURE__*/function (_BaseComponent4) {
  _inherits(Collapse, _BaseComponent4);
  var _super6 = _createSuper(Collapse);
  function Collapse(element, config) {
    var _this12;
    _classCallCheck(this, Collapse);
    _this12 = _super6.call(this, element, config);
    _this12._isTransitioning = false;
    _this12._triggerArray = [];
    var toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);
    var _iterator6 = _createForOfIteratorHelper(toggleList),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var elem = _step6.value;
        var selector = SelectorEngine.getSelectorFromElement(elem);
        var filterElement = SelectorEngine.find(selector).filter(function (foundElement) {
          return foundElement === _this12._element;
        });
        if (selector !== null && filterElement.length) {
          _this12._triggerArray.push(elem);
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    _this12._initializeChildren();
    if (!_this12._config.parent) {
      _this12._addAriaAndCollapsedClass(_this12._triggerArray, _this12._isShown());
    }
    if (_this12._config.toggle) {
      _this12.toggle();
    }
    return _this12;
  }

  // Getters
  _createClass(Collapse, [{
    key: "toggle",
    value:
    // Public
    function toggle() {
      if (this._isShown()) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this13 = this;
      if (this._isTransitioning || this._isShown()) {
        return;
      }
      var activeChildren = [];

      // find active children
      if (this._config.parent) {
        activeChildren = this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(function (element) {
          return element !== _this13._element;
        }).map(function (element) {
          return Collapse.getOrCreateInstance(element, {
            toggle: false
          });
        });
      }
      if (activeChildren.length && activeChildren[0]._isTransitioning) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_SHOW$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      var _iterator7 = _createForOfIteratorHelper(activeChildren),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var activeInstance = _step7.value;
          activeInstance.hide();
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      var dimension = this._getDimension();
      this._element.classList.remove(CLASS_NAME_COLLAPSE);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.style[dimension] = 0;
      this._addAriaAndCollapsedClass(this._triggerArray, true);
      this._isTransitioning = true;
      var complete = function complete() {
        _this13._isTransitioning = false;
        _this13._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this13._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
        _this13._element.style[dimension] = '';
        EventHandler.trigger(_this13._element, EVENT_SHOWN$6);
      };
      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll".concat(capitalizedDimension);
      this._queueCallback(complete, this._element, true);
      this._element.style[dimension] = "".concat(this._element[scrollSize], "px");
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this14 = this;
      if (this._isTransitioning || !this._isShown()) {
        return;
      }
      var startEvent = EventHandler.trigger(this._element, EVENT_HIDE$6);
      if (startEvent.defaultPrevented) {
        return;
      }
      var dimension = this._getDimension();
      this._element.style[dimension] = "".concat(this._element.getBoundingClientRect()[dimension], "px");
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_COLLAPSING);
      this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);
      var _iterator8 = _createForOfIteratorHelper(this._triggerArray),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var trigger = _step8.value;
          var element = SelectorEngine.getElementFromSelector(trigger);
          if (element && !this._isShown(element)) {
            this._addAriaAndCollapsedClass([trigger], false);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      this._isTransitioning = true;
      var complete = function complete() {
        _this14._isTransitioning = false;
        _this14._element.classList.remove(CLASS_NAME_COLLAPSING);
        _this14._element.classList.add(CLASS_NAME_COLLAPSE);
        EventHandler.trigger(_this14._element, EVENT_HIDDEN$6);
      };
      this._element.style[dimension] = '';
      this._queueCallback(complete, this._element, true);
    }
  }, {
    key: "_isShown",
    value: function _isShown() {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._element;
      return element.classList.contains(CLASS_NAME_SHOW$7);
    }

    // Private
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      config.toggle = Boolean(config.toggle); // Coerce string values
      config.parent = getElement(config.parent);
      return config;
    }
  }, {
    key: "_getDimension",
    value: function _getDimension() {
      return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
    }
  }, {
    key: "_initializeChildren",
    value: function _initializeChildren() {
      if (!this._config.parent) {
        return;
      }
      var children = this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);
      var _iterator9 = _createForOfIteratorHelper(children),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var element = _step9.value;
          var selected = SelectorEngine.getElementFromSelector(element);
          if (selected) {
            this._addAriaAndCollapsedClass([element], this._isShown(selected));
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    }
  }, {
    key: "_getFirstLevelChildren",
    value: function _getFirstLevelChildren(selector) {
      var children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      // remove children if greater depth
      return SelectorEngine.find(selector, this._config.parent).filter(function (element) {
        return !children.includes(element);
      });
    }
  }, {
    key: "_addAriaAndCollapsedClass",
    value: function _addAriaAndCollapsedClass(triggerArray, isOpen) {
      if (!triggerArray.length) {
        return;
      }
      var _iterator10 = _createForOfIteratorHelper(triggerArray),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var element = _step10.value;
          element.classList.toggle(CLASS_NAME_COLLAPSED, !isOpen);
          element.setAttribute('aria-expanded', isOpen);
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$a;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$a;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$b;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      var _config = {};
      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }
      return this.each(function () {
        var data = Collapse.getOrCreateInstance(this, _config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }
          data[config]();
        }
      });
    }
  }]);
  return Collapse;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }
  var _iterator11 = _createForOfIteratorHelper(SelectorEngine.getMultipleElementsFromSelector(this)),
    _step11;
  try {
    for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
      var element = _step11.value;
      Collapse.getOrCreateInstance(element, {
        toggle: false
      }).toggle();
    }
  } catch (err) {
    _iterator11.e(err);
  } finally {
    _iterator11.f();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$a = 'dropdown';
var DATA_KEY$6 = 'bs.dropdown';
var EVENT_KEY$6 = ".".concat(DATA_KEY$6);
var DATA_API_KEY$3 = '.data-api';
var ESCAPE_KEY$2 = 'Escape';
var TAB_KEY$1 = 'Tab';
var ARROW_UP_KEY$1 = 'ArrowUp';
var ARROW_DOWN_KEY$1 = 'ArrowDown';
var RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

var EVENT_HIDE$5 = "hide".concat(EVENT_KEY$6);
var EVENT_HIDDEN$5 = "hidden".concat(EVENT_KEY$6);
var EVENT_SHOW$5 = "show".concat(EVENT_KEY$6);
var EVENT_SHOWN$5 = "shown".concat(EVENT_KEY$6);
var EVENT_CLICK_DATA_API$3 = "click".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY$6).concat(DATA_API_KEY$3);
var CLASS_NAME_SHOW$6 = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPEND = 'dropend';
var CLASS_NAME_DROPSTART = 'dropstart';
var CLASS_NAME_DROPUP_CENTER = 'dropup-center';
var CLASS_NAME_DROPDOWN_CENTER = 'dropdown-center';
var SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
var SELECTOR_DATA_TOGGLE_SHOWN = "".concat(SELECTOR_DATA_TOGGLE$3, ".").concat(CLASS_NAME_SHOW$6);
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR = '.navbar';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
var PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
var PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
var PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
var PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
var PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
var PLACEMENT_TOPCENTER = 'top';
var PLACEMENT_BOTTOMCENTER = 'bottom';
var Default$9 = {
  autoClose: true,
  boundary: 'clippingParents',
  display: 'dynamic',
  offset: [0, 2],
  popperConfig: null,
  reference: 'toggle'
};
var DefaultType$9 = {
  autoClose: '(boolean|string)',
  boundary: '(string|element)',
  display: 'string',
  offset: '(array|string|function)',
  popperConfig: '(null|object|function)',
  reference: '(string|element|object)'
};

/**
 * Class definition
 */
var Dropdown = /*#__PURE__*/function (_BaseComponent5) {
  _inherits(Dropdown, _BaseComponent5);
  var _super7 = _createSuper(Dropdown);
  function Dropdown(element, config) {
    var _this15;
    _classCallCheck(this, Dropdown);
    _this15 = _super7.call(this, element, config);
    _this15._popper = null;
    _this15._parent = _this15._element.parentNode; // dropdown wrapper
    // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
    _this15._menu = SelectorEngine.next(_this15._element, SELECTOR_MENU)[0] || SelectorEngine.prev(_this15._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, _this15._parent);
    _this15._inNavbar = _this15._detectNavbar();
    return _this15;
  }

  // Getters
  _createClass(Dropdown, [{
    key: "toggle",
    value:
    // Public
    function toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
  }, {
    key: "show",
    value: function show() {
      if (isDisabled(this._element) || this._isShown()) {
        return;
      }
      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$5, relatedTarget);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._createPopper();

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV)) {
        var _ref4;
        var _iterator12 = _createForOfIteratorHelper((_ref4 = []).concat.apply(_ref4, _toConsumableArray(document.body.children))),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var element = _step12.value;
            EventHandler.on(element, 'mouseover', noop);
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
      this._element.focus();
      this._element.setAttribute('aria-expanded', true);
      this._menu.classList.add(CLASS_NAME_SHOW$6);
      this._element.classList.add(CLASS_NAME_SHOW$6);
      EventHandler.trigger(this._element, EVENT_SHOWN$5, relatedTarget);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (isDisabled(this._element) || !this._isShown()) {
        return;
      }
      var relatedTarget = {
        relatedTarget: this._element
      };
      this._completeHide(relatedTarget);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (this._popper) {
        this._popper.destroy();
      }
      _get(_getPrototypeOf(Dropdown.prototype), "dispose", this).call(this);
    }
  }, {
    key: "update",
    value: function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper) {
        this._popper.update();
      }
    }

    // Private
  }, {
    key: "_completeHide",
    value: function _completeHide(relatedTarget) {
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$5, relatedTarget);
      if (hideEvent.defaultPrevented) {
        return;
      }

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        var _ref5;
        var _iterator13 = _createForOfIteratorHelper((_ref5 = []).concat.apply(_ref5, _toConsumableArray(document.body.children))),
          _step13;
        try {
          for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
            var element = _step13.value;
            EventHandler.off(element, 'mouseover', noop);
          }
        } catch (err) {
          _iterator13.e(err);
        } finally {
          _iterator13.f();
        }
      }
      if (this._popper) {
        this._popper.destroy();
      }
      this._menu.classList.remove(CLASS_NAME_SHOW$6);
      this._element.classList.remove(CLASS_NAME_SHOW$6);
      this._element.setAttribute('aria-expanded', 'false');
      Manipulator.removeDataAttribute(this._menu, 'popper');
      EventHandler.trigger(this._element, EVENT_HIDDEN$5, relatedTarget);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _get(_getPrototypeOf(Dropdown.prototype), "_getConfig", this).call(this, config);
      if (_typeof(config.reference) === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
        // Popper virtual elements require a getBoundingClientRect method
        throw new TypeError("".concat(NAME$a.toUpperCase(), ": Option \"reference\" provided type \"object\" without a required \"getBoundingClientRect\" method."));
      }
      return config;
    }
  }, {
    key: "_createPopper",
    value: function _createPopper() {
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
      }
      var referenceElement = this._element;
      if (this._config.reference === 'parent') {
        referenceElement = this._parent;
      } else if (isElement(this._config.reference)) {
        referenceElement = getElement(this._config.reference);
      } else if (_typeof(this._config.reference) === 'object') {
        referenceElement = this._config.reference;
      }
      var popperConfig = this._getPopperConfig();
      this._popper = createPopper(referenceElement, this._menu, popperConfig);
    }
  }, {
    key: "_isShown",
    value: function _isShown() {
      return this._menu.classList.contains(CLASS_NAME_SHOW$6);
    }
  }, {
    key: "_getPlacement",
    value: function _getPlacement() {
      var parentDropdown = this._parent;
      if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
        return PLACEMENT_RIGHT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
        return PLACEMENT_LEFT;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP_CENTER)) {
        return PLACEMENT_TOPCENTER;
      }
      if (parentDropdown.classList.contains(CLASS_NAME_DROPDOWN_CENTER)) {
        return PLACEMENT_BOTTOMCENTER;
      }

      // We need to trim the value because custom properties can also include spaces
      var isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';
      if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
        return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      }
      return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
    }
  }, {
    key: "_detectNavbar",
    value: function _detectNavbar() {
      return this._element.closest(SELECTOR_NAVBAR) !== null;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this16 = this;
      var offset = this._config.offset;
      if (typeof offset === 'string') {
        return offset.split(',').map(function (value) {
          return Number.parseInt(value, 10);
        });
      }
      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this16._element);
        };
      }
      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig() {
      var defaultBsPopperConfig = {
        placement: this._getPlacement(),
        modifiers: [{
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }]
      };

      // Disable Popper if we have a static display or Dropdown is in Navbar
      if (this._inNavbar || this._config.display === 'static') {
        Manipulator.setDataAttribute(this._menu, 'popper', 'static'); // TODO: v6 remove
        defaultBsPopperConfig.modifiers = [{
          name: 'applyStyles',
          enabled: false
        }];
      }
      return _objectSpread2(_objectSpread2({}, defaultBsPopperConfig), execute(this._config.popperConfig, [defaultBsPopperConfig]));
    }
  }, {
    key: "_selectMenuItem",
    value: function _selectMenuItem(_ref6) {
      var key = _ref6.key,
        target = _ref6.target;
      var items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(function (element) {
        return isVisible(element);
      });
      if (!items.length) {
        return;
      }

      // if target isn't included in items (e.g. when expanding the dropdown)
      // allow cycling to get the last item in case key equals ARROW_UP_KEY
      getNextActiveElement(items, target, key === ARROW_DOWN_KEY$1, !items.includes(target)).focus();
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$9;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$9;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$a;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Dropdown.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config]();
      });
    }
  }, {
    key: "clearMenus",
    value: function clearMenus(event) {
      if (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1) {
        return;
      }
      var openToggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
      var _iterator14 = _createForOfIteratorHelper(openToggles),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var toggle = _step14.value;
          var context = Dropdown.getInstance(toggle);
          if (!context || context._config.autoClose === false) {
            continue;
          }
          var composedPath = event.composedPath();
          var isMenuTarget = composedPath.includes(context._menu);
          if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
            continue;
          }

          // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu
          if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
            continue;
          }
          var relatedTarget = {
            relatedTarget: context._element
          };
          if (event.type === 'click') {
            relatedTarget.clickEvent = event;
          }
          context._completeHide(relatedTarget);
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    }
  }, {
    key: "dataApiKeydownHandler",
    value: function dataApiKeydownHandler(event) {
      // If not an UP | DOWN | ESCAPE key => not a dropdown command
      // If input/textarea && if key is other than ESCAPE => not a dropdown command

      var isInput = /input|textarea/i.test(event.target.tagName);
      var isEscapeEvent = event.key === ESCAPE_KEY$2;
      var isUpOrDownEvent = [ARROW_UP_KEY$1, ARROW_DOWN_KEY$1].includes(event.key);
      if (!isUpOrDownEvent && !isEscapeEvent) {
        return;
      }
      if (isInput && !isEscapeEvent) {
        return;
      }
      event.preventDefault();

      // TODO: v6 revert #37011 & change markup https://getbootstrap.com/docs/5.3/forms/input-group/
      var getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE$3)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3, event.delegateTarget.parentNode);
      var instance = Dropdown.getOrCreateInstance(getToggleButton);
      if (isUpOrDownEvent) {
        event.stopPropagation();
        instance.show();
        instance._selectMenuItem(event);
        return;
      }
      if (instance._isShown()) {
        // else is escape and we check if it is shown
        event.stopPropagation();
        instance.hide();
        getToggleButton.focus();
      }
    }
  }]);
  return Dropdown;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});

/**
 * jQuery
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$9 = 'backdrop';
var CLASS_NAME_FADE$4 = 'fade';
var CLASS_NAME_SHOW$5 = 'show';
var EVENT_MOUSEDOWN = "mousedown.bs.".concat(NAME$9);
var Default$8 = {
  className: 'modal-backdrop',
  clickCallback: null,
  isAnimated: false,
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  rootElement: 'body' // give the choice to place backdrop under different elements
};

var DefaultType$8 = {
  className: 'string',
  clickCallback: '(function|null)',
  isAnimated: 'boolean',
  isVisible: 'boolean',
  rootElement: '(element|string)'
};

/**
 * Class definition
 */
var Backdrop = /*#__PURE__*/function (_Config3) {
  _inherits(Backdrop, _Config3);
  var _super8 = _createSuper(Backdrop);
  function Backdrop(config) {
    var _this17;
    _classCallCheck(this, Backdrop);
    _this17 = _super8.call(this);
    _this17._config = _this17._getConfig(config);
    _this17._isAppended = false;
    _this17._element = null;
    return _this17;
  }

  // Getters
  _createClass(Backdrop, [{
    key: "show",
    value:
    // Public
    function show(callback) {
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._append();
      var element = this._getElement();
      if (this._config.isAnimated) {
        reflow(element);
      }
      element.classList.add(CLASS_NAME_SHOW$5);
      this._emulateAnimation(function () {
        execute(callback);
      });
    }
  }, {
    key: "hide",
    value: function hide(callback) {
      var _this18 = this;
      if (!this._config.isVisible) {
        execute(callback);
        return;
      }
      this._getElement().classList.remove(CLASS_NAME_SHOW$5);
      this._emulateAnimation(function () {
        _this18.dispose();
        execute(callback);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      if (!this._isAppended) {
        return;
      }
      EventHandler.off(this._element, EVENT_MOUSEDOWN);
      this._element.remove();
      this._isAppended = false;
    }

    // Private
  }, {
    key: "_getElement",
    value: function _getElement() {
      if (!this._element) {
        var backdrop = document.createElement('div');
        backdrop.className = this._config.className;
        if (this._config.isAnimated) {
          backdrop.classList.add(CLASS_NAME_FADE$4);
        }
        this._element = backdrop;
      }
      return this._element;
    }
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      // use getElement() with the default "body" to get a fresh Element on each instantiation
      config.rootElement = getElement(config.rootElement);
      return config;
    }
  }, {
    key: "_append",
    value: function _append() {
      var _this19 = this;
      if (this._isAppended) {
        return;
      }
      var element = this._getElement();
      this._config.rootElement.append(element);
      EventHandler.on(element, EVENT_MOUSEDOWN, function () {
        execute(_this19._config.clickCallback);
      });
      this._isAppended = true;
    }
  }, {
    key: "_emulateAnimation",
    value: function _emulateAnimation(callback) {
      executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
    }
  }], [{
    key: "Default",
    get: function get() {
      return Default$8;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$8;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$9;
    }
  }]);
  return Backdrop;
}(Config);
/**
 * --------------------------------------------------------------------------
 * Bootstrap util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var NAME$8 = 'focustrap';
var DATA_KEY$5 = 'bs.focustrap';
var EVENT_KEY$5 = ".".concat(DATA_KEY$5);
var EVENT_FOCUSIN$2 = "focusin".concat(EVENT_KEY$5);
var EVENT_KEYDOWN_TAB = "keydown.tab".concat(EVENT_KEY$5);
var TAB_KEY = 'Tab';
var TAB_NAV_FORWARD = 'forward';
var TAB_NAV_BACKWARD = 'backward';
var Default$7 = {
  autofocus: true,
  trapElement: null // The element to trap focus inside of
};

var DefaultType$7 = {
  autofocus: 'boolean',
  trapElement: 'element'
};

/**
 * Class definition
 */
var FocusTrap = /*#__PURE__*/function (_Config4) {
  _inherits(FocusTrap, _Config4);
  var _super9 = _createSuper(FocusTrap);
  function FocusTrap(config) {
    var _this20;
    _classCallCheck(this, FocusTrap);
    _this20 = _super9.call(this);
    _this20._config = _this20._getConfig(config);
    _this20._isActive = false;
    _this20._lastTabNavDirection = null;
    return _this20;
  }

  // Getters
  _createClass(FocusTrap, [{
    key: "activate",
    value:
    // Public
    function activate() {
      var _this21 = this;
      if (this._isActive) {
        return;
      }
      if (this._config.autofocus) {
        this._config.trapElement.focus();
      }
      EventHandler.off(document, EVENT_KEY$5); // guard against infinite focus loop
      EventHandler.on(document, EVENT_FOCUSIN$2, function (event) {
        return _this21._handleFocusin(event);
      });
      EventHandler.on(document, EVENT_KEYDOWN_TAB, function (event) {
        return _this21._handleKeydown(event);
      });
      this._isActive = true;
    }
  }, {
    key: "deactivate",
    value: function deactivate() {
      if (!this._isActive) {
        return;
      }
      this._isActive = false;
      EventHandler.off(document, EVENT_KEY$5);
    }

    // Private
  }, {
    key: "_handleFocusin",
    value: function _handleFocusin(event) {
      var trapElement = this._config.trapElement;
      if (event.target === document || event.target === trapElement || trapElement.contains(event.target)) {
        return;
      }
      var elements = SelectorEngine.focusableChildren(trapElement);
      if (elements.length === 0) {
        trapElement.focus();
      } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
        elements[elements.length - 1].focus();
      } else {
        elements[0].focus();
      }
    }
  }, {
    key: "_handleKeydown",
    value: function _handleKeydown(event) {
      if (event.key !== TAB_KEY) {
        return;
      }
      this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
    }
  }], [{
    key: "Default",
    get: function get() {
      return Default$7;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$7;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$8;
    }
  }]);
  return FocusTrap;
}(Config);
/**
 * --------------------------------------------------------------------------
 * Bootstrap util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
var SELECTOR_STICKY_CONTENT = '.sticky-top';
var PROPERTY_PADDING = 'padding-right';
var PROPERTY_MARGIN = 'margin-right';

/**
 * Class definition
 */
var ScrollBarHelper = /*#__PURE__*/function () {
  function ScrollBarHelper() {
    _classCallCheck(this, ScrollBarHelper);
    this._element = document.body;
  }

  // Public
  _createClass(ScrollBarHelper, [{
    key: "getWidth",
    value: function getWidth() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
      var documentWidth = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - documentWidth);
    }
  }, {
    key: "hide",
    value: function hide() {
      var width = this.getWidth();
      this._disableOverFlow();
      // give padding to element to balance the hidden scrollbar width
      this._setElementAttributes(this._element, PROPERTY_PADDING, function (calculatedValue) {
        return calculatedValue + width;
      });
      // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth
      this._setElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING, function (calculatedValue) {
        return calculatedValue + width;
      });
      this._setElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN, function (calculatedValue) {
        return calculatedValue - width;
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this._resetElementAttributes(this._element, 'overflow');
      this._resetElementAttributes(this._element, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_FIXED_CONTENT, PROPERTY_PADDING);
      this._resetElementAttributes(SELECTOR_STICKY_CONTENT, PROPERTY_MARGIN);
    }
  }, {
    key: "isOverflowing",
    value: function isOverflowing() {
      return this.getWidth() > 0;
    }

    // Private
  }, {
    key: "_disableOverFlow",
    value: function _disableOverFlow() {
      this._saveInitialAttribute(this._element, 'overflow');
      this._element.style.overflow = 'hidden';
    }
  }, {
    key: "_setElementAttributes",
    value: function _setElementAttributes(selector, styleProperty, callback) {
      var _this22 = this;
      var scrollbarWidth = this.getWidth();
      var manipulationCallBack = function manipulationCallBack(element) {
        if (element !== _this22._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
          return;
        }
        _this22._saveInitialAttribute(element, styleProperty);
        var calculatedValue = window.getComputedStyle(element).getPropertyValue(styleProperty);
        element.style.setProperty(styleProperty, "".concat(callback(Number.parseFloat(calculatedValue)), "px"));
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "_saveInitialAttribute",
    value: function _saveInitialAttribute(element, styleProperty) {
      var actualValue = element.style.getPropertyValue(styleProperty);
      if (actualValue) {
        Manipulator.setDataAttribute(element, styleProperty, actualValue);
      }
    }
  }, {
    key: "_resetElementAttributes",
    value: function _resetElementAttributes(selector, styleProperty) {
      var manipulationCallBack = function manipulationCallBack(element) {
        var value = Manipulator.getDataAttribute(element, styleProperty);
        // We only want to remove the property if the value is `null`; the value can also be zero
        if (value === null) {
          element.style.removeProperty(styleProperty);
          return;
        }
        Manipulator.removeDataAttribute(element, styleProperty);
        element.style.setProperty(styleProperty, value);
      };
      this._applyManipulationCallback(selector, manipulationCallBack);
    }
  }, {
    key: "_applyManipulationCallback",
    value: function _applyManipulationCallback(selector, callBack) {
      if (isElement(selector)) {
        callBack(selector);
        return;
      }
      var _iterator15 = _createForOfIteratorHelper(SelectorEngine.find(selector, this._element)),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var sel = _step15.value;
          callBack(sel);
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
    }
  }]);
  return ScrollBarHelper;
}();
/**
 * --------------------------------------------------------------------------
 * Bootstrap modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var NAME$7 = 'modal';
var DATA_KEY$4 = 'bs.modal';
var EVENT_KEY$4 = ".".concat(DATA_KEY$4);
var DATA_API_KEY$2 = '.data-api';
var ESCAPE_KEY$1 = 'Escape';
var EVENT_HIDE$4 = "hide".concat(EVENT_KEY$4);
var EVENT_HIDE_PREVENTED$1 = "hidePrevented".concat(EVENT_KEY$4);
var EVENT_HIDDEN$4 = "hidden".concat(EVENT_KEY$4);
var EVENT_SHOW$4 = "show".concat(EVENT_KEY$4);
var EVENT_SHOWN$4 = "shown".concat(EVENT_KEY$4);
var EVENT_RESIZE$1 = "resize".concat(EVENT_KEY$4);
var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY$4);
var EVENT_MOUSEDOWN_DISMISS = "mousedown.dismiss".concat(EVENT_KEY$4);
var EVENT_KEYDOWN_DISMISS$1 = "keydown.dismiss".concat(EVENT_KEY$4);
var EVENT_CLICK_DATA_API$2 = "click".concat(EVENT_KEY$4).concat(DATA_API_KEY$2);
var CLASS_NAME_OPEN = 'modal-open';
var CLASS_NAME_FADE$3 = 'fade';
var CLASS_NAME_SHOW$4 = 'show';
var CLASS_NAME_STATIC = 'modal-static';
var OPEN_SELECTOR$1 = '.modal.show';
var SELECTOR_DIALOG = '.modal-dialog';
var SELECTOR_MODAL_BODY = '.modal-body';
var SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
var Default$6 = {
  backdrop: true,
  focus: true,
  keyboard: true
};
var DefaultType$6 = {
  backdrop: '(boolean|string)',
  focus: 'boolean',
  keyboard: 'boolean'
};

/**
 * Class definition
 */
var Modal = /*#__PURE__*/function (_BaseComponent6) {
  _inherits(Modal, _BaseComponent6);
  var _super10 = _createSuper(Modal);
  function Modal(element, config) {
    var _this23;
    _classCallCheck(this, Modal);
    _this23 = _super10.call(this, element, config);
    _this23._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, _this23._element);
    _this23._backdrop = _this23._initializeBackDrop();
    _this23._focustrap = _this23._initializeFocusTrap();
    _this23._isShown = false;
    _this23._isTransitioning = false;
    _this23._scrollBar = new ScrollBarHelper();
    _this23._addEventListeners();
    return _this23;
  }

  // Getters
  _createClass(Modal, [{
    key: "toggle",
    value:
    // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this24 = this;
      if (this._isShown || this._isTransitioning) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, {
        relatedTarget: relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._isTransitioning = true;
      this._scrollBar.hide();
      document.body.classList.add(CLASS_NAME_OPEN);
      this._adjustDialog();
      this._backdrop.show(function () {
        return _this24._showElement(relatedTarget);
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this25 = this;
      if (!this._isShown || this._isTransitioning) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._isShown = false;
      this._isTransitioning = true;
      this._focustrap.deactivate();
      this._element.classList.remove(CLASS_NAME_SHOW$4);
      this._queueCallback(function () {
        return _this25._hideModal();
      }, this._element, this._isAnimated());
    }
  }, {
    key: "dispose",
    value: function dispose() {
      EventHandler.off(window, EVENT_KEY$4);
      EventHandler.off(this._dialog, EVENT_KEY$4);
      this._backdrop.dispose();
      this._focustrap.deactivate();
      _get(_getPrototypeOf(Modal.prototype), "dispose", this).call(this);
    }
  }, {
    key: "handleUpdate",
    value: function handleUpdate() {
      this._adjustDialog();
    }

    // Private
  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      return new Backdrop({
        isVisible: Boolean(this._config.backdrop),
        // 'static' option will be translated to true, and booleans will keep their value,
        isAnimated: this._isAnimated()
      });
    }
  }, {
    key: "_initializeFocusTrap",
    value: function _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
  }, {
    key: "_showElement",
    value: function _showElement(relatedTarget) {
      var _this26 = this;
      // try to append dynamic modal
      if (!document.body.contains(this._element)) {
        document.body.append(this._element);
      }
      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.scrollTop = 0;
      var modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);
      if (modalBody) {
        modalBody.scrollTop = 0;
      }
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW$4);
      var transitionComplete = function transitionComplete() {
        if (_this26._config.focus) {
          _this26._focustrap.activate();
        }
        _this26._isTransitioning = false;
        EventHandler.trigger(_this26._element, EVENT_SHOWN$4, {
          relatedTarget: relatedTarget
        });
      };
      this._queueCallback(transitionComplete, this._dialog, this._isAnimated());
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this27 = this;
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, function (event) {
        if (event.key !== ESCAPE_KEY$1) {
          return;
        }
        if (_this27._config.keyboard) {
          _this27.hide();
          return;
        }
        _this27._triggerBackdropTransition();
      });
      EventHandler.on(window, EVENT_RESIZE$1, function () {
        if (_this27._isShown && !_this27._isTransitioning) {
          _this27._adjustDialog();
        }
      });
      EventHandler.on(this._element, EVENT_MOUSEDOWN_DISMISS, function (event) {
        // a bad trick to segregate clicks that may start inside dialog but end outside, and avoid listen to scrollbar clicks
        EventHandler.one(_this27._element, EVENT_CLICK_DISMISS, function (event2) {
          if (_this27._element !== event.target || _this27._element !== event2.target) {
            return;
          }
          if (_this27._config.backdrop === 'static') {
            _this27._triggerBackdropTransition();
            return;
          }
          if (_this27._config.backdrop) {
            _this27.hide();
          }
        });
      });
    }
  }, {
    key: "_hideModal",
    value: function _hideModal() {
      var _this28 = this;
      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._element.removeAttribute('aria-modal');
      this._element.removeAttribute('role');
      this._isTransitioning = false;
      this._backdrop.hide(function () {
        document.body.classList.remove(CLASS_NAME_OPEN);
        _this28._resetAdjustments();
        _this28._scrollBar.reset();
        EventHandler.trigger(_this28._element, EVENT_HIDDEN$4);
      });
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._element.classList.contains(CLASS_NAME_FADE$3);
    }
  }, {
    key: "_triggerBackdropTransition",
    value: function _triggerBackdropTransition() {
      var _this29 = this;
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED$1);
      if (hideEvent.defaultPrevented) {
        return;
      }
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      var initialOverflowY = this._element.style.overflowY;
      // return if the following background transition hasn't yet completed
      if (initialOverflowY === 'hidden' || this._element.classList.contains(CLASS_NAME_STATIC)) {
        return;
      }
      if (!isModalOverflowing) {
        this._element.style.overflowY = 'hidden';
      }
      this._element.classList.add(CLASS_NAME_STATIC);
      this._queueCallback(function () {
        _this29._element.classList.remove(CLASS_NAME_STATIC);
        _this29._queueCallback(function () {
          _this29._element.style.overflowY = initialOverflowY;
        }, _this29._dialog);
      }, this._dialog);
      this._element.focus();
    }

    /**
     * The following methods are used to handle overflowing modals
     */
  }, {
    key: "_adjustDialog",
    value: function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;
      var scrollbarWidth = this._scrollBar.getWidth();
      var isBodyOverflowing = scrollbarWidth > 0;
      if (isBodyOverflowing && !isModalOverflowing) {
        var property = isRTL() ? 'paddingLeft' : 'paddingRight';
        this._element.style[property] = "".concat(scrollbarWidth, "px");
      }
      if (!isBodyOverflowing && isModalOverflowing) {
        var _property = isRTL() ? 'paddingRight' : 'paddingLeft';
        this._element.style[_property] = "".concat(scrollbarWidth, "px");
      }
    }
  }, {
    key: "_resetAdjustments",
    value: function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$6;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$6;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$7;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = Modal.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config](relatedTarget);
      });
    }
  }]);
  return Modal;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
  var _this30 = this;
  var target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  EventHandler.one(target, EVENT_SHOW$4, function (showEvent) {
    if (showEvent.defaultPrevented) {
      // only register focus restorer if modal will actually get shown
      return;
    }
    EventHandler.one(target, EVENT_HIDDEN$4, function () {
      if (isVisible(_this30)) {
        _this30.focus();
      }
    });
  });

  // avoid conflict when clicking modal toggler while another one is open
  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);
  if (alreadyOpen) {
    Modal.getInstance(alreadyOpen).hide();
  }
  var data = Modal.getOrCreateInstance(target);
  data.toggle(this);
});
enableDismissTrigger(Modal);

/**
 * jQuery
 */

defineJQueryPlugin(Modal);

/**
 * --------------------------------------------------------------------------
 * Bootstrap offcanvas.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$6 = 'offcanvas';
var DATA_KEY$3 = 'bs.offcanvas';
var EVENT_KEY$3 = ".".concat(DATA_KEY$3);
var DATA_API_KEY$1 = '.data-api';
var EVENT_LOAD_DATA_API$2 = "load".concat(EVENT_KEY$3).concat(DATA_API_KEY$1);
var ESCAPE_KEY = 'Escape';
var CLASS_NAME_SHOW$3 = 'show';
var CLASS_NAME_SHOWING$1 = 'showing';
var CLASS_NAME_HIDING = 'hiding';
var CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
var OPEN_SELECTOR = '.offcanvas.show';
var EVENT_SHOW$3 = "show".concat(EVENT_KEY$3);
var EVENT_SHOWN$3 = "shown".concat(EVENT_KEY$3);
var EVENT_HIDE$3 = "hide".concat(EVENT_KEY$3);
var EVENT_HIDE_PREVENTED = "hidePrevented".concat(EVENT_KEY$3);
var EVENT_HIDDEN$3 = "hidden".concat(EVENT_KEY$3);
var EVENT_RESIZE = "resize".concat(EVENT_KEY$3);
var EVENT_CLICK_DATA_API$1 = "click".concat(EVENT_KEY$3).concat(DATA_API_KEY$1);
var EVENT_KEYDOWN_DISMISS = "keydown.dismiss".concat(EVENT_KEY$3);
var SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
var Default$5 = {
  backdrop: true,
  keyboard: true,
  scroll: false
};
var DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  scroll: 'boolean'
};

/**
 * Class definition
 */
var Offcanvas = /*#__PURE__*/function (_BaseComponent7) {
  _inherits(Offcanvas, _BaseComponent7);
  var _super11 = _createSuper(Offcanvas);
  function Offcanvas(element, config) {
    var _this31;
    _classCallCheck(this, Offcanvas);
    _this31 = _super11.call(this, element, config);
    _this31._isShown = false;
    _this31._backdrop = _this31._initializeBackDrop();
    _this31._focustrap = _this31._initializeFocusTrap();
    _this31._addEventListeners();
    return _this31;
  }

  // Getters
  _createClass(Offcanvas, [{
    key: "toggle",
    value:
    // Public
    function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    }
  }, {
    key: "show",
    value: function show(relatedTarget) {
      var _this32 = this;
      if (this._isShown) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
        relatedTarget: relatedTarget
      });
      if (showEvent.defaultPrevented) {
        return;
      }
      this._isShown = true;
      this._backdrop.show();
      if (!this._config.scroll) {
        new ScrollBarHelper().hide();
      }
      this._element.setAttribute('aria-modal', true);
      this._element.setAttribute('role', 'dialog');
      this._element.classList.add(CLASS_NAME_SHOWING$1);
      var completeCallBack = function completeCallBack() {
        if (!_this32._config.scroll || _this32._config.backdrop) {
          _this32._focustrap.activate();
        }
        _this32._element.classList.add(CLASS_NAME_SHOW$3);
        _this32._element.classList.remove(CLASS_NAME_SHOWING$1);
        EventHandler.trigger(_this32._element, EVENT_SHOWN$3, {
          relatedTarget: relatedTarget
        });
      };
      this._queueCallback(completeCallBack, this._element, true);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this33 = this;
      if (!this._isShown) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);
      if (hideEvent.defaultPrevented) {
        return;
      }
      this._focustrap.deactivate();
      this._element.blur();
      this._isShown = false;
      this._element.classList.add(CLASS_NAME_HIDING);
      this._backdrop.hide();
      var completeCallback = function completeCallback() {
        _this33._element.classList.remove(CLASS_NAME_SHOW$3, CLASS_NAME_HIDING);
        _this33._element.removeAttribute('aria-modal');
        _this33._element.removeAttribute('role');
        if (!_this33._config.scroll) {
          new ScrollBarHelper().reset();
        }
        EventHandler.trigger(_this33._element, EVENT_HIDDEN$3);
      };
      this._queueCallback(completeCallback, this._element, true);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._backdrop.dispose();
      this._focustrap.deactivate();
      _get(_getPrototypeOf(Offcanvas.prototype), "dispose", this).call(this);
    }

    // Private
  }, {
    key: "_initializeBackDrop",
    value: function _initializeBackDrop() {
      var _this34 = this;
      var clickCallback = function clickCallback() {
        if (_this34._config.backdrop === 'static') {
          EventHandler.trigger(_this34._element, EVENT_HIDE_PREVENTED);
          return;
        }
        _this34.hide();
      };

      // 'static' option will be translated to true, and booleans will keep their value
      var isVisible = Boolean(this._config.backdrop);
      return new Backdrop({
        className: CLASS_NAME_BACKDROP,
        isVisible: isVisible,
        isAnimated: true,
        rootElement: this._element.parentNode,
        clickCallback: isVisible ? clickCallback : null
      });
    }
  }, {
    key: "_initializeFocusTrap",
    value: function _initializeFocusTrap() {
      return new FocusTrap({
        trapElement: this._element
      });
    }
  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this35 = this;
      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, function (event) {
        if (event.key !== ESCAPE_KEY) {
          return;
        }
        if (_this35._config.keyboard) {
          _this35.hide();
          return;
        }
        EventHandler.trigger(_this35._element, EVENT_HIDE_PREVENTED);
      });
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$5;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$5;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$6;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Offcanvas.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config](this);
      });
    }
  }]);
  return Offcanvas;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
  var _this36 = this;
  var target = SelectorEngine.getElementFromSelector(this);
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  EventHandler.one(target, EVENT_HIDDEN$3, function () {
    // focus on trigger when it is closed
    if (isVisible(_this36)) {
      _this36.focus();
    }
  });

  // avoid conflict when clicking a toggler of an offcanvas, while another is open
  var alreadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);
  if (alreadyOpen && alreadyOpen !== target) {
    Offcanvas.getInstance(alreadyOpen).hide();
  }
  var data = Offcanvas.getOrCreateInstance(target);
  data.toggle(this);
});
EventHandler.on(window, EVENT_LOAD_DATA_API$2, function () {
  var _iterator16 = _createForOfIteratorHelper(SelectorEngine.find(OPEN_SELECTOR)),
    _step16;
  try {
    for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
      var selector = _step16.value;
      Offcanvas.getOrCreateInstance(selector).show();
    }
  } catch (err) {
    _iterator16.e(err);
  } finally {
    _iterator16.f();
  }
});
EventHandler.on(window, EVENT_RESIZE, function () {
  var _iterator17 = _createForOfIteratorHelper(SelectorEngine.find('[aria-modal][class*=show][class*=offcanvas-]')),
    _step17;
  try {
    for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
      var element = _step17.value;
      if (getComputedStyle(element).position !== 'fixed') {
        Offcanvas.getOrCreateInstance(element).hide();
      }
    }
  } catch (err) {
    _iterator17.e(err);
  } finally {
    _iterator17.f();
  }
});
enableDismissTrigger(Offcanvas);

/**
 * jQuery
 */

defineJQueryPlugin(Offcanvas);

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/sanitizer.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

var uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);

/**
 * A pattern that recognizes a commonly useful subset of URLs that are safe.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */
var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;

/**
 * A pattern that matches safe data URLs. Only matches image, video and audio types.
 *
 * Shout-out to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
 */
var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
var allowedAttribute = function allowedAttribute(attribute, allowedAttributeList) {
  var attributeName = attribute.nodeName.toLowerCase();
  if (allowedAttributeList.includes(attributeName)) {
    if (uriAttributes.has(attributeName)) {
      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
    }
    return true;
  }

  // Check if a regular expression validates the attribute.
  return allowedAttributeList.filter(function (attributeRegex) {
    return attributeRegex instanceof RegExp;
  }).some(function (regex) {
    return regex.test(attributeName);
  });
};

// js-docs-start allow-list
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
};
// js-docs-end allow-list

function sanitizeHtml(unsafeHtml, allowList, sanitizeFunction) {
  var _ref7;
  if (!unsafeHtml.length) {
    return unsafeHtml;
  }
  if (sanitizeFunction && typeof sanitizeFunction === 'function') {
    return sanitizeFunction(unsafeHtml);
  }
  var domParser = new window.DOMParser();
  var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
  var elements = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(createdDocument.body.querySelectorAll('*')));
  var _iterator18 = _createForOfIteratorHelper(elements),
    _step18;
  try {
    for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
      var _ref8;
      var element = _step18.value;
      var elementName = element.nodeName.toLowerCase();
      if (!Object.keys(allowList).includes(elementName)) {
        element.remove();
        continue;
      }
      var attributeList = (_ref8 = []).concat.apply(_ref8, _toConsumableArray(element.attributes));
      var allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
      var _iterator19 = _createForOfIteratorHelper(attributeList),
        _step19;
      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var attribute = _step19.value;
          if (!allowedAttribute(attribute, allowedAttributes)) {
            element.removeAttribute(attribute.nodeName);
          }
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
    }
  } catch (err) {
    _iterator18.e(err);
  } finally {
    _iterator18.f();
  }
  return createdDocument.body.innerHTML;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap util/template-factory.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$5 = 'TemplateFactory';
var Default$4 = {
  allowList: DefaultAllowlist,
  content: {},
  // { selector : text ,  selector2 : text2 , }
  extraClass: '',
  html: false,
  sanitize: true,
  sanitizeFn: null,
  template: '<div></div>'
};
var DefaultType$4 = {
  allowList: 'object',
  content: 'object',
  extraClass: '(string|function)',
  html: 'boolean',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  template: 'string'
};
var DefaultContentType = {
  entry: '(string|element|function|null)',
  selector: '(string|element)'
};

/**
 * Class definition
 */
var TemplateFactory = /*#__PURE__*/function (_Config5) {
  _inherits(TemplateFactory, _Config5);
  var _super12 = _createSuper(TemplateFactory);
  function TemplateFactory(config) {
    var _this37;
    _classCallCheck(this, TemplateFactory);
    _this37 = _super12.call(this);
    _this37._config = _this37._getConfig(config);
    return _this37;
  }

  // Getters
  _createClass(TemplateFactory, [{
    key: "getContent",
    value:
    // Public
    function getContent() {
      var _this38 = this;
      return Object.values(this._config.content).map(function (config) {
        return _this38._resolvePossibleFunction(config);
      }).filter(Boolean);
    }
  }, {
    key: "hasContent",
    value: function hasContent() {
      return this.getContent().length > 0;
    }
  }, {
    key: "changeContent",
    value: function changeContent(content) {
      this._checkContent(content);
      this._config.content = _objectSpread2(_objectSpread2({}, this._config.content), content);
      return this;
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      var templateWrapper = document.createElement('div');
      templateWrapper.innerHTML = this._maybeSanitize(this._config.template);
      for (var _i7 = 0, _Object$entries5 = Object.entries(this._config.content); _i7 < _Object$entries5.length; _i7++) {
        var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i7], 2),
          selector = _Object$entries5$_i[0],
          text = _Object$entries5$_i[1];
        this._setContent(templateWrapper, text, selector);
      }
      var template = templateWrapper.children[0];
      var extraClass = this._resolvePossibleFunction(this._config.extraClass);
      if (extraClass) {
        var _template$classList;
        (_template$classList = template.classList).add.apply(_template$classList, _toConsumableArray(extraClass.split(' ')));
      }
      return template;
    }

    // Private
  }, {
    key: "_typeCheckConfig",
    value: function _typeCheckConfig(config) {
      _get(_getPrototypeOf(TemplateFactory.prototype), "_typeCheckConfig", this).call(this, config);
      this._checkContent(config.content);
    }
  }, {
    key: "_checkContent",
    value: function _checkContent(arg) {
      for (var _i8 = 0, _Object$entries6 = Object.entries(arg); _i8 < _Object$entries6.length; _i8++) {
        var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i8], 2),
          selector = _Object$entries6$_i[0],
          content = _Object$entries6$_i[1];
        _get(_getPrototypeOf(TemplateFactory.prototype), "_typeCheckConfig", this).call(this, {
          selector: selector,
          entry: content
        }, DefaultContentType);
      }
    }
  }, {
    key: "_setContent",
    value: function _setContent(template, content, selector) {
      var templateElement = SelectorEngine.findOne(selector, template);
      if (!templateElement) {
        return;
      }
      content = this._resolvePossibleFunction(content);
      if (!content) {
        templateElement.remove();
        return;
      }
      if (isElement(content)) {
        this._putElementInTemplate(getElement(content), templateElement);
        return;
      }
      if (this._config.html) {
        templateElement.innerHTML = this._maybeSanitize(content);
        return;
      }
      templateElement.textContent = content;
    }
  }, {
    key: "_maybeSanitize",
    value: function _maybeSanitize(arg) {
      return this._config.sanitize ? sanitizeHtml(arg, this._config.allowList, this._config.sanitizeFn) : arg;
    }
  }, {
    key: "_resolvePossibleFunction",
    value: function _resolvePossibleFunction(arg) {
      return execute(arg, [this]);
    }
  }, {
    key: "_putElementInTemplate",
    value: function _putElementInTemplate(element, templateElement) {
      if (this._config.html) {
        templateElement.innerHTML = '';
        templateElement.append(element);
        return;
      }
      templateElement.textContent = element.textContent;
    }
  }], [{
    key: "Default",
    get: function get() {
      return Default$4;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$4;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$5;
    }
  }]);
  return TemplateFactory;
}(Config);
/**
 * --------------------------------------------------------------------------
 * Bootstrap tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * Constants
 */
var NAME$4 = 'tooltip';
var DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
var CLASS_NAME_FADE$2 = 'fade';
var CLASS_NAME_MODAL = 'modal';
var CLASS_NAME_SHOW$2 = 'show';
var SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
var SELECTOR_MODAL = ".".concat(CLASS_NAME_MODAL);
var EVENT_MODAL_HIDE = 'hide.bs.modal';
var TRIGGER_HOVER = 'hover';
var TRIGGER_FOCUS = 'focus';
var TRIGGER_CLICK = 'click';
var TRIGGER_MANUAL = 'manual';
var EVENT_HIDE$2 = 'hide';
var EVENT_HIDDEN$2 = 'hidden';
var EVENT_SHOW$2 = 'show';
var EVENT_SHOWN$2 = 'shown';
var EVENT_INSERTED = 'inserted';
var EVENT_CLICK$1 = 'click';
var EVENT_FOCUSIN$1 = 'focusin';
var EVENT_FOCUSOUT$1 = 'focusout';
var EVENT_MOUSEENTER = 'mouseenter';
var EVENT_MOUSELEAVE = 'mouseleave';
var AttachmentMap = {
  AUTO: 'auto',
  TOP: 'top',
  RIGHT: isRTL() ? 'left' : 'right',
  BOTTOM: 'bottom',
  LEFT: isRTL() ? 'right' : 'left'
};
var Default$3 = {
  allowList: DefaultAllowlist,
  animation: true,
  boundary: 'clippingParents',
  container: false,
  customClass: '',
  delay: 0,
  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
  html: false,
  offset: [0, 6],
  placement: 'top',
  popperConfig: null,
  sanitize: true,
  sanitizeFn: null,
  selector: false,
  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
  title: '',
  trigger: 'hover focus'
};
var DefaultType$3 = {
  allowList: 'object',
  animation: 'boolean',
  boundary: '(string|element)',
  container: '(string|element|boolean)',
  customClass: '(string|function)',
  delay: '(number|object)',
  fallbackPlacements: 'array',
  html: 'boolean',
  offset: '(array|string|function)',
  placement: '(string|function)',
  popperConfig: '(null|object|function)',
  sanitize: 'boolean',
  sanitizeFn: '(null|function)',
  selector: '(string|boolean)',
  template: 'string',
  title: '(string|element|function)',
  trigger: 'string'
};

/**
 * Class definition
 */
var Tooltip = /*#__PURE__*/function (_BaseComponent8) {
  _inherits(Tooltip, _BaseComponent8);
  var _super13 = _createSuper(Tooltip);
  function Tooltip(element, config) {
    var _this39;
    _classCallCheck(this, Tooltip);
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
    }
    _this39 = _super13.call(this, element, config);

    // Private
    _this39._isEnabled = true;
    _this39._timeout = 0;
    _this39._isHovered = null;
    _this39._activeTrigger = {};
    _this39._popper = null;
    _this39._templateFactory = null;
    _this39._newContent = null;

    // Protected
    _this39.tip = null;
    _this39._setListeners();
    if (!_this39._config.selector) {
      _this39._fixTitle();
    }
    return _this39;
  }

  // Getters
  _createClass(Tooltip, [{
    key: "enable",
    value:
    // Public
    function enable() {
      this._isEnabled = true;
    }
  }, {
    key: "disable",
    value: function disable() {
      this._isEnabled = false;
    }
  }, {
    key: "toggleEnabled",
    value: function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (!this._isEnabled) {
        return;
      }
      this._activeTrigger.click = !this._activeTrigger.click;
      if (this._isShown()) {
        this._leave();
        return;
      }
      this._enter();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      clearTimeout(this._timeout);
      EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
      if (this._element.getAttribute('data-bs-original-title')) {
        this._element.setAttribute('title', this._element.getAttribute('data-bs-original-title'));
      }
      this._disposePopper();
      _get(_getPrototypeOf(Tooltip.prototype), "dispose", this).call(this);
    }
  }, {
    key: "show",
    value: function show() {
      var _this40 = this;
      if (this._element.style.display === 'none') {
        throw new Error('Please use show on visible elements');
      }
      if (!(this._isWithContent() && this._isEnabled)) {
        return;
      }
      var showEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_SHOW$2));
      var shadowRoot = findShadowRoot(this._element);
      var isInTheDom = (shadowRoot || this._element.ownerDocument.documentElement).contains(this._element);
      if (showEvent.defaultPrevented || !isInTheDom) {
        return;
      }

      // TODO: v6 remove this or make it optional
      this._disposePopper();
      var tip = this._getTipElement();
      this._element.setAttribute('aria-describedby', tip.getAttribute('id'));
      var container = this._config.container;
      if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
        container.append(tip);
        EventHandler.trigger(this._element, this.constructor.eventName(EVENT_INSERTED));
      }
      this._popper = this._createPopper(tip);
      tip.classList.add(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement) {
        var _ref9;
        var _iterator20 = _createForOfIteratorHelper((_ref9 = []).concat.apply(_ref9, _toConsumableArray(document.body.children))),
          _step20;
        try {
          for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
            var element = _step20.value;
            EventHandler.on(element, 'mouseover', noop);
          }
        } catch (err) {
          _iterator20.e(err);
        } finally {
          _iterator20.f();
        }
      }
      var complete = function complete() {
        EventHandler.trigger(_this40._element, _this40.constructor.eventName(EVENT_SHOWN$2));
        if (_this40._isHovered === false) {
          _this40._leave();
        }
        _this40._isHovered = false;
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this41 = this;
      if (!this._isShown()) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, this.constructor.eventName(EVENT_HIDE$2));
      if (hideEvent.defaultPrevented) {
        return;
      }
      var tip = this._getTipElement();
      tip.classList.remove(CLASS_NAME_SHOW$2);

      // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        var _ref10;
        var _iterator21 = _createForOfIteratorHelper((_ref10 = []).concat.apply(_ref10, _toConsumableArray(document.body.children))),
          _step21;
        try {
          for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
            var element = _step21.value;
            EventHandler.off(element, 'mouseover', noop);
          }
        } catch (err) {
          _iterator21.e(err);
        } finally {
          _iterator21.f();
        }
      }
      this._activeTrigger[TRIGGER_CLICK] = false;
      this._activeTrigger[TRIGGER_FOCUS] = false;
      this._activeTrigger[TRIGGER_HOVER] = false;
      this._isHovered = null; // it is a trick to support manual triggering

      var complete = function complete() {
        if (_this41._isWithActiveTrigger()) {
          return;
        }
        if (!_this41._isHovered) {
          _this41._disposePopper();
        }
        _this41._element.removeAttribute('aria-describedby');
        EventHandler.trigger(_this41._element, _this41.constructor.eventName(EVENT_HIDDEN$2));
      };
      this._queueCallback(complete, this.tip, this._isAnimated());
    }
  }, {
    key: "update",
    value: function update() {
      if (this._popper) {
        this._popper.update();
      }
    }

    // Protected
  }, {
    key: "_isWithContent",
    value: function _isWithContent() {
      return Boolean(this._getTitle());
    }
  }, {
    key: "_getTipElement",
    value: function _getTipElement() {
      if (!this.tip) {
        this.tip = this._createTipElement(this._newContent || this._getContentForTemplate());
      }
      return this.tip;
    }
  }, {
    key: "_createTipElement",
    value: function _createTipElement(content) {
      var tip = this._getTemplateFactory(content).toHtml();

      // TODO: remove this check in v6
      if (!tip) {
        return null;
      }
      tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
      // TODO: v6 the following can be achieved with CSS only
      tip.classList.add("bs-".concat(this.constructor.NAME, "-auto"));
      var tipId = getUID(this.constructor.NAME).toString();
      tip.setAttribute('id', tipId);
      if (this._isAnimated()) {
        tip.classList.add(CLASS_NAME_FADE$2);
      }
      return tip;
    }
  }, {
    key: "setContent",
    value: function setContent(content) {
      this._newContent = content;
      if (this._isShown()) {
        this._disposePopper();
        this.show();
      }
    }
  }, {
    key: "_getTemplateFactory",
    value: function _getTemplateFactory(content) {
      if (this._templateFactory) {
        this._templateFactory.changeContent(content);
      } else {
        this._templateFactory = new TemplateFactory(_objectSpread2(_objectSpread2({}, this._config), {}, {
          // the `content` var has to be after `this._config`
          // to override config.content in case of popover
          content: content,
          extraClass: this._resolvePossibleFunction(this._config.customClass)
        }));
      }
      return this._templateFactory;
    }
  }, {
    key: "_getContentForTemplate",
    value: function _getContentForTemplate() {
      return _defineProperty({}, SELECTOR_TOOLTIP_INNER, this._getTitle());
    }
  }, {
    key: "_getTitle",
    value: function _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute('data-bs-original-title');
    }

    // Private
  }, {
    key: "_initializeOnDelegatedTarget",
    value: function _initializeOnDelegatedTarget(event) {
      return this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
    }
  }, {
    key: "_isAnimated",
    value: function _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains(CLASS_NAME_FADE$2);
    }
  }, {
    key: "_isShown",
    value: function _isShown() {
      return this.tip && this.tip.classList.contains(CLASS_NAME_SHOW$2);
    }
  }, {
    key: "_createPopper",
    value: function _createPopper(tip) {
      var placement = execute(this._config.placement, [this, tip, this._element]);
      var attachment = AttachmentMap[placement.toUpperCase()];
      return createPopper(this._element, tip, this._getPopperConfig(attachment));
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this42 = this;
      var offset = this._config.offset;
      if (typeof offset === 'string') {
        return offset.split(',').map(function (value) {
          return Number.parseInt(value, 10);
        });
      }
      if (typeof offset === 'function') {
        return function (popperData) {
          return offset(popperData, _this42._element);
        };
      }
      return offset;
    }
  }, {
    key: "_resolvePossibleFunction",
    value: function _resolvePossibleFunction(arg) {
      return execute(arg, [this._element]);
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig(attachment) {
      var _this43 = this;
      var defaultBsPopperConfig = {
        placement: attachment,
        modifiers: [{
          name: 'flip',
          options: {
            fallbackPlacements: this._config.fallbackPlacements
          }
        }, {
          name: 'offset',
          options: {
            offset: this._getOffset()
          }
        }, {
          name: 'preventOverflow',
          options: {
            boundary: this._config.boundary
          }
        }, {
          name: 'arrow',
          options: {
            element: ".".concat(this.constructor.NAME, "-arrow")
          }
        }, {
          name: 'preSetPlacement',
          enabled: true,
          phase: 'beforeMain',
          fn: function fn(data) {
            // Pre-set Popper's placement attribute in order to read the arrow sizes properly.
            // Otherwise, Popper mixes up the width and height dimensions since the initial arrow style is for top placement
            _this43._getTipElement().setAttribute('data-popper-placement', data.state.placement);
          }
        }]
      };
      return _objectSpread2(_objectSpread2({}, defaultBsPopperConfig), execute(this._config.popperConfig, [defaultBsPopperConfig]));
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this44 = this;
      var triggers = this._config.trigger.split(' ');
      var _iterator22 = _createForOfIteratorHelper(triggers),
        _step22;
      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var trigger = _step22.value;
          if (trigger === 'click') {
            EventHandler.on(this._element, this.constructor.eventName(EVENT_CLICK$1), this._config.selector, function (event) {
              var context = _this44._initializeOnDelegatedTarget(event);
              context.toggle();
            });
          } else if (trigger !== TRIGGER_MANUAL) {
            var eventIn = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSEENTER) : this.constructor.eventName(EVENT_FOCUSIN$1);
            var eventOut = trigger === TRIGGER_HOVER ? this.constructor.eventName(EVENT_MOUSELEAVE) : this.constructor.eventName(EVENT_FOCUSOUT$1);
            EventHandler.on(this._element, eventIn, this._config.selector, function (event) {
              var context = _this44._initializeOnDelegatedTarget(event);
              context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
              context._enter();
            });
            EventHandler.on(this._element, eventOut, this._config.selector, function (event) {
              var context = _this44._initializeOnDelegatedTarget(event);
              context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
              context._leave();
            });
          }
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
      this._hideModalHandler = function () {
        if (_this44._element) {
          _this44.hide();
        }
      };
      EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);
    }
  }, {
    key: "_fixTitle",
    value: function _fixTitle() {
      var title = this._element.getAttribute('title');
      if (!title) {
        return;
      }
      if (!this._element.getAttribute('aria-label') && !this._element.textContent.trim()) {
        this._element.setAttribute('aria-label', title);
      }
      this._element.setAttribute('data-bs-original-title', title); // DO NOT USE IT. Is only for backwards compatibility
      this._element.removeAttribute('title');
    }
  }, {
    key: "_enter",
    value: function _enter() {
      var _this45 = this;
      if (this._isShown() || this._isHovered) {
        this._isHovered = true;
        return;
      }
      this._isHovered = true;
      this._setTimeout(function () {
        if (_this45._isHovered) {
          _this45.show();
        }
      }, this._config.delay.show);
    }
  }, {
    key: "_leave",
    value: function _leave() {
      var _this46 = this;
      if (this._isWithActiveTrigger()) {
        return;
      }
      this._isHovered = false;
      this._setTimeout(function () {
        if (!_this46._isHovered) {
          _this46.hide();
        }
      }, this._config.delay.hide);
    }
  }, {
    key: "_setTimeout",
    value: function _setTimeout(handler, timeout) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(handler, timeout);
    }
  }, {
    key: "_isWithActiveTrigger",
    value: function _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      var dataAttributes = Manipulator.getDataAttributes(this._element);
      for (var _i9 = 0, _Object$keys2 = Object.keys(dataAttributes); _i9 < _Object$keys2.length; _i9++) {
        var dataAttribute = _Object$keys2[_i9];
        if (DISALLOWED_ATTRIBUTES.has(dataAttribute)) {
          delete dataAttributes[dataAttribute];
        }
      }
      config = _objectSpread2(_objectSpread2({}, dataAttributes), _typeof(config) === 'object' && config ? config : {});
      config = this._mergeConfigObj(config);
      config = this._configAfterMerge(config);
      this._typeCheckConfig(config);
      return config;
    }
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      config.container = config.container === false ? document.body : getElement(config.container);
      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }
      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }
      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }
      return config;
    }
  }, {
    key: "_getDelegateConfig",
    value: function _getDelegateConfig() {
      var config = {};
      for (var _i10 = 0, _Object$entries7 = Object.entries(this._config); _i10 < _Object$entries7.length; _i10++) {
        var _Object$entries7$_i = _slicedToArray(_Object$entries7[_i10], 2),
          key = _Object$entries7$_i[0],
          value = _Object$entries7$_i[1];
        if (this.constructor.Default[key] !== value) {
          config[key] = value;
        }
      }
      config.selector = false;
      config.trigger = 'manual';

      // In the future can be replaced with:
      // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
      // `Object.fromEntries(keysWithDifferentValues)`
      return config;
    }
  }, {
    key: "_disposePopper",
    value: function _disposePopper() {
      if (this._popper) {
        this._popper.destroy();
        this._popper = null;
      }
      if (this.tip) {
        this.tip.remove();
        this.tip = null;
      }
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$3;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$3;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$4;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tooltip.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config]();
      });
    }
  }]);
  return Tooltip;
}(BaseComponent);
/**
 * jQuery
 */
defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$3 = 'popover';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
var Default$2 = _objectSpread2(_objectSpread2({}, Tooltip.Default), {}, {
  content: '',
  offset: [0, 8],
  placement: 'right',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>',
  trigger: 'click'
});
var DefaultType$2 = _objectSpread2(_objectSpread2({}, Tooltip.DefaultType), {}, {
  content: '(null|string|element|function)'
});

/**
 * Class definition
 */
var Popover = /*#__PURE__*/function (_Tooltip) {
  _inherits(Popover, _Tooltip);
  var _super14 = _createSuper(Popover);
  function Popover() {
    _classCallCheck(this, Popover);
    return _super14.apply(this, arguments);
  }
  _createClass(Popover, [{
    key: "_isWithContent",
    value:
    // Overrides
    function _isWithContent() {
      return this._getTitle() || this._getContent();
    }

    // Private
  }, {
    key: "_getContentForTemplate",
    value: function _getContentForTemplate() {
      var _ref12;
      return _ref12 = {}, _defineProperty(_ref12, SELECTOR_TITLE, this._getTitle()), _defineProperty(_ref12, SELECTOR_CONTENT, this._getContent()), _ref12;
    }
  }, {
    key: "_getContent",
    value: function _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }

    // Static
  }], [{
    key: "Default",
    get:
    // Getters
    function get() {
      return Default$2;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$2;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$3;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Popover.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (typeof data[config] === 'undefined') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config]();
      });
    }
  }]);
  return Popover;
}(Tooltip);
/**
 * jQuery
 */
defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$2 = 'scrollspy';
var DATA_KEY$2 = 'bs.scrollspy';
var EVENT_KEY$2 = ".".concat(DATA_KEY$2);
var DATA_API_KEY = '.data-api';
var EVENT_ACTIVATE = "activate".concat(EVENT_KEY$2);
var EVENT_CLICK = "click".concat(EVENT_KEY$2);
var EVENT_LOAD_DATA_API$1 = "load".concat(EVENT_KEY$2).concat(DATA_API_KEY);
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE$1 = 'active';
var SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
var SELECTOR_TARGET_LINKS = '[href]';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_LINK_ITEMS = "".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_NAV_ITEMS, " > ").concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS);
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
var Default$1 = {
  offset: null,
  // TODO: v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: '0px 0px -25%',
  smoothScroll: false,
  target: null,
  threshold: [0.1, 0.5, 1]
};
var DefaultType$1 = {
  offset: '(number|null)',
  // TODO v6 @deprecated, keep it for backwards compatibility reasons
  rootMargin: 'string',
  smoothScroll: 'boolean',
  target: 'element',
  threshold: 'array'
};

/**
 * Class definition
 */
var ScrollSpy = /*#__PURE__*/function (_BaseComponent9) {
  _inherits(ScrollSpy, _BaseComponent9);
  var _super15 = _createSuper(ScrollSpy);
  function ScrollSpy(element, config) {
    var _this47;
    _classCallCheck(this, ScrollSpy);
    _this47 = _super15.call(this, element, config);

    // this._element is the observablesContainer and config.target the menu links wrapper
    _this47._targetLinks = new Map();
    _this47._observableSections = new Map();
    _this47._rootElement = getComputedStyle(_this47._element).overflowY === 'visible' ? null : _this47._element;
    _this47._activeTarget = null;
    _this47._observer = null;
    _this47._previousScrollData = {
      visibleEntryTop: 0,
      parentScrollTop: 0
    };
    _this47.refresh(); // initialize
    return _this47;
  }

  // Getters
  _createClass(ScrollSpy, [{
    key: "refresh",
    value:
    // Public
    function refresh() {
      this._initializeTargetsAndObservables();
      this._maybeEnableSmoothScroll();
      if (this._observer) {
        this._observer.disconnect();
      } else {
        this._observer = this._getNewObserver();
      }
      var _iterator23 = _createForOfIteratorHelper(this._observableSections.values()),
        _step23;
      try {
        for (_iterator23.s(); !(_step23 = _iterator23.n()).done;) {
          var section = _step23.value;
          this._observer.observe(section);
        }
      } catch (err) {
        _iterator23.e(err);
      } finally {
        _iterator23.f();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._observer.disconnect();
      _get(_getPrototypeOf(ScrollSpy.prototype), "dispose", this).call(this);
    }

    // Private
  }, {
    key: "_configAfterMerge",
    value: function _configAfterMerge(config) {
      // TODO: on v6 target should be given explicitly & remove the {target: 'ss-target'} case
      config.target = getElement(config.target) || document.body;

      // TODO: v6 Only for backwards compatibility reasons. Use rootMargin only
      config.rootMargin = config.offset ? "".concat(config.offset, "px 0px -30%") : config.rootMargin;
      if (typeof config.threshold === 'string') {
        config.threshold = config.threshold.split(',').map(function (value) {
          return Number.parseFloat(value);
        });
      }
      return config;
    }
  }, {
    key: "_maybeEnableSmoothScroll",
    value: function _maybeEnableSmoothScroll() {
      var _this48 = this;
      if (!this._config.smoothScroll) {
        return;
      }

      // unregister any previous listeners
      EventHandler.off(this._config.target, EVENT_CLICK);
      EventHandler.on(this._config.target, EVENT_CLICK, SELECTOR_TARGET_LINKS, function (event) {
        var observableSection = _this48._observableSections.get(event.target.hash);
        if (observableSection) {
          event.preventDefault();
          var root = _this48._rootElement || window;
          var height = observableSection.offsetTop - _this48._element.offsetTop;
          if (root.scrollTo) {
            root.scrollTo({
              top: height,
              behavior: 'smooth'
            });
            return;
          }

          // Chrome 60 doesn't support `scrollTo`
          root.scrollTop = height;
        }
      });
    }
  }, {
    key: "_getNewObserver",
    value: function _getNewObserver() {
      var _this49 = this;
      var options = {
        root: this._rootElement,
        threshold: this._config.threshold,
        rootMargin: this._config.rootMargin
      };
      return new IntersectionObserver(function (entries) {
        return _this49._observerCallback(entries);
      }, options);
    }

    // The logic of selection
  }, {
    key: "_observerCallback",
    value: function _observerCallback(entries) {
      var _this50 = this;
      var targetElement = function targetElement(entry) {
        return _this50._targetLinks.get("#".concat(entry.target.id));
      };
      var activate = function activate(entry) {
        _this50._previousScrollData.visibleEntryTop = entry.target.offsetTop;
        _this50._process(targetElement(entry));
      };
      var parentScrollTop = (this._rootElement || document.documentElement).scrollTop;
      var userScrollsDown = parentScrollTop >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = parentScrollTop;
      var _iterator24 = _createForOfIteratorHelper(entries),
        _step24;
      try {
        for (_iterator24.s(); !(_step24 = _iterator24.n()).done;) {
          var entry = _step24.value;
          if (!entry.isIntersecting) {
            this._activeTarget = null;
            this._clearActiveClass(targetElement(entry));
            continue;
          }
          var entryIsLowerThanPrevious = entry.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          // if we are scrolling down, pick the bigger offsetTop
          if (userScrollsDown && entryIsLowerThanPrevious) {
            activate(entry);
            // if parent isn't scrolled, let's keep the first visible item, breaking the iteration
            if (!parentScrollTop) {
              return;
            }
            continue;
          }

          // if we are scrolling up, pick the smallest offsetTop
          if (!userScrollsDown && !entryIsLowerThanPrevious) {
            activate(entry);
          }
        }
      } catch (err) {
        _iterator24.e(err);
      } finally {
        _iterator24.f();
      }
    }
  }, {
    key: "_initializeTargetsAndObservables",
    value: function _initializeTargetsAndObservables() {
      this._targetLinks = new Map();
      this._observableSections = new Map();
      var targetLinks = SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target);
      var _iterator25 = _createForOfIteratorHelper(targetLinks),
        _step25;
      try {
        for (_iterator25.s(); !(_step25 = _iterator25.n()).done;) {
          var anchor = _step25.value;
          // ensure that the anchor has an id and is not disabled
          if (!anchor.hash || isDisabled(anchor)) {
            continue;
          }
          var observableSection = SelectorEngine.findOne(anchor.hash, this._element);

          // ensure that the observableSection exists & is visible
          if (isVisible(observableSection)) {
            this._targetLinks.set(anchor.hash, anchor);
            this._observableSections.set(anchor.hash, observableSection);
          }
        }
      } catch (err) {
        _iterator25.e(err);
      } finally {
        _iterator25.f();
      }
    }
  }, {
    key: "_process",
    value: function _process(target) {
      if (this._activeTarget === target) {
        return;
      }
      this._clearActiveClass(this._config.target);
      this._activeTarget = target;
      target.classList.add(CLASS_NAME_ACTIVE$1);
      this._activateParents(target);
      EventHandler.trigger(this._element, EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
  }, {
    key: "_activateParents",
    value: function _activateParents(target) {
      // Activate dropdown parents
      if (target.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
        SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, target.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);
        return;
      }
      var _iterator26 = _createForOfIteratorHelper(SelectorEngine.parents(target, SELECTOR_NAV_LIST_GROUP)),
        _step26;
      try {
        for (_iterator26.s(); !(_step26 = _iterator26.n()).done;) {
          var listGroup = _step26.value;
          // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
          var _iterator27 = _createForOfIteratorHelper(SelectorEngine.prev(listGroup, SELECTOR_LINK_ITEMS)),
            _step27;
          try {
            for (_iterator27.s(); !(_step27 = _iterator27.n()).done;) {
              var item = _step27.value;
              item.classList.add(CLASS_NAME_ACTIVE$1);
            }
          } catch (err) {
            _iterator27.e(err);
          } finally {
            _iterator27.f();
          }
        }
      } catch (err) {
        _iterator26.e(err);
      } finally {
        _iterator26.f();
      }
    }
  }, {
    key: "_clearActiveClass",
    value: function _clearActiveClass(parent) {
      parent.classList.remove(CLASS_NAME_ACTIVE$1);
      var activeNodes = SelectorEngine.find("".concat(SELECTOR_TARGET_LINKS, ".").concat(CLASS_NAME_ACTIVE$1), parent);
      var _iterator28 = _createForOfIteratorHelper(activeNodes),
        _step28;
      try {
        for (_iterator28.s(); !(_step28 = _iterator28.n()).done;) {
          var node = _step28.value;
          node.classList.remove(CLASS_NAME_ACTIVE$1);
        }
      } catch (err) {
        _iterator28.e(err);
      } finally {
        _iterator28.f();
      }
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default$1;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType$1;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME$2;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = ScrollSpy.getOrCreateInstance(this, config);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config]();
      });
    }
  }]);
  return ScrollSpy;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(window, EVENT_LOAD_DATA_API$1, function () {
  var _iterator29 = _createForOfIteratorHelper(SelectorEngine.find(SELECTOR_DATA_SPY)),
    _step29;
  try {
    for (_iterator29.s(); !(_step29 = _iterator29.n()).done;) {
      var spy = _step29.value;
      ScrollSpy.getOrCreateInstance(spy);
    }
  } catch (err) {
    _iterator29.e(err);
  } finally {
    _iterator29.f();
  }
});

/**
 * jQuery
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME$1 = 'tab';
var DATA_KEY$1 = 'bs.tab';
var EVENT_KEY$1 = ".".concat(DATA_KEY$1);
var EVENT_HIDE$1 = "hide".concat(EVENT_KEY$1);
var EVENT_HIDDEN$1 = "hidden".concat(EVENT_KEY$1);
var EVENT_SHOW$1 = "show".concat(EVENT_KEY$1);
var EVENT_SHOWN$1 = "shown".concat(EVENT_KEY$1);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY$1);
var EVENT_KEYDOWN = "keydown".concat(EVENT_KEY$1);
var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY$1);
var ARROW_LEFT_KEY = 'ArrowLeft';
var ARROW_RIGHT_KEY = 'ArrowRight';
var ARROW_UP_KEY = 'ArrowUp';
var ARROW_DOWN_KEY = 'ArrowDown';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_FADE$1 = 'fade';
var CLASS_NAME_SHOW$1 = 'show';
var CLASS_DROPDOWN = 'dropdown';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var SELECTOR_DROPDOWN_MENU = '.dropdown-menu';
var NOT_SELECTOR_DROPDOWN_TOGGLE = ':not(.dropdown-toggle)';
var SELECTOR_TAB_PANEL = '.list-group, .nav, [role="tablist"]';
var SELECTOR_OUTER = '.nav-item, .list-group-item';
var SELECTOR_INNER = ".nav-link".concat(NOT_SELECTOR_DROPDOWN_TOGGLE, ", .list-group-item").concat(NOT_SELECTOR_DROPDOWN_TOGGLE, ", [role=\"tab\"]").concat(NOT_SELECTOR_DROPDOWN_TOGGLE);
var SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'; // TODO: could only be `tab` in v6
var SELECTOR_INNER_ELEM = "".concat(SELECTOR_INNER, ", ").concat(SELECTOR_DATA_TOGGLE);
var SELECTOR_DATA_TOGGLE_ACTIVE = ".".concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"tab\"], .").concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"pill\"], .").concat(CLASS_NAME_ACTIVE, "[data-bs-toggle=\"list\"]");

/**
 * Class definition
 */
var Tab = /*#__PURE__*/function (_BaseComponent10) {
  _inherits(Tab, _BaseComponent10);
  var _super16 = _createSuper(Tab);
  function Tab(element) {
    var _this51;
    _classCallCheck(this, Tab);
    _this51 = _super16.call(this, element);
    _this51._parent = _this51._element.closest(SELECTOR_TAB_PANEL);
    if (!_this51._parent) {
      return _possibleConstructorReturn(_this51);
      // TODO: should throw exception in v6
      // throw new TypeError(`${element.outerHTML} has not a valid parent ${SELECTOR_INNER_ELEM}`)
    }

    // Set up initial aria attributes
    _this51._setInitialAttributes(_this51._parent, _this51._getChildren());
    EventHandler.on(_this51._element, EVENT_KEYDOWN, function (event) {
      return _this51._keydown(event);
    });
    return _this51;
  }

  // Getters
  _createClass(Tab, [{
    key: "show",
    value:
    // Public
    function show() {
      // Shows this elem and deactivate the active sibling if exists
      var innerElem = this._element;
      if (this._elemIsActive(innerElem)) {
        return;
      }

      // Search for active tab on same parent to deactivate it
      var active = this._getActiveElem();
      var hideEvent = active ? EventHandler.trigger(active, EVENT_HIDE$1, {
        relatedTarget: innerElem
      }) : null;
      var showEvent = EventHandler.trigger(innerElem, EVENT_SHOW$1, {
        relatedTarget: active
      });
      if (showEvent.defaultPrevented || hideEvent && hideEvent.defaultPrevented) {
        return;
      }
      this._deactivate(active, innerElem);
      this._activate(innerElem, active);
    }

    // Private
  }, {
    key: "_activate",
    value: function _activate(element, relatedElem) {
      var _this52 = this;
      if (!element) {
        return;
      }
      element.classList.add(CLASS_NAME_ACTIVE);
      this._activate(SelectorEngine.getElementFromSelector(element)); // Search and activate/show the proper section

      var complete = function complete() {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.add(CLASS_NAME_SHOW$1);
          return;
        }
        element.removeAttribute('tabindex');
        element.setAttribute('aria-selected', true);
        _this52._toggleDropDown(element, true);
        EventHandler.trigger(element, EVENT_SHOWN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
  }, {
    key: "_deactivate",
    value: function _deactivate(element, relatedElem) {
      var _this53 = this;
      if (!element) {
        return;
      }
      element.classList.remove(CLASS_NAME_ACTIVE);
      element.blur();
      this._deactivate(SelectorEngine.getElementFromSelector(element)); // Search and deactivate the shown section too

      var complete = function complete() {
        if (element.getAttribute('role') !== 'tab') {
          element.classList.remove(CLASS_NAME_SHOW$1);
          return;
        }
        element.setAttribute('aria-selected', false);
        element.setAttribute('tabindex', '-1');
        _this53._toggleDropDown(element, false);
        EventHandler.trigger(element, EVENT_HIDDEN$1, {
          relatedTarget: relatedElem
        });
      };
      this._queueCallback(complete, element, element.classList.contains(CLASS_NAME_FADE$1));
    }
  }, {
    key: "_keydown",
    value: function _keydown(event) {
      if (![ARROW_LEFT_KEY, ARROW_RIGHT_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(event.key)) {
        return;
      }
      event.stopPropagation(); // stopPropagation/preventDefault both added to support up/down keys without scrolling the page
      event.preventDefault();
      var isNext = [ARROW_RIGHT_KEY, ARROW_DOWN_KEY].includes(event.key);
      var nextActiveElement = getNextActiveElement(this._getChildren().filter(function (element) {
        return !isDisabled(element);
      }), event.target, isNext, true);
      if (nextActiveElement) {
        nextActiveElement.focus({
          preventScroll: true
        });
        Tab.getOrCreateInstance(nextActiveElement).show();
      }
    }
  }, {
    key: "_getChildren",
    value: function _getChildren() {
      // collection of inner elements
      return SelectorEngine.find(SELECTOR_INNER_ELEM, this._parent);
    }
  }, {
    key: "_getActiveElem",
    value: function _getActiveElem() {
      var _this54 = this;
      return this._getChildren().find(function (child) {
        return _this54._elemIsActive(child);
      }) || null;
    }
  }, {
    key: "_setInitialAttributes",
    value: function _setInitialAttributes(parent, children) {
      this._setAttributeIfNotExists(parent, 'role', 'tablist');
      var _iterator30 = _createForOfIteratorHelper(children),
        _step30;
      try {
        for (_iterator30.s(); !(_step30 = _iterator30.n()).done;) {
          var child = _step30.value;
          this._setInitialAttributesOnChild(child);
        }
      } catch (err) {
        _iterator30.e(err);
      } finally {
        _iterator30.f();
      }
    }
  }, {
    key: "_setInitialAttributesOnChild",
    value: function _setInitialAttributesOnChild(child) {
      child = this._getInnerElement(child);
      var isActive = this._elemIsActive(child);
      var outerElem = this._getOuterElement(child);
      child.setAttribute('aria-selected', isActive);
      if (outerElem !== child) {
        this._setAttributeIfNotExists(outerElem, 'role', 'presentation');
      }
      if (!isActive) {
        child.setAttribute('tabindex', '-1');
      }
      this._setAttributeIfNotExists(child, 'role', 'tab');

      // set attributes to the related panel too
      this._setInitialAttributesOnTargetPanel(child);
    }
  }, {
    key: "_setInitialAttributesOnTargetPanel",
    value: function _setInitialAttributesOnTargetPanel(child) {
      var target = SelectorEngine.getElementFromSelector(child);
      if (!target) {
        return;
      }
      this._setAttributeIfNotExists(target, 'role', 'tabpanel');
      if (child.id) {
        this._setAttributeIfNotExists(target, 'aria-labelledby', "".concat(child.id));
      }
    }
  }, {
    key: "_toggleDropDown",
    value: function _toggleDropDown(element, open) {
      var outerElem = this._getOuterElement(element);
      if (!outerElem.classList.contains(CLASS_DROPDOWN)) {
        return;
      }
      var toggle = function toggle(selector, className) {
        var element = SelectorEngine.findOne(selector, outerElem);
        if (element) {
          element.classList.toggle(className, open);
        }
      };
      toggle(SELECTOR_DROPDOWN_TOGGLE, CLASS_NAME_ACTIVE);
      toggle(SELECTOR_DROPDOWN_MENU, CLASS_NAME_SHOW$1);
      outerElem.setAttribute('aria-expanded', open);
    }
  }, {
    key: "_setAttributeIfNotExists",
    value: function _setAttributeIfNotExists(element, attribute, value) {
      if (!element.hasAttribute(attribute)) {
        element.setAttribute(attribute, value);
      }
    }
  }, {
    key: "_elemIsActive",
    value: function _elemIsActive(elem) {
      return elem.classList.contains(CLASS_NAME_ACTIVE);
    }

    // Try to get the inner element (usually the .nav-link)
  }, {
    key: "_getInnerElement",
    value: function _getInnerElement(elem) {
      return elem.matches(SELECTOR_INNER_ELEM) ? elem : SelectorEngine.findOne(SELECTOR_INNER_ELEM, elem);
    }

    // Try to get the outer element (usually the .nav-item)
  }, {
    key: "_getOuterElement",
    value: function _getOuterElement(elem) {
      return elem.closest(SELECTOR_OUTER) || elem;
    }

    // Static
  }], [{
    key: "NAME",
    get: function get() {
      return NAME$1;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Tab.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError("No method named \"".concat(config, "\""));
        }
        data[config]();
      });
    }
  }]);
  return Tab;
}(BaseComponent);
/**
 * Data API implementation
 */
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }
  if (isDisabled(this)) {
    return;
  }
  Tab.getOrCreateInstance(this).show();
});

/**
 * Initialize on focus
 */
EventHandler.on(window, EVENT_LOAD_DATA_API, function () {
  var _iterator31 = _createForOfIteratorHelper(SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE)),
    _step31;
  try {
    for (_iterator31.s(); !(_step31 = _iterator31.n()).done;) {
      var element = _step31.value;
      Tab.getOrCreateInstance(element);
    }
  } catch (err) {
    _iterator31.e(err);
  } finally {
    _iterator31.f();
  }
});
/**
 * jQuery
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * Constants
 */

var NAME = 'toast';
var DATA_KEY = 'bs.toast';
var EVENT_KEY = ".".concat(DATA_KEY);
var EVENT_MOUSEOVER = "mouseover".concat(EVENT_KEY);
var EVENT_MOUSEOUT = "mouseout".concat(EVENT_KEY);
var EVENT_FOCUSIN = "focusin".concat(EVENT_KEY);
var EVENT_FOCUSOUT = "focusout".concat(EVENT_KEY);
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default = {
  animation: true,
  autohide: true,
  delay: 5000
};

/**
 * Class definition
 */
var Toast = /*#__PURE__*/function (_BaseComponent11) {
  _inherits(Toast, _BaseComponent11);
  var _super17 = _createSuper(Toast);
  function Toast(element, config) {
    var _this55;
    _classCallCheck(this, Toast);
    _this55 = _super17.call(this, element, config);
    _this55._timeout = null;
    _this55._hasMouseInteraction = false;
    _this55._hasKeyboardInteraction = false;
    _this55._setListeners();
    return _this55;
  }

  // Getters
  _createClass(Toast, [{
    key: "show",
    value:
    // Public
    function show() {
      var _this56 = this;
      var showEvent = EventHandler.trigger(this._element, EVENT_SHOW);
      if (showEvent.defaultPrevented) {
        return;
      }
      this._clearTimeout();
      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }
      var complete = function complete() {
        _this56._element.classList.remove(CLASS_NAME_SHOWING);
        EventHandler.trigger(_this56._element, EVENT_SHOWN);
        _this56._maybeScheduleHide();
      };
      this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated
      reflow(this._element);
      this._element.classList.add(CLASS_NAME_SHOW, CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this57 = this;
      if (!this.isShown()) {
        return;
      }
      var hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);
      if (hideEvent.defaultPrevented) {
        return;
      }
      var complete = function complete() {
        _this57._element.classList.add(CLASS_NAME_HIDE); // @deprecated
        _this57._element.classList.remove(CLASS_NAME_SHOWING, CLASS_NAME_SHOW);
        EventHandler.trigger(_this57._element, EVENT_HIDDEN);
      };
      this._element.classList.add(CLASS_NAME_SHOWING);
      this._queueCallback(complete, this._element, this._config.animation);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._clearTimeout();
      if (this.isShown()) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }
      _get(_getPrototypeOf(Toast.prototype), "dispose", this).call(this);
    }
  }, {
    key: "isShown",
    value: function isShown() {
      return this._element.classList.contains(CLASS_NAME_SHOW);
    }

    // Private
  }, {
    key: "_maybeScheduleHide",
    value: function _maybeScheduleHide() {
      var _this58 = this;
      if (!this._config.autohide) {
        return;
      }
      if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
        return;
      }
      this._timeout = setTimeout(function () {
        _this58.hide();
      }, this._config.delay);
    }
  }, {
    key: "_onInteraction",
    value: function _onInteraction(event, isInteracting) {
      switch (event.type) {
        case 'mouseover':
        case 'mouseout':
          {
            this._hasMouseInteraction = isInteracting;
            break;
          }
        case 'focusin':
        case 'focusout':
          {
            this._hasKeyboardInteraction = isInteracting;
            break;
          }
      }
      if (isInteracting) {
        this._clearTimeout();
        return;
      }
      var nextElement = event.relatedTarget;
      if (this._element === nextElement || this._element.contains(nextElement)) {
        return;
      }
      this._maybeScheduleHide();
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this59 = this;
      EventHandler.on(this._element, EVENT_MOUSEOVER, function (event) {
        return _this59._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_MOUSEOUT, function (event) {
        return _this59._onInteraction(event, false);
      });
      EventHandler.on(this._element, EVENT_FOCUSIN, function (event) {
        return _this59._onInteraction(event, true);
      });
      EventHandler.on(this._element, EVENT_FOCUSOUT, function (event) {
        return _this59._onInteraction(event, false);
      });
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    }

    // Static
  }], [{
    key: "Default",
    get: function get() {
      return Default;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }, {
    key: "jQueryInterface",
    value: function jQueryInterface(config) {
      return this.each(function () {
        var data = Toast.getOrCreateInstance(this, config);
        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }
          data[config](this);
        }
      });
    }
  }]);
  return Toast;
}(BaseComponent);
/**
 * Data API implementation
 */
enableDismissTrigger(Toast);

/**
 * jQuery
 */

defineJQueryPlugin(Toast);

/* global unsafeWindow, globalThis */

var global$1 = typeof unsafeWindow !== 'undefined' ? unsafeWindow : typeof globalThis !== 'undefined' ? globalThis : window;
var document$1 = global$1.document;
  global$1.JSON;
var RE_NUMERIC = /^-?(?:[\d]+\.)?\d+$/;
var isPlainObject = function isPlainObject(param) {
    return param instanceof Object && Object.getPrototypeOf(param) === Object.prototype;
  },
  isUndef = function isUndef(param) {
    return typeof param === 'undefined';
  },
  isString = function isString(param) {
    return typeof param === 'string';
  },
  isNumber = function isNumber(param) {
    return typeof param === 'number';
  },
  isInt = function isInt(param) {
    return Number.isInteger(param);
  },
  isFloat = function isFloat(param) {
    return isNumber(param) && parseFloat(param) === param;
  },
  isNumeric = function isNumeric(param) {
    return isInt(param) || isFloat(param) || RE_NUMERIC.test(param);
  },
  isNull = function isNull(param) {
    return param === null;
  },
  isCallable = function isCallable(param) {
    return typeof param === 'function';
  },
  isFunction = isCallable;
function runAsync(callback) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  if (isFunction(callback)) {
    setTimeout(function () {
      callback.apply(void 0, args);
    }, 0);
  }
}

/**
 * Creates an Element
 *
 * @param {string} tagName
 * @param {Object} [attributes]
 * @param {string} [innerHTML]
 * @returns {HTMLElement}
 */
function createElement() {
  var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var innerHTML = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (isString(attributes)) {
    innerHTML = attributes;
    attributes = null;
  }
  attributes = isPlainObject(attributes) ? attributes : {};
  var elem = document$1.createElement(tagName),
    props = Object.keys(attributes),
    prop;
  for (var i = 0; i < props.length; i++) {
    prop = props[i];
    if (prop === 'html') {
      innerHTML = attributes[prop];
      continue;
    }
    if (/^data(set)?$/.test(prop) && isPlainObject(attributes[prop])) {
      Object.keys(attributes[prop]).forEach(function (key) {
        elem.dataset[key] = attributes[prop][key];
      });
    } else if (typeof attributes[prop] !== 'string') {
      elem[prop] = attributes[prop];
      continue;
    } else {
      elem.setAttribute(prop, attributes[prop]);
    }
  }
  if (innerHTML.length > 0) {
    elem.innerHTML = innerHTML;
  }
  return elem;
}

var _listeners = /*#__PURE__*/new WeakMap();
var _useasync = /*#__PURE__*/new WeakMap();
var EventManager = /*#__PURE__*/function () {
  function EventManager() {
    var useasync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    _classCallCheck(this, EventManager);
    _classPrivateFieldInitSpec(this, _listeners, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _useasync, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldSet(this, _listeners, []);
    _classPrivateFieldSet(this, _useasync, useasync);
  }
  _createClass(EventManager, [{
    key: "getListenersForEvent",
    value: function getListenersForEvent(type) {
      if (!isString(type) || type.includes(' ')) {
        throw new TypeError('Invalid event type, not a String or contains spaces.');
      }
      return _classPrivateFieldGet(this, _listeners).filter(function (item) {
        return item.type === type;
      }).map(function (item) {
        return item.listener;
      });
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      var _this = this;
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!isString(type)) {
        throw new TypeError('Invalid event type, not a String.');
      }
      if (!isFunction(listener)) {
        throw new TypeError('Invalid listener, not a function');
      }
      type.split(/\s+/).forEach(function (type) {
        _classPrivateFieldGet(_this, _listeners).push({
          type: type,
          listener: listener,
          once: once === true
        });
      });
      return this;
    }
  }, {
    key: "one",
    value: function one(type, listener) {
      return this.on(type, listener, true);
    }
  }, {
    key: "off",
    value: function off(type, listener) {
      var _this2 = this;
      if (!isString(type)) {
        throw new TypeError('Invalid event type, not a String.');
      }
      type.split(/\s+/).forEach(function (type) {
        _classPrivateFieldSet(_this2, _listeners, _classPrivateFieldGet(_this2, _listeners).filter(function (item) {
          if (type === item.type) {
            if (listener === item.listener || !listener) {
              return false;
            }
          }
          return true;
        }));
      });
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      var _this3 = this;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var event;
      if (type instanceof Event) {
        var _event, _event$data;
        event = type;
        (_event$data = (_event = event).data) !== null && _event$data !== void 0 ? _event$data : _event.data = data;
        type = event.type;
      }
      if (!isString(type) && type instanceof Event === false) {
        throw new TypeError('Invalid event type, not a String|Event.');
      }
      var listeners = Array.from(_classPrivateFieldGet(this, _listeners)),
        types = [];
      type.split(/\s+/).forEach(function (type) {
        if (types.includes(type)) {
          return;
        }
        types.push(type);
        for (var _i = 0, _listeners2 = listeners; _i < _listeners2.length; _i++) {
          var item = _listeners2[_i];
          if (item.type === type) {
            if (_classPrivateFieldGet(_this3, _useasync)) {
              var _event2;
              runAsync(item.listener, (_event2 = event) !== null && _event2 !== void 0 ? _event2 : {
                type: type,
                data: data
              });
            } else {
              var _event3;
              item.listener((_event3 = event) !== null && _event3 !== void 0 ? _event3 : {
                type: type,
                data: data
              });
            }
            if (item.once) {
              _this3.off(type, item.listener);
            }
          }
        }
      });
      return this;
    }
  }, {
    key: "mixin",
    value: function mixin(binding) {
      var _this4 = this;
      if (binding instanceof Object) {
        ['on', 'off', 'one', 'trigger'].forEach(function (method) {
          Object.defineProperty(binding, method, {
            enumerable: false,
            configurable: true,
            value: function value() {
              _this4[method].apply(_this4, arguments);
              return binding;
            }
          });
        });
      }
      return this;
    }
  }], [{
    key: "mixin",
    value: function mixin(binding) {
      var useasync = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new EventManager(useasync).mixin(binding);
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      var _classStaticPrivateFi;
      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(this, EventManager, _events)) !== null && _classStaticPrivateFi !== void 0 ? _classStaticPrivateFi : _classStaticPrivateFieldSpecSet(this, EventManager, _events, new EventManager());
      return _classStaticPrivateFieldSpecGet(this, EventManager, _events).on(type, listener, once);
    }
  }, {
    key: "one",
    value: function one(type, listener) {
      var _classStaticPrivateFi2;
      (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(this, EventManager, _events)) !== null && _classStaticPrivateFi2 !== void 0 ? _classStaticPrivateFi2 : _classStaticPrivateFieldSpecSet(this, EventManager, _events, new EventManager());
      return _classStaticPrivateFieldSpecGet(this, EventManager, _events).one(type, listener);
    }
  }, {
    key: "off",
    value: function off(type, listener) {
      var _classStaticPrivateFi3;
      (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(this, EventManager, _events)) !== null && _classStaticPrivateFi3 !== void 0 ? _classStaticPrivateFi3 : _classStaticPrivateFieldSpecSet(this, EventManager, _events, new EventManager());
      return _classStaticPrivateFieldSpecGet(this, EventManager, _events).off(type, listener);
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      var _classStaticPrivateFi4;
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(this, EventManager, _events)) !== null && _classStaticPrivateFi4 !== void 0 ? _classStaticPrivateFi4 : _classStaticPrivateFieldSpecSet(this, EventManager, _events, new EventManager());
      return _classStaticPrivateFieldSpecGet(this, EventManager, _events).trigger(type, data);
    }
  }]);
  return EventManager;
}();
var _events = {
  writable: true,
  value: void 0
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (!css || typeof document === 'undefined') {
    return;
  }
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".noscroll {\n    position: fixed !important;\n    overflow-y: hidden !important;\n    width: 100% !important;\n    z-index: -1 !important;\n}\n\n.scrollback {\n    scroll-behavior: auto !important;\n}";
styleInject(css_248z$1);

var _document$1 = document,
  documentElement = _document$1.documentElement;
var NoScroll = /*#__PURE__*/function () {
  function NoScroll() {
    _classCallCheck(this, NoScroll);
  }
  _createClass(NoScroll, null, [{
    key: "enabled",
    get: function get() {
      return documentElement.classList.contains('noscroll');
    }
  }, {
    key: "enable",
    value: function () {
      var _enable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var savePosition,
          pos,
          _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              savePosition = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
              if (!this.enabled) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return", true);
            case 3:
              pos = Math.max(0, documentElement.scrollTop);
              _classStaticPrivateFieldSpecSet(this, NoScroll, _scrollTop, pos);
              if (savePosition) {
                _classStaticPrivateMethodGet(this, NoScroll, _getStylesheet).call(this).innerHTML = "html.noscroll{top:-".concat(pos, "px;}");
              }
              documentElement.classList.add('noscroll');
              this.trigger('enabled');
              return _context.abrupt("return", true);
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function enable() {
        return _enable.apply(this, arguments);
      }
      return enable;
    }()
  }, {
    key: "disable",
    value: function () {
      var _disable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var savePosition,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              savePosition = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
              if (this.enabled) {
                _context2.next = 3;
                break;
              }
              return _context2.abrupt("return", true);
            case 3:
              documentElement.classList.remove('noscroll');
              if (_classStaticPrivateFieldSpecGet(this, NoScroll, _scrollTop) > 0 && savePosition) {
                documentElement.classList.add('scrollback');
                documentElement.scrollTo(0, _classStaticPrivateFieldSpecGet(this, NoScroll, _scrollTop));
                documentElement.classList.remove('scrollback');
              }
              this.trigger('disabled');
              return _context2.abrupt("return", true);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function disable() {
        return _disable.apply(this, arguments);
      }
      return disable;
    }()
  }]);
  return NoScroll;
}();
function _getStylesheet() {
  if (!_classStaticPrivateFieldSpecGet(this, NoScroll, _stylesheet)) {
    _classStaticPrivateFieldSpecSet(this, NoScroll, _stylesheet, createElement('style', {
      type: 'text/css',
      id: 'no-scroll-component'
    }));
    document.getElementsByTagName('head')[0].appendChild(_classStaticPrivateFieldSpecGet(this, NoScroll, _stylesheet));
  }
  return _classStaticPrivateFieldSpecGet(this, NoScroll, _stylesheet);
}
var _scrollTop = {
  writable: true,
  value: 0
};
var _stylesheet = {
  writable: true,
  value: void 0
};
EventManager.mixin(NoScroll);

function t() {
  return t = Object.assign ? Object.assign.bind() : function (t) {
    for (var s = 1; s < arguments.length; s++) {
      var e = arguments[s];
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
  }, t.apply(this, arguments);
}
var s = {
    strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
    stringsElement: null,
    typeSpeed: 0,
    startDelay: 0,
    backSpeed: 0,
    smartBackspace: !0,
    shuffle: !1,
    backDelay: 700,
    fadeOut: !1,
    fadeOutClass: "typed-fade-out",
    fadeOutDelay: 500,
    loop: !1,
    loopCount: Infinity,
    showCursor: !0,
    cursorChar: "|",
    autoInsertCss: !0,
    attr: null,
    bindInputFocusEvents: !1,
    contentType: "html",
    onBegin: function onBegin(t) {},
    onComplete: function onComplete(t) {},
    preStringTyped: function preStringTyped(t, s) {},
    onStringTyped: function onStringTyped(t, s) {},
    onLastStringBackspaced: function onLastStringBackspaced(t) {},
    onTypingPaused: function onTypingPaused(t, s) {},
    onTypingResumed: function onTypingResumed(t, s) {},
    onReset: function onReset(t) {},
    onStop: function onStop(t, s) {},
    onStart: function onStart(t, s) {},
    onDestroy: function onDestroy(t) {}
  },
  e = new ( /*#__PURE__*/function () {
    function e() {}
    var n = e.prototype;
    return n.load = function (e, n, i) {
      if (e.el = "string" == typeof i ? document.querySelector(i) : i, e.options = t({}, s, n), e.isInput = "input" === e.el.tagName.toLowerCase(), e.attr = e.options.attr, e.bindInputFocusEvents = e.options.bindInputFocusEvents, e.showCursor = !e.isInput && e.options.showCursor, e.cursorChar = e.options.cursorChar, e.cursorBlinking = !0, e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent, e.contentType = e.options.contentType, e.typeSpeed = e.options.typeSpeed, e.startDelay = e.options.startDelay, e.backSpeed = e.options.backSpeed, e.smartBackspace = e.options.smartBackspace, e.backDelay = e.options.backDelay, e.fadeOut = e.options.fadeOut, e.fadeOutClass = e.options.fadeOutClass, e.fadeOutDelay = e.options.fadeOutDelay, e.isPaused = !1, e.strings = e.options.strings.map(function (t) {
        return t.trim();
      }), e.stringsElement = "string" == typeof e.options.stringsElement ? document.querySelector(e.options.stringsElement) : e.options.stringsElement, e.stringsElement) {
        e.strings = [], e.stringsElement.style.cssText = "clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";
        var r = Array.prototype.slice.apply(e.stringsElement.children),
          o = r.length;
        if (o) for (var a = 0; a < o; a += 1) e.strings.push(r[a].innerHTML.trim());
      }
      for (var u in e.strPos = 0, e.currentElContent = this.getCurrentElContent(e), e.currentElContent && e.currentElContent.length > 0 && (e.strPos = e.currentElContent.length - 1, e.strings.unshift(e.currentElContent)), e.sequence = [], e.strings) e.sequence[u] = u;
      e.arrayPos = 0, e.stopNum = 0, e.loop = e.options.loop, e.loopCount = e.options.loopCount, e.curLoop = 0, e.shuffle = e.options.shuffle, e.pause = {
        status: !1,
        typewrite: !0,
        curString: "",
        curStrPos: 0
      }, e.typingComplete = !1, e.autoInsertCss = e.options.autoInsertCss, e.autoInsertCss && (this.appendCursorAnimationCss(e), this.appendFadeOutAnimationCss(e));
    }, n.getCurrentElContent = function (t) {
      return t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent;
    }, n.appendCursorAnimationCss = function (t) {
      var s = "data-typed-js-cursor-css";
      if (t.showCursor && !document.querySelector("[" + s + "]")) {
        var e = document.createElement("style");
        e.setAttribute(s, "true"), e.innerHTML = "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ", document.body.appendChild(e);
      }
    }, n.appendFadeOutAnimationCss = function (t) {
      var s = "data-typed-fadeout-js-css";
      if (t.fadeOut && !document.querySelector("[" + s + "]")) {
        var e = document.createElement("style");
        e.setAttribute(s, "true"), e.innerHTML = "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ", document.body.appendChild(e);
      }
    }, e;
  }())(),
  n = new ( /*#__PURE__*/function () {
    function t() {}
    var s = t.prototype;
    return s.typeHtmlChars = function (t, s, e) {
      if ("html" !== e.contentType) return s;
      var n = t.substring(s).charAt(0);
      if ("<" === n || "&" === n) {
        var i;
        for (i = "<" === n ? ">" : ";"; t.substring(s + 1).charAt(0) !== i && !(1 + ++s > t.length););
        s++;
      }
      return s;
    }, s.backSpaceHtmlChars = function (t, s, e) {
      if ("html" !== e.contentType) return s;
      var n = t.substring(s).charAt(0);
      if (">" === n || ";" === n) {
        var i;
        for (i = ">" === n ? "<" : "&"; t.substring(s - 1).charAt(0) !== i && !(--s < 0););
        s--;
      }
      return s;
    }, t;
  }())(),
  i = /*#__PURE__*/function () {
    function t(t, s) {
      e.load(this, s, t), this.begin();
    }
    var s = t.prototype;
    return s.toggle = function () {
      this.pause.status ? this.start() : this.stop();
    }, s.stop = function () {
      this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this));
    }, s.start = function () {
      this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this));
    }, s.destroy = function () {
      this.reset(!1), this.options.onDestroy(this);
    }, s.reset = function (t) {
      void 0 === t && (t = !0), clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, t && (this.insertCursor(), this.options.onReset(this), this.begin());
    }, s.begin = function () {
      var t = this;
      this.options.onBegin(this), this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout(function () {
        0 === t.strPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos) : t.backspace(t.strings[t.sequence[t.arrayPos]], t.strPos);
      }, this.startDelay);
    }, s.typewrite = function (t, s) {
      var e = this;
      this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
      var i = this.humanizer(this.typeSpeed),
        r = 1;
      !0 !== this.pause.status ? this.timeout = setTimeout(function () {
        s = n.typeHtmlChars(t, s, e);
        var i = 0,
          o = t.substring(s);
        if ("^" === o.charAt(0) && /^\^\d+/.test(o)) {
          var a = 1;
          a += (o = /\d+/.exec(o)[0]).length, i = parseInt(o), e.temporaryPause = !0, e.options.onTypingPaused(e.arrayPos, e), t = t.substring(0, s) + t.substring(s + a), e.toggleBlinking(!0);
        }
        if ("`" === o.charAt(0)) {
          for (; "`" !== t.substring(s + r).charAt(0) && (r++, !(s + r > t.length)););
          var u = t.substring(0, s),
            p = t.substring(u.length + 1, s + r),
            c = t.substring(s + r + 1);
          t = u + p + c, r--;
        }
        e.timeout = setTimeout(function () {
          e.toggleBlinking(!1), s >= t.length ? e.doneTyping(t, s) : e.keepTyping(t, s, r), e.temporaryPause && (e.temporaryPause = !1, e.options.onTypingResumed(e.arrayPos, e));
        }, i);
      }, i) : this.setPauseStatus(t, s, !0);
    }, s.keepTyping = function (t, s, e) {
      0 === s && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this));
      var n = t.substring(0, s += e);
      this.replaceText(n), this.typewrite(t, s);
    }, s.doneTyping = function (t, s) {
      var e = this;
      this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), !1 === this.loop || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function () {
        e.backspace(t, s);
      }, this.backDelay));
    }, s.backspace = function (t, s) {
      var e = this;
      if (!0 !== this.pause.status) {
        if (this.fadeOut) return this.initFadeOut();
        this.toggleBlinking(!1);
        var i = this.humanizer(this.backSpeed);
        this.timeout = setTimeout(function () {
          s = n.backSpaceHtmlChars(t, s, e);
          var i = t.substring(0, s);
          if (e.replaceText(i), e.smartBackspace) {
            var r = e.strings[e.arrayPos + 1];
            e.stopNum = r && i === r.substring(0, s) ? s : 0;
          }
          s > e.stopNum ? (s--, e.backspace(t, s)) : s <= e.stopNum && (e.arrayPos++, e.arrayPos === e.strings.length ? (e.arrayPos = 0, e.options.onLastStringBackspaced(), e.shuffleStringsIfNeeded(), e.begin()) : e.typewrite(e.strings[e.sequence[e.arrayPos]], s));
        }, i);
      } else this.setPauseStatus(t, s, !1);
    }, s.complete = function () {
      this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0;
    }, s.setPauseStatus = function (t, s, e) {
      this.pause.typewrite = e, this.pause.curString = t, this.pause.curStrPos = s;
    }, s.toggleBlinking = function (t) {
      this.cursor && (this.pause.status || this.cursorBlinking !== t && (this.cursorBlinking = t, t ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink")));
    }, s.humanizer = function (t) {
      return Math.round(Math.random() * t / 2) + t;
    }, s.shuffleStringsIfNeeded = function () {
      this.shuffle && (this.sequence = this.sequence.sort(function () {
        return Math.random() - .5;
      }));
    }, s.initFadeOut = function () {
      var t = this;
      return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout(function () {
        t.arrayPos++, t.replaceText(""), t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0), t.arrayPos = 0);
      }, this.fadeOutDelay);
    }, s.replaceText = function (t) {
      this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t;
    }, s.bindFocusEvents = function () {
      var t = this;
      this.isInput && (this.el.addEventListener("focus", function (s) {
        t.stop();
      }), this.el.addEventListener("blur", function (s) {
        t.el.value && 0 !== t.el.value.length || t.start();
      }));
    }, s.insertCursor = function () {
      this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.setAttribute("aria-hidden", !0), this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)));
    }, t;
  }();

var _ref = typeof globalThis !== 'undefined' ? globalThis : window,
  JSON$1 = _ref.JSON;
var api;
if (typeof document !== "undefined" && document.head && document.head.dataset) {
  api = {
    set: function set(node, attr, value) {
      if (isUndef(value) || isNull(value)) {
        return this.remove(node, attr);
      }
      node.dataset[attr] = encode(value);
    },
    get: function get(node, attr) {
      return decode(node.dataset[attr]);
    },
    remove: function remove(node, attr) {
      delete node.dataset[attr];
    }
  };
} else {
  api = {
    set: function set(node, attr, value) {
      if (isUndef(value) || isNull(value)) {
        return this.remove(node, attr);
      }
      node.setAttribute('data-' + toDashed(attr), encode(value));
    },
    get: function get(node, attr) {
      return decode(node.getAttribute('data-' + toDashed(attr)));
    },
    remove: function remove(node, attr) {
      node.removeAttribute('data-' + toDashed(attr));
    }
  };
}
function toDashed(name) {
  return name.replace(/([A-Z])/g, function (u) {
    return "-" + u.toLowerCase();
  });
}
function getElem(elem) {
  if (isString(elem)) {
    elem = document.querySelectorAll(elem);
    if (elem.length === 1) {
      elem = elem[0];
    }
  }
  return elem;
}
function decode(value) {
  //unification
  if (isUndef(value) || isNull(value) || value === '') {
    return null;
  }
  if (value.startsWith('{') && value.endsWith('}') || value.startsWith('[') && value.endsWith(']') || isNumeric(value) || value === 'true' || value === 'false') {
    return JSON$1.parse(value);
  }
  return value;
}
function encode(value) {
  if (!isString(value)) {
    return JSON$1.stringify(value);
  }
  return value;
}

/**
 * data-attribute reader/setter
 * @param {Node|NodeList|String} elem 
 * @param {String} attr 
 * @param {Any} [value]
 */
function dataset(elem, attr, value) {
  elem = getElem(elem);
  var $this = {
    get: function get(attr) {
      if (elem instanceof NodeList) {
        elem = elem[0];
      }
      if (elem instanceof HTMLElement) {
        return api.get(elem, attr);
      }
      return null;
    },
    set: function set(attr, value) {
      if (elem instanceof NodeList) {
        elem.forEach(function (el) {
          api.set(el, attr, value);
        });
      } else if (elem instanceof HTMLElement) {
        api.set(elem, attr, value);
      }
      return $this;
    },
    remove: function remove(attr) {
      if (elem instanceof NodeList) {
        elem.forEach(function (el) {
          api.remove(el, attr);
        });
      } else if (elem instanceof HTMLElement) {
        api.remove(elem, attr);
      }
      return $this;
    }
  };
  switch (arguments.length) {
    case 2:
      return $this.get(attr);
    case 3:
      return $this.set(attr, value);
  }
  return $this;
}

var css_248z = ".iziToast-wrapper-bottomRight {\n    top: 40% !important;\n    bottom: auto !important;\n}";
styleInject(css_248z);

/*
* iziToast | v1.4.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory(root));
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.iziToast = factory(root);
  }
})(typeof global !== 'undefined' ? global : window || globalThis.window || globalThis.global, function (root) {

  //
  // Variables
  //
  var $iziToast = {},
    PLUGIN_NAME = 'iziToast';
    document.querySelector('body');
    var ISMOBILE = /Mobi/.test(navigator.userAgent) ? true : false,
    ISCHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    ISFIREFOX = typeof InstallTrigger !== 'undefined',
    ACCEPTSTOUCH = ('ontouchstart' in document.documentElement),
    POSITIONS = ['bottomRight', 'bottomLeft', 'bottomCenter', 'topRight', 'topLeft', 'topCenter', 'center'],
    THEMES = {
      info: {
        color: 'blue',
        icon: 'ico-info'
      },
      success: {
        color: 'green',
        icon: 'ico-success'
      },
      warning: {
        color: 'orange',
        icon: 'ico-warning'
      },
      error: {
        color: 'red',
        icon: 'ico-error'
      },
      question: {
        color: 'yellow',
        icon: 'ico-question'
      }
    },
    MOBILEWIDTH = 568,
    CONFIG = {};
  $iziToast.children = {};

  // Default settings
  var defaults = {
    id: null,
    class: '',
    title: '',
    titleColor: '',
    titleSize: '',
    titleLineHeight: '',
    message: '',
    messageColor: '',
    messageSize: '',
    messageLineHeight: '',
    backgroundColor: '',
    theme: 'light',
    // dark
    color: '',
    // blue, red, green, yellow
    icon: '',
    iconText: '',
    iconColor: '',
    iconUrl: null,
    image: '',
    imageWidth: 50,
    maxWidth: null,
    zindex: null,
    layout: 1,
    balloon: false,
    close: true,
    closeOnEscape: false,
    closeOnClick: false,
    displayMode: 0,
    position: 'bottomRight',
    // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    target: '',
    targetFirst: true,
    timeout: 5000,
    rtl: false,
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: '',
    progressBarEasing: 'linear',
    overlay: false,
    overlayClose: false,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    transitionIn: 'fadeInUp',
    // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
    transitionOut: 'fadeOut',
    // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
    transitionInMobile: 'fadeInUp',
    transitionOutMobile: 'fadeOutDown',
    buttons: {},
    inputs: {},
    onOpening: function onOpening() {},
    onOpened: function onOpened() {},
    onClosing: function onClosing() {},
    onClosed: function onClosed() {}
  };

  //
  // Methods
  //

  /**
   * Polyfill for remove() method
   */
  if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }

  /*
      * Polyfill for CustomEvent for IE >= 9
      * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
      */
  if (typeof window.CustomEvent !== 'function') {
    var CustomEventPolyfill = function CustomEventPolyfill(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEventPolyfill.prototype = window.Event.prototype;
    window.CustomEvent = CustomEventPolyfill;
  }

  /**
   * A simple forEach() implementation for Arrays, Objects and NodeLists
   * @private
   * @param {Array|Object|NodeList} collection Collection of items to iterate
   * @param {Function} callback Callback function for each iteration
   * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
   */
  var forEach = function forEach(collection, callback, scope) {
    if (Object.prototype.toString.call(collection) === '[object Object]') {
      for (var prop in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, prop)) {
          callback.call(scope, collection[prop], prop, collection);
        }
      }
    } else {
      if (collection) {
        for (var i = 0, len = collection.length; i < len; i++) {
          callback.call(scope, collection[i], i, collection);
        }
      }
    }
  };

  /**
   * Merge defaults with user options
   * @private
   * @param {Object} defaults Default settings
   * @param {Object} options User options
   * @returns {Object} Merged values of defaults and options
   */
  var extend = function extend(defaults, options) {
    var extended = {};
    forEach(defaults, function (value, prop) {
      extended[prop] = defaults[prop];
    });
    forEach(options, function (value, prop) {
      extended[prop] = options[prop];
    });
    return extended;
  };

  /**
   * Create a fragment DOM elements
   * @private
   */
  var createFragElem = function createFragElem(htmlStr) {
    var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  };

  /**
   * Generate new ID
   * @private
   */
  var generateId = function generateId(params) {
    var newId = btoa(encodeURIComponent(params));
    return newId.replace(/=/g, "");
  };

  /**
   * Check if is a color
   * @private
   */
  var isColor = function isColor(color) {
    if (color.substring(0, 1) == '#' || color.substring(0, 3) == 'rgb' || color.substring(0, 3) == 'hsl') {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Check if is a Base64 string
   * @private
   */
  var isBase64 = function isBase64(str) {
    try {
      return btoa(atob(str)) == str;
    } catch (err) {
      return false;
    }
  };

  /**
   * Drag method of toasts
   * @private
   */
  var drag = function () {
    return {
      move: function move(toast, instance, settings, xpos) {
        var opacity,
          opacityRange = 0.3,
          distance = 180;
        if (xpos !== 0) {
          toast.classList.add(PLUGIN_NAME + '-dragged');
          toast.style.transform = 'translateX(' + xpos + 'px)';
          if (xpos > 0) {
            opacity = (distance - xpos) / distance;
            if (opacity < opacityRange) {
              instance.hide(extend(settings, {
                transitionOut: 'fadeOutRight',
                transitionOutMobile: 'fadeOutRight'
              }), toast, 'drag');
            }
          } else {
            opacity = (distance + xpos) / distance;
            if (opacity < opacityRange) {
              instance.hide(extend(settings, {
                transitionOut: 'fadeOutLeft',
                transitionOutMobile: 'fadeOutLeft'
              }), toast, 'drag');
            }
          }
          toast.style.opacity = opacity;
          if (opacity < opacityRange) {
            if (ISCHROME || ISFIREFOX) toast.style.left = xpos + 'px';
            toast.parentNode.style.opacity = opacityRange;
            this.stopMoving(toast, null);
          }
        }
      },
      startMoving: function startMoving(toast, instance, settings, e) {
        e = e || window.event;
        var posX = ACCEPTSTOUCH ? e.touches[0].clientX : e.clientX,
          toastLeft = toast.style.transform.replace('px)', '');
        toastLeft = toastLeft.replace('translateX(', '');
        var offsetX = posX - toastLeft;
        if (settings.transitionIn) {
          toast.classList.remove(settings.transitionIn);
        }
        if (settings.transitionInMobile) {
          toast.classList.remove(settings.transitionInMobile);
        }
        toast.style.transition = '';
        if (ACCEPTSTOUCH) {
          document.ontouchmove = function (e) {
            e.preventDefault();
            e = e || window.event;
            var posX = e.touches[0].clientX,
              finalX = posX - offsetX;
            drag.move(toast, instance, settings, finalX);
          };
        } else {
          document.onmousemove = function (e) {
            e.preventDefault();
            e = e || window.event;
            var posX = e.clientX,
              finalX = posX - offsetX;
            drag.move(toast, instance, settings, finalX);
          };
        }
      },
      stopMoving: function stopMoving(toast, e) {
        if (ACCEPTSTOUCH) {
          document.ontouchmove = function () {};
        } else {
          document.onmousemove = function () {};
        }
        toast.style.opacity = '';
        toast.style.transform = '';
        if (toast.classList.contains(PLUGIN_NAME + '-dragged')) {
          toast.classList.remove(PLUGIN_NAME + '-dragged');
          toast.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
          setTimeout(function () {
            toast.style.transition = '';
          }, 400);
        }
      }
    };
  }();
  $iziToast.setSetting = function (ref, option, value) {
    $iziToast.children[ref][option] = value;
  };
  $iziToast.getSetting = function (ref, option) {
    return $iziToast.children[ref][option];
  };

  /**
   * Destroy the current initialization.
   * @public
   */
  $iziToast.destroy = function () {
    forEach(document.querySelectorAll('.' + PLUGIN_NAME + '-overlay'), function (element, index) {
      element.remove();
    });
    forEach(document.querySelectorAll('.' + PLUGIN_NAME + '-wrapper'), function (element, index) {
      element.remove();
    });
    forEach(document.querySelectorAll('.' + PLUGIN_NAME), function (element, index) {
      element.remove();
    });
    this.children = {};

    // Remove event listeners
    document.removeEventListener(PLUGIN_NAME + '-opened', {}, false);
    document.removeEventListener(PLUGIN_NAME + '-opening', {}, false);
    document.removeEventListener(PLUGIN_NAME + '-closing', {}, false);
    document.removeEventListener(PLUGIN_NAME + '-closed', {}, false);
    document.removeEventListener('keyup', {}, false);

    // Reset variables
    CONFIG = {};
  };

  /**
   * Initialize Plugin
   * @public
   * @param {Object} options User settings
   */
  $iziToast.settings = function (options) {
    // Destroy any existing initializations
    $iziToast.destroy();
    CONFIG = options;
    defaults = extend(defaults, options || {});
  };

  /**
   * Building themes functions.
   * @public
   * @param {Object} options User settings
   */
  forEach(THEMES, function (theme, name) {
    $iziToast[name] = function (options) {
      var settings = extend(CONFIG, options || {});
      settings = extend(theme, settings || {});
      this.show(settings);
    };
  });

  /**
   * Do the calculation to move the progress bar
   * @private
   */
  $iziToast.progress = function (options, $toast, callback) {
    var that = this,
      ref = $toast.getAttribute('data-iziToast-ref'),
      settings = extend(this.children[ref], options || {}),
      $elem = $toast.querySelector('.' + PLUGIN_NAME + '-progressbar div');
    return {
      start: function start() {
        if (typeof settings.time.REMAINING == 'undefined') {
          $toast.classList.remove(PLUGIN_NAME + '-reseted');
          if ($elem !== null) {
            $elem.style.transition = 'width ' + settings.timeout + 'ms ' + settings.progressBarEasing;
            $elem.style.width = '0%';
          }
          settings.time.START = new Date().getTime();
          settings.time.END = settings.time.START + settings.timeout;
          settings.time.TIMER = setTimeout(function () {
            clearTimeout(settings.time.TIMER);
            if (!$toast.classList.contains(PLUGIN_NAME + '-closing')) {
              that.hide(settings, $toast, 'timeout');
              if (typeof callback === 'function') {
                callback.apply(that);
              }
            }
          }, settings.timeout);
          that.setSetting(ref, 'time', settings.time);
        }
      },
      pause: function pause() {
        if (typeof settings.time.START !== 'undefined' && !$toast.classList.contains(PLUGIN_NAME + '-paused') && !$toast.classList.contains(PLUGIN_NAME + '-reseted')) {
          $toast.classList.add(PLUGIN_NAME + '-paused');
          settings.time.REMAINING = settings.time.END - new Date().getTime();
          clearTimeout(settings.time.TIMER);
          that.setSetting(ref, 'time', settings.time);
          if ($elem !== null) {
            var computedStyle = window.getComputedStyle($elem),
              propertyWidth = computedStyle.getPropertyValue('width');
            $elem.style.transition = 'none';
            $elem.style.width = propertyWidth;
          }
          if (typeof callback === 'function') {
            setTimeout(function () {
              callback.apply(that);
            }, 10);
          }
        }
      },
      resume: function resume() {
        if (typeof settings.time.REMAINING !== 'undefined') {
          $toast.classList.remove(PLUGIN_NAME + '-paused');
          if ($elem !== null) {
            $elem.style.transition = 'width ' + settings.time.REMAINING + 'ms ' + settings.progressBarEasing;
            $elem.style.width = '0%';
          }
          settings.time.END = new Date().getTime() + settings.time.REMAINING;
          settings.time.TIMER = setTimeout(function () {
            clearTimeout(settings.time.TIMER);
            if (!$toast.classList.contains(PLUGIN_NAME + '-closing')) {
              that.hide(settings, $toast, 'timeout');
              if (typeof callback === 'function') {
                callback.apply(that);
              }
            }
          }, settings.time.REMAINING);
          that.setSetting(ref, 'time', settings.time);
        } else {
          this.start();
        }
      },
      reset: function reset() {
        clearTimeout(settings.time.TIMER);
        delete settings.time.REMAINING;
        that.setSetting(ref, 'time', settings.time);
        $toast.classList.add(PLUGIN_NAME + '-reseted');
        $toast.classList.remove(PLUGIN_NAME + '-paused');
        if ($elem !== null) {
          $elem.style.transition = 'none';
          $elem.style.width = '100%';
        }
        if (typeof callback === 'function') {
          setTimeout(function () {
            callback.apply(that);
          }, 10);
        }
      }
    };
  };

  /**
   * Close the specific Toast
   * @public
   * @param {Object} options User settings
   */
  $iziToast.hide = function (options, $toast, closedBy) {
    if (_typeof($toast) != 'object') {
      $toast = document.querySelector($toast);
    }
    var that = this,
      settings = extend(this.children[$toast.getAttribute('data-iziToast-ref')], options || {});
    settings.closedBy = closedBy || null;
    delete settings.time.REMAINING;
    $toast.classList.add(PLUGIN_NAME + '-closing');

    // Overlay
    (function () {
      var $overlay = document.querySelector('.' + PLUGIN_NAME + '-overlay');
      if ($overlay !== null) {
        var refs = $overlay.getAttribute('data-iziToast-ref');
        refs = refs.split(',');
        var index = refs.indexOf(String(settings.ref));
        if (index !== -1) {
          refs.splice(index, 1);
        }
        $overlay.setAttribute('data-iziToast-ref', refs.join());
        if (refs.length === 0) {
          $overlay.classList.remove('fadeIn');
          $overlay.classList.add('fadeOut');
          setTimeout(function () {
            $overlay.remove();
          }, 700);
        }
      }
    })();
    if (settings.transitionIn) {
      $toast.classList.remove(settings.transitionIn);
    }
    if (settings.transitionInMobile) {
      $toast.classList.remove(settings.transitionInMobile);
    }
    if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
      if (settings.transitionOutMobile) $toast.classList.add(settings.transitionOutMobile);
    } else {
      if (settings.transitionOut) $toast.classList.add(settings.transitionOut);
    }
    var H = $toast.parentNode.offsetHeight;
    $toast.parentNode.style.height = H + 'px';
    $toast.style.pointerEvents = 'none';
    if (!ISMOBILE || window.innerWidth > MOBILEWIDTH) {
      $toast.parentNode.style.transitionDelay = '0.2s';
    }
    try {
      var event = new CustomEvent(PLUGIN_NAME + '-closing', {
        detail: settings,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    } catch (ex) {
      console.warn(ex);
    }
    setTimeout(function () {
      $toast.parentNode.style.height = '0px';
      $toast.parentNode.style.overflow = '';
      setTimeout(function () {
        delete that.children[settings.ref];
        $toast.parentNode.remove();
        try {
          var event = new CustomEvent(PLUGIN_NAME + '-closed', {
            detail: settings,
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(event);
        } catch (ex) {
          console.warn(ex);
        }
        if (typeof settings.onClosed !== 'undefined') {
          settings.onClosed.apply(null, [settings, $toast, closedBy]);
        }
      }, 1000);
    }, 200);
    if (typeof settings.onClosing !== 'undefined') {
      settings.onClosing.apply(null, [settings, $toast, closedBy]);
    }
  };

  /**
   * Create and show the Toast
   * @public
   * @param {Object} options User settings
   */
  $iziToast.show = function (options) {
    var that = this;

    // Merge user options with defaults
    var settings = extend(CONFIG, options || {});
    settings = extend(defaults, settings);
    settings.time = {};
    if (settings.id === null) {
      settings.id = generateId(settings.title + settings.message + settings.color);
    }
    if (settings.displayMode === 1 || settings.displayMode == 'once') {
      try {
        if (document.querySelectorAll('.' + PLUGIN_NAME + '#' + settings.id).length > 0) {
          return false;
        }
      } catch (exc) {
        console.warn('[' + PLUGIN_NAME + '] Could not find an element with this selector: ' + '#' + settings.id + '. Try to set an valid id.');
      }
    }
    if (settings.displayMode === 2 || settings.displayMode == 'replace') {
      try {
        forEach(document.querySelectorAll('.' + PLUGIN_NAME + '#' + settings.id), function (element, index) {
          that.hide(settings, element, 'replaced');
        });
      } catch (exc) {
        console.warn('[' + PLUGIN_NAME + '] Could not find an element with this selector: ' + '#' + settings.id + '. Try to set an valid id.');
      }
    }
    settings.ref = new Date().getTime() + Math.floor(Math.random() * 10000000 + 1);
    $iziToast.children[settings.ref] = settings;
    var $DOM = {
      body: document.querySelector('body'),
      overlay: document.createElement('div'),
      toast: document.createElement('div'),
      toastBody: document.createElement('div'),
      toastTexts: document.createElement('div'),
      toastCapsule: document.createElement('div'),
      cover: document.createElement('div'),
      buttons: document.createElement('div'),
      inputs: document.createElement('div'),
      icon: !settings.iconUrl ? document.createElement('i') : document.createElement('img'),
      wrapper: null
    };
    $DOM.toast.setAttribute('data-iziToast-ref', settings.ref);
    $DOM.toast.appendChild($DOM.toastBody);
    $DOM.toastCapsule.appendChild($DOM.toast);

    // CSS Settings
    (function () {
      $DOM.toast.classList.add(PLUGIN_NAME);
      $DOM.toast.classList.add(PLUGIN_NAME + '-opening');
      $DOM.toastCapsule.classList.add(PLUGIN_NAME + '-capsule');
      $DOM.toastBody.classList.add(PLUGIN_NAME + '-body');
      $DOM.toastTexts.classList.add(PLUGIN_NAME + '-texts');
      if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
        if (settings.transitionInMobile) $DOM.toast.classList.add(settings.transitionInMobile);
      } else {
        if (settings.transitionIn) $DOM.toast.classList.add(settings.transitionIn);
      }
      if (settings.class) {
        var classes = settings.class.split(' ');
        forEach(classes, function (value, index) {
          $DOM.toast.classList.add(value);
        });
      }
      if (settings.id) {
        $DOM.toast.id = settings.id;
      }
      if (settings.rtl) {
        $DOM.toast.classList.add(PLUGIN_NAME + '-rtl');
        $DOM.toast.setAttribute('dir', 'rtl');
      }
      if (settings.layout > 1) {
        $DOM.toast.classList.add(PLUGIN_NAME + '-layout' + settings.layout);
      }
      if (settings.balloon) {
        $DOM.toast.classList.add(PLUGIN_NAME + '-balloon');
      }
      if (settings.maxWidth) {
        if (!isNaN(settings.maxWidth)) {
          $DOM.toast.style.maxWidth = settings.maxWidth + 'px';
        } else {
          $DOM.toast.style.maxWidth = settings.maxWidth;
        }
      }
      if (settings.theme !== '' || settings.theme !== 'light') {
        $DOM.toast.classList.add(PLUGIN_NAME + '-theme-' + settings.theme);
      }
      if (settings.color) {
        //#, rgb, rgba, hsl

        if (isColor(settings.color)) {
          $DOM.toast.style.background = settings.color;
        } else {
          $DOM.toast.classList.add(PLUGIN_NAME + '-color-' + settings.color);
        }
      }
      if (settings.backgroundColor) {
        $DOM.toast.style.background = settings.backgroundColor;
        if (settings.balloon) {
          $DOM.toast.style.borderColor = settings.backgroundColor;
        }
      }
    })();

    // Cover image
    (function () {
      if (settings.image) {
        $DOM.cover.classList.add(PLUGIN_NAME + '-cover');
        $DOM.cover.style.width = settings.imageWidth + 'px';
        if (isBase64(settings.image.replace(/ /g, ''))) {
          $DOM.cover.style.backgroundImage = 'url(data:image/png;base64,' + settings.image.replace(/ /g, '') + ')';
        } else {
          $DOM.cover.style.backgroundImage = 'url(' + settings.image + ')';
        }
        if (settings.rtl) {
          $DOM.toastBody.style.marginRight = settings.imageWidth + 10 + 'px';
        } else {
          $DOM.toastBody.style.marginLeft = settings.imageWidth + 10 + 'px';
        }
        $DOM.toast.appendChild($DOM.cover);
      }
    })();

    // Button close
    (function () {
      if (settings.close) {
        $DOM.buttonClose = document.createElement('button');
        $DOM.buttonClose.type = 'button';
        $DOM.buttonClose.classList.add(PLUGIN_NAME + '-close');
        $DOM.buttonClose.addEventListener('click', function (e) {
          e.target;
          that.hide(settings, $DOM.toast, 'button');
        });
        $DOM.toast.appendChild($DOM.buttonClose);
      } else {
        if (settings.rtl) {
          $DOM.toast.style.paddingLeft = '18px';
        } else {
          $DOM.toast.style.paddingRight = '18px';
        }
      }
    })();

    // Progress Bar & Timeout
    (function () {
      if (settings.progressBar) {
        $DOM.progressBar = document.createElement('div');
        $DOM.progressBarDiv = document.createElement('div');
        $DOM.progressBar.classList.add(PLUGIN_NAME + '-progressbar');
        $DOM.progressBarDiv.style.background = settings.progressBarColor;
        $DOM.progressBar.appendChild($DOM.progressBarDiv);
        $DOM.toast.appendChild($DOM.progressBar);
      }
      if (settings.timeout) {
        if (settings.pauseOnHover && !settings.resetOnHover) {
          $DOM.toast.addEventListener('mouseenter', function (e) {
            that.progress(settings, $DOM.toast).pause();
          });
          $DOM.toast.addEventListener('mouseleave', function (e) {
            that.progress(settings, $DOM.toast).resume();
          });
        }
        if (settings.resetOnHover) {
          $DOM.toast.addEventListener('mouseenter', function (e) {
            that.progress(settings, $DOM.toast).reset();
          });
          $DOM.toast.addEventListener('mouseleave', function (e) {
            that.progress(settings, $DOM.toast).start();
          });
        }
      }
    })();

    // Icon
    (function () {
      if (settings.iconUrl) {
        $DOM.icon.setAttribute('class', PLUGIN_NAME + '-icon');
        $DOM.icon.setAttribute('src', settings.iconUrl);
      } else if (settings.icon) {
        $DOM.icon.setAttribute('class', PLUGIN_NAME + '-icon ' + settings.icon);
        if (settings.iconText) {
          $DOM.icon.appendChild(document.createTextNode(settings.iconText));
        }
        if (settings.iconColor) {
          $DOM.icon.style.color = settings.iconColor;
        }
      }
      if (settings.icon || settings.iconUrl) {
        if (settings.rtl) {
          $DOM.toastBody.style.paddingRight = '33px';
        } else {
          $DOM.toastBody.style.paddingLeft = '33px';
        }
        $DOM.toastBody.appendChild($DOM.icon);
      }
    })();

    // Title & Message
    (function () {
      if (settings.title.length > 0) {
        $DOM.strong = document.createElement('strong');
        $DOM.strong.classList.add(PLUGIN_NAME + '-title');
        $DOM.strong.appendChild(createFragElem(settings.title));
        $DOM.toastTexts.appendChild($DOM.strong);
        if (settings.titleColor) {
          $DOM.strong.style.color = settings.titleColor;
        }
        if (settings.titleSize) {
          if (!isNaN(settings.titleSize)) {
            $DOM.strong.style.fontSize = settings.titleSize + 'px';
          } else {
            $DOM.strong.style.fontSize = settings.titleSize;
          }
        }
        if (settings.titleLineHeight) {
          if (!isNaN(settings.titleSize)) {
            $DOM.strong.style.lineHeight = settings.titleLineHeight + 'px';
          } else {
            $DOM.strong.style.lineHeight = settings.titleLineHeight;
          }
        }
      }
      if (settings.message.length > 0) {
        $DOM.p = document.createElement('p');
        $DOM.p.classList.add(PLUGIN_NAME + '-message');
        $DOM.p.appendChild(createFragElem(settings.message));
        $DOM.toastTexts.appendChild($DOM.p);
        if (settings.messageColor) {
          $DOM.p.style.color = settings.messageColor;
        }
        if (settings.messageSize) {
          if (!isNaN(settings.titleSize)) {
            $DOM.p.style.fontSize = settings.messageSize + 'px';
          } else {
            $DOM.p.style.fontSize = settings.messageSize;
          }
        }
        if (settings.messageLineHeight) {
          if (!isNaN(settings.titleSize)) {
            $DOM.p.style.lineHeight = settings.messageLineHeight + 'px';
          } else {
            $DOM.p.style.lineHeight = settings.messageLineHeight;
          }
        }
      }
      if (settings.title.length > 0 && settings.message.length > 0) {
        if (settings.rtl) {
          $DOM.strong.style.marginLeft = '10px';
        } else if (settings.layout !== 2 && !settings.rtl) {
          $DOM.strong.style.marginRight = '10px';
        }
      }
    })();
    $DOM.toastBody.appendChild($DOM.toastTexts);

    // Inputs
    var $inputs;
    (function () {
      if (settings.inputs.length > 0) {
        $DOM.inputs.classList.add(PLUGIN_NAME + '-inputs');
        forEach(settings.inputs, function (value, index) {
          $DOM.inputs.appendChild(createFragElem(value[0]));
          $inputs = $DOM.inputs.childNodes;
          $inputs[index].classList.add(PLUGIN_NAME + '-inputs-child');
          if (value[3]) {
            setTimeout(function () {
              $inputs[index].focus();
            }, 300);
          }
          $inputs[index].addEventListener(value[1], function (e) {
            var ts = value[2];
            return ts(that, $DOM.toast, this, e);
          });
        });
        $DOM.toastBody.appendChild($DOM.inputs);
      }
    })();

    // Buttons
    (function () {
      if (settings.buttons.length > 0) {
        $DOM.buttons.classList.add(PLUGIN_NAME + '-buttons');
        forEach(settings.buttons, function (value, index) {
          $DOM.buttons.appendChild(createFragElem(value[0]));
          var $btns = $DOM.buttons.childNodes;
          $btns[index].classList.add(PLUGIN_NAME + '-buttons-child');
          if (value[2]) {
            setTimeout(function () {
              $btns[index].focus();
            }, 300);
          }
          $btns[index].addEventListener('click', function (e) {
            e.preventDefault();
            var ts = value[1];
            return ts(that, $DOM.toast, this, e, $inputs);
          });
        });
      }
      $DOM.toastBody.appendChild($DOM.buttons);
    })();
    if (settings.message.length > 0 && (settings.inputs.length > 0 || settings.buttons.length > 0)) {
      $DOM.p.style.marginBottom = '0';
    }
    if (settings.inputs.length > 0 || settings.buttons.length > 0) {
      if (settings.rtl) {
        $DOM.toastTexts.style.marginLeft = '10px';
      } else {
        $DOM.toastTexts.style.marginRight = '10px';
      }
      if (settings.inputs.length > 0 && settings.buttons.length > 0) {
        if (settings.rtl) {
          $DOM.inputs.style.marginLeft = '8px';
        } else {
          $DOM.inputs.style.marginRight = '8px';
        }
      }
    }

    // Wrap
    (function () {
      $DOM.toastCapsule.style.visibility = 'hidden';
      setTimeout(function () {
        var H = $DOM.toast.offsetHeight;
        var style = $DOM.toast.currentStyle || window.getComputedStyle($DOM.toast);
        var marginTop = style.marginTop;
        marginTop = marginTop.split('px');
        marginTop = parseInt(marginTop[0]);
        var marginBottom = style.marginBottom;
        marginBottom = marginBottom.split('px');
        marginBottom = parseInt(marginBottom[0]);
        $DOM.toastCapsule.style.visibility = '';
        $DOM.toastCapsule.style.height = H + marginBottom + marginTop + 'px';
        setTimeout(function () {
          $DOM.toastCapsule.style.height = 'auto';
          if (settings.target) {
            $DOM.toastCapsule.style.overflow = 'visible';
          }
        }, 500);
        if (settings.timeout) {
          that.progress(settings, $DOM.toast).start();
        }
      }, 100);
    })();

    // Target
    (function () {
      var position = settings.position;
      if (settings.target) {
        $DOM.wrapper = document.querySelector(settings.target);
        $DOM.wrapper.classList.add(PLUGIN_NAME + '-target');
        if (settings.targetFirst) {
          $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
        } else {
          $DOM.wrapper.appendChild($DOM.toastCapsule);
        }
      } else {
        if (POSITIONS.indexOf(settings.position) == -1) {
          console.warn('[' + PLUGIN_NAME + '] Incorrect position.\nIt can be › ' + POSITIONS);
          return;
        }
        if (ISMOBILE || window.innerWidth <= MOBILEWIDTH) {
          if (settings.position == 'bottomLeft' || settings.position == 'bottomRight' || settings.position == 'bottomCenter') {
            position = PLUGIN_NAME + '-wrapper-bottomCenter';
          } else if (settings.position == 'topLeft' || settings.position == 'topRight' || settings.position == 'topCenter') {
            position = PLUGIN_NAME + '-wrapper-topCenter';
          } else {
            position = PLUGIN_NAME + '-wrapper-center';
          }
        } else {
          position = PLUGIN_NAME + '-wrapper-' + position;
        }
        $DOM.wrapper = document.querySelector('.' + PLUGIN_NAME + '-wrapper.' + position);
        if (!$DOM.wrapper) {
          $DOM.wrapper = document.createElement('div');
          $DOM.wrapper.classList.add(PLUGIN_NAME + '-wrapper');
          $DOM.wrapper.classList.add(position);
          document.body.appendChild($DOM.wrapper);
        }
        if (settings.position == 'topLeft' || settings.position == 'topCenter' || settings.position == 'topRight') {
          $DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
        } else {
          $DOM.wrapper.appendChild($DOM.toastCapsule);
        }
      }
      if (!isNaN(settings.zindex)) {
        $DOM.wrapper.style.zIndex = settings.zindex;
      } else {
        console.warn('[' + PLUGIN_NAME + '] Invalid zIndex.');
      }
    })();

    // Overlay
    (function () {
      if (settings.overlay) {
        if (document.querySelector('.' + PLUGIN_NAME + '-overlay.fadeIn') !== null) {
          $DOM.overlay = document.querySelector('.' + PLUGIN_NAME + '-overlay');
          $DOM.overlay.setAttribute('data-iziToast-ref', $DOM.overlay.getAttribute('data-iziToast-ref') + ',' + settings.ref);
          if (!isNaN(settings.zindex) && settings.zindex !== null) {
            $DOM.overlay.style.zIndex = settings.zindex - 1;
          }
        } else {
          $DOM.overlay.classList.add(PLUGIN_NAME + '-overlay');
          $DOM.overlay.classList.add('fadeIn');
          $DOM.overlay.style.background = settings.overlayColor;
          $DOM.overlay.setAttribute('data-iziToast-ref', settings.ref);
          if (!isNaN(settings.zindex) && settings.zindex !== null) {
            $DOM.overlay.style.zIndex = settings.zindex - 1;
          }
          document.querySelector('body').appendChild($DOM.overlay);
        }
        if (settings.overlayClose) {
          $DOM.overlay.removeEventListener('click', {});
          $DOM.overlay.addEventListener('click', function (e) {
            that.hide(settings, $DOM.toast, 'overlay');
          });
        } else {
          $DOM.overlay.removeEventListener('click', {});
        }
      }
    })();

    // Inside animations
    (function () {
      if (settings.animateInside) {
        $DOM.toast.classList.add(PLUGIN_NAME + '-animateInside');
        var animationTimes = [200, 100, 300];
        if (settings.transitionIn == 'bounceInLeft' || settings.transitionIn == 'bounceInRight') {
          animationTimes = [400, 200, 400];
        }
        if (settings.title.length > 0) {
          setTimeout(function () {
            $DOM.strong.classList.add('slideIn');
          }, animationTimes[0]);
        }
        if (settings.message.length > 0) {
          setTimeout(function () {
            $DOM.p.classList.add('slideIn');
          }, animationTimes[1]);
        }
        if (settings.icon || settings.iconUrl) {
          setTimeout(function () {
            $DOM.icon.classList.add('revealIn');
          }, animationTimes[2]);
        }
        var counter = 150;
        if (settings.buttons.length > 0 && $DOM.buttons) {
          setTimeout(function () {
            forEach($DOM.buttons.childNodes, function (element, index) {
              setTimeout(function () {
                element.classList.add('revealIn');
              }, counter);
              counter = counter + 150;
            });
          }, settings.inputs.length > 0 ? 150 : 0);
        }
        if (settings.inputs.length > 0 && $DOM.inputs) {
          counter = 150;
          forEach($DOM.inputs.childNodes, function (element, index) {
            setTimeout(function () {
              element.classList.add('revealIn');
            }, counter);
            counter = counter + 150;
          });
        }
      }
    })();
    settings.onOpening.apply(null, [settings, $DOM.toast]);
    try {
      var event = new CustomEvent(PLUGIN_NAME + '-opening', {
        detail: settings,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(event);
    } catch (ex) {
      console.warn(ex);
    }
    setTimeout(function () {
      $DOM.toast.classList.remove(PLUGIN_NAME + '-opening');
      $DOM.toast.classList.add(PLUGIN_NAME + '-opened');
      try {
        var event = new CustomEvent(PLUGIN_NAME + '-opened', {
          detail: settings,
          bubbles: true,
          cancelable: true
        });
        document.dispatchEvent(event);
      } catch (ex) {
        console.warn(ex);
      }
      settings.onOpened.apply(null, [settings, $DOM.toast]);
    }, 1000);
    if (settings.drag) {
      if (ACCEPTSTOUCH) {
        $DOM.toast.addEventListener('touchstart', function (e) {
          drag.startMoving(this, that, settings, e);
        }, false);
        $DOM.toast.addEventListener('touchend', function (e) {
          drag.stopMoving(this, e);
        }, false);
      } else {
        $DOM.toast.addEventListener('mousedown', function (e) {
          e.preventDefault();
          drag.startMoving(this, that, settings, e);
        }, false);
        $DOM.toast.addEventListener('mouseup', function (e) {
          e.preventDefault();
          drag.stopMoving(this, e);
        }, false);
      }
    }
    if (settings.closeOnEscape) {
      document.addEventListener('keyup', function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          that.hide(settings, $DOM.toast, 'esc');
        }
      });
    }
    if (settings.closeOnClick) {
      $DOM.toast.addEventListener('click', function (evt) {
        that.hide(settings, $DOM.toast, 'toast');
      });
    }
    that.toast = $DOM.toast;
  };
  return $iziToast;
});

function toast(message, title) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'info';
  return new Promise(function (resolve) {
    if (isFunction(iziToast[method])) {
      iziToast[method](Object.assign({}, toast.options, {
        message: message,
        title: title !== null && title !== void 0 ? title : '',
        onClosed: function onClosed() {
          resolve(toast);
        }
      }));
    }
  });
}
toast.title = document.title || '';
toast.options = {
  zindex: 2147483647,
  image: null,
  imageWidth: 48,
  layout: 2,
  closeOnClick: true,
  closeOnEscape: true
};
var success = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message, title) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return toast(message, title, 'success');
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function success(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  error = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(message, title) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return toast(message, title, 'error');
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function error(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(),
  notice = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(message, title) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return toast(message, title, 'info');
          case 2:
            return _context3.abrupt("return", _context3.sent);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function notice(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }(),
  warn = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(message, title) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return toast(message, title, 'warning');
          case 2:
            return _context4.abrupt("return", _context4.sent);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function warn(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
Object.assign(toast, {
  success: success,
  error: error,
  notice: notice,
  warn: warn
});

var _document = document,
  body = _document.body,
  navbarEventTypes = ['navbar-collapsing', 'navbar-shown'],
  noScrollSavesPosition = true,
  pages = _toConsumableArray(document.querySelectorAll('.page'));
var collapsible, currentPage;
var pills = document.querySelectorAll('.nav-pills a.pill');
addEventListener('activate.bs.scrollspy', function (e) {
  var relatedTarget = e.relatedTarget,
    hash = relatedTarget.getAttribute('href'),
    selector = "[href=\"".concat(hash, "\"]");
  pills.forEach(function (pill) {
    if (pill.closest(selector)) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
});
var io = new IntersectionObserver(function (entries) {
  for (var i = 0; i < entries.length; i++) {
    var item = entries[i];
    if (item.isIntersecting) {
      currentPage = item.target;
      currentPage.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: 'smooth'
      });
      break;
    }
  }
}, {
  threshold: 0.4
});
pages.forEach(function (page) {
  return io.observe(page);
});
addEventListener('show.bs.collapse', function () {
  var _body$classList;
  (_body$classList = body.classList).remove.apply(_body$classList, navbarEventTypes);
  body.classList.add('navbar-collapsing');
  NoScroll.enable(noScrollSavesPosition);
});
addEventListener('shown.bs.collapse', function () {
  var _body$classList2;
  (_body$classList2 = body.classList).remove.apply(_body$classList2, navbarEventTypes);
  body.classList.add('navbar-shown');
});
addEventListener('hidden.bs.collapse', function () {
  var _body$classList3;
  (_body$classList3 = body.classList).remove.apply(_body$classList3, navbarEventTypes);
  NoScroll.disable(noScrollSavesPosition);
});

// mobile menu disappears when clicked + scrolldown button clicked

addEventListener('click', function (e) {
  var target;
  if (target = e.target.closest('.navbar-shown .navbar-nav .nav-item [href^="#"]')) {
    var _collapsible;
    (_collapsible = collapsible) !== null && _collapsible !== void 0 ? _collapsible : collapsible = new Collapse('#navbarNav', {
      toggle: false
    });
    var id = target.getAttribute('href').slice(1),
      elem = document.getElementById(id);
    addEventListener('hidden.bs.collapse', function () {
      elem.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: 'smooth'
      });
    }, {
      once: true
    });
    collapsible.hide();
  } else if (target = e.target.closest('[href^="#"].scroll-down-button')) {
    var _id = target.getAttribute('href').slice(1),
      _elem = document.getElementById(_id);
    if (_elem) {
      e.preventDefault();
      _elem.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: 'smooth'
      });
    }
  }
});

//title in divs

(function () {
  var titleElement = document.querySelector('#home h1'),
    text = titleElement.getAttribute('aria-label'),
    letters = text.split('');
  titleElement.innerHTML = '';
  var _iterator = _createForOfIteratorHelper(letters),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var letter = _step.value;
      titleElement.appendChild(createElement('span', {
        class: 'blast'
      }, letter));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
})();

// typed.js

var typedOptions = {
  typeSpeed: 100,
  backSpeed: 100,
  loop: true
};
document.querySelectorAll('.typed-text').forEach(function (elem) {
  var list;
  if (list = dataset(elem, 'typed')) {
    list = list.split(',').map(function (item) {
      return item.trim();
    });
    new i(elem, Object.assign({
      strings: list
    }, typedOptions));
  }
});

// contact form

addEventListener('submit', function (e) {
  var form = e.target.closest('form.needs-validation');
  if (e.target.closest('#about form')) {
    e.preventDefault();
    if (form) {
      form.classList.add('was-validated');
      if (form.checkValidity()) {
        toast.success('votre message à été envoyé.').then(function () {
          form.classList.remove('was-validated');
          form.reset();
        });
      }
    }
  }
});
addEventListener('change', function (e) {
  var input = e.target.closest('input, textarea');
  if (input && e.target.closest('#about form')) {
    e.preventDefault();
  }

  //console.debug(e, e.target.closest('input, textarea').form.elements);
  //console.debug(e.target.closest('form').elements);
});

//document.body.setAttribute('data-bs-theme', 'dark');

//document.body['data-bs-theme'] = "dark";

//document.body.dataset.bsTheme = "dark";
//# sourceMappingURL=bundle.js.map
