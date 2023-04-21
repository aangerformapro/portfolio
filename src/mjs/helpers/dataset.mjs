
import { isNull, isNumeric, isString, isUndef } from "./utils.mjs"
const { JSON } = typeof globalThis !== 'undefined' ? globalThis : window;


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
export function dataset(elem, attr, value) {

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


export default dataset;