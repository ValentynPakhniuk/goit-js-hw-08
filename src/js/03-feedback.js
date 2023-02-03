
import throttle  from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

const LOCALSTORAGE_KEY = "feedback-form-state";

inputValue();

form.addEventListener("submit", saveValue);
form.addEventListener('input', throttle(formInput, 500));

function formInput(event) {
  let stringFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  stringFormData = stringFormData ? JSON.parse(stringFormData) : {};
  stringFormData[event.target.name] = event.target.value; 
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(stringFormData));
}

function saveValue(event) {
  event.preventDefault();
  let stringFormData = localStorage.getItem(LOCALSTORAGE_KEY);
  stringFormData = JSON.parse(stringFormData);
  if (input.value === '' || textarea.value === '') {
    alert('Всі поля повинні бути заповнені!');
  } else {
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log("stringFormData", stringFormData);
  }
}

function inputValue() {
  let stringFormData = localStorage.getItem(LOCALSTORAGE_KEY);

  if (stringFormData) {
    stringFormData = JSON.parse(stringFormData);
    Object.entries(stringFormData).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}


