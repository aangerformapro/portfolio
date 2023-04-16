import dataset from "dataset";
import { createElement, isArray, isString, uniqid } from "../helpers/utils.mjs";



export class ScrollNav {


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
            })

            root.appendChild(pill);
        });

        this.#container.appendChild(this.#root);

        this.#root.addEventListener('click', e => {
            let target = e.target.closest('li');
            if (target) {

                this.scrollTo(dataset.get(target, target));




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




export default ScrollNav;