const fetch = require("node-fetch");
const BOOKING_SERVICE = process.env.BOOKING_SERVICE;

exports.handler = async (evt) => {
   // fetch the request
   let response = await fetch(BOOKING_SERVICE, {
      method: 'DELETE',
      body: JSON.stringify({"reservation_id": evt.hotel.reservation_id})
   })
   
   
   if (response.ok) {
      let json = await response.json();
      return json;
   } else if (response.status == 418) {
      let json = await response.json();
      throw new InvalidInputError(JSON.stringify(json));
   } else if (response.status == 503) {
      let json = await response.json();
      throw new TransientError(JSON.stringify(json));
   } else {
      let json = await response.json();
      throw new Error(JSON.stringify(json))
   }
}

function TransientError(message) {
    this.name = 'TransientError';
    this.message = message;
}
TransientError.prototype = new Error(); 

function InvalidInputError(message) {
    this.name = 'InvalidInputError';
    this.message = message;
}
InvalidInputError.prototype = new Error();