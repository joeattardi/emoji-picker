import { fitzpatrick_scale_modifiers, lib } from 'emojilib';
import React from 'react';
import Popup from 'reactjs-popup'
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

const EmojiButton = styled(Clipboard)`
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.5em;
  transition: transform 0.1s;
  padding: 0.25em;

  &:hover {
    transform: scale(1.5);
  }
`;

const PopupHeader = styled.h2`
  margin: 0;
  font-size: 1em;
  text-align: center;
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
  }

  onClickBaseEmoji(emoji, modifier) {
    if (lib[emoji].fitzpatrick_scale && this.props.showModifiers) {
      this.setState({
        showPopup: true
      });
    } else {
      this.props.onCopy(emoji, modifier);
    }
  }

  onClickVariation(emoji, modifier) {
    this.setState({
      showPopup: false
    });

    this.props.onCopy(emoji, modifier);
  }

  hidePopup() {
    this.setState({
      showPopup: false
    });
  }

  render() {
    const { emoji } = this.props;
    return (
      <span>
        <EmojiButton
          data-clipboard-text={emoji.modifier ? lib[emoji.emoji].char + emoji.modifier : lib[emoji.emoji].char}
          data-tip={emoji.emoji}
          onClick={() => this.onClickBaseEmoji(emoji.emoji, emoji.modifier)}>
          {emoji.modifier ? lib[emoji.emoji].char + emoji.modifier : lib[emoji.emoji].char}
        </EmojiButton>
        <Popup
          open={this.state.showPopup}
          onClose={this.hidePopup}
          contentStyle={{
            width: 'auto',
            padding: '0.5em'
          }}>
          <div>
            <PopupHeader>Select a variation</PopupHeader>
            <EmojiButton
              data-clipboard-text={lib[emoji.emoji].char}
              onClick={() => this.onClickVariation(emoji.emoji)}>
              {lib[emoji.emoji].char}
              </EmojiButton>
            {fitzpatrick_scale_modifiers.map(modifier => (
              <EmojiButton
                key={`${emoji.emoji}-${modifier}`}
                data-clipboard-text={lib[emoji.emoji].char + modifier}
                onClick={() => this.onClickVariation(emoji.emoji, modifier)}>
                {lib[emoji.emoji].char + modifier}
              </EmojiButton>
            ))}
          </div>
        </Popup>
      </span>
    );
  }
}
