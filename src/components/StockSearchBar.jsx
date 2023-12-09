import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const table = {
  columns: [
    { headerName: "Stock", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ],
};

const StockSearchBar = (props) => {
  const [innerSearch, setInnerSearch] = useState("");
  const [results, setResults] = useState(props.stocks);
  const navigate = useNavigate();

  useEffect(() => {
    // Update results whenever stocks prop changes
    setResults(props.stocks);
  }, [props.stocks]);

  const changeHandler = (event) => {
    const searchTerm = event.target.value.toUpperCase();
    console.log(searchTerm);
    setInnerSearch(searchTerm);

    if (searchTerm === "") {
      setResults(props.stocks);
    } else {
      const filteredResults = results.filter(
        (stock) =>
          stock.name.toUpperCase().includes(searchTerm) ||
          stock.symbol.toUpperCase().includes(searchTerm)
      );

      setResults(filteredResults);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(innerSearch);
  };

  const onCellClicked = (event) => {
    const colId = event.colDef.field;
    if (colId === "symbol") {
      const stockCode = event.data.symbol;
      navigate(`/history/${stockCode}`);
    }
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

      {results.length > 0 && (
        <div
          className="ag-theme-balham"
          style={{
            height: "350px",
            width: "630px",
          }}
        >
          <AgGridReact
            columnDefs={table.columns}
            rowData={results}
            onCellClicked={onCellClicked}
            pagination={true}
          />
        </div>
      )}
    </div>
  );
};

export default StockSearchBar;
