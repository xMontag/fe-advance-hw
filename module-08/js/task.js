/*
 Напишите скрипт который реализует следующее поведение:
 
+ - При нажатии на клавишу (не виртуальной клавиатуры) должно 
  обрабатываться событие keydown.
  (Для обработки нажатия нажатия клавиш, повесьте слушателя на window.
  window.addEventListener("keydown", callback);)
 
+ - Должны обрабатываться только те клавиши, которые присутствуют
  в разметке HTML (на виртуальной клавиатуре).
 
+ - Звук нажатия на клавишу должен соответсвовать ноте, описанной 
  в атрибуте button data-note.

+ - Подсветку текущей клавиши реализуйте с помощью класса
  keyboard__btn--active.
 
+ - Чекбокс Sound должен включать и выключать звук нажатия на клавиши.   
*/

const playSound = note => {
  const audio = document.querySelector(`audio[data-note=${note}]`);
  audio.currentTime = 0;
  audio.play(); 
};

const soundTogle = () => {
  const checkbox = document.querySelector("#slideThree");
  checkbox.checked = !checkbox.checked;
};

const btnOnKeyDown = event => {
  if (keys[event.key]) {
    activeBtn.removeClass('keyboard__btn--active');
    keys[event.key].classList.add('keyboard__btn--active');
    if (document.querySelector("#slideThree").checked) {
      playSound(keys[event.key].getAttribute('data-note'));
    }
    activeBtn.node = keys[event.key];
  } else {
    activeBtn.removeClass('keyboard__btn--active');
  }
};

const keyboard = document.querySelector('.keyboard');
const soundLabel = document.querySelector(".slideThree>span");

// const buttons = Array.from(document.querySelectorAll("button"));
// const keys = "qwertyuiop[]asdfghjkl;'zxcvbnm,./ ".split("");
const keys = {};
Array.from(document.querySelectorAll(".keyboard__btn")).forEach(btn => keys[btn.textContent.replace('space', ' ')] = btn);

// console.log(keys);
window.addEventListener("keydown", btnOnKeyDown);
soundLabel.addEventListener("click", soundTogle);

const activeBtn = {
  node: null,
  removeClass (classStr) {
    if (this.node && this.node.matches('.'+classStr)) {
      this.node.classList.remove(classStr);
    }
  }
};