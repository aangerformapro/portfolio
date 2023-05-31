import TypedJS from "typed.js";
import { isArray, isElement, isValidSelector } from "./utils.mjs";
import dataset from "./dataset.mjs";

const DEFAULTS = {
    typeSpeed: 100,
    startDelay: 0,
    backSpeed: 100,
    smartBackspace: true,
    shuffle: false,
    backDelay: 700,
    fadeOut: false,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500,
    loop: true,
    loopCount: Infinity,
    attr: null,

};


export class Typed
{

    static of(selector, options)
    {
        return new Typed(selector, options);
    }



    #instances;

    #map;

    get map()
    {
        return this.#map;
    }

    get instances()
    {
        return this.#instances;
    }

    constructor(selector, options)
    {

        if (isElement(selector))
        {
            selector = [selector];
        } else if (isValidSelector(selector))
        {
            selector = [...document.querySelectorAll(selector)];
        } else if (selector instanceof NodeList)
        {
            selector = [...selector];
        } else if (isArray(selector))
        {
            selector = selector.filter(x => isElement(x));
        } else
        {
            selector = [];
        }

        this.#map = new Map();

        this.#instances = selector.map(x =>
        {

            let
                params = { ...DEFAULTS },
                d = dataset(x),
                keys = Object.keys(params),
                strings = d.get('typed', ''), i;

            x.innerHTML = '';

            keys.forEach(y =>
            {
                params[y] = d.get(y, params[y]);
            });

            params.strings = strings.split(",").map(z => z.trim());

            this.#map.set(x, i = new TypedJS(x, params));
            return i;

        });

    }


    toggle()
    {

        this.#instances.forEach(x => x.toggle());

    }

    stop()
    {
        this.#instances.forEach(x => x.stop());
    }

    start()
    {
        this.#instances.forEach(x => x.start());
    }

    destroy()
    {
        this.#instances.forEach(x => x.destroy());
    }


    reset(restart = true)
    {
        this.#instances.forEach(x => x.reset(restart));
    }

}

export default Typed;