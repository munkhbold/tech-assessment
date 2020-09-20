
import {Sequelize} from 'sequelize';
import {
  TicketModel as TicketSchema,
  EventModel as EventSchema,
  OrderModel as OrderSchema
} from './models/index';

import * as dotenv from 'dotenv';

dotenv.config();

const db_name = process.env.RUN_MODE == 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

export const sequelize = new Sequelize(db_name, username, password, {
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


