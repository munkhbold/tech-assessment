import {app} from '../../../app';
import { expect } from 'chai'

import {agent as request} from 'supertest';
import {sequelize, Order, Event, Ticket} from '../../../api/sequelize';
import {ticketFactory, eventFactory, orderFactory} from '../../../api/factories';

describe('API routes tickets', () => {
  let ticket, event, order;
    // start with a fresh DB 
  beforeEach( async () => {
    await sequelize.sync({ logging:false})
    await Order.destroy({where:{}, truncate: true});
    await Event.destroy({where:{}, truncate: true});
    await Ticket.destroy({where:{}, truncate: true});

    ticket = await ticketFactory();
    event = await eventFactory();
    order = await orderFactory({ ticket_type_id: ticket.id, event_id: event.id});
  });

  it('should GET /api/v1/tickets/', async () => {
    const res = await request(app).get('/api/v1/tickets');
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body[0].id).to.equal(ticket.id);
    expect(res.body[0].name).to.equal(ticket.name);
    expect(res.body[0].max_purchasable).to.equal(ticket.max_purchasable);
    expect(res.body[0].price).to.equal(ticket.price);
    expect(res.body[0].description).to.equal(ticket.description);
  });

  it('should GET /api/v1/tickets/?id=2', async () => {
    const ticket2 = await ticketFactory();
    const res = await request(app).get(`/api/v1/tickets?id=${ticket2.id}`);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body[0].id).to.equal(ticket2.id);
  });

});