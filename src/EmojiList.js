import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { withToastManager } from 'react-toast-notifications';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

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

const EmptyRecents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  .react-tabs__tab {
    background: transparent;
    border-radius: 0;
    border: none;
  }

  .react-tabs__tab-list {
    border: none;
    font-size: 2em;
    height: calc(2em + 10px);
    color: #999999;
    background: #FFFFFF;
    text-align: center;
    position: fixed;
    width: 100%;
  }

  .react-tabs__tab-panel {
    padding-top: calc(4em + 10px);
  }

  .react-tabs__tab--selected {
    color: #ACD7EC;
    border-bottom: 5px solid #ACD7EC;
  }

  @media (max-width: 700px) {
    .react-tabs__tab-list {
      font-size: 1em;
    }
    
    .react-tabs__tab-panel {
      padding-top: calc(2em + 10px);
    }
  }
`;

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
      <EmptyRecents>
        <FontAwesomeIcon size="4x" icon={['far', 'clock']} />
        <h2>No recent emojis.</h2>
        <p>Emojis will be added here as you copy them.</p>
      </EmptyRecents>
    );
  }

  render() {
    return (
      <Container>
        <Tabs defaultIndex={1}>
          <TabList>
            <Tab onClick={this.resetTooltip} data-tip="Recent">
              <FontAwesomeIcon icon={['far', 'clock']} />
            </Tab>
            {categoryOrder.map(category => (
              <Tab onClick={this.resetTooltip} key={category}>
                <FontAwesomeIcon icon={categoryIcons[category]} data-tip={category} />
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
      </Container>
    );
  }
}

export default withToastManager(EmojiList);
