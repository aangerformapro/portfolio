import dataset from "../helpers/dataset.mjs";
import EventManager from "../helpers/event-manager.mjs";
import { scrollIntoView, ScrollSnap } from "../helpers/scroll.mjs";
import { createElement, decode, isElement } from "../helpers/utils.mjs";




export class NavPills
{


    #root;
    #views;

    element;

    pills;

    get views()
    {
        return this.#views;
    }

    get targets()
    {
        return this.#views.targets;
    }


    #findview(id = '')
    {

        if (id.startsWith('#'))
        {
            id = id.slice(1);
        }

        for (let target of this.targets)
        {
            if (target.id === id)
            {
                return target;
            }
        }

    }


    scrollTo(id = '')
    {

        return new Promise((resolve, reject) =>
        {
            if (id.startsWith('#'))
            {
                id = id.slice(1);
            }

            let view = this.#findview(id), pill = this.pills[id];

            if (view && pill)
            {

                this.one('change', e =>
                {
                    resolve(view);
                });

                this.trigger('change', {
                    view, pill
                });

                scrollIntoView(view);
            } else
            {
                reject(new Error('invalid id ' + decode(id)));
            }


        });
    }



    constructor(views, root)
    {


        if (views instanceof ScrollSnap === false)
        {
            throw new TypeError('argument views not an instance of ScrollSnap');
        }


        EventManager.mixin(this);



        this.#views = views;

        if (!isElement(root))
        {
            root = document.body;
        }

        this.#root = root;



        const { targets } = views, pills = this.pills = {};

        const elem = this.element = createElement(
            '<div class="nav-pills">',
            targets.filter(t => t.matches('[id][data-title]')).map(target =>
            {
                let
                    id = target.id,
                    a = createElement('<a class="pill" data-bs-toggle="tooltip" data-bs-placement="left"/>', {
                        href: '#' + id,
                        title: dataset(target, 'title'),
                        data: { id }
                    });
                return pills[id] = a;

            })
        );

        this.on('change', e =>
        {
            const { view } = e.data;
            for (let id in pills)
            {
                let elem = pills[id];
                elem.classList.remove('active');
                if (view.id === id)
                {
                    elem.classList.add('active');
                }
            }

        });

        views.on('change', e =>
        {
            this.trigger('change', { view: e.data.view, pill: pills[e.data.view.id] });
        });

        root.appendChild(elem);

        elem.addEventListener('click', e =>
        {
            let pill = e.target.closest('[href^="#"]');
            if (pill)
            {
                e.preventDefault();
                if (!pill.classList.contains('active'))
                {
                    this.scrollTo(pill.dataset.id);
                }
            }

        });

    }
}


export default NavPills;