import {app} from '../../../app';
import { expect } from 'chai'

import {agent as request} from 'supertest';
import {sequelize, Order, Event, Ticket} from '../../../api/sequelize';
import {ticketFactory, eventFactory, orderFactory} from '../../../api/factories';

describe('API routes orders', () => {
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

  it('should GET /api/v1/orders', async () => {
    await orderFactory();
    const res = await request(app).get(`/api/v1/orders`);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body.length).to.equal(2);
  });

  it('should POST /api/v1/orders', async () => {
    const data = {
      customerName: "Mike",
      eventId: event.id,
      ticketId: ticket.id,
      quantity: 1,
      member_only: false,
    }
    
    const res = await request(app).post(`/api/v1/orders`).send(data);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Object");
    expect(res.body.customer_name).to.equal(data.customerName);
    expect(res.body.event_id).to.equal(data.eventId);
    expect(res.body.ticket_type_id).to.equal(data.ticketId);
    expect(res.body.ticket_quantity).to.equal(data.quantity);
  });

  it('should POST /api/v1/orders without customerName', async () => {
    const data = {
      eventId: event.id,
      ticketId: ticket.id,
      quantity: 1,
      member_only: false,
    }
    
    const res = await request(app).post(`/api/v1/orders`).send(data);
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Object");
    expect(res.body.error).to.equal('A customerName is required');
  });

  it('should POST /api/v1/orders without eventId and incorrect eventId', async () => {
    const data = {
      customerName: "Test user",
      ticketId: ticket.id,
      quantity: 1,
      member_only: false,
    }
    
    const res = await request(app).post(`/api/v1/orders`).send(data);
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Object");
    expect(res.body.error).to.equal('An eventId is required');

    const fakeEventId = 982;
    data['eventId'] = fakeEventId
    const res2 = await request(app).post(`/api/v1/orders`).send(data);
    expect(res2.status).to.equal(400)
    expect(res2.body).not.to.be.empty;
    expect(res2.body).to.be.an("Object");
    expect(res2.body.error).to.equal(`Event not found with id ${fakeEventId}`);
  });

  it('should POST /api/v1/orders without ticketId and incorrect ticketId', async () => {
    const data = {
      customerName: "Test user",
      eventId: event.id,
      quantity: 1,
      member_only: false,
    }
    
    const res = await request(app).post(`/api/v1/orders`).send(data);
    expect(res.status).to.equal(400)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Object");
    expect(res.body.error).to.equal('A ticketId is required');

    const fakeTicketId = 982;
    data['ticketId'] = fakeTicketId
    const res2 = await request(app).post(`/api/v1/orders`).send(data);
    expect(res2.status).to.equal(400)
    expect(res2.body).not.to.be.empty;
    expect(res2.body).to.be.an("Object");
    expect(res2.body.error).to.equal(`Ticket not found with id ${fakeTicketId}`);
  });

});