import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { COLUMNS } from '../containers/columns';

const TableDiv = styled.table`
  border-collapse: collapse;
  text-align: center;
  th {
    border: 1px solid ${(props) => props.theme.white};
    box-shadow: 0 0 10px ${(props) => props.theme.red};

    animation: color-change 20s ease infinite;
    text-shadow: 0 0 0.25em ${(props) => props.theme.red},
      0 0 0.5em ${(props) => props.theme.red};
  }

  thead tr:first-of-type th {
    border-top: 0;
  }

  td {
    border: 1px solid ${(props) => props.theme.white};
    box-shadow: 0 0 10px ${(props) => props.theme.red};

    animation: color-change 20s ease infinite;

    .sub-row {
      margin: 0 1rem;
      min-width: 15ch;
      text-align: left;
    }
  }

  tbody tr {
    vertical-align: top;
  }

  th div,
  tr div {
    padding: 1rem;
    text-transform: capitalize;
  }

  td,
  th {
    min-width: 10ch;
  }

  th:first-of-type,
  td:first-of-type {
    border-left: 0;
  }

  th:last-of-type,
  td:last-of-type {
    border-right: 0;
  }

  tr:last-of-type td {
    border-bottom: none;
  }

  @keyframes color-change {
    0% {
      filter: hue-rotate(0);
    }

    25% {
      filter: hue-rotate(90deg);
    }

    50% {
      filter: hue-rotate(180deg);
    }

    75% {
      filter: hue-rotate(270deg);
    }

    100% {
      filter: hue-rotate(360deg);
    }
  }
`;

const Table = ({ data }) => {
  const columns = useMemo(() => COLUMNS, []);
  const dataProp = useMemo(() => data, [data]);

  const tableInstance = useTable(
    {
      columns,
      data: dataProp,
    },
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <TableDiv {...getTableProps()}>
      <thead>
        {headerGroups.map((group) => (
          <tr {...group.getHeaderGroupProps()}>
            {group.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                <div>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span style={{ margin: '0 0.5em' }}>
                          <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                      ) : (
                        <span style={{ margin: '0 0.5em' }}>
                          <FontAwesomeIcon icon={faChevronUp} />
                        </span>
                      )
                    ) : (
                      ''
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    <div>{cell.render('Cell')}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableDiv>
  );
};

export default Table;
