'use strict'
import Keyboard from './keyboard.js';

import exercise from './exercise.js';


const settings = {
    'keyboardTmplSelector': '#keyboard-tmpl',
    'keyboardContainerSelector': '.keyboard'
}



function ktrainer() {
    const keyboard = new Keyboard();
    keyboard.insert(settings.keyboardTmplSelector, settings.keyboardContainerSelector);
    window.addEventListener('keydown', keyboard.onKeyDown);
    window.addEventListener("click", keyboard.removeClassActiveBtn);
    document.querySelector('.keyboard').addEventListener('click', keyboard.onClick);

    function pageOnLoad() {
        exercise.word.nextWord();
        exercise.word.insertWord();
        const bestResultEl = document.querySelector(".best-result_val");
        if (localStorage.getItem('bestResult')) {
            bestResultEl.innerHTML = localStorage.getItem('bestResult');
        }
    };

    window.addEventListener('keydown', exercise.onKeyDown.bind(exercise));
    window.onload = pageOnLoad;
}

export default ktrainer;