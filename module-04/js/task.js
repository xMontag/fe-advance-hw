const alphabet = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";

let keyboard = addKeyboardLayout(alphabet);

console.log(keyboard);
console.log(getRandCharInRow(3));
console.log(getRandCharInAlph());

function addKeyboardLayout(alphabet) {
  let keyboard = [
    alphabet.slice(0,alphabet.indexOf("a")).split(""),
    alphabet.slice(alphabet.indexOf("a"),alphabet.indexOf("z")).split(""),
    alphabet.slice(alphabet.indexOf("z")).split("")
  ];
  return keyboard;
}

function getRandCharInRow(row) {
  let arrLetters = getArrLetters(keyboard[row - 1]);
  return arrLetters[Math.floor(Math.random() * arrLetters.length)];
}

function getRandCharInAlph() {
  let arrLetters = getArrLetters([].concat(...keyboard));
  return arrLetters[Math.floor(Math.random() * arrLetters.length)];
}

function getArrLetters(arr) {
  return arr.join('').replace(/[^A-Za-zА-Яа-яЁё]/g,'').split("");
}
