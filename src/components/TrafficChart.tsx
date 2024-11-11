// src/components/TrafficChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
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

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Traffic',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: 'rgb(33, 38, 49)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
  ],
};

const TrafficChart: React.FC = () => (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );

export default TrafficChart;