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
import { Line } from 'react-chartjs-2';
import { callback } from 'chart.js/types/helpers';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  labels: string[];
  numbers: number[];
  color?: string;
  yTicks?: boolean;
};

const LineChart: React.FC<Props> = ({ labels, numbers, color, yTicks = true }) => {
  const options = useMemo(() => {
    return {
      elements: {
        point: {
          radius: 5,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        decimation: {
          enabled: true,
        },
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
            color: 'rgba(0, 36, 90, 0.7)',
            align: 'end',
            crossAlign: 'center',
            padding: 10,
            callback: function (val: string | number, index: number): string | number {
              return index % 2 === 0 ? val : '';
            },
          },
        },
        x: {
          grid: {
            color: 'rgba(176, 184, 218, 0.3)',
          },
          backgroundColor: '#fff',
          ticks: {
            color: 'rgba(0, 36, 90, 0.7)',
            align: 'start',
            crossAlign: 'far',
            labelOffset: 5,
            padding: 5,
          },
        },
      },
    };
  }, [yTicks]);
  const data = {
    labels: [...labels, ''],
    datasets: [
      {
        data: [...numbers, null],
        borderColor: color || '#4B84F1',
        borderWidth: 1,
        backgroundColor: color || '#4B84F1',
      },
    ],
  };
  return <Line options={options} data={data}></Line>;
};

export default LineChart;
