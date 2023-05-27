import "./helpers/process.mjs";


// bootstrap components
import { Collapse, ScrollSpy, Tooltip } from "bootstrap";
// import { register as registerSwiper } from 'swiper/element/bundle';
import NoScroll from "./components/noscroll.mjs";
import Typed from 'typed.js';
import dataset from "./helpers/dataset.mjs";
import { createElement } from "./helpers/utils.mjs";
import DarkModeButton from "./components/darkmode.mjs";
import Swiper from "swiper/swiper-bundle.esm.js";

import { IS_TOUCH, PROJECT_LIST } from "./helpers/constants.mjs";
import Project from "./components/projects.mjs";
import { ScrollDelta, ScrollSnap } from "./helpers/scroll.mjs";

const

    { body } = document,
    navbarEventTypes = ['navbar-collapsing', 'navbar-shown'],
    noScrollSavesPosition = true;

//dark mode
(new DarkModeButton());

// scroll behaviour
(() => {
    dataset(body, 'mobile', IS_TOUCH);
    const delta = new ScrollDelta();

    delta.on('change', e => {
        const { direction } = e.data;
        dataset(body, 'scrollDirection', direction.name);
    });


    const views = new ScrollSnap('#home, .page');


    views.on('change', e => {
        const { view } = e.data;
        dataset(body, 'view', '#' + view.id);
    });



    let collapsible;

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

    addEventListener('click', e => {

        let target;

        if (target = e.target.closest('.navbar-shown .navbar-nav .nav-item [href^="#"]')) {
            e.preventDefault();
            collapsible ??= new Collapse('#navbarNav', {
                toggle: false
            });

            let id = target.getAttribute('href').slice(1), elem = document.getElementById(id);

            addEventListener('hidden.bs.collapse', () => {
                scrollIntoView(elem);
            }, { once: true });

            collapsible.hide();

        } else if (target = e.target.closest('[href^="#"].scroll-down-button,  [href^="#"] ')) {
            let id = target.getAttribute('href').slice(1), elem = document.getElementById(id);

            if (elem) {
                e.preventDefault();
                if (!elem.classList.contains('active')) {
                    scrollIntoView(elem);
                }
            }
        }

    });



})();










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






//title in divs

(() => {
    let
        titleElement = document.querySelector('#home h1'),
        text = titleElement.getAttribute('aria-label'),
        letters = text.split('');

    titleElement.innerHTML = '';

    for (let letter of letters) {
        titleElement.appendChild(createElement('span', { class: 'blast' }, letter));
    }
})();


// typed.js
(() => {
    const typedOptions = { typeSpeed: 100, backSpeed: 100, loop: true };

    document.querySelectorAll('.typed-text').forEach(elem => {


        let list;
        if (list = dataset(elem, 'typed')) {
            list = list.split(',').map(item => item.trim());
            new Typed(elem, Object.assign({
                strings: list
            }, typedOptions));
        }

    });
})();



// contact form
(() => {
    function formNotify(type, message, delay = 3000) {

        return new Promise(resolve => {
            const
                formAlert = document.querySelector('#form-alert'),
                msg = createElement('<div role="alert"/>', {
                    class: 'my-3 alert alert-' + type
                }, message);

            setTimeout(() => {
                msg.remove();
                resolve(msg);
            }, delay);

            formAlert.appendChild(msg);
        });

    }

    addEventListener('submit', e => {

        const form = e.target.closest('form.needs-validation');

        if (form) {
            let btn;
            if (btn = form.querySelector('[type="submit"]')) {
                btn.classList.add('disabled');
            }
        }

        if (e.target.closest('#about form')) {
            e.preventDefault();

            if (form) {
                form.classList.add('was-validated');
                if (form.checkValidity()) {


                    const formData = new URLSearchParams(new FormData(form));


                    fetch(form.action, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData.toString()
                    }).then(resp => {
                        if (!resp.ok) {
                            throw new Error(resp.statusText);
                        }


                        formNotify('success', 'Votre message à bien été envoyé.').then(() => {
                            form.classList.remove('was-validated');
                            form.reset();
                        });

                    }).catch(err => {

                        formNotify('danger', "Une erreur s'est produite: <em>" + err.message + "</em>").then(() => {
                            form.classList.remove('was-validated');
                            form.reset();
                        });
                    });

                }

            }
        }

    });

    function checkForm(e) {

        if (!e.target.closest('form.needs-validation input:not([type="submit"]), form.needs-validation textarea')) {
            return;
        }

        let form, btn;
        if ((form = e.target.closest('form.needs-validation')) && (btn = form.querySelector('[type="submit"]'))) {
            btn.classList.add('disabled');
            if (form.checkValidity()) {
                form.classList.add('was-validated');
                btn.classList.remove('disabled');
            }
        }
    }


    addEventListener('change', checkForm);
    document.querySelectorAll('form.needs-validation input:not([type="submit"]), form.needs-validation textarea')
        .forEach(form => form.addEventListener('keyup', checkForm));


})();



// page projects

(() => {

    const swiperWrapper = document.querySelector('#projects .swiper-wrapper');


    const projects = PROJECT_LIST.map(item => new Project(item));
    projects.forEach(project => swiperWrapper.appendChild(createElement(
        '<div class="swiper-slide d-flex align-items-center"/>',
        project.element
    )));


    //Swiper
    const swiper = new Swiper('.swiper', {

        loop: true,
        autoplay: true,
        delay: 2000,
        //  parallax: true,
        effect: 'coverflow',

        coverflowEffect: {
            slideShadows: false,
        },
        centeredSlides: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets'
        },
        slidesPerView: 1,
        spaceBetween: 10,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 1,
                spaceBetween: 30
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 2,
                spaceBetween: 40
            }
        },
    });

})();

// tooltips
(() => {
    [...document.querySelectorAll('[data-bs-toggle="tooltip"][title], [data-bs-toggle="tooltip"][data-bs-title]')]
        .map(elem => new Tooltip(elem));
})();



