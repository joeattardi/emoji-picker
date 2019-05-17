import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faFlag, faLightbulb, faSmile } from '@fortawesome/free-regular-svg-icons';
import { faCat, faCoffee, faFutbol, faMusic } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { DefaultToast, ToastProvider, withToastManager } from 'react-toast-notifications';
import ReactTooltip from 'react-tooltip';
import styled, { createGlobalStyle } from 'styled-components';

import EmojiList from './EmojiList';
import EmojiSearchResults from './EmojiSearchResults';
import Search from './Search';

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
  max-width: 80em;
  margin: auto;
`;

const Instructions = styled.div`
  margin: 1em;
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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };

    this.doSearch = this.doSearch.bind(this);
  }

  doSearch(searchQuery) {
    this.setState({
      search: searchQuery
    });
    ReactTooltip.rebuild();
  }

  render() {
    return (
      <ToastProvider placement="top-center" autoDismissTimeout={2000} components={{ Toast: CustomToast }}>
        <ReactTooltip effect="solid" />
        <div>
          <GlobalStyle />
          <Header>
            <h1><FontAwesomeIcon icon={['far', 'smile']} /> Emoji Picker</h1>
          </Header>
          <Main>
            <Search onSearch={this.doSearch} />
            <Instructions>
              Click on an emoji to copy it to the clipboard.
            </Instructions>
            {this.state.search ? <EmojiSearchResults searchQuery={this.state.search} /> : <EmojiList />}
          </Main>
        </div>
      </ToastProvider>
    );
  }
}
