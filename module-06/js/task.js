'use strict'

let keyTrainer = {
  chars: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
}

keyTrainer.setCharCount = function () {
  do {
    let tmp = prompt('Введите количество символов','0');
    tmp = parseInt(tmp, 10);
    if (this.checkPositiveInteger(tmp)) {
      this.charCount = tmp;
      break;
    }
  } while (true);
  return this;
}

keyTrainer.checkPositiveInteger = function (num) {
  return !isNaN(num) && (num^0) === num && num > 0;
}

keyTrainer.createTask = function () {
  let arr = new Array(this.charCount);
  for (let i = 0; i < arr.length; i+=1) {
    arr[i] = this.chars[Math.floor(Math.random() * this.chars.length)];
  }
  this.task = arr;
  return this;
}

keyTrainer.startTask = function () {
  this.userInput = prompt(`Наберите строку "${this.task.join('')}"`, '');
  return this;
}

keyTrainer.checkTask = function () {
  let arrU = this.userInput.split('');
  let arrT = this.task;

  let maxLength =  Math.max(arrT.length, arrU.length);
  let arrErrors = new Array(maxLength);

  for (let i = 0; i < maxLength; i += 1) {
    arrErrors[i] = arrT[i] === arrU[i];
  }

  this.userErrors = arrErrors.filter((val) => val === false).length;
  console.log(arrErrors);
  return this;
}

keyTrainer.showResult = function () {
  console.log(`userErrors : ${this.userErrors}`);

  if (this.userErrors === 0) {
    alert ('Поздравляю! Вы не допустили ни одной ошибки!');
  } else {
    alert (`Вы допустили ${this.userErrors} ошибок. Желаю удачи в следующем упражнении.`);
  }
}

function run() {
  keyTrainer.setCharCount()
            .createTask()
            .startTask()
            .checkTask()
            .showResult();
}

run();
