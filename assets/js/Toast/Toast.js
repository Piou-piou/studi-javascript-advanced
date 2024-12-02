class Toast {
  static #template = `
    <div class="message"></div>
    <div class="close">X</div>
  `;

  static displayAll() {
    document.querySelectorAll('.toast').forEach((element) => {
      element.style.opacity = 1;
      this.#addEventClose(element, element.querySelector('.close'));
      this.close(element);
    });
  }

  static display(type, message) {
    this.closeAll();

    const toastDiv = this.#createDivs(type, message);

    // display toast
    setTimeout((event) => {
      toastDiv.style.opacity = 1;
    }, 100);

    // remove toast
    this.close(toastDiv);
  }

  static closeAll() {
    document.querySelectorAll('.toast').forEach((element) => {
      this.close(element, true);
    });
  }

  static close(toastDiv, fromEvent = false) {
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

  static #createDivs(type, message) {
    const toastDiv = document.createElement('div');
    toastDiv.classList.add('toast');
    toastDiv.classList.add(type);
    toastDiv.innerHTML = this.#template;

    toastDiv.querySelector('.message').innerText = message;

    this.#addEventClose(toastDiv, toastDiv.querySelector('.close'));

    document.body.append(toastDiv);

    return toastDiv;
  }

  static #addEventClose(toastDiv, toastCloseDiv) {
    toastCloseDiv.addEventListener('click', (event) => {
      this.close(toastDiv, true);
    });
  }
}