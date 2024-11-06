const form = document.getElementById('voiture-create');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log(formData.get('immatriculation'))

  fetch('http://bootcamp.local/api/voiture/create', {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
  });
});