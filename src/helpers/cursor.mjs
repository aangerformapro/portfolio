import "./cursor.css";
import emitter from "./emitter.mjs";
import { createElement, isElement, isValidSelector } from "./utils.mjs";



const
    mouse = {
        x: 0,
        y: 0,
    },
    mouseX = (event) =>
    {
        return mouse.x = event.clientX;
    },
    mouseY = (event) =>
    {
        return mouse.y = event.clientY;
    },
    positionElement = (event, cursor) =>
    {
        cursor.style.top = mouseY(event) + 'px';
        cursor.style.left = mouseX(event) + 'px';
    };


export class Cursor
{

    static of(root)
    {
        return new Cursor(root);
    }




    #root;
    #elem;
    #listener;

    get cursor()
    {
        return this.#elem;
    }

    get root()
    {
        return this.#root;
    }

    get x()
    {
        return mouse.x;
    }

    get y()
    {
        return mouse.y;
    }

    constructor(root)
    {

        if (isValidSelector(root))
        {
            root = document.querySelector(root);
        }

        if (!isElement(root))
        {
            throw new TypeError('root is not an Element');
        }

        this.#root = root;

        this.#elem = createElement('<div class="cursor d-none"/>');

        emitter(root).mixin(this);


        this.start();
    }


    start()
    {
        if (!this.#listener)
        {
            this.#root.classList.add("cursor-area");
            this.root.appendChild(this.#elem);


            this.on('mousemove', this.#listener = e =>
            {
                setTimeout(() =>
                {
                    positionElement(e, this.#elem);
                }, 1);
            });

            this.on('mouseenter mouseleave mousedown mouseup', e =>
            {


                this.#elem.classList.remove("d-none");

                switch (e.type)
                {
                    case "mouseleave":
                        this.#elem.classList.add("d-none");
                        break;
                    case "mousedown":
                        this.#elem.classList.add('clicked');
                        break;

                    case "mouseup":
                        this.#elem.classList.remove('clicked');
                        break;
                }


            });




        }
    }

    stop()
    {
        if (this.#listener)
        {
            this.off('mousemove', this.#listener);
            this.off('mouseenter mouseleave mousedown mouseup');
            this.#root.classList.remove("cursor-area");
            this.#listener = null;
        }
    }


    destroy()
    {

        this.stop();
        this.#elem.remove();
        this.#root.classList.remove("cursor-area");

    }

}


export default Cursor;





