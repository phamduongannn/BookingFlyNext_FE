import { http } from './config';

export const flightServ = {
  addFlight: (body) => {
    return http.post('/flights/add-flight', body);
  },
  getAllFlights: () => {
    return http.get('/flights/get-all-flights');
  },
  getFlightsByDepartureArrival: (departure, arrival, departureTime) => {
    return http.get(
      `/flights/get-by-departure-arrival-departureTime/${departure}/${arrival}/${departureTime}`
    );
  },
  getFlightById: (id) => {
    return http.get(`/flights/get-flight-by-id/${id}`);
  },
};
