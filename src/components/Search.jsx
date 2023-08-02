import { useRef } from 'react';
import { useKeyPress } from '../hooks/useKeyPress';

const Search = ({ query, setQuery }) => {
  const searchInputEl = useRef(null); // const searchInputEl = { current: null }

  // Custom Hook - Select search input element on "enter" key press
  useKeyPress('Enter', function () {
    // If the focused element (search input) is equal to the selected element return nothing
    if (document.activeElement === searchInputEl.current) return;

    // else
    searchInputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInputEl}
    />
  );
};

export default Search;
