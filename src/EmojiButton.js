import Clipboard from 'react-clipboard.js';
import styled from 'styled-components';

const EmojiButton = styled(Clipboard).attrs({
  component: 'a'
})`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  text-align: center;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 2.5em;
  padding: 0;
  z-index: 800;
  line-height: 1.6em;
  font-family: "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "EmojiOne Color", "Android Emoji";

  &:hover {
    background: #E8F4F9;
    border-radius: 5px;
  }

  &.popup {
  }
`;

export default EmojiButton;
