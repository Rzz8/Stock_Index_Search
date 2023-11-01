import { useFetchStock } from "./apis/api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const table = {
  columns: [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Industry", field: "industry" },
  ],
};

function App() {
  const { loading, stocks, error } = useFetchStock();

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "300px",
        width: "600px",
      }}
    >
      {/* {stocks.map((stock) => {
        return stock.industry;
      })} */}

      <AgGridReact
        columnDefs={table.columns}
        rowData={stocks}
        pagination={true}
      />
    </div>
  );
}

export default App;
