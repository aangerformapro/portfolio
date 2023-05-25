import { createElement, isString } from "../helpers/utils.mjs"


/* <a href="https://github.com/aangerformapro/memory-game" target="_blank"
title="Voir le projet sur github" data-bs-toggle="tooltip"
class="link-secondary">
<i class="devicon-github-original-wordmark"></i>
</a> */

class ProjectLink {

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


class ProjectIcon {

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



class Project {




    constructor() {

    }
}




