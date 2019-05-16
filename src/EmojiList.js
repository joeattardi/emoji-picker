import React from 'react';
import { lib } from 'emojilib';

import EmojiCategory from './EmojiCategory';

const emojiCategories = {};

Object.keys(lib).forEach(emojiName => {
  const emoji = lib[emojiName];

  let categoryList = emojiCategories[emoji.category];
  if (!categoryList) {
    categoryList = emojiCategories[emoji.category] = [];
  }

  categoryList.push(emojiName);
});

const categoryNames = {
  people: 'Smileys & People',
  animals_and_nature: 'Animals & Nature',
  food_and_drink: 'Food & Drink',
  activity: 'Activity',
  travel_and_places: 'Travel and Places',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags'
};

export default function EmojiList() {
  return (
    <div>
      {Object.keys(categoryNames).map(category => <EmojiCategory name={categoryNames[category]} emojis={emojiCategories[category]} key={category} />)}
    </div>
  );
}
