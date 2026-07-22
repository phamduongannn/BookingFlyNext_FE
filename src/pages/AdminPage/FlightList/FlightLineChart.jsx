import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { flightServ } from '../../../services/flightServ';
import moment from 'moment';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const FlightBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Flight Prices',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Number of Flights',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    flightServ
      .getAllFlights()
      .then((res) => {
        if (res.data && res.data.data) {
          const flights = res.data.data;

          // Extract data for the chart
          const dates = flights.map((flight) =>
            moment(flight.departure_time).format('DD/MM/YYYY')
          );
          const prices = flights.map((flight) => flight.price);
          const flightCount = flights.length; // Số lượng chuyến bay

          // Prepare data for the chart
          const data = {
            labels: dates,
            datasets: [
              {
                label: 'Flight Prices',
                data: prices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
              {
                label: 'Number of Flights',
                data: Array(dates.length).fill(flightCount), // Số lượng chuyến bay cho mỗi ngày
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          };

          setChartData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  return (
    <div className="w-[500px]">
      <h2>Flight Prices and Number of Flights Over Time</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default FlightBarChart;
