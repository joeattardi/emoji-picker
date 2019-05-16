import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withToastManager } from 'react-toast-notifications';
import ReactTooltip from 'react-tooltip';
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

class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.showToast = this.showToast.bind(this);
  }

  showToast(emoji) {
    this.props.toastManager.add(`Copied ${lib[emoji].char} to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  resetTooltip() {
    setTimeout(() => ReactTooltip.rebuild());
  }

  render() {
    return (
      <div>
        <Tabs>
          <TabList>
            {Object.keys(categoryNames).map(category => (
              <Tab onClick={this.resetTooltip} key={category}>{categoryNames[category]}</Tab>
            ))}
          </TabList>
          {Object.keys(categoryNames).map(category => (
            <TabPanel key={category}>
              <EmojiCategory
                name={categoryNames[category]}
                emojis={emojiCategories[category]}
                onCopy={this.showToast} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withToastManager(EmojiList);
