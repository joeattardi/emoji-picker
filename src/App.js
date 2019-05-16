import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faCat, faCoffee, faFutbol, faMusic } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { DefaultToast, ToastProvider } from 'react-toast-notifications';
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

const ToastBody = styled.div`
  font-size: 1.5em;
`;

const CustomToast = ({ children, ...props }) => (
  <DefaultToast {...props}>
    <ToastBody>{children}</ToastBody>
  </DefaultToast>
);

library.add(faBuilding, faCat, faCoffee, faFlag, faFutbol, faLightbulb, faMusic, faSmile);

export default function App() {
  return (
    <ToastProvider placement="top-center" autoDismissTimeout={2000} components={{ Toast: CustomToast }}>
      <ReactTooltip effect="solid" />
      <div>
        <GlobalStyle />
        <Header>
          <h1><FontAwesomeIcon icon={['far', 'smile']} /> Emoji Picker</h1>
        </Header>
        <Main>
          <EmojiList />
        </Main>
      </div>
    </ToastProvider>
  );
}
