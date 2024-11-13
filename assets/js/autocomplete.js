const immatriculationInput = document.getElementById('immatriculation');
const marque = document.getElementById('marque');

immatriculationInput.addEventListener('keyup', (event) => {
  const autocomplete = new Autocomplete(event.currentTarget, 'immatriculation', 'http://bootcamp.local/api/voiture/search');
  autocomplete.search();
});


marque.addEventListener('keyup', (event) => {
  const autocomplete = new Autocomplete(event.currentTarget, 'marque', 'http://bootcamp.local/api/voiture/search');
  autocomplete.search();
});