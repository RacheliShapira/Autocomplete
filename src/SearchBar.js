const SearchBar = (props) => {
  return (
    <div className="searchBar">
      <h2>I am looking for:</h2>
      <input type="text" onChange={props.searchOptions} />
      <div
        className="autoCompleteOptions"
        style={
          props.isAutocomplete
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        {props.searchTitles.map((result, index) => (
          <p key={index}>{props.searchTitles[index]}</p>
        ))}
      </div>



      <button type="submit" onClick={props.submitButton}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
