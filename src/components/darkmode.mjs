import EventManager from "../helpers/event-manager.mjs";


export class DarkModeButton
{


    enable()
    {
        this.enabled = true;

    }


    disable()
    {
        this.enabled = false;

    }


    #media;

    isMediaEnabled()
    {
        return this.#media.matches;
    }

    get enabled()
    {
        let value = localStorage.getItem('darkmode');
        if (null !== value)
        {
            return value === 'true';
        }
        return false;
    }
    set enabled(toggle)
    {

        let current = toggle === true;

        localStorage.setItem('darkmode', current ? "true" : "false");


        this.trigger(
            'change ' + (current ? 'enabled' : 'disabled'),
            { toggle: this, enabled: current }
        );



    }

    constructor()
    {
        const checkbox = this.checkbox = document.getElementById('darkmode');

        this.body = document.body;

        EventManager.mixin(this);

        let savedValue = localStorage.getItem('darkmode');

        this.#media = matchMedia('(prefers-color-scheme: dark)');

        this.#media.addEventListener('change', e =>
        {
            this.trigger('update', { toggle: this, enabled: e.matches });
            this.enabled = e.matches;
        });



        checkbox.addEventListener('change', e =>
        {
            //e.preventDefault();

            if (checkbox.checked === true)
            {
                this.enable();
            }
            else
            {
                this.disable();
            }
        });


        this.on('change', e =>
        {

            let { enabled } = e.data;

            checkbox.checked = enabled ? true : null;

            if (enabled)
            {
                this.body.dataset['bsTheme'] = 'dark';
            } else
            {
                delete this.body.dataset['bsTheme'];
            }

        });



        if ('true' === savedValue)
        {
            this.enable();
        } else if ('false' === savedValue)
        {
            this.disable();
        }
        else
        {
            this.enabled = this.#media.matches;
        }

        checkbox.checked = this.enabled;
    }






}



export default DarkModeButton;