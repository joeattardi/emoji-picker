import React from 'react';
import styled from 'styled-components';

import Notification from './Notification';

const NotificationsContainer = styled.div`
  position: fixed;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 20em;
  left: calc(50% - 10em);
`;

export default function Notifications({ notifications }) {
  return (
    <NotificationsContainer style={{ top: 'calc(100% - ' + (4.5 * notifications.length) + 'em)'}}>
        {[...notifications].reverse().map(notification => (
          <Notification key={notification.timestamp} emoji={notification.emoji} />
        ))}
    </NotificationsContainer>
  );
}
