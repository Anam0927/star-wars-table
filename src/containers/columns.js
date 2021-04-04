import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faAndroid } from '@fortawesome/free-brands-svg-icons';

export const COLUMNS = [
  {
    Header: 'General',
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Year of Birth',
        accessor: 'birth_year',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Species',
        accessor: 'species',
        Cell: (row) => {
          return row.value === 'Human' ? (
            <>
              <FontAwesomeIcon icon={faUserCircle} />
              <br />
              <p style={{ fontSize: '0.75rem' }}>{row.value}</p>
            </>
          ) : row.value === 'Droid' ? (
            <>
              <FontAwesomeIcon icon={faAndroid} />
              <br />
              <p style={{ fontSize: '0.75rem' }}>{row.value}</p>
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faQuestionCircle} />
              <br />
              <p style={{ fontSize: '0.75rem' }}>{row.value}</p>
            </>
          );
        },
      },
      {
        Header: 'Films',
        accessor: 'films',
        Cell: (row) => {
          return (
            <ul class='sub-row'>
              {row.value.map((value) => (
                <li>{value}</li>
              ))}
            </ul>
          );
        },
      },
    ],
  },
  {
    Header: 'Metadata',
    columns: [
      {
        Header: 'Home World',
        accessor: 'homeworld',
      },
      {
        Header: 'Starships',
        accessor: 'starships',
        Cell: (row) => {
          return Array.isArray(row.value) ? (
            <ul class='sub-row'>
              {row.value.map((value) => (
                <li>{value}</li>
              ))}
            </ul>
          ) : (
            <div>None</div>
          );
        },
      },
      {
        Header: 'Vehicles',
        accessor: 'vehicles',
        Cell: (row) => {
          return Array.isArray(row.value) ? (
            <ul class='sub-row'>
              {row.value.map((value) => (
                <li>{value}</li>
              ))}
            </ul>
          ) : (
            <div>None</div>
          );
        },
      },
    ],
  },
  {
    Header: 'Physical Traits',
    columns: [
      {
        Header: 'Eye Color',
        accessor: 'eye_color',
      },
      {
        Header: 'Hair Color',
        accessor: 'hair_color',
      },
      {
        Header: 'Height',
        accessor: 'height',
      },
      {
        Header: 'mass',
        accessor: 'mass',
      },
      {
        Header: 'Skin Color',
        accessor: 'skin_color',
      },
    ],
  },
];
