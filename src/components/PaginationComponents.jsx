import React, { useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const ButtonDiv = styled.div`
  width: 50%;
  margin: 2rem auto 0;
  display: flex;
  justify-content: center;

  p {
    line-height: 1.5rem;
    font-size: 0.75rem;
  }
`;

const Button = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0 1rem;

  display: grid;
  place-items: center;

  border-radius: 50%;
  font-size: 0.5rem;
  line-height: 1.5rem;

  background-color: transparent;
  border: 1px solid ${(props) => props.theme.green};
  color: ${(props) => props.theme.green};

  cursor: pointer;
  outline: none;
  filter: drop-shadow(0 0 2px ${(props) => props.theme.green})
    drop-shadow(0 0 2px ${(props) => props.theme.green});
  transition: 0.3s linear;

  &:hover {
    border-color: white;
    color: ${(props) => props.theme.white};
  }
`;

const PaginationComponents = ({ next, previous, setCurrent, count }) => {
  const totalPages = (count) => {
    const perfectTens = Math.floor(count / 10);
    const remainder = count % 10;

    return remainder > 0 ? perfectTens + 1 : perfectTens;
  };
  const page = useRef(1);
  return (
    <ButtonDiv>
      <Button
        title='Previous Page'
        onClick={() => {
          setCurrent(previous);
          page.current -= 1;
        }}
        disable={!previous}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <p>
        Page {page.current} of {totalPages(count.current)}
      </p>
      <Button
        title='Next Page'
        onClick={() => {
          setCurrent(next);
          page.current += 1;
        }}
        disable={!next}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </ButtonDiv>
  );
};

export default PaginationComponents;
