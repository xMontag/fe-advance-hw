/*
  Написать скрипт который собирает 3 строки клавиатуры
  и клавишу "пробел" из шаблона по заданому объекту.
  
  Для зарендереной клавиатуры реализовать поведение из
  модуля 8, подсветка нажатой клавиши, отображение символа итд.
*/
'use strict'

const lang = {
  en: "qwertyuiop[]asdfghjkl;'zxcvbnm,./",
  ru: "йцукенгшщзхъфывапролджэячсмитьбю.",
  ua: "йцукенгшщзхїфівапролджєячсмитьбю."
}

function Keyboard(lang) {
  this.lang = lang;

  this.rowsKeys = (function () {
    const rowsKeys = {};
    Object.keys(lang).map(el => rowsKeys[el] = [lang[el].split('').slice(0, 12), lang[el].split('').slice(12, 23), lang[el].split('').slice(23, 33), lang[el].split('').slice(33)]);
    return rowsKeys;
  })();

  this.currentLang = 'en';

  this.activeBtn = {
    node: null,
    removeClass(classStr) {
      if (this.node && this.node.matches('.' + classStr)) {
        this.node.classList.remove(classStr);
      }
    }
  };

  this.btns = {};

  //обработка нажатия клавиши
  this.onKeyDown = (event) => {
    // при первом нажатии клавиши асоциируем символ c элементом DOM клавиши
    if (!this.btns.hasOwnProperty(this.currentLang)) {
      this.btns[this.currentLang] = {};
      document.querySelectorAll('.keyboard-key').forEach(el => this.btns[this.currentLang][el.textContent === '' ? " " : el.textContent] = el);
      //console.log(event.key);
    }
    
    if (this.btns[this.currentLang][event.key]) {
      //console.log(this.btns[this.currentLang][event.key]);
      //console.log(event.key);
      this.activeBtn.removeClass('keyboard-key--pressed');
      this.btns[this.currentLang][event.key].classList.add('keyboard-key--pressed');
      this.activeBtn.node = this.btns[this.currentLang][event.key];
      this.printKeyChar(event.key);
      const audio = document.querySelector('.sound-checkbox');
      if (audio && audio.checked) playSound(this.btns[this.currentLang][event.key]);
    } else {
      this.activeBtn.removeClass('keyboard-key--pressed');
    }
  };

  // обработчик клика
  this.onClick = (event) => {
    //console.log(event);
    if (event.target && event.target.matches(".keyboard-key")) {
      event.target.blur();
      event.target.classList.add("keyboard-key--pressed");
      if (this.activeBtn.node && this.activeBtn.node !== event.target) this.activeBtn.removeClass('keyboard-key--pressed');
      this.activeBtn.node = event.target;
      this.printClickPosition(event.clientX, event.clientY);
      this.printKeyChar(event.target.textContent === '' ? ' ' : event.target.textContent);
      const audio = document.querySelector('.sound-checkbox');
      if (audio && audio.checked) playSound(event.target);
    } else {
      this.activeBtn.removeClass('keyboard-key--pressed');
    }
  };

  // вывод на экран символа нажатой клавиши
  this.printKeyChar = (char) => {
    document.querySelector('.key-pressed').textContent = char.replace(' ', 'space');
  }

  //вывод на экран координат клика
  this.printClickPosition = (x, y) => {
    document.querySelector('.x-position').textContent = x;
    document.querySelector('.y-position').textContent = y;
  }

  //вставка клавиатуры на страницу
  this.insert = (tmpl, block) => {
    const source = document.querySelector(tmpl).innerHTML;
    const template = Handlebars.compile(source);
    const html = template(this.rowsKeys[this.currentLang]);
    document.querySelector(block).innerHTML = html;
  }
}

const playSound = (elem) => {
  const n = [].indexOf.call(elem.parentNode.children, elem);
  //console.log(n);
  const notes = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
  const audio = document.querySelector(`audio[data-note=${notes[n % notes.length]}]`);
  //console.log(notes[n % notes.length]);
  audio.currentTime = 0;
  audio.play();
};

let keyboard = new Keyboard(lang);

keyboard.insert('#keyboard-tmpl', '.keyboard');
window.addEventListener('keydown', keyboard.onKeyDown);
document.querySelector('.keyboard').addEventListener('click', keyboard.onClick);

