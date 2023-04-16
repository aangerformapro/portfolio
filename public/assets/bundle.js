/* global unsafeWindow, globalThis */

const global = typeof unsafeWindow !== 'undefined' ? unsafeWindow : globalThis;
const { document: document$1, JSON: JSON$1 } = global;
const RE_NUMERIC = /^-?(?:[\d]+\.)?\d+$/;

const isPlainObject = (param) => param instanceof Object && Object.getPrototypeOf(param) === Object.prototype,
    isUndef = (param) => typeof param === 'undefined',
    isString = (param) => typeof param === 'string',
    isNumber = (param) => typeof param === 'number',
    isInt = (param) => Number.isInteger(param),
    isFloat = (param) => isNumber(param) && parseFloat(param) === param,
    isNumeric = (param) => isInt(param) || isFloat(param) || RE_NUMERIC.test(param),
    isArray = (param) => Array.isArray(param),
    isNull = (param) => param === null;

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

const { JSON } = globalThis;


let api;

if (typeof document !== "undefined" && document.head && document.head.dataset) {

    api = {
        set: function (node, attr, value) {
            if (isUndef(value) || isNull(value)) {
                return this.remove(node, attr);
            }
            node.dataset[attr] = encode(value);
        },
        get: function (node, attr) {
            return decode(node.dataset[attr]);
        },
        remove: function (node, attr) {
            delete node.dataset[attr];
        }
    };
} else {
    api = {
        set: function (node, attr, value) {

            if (isUndef(value) || isNull(value)) {
                return this.remove(node, attr);
            }
            node.setAttribute('data-' + toDashed(attr), encode(value));
        },
        get: function (node, attr) {
            return decode(node.getAttribute('data-' + toDashed(attr)));
        },
        remove: function (node, attr) {
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
    if (
        (value.startsWith('{') && value.endsWith('}')) ||
        (value.startsWith('[') && value.endsWith(']')) ||
        isNumeric(value) || value === 'true' || value === 'false'
    ) {
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

    const $this = {

        get(attr) {
            if (elem instanceof NodeList) {
                elem = elem[0];
            }
            if (elem instanceof HTMLElement) {
                return api.get(elem, attr);
            }
            return null;
        },

        set(attr, value) {

            if (elem instanceof NodeList) {
                elem.forEach(el => {
                    api.set(el, attr, value);
                });
            } else if (elem instanceof HTMLElement) {
                api.set(elem, attr, value);
            }


            return $this;
        },
        remove(attr) {

            if (elem instanceof NodeList) {
                elem.forEach(el => {
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

class ScrollNav {


    #container
    #targets
    #root
    #nav
    #ids
    #ready = false;
    #ignoreScrollEvent = true;

    #delta = 0;

    get view() {
        for (let i = 0; i < this.#targets.length; i++) {
            let target = this.#targets[i];

            if (target.classList.contains('active')) {
                return target;
            }
        }
    }



    get ready() {
        return this.#ready;
    }
    onReady() {

        return new Promise(resolve => {

            if (document.readyState === 'complete') {
                return resolve(this);
            }
            addEventListener('load', () => {
                resolve(this);
            });
        });

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
            html: '<ul class="m-0 p-0" />'
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
                tooltip = createElement(
                    'span',
                    { class: 'tooltip' },
                    target.getAttribute('title') ?? id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()
                );

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
                this.#ignoreScrollEvent = true;

                this.setActive(this.#nav.indexOf(target));

                this.scrollTo(dataset(target, 'index')).then(() => this.#ignoreScrollEvent = false);
            }

        });

        const onResize = () => {

            let y = 0;
            targets.forEach(target => {

                const rect = target.getBoundingClientRect();
                if (y === 0) {
                    y = innerHeight - rect.height;
                }
                dataset(target, 'top', y);
                dataset(target, 'bottom', y + rect.height);
                y += rect.height;
            });

        }, whichIsIntoView = e => {
            if (this.#ignoreScrollEvent) {
                return;
            }


            for (let i = 0; i < this.#targets.length; i++) {

                let target = this.#targets[i], y = scrollY;
                let [top, bottom] = [dataset(target, 'top'), dataset(target, 'bottom')];
                if (top <= y && bottom > y) {
                    this.setActive(i);
                    return;
                }

            }
        };



        addEventListener('resize', onResize);
        addEventListener('wheel', e => {
            this.#delta = Math.sign(e.deltaY);
        });
        addEventListener('scroll', whichIsIntoView);


        this.onReady().then(() => {
            this.#ready = true;
            this.#ignoreScrollEvent = false;
            onResize();
            whichIsIntoView();

        });

    }


    setActive(id) {

        if (id < this.#nav.length && id >= 0) {
            this.#nav.concat(this.#targets).forEach(elem => {
                elem.classList.remove('active', 'complete');
            });
            this.#nav[id].classList.add('active');

            this.#targets[id].classList.add('active', 'complete');
        }
    }



    scrollTo(id) {


        return new Promise((resolve, reject) => {
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
                id = this.#targets.indexOf(id);
            }
            if (elem) {

                const [top, bottom] = [dataset(elem, 'top'), dataset(elem, 'bottom')];

                const listener = () => {

                    if (bottom > scrollY && top <= scrollY) {
                        removeEventListener('scroll', listener);

                        elem.classList.add('complete');
                        resolve(elem);
                    }
                };

                addEventListener('scroll', listener);

                elem.scrollIntoView(true);
            } else {
                reject(new Error('Invalid id'));
            }
        });

    }
}

new ScrollNav(document.body, '.page');
//# sourceMappingURL=bundle.js.map
