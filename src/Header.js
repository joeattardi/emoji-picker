import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import styled from 'styled-components';

import prism from './prism.png';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  background: url('${prism}');
  color: #FFFFFF;
  padding: 0.5em;
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 3em;

  h1 {
    margin: 0;
    margin-left: 0.5em;
    font-size: 1.75em;
    font-weight: normal;
  }
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: 1em 1em;
  grid-gap: 0.1em;
  font-size: 1.5em;
  color: #FFFC7F;
`;

export default function Header() {
  return (
    <StyledHeader>
      <EmojiGrid>
          <FontAwesomeIcon size="1x" icon={['far', 'smile']} />
          <FontAwesomeIcon size="1x" icon={['far', 'smile-wink']} />
          <FontAwesomeIcon size="1x" icon={['far', 'surprise']} />
          <FontAwesomeIcon size="1x" icon={['far', 'laugh-beam']} />
      </EmojiGrid>
      <h1>Emoji Picker</h1>
    </StyledHeader>
  );
}
