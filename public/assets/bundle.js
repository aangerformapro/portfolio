var _createClass$2 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var SingleTweener = function () {
  function SingleTweener() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck$2(this, SingleTweener);
    this.start = opts.start;
    this.end = opts.end;
    this.decimal = opts.decimal;
  }
  _createClass$2(SingleTweener, [{
    key: "getIntermediateValue",
    value: function getIntermediateValue(tick) {
      if (this.decimal) {
        return tick;
      } else {
        return Math.round(tick);
      }
    }
  }, {
    key: "getFinalValue",
    value: function getFinalValue() {
      return this.end;
    }
  }]);
  return SingleTweener;
}();
var _createClass$1$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$1$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
var Tweezer = function () {
  function Tweezer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck$1$1(this, Tweezer);
    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.tweener = opts.tweener || new SingleTweener(opts);
    this.start = this.tweener.start;
    this.end = this.tweener.end;
    this.frame = null;
    this.next = null;
    this.isRunning = false;
    this.events = {};
    this.direction = this.start < this.end ? 'up' : 'down';
  }
  _createClass$1$1(Tweezer, [{
    key: 'begin',
    value: function begin() {
      if (!this.isRunning && this.next !== this.end) {
        this.frame = window.requestAnimationFrame(this._tick.bind(this));
      }
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.cancelAnimationFrame(this.frame);
      this.isRunning = false;
      this.frame = null;
      this.timeStart = null;
      this.next = null;
      return this;
    }
  }, {
    key: 'on',
    value: function on(name, handler) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(handler);
      return this;
    }
  }, {
    key: '_emit',
    value: function _emit(name, val) {
      var _this = this;
      var e = this.events[name];
      e && e.forEach(function (handler) {
        return handler.call(_this, val);
      });
    }
  }, {
    key: '_tick',
    value: function _tick(currentTime) {
      this.isRunning = true;
      var lastTick = this.next || this.start;
      if (!this.timeStart) this.timeStart = currentTime;
      this.timeElapsed = currentTime - this.timeStart;
      this.next = this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration);
      if (this._shouldTick(lastTick)) {
        this._emit('tick', this.tweener.getIntermediateValue(this.next));
        this.frame = window.requestAnimationFrame(this._tick.bind(this));
      } else {
        this._emit('tick', this.tweener.getFinalValue());
        this._emit('done', null);
      }
    }
  }, {
    key: '_shouldTick',
    value: function _shouldTick(lastTick) {
      return {
        up: this.next < this.end && lastTick <= this.next,
        down: this.next > this.end && lastTick >= this.next
      }[this.direction];
    }
  }, {
    key: '_defaultEase',
    value: function _defaultEase(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  }]);
  return Tweezer;
}();

/**
 * PanelSnap.js v1.3.0
 * Copyright (c) 2013-present, Guido Bouman
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function _classCallCheck$1(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties$1(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
  }
}
function _createClass$1(t, e, n) {
  return e && _defineProperties$1(t.prototype, e), n && _defineProperties$1(t, n), t;
}
function _defineProperty(t, e, n) {
  return e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = null != arguments[e] ? arguments[e] : {},
      i = Object.keys(n);
    "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (t) {
      return Object.getOwnPropertyDescriptor(n, t).enumerable;
    }))), i.forEach(function (e) {
      _defineProperty(t, e, n[e]);
    });
  }
  return t;
}
function _toConsumableArray(t) {
  return _arrayWithoutHoles(t) || _iterableToArray(t) || _nonIterableSpread();
}
function _arrayWithoutHoles(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
    return n;
  }
}
function _iterableToArray(t) {
  if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function getScrollingElement(t) {
  return t !== document.body ? t : "scrollingElement" in document ? document.scrollingElement : navigator.userAgent.indexOf("WebKit") > -1 ? document.body : document.documentElement;
}
function getScrollEventContainer(t) {
  return t === document.body ? window : getScrollingElement(t);
}
function getContainerRect(t) {
  if (t === document.body) {
    var e = document.documentElement;
    return {
      top: 0,
      left: 0,
      bottom: e.clientHeight,
      right: e.clientWidth,
      height: e.clientHeight,
      width: e.clientWidth
    };
  }
  return t.getBoundingClientRect();
}
function getTargetScrollOffset(t, e) {
  var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
    o = getContainerRect(t),
    r = e.getBoundingClientRect(),
    s = r.top - o.top,
    a = r.left - o.left,
    l = n ? r.height - o.height : 0,
    c = i ? r.width - o.width : 0,
    h = getScrollingElement(t);
  return {
    top: s + l + h.scrollTop,
    left: a + c + h.scrollLeft
  };
}
function getElementsInContainerViewport(t, e) {
  var n = getContainerRect(t);
  return e.filter(function (t) {
    var e = t.getBoundingClientRect();
    return e.top < n.bottom && e.right > n.left && e.bottom > n.top && e.left < n.right;
  });
}
function elementFillsContainer(t, e) {
  var n = getContainerRect(t),
    i = e.getBoundingClientRect();
  return i.top <= n.top && i.bottom >= n.bottom && i.left <= n.left && i.right >= n.right;
}
var passiveIsSupported = function () {
    var t = !1;
    try {
      var e = Object.defineProperty({}, "passive", {
        get: function get() {
          t = !0;
        }
      });
      window.addEventListener("test", null, e), window.removeEventListener("test", null, e);
    } catch (t) {}
    return t;
  }(),
  INSTANCE_COUNTER = 0,
  TWEEN_MAX_VALUE = 1e4,
  defaultOptions = {
    container: document.body,
    panelSelector: "> section",
    directionThreshold: 50,
    delay: 0,
    duration: 300,
    easing: function easing(t) {
      return t;
    }
  },
  PanelSnap = function () {
    function t(e) {
      if (_classCallCheck$1(this, t), this.options = _objectSpread({}, defaultOptions, e), this.options.container.dataset.panelsnapId) throw new Error("PanelSnap is already initialised on this container, aborting.");
      this.container = this.options.container, this.scrollContainer = getScrollingElement(this.container), this.scrollEventContainer = getScrollEventContainer(this.container), INSTANCE_COUNTER += 1, this.instanceIndex = INSTANCE_COUNTER, this.container.dataset.panelsnapId = this.instanceIndex;
      var n = '[data-panelsnap-id="'.concat(this.instanceIndex, '"] ').concat(this.options.panelSelector);
      this.panelList = Array.from(document.querySelectorAll(n)), this.events = [], this.isEnabled = !0, this.isInteracting = !1, this.scrollTimeout = null, this.resetAnimation(), this.onInteractStart = this.onInteractStart.bind(this), this.onInteractStop = this.onInteractStop.bind(this), this.onInteractStart = this.onInteractStart.bind(this), this.onInteractStop = this.onInteractStop.bind(this), this.onInteractStart = this.onInteractStart.bind(this), this.onInteractStop = this.onInteractStop.bind(this), this.onScroll = this.onScroll.bind(this), this.onInteract = this.onInteract.bind(this), this.scrollEventContainer.addEventListener("keydown", this.onInteractStart, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("keyup", this.onInteractStop, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("mousedown", this.onInteractStart, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("mouseup", this.onInteractStop, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("touchstart", this.onInteractStart, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("touchend", this.onInteractStop, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("scroll", this.onScroll, passiveIsSupported && {
        passive: !0
      }), this.scrollEventContainer.addEventListener("wheel", this.onInteract, passiveIsSupported && {
        passive: !0
      }), this.findSnapTarget();
    }
    return _createClass$1(t, [{
      key: "destroy",
      value: function value() {
        this.stopAnimation(), this.disable(), this.scrollEventContainer.removeEventListener("keydown", this.onInteractStart, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("keyup", this.onInteractStop, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("mousedown", this.onInteractStart, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("mouseup", this.onInteractStop, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("touchstart", this.onInteractStart, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("touchend", this.onInteractStop, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("scroll", this.onScroll, passiveIsSupported && {
          passive: !0
        }), this.scrollEventContainer.removeEventListener("wheel", this.onInteract, passiveIsSupported && {
          passive: !0
        }), delete this.options.container.dataset.panelsnapId;
      }
    }, {
      key: "enable",
      value: function value() {
        this.isEnabled = !0;
      }
    }, {
      key: "disable",
      value: function value() {
        this.isEnabled = !1;
      }
    }, {
      key: "on",
      value: function value(t, e) {
        var n = this.events[t] || [];
        this.events[t] = _toConsumableArray(n).concat([e]), "activatePanel" === t && e.call(this, this.activePanel);
      }
    }, {
      key: "off",
      value: function value(t, e) {
        var n = this.events[t] || [];
        this.events[t] = n.filter(function (t) {
          return t !== e;
        });
      }
    }, {
      key: "emit",
      value: function value(t, e) {
        var n = this;
        (this.events[t] || []).forEach(function (t) {
          return t.call(n, e);
        });
      }
    }, {
      key: "onInteractStart",
      value: function value() {
        this.stopAnimation(), this.isInteracting = !0;
      }
    }, {
      key: "onInteractStop",
      value: function value() {
        this.isInteracting = !1, this.findSnapTarget();
      }
    }, {
      key: "onInteract",
      value: function value() {
        this.stopAnimation(), this.onScroll();
      }
    }, {
      key: "onScroll",
      value: function value() {
        clearTimeout(this.scrollTimeout), this.isInteracting || this.animation || (this.scrollTimeout = setTimeout(this.findSnapTarget.bind(this), 50 + this.options.delay));
      }
    }, {
      key: "findSnapTarget",
      value: function value() {
        var t = this.scrollContainer.scrollTop - this.currentScrollOffset.top,
          e = this.scrollContainer.scrollLeft - this.currentScrollOffset.left;
        this.currentScrollOffset = {
          top: this.scrollContainer.scrollTop,
          left: this.scrollContainer.scrollLeft
        };
        var n = getElementsInContainerViewport(this.container, this.panelList);
        if (0 === n.length) throw new Error("PanelSnap could not find a snappable panel, aborting.");
        if (n.length > 1) {
          if (Math.abs(t) < this.options.directionThreshold && Math.abs(e) < this.options.directionThreshold && this.activePanel) return void this.snapToPanel(this.activePanel, t > 0, e > 0);
          var i = t > 0 || e > 0 ? 1 : n.length - 2;
          this.snapToPanel(n[i], t < 0, e < 0);
        } else {
          var o = n[0];
          elementFillsContainer(this.container, o) ? this.activatePanel(o) : (console.error("PanelSnap does not support space between panels, snapping back."), this.snapToPanel(o, t > 0, e > 0));
        }
      }
    }, {
      key: "snapToPanel",
      value: function value(t) {
        var e = this,
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        this.activatePanel(t), this.isEnabled && (this.animation && this.animation.stop(), this.targetScrollOffset = getTargetScrollOffset(this.container, t, n, i), this.animation = new Tweezer({
          start: 0,
          end: TWEEN_MAX_VALUE,
          duration: this.options.duration
        }), this.animation.on("tick", this.animationTick.bind(this)), this.animation.on("done", function () {
          e.emit("snapStop", t), e.resetAnimation();
        }), this.emit("snapStart", t), this.animation.begin());
      }
    }, {
      key: "animationTick",
      value: function value(t) {
        var e = this.targetScrollOffset.top - this.currentScrollOffset.top,
          n = this.currentScrollOffset.top + e * t / TWEEN_MAX_VALUE;
        this.scrollContainer.scrollTop = n;
        var i = this.targetScrollOffset.left - this.currentScrollOffset.left,
          o = this.currentScrollOffset.left + i * t / TWEEN_MAX_VALUE;
        this.scrollContainer.scrollLeft = o;
      }
    }, {
      key: "stopAnimation",
      value: function value() {
        this.animation && (this.animation.stop(), this.resetAnimation());
      }
    }, {
      key: "resetAnimation",
      value: function value() {
        this.currentScrollOffset = {
          top: this.scrollContainer.scrollTop,
          left: this.scrollContainer.scrollLeft
        }, this.targetScrollOffset = {
          top: 0,
          left: 0
        }, this.animation = null;
      }
    }, {
      key: "activatePanel",
      value: function value(t) {
        this.activePanel !== t && (this.emit("activatePanel", t), this.activePanel = t);
      }
    }]), t;
  }();
var PanelSnap$1 = PanelSnap;

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
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

/* global unsafeWindow, globalThis */

var global = typeof unsafeWindow !== 'undefined' ? unsafeWindow : typeof globalThis !== 'undefined' ? globalThis : window;
var document$1 = global.document;
  global.JSON;
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
  isArray = function isArray(param) {
    return Array.isArray(param);
  },
  isNull = function isNull(param) {
    return param === null;
  };

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

/**
 * Generate a unique ID
 * @returns {String}
 */
function uniqid() {
  uniqid.values = uniqid.values || [];
  var value;
  while (!value || uniqid.values.includes(value)) {
    value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  uniqid.values.push(value);
  return value;
}

var _ref = typeof globalThis !== 'undefined' ? globalThis : window,
  JSON = _ref.JSON;
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
    return JSON.parse(value);
  }
  return value;
}
function encode(value) {
  if (!isString(value)) {
    return JSON.stringify(value);
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

var _container = /*#__PURE__*/new WeakMap();
var _targets = /*#__PURE__*/new WeakMap();
var _root = /*#__PURE__*/new WeakMap();
var _nav = /*#__PURE__*/new WeakMap();
var _ids = /*#__PURE__*/new WeakMap();
var _ready = /*#__PURE__*/new WeakMap();
var _ignoreScrollEvent = /*#__PURE__*/new WeakMap();
var _delta = /*#__PURE__*/new WeakMap();
var ScrollNav = /*#__PURE__*/function () {
  function ScrollNav() {
    var _this = this;
    var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var targets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    _classCallCheck(this, ScrollNav);
    _classPrivateFieldInitSpec(this, _container, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _targets, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _root, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _nav, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ids, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _ready, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _ignoreScrollEvent, {
      writable: true,
      value: true
    });
    _classPrivateFieldInitSpec(this, _delta, {
      writable: true,
      value: 0
    });
    if (container instanceof Element === false) {
      throw new TypeError('Invalid Container');
    }
    if (isString(targets)) {
      targets = document.querySelectorAll(targets);
    }
    if (targets instanceof NodeList) {
      targets = Array.from(targets);
    }
    if (!isArray(targets)) {
      throw new TypeError('Invalid Targets');
    }
    _classPrivateFieldSet(this, _container, container);
    _classPrivateFieldSet(this, _targets, targets);
    _classPrivateFieldSet(this, _root, createElement('div', {
      class: 'nav-pills',
      html: '<ul class="m-0 p-0" />'
    }));
    _classPrivateFieldSet(this, _nav, []);
    _classPrivateFieldSet(this, _ids, {});
    var root = _classPrivateFieldGet(this, _root).firstChild;
    targets.forEach(function (target, i) {
      var _target$getAttribute;
      if (!target.id) {
        target.id = uniqid();
      }
      var id = target.id,
        pill = createElement('li', {
          data: {
            target: '#' + id,
            index: i
          }
        }),
        tooltip = createElement('span', {
          class: 'tooltip'
        }, (_target$getAttribute = target.getAttribute('title')) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());
      _classPrivateFieldGet(_this, _ids)[id] = i;
      pill.appendChild(tooltip);
      pill.appendChild(createElement('span', {
        class: 'pill'
      }));
      _classPrivateFieldGet(_this, _nav).push(pill);
      Object.defineProperty(pill, 'targetElement', {
        value: target,
        configurable: true,
        enumerable: false
      });
      root.appendChild(pill);
    });
    _classPrivateFieldGet(this, _container).appendChild(_classPrivateFieldGet(this, _root));
    _classPrivateFieldGet(this, _root).addEventListener('click', function (e) {
      var target = e.target.closest('li');
      if (target) {
        _classPrivateFieldSet(_this, _ignoreScrollEvent, true);
        _this.setActive(_classPrivateFieldGet(_this, _nav).indexOf(target));
        _this.scrollTo(dataset(target, 'index')).then(function () {
          return _classPrivateFieldSet(_this, _ignoreScrollEvent, false);
        });
      }
    });
    var onResize = function onResize() {
        var y = 0;
        targets.forEach(function (target) {
          var rect = target.getBoundingClientRect();
          if (y === 0) {
            y = innerHeight - rect.height;
          }
          dataset(target, 'top', y);
          dataset(target, 'bottom', y + rect.height);
          y += rect.height;
        });
      },
      whichIsIntoView = function whichIsIntoView(e) {
        if (_classPrivateFieldGet(_this, _ignoreScrollEvent)) {
          return;
        }
        for (var i = 0; i < _classPrivateFieldGet(_this, _targets).length; i++) {
          var target = _classPrivateFieldGet(_this, _targets)[i],
            y = scrollY;
          var _ref = [dataset(target, 'top'), dataset(target, 'bottom')],
            top = _ref[0],
            bottom = _ref[1];
          if (top <= y && bottom > y) {
            _this.setActive(i);
            return;
          }
        }
      };
    addEventListener('resize', onResize);
    // addEventListener('wheel', e => {
    //     this.#delta = Math.sign(e.deltaY);
    // });
    addEventListener('scroll', whichIsIntoView);
    this.onReady().then(function () {
      _classPrivateFieldSet(_this, _ready, true);
      _classPrivateFieldSet(_this, _ignoreScrollEvent, false);
      onResize();
      whichIsIntoView();
    });
  }
  _createClass(ScrollNav, [{
    key: "view",
    get: function get() {
      for (var i = 0; i < _classPrivateFieldGet(this, _targets).length; i++) {
        var target = _classPrivateFieldGet(this, _targets)[i];
        if (target.classList.contains('active')) {
          return target;
        }
      }
    }
  }, {
    key: "ready",
    get: function get() {
      return _classPrivateFieldGet(this, _ready);
    }
  }, {
    key: "onReady",
    value: function onReady() {
      var _this2 = this;
      return new Promise(function (resolve) {
        if (document.readyState === 'complete') {
          return resolve(_this2);
        }
        addEventListener('load', function () {
          resolve(_this2);
        });
      });
    }
  }, {
    key: "setActive",
    value: function setActive(id) {
      if (id < _classPrivateFieldGet(this, _nav).length && id >= 0) {
        _classPrivateFieldGet(this, _nav).concat(_classPrivateFieldGet(this, _targets)).forEach(function (elem) {
          elem.classList.remove('active', 'complete');
        });
        _classPrivateFieldGet(this, _nav)[id].classList.add('active');
        _classPrivateFieldGet(this, _targets)[id].classList.add('active', 'complete');
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(id) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        var elem;
        if (isString(id)) {
          if (id.startsWith('#')) {
            id = id.slice(1);
          }
          id = _classPrivateFieldGet(_this3, _ids)[id];
        }
        if (isInt(id)) {
          elem = _classPrivateFieldGet(_this3, _targets)[id];
        } else if (id instanceof Element) {
          elem = id;
          id = _classPrivateFieldGet(_this3, _targets).indexOf(id);
        }
        if (elem) {
          var _ref2 = [dataset(elem, 'top'), dataset(elem, 'bottom')],
            top = _ref2[0],
            bottom = _ref2[1];
          var listener = function listener() {
            if (bottom > scrollY && top <= scrollY) {
              removeEventListener('scroll', listener);
              elem.classList.add('complete');
              resolve(elem);
            }
          };
          addEventListener('scroll', listener);
          elem.scrollIntoView({
            block: "start",
            inline: "nearest",
            behavior: 'smooth'
          });
        } else {
          reject(new Error('Invalid id'));
        }
      });
    }
  }]);
  return ScrollNav;
}();

// old browsers nav
if (typeof globalThis === 'undefined') {
  //console.warn('Navigator is too old !!!');
  new PanelSnap$1({
    panelSelector: '> .page',
    directionThreshold: 1
  });
}
new ScrollNav(document.body, '.page');
addEventListener('click', function (e) {
  var target;
  if (target = e.target.closest('a[href^="#"]')) {
    var elem = document.getElementById(target.getAttribute('href').slice(1));
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: 'smooth'
      });
    }
  }
});
//# sourceMappingURL=bundle.js.map
