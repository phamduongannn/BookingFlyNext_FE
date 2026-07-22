import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDoughnutChart = ({ usersLength }) => {
  const data = {
    labels: ['Users'],
    datasets: [
      {
        data: [usersLength],
        backgroundColor: ['#36a2eb'],
        hoverBackgroundColor: ['#059BFF'],
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default UserDoughnutChart;
