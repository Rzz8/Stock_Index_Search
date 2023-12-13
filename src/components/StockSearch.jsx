import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// Define the columns for the AgGrid table
const table = {
  columns: [
    { headerName: "Stock", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ],
};

// Get the current date
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

const StockSearch = (props) => {
  const [innerSearch, setInnerSearch] = useState("");
  const [results, setResults] = useState(props.stocks);
  const [showResetMessage, setShowResetMessage] = useState(false);

  const navigate = useNavigate();

  // Effect to update results when stocks prop changes
  useEffect(() => {
    setResults(props.stocks);
  }, [props.stocks]);

  // Handler for changes in the search input
  const changeHandler = (event) => {
    const searchTerm = event.target.value.toUpperCase();
    setInnerSearch(searchTerm);

    // Filter results based on the search term
    // User can search name, symbol, or industry
    if (searchTerm === "") {
      setResults(props.stocks);
      setShowResetMessage(false);
    } else {
      const filteredResults = props.stocks.filter(
        (stock) =>
          stock.name.toUpperCase().includes(searchTerm) ||
          stock.symbol.toUpperCase().includes(searchTerm) ||
          stock.industry.toUpperCase().includes(searchTerm)
      );

      setResults(filteredResults);
      setShowResetMessage(filteredResults.length === 0);
    }
  };

  // Handler for form submission
  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit(innerSearch);
  };

  // Handler for cell click in the AgGrid table
  // Once clicked, the app will navigate to history page of this stock
  const onCellClicked = (event) => {
    const colId = event.colDef.field;
    if (colId === "symbol" || colId === "name" || colId === "industry") {
      const stockCode = event.data.symbol;
      navigate(`/history/${stockCode}`);
    }
  };

  // Render the StockSearch component
  return (
    <div>
      {/* Search form */}
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

      {/* Display current date */}
      {results.length > 0 && (
        <div className="content">
          Showing stocks for {`${day}/${month}/${year}`} (click the stock to view more)
        </div>
      )}

      {/* Display AgGrid table if there are results */}
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

      {/* Display reset message if no matched stocks */}
      {results.length === 0 && showResetMessage && (
        <div>
          <p>No matched stocks. Click "x" in the search box to reset.</p>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
