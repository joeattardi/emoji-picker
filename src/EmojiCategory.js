import React from 'react';
import styled from 'styled-components';

import Emoji from './Emoji';

const Container = styled.div`

`;

export default function EmojiCategory({ name, emojis, onCopy, showModifiers }) {
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
