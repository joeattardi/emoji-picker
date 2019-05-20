import emojiData from 'emoji-datasource';
import React from 'react';
import { withToastManager } from 'react-toast-notifications';

import Emoji from './Emoji';

class EmojiSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(name, variation, emoji) {
    this.props.onCopy(name, variation, emoji);
    this.props.toastManager.add(`${emoji} copied to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  render() {
    const searchResults = emojiData.filter(emoji => emoji.short_name.indexOf(this.props.searchQuery.toLowerCase()) >= 0);

    return (
      <div>
        {searchResults.map(emoji => (
          <Emoji key={emoji.key} emoji={emoji} onCopy={this.onCopy} showModifiers={true} />
        ))}
      </div>
    );
  }
}

export default withToastManager(EmojiSearchResults);
