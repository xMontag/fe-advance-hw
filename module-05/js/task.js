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
  currentLang: '',

  getRandCharInAlph: function() {
    if (this.currentLang) {
      let arrLetters = [].concat(...Object.values(this.layouts[this.currentLang])).join('').replace(/[^A-Za-zА-Яа-яЁё]/g,'').split("");
      return arrLetters[Math.floor(Math.random() * arrLetters.length)];
    }
  }
};
//console.log(keyboard.getRandCharInAlph());

let numLang = enterLang();
// console.log(numLang);

if (numLang !== undefined) {
  keyboard.currentLang = keyboard.langs[numLang];
} else {
  throw "stop";
}

console.log(keyboard.currentLang);
console.log(keyboard.getRandCharInAlph());

function enterLang() {
  do {
    let numLang = prompt("en-0, ru-1, ua-2", "0");
    if (numLang !== null) {
      numLang = parseInt(numLang, 10);
      if (!isNaN(numLang) && numLang >= 0 && numLang <= 2) {
        return numLang;
      } else {
        alert ("Был выбран недоступный язык! Повторите выбор.");
      }
    } else {
      break;
    }
  } while (true);
}


