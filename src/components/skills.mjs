import dataset from "../helpers/dataset.mjs";
import EventManager from "../helpers/event-manager.mjs";
import { BackedEnum, createElement } from "../helpers/utils.mjs";



export class Tag extends BackedEnum
{

    static HTML = new Tag('html');
    static CSS = new Tag('css');
    static JS = new Tag('js');
    static PHP = new Tag('php');
    static IDE = new Tag('ide');

}






export class Skills
{

    elements = {};

    constructor(tags, skills)
    {

        this.elements = {
            tags: {
                targets: []
            },
            list: {
                targets: []
            }
        };

        EventManager.mixin(this);

        const tagRoot = this.elements.tags.root = createElement(
            '<div class="icons d-flex"/>',
            tags.map(item =>
            {
                const [tag, label, icon] = item;
                this.elements.tags.targets.push(createElement(
                    'div', {
                    class: 'skill-lang',
                    data: {
                        role: 'switch',
                        'aria-checked': false,
                        toggle: 'tag',
                        tag: tag.value,
                        bs: {
                            toggle: 'tooltip'
                        }
                    },
                    title: label
                }, icon));

                return this.elements.tags.targets[this.elements.tags.targets.length - 1];
            })
        );


        const listRoot = this.elements.list.root = createElement(
            '<div class="card-body list-skills"/>',
            createElement('<div class="d-flex flex-wrap justify-content-between"/>',
                skills.map(item =>
                {

                    const { label, describe, icon } = item;


                    this.elements.list.targets.push(createElement(
                        '<div class="d-flex align-items-center px-3 py-2 col-6 col-lg-3 mb-3" data-bs-toggle="tooltip"/>',
                        {
                            title: label,
                            data: {
                                tags: item.tags.map(x => x.value).join(','),
                            }
                        },
                        [
                            createElement('<div class="icon fs-2 d-flex"/>', icon),
                            createElement('<div class="describe"/>', describe)
                        ]
                    ));

                    return this.elements.list.targets[this.elements.list.targets.length - 1];
                })
            )
        );


        tagRoot.addEventListener('click', e =>
        {

            let t = e.target.closest('[data-toggle="tag"]');
            if (t)
            {

                let tag = Tag.from(dataset(t, 'tag'));

                if (tag)
                {
                    this.filter(tag);
                }
            }


        }, false);

        this.filter(tags[0][0]);

    }


    filter(tag)
    {

        if (tag instanceof Tag === false)
        {
            throw new TypeError('invalid tag');
        }
        const { targets } = this.elements.list;
        targets.forEach(t => t.classList.add('d-none'));
        targets.filter(x => dataset(x, 'tags').includes(tag.value))
            .forEach(elem => elem.classList.remove('d-none'));

        this.elements.tags.targets.forEach(x =>
        {

            if (tag.value === dataset(x, 'tag'))
            {
                x.classList.add("active");
                x.setAttribute('aria-checked', 'true');
            }
            else
            {
                x.classList.remove("active");
                x.setAttribute('aria-checked', 'false');
            }

        });

        this.trigger('change', { tag });
    }

}

export default Skills;