
import throttle  from "lodash.throttle";

const form = document.querySelector(".feedback-form");
const input = document.querySelector("input");
const textarea = document.querySelector("textarea");

const LOCALSTORAGE_KEY = "feedback-form-state";
const stringFormData = localStorage.getItem(LOCALSTORAGE_KEY);
let parsedFormData = JSON.parse(stringFormData) || {};
inputValue();

form.addEventListener("submit", saveValue);
form.addEventListener('input', throttle(formInput, 500));

function formInput(event) {
  parsedFormData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(parsedFormData));
}

function saveValue(event) {
  event.preventDefault();

  if (input.value === '' || textarea.value === '') {
    alert('Всі поля повинні бути заповнені!');
  } else {
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log("parsedFormData", parsedFormData);
    parsedFormData = {};
  }
}

function inputValue() {
  
  if (parsedFormData) {
    input.value = parsedFormData.email || "";
    textarea.value = parsedFormData.message || "";
  }
}


