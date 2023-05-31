// bootstrap components
import "./helpers/process.mjs"; // bootstrap popper fix
import { Collapse, Tooltip } from "bootstrap";
import NoScroll from "./components/noscroll.mjs";
//import Typed from 'typed.js';


import dataset from "./helpers/dataset.mjs";
import { createElement, getUrl } from "./helpers/utils.mjs";
import DarkModeButton from "./components/darkmode.mjs";
import Swiper from "swiper/swiper-bundle.esm.js";

import { IS_TOUCH, PROJECT_LIST, SKILLS, TAG_ICONS } from "./helpers/constants.mjs";
import Project from "./components/projects.mjs";
import { ScrollSnap } from "./helpers/scroll.mjs";
import NavPills from "./components/navpills.mjs";
import Skills from "./components/skills.mjs";
import Typed from "./helpers/typed.mjs";
import Cursor from "./helpers/cursor.mjs";

const

    { body } = document,
    navbarEventTypes = ['navbar-collapsing', 'navbar-shown'],
    noScrollSavesPosition = true;

//dark mode
(new DarkModeButton());

// scroll behaviour
(() =>
{

    const navlinks = [...document.querySelectorAll('header [href*="#"]')];

    const
        views = new ScrollSnap('#home, .page'),
        pills = new NavPills(views);


    pills.on('change', e =>
    {
        const { view, pill } = e.data;

        navlinks.forEach(a =>
        {


            if (a.href === pill.href)
            {
                a.classList.add('active');
            }
            else
            {
                a.classList.remove('active');
            }


        });

        dataset(body, 'view', '#' + view.id);
    });

    let collapsible;

    addEventListener('show.bs.collapse', () =>
    {
        body.classList.remove(...navbarEventTypes);
        body.classList.add('navbar-collapsing');
        NoScroll.enable(noScrollSavesPosition);
    });

    addEventListener('shown.bs.collapse', () =>
    {
        body.classList.remove(...navbarEventTypes);
        body.classList.add('navbar-shown');
    });

    addEventListener('hidden.bs.collapse', () =>
    {
        body.classList.remove(...navbarEventTypes);
        NoScroll.disable(noScrollSavesPosition);
    });



    addEventListener('click', e =>
    {

        let link, elem;

        if (link = e.target.closest('header [href^="#"], .scroll-down-button'))
        {
            e.preventDefault();

            if (elem = document.getElementById(link.getAttribute('href').slice(1)))
            {
                // burger button (mobile)
                if (link.closest('.navbar-shown'))
                {
                    collapsible ??= new Collapse('#navbarNav', {
                        toggle: false
                    });

                    addEventListener('hidden.bs.collapse', () =>
                    {
                        pills.scrollTo(elem.id);
                    }, { once: true });
                    collapsible.hide();
                } else
                {
                    pills.scrollTo(elem.id);
                }
            }
        }

    });

})();



// typed.js
(() =>
{
    Typed.of('[data-typed');

    if (!IS_TOUCH)
    {
        const cur = Cursor.of('#home');

        setTimeout(() =>
        {
            cur.destroy();
        }, 120000);
    }


})();



// contact form
(() =>
{
    function formNotify(type, message, delay = 3000)
    {

        return new Promise(resolve =>
        {
            const
                formAlert = document.querySelector('#form-alert'),
                msg = createElement('<div role="alert"/>', {
                    class: 'my-3 alert alert-' + type
                }, message);

            setTimeout(() =>
            {
                msg.remove();
                resolve(msg);
            }, delay);

            formAlert.appendChild(msg);
        });

    }

    addEventListener('submit', e =>
    {

        const form = e.target.closest('form.needs-validation');

        if (form)
        {
            let btn;
            if (btn = form.querySelector('[type="submit"]'))
            {
                btn.classList.add('disabled');
            }
        }

        if (e.target.closest('#contact form'))
        {
            e.preventDefault();

            if (form)
            {
                form.classList.add('was-validated');
                if (form.checkValidity())
                {


                    const formData = new URLSearchParams(new FormData(form));


                    fetch(form.action, {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData.toString()
                    }).then(resp =>
                    {
                        if (!resp.ok)
                        {
                            throw new Error(resp.statusText);
                        }


                        formNotify('success', 'Votre message à bien été envoyé.').then(() =>
                        {
                            form.classList.remove('was-validated');
                            form.reset();
                        });

                    }).catch(err =>
                    {

                        formNotify('danger', "Une erreur s'est produite: <em>" + err.message + "</em>").then(() =>
                        {
                            form.classList.remove('was-validated');
                            form.reset();
                        });
                    });

                }

            }
        }

    });

    function checkForm(e)
    {

        if (!e.target.closest('form.needs-validation input:not([type="submit"]), form.needs-validation textarea'))
        {
            return;
        }

        let form, btn;
        if ((form = e.target.closest('form.needs-validation')) && (btn = form.querySelector('[type="submit"]')))
        {
            btn.classList.add('disabled');
            if (form.checkValidity())
            {
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

(() =>
{

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
                slidesPerView: 1,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 60
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 80
            }
        },
    });

})();


// Compétences

(() =>
{

    const
        card = document.querySelector('#skills .card'),
        header = card.querySelector('.card-header'),
        skills = new Skills(TAG_ICONS, SKILLS);


    header.appendChild(skills.elements.tags.root);
    card.appendChild(skills.elements.list.root);

})();






// tooltips
(() =>
{
    [...document.querySelectorAll('[data-bs-toggle="tooltip"]')]
        .filter(elem => elem.matches('[title],[data-bs-title]'))
        .map(elem => new Tooltip(elem));
})();


// Age, Copyright
(() =>
{
    const
        date = new Date(),
        age = parseInt(Math.floor(
            date - (new Date('12/15/1982, 21:07'))) / (1000 * 60 * 60 * 24 * 365)
        );

    document.querySelectorAll('.age').forEach(elem => elem.innerHTML = `${age} ans`);
    document.querySelectorAll('.year').forEach(elem => elem.innerHTML = date.getFullYear());
})();
