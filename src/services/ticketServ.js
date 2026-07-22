import { http } from './config';

export const ticketServ = {
  getAllTickets: () => {
    return http.get('/tickets/get-all-tickets');
  },
  createTicket: (body) => {
    return http.post('/tickets/create-ticket', body);
  },
  getTicketById: (ticket_id) => {
    return http.get(`/tickets/get-ticket-by-id/${ticket_id}`);
  },
  getTicketByUserId: (user_id) => {
    return http.get(`/tickets/get-ticket-by-user-id/${user_id}`);
  },
};
