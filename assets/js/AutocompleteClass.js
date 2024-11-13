class Autocomplete {
  constructor(inputElement, fieldName, url) {
    this.inputElement = inputElement;
    this.autocompleteResult = inputElement.parentNode.querySelector('.autocomplete-result');
    this.fieldName = fieldName;
    this.url = url;
  }

  search() {
    const inputElement = this.inputElement;
    const autocompleteResult = this.autocompleteResult;

    if (inputElement.value.length < 2) {
      return;
    }

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
    });

    return li;
  }

  cleanSearch() {
    const existingUl = this.autocompleteResult.querySelector('ul');
    if (existingUl) {
      existingUl.remove();
    }
  }
}