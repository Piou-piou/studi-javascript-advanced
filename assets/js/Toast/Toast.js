class Toast {
  constructor() {
    this.template = `
        <div class="message"></div>
        <div class="close">X</div>
    `;
  }

  displayAll() {
    document.querySelectorAll('.toast').forEach((element) => {
      element.style.opacity = 1;
      this.addEventCloseToast(element, element.querySelector('.close'));
      this.closeToast(element);
    });
  }

  displayToast(type, message) {
    this.closeToasts();

    const toastDiv = this.createToastDivs(type, message);

    // display toast
    setTimeout((event) => {
      toastDiv.style.opacity = 1;
    }, 100);

    // remove toast
    this.closeToast(toastDiv);
  }

  createToastDivs(type, message) {
    const toastDiv = document.createElement('div');
    toastDiv.classList.add('toast');
    toastDiv.classList.add(type);
    toastDiv.innerHTML = this.template;

    toastDiv.querySelector('.message').innerText = message;

    this.addEventCloseToast(toastDiv, toastDiv.querySelector('.close'));

    document.body.append(toastDiv);

    return toastDiv;
  }

  closeToast(toastDiv, fromEvent = false) {
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

  addEventCloseToast(toastDiv, toastCloseDiv) {
    toastCloseDiv.addEventListener('click', (event) => {
      this.closeToast(toastDiv, true);
    });
  }

  closeToasts() {
    document.querySelectorAll('.toast').forEach((element) => {
      this.closeToast(element, true);
    });
  }
}