const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: String(process.env.NEXMO_API_KEY),
  apiSecret: String(process.env.NEXMO_API_SECRET)
})

let target = +6201283771053

const from = 'Todo Andryean'
const to = target
const text = 'Thx for sign up Todo Apps'

nexmo.message.sendSms(from, to, text, (error, response) => {
  if(error) {
    throw error;
  } else if(response.messages[0].status != '0') {
    console.error(response);
    throw 'Nexmo returned back a non-zero status';
  } else {
    console.log(response);
  }
});