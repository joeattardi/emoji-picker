import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled, { createGlobalStyle } from 'styled-components';

import EmojiList from './EmojiList';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }
`;

const Header = styled.header`
  background: #666666;
  color: #FFFFFF;
  padding: 0.5em;

  h1 {
    margin: 0;
  }
`;

const Main = styled.main`
  padding: 0.5em;
`;

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <ReactTooltip effect="solid" />
      <Header>
        <h1><span role="img" aria-label="Smiley face">😀</span> Emoji Picker</h1>
      </Header>
      <Main>
        <EmojiList />
      </Main>
    </div>
  );
}
