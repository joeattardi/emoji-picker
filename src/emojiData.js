import rawData from 'emoji-datasource';

rawData.sort((e1, e2) => e1.sort_order - e2.sort_order);
const newEmojiData = rawData.map(emojiItem => {
  const newData = {
    name: emojiItem.short_name,
    key: emojiItem.short_name,
    names: emojiItem.short_names,
    unified: emojiItem.unified,
    category: emojiItem.category
  };

  if (emojiItem.skin_variations) {
    newData.variants = Object.keys(emojiItem.skin_variations).map(variation => (
      {
        name: emojiItem.short_name,
        key: `${emojiItem.short_name}-${variation}`,
        unified: emojiItem.skin_variations[variation].unified,
        variation
      }
    ));
  }

  return newData;
});

export default newEmojiData;
