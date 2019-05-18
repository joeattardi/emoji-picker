import { lib, ordered } from 'emojilib';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';

import Emoji from './Emoji';

class EmojiSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(emoji) {
    this.props.onCopy(emoji);
    this.props.toastManager.add(`${lib[emoji].char} copied to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  render() {
    const searchResults = ordered.filter(name => name.indexOf(this.props.searchQuery.toLowerCase()) >= 0);

    return (
      <div>
        {searchResults.map(emojiName => (
          <Emoji key={emojiName} emoji={emojiName} onCopy={this.onCopy} />
        ))}
      </div>
    );
  }
}

export default withToastManager(EmojiSearchResults);
