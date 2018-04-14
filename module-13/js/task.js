/*
  Соединить задание 1 и 2
  
  Напишите функцию validate которая проверяет все поля формы 
  и возвращает результат в виде обьекта со свойствами firstname,
  lastname и tel.
  
  Кроме того, формат объекта: в свойства записывается буль-флаг 
  уведомляющий о статусе прохождения валидации для поля.
  
  При клике на кнопку submit должна происходить проверка.
  
  Визуализировать результат проверки.
    Написать функцию showResults(results), которая принимает
    один аргумент results - объект такого формата который возвращает
    функция validate, и создает html разметку по результатам
    этого объекта.
  
    showResults добавляет в список с классом .results 
    (уже есть в html), li для каждого поля формы. В li записать:
    SUCCESS: 'имя поля' passed validation
    ERROR: 'имя поля' failed validation
  
    Для li с положительным результатом дать класс success, 
    с отрицательным error.
*/

const firstname = document.getElementById("first_name");
const lastname = document.getElementById("last_name");
const tel = document.getElementById("tel");
const submitBtn = document.getElementById("submit-btn");
const resultsList = document.querySelector(".results");

submitBtn.addEventListener("click", validate);

function validate(evt) {
  evt.preventDefault();

  const res = {
    'firstName': '',
    'lastName': '',
    'tel': ''
  }

  res.firstName = {
    'name': 'First name',
    'value': firstname.value,
    'validate': (/^[A-zА-яёЁ]+(\s[A-zА-яёЁ]+){0,2}$/.test(firstname.value))
  }

  res.lastName = {
    'name': 'Last name',
    'value': lastname.value,
    'validate': (/^[A-zА-яёЁ]+((\s*-\s*|\s+)[A-zА-яёЁ]+)?$/.test(lastname.value))
  }

  res.tel = {
    'name': 'Tel number',
    'value': '',
    'validate': (/^\+\d[\s-]*(\d[\s-]*){10}\d$/.test(tel.value))
  }

  if (res.tel.validate) {
    const d = tel.value.replace(/[^0-9]/g, '').split('');
    res.tel.value = `tel +${d[0]}${d[1]}${d[2]} ${d[3]}${d[4]} ${d[5]}${d[6]} ${d[7]}${d[8]} ${d[9]}${d[10]}${d[11]}`;
  } else {
    res.tel.value = tel.value;
  }
  showResults(res);
}

function showResults(results) {
  let html = '';
  Object.values(results).map(el => {
    html += el.validate ? `<li class="success">SUCCESS: ${el.name} passed validation</li>` : `<li class="error">ERROR: ${el.name} failed validation</li>`;
  });
  resultsList.innerHTML = html;
  console.log(results);
}
