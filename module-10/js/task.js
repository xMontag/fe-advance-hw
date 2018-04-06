/*
  Создать компонент счетчика времени.
  
  Простой прямоугольник который показывает время
  со старта упражения и до того момента когда все
  клавиши были верно нажаты.
  
  На входе есть строка символов для упражнения.
  
  Написать метод countKPS() который,по окончанию упражнения,
  возвращает кол-во верных клавишь в секунду которое было нажато за
  время выполнения упражнения.
  
  Записать результат в localStorage, но только в том случае если
  он лучше чем тот что уже есть в localStorage.
  
  При повторном посещении страницы надо брать то что записано
  в localStorage и вешать на страницу, это будет компонент
  лучшего результата.
*/

// дается строка и от первого нажатия до посленего
// правильного набранного знака считать время
'use strict'
//const lang = "qwerty";
//const string = "qryte";
//const charsArr = string.split("").reverse();
//const timerOutput = document.querySelector(".timer");
const exercise = {
  status: "stop",

  countKPS: function (time) {
    const currentResultEl = document.querySelector(".current-result_val");
    const bestResultEl = document.querySelector(".best-result_val");
    const currentResult = Math.round((this.word.chars.length / (timer.time / 1000)) * 1000) / 1000;
    let bestResult = localStorage.getItem('bestResult') ? parseFloat(localStorage.getItem('bestResult')) : 0;
    console.log(bestResult, currentResult);
    if (currentResult > bestResult) {
      bestResult = currentResult;
      localStorage.setItem('bestResult', bestResult.toFixed(3));
      bestResultEl.innerHTML = bestResult.toFixed(3);
    }
    currentResultEl.innerHTML = currentResult.toFixed(3);
  },

  onKeyDown: function (event) {
    if (this.status === "stop") {
      this.run();
    }
    if (event) {
      const char = event.key;
      if (this.word.checkChar(event.key)) {
        this.word.corectChar();
        if (this.word.currentIndexChar >= this.word.chars.length - 1) {
          this.stop();
          this.word.clearChar();
          this.word.nextWord();
          this.word.insertWord();
          console.log(this.word.chars, this.word.currentWord);
        } else {
          this.word.nextChar();
        }
      } else {
        this.word.incorectChar();
      }
    }
  },
  run: function () {
    this.status = "start";
    timer.reset();
    timer.start();
  },
  stop: function () {
    this.status = "stop";
    timer.stop();
    this.countKPS(timer.time);
  },

  word: {
    words: ["dragonfly", "antelope", "butterfly", "ram", "badger", "squirrel", "polar bear", "beaver", "ladybird", "bull"],
    currentWord: "",
    chars: "",
    currentIndexChar: 0,
    wordContainer: document.querySelector(".word"),
    wordTmpl: document.querySelector("#word-tmpl"),
    charContainers: [],
    nextWord: function() {
      this.currentIndexChar = 0;
      this.currentWord = this.words[Math.floor(Math.random() * (this.words.length - 1))];
      this.chars = this.currentWord.split('').map(char => char === ' ' ? "_" : char);
    },
    insertWord: function() {
      const template = Handlebars.compile(this.wordTmpl.innerHTML);
      const html = template(this.chars);
      this.wordContainer.innerHTML = html;
      this.charContainers = Array.from(this.wordContainer.children);
    },
    checkChar: function(char) {
      return char === this.chars[this.currentIndexChar].replace('_', ' ');
    },
    nextChar: function() {
      if (this.currentIndexChar + 1 > this.chars.length - 1) {
        this.currentIndexChar = 0;
        this.nextWord();
      } else {
        this.currentIndexChar += 1;
      }
    },
    corectChar: function() {
      
      if (this.charContainers[this.currentIndexChar].classList.contains("word__char_incorrect")) {
        this.charContainers[this.currentIndexChar].classList.remove("word__char_incorrect");
      }
      if (!this.charContainers[this.currentIndexChar].classList.contains("word__char_correct")) {
        this.charContainers[this.currentIndexChar].classList.add("word__char_correct");
      }
      //console.log(this.charContainers[this.currentIndexChar]);
    },
    incorectChar: function() {
      
      if (!this.charContainers[this.currentIndexChar].classList.contains("word__char_incorrect")) {
        this.charContainers[this.currentIndexChar].classList.add("word__char_incorrect");
      }
      //console.log(this.charContainers[this.currentIndexChar]);
    },
    clearChar: function() {
      this.charContainers.map(el => {
        if (el.classList.contains("word__char_incorrect")) {
          el.classList.remove("word__char_incorrect");
        }
        if (el.classList.contains("word__char_correct")) {
          el.classList.remove("word__char_correct");
        }
      });
    }
  }
};

const timer = {
  status: "stop",
  id: "",
  startTime: "",
  time: "",
  timerContainer: document.querySelector(".timer"),
  start: function () {
    this.startTime = Date.now();
    this.id = setInterval(this.tick.bind(timer), 120);
  },
  stop: function () {
    clearInterval(this.id);
    this.time = Date.now() - this.startTime;
    this.insertTime(this.time);
  },
  reset: function () {
    this.insertTime(0);
  },
  tick: function () {
    const time = Date.now() - this.startTime;
    this.insertTime(time);
  },
  insertTime: function (time) {
    const min = Math.floor((time / 1000 / 60) % 60);
    const sec = Math.floor((time / 1000) % 60);
    const msec = time % 1000;
    this.timerContainer.textContent = `${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}:${msec > 99 ? msec : msec > 9 ? '0' + msec : '00' + msec}`;
  }
};

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

