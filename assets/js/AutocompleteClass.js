class Autocomplete {
  constructor(inputElement, fieldName, url) {
    this.inputElement = inputElement;
    this.fieldName = fieldName;
    this.url = url;
  }

  search() {
    const inputElement = this.inputElement;

    if (inputElement.value.length < 2) {
      return;
    }

    this.createResultDiv(inputElement.parentElement);
    const autocompleteResult = this.autocompleteResult;

    const formData = new FormData();
    formData.append(this.fieldName, inputElement.value);

    setTimeout(async () => {
      await fetch(this.url, {
        headers: new Headers(),
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(response => {
        this.cleanSearch();

        const ul = document.createElement('ul');

        for (let data of response.data) {
          ul.append(this.addSearchResult(data));
        }

        autocompleteResult.append(ul);
        autocompleteResult.classList.add('active');
      });
    }, 900)
  }

  addSearchResult(data) {
    const li = document.createElement('li');
    li.innerText = data[this.fieldName];
    li.dataset[this.fieldName] = data[this.fieldName];

    li.addEventListener('click', (event) => {
      const target = event.currentTarget;
      this.inputElement.value = target.dataset[this.fieldName];

      this.autocompleteResult.classList.remove('active');

      setTimeout(() => {
        this.autocompleteResult.remove();
      }, 600);
    });

    return li;
  }

  createResultDiv(parentDiv) {
    if (parentDiv.querySelector('.autocomplete-result')) {
      return;
    }

    const div = document.createElement('div');
    div.classList.add('autocomplete-result');

    parentDiv.append(div);

    this.autocompleteResult = div;
  }

  cleanSearch() {
    const existingUl = this.autocompleteResult.querySelector('ul');
    if (existingUl) {
      existingUl.remove();
    }
  }
}