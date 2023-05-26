

export class DarkModeButton {


    enable() {
        this.enabled = true;
        this.body.dataset['bsTheme'] = 'dark';
    }


    disable() {
        this.enabled = false;
        delete this.body.dataset['bsTheme'];
    }





    get enabled() {
        let value = localStorage.getItem('darkmode');
        if (null !== value) {
            return value === 'true';
        }
    }
    set enabled(toggle) {
        localStorage.setItem('darkmode', toggle === true ? "true" : "false");
    }

    constructor() {
        const checkbox = this.checkbox = document.getElementById('darkmode');

        this.body = document.body;

        let savedValue = localStorage.getItem('darkmode');


        if (!matchMedia('(prefers-color-scheme: dark)').matches) {
            if ('true' === savedValue) {
                this.enable();
            } else if ('false' === savedValue) {
                this.disable();
            }
        }




        checkbox.checked = this.enabled;

        checkbox.addEventListener('change', e => {
            //e.preventDefault();

            if (checkbox.checked === true) {
                this.enable();
            }
            else {
                this.disable();
            }
        });
    }






}



export default DarkModeButton;