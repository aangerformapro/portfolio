import PanelSnap from "panelsnap";
import ScrollNav from "./components/scroll-nav.mjs";

// bootstrap components
import { Collapse, ScrollSpy } from "bootstrap";

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

