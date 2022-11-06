import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import classes from './EditableTable.module.scss';
import { Checkbox } from './Checkbox';
import { filterAsc, filterDesc, filterInactive, IColumn, sortingOrder } from './GlobalTable';
import { useTranslations } from '../../hooks/useTranslations';
import { Tooltip } from './Tooltip';
import { useLanguageContext } from '../../contexts/LanguageContext';
import classNames from 'classnames';

type PropsType = {
  columns: IColumn[];
  data: any[];
  footerColumns?: string[];
  pairs?: Map<string, string>;
  fieldKey?: string;
  setData?: (data: any[]) => void;
  calculateTotal?: string[];
};

type ActionType = 'edit' | 'add' | 'delete';

export const EditableTable: React.FC<PropsType> = ({
  columns,
  data,
  footerColumns,
  pairs,
  fieldKey = 'id',
  setData,
  calculateTotal,
}) => {
  const [rows, setRows] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<string>(columns[0].dataIndex);
  const [sortOrder, setSortOrder] = useState<sortingOrder>(sortingOrder.none);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [tooltipId, setTooltipId] = useState<number | null>(null);
  const [editing, setEditing] = useState<number[]>([]);
  const actions: ActionType[] = ['edit', 'add', 'delete'];
  const { t } = useTranslations();
  const { language } = useLanguageContext();

  const [footerWithEmptyCols, setFooterWithEmptyCols] = useState<string[]>([]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const tableHeadRow = useRef<HTMLTableRowElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setRows([...data]);
  }, [data]);

  useEffect(() => {
    setRows((rs) => rs.map((r) => ({ ...r, checked: false })));
  }, [data]);

  useEffect(() => {
    if (footerColumns) {
      const minIndex = footerColumns.reduce(
        (acc, x) =>
          Math.min(
            acc,
            columns.findIndex((col) => col.dataIndex === x)
          ),
        1000
      );

      setFooterWithEmptyCols([...columns.slice(minIndex).map((col) => col.dataIndex)]);
    }
  }, [columns, footerColumns]);

  const sortTable = (key: string) => {
    const newOrder: string = sortOrder === 'asc' ? 'desc' : 'asc';

    setSortKey(key);
    setSortOrder(newOrder as sortingOrder);

    const sorted = [...rows];
    sorted.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setRows(newOrder === 'asc' ? sorted : sorted.reverse());
  };

  const handleCheckAll = () => {
    setCheckedAll((c) => !c);
    setRows((rs) => [...rs.map((r) => ({ ...r, checked: !checkedAll }))]);
  };

  const handleCheckItem = (item: any) => {
    setRows((rs) =>
      rs.map((r) => (r[fieldKey] === item[fieldKey] ? { ...r, checked: !r.checked } : r))
    );
  };

  const handleTooltipOpen = (id: number) => {
    setTooltipId(id);
  };

  const handleTooltipClose = useCallback(() => {
    setTooltipId(null);
  }, []);

  const handleEditClick = (item: any) => {
    setEditing((arr) => [...arr, item[fieldKey]]);
    handleTooltipClose();
  };

  const handleAddClick = () => {
    handleTooltipClose();
  };

  const handleDeleteClick = (item: any) => {
    const filteredRows = [...rows].filter((r) => r[fieldKey] !== item[fieldKey]);
    if (setData) {
      setData(filteredRows);
    } else {
      setRows(filteredRows);
    }
    handleTooltipClose();
  };

  const handleAction = (action: ActionType, item: any) => {
    switch (action) {
      case 'edit': {
        handleEditClick(item);
        break;
      }
      case 'add': {
        handleAddClick();
        break;
      }
      case 'delete': {
        handleDeleteClick(item);
        break;
      }
      default:
        break;
    }
  };

  const handleInputChange = (
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    dataIndex: string,
    item: any
  ) => {
    const rs = [...rows].map((r) =>
      r[fieldKey] === item[fieldKey] ? { ...r, [dataIndex]: value } : r
    );
    setRows(rs);
    if (setData) {
      setData(rs);
    }
  };

  useEffect(() => {
    const tableHeads = tableHeadRow.current?.children || [];
    const footerChildren = (footerRef.current?.getElementsByTagName('div') ||
      []) as HTMLCollectionOf<HTMLElement>;
    footerWithEmptyCols.forEach((col, index) => {
      const tableHeadIndex = columns.findIndex((c) => c.dataIndex === col) + 1;
      const tableHead = tableHeads[tableHeadIndex];
      const tableHeadClient = tableHead.getBoundingClientRect();
      const footerChild = footerChildren[index];
      const wrapperLeft = wrapperRef.current?.getBoundingClientRect().left || 0;
      footerChild.style.position = 'absolute';
      footerChild.style.width = `${tableHeadClient.width}px`;
      footerChild.style.left = `${tableHeadClient.left - wrapperLeft}px`;
      footerChild.style.right = `${tableHeadClient.right - wrapperLeft}px`;
      footerChild.style.borderLeft = '1px solid var(--color-grey-2)';
      footerChild.style.borderRight = '1px solid var(--color-grey-2)';
    });

    const total = footerRef.current?.children[0] as HTMLElement;
    if (total) {
      total.innerHTML = t('total');
      total.style.position = 'absolute';
      total.style.left = `${
        footerChildren[0]?.getBoundingClientRect().left -
        (wrapperRef.current?.getBoundingClientRect().left || 0) -
        footerChildren[0]?.getBoundingClientRect().width -
        10
      }px`;
    }
  }, [footerColumns, footerWithEmptyCols, language]);

  const getSumOfCols = useMemo(() => {
    if (footerColumns) {
      const hashSum = new Map();
      footerColumns.forEach((col) => {
        const sum =
          data?.length > 0
            ? data.filter((item) => item[col]).reduce((acc, item) => acc + parseFloat(item[col]), 0)
            : 0;
        hashSum.set(col, sum);
      });
      return hashSum;
    }
    return undefined;
  }, [footerColumns, data]);

  const handleInputEnterPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: any,
    fieldKey: string
  ) => {
    if (e.key === 'Enter') {
      setEditing((prev) => prev.filter((el) => el !== item[fieldKey]));
    }
  };

  return (
    <div className={classes['container']}>
      <div className={classes['wrapper']} ref={wrapperRef}>
        <table className={classes['table']}>
          <thead>
            <tr ref={tableHeadRow}>
              <th>
                <Checkbox checked={checkedAll} onChange={handleCheckAll} name="checkAll" />
              </th>
              <th>{t('number')}</th>
              {columns.map((column) => (
                <th
                  key={column.dataIndex}
                  onClick={column.sorter ? () => sortTable(column.dataIndex) : undefined}
                >
                  <div className={classes['headers']}>
                    {t(column.dataIndex)}
                    {column.sorter
                      ? sortKey !== column.dataIndex
                        ? filterInactive
                        : sortOrder === sortingOrder.none
                        ? filterInactive
                        : sortOrder === sortingOrder.desc
                        ? filterDesc
                        : filterAsc
                      : null}
                  </div>
                </th>
              ))}
              {calculateTotal && <th>{t('totalPrice')}</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, index) => (
              <tr key={index} className={item.checked ? classes['table__tr--checked'] : ''}>
                <td>
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckItem(item)}
                    name={item[fieldKey]}
                  />
                </td>
                <td>{index + 1}</td>
                {columns.map(({ dataIndex, editable }, index) => {
                  return pairs &&
                    pairs.has(dataIndex) &&
                    pairs.get(dataIndex) &&
                    item[pairs.get(dataIndex)!.toString()] !== item[dataIndex] ? (
                    <td
                      key={`${item[dataIndex]}--${index}`}
                      className={classes[`status--shortage`]}
                    >
                      {editable && editing.includes(item[fieldKey]) ? (
                        <input
                          autoFocus={true}
                          type="text"
                          className={classes['item__input']}
                          value={item[dataIndex]}
                          onChange={(e) => handleInputChange(e, dataIndex, item)}
                          onKeyDown={(e) => handleInputEnterPress(e, item, fieldKey)}
                        />
                      ) : (
                        t(item[dataIndex])
                      )}
                    </td>
                  ) : (
                    <td
                      key={`${item[dataIndex]}--${index}`}
                      className={
                        dataIndex === 'state' ? classes[`status--${item[dataIndex]}`] : undefined
                      }
                    >
                      {editable && editing.includes(item[fieldKey]) ? (
                        <input
                          autoFocus={true}
                          type="text"
                          className={classes['item__input']}
                          value={item[dataIndex]}
                          onChange={(e) => handleInputChange(e, dataIndex, item)}
                          onKeyDown={(e) => handleInputEnterPress(e, item, fieldKey)}
                        />
                      ) : (
                        t(item[dataIndex])
                      )}
                    </td>
                  );
                })}
                {calculateTotal && (
                  <td>
                    {isNaN(item[calculateTotal[0]] * item[calculateTotal[1]])
                      ? 0
                      : item[calculateTotal[0]] * item[calculateTotal[1]]}
                  </td>
                )}
                <td className={classes['table__actions']}>
                  <div
                    id={`tooltip-trigger-${item[fieldKey]}`}
                    className={classes['table__img-wrapper']}
                    onClick={() => handleTooltipOpen(item[fieldKey])}
                  >
                    <img src="../assets/icons/vertical-dots.svg" alt="Vertical dots" />
                  </div>
                  {item[fieldKey] === tooltipId && (
                    <Tooltip
                      open={!!tooltipId}
                      handleClose={handleTooltipClose}
                      targetId={`tooltip-trigger-${item[fieldKey]}`}
                    >
                      <ul className={classes['actions-list']}>
                        {actions.map((action) => (
                          <li key={action} onClick={() => handleAction(action, item)}>
                            {t(action)}
                          </li>
                        ))}
                      </ul>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footerColumns && (
        <div className={classes['footer']} ref={footerRef}>
          <p>{t('total')}</p>
          {footerWithEmptyCols.map((col) =>
            footerColumns?.includes(col) && getSumOfCols ? (
              pairs &&
              pairs.has(col) &&
              pairs.get(col) &&
              getSumOfCols.get(col) !== getSumOfCols.get(pairs.get(col)) ? (
                <div
                  key={col}
                  className={classNames(classes['status--shortage'], classes['white-bg'])}
                >
                  {getSumOfCols.get(col)}
                </div>
              ) : (
                <div key={col} className={classes['white-bg']}>
                  {getSumOfCols.get(col)}
                </div>
              )
            ) : (
              <div key={col} className={classes['not--white']}></div>
            )
          )}
        </div>
      )}
    </div>
  );
};
