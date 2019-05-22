import React from 'react';

import EmojiButton from './EmojiButton';
import VariantPopup from './VariantPopup';

export default class Emoji extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };

    this.hidePopup = this.hidePopup.bind(this);
    this.onClickBaseEmoji = this.onClickBaseEmoji.bind(this);
  }

  onClickBaseEmoji(emoji, variation) {
    if (emoji.variants && this.props.showModifiers) {
      this.setState({
        showPopup: true
      });
    } else {
      this.props.onCopy(emoji, variation);
    }
  }

  hidePopup() {
    this.setState({
      showPopup: false
    });
  }

  render() {
    const { emoji } = this.props;

    return (
      <>
        <EmojiButton
          data-clipboard-text={emoji.emoji}
          data-tip={emoji.name}
          onClick={() => this.onClickBaseEmoji(emoji)}>
          {emoji.emoji}
        </EmojiButton>
        {emoji.variants ? 
          <VariantPopup
            emoji={emoji}
            open={this.state.showPopup}
            onClose={this.hidePopup}
            onCopy={this.props.onCopy} /> : null}
      </>
    );
  }
}
