const socket = io();
const button = document.querySelector('button');
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const id = document.getElementById('requestid').value;
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const departureDate = document.getElementById('departureDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const accommodation = document.getElementById('accommodation').value;
  const reason = document.getElementById('reason').value;
  const dataObject = {

    origin,
    destination,
    departureDate,
    returnDate,
    accommodation,
    reason,

  };
  fetch(`/api/v1/trips/edit/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(dataObject),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      _method: 'PATCH',
      Authorization: ' ',
    },
  }).then((resp) => resp.json())
    .then((data) => {
      result.innerHTML = Object.values(data);
    })
    .catch((error) => error);
});

