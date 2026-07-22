import { http } from './config';

export const airportServ = {
  getAllAirports: () => {
    return http.get('/airports/get-all-airports');
  },
  getAirportById: (id) => {
    return http.get(`/airports/get-airport-by-id/${id}`);
  },
  getAirportByName: (name) => {
    return http.get(`/airports/get-airport-by-name/${name}`);
  },
};
