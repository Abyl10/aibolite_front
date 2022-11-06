import React, { useEffect, useRef } from 'react';
import Charts from 'react-apexcharts';
import classes from './Gauge.module.scss';

const options = {
  plotOptions: {
    radialBar: {
      hollow: {
        size: '55%',
      },
      startAngle: -110,
      endAngle: 110,
      track: {
        background: '#ECF0F9',
        startAngle: -110,
        endAngle: 110,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: 35,
          fontSize: '3rem',
          color: '#4B84F1',
          fontWeight: 800,
          formatter: function (val: string | number) {
            return val + '%';
          },
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#B566FF', '#01BCFF'],
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
};

type Props = {
  title: string;
  percentage: number;
};

const Gauge: React.FC<Props> = ({ title, percentage }) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const styleTransform = {
    transform: `rotateZ(${percentage}deg)`,
  };

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = `rotateZ(${-110 + percentage * 2.2}deg)`;
    }
  }, [percentage]);

  return (
    <div className={classes['wrapper']}>
      <p className={classes['title']}>{title}</p>
      <div className={classes['chart']}>
        <Charts options={options} type="radialBar" series={[percentage]} />
        <div ref={innerRef} className={classes['arrow']}></div>
      </div>
    </div>
  );
};
export default Gauge;
