import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Spinner from '../components/Spinner';
import Error from '../components/Error';
import Table from '../components/Table';
import PaginationComponents from '../components/PaginationComponents';
import FilterInput from '../components/FilterInput';

const TableContainerDiv = styled.div`
  width: 100%;
  margin: 2rem auto 0;

  min-height: 500px;
  position: relative;
  overflow: auto;
  background-color: transparent;

  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 2px;
    border: none;
    transition: 0.3s;
    box-shadow: inset 0 0 6px ${(props) => props.theme.red};
  }

  scrollbar-width: thin;
  scrollbar-color: ${(props) => props.theme.red} transparent;
`;

const TableContainer = ({ logoAnimDone }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleData, setPeopleData] = useState(null);
  const [isError, setIsError] = useState(false);

  const [next, setNext] = useState(null);
  const [current, setCurrent] = useState('https://swapi.dev/api/people/');
  const [previous, setPrevious] = useState(null);

  const [filter, setFilter] = useState('');

  const count = useRef(null);

  useEffect(() => {
    let results;
    setIsLoading(true);

    if (!filter) {
      axios
        .get(current)
        .then((response) => {
          results = response.data.results;
          setNext(response.data.next);
          setPrevious(response.data.previous);
          count.current = response.data.count;

          return axios.all([
            axios.all(
              results.map(
                (result) => result.species !== null && axios.get(result.species)
              )
            ),
            axios.all(
              results.map((result) => {
                return axios.all(result.films.map((r) => axios.get(r)));
              })
            ),
            axios.all(
              results.map(
                (result) =>
                  result.homeworld !== null && axios.get(result.homeworld)
              )
            ),
            axios.all(
              results.map((result) => {
                return (
                  result.starships.length !== 0 &&
                  axios.all(result.starships.map((r) => axios.get(r)))
                );
              })
            ),
            axios.all(
              results.map((result) => {
                return (
                  result.vehicles.length !== 0 &&
                  axios.all(result.vehicles.map((r) => axios.get(r)))
                );
              })
            ),
          ]);
        })
        .then((res) => {
          res[0].forEach(
            (r, index) =>
              (results[index].species = r.data.name ? r.data.name : 'Human')
          );
          res[1].forEach(
            (r, index) =>
              (results[index].films = r.map((film) => film.data.title))
          );
          res[2].forEach(
            (r, index) => (results[index].homeworld = r.data.name)
          );
          res[3].forEach(
            (r, index) =>
              (results[index].starships = !r
                ? 'None'
                : r.map((ship) => ship.data.name))
          );
          res[4].forEach(
            (r, index) =>
              (results[index].vehicles = !r
                ? 'None'
                : r.map((vehicle) => vehicle.data.name))
          );
          setPeopleData(results);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(error.message);
          setPeopleData(null);
        });
    } else {
      axios
        .get(`https://swapi.dev/api/people/?search=${filter}`)
        .then((response) => {
          results = response.data.results;
          setNext(response.data.next);
          setPrevious(response.data.previous);
          count.current = response.data.count;

          return axios.all([
            axios.all(
              results.map(
                (result) => result.species !== null && axios.get(result.species)
              )
            ),
            axios.all(
              results.map((result) => {
                return axios.all(result.films.map((r) => axios.get(r)));
              })
            ),
            axios.all(
              results.map(
                (result) =>
                  result.homeworld !== null && axios.get(result.homeworld)
              )
            ),
            axios.all(
              results.map((result) => {
                return (
                  result.starships.length !== 0 &&
                  axios.all(result.starships.map((r) => axios.get(r)))
                );
              })
            ),
            axios.all(
              results.map((result) => {
                return (
                  result.vehicles.length !== 0 &&
                  axios.all(result.vehicles.map((r) => axios.get(r)))
                );
              })
            ),
          ]);
        })
        .then((res) => {
          res[0].forEach(
            (r, index) =>
              (results[index].species = r.data.name ? r.data.name : 'Human')
          );
          res[1].forEach(
            (r, index) =>
              (results[index].films = r.map((film) => film.data.title))
          );
          res[2].forEach(
            (r, index) => (results[index].homeworld = r.data.name)
          );
          res[3].forEach(
            (r, index) =>
              (results[index].starships = !r
                ? 'None'
                : r.map((ship) => ship.data.name))
          );
          res[4].forEach(
            (r, index) =>
              (results[index].vehicles = !r
                ? 'None'
                : r.map((vehicle) => vehicle.data.name))
          );
          setPeopleData(results);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(error.message);
          setPeopleData(null);
        });
    }
  }, [current, filter]);

  return (
    logoAnimDone && (
      <>
        <FilterInput filter={filter} setFilter={setFilter} />
        <TableContainerDiv>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <Error msg={isError} />
          ) : (
            peopleData && <Table data={peopleData} />
          )}
        </TableContainerDiv>
        {!isLoading && !isError && (
          <PaginationComponents
            next={next}
            previous={previous}
            setCurrent={setCurrent}
            count={count}
          />
        )}
      </>
    )
  );
};

export default TableContainer;
