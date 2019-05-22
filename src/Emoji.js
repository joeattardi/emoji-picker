import React from 'react';
import Popup from 'reactjs-popup'
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

const EmojiButton = styled(Clipboard).attrs({
  component: 'a'
})`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 2.5em;
  padding: 0;
  z-index: 800;
  line-height: 1.6em;

  &:hover {
    background: #E8F4F9;
    border-radius: 5px;
  }

  &.popup {
  }
`;

const VariantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PopupHeader = styled.h2`
  margin: 0;
  font-size: 1em;
  text-align: center;
  margin-bottom: 1em;
`;

const PopupButtonContainer = styled.div`
  text-align: center;
  margin: 1em;
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
          <VariantGrid>
            <EmojiButton
              className="popup"
              data-clipboard-text={charSequence}
              onClick={() => this.onClickVariation(emoji, null, charSequence)}>
              {charSequence}
            </EmojiButton>
            {emoji.variants.map(variant => (
              <EmojiButton
                className="popup"
                key={variant.key}
                data-clipboard-text={variant.emoji}
                onClick={() => this.onClickVariation(emoji, variant.variation, variant.emoji)}>
                {variant.emoji}
              </EmojiButton>
            ))}
          </VariantGrid>
          <PopupButtonContainer>
            <button onClick={this.hidePopup}>Cancel</button>
          </PopupButtonContainer>
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
