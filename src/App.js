import React from 'react';
import 'react-tabs/style/react-tabs.css';
import ReactTooltip from 'react-tooltip';
import styled, { createGlobalStyle } from 'styled-components';

import EmojiList from './EmojiList';
import EmojiSearchResults from './EmojiSearchResults';
import Footer from './Footer';
import Header from './Header';
import Notifications from './Notifications';
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
      recent: [],
      notifications: []
    };

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
    const newNotification = {emoji, timestamp: Date.now()};
    this.setState({
      notifications: [
        newNotification,
        ...this.state.notifications
      ]
    }, () => {
      setTimeout(() => {
        this.setState({ notifications: this.state.notifications.filter(notification => notification !== newNotification) });
      }, 3000);
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
      <Notifications notifications={this.state.notifications} />
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
