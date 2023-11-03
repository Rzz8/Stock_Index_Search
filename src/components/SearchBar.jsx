import React, { useState } from "react";

const SearchBar = (props) => {
  const [innerSearch, setInnerSearch] = useState("");

  const changeHandler = (event) => {
    setInnerSearch(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(innerSearch);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          aria-labelledby="search-button"
          name="search"
          id="search"
          type="search"
          value={innerSearch}
          onChange={changeHandler}
        />
        <button id="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
