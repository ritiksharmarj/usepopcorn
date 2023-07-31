import { useEffect, useRef } from 'react';

const Search = ({ query, setQuery }) => {
  const searchInputEl = useRef(null); // const searchInputEl = { current: null }

  useEffect(() => {
    const callback = (e) => {
      // If the focused element is equal to the selected element
      if (document.activeElement === searchInputEl.current) return;

      // Select search input element on "enter" key press
      if (e.code === 'Enter') {
        searchInputEl.current.focus();
        setQuery('');
      }
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [setQuery]);

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
