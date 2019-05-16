import { lib } from 'emojilib';
import React from 'react';
import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

const EmojiButton = styled(Clipboard)`
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.5em;
`;

export default function Emoji({ emoji, onCopy }) {
  return (
    <EmojiButton data-clipboard-text={lib[emoji].char} data-tip={emoji} onClick={() => onCopy(emoji)}>
      {lib[emoji].char}
    </EmojiButton>
  );
}