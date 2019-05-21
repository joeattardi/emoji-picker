import React from 'react';
import Popup from 'reactjs-popup'
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

const EmojiButton = styled(Clipboard).attrs({
  component: 'a'
})`
  display: inline-block;
  width: 1em;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 2em;
  transition: transform 0.1s;
  padding: 0;
  margin: 0 0.25em 0.25em 0.25em;

  &:hover {
    transform: scale(2);
  }
`;

const PopupHeader = styled.h2`
  margin: 0;
  font-size: 1em;
  text-align: center;
  margin-bottom: 1em;
`;

export default class Emoji extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPopup: false
    };

    this.hidePopup = this.hidePopup.bind(this);
    this.onClickBaseEmoji = this.onClickBaseEmoji.bind(this);
    this.onClickVariation = this.onClickVariation.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  onClickBaseEmoji(emoji, variation, charSequence) {
    if (emoji.variants && this.props.showModifiers) {
      this.setState({
        showPopup: true
      });
    } else {
      this.props.onCopy(emoji.name, variation, charSequence);
    }
  }

  onClickVariation(emoji, variation, charSequence) {
    this.setState({
      showPopup: false
    });

    this.props.onCopy(emoji.name, variation, charSequence);
  }

  hidePopup() {
    this.setState({
      showPopup: false
    });
  }

  renderPopup(emoji, charSequence) {
    return (
      <Popup
        open={this.state.showPopup}
        onClose={this.hidePopup}
        contentStyle={{
          width: 'auto',
          padding: '0.5em',
          borderRadius: '5px'
        }}>
        <div>
          <PopupHeader>Select a variation</PopupHeader>
          <EmojiButton
            data-clipboard-text={charSequence}
            onClick={() => this.onClickVariation(emoji, null, charSequence)}>
            {charSequence}
          </EmojiButton>
          {emoji.variants.map(variant => (
            <EmojiButton
              key={variant.key}
              data-clipboard-text={variant.emoji}
              onClick={() => this.onClickVariation(emoji, variant.variation, variant.emoji)}>
              {variant.emoji}
            </EmojiButton>
          ))}
        </div>
      </Popup>
    );
  }

  render() {
    const { emoji } = this.props;

    return (
      <>
        <EmojiButton
          data-clipboard-text={emoji.emoji}
          data-tip={emoji.name}
          onClick={() => this.onClickBaseEmoji(emoji, null, emoji.emoji)}>
          {emoji.emoji}
        </EmojiButton>
        {emoji.variants ? this.renderPopup(emoji, emoji.emoji) : null}
      </>
    );
  }
}
