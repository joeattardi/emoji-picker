import React from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5em;
  border-radius: 5px;
  text-align: center;
  width: calc(100% - 1em);
  margin: auto;
  height: 3em;
  line-height: 3em;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
`;

const EmojiContainer = styled.div`
  font-size: 1.5em;
  margin-right: 0.25em;
`;

export default function Notification({ emoji }) {
  return (
    <NotificationContainer>
      <EmojiContainer>{emoji}</EmojiContainer>
      <div>copied to clipboard</div>
    </NotificationContainer>
  );
}
