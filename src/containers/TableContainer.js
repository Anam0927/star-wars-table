import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleData, setPeopleData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get('https://swapi.dev/api/people/')
      .then((response) => {
        setPeopleData(response.data);
        setIsLoading(false);
      })
      .catch((error) => setIsError(error));
  }, []);

  return <>{console.log(peopleData)}</>;
};

export default TableContainer;
