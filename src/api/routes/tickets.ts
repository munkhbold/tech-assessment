import { Ticket } from '../sequelize';

/**
 * Get ticket list and can filter by id
 */
export const getTickets = async (request, response) => {
    let kwargs = {};
    if(request.query.id){
        kwargs['id'] = request.query.id;
    }

    const tickets = await Ticket.findAll({ where: kwargs });
    response.json(tickets);
};
