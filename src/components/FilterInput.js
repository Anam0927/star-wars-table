import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  font-family: inherit;
  color: inherit;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white};
  outline: none;
  font-size: 1rem;
  padding: 0.5em 1em;

  filter: drop-shadow(0 0 2px ${(props) => props.theme.lightBlue}00)
    drop-shadow(0 0 10px ${(props) => props.theme.lightBlue}00);

  box-shadow: 0 0 0.25em ${(props) => props.theme.lightBlue},
    inset 0 0 0.25em ${(props) => props.theme.lightBlue};

  transition: filter 0.5s;
  &:focus {
    filter: drop-shadow(0 0 2px ${(props) => props.theme.lightBlue})
      drop-shadow(0 0 10px ${(props) => props.theme.lightBlue});
  }

  &::placeholder {
    color: #aaa;
  }
`;

const FilterInput = ({ filter, setFilter }) => {
  const [input, setInput] = useState(filter);
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilter(input);
      console.log('filter changed');
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [input, setFilter]);
  return (
    <InputDiv>
      <Input
        type='text'
        placeholder='Filter by Name'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </InputDiv>
  );
};

export default FilterInput;
