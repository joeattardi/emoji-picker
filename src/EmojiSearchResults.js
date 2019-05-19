import { lib, ordered } from 'emojilib';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';

import Emoji from './Emoji';

class EmojiSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(emoji, modifier) {
    this.props.onCopy(emoji, modifier);
    this.props.toastManager.add(`${modifier ? lib[emoji].char + modifier : lib[emoji].char} copied to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  render() {
    const searchResults = ordered.filter(name => name.indexOf(this.props.searchQuery.toLowerCase()) >= 0);

    return (
      <div>
        {searchResults.map(emojiName => (
          <Emoji key={emojiName} emoji={{emoji: emojiName}} onCopy={this.onCopy} showModifiers={true} />
        ))}
      </div>
    );
  }
}

export default withToastManager(EmojiSearchResults);
