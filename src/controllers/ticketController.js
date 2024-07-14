import Ticket from '../models/ticketModel.js';
import TicketDTO from '../dtos/ticketDTO.js';

export const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        const ticketsDTO = tickets.map(ticket => new TicketDTO(ticket));
        res.json(ticketsDTO);
    } catch (error) {
        next(error);
    }
};

export const getTicketsByStatus = async (req, res) => {
    try {
        const statusIds = [1, 2, 3];
        const tickets = await Ticket.findByStatus(statusIds);
        const ticketsDTO = tickets.map(ticket => new TicketDTO(ticket));
        res.json(ticketsDTO);
    } catch (error) {
        next(error);
    }
};

export const getTicketHistory = async (req, res) => {
    try {
        const tickets = await Ticket.findHistory();
        const ticketsDTO = tickets.map(ticket => new TicketDTO(ticket));
        res.json(ticketsDTO);
    } catch (error) {
        next(error);
    }
};
