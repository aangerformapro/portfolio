
import dataset from "../helpers/dataset.mjs";
import { createElement, isArray, isInt, isString, uniqid } from "../helpers/utils.mjs";





export class ScrollNav {


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
            })

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
        // addEventListener('wheel', e => {
        //     this.#delta = Math.sign(e.deltaY);
        // });
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

                elem.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });
            } else {
                reject(new Error('Invalid id'));
            }
        });

    }
}




export default ScrollNav;