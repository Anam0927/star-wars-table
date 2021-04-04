import React from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const TagLine = styled.h3`
  text-align: center;
  padding-top: 5rem;
  opacity: ${(props) => (props.logoAnimDone ? 1 : 0)};

  transition: opacity 0.3s ease 0.3s;
`;

const Header = ({ logoAnimDone, setLogoAnimDone }) => {
  return (
    <>
      <Logo setLogoAnimDone={setLogoAnimDone} />
      <TagLine logoAnimDone={logoAnimDone}>
        Get all the info about all your fav characters!
      </TagLine>
    </>
  );
};

export default Header;
