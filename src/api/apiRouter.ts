import express from 'express';
import { Op} from 'sequelize';

import { Ticket, Event, Order } from './sequelize';

const apiRouter = express.Router();

/**
 * Get ticket list and can filter by id
 */
apiRouter.get('/tickets', async (request, response) => {
    let kwargs = {};
    if(request.query.id){
        kwargs['id'] = request.query.id;
    }

    const tickets = await Ticket.findAll({ where: kwargs });
    response.json(tickets);
});

/**
 * Get event list and can filter by name, id, categories and member_only
 */
apiRouter.get('/events', async (request, response) => {
    let kwargs = {};
    let { id, name, cat, member } = request.query;
    // filter by name
    if(name){
        kwargs['event_name'] = {
            [Op.iLike]: '%' + name + '%'
        }
    }
    // filter by categories
    if(cat){
        cat = typeof cat === 'string' ? [cat] : cat;
        kwargs['category'] = {
            [Op.in]: cat
        }
    }
    // filter by member_only
    if(member){
        kwargs['member_only'] = 'true1'.includes(member.toLowerCase()) ? true : false;
    }
    // filter by id
    if(id){
        kwargs['id'] = id;
    }

    const events = await Event.findAll({ where: kwargs });
    response.json(events);
});

/**
 * Get order list
 */
apiRouter.get('/orders', async (request, response) => {
    const orders = await Order.findAll();
    response.json(orders);
});

/**
 * Validate order input data and throw an exception if there is incorrect data
 */
const validateOrder = async (doc) => {
    const {customerName, eventId, ticketId, quantity, isMember} = doc;
    if(!customerName){
        throw new Error('A customerName is required');
    }

    if(!eventId){
        throw new Error('An eventId is required');
    }

    const event = await Event.findOne({where: {id: eventId}});
    if(!event){
        throw new Error(`Event not found with id ${eventId}`);
    }

    if(!ticketId){
        throw new Error('A ticketId is required');
    }

    const ticket = await Ticket.findOne({where: {id: ticketId}});
    if(!ticket){
        throw new Error(`Ticket not found with id ${ticketId}`);
    }

    if(!quantity || parseInt(quantity) < 1 || parseInt(quantity) > ticket.max_purchasable){
        throw new Error(`A quantity must be greater than 0 less than ${ticket.max_purchasable}`);
    }
}
/**
 * Create order
 */
apiRouter.post('/orders', async (request, response) => {
    const {customerName, eventId, ticketId, quantity, isMember} = request.body;

    try{
        await validateOrder(request.body)
    } catch (error){
        response.status(400).json({ error: error.message });
        return
    }
    try {
        const newOrder = await Order.create({
            customer_name: customerName,
            event_id: eventId,
            ticket_type_id: ticketId,
            ticket_quantity: quantity,
            date_placed: Date.now(),
            is_member_purchase: isMember == 'true' ? true : false
        });
        response.json(newOrder);
    } catch (error) {
        response.status(500).json({ error: 'Internal server Error' });
    }
});

export default apiRouter;