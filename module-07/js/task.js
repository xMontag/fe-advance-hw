"use strict"
const keyboard = {
  layouts: {
      en: {
          topRow: "qwertyuiop[]".split(''),
          middleRow: "asdfghjkl;'".split(''),
          bottomRow: "zxcvbnm,./".split('')
      },
      ru: {
          topRow: "йцукенгшщзхъ".split(''),
          middleRow: "фывапролджэ".split(''),
          bottomRow: "ячсмитьбю.".split('')
      },
      ua: {
          topRow: "йцукенгшщзхї".split(''),
          middleRow: "фівапролджє".split(''),
          bottomRow: "ячсмитьбю.".split('')
      }
  },
  langs: ['en', 'ru', 'ua'],
  currentLang: 'ua',

  createLayout: function() {
    const textHTML = Object.values(this.layouts[this.currentLang]).map(el => `
      <div class="keyboard-row">
        ${el.map(k => `<button class="keyboard-key">${k}</button>`).join('')}
      </div>
    `).join('');
    document.querySelector('.keyboard').innerHTML = textHTML;
  }
};

keyboard.createLayout();

