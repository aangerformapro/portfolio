import PanelSnap from "panelsnap";
import ScrollNav from "./components/scroll-nav.mjs";

// old browsers scroll-snap-type nav support
if (typeof globalThis === 'undefined') {
    //console.warn('Navigator is too old !!!');
    new PanelSnap({ panelSelector: '> .page', directionThreshold: 1 });
}

const scrollNav = new ScrollNav(document.body, '.page');


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

