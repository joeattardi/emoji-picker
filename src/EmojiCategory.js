import React from 'react';
import Emoji from './Emoji';

export default function EmojiCategory({ name, emojis, onCopy }) {
  return (
      <div>
        {emojis.map(emoji => (
          <Emoji
            emoji={emoji}
            key={emoji}
            onCopy={emoji => onCopy(emoji)} />
        ))}
      </div>
  );
}
