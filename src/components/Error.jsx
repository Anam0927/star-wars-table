import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ErrorDiv = styled.div`
  color: ${(props) => props.theme.red};
  font-size: 2rem;
  padding: 2rem;
  text-align: center;

  h3 {
    font-size: 1rem;
  }
`;

const Error = ({ msg }) => {
  return (
    <ErrorDiv>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <h3>{msg}</h3>
    </ErrorDiv>
  );
};

export default Error;
