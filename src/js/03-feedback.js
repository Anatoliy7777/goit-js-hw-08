import throttle from 'lodash.throttle';
const STORAGE_KEY = 'message';

const ref = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const { form, input, textarea } = ref;

populateTextMessage();

form.addEventListener('input', throttle(onTextareaInput, 500));
form.addEventListener('submit', onFormSubmit);

function onTextareaInput() {
  let feedbackForm = {
    email: input.value,
    textarea: textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}

function onFormSubmit(e) {
  e.preventDefault();

  const inputEmail = e.currentTarget.elements.email.value;
  const inputTextarea = textarea.value;

  if (!inputEmail || !inputTextarea) {
    alert('Вы заполнили не все поля');
    return;
  }

  const options = {
    email: inputEmail,
    textarea: inputTextarea,
  };

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextMessage() {
  const saveData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saveData) {
    input.value = saveData.email;
    textarea.value = saveData.textarea;
  }
}
