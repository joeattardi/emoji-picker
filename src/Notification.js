import React from 'react';
import { Snackbar } from 'react-snackbar-alert';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.div`
  font-size: 2em;
`;

const Message = styled.div`
  line-height: 2em;
  margin-left: 0.25em;
`;

export default function Notification(props) {
  return (
    <Snackbar {...props}>
      <Container>
        <Emoji>{props.data.emoji}</Emoji>
        <Message>copied</Message>
      </Container>
    </Snackbar>   
  );
}
