import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SpinnerDiv = styled.div`
  color: #ffe81f;
  font-size: 2rem;
  padding: 2rem;
  text-align: center;

  svg {
    animation: rotate 2.5s cubic-bezier(0.09, 1.29, 0.93, -0.15) infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <SpinnerDiv>
      <FontAwesomeIcon icon={faSpinner} />
    </SpinnerDiv>
  );
};

export default Spinner;
