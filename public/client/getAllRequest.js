const result = document.getElementById('response');
fetch('http://localhost:4000/api/v1/trips/myRequest', {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
}).then((res) => res.json()).then((data) => {
  let html = null;
  if (Array.isArray(data.allMyRequest)) {
    html = data.allMyRequest.map((item) => `<li> reason:${item.reason} id: ${item.id}</li>`).join(',');
    result.innerHTML += `<ul>${html}</ul>`;
  } else {
    result.innerHTML = Object.values(data);
  }
});
