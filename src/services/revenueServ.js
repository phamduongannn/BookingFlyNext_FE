import { http } from './config';

export const revenueServ = {
  calculateYearRevenue: (year) => {
    return http.get(`/revenue/year/${year}`);
  },
  calculateFlightRevenue: (flight_id) => {
    return http.get(`/revenue/flight/${flight_id}`);
  },
};
