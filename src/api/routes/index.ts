import * as express from 'express';
import { Op} from 'sequelize';

import {getEvents} from './events'
import {getOrders, createOrder} from './orders'
import {getTickets} from './tickets'

const apiRouter = express.Router();

apiRouter.get('/events', getEvents);
apiRouter.get('/tickets', getTickets);
apiRouter.get('/orders', getOrders);
apiRouter.post('/orders', createOrder);

export default apiRouter;