import React, { useState, useEffect } from 'react';
import classes from './ChartCard.module.scss';
import classNames from 'classnames';
import { Dropdown } from './Dropdown';
import BarChart from './BarChart';

type Props = {
  tabs?: string[];
  options?: string[];
  title: string;
  labels: string[];
  numbers: number[][];
  yTicks?: boolean;
};

const ChartCard: React.FC<Props> = ({ tabs, options, title, labels, numbers, yTicks = false }) => {
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
          <p className={classes['chart__title']}>{title}</p>
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
                classname={'small'}
                onChange={setSeletedOption}
                withSearch={false}
                selectedOption={'2022'}
              />
            )}
          </div>
        </div>
        <div className={classes['chart__graph']}>
          <BarChart labels={labels} numbers={numbers} yTicks={yTicks} />
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
