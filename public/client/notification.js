
if (!('Notification' in window)) {
  alert('This browser does not support desktop notification');
} else if (Notification.permission !== 'denied') {
  Notification.requestPermission((permission) => {
    if (!('permission' in Notification)) {
      Notification.permission = permission;
    }
  });
}
const notifyMe = (requestId, message, user) => {
  const id = document.getElementById('requestid').value;
  if (Notification.permission === 'granted') {
    const options = {
      body: message,
      dir: 'ltr',
    };
    const notification = new Notification(`${user} modified a trip request`, options);
    notification.onclick = (event) => {
      event.preventDefault(); // prevent the browser from focusing the Notification's tab
      window.open(`http://${window.location.host}/api/v1/trips/request/${requestId}`, '_blank');
    };
  }
};
