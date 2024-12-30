import axios from 'axios';
const Ticketwebhookurl = 'https://discord.com/api/webhooks/1122703270155128832/57QQ4L23mmxlPTUTgPcW4BawFYl8ruPelnQkU85GbeFI7TVif-0XAT9jVbarIBIB5Udn';
const ReservationWebhookurl="https://discord.com/api/webhooks/1122704585803431988/sx5dQN1bnv5UlT5UtOvCMAHANopJMDBtFHe3M3t38MqWDCC_qQ3xLCFl7W2xIF7XwLQQ"
function SellTicket(sellername,ticket) {

    let titleto = "Selled By " + sellername;
    let message ="Ticket ID: " + ticket.id + "\n Buyer Name: "+ticket.buyer + "\n Buyer Email: "+ticket.email + "\n Buyer Phone: "+ticket.phone ;
    let colortogive = 0x00ff00;
    const payload = {
    content: "Ticket Sold",

      embeds: [
        {
          title: titleto,
          description: message,
          color: colortogive // green color
        }
      ]
    };
    axios.post(Ticketwebhookurl, payload)
      .then(() => {
        console.log('Logs Stats requested');

      })
      .catch(error => {
        console.log(error);
      });
}
function BookTicket(nbtickets,buyer) {

  let titleto = "RESERVATION OF" + nbtickets + " TICKETS";
  let message ="Buyer Name: "+buyer.name + "\n Buyer Email: "+buyer.email + "\n Buyer Phone: "+buyer.phone ;
  let colortogive = 0x00ff00;

  const payload = {
  content: "Ticket Booked",

    embeds: [
      {
        title: titleto,
        description: message,
        color: colortogive // green color
      }
    ]
  };
  axios.post(ReservationWebhookurl, payload)
    .then(() => {
      console.log('Logs Stats requested');
    })
    .catch(error => {
      console.log(error);
    });
}

  module.exports = {
    SellTicket,
    BookTicket
  };