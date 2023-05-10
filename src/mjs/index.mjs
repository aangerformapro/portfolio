import PanelSnap from "panelsnap";

// bootstrap components
import { Collapse, ScrollSpy } from "bootstrap";
import NoScroll from "./components/noscroll.mjs";
import Typed from 'typed.js';
import dataset from "./helpers/dataset.mjs";
import { capitalize, createElement, html2element } from "./helpers/utils.mjs";
import toast from "./components/notifications.mjs";
import DarkModeButton from "./components/darkmode.mjs";



const
    { body } = document,
    navbarEventTypes = ['navbar-collapsing', 'navbar-shown'],
    noScrollSavesPosition = true,
    pages = [...document.querySelectorAll('.page')],
    darkmode = new DarkModeButton();



function scrollIntoView(elem, delay = 750) {


    if (scrollingIntoView) {
        return;
    }

    if (elem instanceof Element) {

        scrollingIntoView = true;

        setTimeout(() => {
            scrollingIntoView = false;
        }, delay);

        elem.scrollIntoView({ block: "start", inline: "nearest", behavior: 'smooth' });

    }
}


let collapsible, currentPage, scrollingIntoView;

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




const io = new IntersectionObserver(entries => {

    for (let i = 0; i < entries.length; i++) {

        if (scrollingIntoView) {
            return;
        }
        let item = entries[i];
        if (item.isIntersecting) {
            currentPage = item.target;
            scrollIntoView(currentPage);

            break;
        }
    }
}, {
    threshold: 0.3
});

pages.forEach(page => io.observe(page));






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


// mobile menu disappears when clicked + scrolldown button clicked

addEventListener('click', e => {

    let target;

    if (target = e.target.closest('.navbar-shown .navbar-nav .nav-item [href^="#"]')) {
        collapsible ??= new Collapse('#navbarNav', {
            toggle: false
        });

        let id = target.getAttribute('href').slice(1), elem = document.getElementById(id);

        addEventListener('hidden.bs.collapse', () => {
            scrollIntoView(elem);
        }, { once: true });

        collapsible.hide();

    } else if (target = e.target.closest('[href^="#"].scroll-down-button, .nav-pills [href^="#"]')) {
        let id = target.getAttribute('href').slice(1), elem = document.getElementById(id);

        if (elem) {
            e.preventDefault();
            scrollIntoView(elem);
        }
    }

});


//title in divs

(() => {
    let titleElement = document.querySelector('#home h1'), text = titleElement.getAttribute('aria-label'), letters = text.split('');
    titleElement.innerHTML = '';

    for (let letter of letters) {
        titleElement.appendChild(createElement('span', { class: 'blast' }, letter));
    }
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

// contact form

addEventListener('submit', e => {

    const form = e.target.closest('form.needs-validation');

    if (e.target.closest('#about form')) {
        e.preventDefault();

        if (form) {
            form.classList.add('was-validated');
            if (form.checkValidity()) {

                toast.success('votre message à été envoyé.').then(() => {
                    form.classList.remove('was-validated');
                    form.reset();
                });


            }

        }



    }

});

addEventListener('change', e => {
    const input = e.target.closest('input, textarea');

    if (input && e.target.closest('#about form')) {
        e.preventDefault();
    }


});



