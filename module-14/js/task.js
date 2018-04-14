/* Создать две кнопки в HTML: start и stop.
Реализовать функционал таймера отсчета старта печати через функцию-конструктор со свойсвами startTime, stopTime и interval.
Добавить в prototype методы start и stop.
При нажатии на кнопку start, функция сохраняет момент нажатия в свойство startTime.
При нажатии на кнопку stop, функция сохраняет значение текущего момента времени в stopTime и записывает разницу между startTime и stopTime в interval.
При нажатии на stop, значение interval выводится в консоль.*/


'use strict'
const btnStart = document.querySelector('#btn_start');
const btnStop = document.querySelector('#btn_stop');

btnStart.addEventListener('click', btnStart_click);
btnStop.addEventListener('click', btnStop_click);

function Timer() {
  this.interval = '';
  this.startTime = '';
  this.endTime = '';
}

Timer.prototype.start = function() {
  this.startTime = Date.now();
}
Timer.prototype.stop = function() {
  this.stopTime = Date.now();
  this.interval = this.stopTime - this.startTime;
  console.log(this.interval);
}

Object.defineProperties(Timer.prototype, {
  'start': {enumerable: false},
  'stop': {enumerable: false}
});

const timer = new Timer();
console.log(timer);

function btnStart_click(event) {
  timer.start();
  btnStop.disabled = false;
}

function btnStop_click(event) {
  timer.stop();
  btnStop.disabled = true;
}