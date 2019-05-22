import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import styled from 'styled-components';

import emojiData from './data/emoji.json';

import Emoji from './Emoji';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 4em);
  justify-content: center;
  align-self: stretch;
`;

export default class EmojiSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(name, variation, emoji) {
    this.props.onCopy(name, variation, emoji);
  }

  renderSearchResults(searchResults) {
    return (
    <ResultsContainer>
      {searchResults.map(emoji => (
        <Emoji key={emoji.key} emoji={emoji} onCopy={this.onCopy} showModifiers={true} />
      ))}
    </ResultsContainer>
    );
  }

  renderNotFound() {
    return (
      <NotFoundContainer>
        <FontAwesomeIcon size="4x" icon={['far', 'frown-open']} />
        <h2>No emojis found.</h2>
        <p>
          No emojis were found matching <strong>{this.props.searchQuery}</strong>.
        </p>
      </NotFoundContainer>
    );
  }

  render() {
    const searchTerm = this.props.searchQuery.toLowerCase();
    const searchResults = emojiData.filter(emoji => (
      emoji.name.indexOf(searchTerm) >= 0 ||
        emoji.names.find(name => name.indexOf(searchTerm) >= 0)
    ));

    return (
      <div>
        {searchResults.length ? this.renderSearchResults(searchResults) : this.renderNotFound()}
      </div>
    );
  }
}
