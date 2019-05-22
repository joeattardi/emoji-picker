import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import emojiData from './data/emoji.json';

import EmojiCategory from './EmojiCategory';
import RecentEmoji from './RecentEmoji';

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

const Container = styled.div`
  .react-tabs__tab {
    border-radius: 0;
    border: none;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.2);
    }
  }

  .react-tabs__tab-list {
    border: none;
    font-size: 2em;
    color: #999999;
    background: #FFFFFF;
    text-align: center;
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    width: 100%;
    padding-bottom: 10px;
    z-index: 900;
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

export default class EmojiList extends React.Component {
  constructor(props) {
    super(props);

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(emoji, variation, addToRecents = true) {
    this.props.onCopy(emoji, variation, addToRecents);
  }

  resetTooltip() {
    setTimeout(() => ReactTooltip.rebuild());
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
            <RecentEmoji onCopy={this.onCopy} recent={this.props.recent} onClearRecent={this.props.onClearRecent} />
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
