const form = document.getElementById('voiture-create');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  Toast.display('error', 'Une erreur est survenue merci de retester');

  const formData = new FormData(form);

  /*fetch('http://bootcamp.local/api/voiture/create', {
    method: 'POST',
    body: formData
  }).then(response => {
    return response.json();
  }).then(data => {
    console.log(data);

    displayToast('success', 'Modifications enregistrées');
  }).catch(() => {
    displayToast('error', 'Une erreur est survenue merci de retester');
  });*/
});