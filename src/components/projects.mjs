import { createElement, isPlainObject, isString } from "../helpers/utils.mjs"


/* <a href="https://github.com/aangerformapro/memory-game" target="_blank"
title="Voir le projet sur github" data-bs-toggle="tooltip"
class="link-secondary">
<i class="devicon-github-original-wordmark"></i>
</a> */

export class ProjectLink {

    src
    label
    icon
    element

    constructor(src, label, icon) {


        if (!isString(src)) {
            throw new TypeError('src must be a String.');
        }

        if (!isString(label)) {
            throw new TypeError('label must be a String.');
        }

        if (!isString(icon)) {
            throw new TypeError('icon must be a String.');
        }

        [this.src, this.label, this.icon] = [src, label, icon];


        this.element = createElement('<a target="_blank" class="link-secondary"/>', {
            href: src,
            data: {
                bs: {
                    toggle: 'tooltip',
                    title: label
                }
            }
        }, [
            createElement('i', { class: icon })
        ]);

    }

}

/* <i class="devicon-nodejs-plain" data-bs-toggle="tooltip" title="NodeJS"></i>
<i class="devicon-sass-original" data-bs-toggle="tooltip" title="SASS"></i>
<i class="devicon-bootstrap-plain" data-bs-toggle="tooltip" title="Bootstrap"></i> */
export class ProjectIcon {

    element
    icon
    label

    constructor(icon, label) {

        if (!isString(icon)) {
            throw new TypeError('icon must be a String.');
        }

        if (!isString(label)) {
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

/* <div class="card project overflow-hidden">
    <div class="card-header fs-3 d-flex">
        <span class="ms-auto"></span>
        <i class="devicon-nodejs-plain" data-bs-toggle="tooltip" title="NodeJS"></i>
        <i class="devicon-sass-original" data-bs-toggle="tooltip" title="SASS"></i>
        <i class="devicon-bootstrap-plain" data-bs-toggle="tooltip" title="Bootstrap"></i>
    </div>
    <div class="card-body d-flex flex-column">
        <a href="https://aanger-memory.netlify.app" target="_blank" title="Memory Game"
            data-bs-toggle="tooltip" class="project-thumbnail">
            <img src="./assets/pictures/memory-desktop.png" alt="image">
        </a>

        <div class="project-description my-3">
            <div class="card-title fs-2 fw-bold">
                Memory Game
            </div>
            <div class="card-text">
                Un jeu de Memory développé pendant ma formation.
            </div>
        </div>

    </div>

    <div class="card-footer text-end fs-2">
        <a href="https://github.com/aangerformapro/memory-game" target="_blank"
            title="Voir le projet sur github" data-bs-toggle="tooltip"
            class="link-secondary">
            <i class="devicon-github-original-wordmark"></i>
        </a>
    </div>


</div> */

export class Project {

    element
    header
    footer
    body
    title
    text

    constructor(data) {
        if (!isPlainObject(data)) {
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
                data: {
                    bs: {
                        toggle: 'tooltip',
                        title: data.label
                    }
                }
            }, createElement('<img alt="Thumbnail"/>', {
                src: './assets/pictures/' + data.picture
            })),
            body = createElement('<div class="card-body pb-0 d-flex flex-column text-center">', [
                title = createElement('<div class="card-title fw-bold fs-3 mt-0"/>', data.label),
                text = createElement('<div class="card-text"/>', data.describe),
            ]),
            footer = createElement('<div class="card-footer text-end fs-3"/>',
                data.links.map(item => (new ProjectLink(item.href, item.label, item.icon)).element)
            )
        ]);


        [this.header, this.footer, this.title, this.text, this.body] = [header, footer, title, text, body];

    }
}




export default Project;