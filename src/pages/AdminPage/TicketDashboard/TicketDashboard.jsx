import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';
import { ticketServ } from '../../../services/ticketServ';
import './ag-grid-theme-builder.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketServ.getAllTickets();
        setTickets(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const columns = [
    {
      headerName: 'Ticket ID',
      field: 'ticket_id',
      sortable: true,
      filter: true,
      width: 100,
      floatingFilter: true,
    },
    {
      headerName: 'Ticket Number',
      field: 'ticket_number',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Flight ID',
      field: 'flight_id',
      width: 100,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'User ID',
      field: 'user_id',
      width: 100,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Ticket Class',
      field: 'ticket_class',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Passenger',
      field: 'passenger',
      width: 100,
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Total Price',
      field: 'total_price',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) =>
        params.value.toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }),
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      className="ag-theme-alpine ag-theme-custom flight-list"
      style={{ height: '500px', width: '100%' }}
    >
      <AgGridReact
        rowData={tickets}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default TicketList;
