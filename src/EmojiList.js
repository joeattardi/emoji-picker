import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withToastManager } from 'react-toast-notifications';
import ReactTooltip from 'react-tooltip';

import emojiData from './data/emoji.json';

import EmojiCategory from './EmojiCategory';

const emojiCategories = {};

emojiData.forEach(emoji => {
  let categoryList = emojiCategories[emoji.category];
  if (!categoryList) {
    categoryList = emojiCategories[emoji.category] = [];
  }

  categoryList.push(emoji);
});

const categoryOrder = [
  'Smileys & People',
  'Animals & Nature',
  'Food & Drink',
  'Activities',
  'Travel & Places',
  'Objects',
  'Symbols',
  'Flags'
];

const categoryIcons = {
  'Smileys & People': ['far', 'smile'],
  'Animals & Nature': 'cat',
  'Food & Drink': 'coffee',
  'Activities': 'futbol',
  'Travel & Places': ['far', 'building'],
  'Objects': ['far', 'lightbulb'],
  'Symbols': 'music',
  'Flags': ['far', 'flag']
};

class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
    this.showToast = this.showToast.bind(this);
  }

  onCopy(name, variation, emoji, propagate = true) {
    this.showToast(emoji);

    if (propagate) {
      this.props.onCopy(name, variation, emoji);
    }
  }

  showToast(emoji) {
    this.props.toastManager.add(`${emoji} copied to clipboard!`, { 
      appearance: 'success',
      autoDismiss: true
    });
  }

  resetTooltip() {
    setTimeout(() => ReactTooltip.rebuild());
  }

  renderRecents() {
    const recents = this.props.recent.map(recent => {
      const recentEmoji = emojiData.find(data => data.name === recent.name);
      return recent.variation ? recentEmoji.variants.find(variant => variant.variation === recent.variation) : recentEmoji;
    });

    return (
      <div>
        <button onClick={this.props.onClearRecent}>
          <FontAwesomeIcon icon="trash" /> Clear Recent Emojis
        </button>
        <EmojiCategory
          name="Recent"
          emojis={recents}
          onCopy={(name, variation, emoji) => this.onCopy(name, variation, emoji, false)} />
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
            {categoryOrder.map(category => (
              <Tab onClick={this.resetTooltip} key={category}>
                <FontAwesomeIcon icon={categoryIcons[category]} /> {category}
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            {this.props.recent.length ? this.renderRecents() : this.renderEmptyRecents()}
          </TabPanel>
          {categoryOrder.map(category => (
            <TabPanel key={category}>
              <EmojiCategory
                name={category}
                emojis={emojiCategories[category]}
                showModifiers={true}
                onCopy={this.onCopy} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default withToastManager(EmojiList);
