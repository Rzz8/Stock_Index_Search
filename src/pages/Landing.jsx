import { useFetchStock } from "../apis/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import StockSearchBar from "../components/StockSearchBar";
import "../App.css";

// Define AgGrid table headers
const table = {
  columns: [
    { headerName: "Stock", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ],
};

// Obtain current date
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();

function Landing() {
  const [search, setSearch] = useState("");
  const { loading, stocks, error } = useFetchStock(search);

  const submitHandler = (data) => {
    setSearch(data);
  };

  const stockSearchHandler = (searchItem) => {
    console.log("Search item is", searchItem);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.hasError) {
    // Display the error message and redirect after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setSearch(""); // Reset search to clear the error
      window.location.href = "/"; // Redirect to the main page
    }, 3000);

    return <p>Error occurs: {error.message}. Redirecting to main page...</p>;
  }

  return (
    <div className="center">
      <div className="title">Home | Stocks</div>
      <div className="content">
        Select stock industry: <SearchBar onSubmit={submitHandler} />
        Search stock with name or symbol:{" "}
        <StockSearchBar stocks={stocks} onSubmit={stockSearchHandler} />
      </div>
      <div className="content">
        Industry: <strong>{search}</strong>
      </div>
      <div className="content">
        Showing stocks for {`${day}/${month}/${year}`}
      </div>
      {/* <div
        className="ag-theme-balham"
        style={{
          height: "350px",
          width: "630px",
        }}
      >
        <AgGridReact
          columnDefs={table.columns}
          rowData={stocks}
          pagination={true}
        />
      </div> */}
    </div>
  );
}

export default Landing;
