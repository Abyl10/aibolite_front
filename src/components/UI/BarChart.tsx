import React, { useMemo } from 'react';
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
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  labels: string[];
  numbers: number[][];
  yTicks?: boolean;
};

const BarChart: React.FC<Props> = ({ labels, numbers, yTicks = false }) => {
  const options = useMemo(() => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: 0,
      },
      scales: {
        y: {
          grid: {
            display: true,
            borderDash: [12, 12],
            color: '#fff',
          },
          ticks: {
            display: yTicks,
          },
        },
        x: {
          ticks: {
            color: 'rgba(0, 36, 90, 0.7)',
          },
          grid: {
            color: 'rgba(176, 184, 218, 0.3)',
          },
          backgroundColor: '#fff',
        },
      },
    };
  }, [yTicks]);
  const data = {
    labels,
    datasets: [
      {
        data: numbers[0],
        barPercentage: 0.8,
        categoryPercentage: 0.4,
        borderRadius: 5,
        backgroundColor: '#4B84F1',
      },
      numbers[1]
        ? {
            data: numbers[1],
            barPercentage: 0.8,
            categoryPercentage: 0.4,
            borderRadius: 5,
            backgroundColor: '#21B25B',
          }
        : {},
    ],
  };

  return <Bar options={options} data={data}></Bar>;
};

export default BarChart;
