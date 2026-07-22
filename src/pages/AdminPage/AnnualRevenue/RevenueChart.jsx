import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { revenueServ } from '../../../services/revenueServ';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ year }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await revenueServ.calculateYearRevenue(year);
        const data = response.data;
        console.log(data);

        if (data && data.data && data.data.monthlyRevenue) {
          const monthlyRevenue = data.data.monthlyRevenue;

          setChartData({
            labels: Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`),
            datasets: [
              {
                label: 'Revenue',
                data: monthlyRevenue,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError('No data available for the selected year');
        }
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-[#dcbb87] py-2">Revenue for {year}</h2>
      <Bar data={chartData} />
      <Line data={chartData} />
    </div>
  );
};

export default RevenueChart;
