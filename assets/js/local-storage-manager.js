import LocalStorageManager from "./Storage/LocalStorageManager.js";
import SessionStorageManager from "./Storage/SessionStorageManager.js";

const localStorageManager = new LocalStorageManager();
const sessionStorageManager = new SessionStorageManager();

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('click', (event) => {
    localStorageManager.addValue('history_input', event.currentTarget.name);
    sessionStorageManager.addValue('history_input', event.currentTarget.name);
  });
});


console.log(localStorageManager.get('user_token'))

localStorageManager.removeValue('history_input', 1);