import * as express from 'express';
import { Op} from 'sequelize';

import { Ticket, Event, Order } from '../sequelize';

const apiRouter = express.Router();

/**
 * Get event list and can filter by name, id, categories and member_only
 */

export const getEvents = async (request, response) => {
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
        kwargs['member_only'] = 'true1'.includes(typeof member === 'string' ? member.toLowerCase() : '') ? true : false;
    }
    // filter by id
    if(id){
        kwargs['id'] = id;
    }

    const events = await Event.findAll({ where: kwargs });
    response.json(events);
};
