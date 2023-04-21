import PanelSnap from "panelsnap";

// bootstrap components
import { Collapse, ScrollSpy } from "bootstrap";
import NoScroll from "./components/noscroll.mjs";
import Typed from 'typed.js';
import dataset from "./helpers/dataset.mjs";
import { capitalize, createElement } from "./helpers/utils.mjs";

const { body } = document, navbarEventTypes = ['navbar-collapsing', 'navbar-shown'], noScrollSavesPosition = true;

let collapsible;

// old browsers scroll-snap-type nav support
if (typeof globalThis === 'undefined') {
    //console.warn('Navigator is too old !!!');
    new PanelSnap({ panelSelector: '> .page', directionThreshold: 1 });

    /**
     * Smooth scrolling to id
     */
    addEventListener('click', e => {
        let target;

        if (target = e.target.closest('a[href^="#"]')) {
            const elem = document.getElementById(target.getAttribute('href').slice(1));
            if (elem) {
                e.preventDefault();
                elem.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });
            }
        }
    });



}

//const scrollNav = new ScrollNav(document.body, '.page');


const pills = document.querySelectorAll('.nav-pills a.pill');
addEventListener('activate.bs.scrollspy', e => {
    const
        { relatedTarget } = e,
        hash = relatedTarget.getAttribute('href'),
        selector = `[href="${hash}"]`;
    pills.forEach(pill => {

        if (pill.closest(selector)) {
            pill.classList.add('active');
        }
        else {
            pill.classList.remove('active');
        }
    });
});


addEventListener('show.bs.collapse', () => {
    body.classList.remove(...navbarEventTypes);
    body.classList.add('navbar-collapsing');
    NoScroll.enable(noScrollSavesPosition);
});
addEventListener('shown.bs.collapse', () => {
    body.classList.remove(...navbarEventTypes);
    body.classList.add('navbar-shown');
});


addEventListener('hidden.bs.collapse', () => {
    body.classList.remove(...navbarEventTypes);
    NoScroll.disable(noScrollSavesPosition);
});


// mobile menu disappears when clicked

addEventListener('click', e => {

    let target;

    if (target = e.target.closest('.navbar-shown .navbar-nav .nav-item [href^="#"]')) {
        collapsible ??= new Collapse('#navbarNav', {
            toggle: false
        });

        let id = target.getAttribute('href').slice(1), elem = document.getElementById(id);

        addEventListener('hidden.bs.collapse', () => {
            elem.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });
        }, { once: true });

        collapsible.hide();

    }

});


//title in divs

(() => {
    let titleElement = document.querySelector('#home h1'), text = titleElement.getAttribute('aria-label'), letters = text.split('');
    titleElement.innerHTML = '';

    for (let letter of letters) {

        titleElement.appendChild(createElement('span', { class: 'blast' }, letter));


    }



    console.debug(letters);
})();











// typed.js

const typedOptions = { typeSpeed: 100, backSpeed: 100, loop: true };

document.querySelectorAll('.typed-text').forEach(elem => {


    let list;
    if (list = dataset(elem, 'typed')) {
        list = list.split(',').map(item => item.trim());
        new Typed(elem, Object.assign({
            strings: list
        }, typedOptions));
    }

})

