import sendGrid from '@sendgrid/mail';

const notifyTheRequester = async (businessEmail, requester, request) => {
    let emailBody ;
  
    sendGrid.setApiKey(process.env.BN_API_KEY);
    if(request.type === 'one_way'){
      emailBody = `<p><strong>Dear ${requester.firstName},<strong>
      <br><br>
      <p>This is to inform you that your trip request has been approved.<p>
      <br>Your request summary: 
      <br>Request Type: ${request.type}
      <br>Origin: ${request.origin}
      <br>Destination: ${request.destination}
      <br>DepartureDate: ${request.departureDate}
      <br>Reason: ${request.reason}
      <br><br>Barefoot Nomad Team<br>
      <br>Thank you<br>
      </p>`
    }
    else if (request.type === 'two_way'){
      emailBody = `<p><strong>Dear ${requester.firstName},<strong>
      <br><br>
      <p>This is to inform you that your trip request has been approved.<p>
      <br>Your request summary: 
      <br>Request Type: ${request.type}
      <br>Origin: ${request.origin}
      <br>Destination: ${request.destination}
      <br>DepartureDate: ${request.departureDate}
      <br>ReturnDate: ${request.returnDate}
      <br>Reason: ${request.reason}
      <br><br>Barefoot Nomad Team<br>
      <br>Thank you<br>
      </p>`
    }
    else if (request.type === 'multi_way'){
      emailBody = `<p><strong>Dear ${requester.firstName},<strong>
      <br><br>
      <p>This is to inform you that your trip request has been approved.<p>
      <br>Your request summary: 
      <br>Request Type: ${request.type}
      <br>Origin: ${request.origin}
      <br>DepartureDate: ${request.departureDate}
      <br>ReturnDate: ${request.returnDate}
      <br>Cities: ${request.cities}
      <br>Reason: ${request.reason}
      <br><br>Barefoot Nomad Team<br>
      <br>Thank you<br>
      </p>`
    }    
    const msg = {
      to: `${requester.email}`,
      from: `${businessEmail}`,
      subject: 'Request approved!',
      text: `${request.reason}`,
      html: `${emailBody}`
    }
    sendGrid.send(msg);
  }
  
  export default notifyTheRequester;
