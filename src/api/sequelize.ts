
import {Sequelize} from 'sequelize';
// import { TicketModel, EventModel, OrderModel } from './models';
import {
  TicketModel as TicketSchema,
  EventModel as EventSchema,
  OrderModel as OrderSchema
} from './models/index';

const sequelize = new Sequelize('ticket_order_db', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false // true by default
  }
});

export const Ticket = TicketSchema(sequelize, Sequelize);
export const Order = OrderSchema(sequelize, Sequelize);
export const Event = EventSchema(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log(`tickets, orders and events tables have been synced`);
});


