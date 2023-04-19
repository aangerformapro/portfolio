import PanelSnap from "panelsnap";

// bootstrap components
import { Collapse, ScrollSpy } from "bootstrap";
import NoScroll from "./components/noscroll.mjs";


const { body } = document, navbarEventTypes = ['navbar-collapsing', 'navbar-shown'], noScrollSavesPosition = true;

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
