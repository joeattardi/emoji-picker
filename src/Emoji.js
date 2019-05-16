import { lib } from 'emojilib';
import React from 'react';
import styled from 'styled-components';

const EmojiButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 1.5em;
`;

export default function Emoji({ emoji }) {
  return (
    <>
      <EmojiButton data-tip={emoji}>
        {lib[emoji].char}
      </EmojiButton>
    </>
  );
}