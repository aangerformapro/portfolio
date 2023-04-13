

function scrolltoId(elem) {
    let
        hash = (new URL(elem.href)).hash.slice(1),
        access = document.getElementById(hash);


    console.debug(access, hash);
    access && access.scrollIntoView({ behavior: 'smooth' }, true);
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