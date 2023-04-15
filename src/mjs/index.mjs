

const pages = Array.from(document.querySelectorAll('body > .page')), navPills = Array.from(document.querySelectorAll('.nav-pills a'));

let indexPage = 0, scrollLock = false;

function scrolltoId(elem) {
    let
        hash = (new URL(elem.href)).hash.slice(1),
        access = document.getElementById(hash),
        index = pages.indexOf(access);


    if (index > -1) {
        indexPage = index;
    }

    access && access.scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
}

addEventListener('click', e => {

    let target;

    if (target = e.target.closest('.nav-pills a')) {
        e.preventDefault();
        scrolltoId(target);
        target.closest('ul').querySelectorAll('li').forEach(elem => elem.classList.remove('active'));
        target.closest('li').classList.add('active');
    }


});


addEventListener('wheel', e => {
    //e.preventDefault();
    if (scrollLock) {
        return;
    }

    scrollLock = true;

    let scrollTop = e.wheelDelta > 0, oldIndex = indexPage;

    indexPage += scrollTop ? -1 : 1;

    indexPage = Math.max(0, Math.min(pages.length - 1, indexPage));

    if (indexPage !== oldIndex) {

        const elem = navPills[indexPage];


        //elem.scrollIntoView({ behavior: 'smooth', block: scrollTop ? "end" : "start", inline: "start" });

        elem.click();

    }

    scrollLock = false;

}, { passive: false });



console.debug(pages);