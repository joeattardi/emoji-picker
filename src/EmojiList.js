import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const categoryIcons = {
  people: ['far', 'smile'],
  animals_and_nature: 'cat',
  food_and_drink: 'coffee',
  activity: 'futbol',
  travel_and_places: ['far', 'building'],
  objects: ['far', 'lightbulb'],
  symbols: 'music',
  flags: ['far', 'flag']
};

class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  onCopy(emoji, propagate = true) {
    this.showToast(emoji);

    if (propagate) {
      this.props.onCopy(emoji);
    }
  }

  showToast(emoji) {
    this.props.toastManager.add(`${lib[emoji].char} copied to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  resetTooltip() {
    setTimeout(() => ReactTooltip.rebuild());
  }

  renderRecents() {
    return (
      <div>
        <button onClick={this.props.onClearRecent}>
          <FontAwesomeIcon icon="trash" /> Clear Recent Emojis
        </button>
        <EmojiCategory
          name="Recent"
          emojis={this.props.recent}
          onCopy={emoji => this.onCopy(emoji, false)} />
      </div>
    );
  }

  renderEmptyRecents() {
    return (
      <div>
        <h2>No recent emojis.</h2>
        <p>Emojis will be added here as you copy them.</p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Tabs defaultIndex={1}>
          <TabList>
            <Tab onClick={this.resetTooltip}>
              <FontAwesomeIcon icon={['far', 'clock']} /> Recent
            </Tab>
            {Object.keys(categoryNames).map(category => (
              <Tab onClick={this.resetTooltip} key={category}>
                <FontAwesomeIcon icon={categoryIcons[category]} /> {categoryNames[category]}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            {this.props.recent.length ? this.renderRecents() : this.renderEmptyRecents()}
          </TabPanel>
          {Object.keys(categoryNames).map(category => (
            <TabPanel key={category}>
              <EmojiCategory
                name={categoryNames[category]}
                emojis={emojiCategories[category]}
                onCopy={this.onCopy} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withToastManager(EmojiList);
