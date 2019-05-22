import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  position: fixed;
  width: 100%;
  left: 0;
  height: 6em;
  background: #FFFFFF;
  z-index: 998;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 1.5em;
  color: #999999;
  position: absolute;
  right: 0.75em;
  top: calc(50% - 0.5em);
`;

const ClearIcon = styled(SearchIcon)`
  cursor: pointer;
`;

const SearchContainer = styled.div`
  position: relative;
  margin: auto;
  padding: 0.5em;
  width: 33em;

  @media (max-width: 700px) {
    width: 20em;
  }
`;

const SearchInput = styled.input.attrs({
  type: 'text'
})`
  width: calc(100% - 3em);
  font-size: 1.2em;
  padding: 0.75em;
  padding-right: 2em;
  border: 1px solid #999999;
  border-radius: 5px;
  outline: none;

  &:focus {
    border: 1px solid #ACD7EC;
  }

  &::placeholder {
    color: #CCCCCC;
  }
`;

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: ''
    };

    this.clearQuery = this.clearQuery.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onQueryChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
    this.props.onSearch(event.target.value);
  }

  onKeyUp(event) {
    if (event.key === 'Escape') {
      this.clearQuery();
    }
  }

  clearQuery() {
    this.setState({
      searchQuery: ''
    });
    this.props.onSearch('');
  }

  render() {
    return (
      <Container>
        <SearchContainer>
          <SearchInput
            placeholder="Search emojis..."
            value={this.state.searchQuery}
            onChange={this.onQueryChange}
            onKeyUp={this.onKeyUp} />
          {this.state.searchQuery ? <ClearButton onClick={this.clearQuery} /> : <SearchIcon icon="search" fixedWidth={true} />}
        </SearchContainer>
      </Container>
    );
  }
}

function ClearButton({ onClick }) {
  return (
    <ClearIcon icon="times" fixedWidth={true} onClick={onClick} />
  );
}
