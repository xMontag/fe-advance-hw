/*
+Создать две кнопки в HTML: start и stop.
+Создать класс Timer с полями startTime, stopTime и interval. Создать несколько экземпляров класса с разными значениями свойств, вывести их в консоль.
+Для класса Timer создать методы start и stop, getTime.
+Создать экземпляр класса Timer, пусть он называется stopwatch.
+При нажатии на кнопку start, метод stopwatch.start сохраняет момент нажатия в свойство startTime.
+При нажатии на кнопку stop, метод stopwatch.stop сохраняет значение текущего момента времени в stopTime и записывает разницу между startTime и stopTime в interval. А метод stopwatch.getTime возвращает значение поля interval, которое необходимо вывести в консоль.
+Для класса Timer создать статический метод timeToNY который возвращает кол-во дней от сегодня и до Нового Года.
*/


'use strict'
const btnStart = document.querySelector('#btn_start');
const btnStop = document.querySelector('#btn_stop');

btnStart.addEventListener('click', btnStart_click);
btnStop.addEventListener('click', btnStop_click);

class Timer {
  constructor(startTime, endTime, interval) {
    this.interval = startTime || 0;
    this.startTime = endTime || 0;
    this.endTime = interval || 0;
  }
  start() {
    this.startTime = Date.now();
  }
  stop() {
    this.stopTime = Date.now();
    this.interval = this.stopTime - this.startTime;
  }
  getTime() {
    return this.interval;
  }
  static timeToNY() {
    const today = new Date();
    const endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
    const timeLeft = endYear.getTime() - today.getTime();
    return Math.floor(timeLeft / 1000 / 60 / 60 / 24);
  }
}

const timer1 = new Timer(20, 50, 30);
const timer2 = new Timer(100, 400, 300);
const timer3 = new Timer(350, 450, 100);

console.log(timer1);
console.log(timer2);
console.log(timer3);

const stopwatch = new Timer();
console.log(stopwatch);
console.log(Timer.timeToNY());

function btnStart_click(event) {
  stopwatch.start();
  btnStop.disabled = false;
}

function btnStop_click(event) {
  stopwatch.stop();
  btnStop.disabled = true;
  console.log(stopwatch.getTime());
}