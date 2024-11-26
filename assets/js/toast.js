function displayToasts() {
  document.querySelectorAll('.toast').forEach((element) => {
    element.style.opacity = 1;
    addEventCloseToast(element, element.querySelector('.close'));
    closeToast(element);
  });
}

function displayToast(type, message) {
  closeToasts();

  const toastDiv = createToastDivs(type, message);

  // display toast
  setTimeout((event) => {
    toastDiv.style.opacity = 1;
  }, 100);

  // remove toast
  closeToast(toastDiv);
}

function createToastDivs(type, message)
{
  const toastDiv = document.createElement('div');
  toastDiv.classList.add('toast');
  toastDiv.classList.add(type);

  const toastMessageDiv = document.createElement('div');
  toastMessageDiv.classList.add('message');
  toastMessageDiv.innerText = message;

  const toastCloseDiv = document.createElement('div');
  toastCloseDiv.classList.add('close');
  toastCloseDiv.innerText = 'X';
  addEventCloseToast(toastDiv, toastCloseDiv);

  toastDiv.append(toastMessageDiv);
  toastDiv.append(toastCloseDiv);

  document.body.append(toastDiv);

  return toastDiv;
}

function addEventCloseToast(toastDiv, toastCloseDiv) {
  toastCloseDiv.addEventListener('click', (event) => {
    closeToast(toastDiv, true);
  });
}

function closeToast(toastDiv, fromEvent = false) {
  let opacityTime = 8000;
  let removeTime = 9000;
  if (true === fromEvent) {
    opacityTime = 0;
    removeTime = 500;
  }

  setTimeout((event) => {
    toastDiv.style.removeProperty('opacity');
  }, opacityTime);
  setTimeout((event) => {
    toastDiv.remove();
  }, removeTime);
}

function closeToasts() {
  document.querySelectorAll('.toast').forEach((element) => {
    closeToast(element, true);
  });
}

displayToasts();