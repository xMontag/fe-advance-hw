'use strict'

import Handlebars from '../../../node_modules/handlebars/dist/handlebars.min.js';
import timer from './timer.js';

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

export default exercise;