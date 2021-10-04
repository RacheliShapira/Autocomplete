const SearchBar = (props) => {
    return (
      <div className="searchBar">
        <h2>I am looking for:</h2>
        <input type="text" onChange={props.searchOptions} />
        <button type="submit" onClick={props.submitButton}>
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;