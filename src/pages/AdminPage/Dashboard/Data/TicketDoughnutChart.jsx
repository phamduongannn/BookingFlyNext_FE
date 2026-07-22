import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TicketDoughnutChart = ({ ticketLength }) => {
  const data = {
    labels: ['Tickets'],
    datasets: [
      {
        data: [ticketLength],
        backgroundColor: ['#ff6384'],
        hoverBackgroundColor: ['#FF4069'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default TicketDoughnutChart;
