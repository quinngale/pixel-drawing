const PIXEL = {
    CLASS: {
        ON: 'has-background-dark',
        OFF: 'has-background-light',
        DISABLED: 'has-background-white'
    }, DATA: {
        X: 'data-x',
        Y: 'data-y',
        VALUE: 'data-value'
    }
}

const EVENT = {
    CHANGE: new Event('change')
}

SELECTORS = {
    PIXELS: '#pixel-canvas',
    FORM: '#form'
}

window.onload = e => {

    const pixels = document.querySelector(SELECTORS.PIXELS);
    const pixelForm = document.querySelector(SELECTORS.FORM);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const output = document.querySelector('#output');
    const copy = document.querySelector('#copy');

    const onclick_pixel = e => {
        const target = e.target;

        let value = parseInt(target.getAttribute(PIXEL.DATA.VALUE));

        value = value ? 0 : 1;
        target.setAttribute(PIXEL.DATA.VALUE, value);

        if (value) {
            target.classList.remove(PIXEL.CLASS.OFF);
            target.classList.add(PIXEL.CLASS.ON);
        } else {
            target.classList.remove(PIXEL.CLASS.ON);
            target.classList.add(PIXEL.CLASS.OFF);
        }

        pixelForm.dispatchEvent(EVENT.CHANGE);
    }

    const onclick_copy = e => {
        navigator.clipboard.writeText(output.value);
    }

    const onchange_form = e => {
        let width = parseInt(e.currentTarget.width.value);
        let height = parseInt(e.currentTarget.height.value);

        context.canvas.width = width;
        context.canvas.height = height;

        console.dir(context);

        for (let pixel of pixels.children) {
            const x = parseInt(pixel.getAttribute(PIXEL.DATA.X));
            const y = parseInt(pixel.getAttribute(PIXEL.DATA.Y));
            const value = parseInt(pixel.getAttribute(PIXEL.DATA.VALUE));

            if (x < width && y < height) { // Within bounds
                if ([...pixel.classList].includes(PIXEL.CLASS.DISABLED)) {
                    pixel.classList.remove(PIXEL.CLASS.DISABLED);
                }

                if (parseInt(pixel.getAttribute(PIXEL.DATA.VALUE))) {
                    pixel.classList.add(PIXEL.CLASS.ON);
                } else {
                    pixel.classList.add(PIXEL.CLASS.OFF);
                }

                pixel.onclick = onclick_pixel;

                context.fillStyle = value ? '#000' : '#fff';
                context.fillRect(x, y, 1, 1);

                const data = canvas.toDataURL();
                output.value = data;
            } else {
                pixel.classList.remove(PIXEL.CLASS.OFF);
                pixel.classList.remove(PIXEL.CLASS.ON);
                pixel.classList.add(PIXEL.CLASS.DISABLED);

                pixel.onclick = undefined;
            }
        }

        e.preventDefault();
    }

    const onreset_form = e => {
        for (let pixel of pixels.children) {
            pixel.setAttribute(PIXEL.DATA.VALUE, 0);
            pixel.classList.remove(PIXEL.CLASS.ON);
            pixel.classList.remove(PIXEL.CLASS.OFF);
            pixel.classList.remove(PIXEL.CLASS.DISABLED);
        }

        pixelForm.dispatchEvent(EVENT.CHANGE)

        e.preventDefault();
    }


    const init = () => {
        const pixelFragment = document.createDocumentFragment();

        for (let y = 0; y < 16; y++) {
            for (let x = 0; x < 16; x++) {
                let pixel = document.createElement('div');

                pixel.classList.add('pixel', PIXEL.CLASS.OFF);

                pixel.setAttribute(PIXEL.DATA.Y, y);
                pixel.setAttribute(PIXEL.DATA.X, x);
                pixel.setAttribute(PIXEL.DATA.VALUE, 0);

                pixel.onclick = onclick_pixel;

                pixelFragment.append(pixel);
            }
        }

        pixels.append(pixelFragment);
    }

    init();

    pixelForm.onchange = onchange_form;
    pixelForm.onreset = onreset_form;

    copy.onclick = onclick_copy;

    pixelForm.dispatchEvent(EVENT.CHANGE);
}