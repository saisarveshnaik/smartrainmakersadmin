import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDashboard } from "../context/DashboardContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrafficChart: React.FC = () => {
  const { data, loading } = useDashboard();

  if (loading) return <p>Loading traffic data...</p>;
  if (!data || !data.trafficStats) return <p>No traffic data available.</p>;

  const chartData = {
    labels: data.trafficStats.labels, // Ensure API returns labels (e.g., months)
    datasets: [
      {
        label: 'Traffic',
        data: data.trafficStats.values, // Ensure API returns corresponding data
        fill: false,
        backgroundColor: 'rgb(33, 38, 49)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    ],
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default TrafficChart;