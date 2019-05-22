import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  text-align: center;
  font-size: 0.9em;
  color: #999999;
`;

export default function Footer() {
  return (
    <Container>
      <p>Created by <a target="_blank" rel="noopener noreferrer" href="https://joeattardi.codes">Joe Attardi</a>.</p>
      <p>Run into issues? Want to contribute? Visit the <a target="_blank" rel="noopener noreferrer" href="https://github.com/joeattardi/emoji-picker">GitHub project</a>.</p>
    </Container>
  );
}
