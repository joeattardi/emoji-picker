import React from 'react';
import { SnackbarManager } from 'react-snackbar-alert';
import 'react-snackbar-alert/styles/react-snackbar-alert.css';
import 'react-tabs/style/react-tabs.css';
import ReactTooltip from 'react-tooltip';
import styled, { createGlobalStyle } from 'styled-components';

import EmojiList from './EmojiList';
import EmojiSearchResults from './EmojiSearchResults';
import Footer from './Footer';
import Header from './Header';
import Notification from './Notification';
import Search from './Search';

import './icons';

const RECENT_LENGTH = 25;
const RECENT_KEY = 'recentEmojis';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

  button {
    background: #9FB7DF;
    padding: 0.5em 0.75em;
    font-size: 1em;
    border-radius: 3px;
    cursor: pointer;
    font-weight: bold;
    border: none;
    color: #FFFFFF;
  }
`;

const Main = styled.main`
  padding: 0.5em;
  padding-top: 4em;
  max-width: 80em;
  margin: auto;
  position: relative;
`;

const Content = styled.div`
  margin-top: 6em;
`;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      recent: []
    };

    this.snackbarManager = React.createRef();

    this.clearRecent = this.clearRecent.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onCopy = this.onCopy.bind(this);
  }

  componentDidMount() {
    try {
      const savedRecents = JSON.parse(localStorage.getItem(RECENT_KEY));
      if (savedRecents) {
        this.setState({
          recent: savedRecents
        });
      }
    } catch (e) {}
  }

  clearRecent() {
    this.setState({
      recent: []
    }, () => localStorage.removeItem(RECENT_KEY));
  }
  
  showNotification(emoji) {
    this.snackbarManager.current.create({
      data: {
        emoji
      }
    });
  }

  onCopy(emoji, variation, addToRecents = true) {
    this.showNotification(variation ? emoji.variants[variation].emoji : emoji.emoji);

    if (addToRecents) {
      this.setState({
        recent: [
          { name: emoji.name, variation },
          ...this.state.recent.filter(e => e.name !== emoji.name || e.variation !== variation)
        ].slice(0, RECENT_LENGTH)
      }, () => localStorage.setItem(RECENT_KEY, JSON.stringify(this.state.recent)));
    }
  }

  doSearch(searchQuery) {
    this.setState({
      search: searchQuery
    });

    setTimeout(() => {
      ReactTooltip.rebuild();
    })
  }

  render() {
    return (
      <>
      <SnackbarManager ref={this.snackbarManager} component={Notification} />
      <ReactTooltip effect="solid" />
        <div>
          <GlobalStyle />
          <Header />
          <Main>
            <Search onSearch={this.doSearch} />
            <Content>
              {this.state.search ? <EmojiSearchResults searchQuery={this.state.search} onCopy={this.onCopy} /> : <EmojiList onCopy={this.onCopy} recent={this.state.recent} onClearRecent={this.clearRecent} />}
            </Content>
          </Main>
          <Footer />
        </div>
      </>
    );
  }
}
