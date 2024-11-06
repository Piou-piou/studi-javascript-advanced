console.log('début');

fetch('http://bootcamp.local/api/voiture/show/1', {
  method: 'GET',
}).then(response => {
  if (response.status !== 200) {
    throw new Error('Something went wrong');
  }

  return response.json();
}).then(data => {
  if (data.success !== true) {
    throw new Error('Something went wrong');
  }

  console.log(data.data)

  const voitureDiv = document.getElementById('voiture');

  for (const [key, carInfo] of Object.entries(data.data)) {
    let element = document.createElement('p');
    element.innerText = `${key} : ${carInfo}`;

    voitureDiv.append(element);
  }

}).catch((error) => {
  console.log(error)
});


console.log('fin');