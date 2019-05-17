import { ordered } from 'emojilib';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';

import Emoji from './Emoji';

class EmojiSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.showToast = this.showToast.bind(this);
  }

  showToast(emoji) {
    this.props.toastManager.add(`Copied ${emoji} to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  render() {
    const searchResults = ordered.filter(name => name.indexOf(this.props.searchQuery) >= 0);

    return (
      <div>
        {searchResults.map(emojiName => (
          <Emoji key={emojiName} emoji={emojiName} onCopy={this.showToast} />
        ))}
      </div>
    );
  }
}

export default withToastManager(EmojiSearchResults);
