import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { flightServ } from '../../../services/flightServ';
import './ag-grid-theme-builder.css';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    flightServ.getAllFlights().then((res) => {
      const formattedFlights = res.data.data.map((flight) => ({
        ...flight,
        departure_time: moment
          .utc(flight.departure_time)
          .format('DD/MM/YYYY HH:mm A'),
        arrival_time: moment
          .utc(flight.arrival_time)
          .format('DD/MM/YYYY HH:mm A'),
        price: `${flight.price.toLocaleString({
          style: 'currency',
          currency: 'VND',
        })} VNĐ`,
      }));
      setFlights(formattedFlights);
    });
  }, []);

  const columnDefs = [
    {
      headerName: 'ID',
      field: 'flight_id',
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 100,
    },
    {
      headerName: 'Flight Number',
      field: 'flight_number',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Departure Airport',
      field: 'airports_flights_departure_airport_idToairports.airport_name',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Arrival Airport',
      field: 'airports_flights_arrival_airport_idToairports.airport_name',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Departure Time',
      field: 'departure_time',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Arrival Time',
      field: 'arrival_time',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Price ticket',
      field: 'price',
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 143,
    },
  ];

  return (
    <div
      className="ag-theme-alpine ag-theme-custom flight-list"
      id="myGrid"
      style={{ height: '500px', width: '100%' }}
    >
      <AgGridReact
        className="flight-table"
        rowData={flights}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default FlightList;
