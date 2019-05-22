import React from 'react';
import styled from 'styled-components';

import Emoji from './Emoji';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 4em);
  justify-content: center;
  align-self: stretch;
`;

export default function EmojiCategory({ emojis, onCopy, showModifiers }) {
  return (
      <Container>
        {emojis.map(emoji => (
          <Emoji
            emoji={emoji}
            showModifiers={showModifiers}
            key={emoji.key}
            onCopy={onCopy} />
        ))}
      </Container>
  );
}
