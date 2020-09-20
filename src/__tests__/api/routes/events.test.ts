import {app} from '../../../app';
import { expect } from 'chai'

import {agent as request} from 'supertest';
import {sequelize, Order, Event, Ticket} from '../../../api/sequelize';
import {ticketFactory, eventFactory, orderFactory} from '../../../api/factories';

describe('API routes events', () => {
  let ticket, event, order;
    // start with a fresh DB 
  beforeEach( async () => {
    await sequelize.sync({ logging:false })
    await Order.destroy({where:{}, truncate: true});
    await Event.destroy({where:{}, truncate: true});
    await Ticket.destroy({where:{}, truncate: true});

    ticket = await ticketFactory();
    event = await eventFactory();
    order = await orderFactory({ ticket_type_id: ticket.id, event_id: event.id});
  });

  it('should GET /api/v1/events?id=2', async () => {
    const event2 = await eventFactory();
    const res = await request(app).get(`/api/v1/events?id=${event2.id}`);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body[0].id).to.equal(event2.id);
  });

  it('should GET /api/v1/events?cat=test', async () => {
    const event2 = await eventFactory({category: 'event2'});
    const res = await request(app).get(`/api/v1/events?cat=${event2.category}`);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body[0].id).to.equal(event2.id);
  });

  it('should GET /api/v1/events?member=true', async () => {
    const event2 = await eventFactory({member_only: true});
    const res = await request(app).get(`/api/v1/events?member=true`);
    expect(res.status).to.equal(200)
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an("Array");
    expect(res.body.error).to.equal(undefined);
    expect(res.body[0].id).to.equal(event2.id);
  });
});