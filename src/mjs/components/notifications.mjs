import { isFunction } from '../helpers/utils.mjs';
import './notifications.css';
import "izitoast";



export function toast(message, title, method = 'info') {

    return new Promise(resolve => {
        if (isFunction(iziToast[method])) {
            iziToast[method](
                Object.assign({}, toast.options, {
                    message,
                    title: title ?? '',
                    onClosed() {
                        resolve(toast);
                    }
                })
            );
        }

    });

};



toast.title = document.title || '';
toast.options = {
    zindex: 2147483647,
    image: null,
    imageWidth: 48,
    layout: 2,
    closeOnClick: true,
    closeOnEscape: true
};



export const
    success = async (message, title) => await toast(message, title, 'success'),
    error = async (message, title) => await toast(message, title, 'error'),
    notice = async (message, title) => await toast(message, title, 'info'),
    warn = async (message, title) => await toast(message, title, 'warning');

Object.assign(toast, { success, error, notice, warn });

export default toast;