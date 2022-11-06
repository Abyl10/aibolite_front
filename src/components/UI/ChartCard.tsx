import React, { useState, useEffect } from 'react';
import classes from './ChartCard.module.scss';
import classNames from 'classnames';
import { Dropdown } from './Dropdown';
import LineChart from './LineChart';

type Props = {
  tabs?: string[];
  options?: string[];
  labels: string[];
  numbers: number[];
  color?: string;
  yTicks?: boolean;
  title: string;
};

const ChartCard: React.FC<Props> = ({ tabs, options, labels, numbers, color, yTicks, title }) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedOption, setSeletedOption] = useState<string | null>(null);

  useEffect(() => {
    if (options) {
      setSeletedOption(options[0]);
    }
    if (tabs) {
      setSelectedTab(tabs[0]);
    }
  }, []);

  return (
    <div className={classes['chart']}>
      <div className={classes['chart__wrapper']}>
        <div className={classes['chart__header']}>
          <p className={classes['chart__title']} style={!options ? { padding: '1rem' } : {}}>
            {title}
          </p>
          <div className={classes['chart__radio']}>
            {tabs && (
              <ul className={classes['select']}>
                {tabs.map((tab, index) => (
                  <li
                    key={`tab--${index}`}
                    onClick={() => setSelectedTab(tab)}
                    className={
                      tab === selectedTab
                        ? classNames(classes['tab'], classes['tab--selected'])
                        : classes['tab']
                    }
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            )}
            {options && (
              <Dropdown
                options={options}
                placeholder={'Год'}
                onChange={setSeletedOption}
                classname={'small'}
                withSearch={false}
                selectedOption={'2022'}
              />
            )}
          </div>
        </div>
        <div className={classes['chart__graph']}>
          <LineChart labels={labels} numbers={numbers} color={color} yTicks={yTicks} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
