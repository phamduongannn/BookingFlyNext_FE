import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'antd';
import { flightServ } from '../../../services/flightServ';
import { revenueServ } from '../../../services/revenueServ';

const RevenueByFlight = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await flightServ.getAllFlights();
        setFlights(response.data.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const fetchRevenueData = async (flightId) => {
    setLoading(true);
    try {
      const response = await revenueServ.calculateFlightRevenue(flightId);
      setRevenueData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const showModal = (flight) => {
    setSelectedFlight(flight);
    fetchRevenueData(flight.flight_id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedFlight(null);
    setRevenueData(null);
    setError(null);
  };

  const columns = [
    {
      title: 'Flight Number',
      dataIndex: 'flight_number',
      key: 'flight_number',
      sorter: (a, b) => a.flight_number.localeCompare(b.flight_number),
    },
    {
      title: 'Departure Airport',
      dataIndex: [
        'airports_flights_departure_airport_idToairports',
        'airport_name',
      ],
      key: 'departure_airport',
      sorter: (a, b) =>
        a.airports_flights_departure_airport_idToairports.airport_name.localeCompare(
          b.airports_flights_departure_airport_idToairports.airport_name
        ),
      filters: flights.map((flight) => ({
        text: flight.airports_flights_departure_airport_idToairports
          .airport_name,
        value:
          flight.airports_flights_departure_airport_idToairports.airport_name,
      })),
      onFilter: (value, record) =>
        record.airports_flights_departure_airport_idToairports.airport_name.includes(
          value
        ),
    },
    {
      title: 'Arrival Airport',
      dataIndex: [
        'airports_flights_arrival_airport_idToairports',
        'airport_name',
      ],
      key: 'arrival_airport',
      sorter: (a, b) =>
        a.airports_flights_arrival_airport_idToairports.airport_name.localeCompare(
          b.airports_flights_arrival_airport_idToairports.airport_name
        ),
      filters: flights.map((flight) => ({
        text: flight.airports_flights_arrival_airport_idToairports.airport_name,
        value:
          flight.airports_flights_arrival_airport_idToairports.airport_name,
      })),
      onFilter: (value, record) =>
        record.airports_flights_arrival_airport_idToairports.airport_name.includes(
          value
        ),
    },
    {
      title: 'Departure Time',
      dataIndex: 'departure_time',
      key: 'departure_time',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.departure_time) - new Date(b.departure_time),
    },
    {
      title: 'Arrival Time',
      dataIndex: 'arrival_time',
      key: 'arrival_time',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.arrival_time) - new Date(b.arrival_time),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) =>
        text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          className="bg-[#dcbb87] hover:!bg-[#c7a66f] !border-none"
          type="primary"
          onClick={() => showModal(record)}
        >
          View Revenue
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Revenue by Flight</h1>
      <Table
        dataSource={flights}
        columns={columns}
        rowKey="flight_id"
        bordered
      />
      <Modal
        title="Flight Revenue Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            className="hover:!border-[#dcbb87] hover:!text-[#dcbb87]"
            key="close"
            onClick={handleCancel}
          >
            Close
          </Button>,
        ]}
      >
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {revenueData ? (
          <div>
            <p>Flight ID: {revenueData.flight_id}</p>
            <p>
              Revenue:{' '}
              {revenueData.revenue.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <p>Total Tickets: {revenueData.total_tickets}</p>
            <p>Ratio: {revenueData.ratio}</p>
          </div>
        ) : (
          <div>No data available</div>
        )}
      </Modal>
    </div>
  );
};

export default RevenueByFlight;
