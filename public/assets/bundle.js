function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var dataset_1=dataset;

/*global document*/


// replace namesLikeThis with names-like-this
function toDashed(name) {
  return name.replace(/([A-Z])/g, function(u) {
    return "-" + u.toLowerCase();
  });
}

var fn;

if (typeof document !== "undefined" && document.head && document.head.dataset) {
  fn = {
    set: function(node, attr, value) {
      node.dataset[attr] = value;
    },
    get: function(node, attr) {
      return node.dataset[attr];
    },
    del: function (node, attr) {
      delete node.dataset[attr];
    }
  };
} else {
  fn = {
    set: function(node, attr, value) {
      node.setAttribute('data-' + toDashed(attr), value);
    },
    get: function(node, attr) {
      return node.getAttribute('data-' + toDashed(attr));
    },
    del: function (node, attr) {
      node.removeAttribute('data-' + toDashed(attr));
    }
  };
}

function dataset(node, attr, value) {
  var self = {
    set: set,
    get: get,
    del: del
  };

  function set(attr, value) {
    fn.set(node, attr, value);
    return self;
  }

  function del(attr) {
    fn.del(node, attr);
    return self;
  }

  function get(attr) {
    return fn.get(node, attr);
  }

  if (arguments.length === 3) {
    return set(attr, value);
  }
  if (arguments.length == 2) {
    return get(attr);
  }

  return self;
}

var dataset$1 = /*@__PURE__*/getDefaultExportFromCjs(dataset_1);

/* global unsafeWindow, globalThis */

const global = typeof unsafeWindow !== 'undefined' ? unsafeWindow : globalThis;
const { document: document$1, JSON } = global;

const isPlainObject = (param) => param instanceof Object && Object.getPrototypeOf(param) === Object.prototype,
    isString = (param) => typeof param === 'string',
    isArray = (param) => Array.isArray(param);

/**
 * Creates an Element
 *
 * @param {string} tagName
 * @param {Object} [attributes]
 * @param {string} [innerHTML]
 * @returns {HTMLElement}
 */
function createElement(tagName = 'div', attributes = null, innerHTML = '') {
    if (isString(attributes)) {
        innerHTML = attributes;
        attributes = null;
    }

    attributes = isPlainObject(attributes) ? attributes : {};

    let elem = document$1.createElement(tagName),
        props = Object.keys(attributes),
        prop;

    for (let i = 0; i < props.length; i++) {
        prop = props[i];
        if (prop === 'html') {
            innerHTML = attributes[prop];
            continue;
        }

        if (/^data(set)?$/.test(prop) && isPlainObject(attributes[prop])) {
            Object.keys(attributes[prop]).forEach((key) => {
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
    let value;

    while (!value || uniqid.values.includes(value)) {
        value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    uniqid.values.push(value);
    return value;
}

class ScrollNav {


    #container
    #targets
    #root
    #nav
    #ids


    get ready() {
        return document.readyState === 'complete';
    }



    constructor(container = document.body, targets = []) {

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
        this.#container = container;
        this.#targets = targets;

        this.#root = createElement('div', {
            class: 'nav-pills',
            html: '<ul/>'
        });
        this.#nav = [];

        this.#ids = {};

        const root = this.#root.firstChild;

        targets.forEach((target, i) => {


            if (!target.id) {
                target.id = uniqid();
            }

            const
                id = target.id,
                pill = createElement('li', {
                    data: {
                        target: '#' + id,
                        index: i
                    }
                }),
                tooltip = createElement('span', { class: 'tooltip' }, target.getAttribute('title') ?? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase());

            this.#ids[id] = i;
            pill.appendChild(tooltip);

            pill.appendChild(createElement('span', { class: 'pill' }));

            this.#nav.push(pill);

            Object.defineProperty(pill, 'targetElement', {
                value: target,
                configurable: true, enumerable: false
            });

            root.appendChild(pill);
        });

        this.#container.appendChild(this.#root);

        this.#root.addEventListener('click', e => {
            let target = e.target.closest('li');
            if (target) {

                this.scrollTo(dataset$1.get(target, target));




            }

        });



    }



    scrollTo(id) {

        let elem;

        if (isString(id)) {
            if (id.startsWith('#')) {
                id = id.slice(1);
            }

            id = this.#ids[id];
        }

        if (isInt(id)) {
            elem = this.#targets[id];
        } else if (id instanceof Element) {
            elem = id;
        }


        if (elem) {
            elem.scrollTo(0, 0);
        }




    }
}

const scrollNav = new ScrollNav(document.body, '.page');


console.debug(scrollNav);
//# sourceMappingURL=bundle.js.map
