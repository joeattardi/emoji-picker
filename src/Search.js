import debounce from 'debounce';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const SearchInput = styled.input.attrs({
  type: 'text'
})`
  font-size: 1.5em;
  width: 22em;
  max-width: calc(100% - 1em);
  padding: 0.5em;
  border: 1px solid #999999;
  border-radius: 5px;
  margin: 1em;
`;

export default function Search({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedOnSearch = debounce(onSearch, 200);

  function onQueryChange(event) {
    setSearchQuery(event.target.value);
    debouncedOnSearch(event.target.value);
  }

  return (
    <Container>
      <SearchInput placeholder="Search emojis..." value={searchQuery} onChange={onQueryChange} />
    </Container>
  );
}
