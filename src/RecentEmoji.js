import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';

import emojiData from './data/emoji.json';

import EmojiCategory from './EmojiCategory';

const RecentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyRecents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

export default class RecentEmoji extends React.Component {
  renderEmptyRecents() {
    return (
      <EmptyRecents>
        <FontAwesomeIcon size="4x" icon={['far', 'clock']} />
        <h2>No recent emojis.</h2>
        <p>Emojis will be added here as you copy them.</p>
      </EmptyRecents>
    );
  }

  renderRecents() {
    const recents = this.props.recent.map(recent => {
      const recentEmoji = emojiData.find(data => data.name === recent.name);
      return recent.variation ? recentEmoji.variants[recent.variation] : recentEmoji;
    });

    return (
      <RecentsContainer>
        <button onClick={this.props.onClearRecent} style={{margin: '1em'}}>
          Clear Recent Emojis
        </button>
        <EmojiCategory
          name="Recent"
          emojis={recents}
          onCopy={(emoji, variation) => this.props.onCopy(emoji, variation, false)} />
      </RecentsContainer>
    );
  }

  render() {
    return this.props.recent.length ? this.renderRecents() : this.renderEmptyRecents();
  }
}
