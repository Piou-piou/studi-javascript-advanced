class Autocomplete {
  constructor() {
    document.querySelectorAll('[data-autocmplete]').forEach((element) => {
      element.addEventListener('keyup', (event) => {
        if (event.key !== 'Shift') {
          this.search(element, element.dataset.autocompleteFieldName ?? element.id, element.dataset.autocompleteUrl);
        }
      });
    });
  }

  search(inputElement, fieldName, url) {
    if (inputElement.value.length < 2) {
      return;
    }

    const autocompleteResult = this.createResultDiv(inputElement.parentElement);

    const formData = new FormData();
    formData.append(fieldName, inputElement.value);

    setTimeout(async () => {
      await fetch(url, {
        headers: new Headers(),
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(response => {
        this.cleanSearch(autocompleteResult);

        const ul = document.createElement('ul');

        for (let data of response.data) {
          ul.append(this.addSearchResult(inputElement, fieldName, autocompleteResult, data));
        }

        autocompleteResult.append(ul);
        autocompleteResult.classList.add('active');
      });
    }, 900)
  }

  addSearchResult(inputElement, fieldName, autocompleteResultDiv, data) {
    const li = document.createElement('li');
    li.innerText = data[fieldName];
    li.dataset[fieldName] = data[fieldName];

    li.addEventListener('click', (event) => {
      const target = event.currentTarget;
      inputElement.value = target.dataset[fieldName];

      autocompleteResultDiv.classList.remove('active');

      setTimeout(() => {
        autocompleteResultDiv.remove();
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

    return div;
  }

  cleanSearch(autocompleteResult) {
    const existingUl = autocompleteResult.querySelector('ul');
    if (existingUl) {
      existingUl.remove();
    }
  }
}