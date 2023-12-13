import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "../App.css";
import StockChart from "../components/StockChart";

const table = {
  columns: [
    { headerName: "Date", field: "timestamp", width: 100 },
    { headerName: "Open", field: "open", width: 100 },
    { headerName: "High", field: "high", width: 100 },
    { headerName: "Low", field: "low", width: 100 },
    { headerName: "Close", field: "close", width: 100 },
    { headerName: "Volumes", field: "volumes", width: 100 },
  ],
};

const URL = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
const API_KEY = process.env.REACT_APP_API_KEY;

const HistoryPage = () => {
  const { id } = useParams();
  const [singleStockHistory, setSingleStockHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStockHistory = async (id) => {
    const url = URL + `/history?symbol=${id}`;

    try {
      const response = await axios(url, { headers: { "x-api-key": API_KEY } });
      const stockHistory = response.data;
      return stockHistory;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const stockHistory = await getStockHistory(id);
        setSingleStockHistory(stockHistory);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const days = singleStockHistory.map((stock) => stock.timestamp);
  const closingPrices = singleStockHistory.map((stock) => stock.close);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (singleStockHistory.length === 0) {
    return <div>No stock history available for {id}</div>;
  }

  return (
    <div className="centered-container">
      {/* Centered title */}
      <div style={{ textAlign: "center", fontWeight: "bold", marginTop: "40px", marginBottom: "10px" }}>
        Showing stocks for {singleStockHistory[0].name}
      </div>

      <div
        className="ag-theme-balham"
        style={{ width: "38%", height: "250px", margin: "auto" }}
      >
        <AgGridReact
          columnDefs={table.columns}
          rowData={singleStockHistory}
          pagination={true}
        />
      </div>

      {/* Narrow the StockChart component */}
      <div style={{ width: "50%", margin: "auto" }}>
        <StockChart days={days} closingPrices={closingPrices} />
      </div>
    </div>
  );
};

export default HistoryPage;
