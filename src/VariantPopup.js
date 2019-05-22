import React from 'react';
import Popup from 'reactjs-popup'
import styled from 'styled-components';

import EmojiButton from './EmojiButton';

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

export default class VariantPopup extends React.Component {
  constructor(props) {
    super(props);

    this.onClickVariation = this.onClickVariation.bind(this);
  }

  onClickVariation(emoji, variation) {
    this.props.onClose();
    this.props.onCopy(emoji, variation);
  }

  render() {
    const { emoji } = this.props;

    return (
      <Popup
        open={this.props.open}
        onClose={this.props.onClose}
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
              data-clipboard-text={emoji.emoji}
              onClick={() => this.onClickVariation(emoji, null, emoji.emoji)}>
              {emoji.emoji}
            </EmojiButton>
            {Object.keys(emoji.variants).map(variant => (
              <EmojiButton
                className="popup"
                key={emoji.variants[variant].key}
                data-clipboard-text={emoji.variants[variant].emoji}
                onClick={() => this.onClickVariation(emoji, variant, emoji.variants[variant].emoji)}>
                {emoji.variants[variant].emoji}
              </EmojiButton>
            ))}
          </VariantGrid>
          <PopupButtonContainer>
            <button onClick={this.props.onClose}>Cancel</button>
          </PopupButtonContainer>
        </div>
      </Popup>
    );
  }
}
