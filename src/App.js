import { useFetchStock } from "./apis/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import "./App.css";

const table = {
  columns: [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ],
};

const currentDate = new Date();

const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Adding 1 to the month to display it as 1-12.
const year = currentDate.getFullYear();

function App() {
  const [search, setSearch] = useState("");

  const { loading, stocks, error } = useFetchStock(search);

  const submitHandler = (data) => {
    setSearch(data);
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error.hasError === true) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className="center">
      Home | Stocks
      <div>
        <SearchBar onSubmit={submitHandler} />
        <div>Industry: {search}</div>
      </div>
      <div>Showing stocks for {`${day}/${month}/${year}`}</div>
      <div
        className="ag-theme-balham"
        style={{
          height: "300px",
          width: "630px",
        }}
      >
        <AgGridReact
          columnDefs={table.columns}
          rowData={stocks}
          pagination={true}
        />
      </div>
    </div>
  );
}

export default App;
