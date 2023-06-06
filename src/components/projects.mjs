import { createElement, isHTML, isPlainObject, isString } from "../helpers/utils.mjs";
import { SUPPORTS_WEBP } from "../helpers/webp.mjs";


const picindex = SUPPORTS_WEBP ? 0 : 1;


export class ProjectLink
{

    src;
    label;
    icon;
    element;

    constructor(src, label, icon)
    {


        if (!isString(src))
        {
            throw new TypeError('src must be a String.');
        }

        if (!isString(label))
        {
            throw new TypeError('label must be a String.');
        }

        if (!isString(icon))
        {
            throw new TypeError('icon must be a String.');
        }

        [this.src, this.label, this.icon] = [src, label, icon];


        this.element = createElement('<a target="_blank" class="link-secondary d-flex justify-content-center align-items-center"/>', {
            href: src,
            title: label,
            'aria-label': label,
            data: {
                bs: {
                    toggle: 'tooltip',
                    title: label
                }
            }
        }, [
            isHTML(icon) ? icon : createElement('i', { class: icon })
        ]);

    }

}


export class ProjectIcon
{

    element;
    icon;
    label;

    constructor(icon, label)
    {

        if (!isString(icon))
        {
            throw new TypeError('icon must be a String.');
        }

        if (!isString(label))
        {
            throw new TypeError('label must be a String.');
        }

        this.icon = icon;
        this.label = label;


        this.element = createElement('i', {
            class: icon,
            data: {
                bs: {
                    toggle: 'tooltip',
                    title: label
                }
            }
        });

    }
}



export class Project
{

    element;
    header;
    footer;
    body;
    title;
    text;

    constructor(data)
    {
        if (!isPlainObject(data))
        {
            throw new TypeError('data must be an Object.');
        }


        let element, header, footer, title, text, body;

        element = this.element = createElement(
            '<div class="card project overflow-hidden"/>', [

            header = createElement('<div class="card-header fs-3 d-flex"/>',
                ['<span class="ms-auto"></span>'].concat(
                    data.icons.map(item => (new ProjectIcon(item.icon, item.label)).element))
            ),
            createElement('a', {
                href: data.href,
                target: data.href.startsWith('http') ? '_blank' : '_self',
                class: 'project-thumbnail',
                // title: data.label,
                // 'aria-label': data.label,
                data: {
                    bs: {
                        toggle: 'tooltip',
                        title: data.label
                    }
                }
            }, createElement('<img alt="Thumbnail" loading="lazy" width="615" height="495" />', {
                src: './assets/pictures/' + data.picture[picindex]
            })),
            body = createElement('<div class="card-body pb-0 d-flex flex-column text-center">', [
                title = createElement('<div class="card-title fw-bold fs-3 mt-0"/>', data.label),
                text = createElement('<div class="card-text"/>', data.describe),
            ]),
            footer = createElement('<div class="card-footer fs-3 d-flex justify-content-end align-items-center"/>',
                data.links.map(item => (new ProjectLink(item.href, item.label, item.icon)).element)
            )
        ]);


        [this.header, this.footer, this.title, this.text, this.body] = [header, footer, title, text, body];

    }
}




export default Project;