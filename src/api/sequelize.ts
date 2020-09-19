
import {Sequelize} from 'sequelize';
import {
  TicketModel as TicketSchema,
  EventModel as EventSchema,
  OrderModel as OrderSchema
} from './models/index';

import dotenv from 'dotenv';

dotenv.config();
const db_name = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(db_name, username, password, {
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


