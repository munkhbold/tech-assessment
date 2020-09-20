import { Ticket, Event, Order } from './sequelize'

const randomInt = ()=>{
  return Math.floor(Math.random() * 100);
}
export const ticketFactory = ()=> {
  return Ticket.create({
    id: randomInt(),
    name: "Adult",
    max_purchasable: 10,
    price: 50,
    description: "description",
  })
  .catch(e => console.log(e))
}

export const eventFactory = (doc:any={})=> {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return Event.create({
    id: randomInt(),
    event_name: doc.event_name || "MOVIE NIGHT",
    start_date: Date.now(),
    end_date: tomorrow,
    member_only: doc.member_only || false,
    category: doc.category || 'test',
  })
  .catch(e => console.log(e))
}

export const orderFactory = async (...doc)=> {
  let { ticket_type_id, event_id }:any = doc;
  if(!event_id){
    event_id = await eventFactory().id
  }
  if(!ticket_type_id){
    ticket_type_id = await ticketFactory().id
  }
  return Order.create({
    id: randomInt(),
    date_placed: new Date(),
    customer_name: "Mike",
    event_id,
    ticket_type_id,
    ticket_quantity: 10,
    is_member_purchase: false,
  })
.catch(e => console.log(e))
}