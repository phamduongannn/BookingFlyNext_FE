import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ticketServ } from '../../services/ticketServ';

const BookedFlights = ({ userId }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    ticketServ
      .getTicketByUserId(userId)
      .then((response) => {
        setTickets(response.data.tickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const airlines = {
    VN: { src: '/img/VN.png', name: 'Vietnam Airlines' },
    VJ: { src: '/img/VJ.png', name: 'VietJet Air' },
    QH: { src: '/img/QH.png', name: 'Bamboo Airways' },
    VU: { src: '/img/VU.png', name: 'Vietravel Airlines' },
    BL: { src: '/img/BL.png', name: 'Pacific Airlines' },
  };
  const getAirlineInfo = (flightNumber) => {
    const airlineCode = flightNumber.substring(0, 2);
    return airlines[airlineCode];
  };

  return (
    <div className="overflow-y-auto h-screen pb-20">
      <Helmet>
        <title>Flynext | Booked Flights</title>
      </Helmet>
      <div>
        <h1 className="text-3xl font-bold pb-5 pt-3 mb-5 text-center border-b-[1px]">
          Booked Flights
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-6 border-[1px] border-gray-50 rounded-lg">
        {tickets.map((ticket, index) => (
          <div
            key={ticket.ticket_id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10"
                    src={getAirlineInfo(ticket.flights.flight_number).src}
                    alt=""
                    srcset=""
                  />
                  <h2 className="text-lg font-bold">
                    {getAirlineInfo(ticket.flights.flight_number).name}
                  </h2>
                </div>
                <p className="text-gray-500">{ticket.ticket_class}</p>
              </div>

              <div>
                <p className="text-lg font-semibold">
                  {ticket.flights.flight_number}
                </p>
                <p className="text-gray-500">
                  Guest number: {ticket.passenger}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-bold">
                {ticket.passengers[index]?.passenger_name}
              </p>
              <p className="text-gray-500">Titanium Elite</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500">From</p>
                <p className="text-lg font-bold uppercase">
                  {
                    ticket.flights
                      .airports_flights_departure_airport_idToairports.city
                  }{' '}
                  CITY
                </p>
              </div>
              <div>
                <p className="text-gray-500">To</p>
                <p className="text-lg font-bold uppercase">
                  {
                    ticket.flights.airports_flights_arrival_airport_idToairports
                      .city
                  }{' '}
                  CITY
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500">Boarding Time</p>
                <p className="text-lg font-bold">
                  {moment(ticket.flights.departure_time).format('HH:mm')}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="text-lg font-bold">
                  {moment(ticket.flights.departure_time).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500">Flight</p>
                <p className="text-lg font-bold">VN235</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="text-lg font-bold uppercase">{ticket.status}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Passenger</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              {ticket.passengers.map((passenger, index) => (
                <div key={passenger.passenger_id} className="mb-2">
                  <p className="text-lg font-bold">
                    {passenger.passenger_name}
                  </p>
                  <p className="text-gray-500">
                    {passenger.type.charAt(0).toUpperCase() +
                      passenger.type.slice(1)}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-gray-500 text-sm mb-4">
              <p className="text-red-600">
                * Boarding gate closes 15 minutes before departure time. Late
                passengers will not be accepted.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total price:</p>
                <p className="text-lg font-bold text-red-500">
                  {ticket.total_price.toLocaleString('vi-VN')} VND
                </p>
              </div>
              <div>
                <button className="text-lg btn-base !rounded-md !leading-5">
                  Ticket Cancellation
                </button>
              </div>
              {ticket.status === 'booked' && (
                <div>
                  <button className="text-lg btn-base !rounded-md !leading-5">
                    Please Payment
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedFlights;
