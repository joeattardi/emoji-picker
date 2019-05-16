import React from 'react';
import styled from 'styled-components';

import Emoji from './Emoji';

const Heading = styled.h2`
  margin: 0;
`;

const Container = styled.div`
  margin-bottom: 1em;
`;

export default function EmojiCategory({ name, emojis, onCopy }) {
  return (
    <Container>
      <Heading>{name}</Heading>
      <div>
        {emojis.map(emoji => <Emoji emoji={emoji} key={emoji} onCopy={emoji => onCopy(emoji)} />)}
      </div>
    </Container>
  );
}