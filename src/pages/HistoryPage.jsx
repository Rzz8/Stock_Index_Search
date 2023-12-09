import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  console.log(singleStockHistory);

  const getStockHistory = async (id) => {
    const url = URL + `/history?symbol=${id}`;

    const response = await axios(url, { headers: { "x-api-key": API_KEY } });
    const stockHistory = response.data;
    return stockHistory;
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
  }, []);

  const days = singleStockHistory.map((stock) => stock.timestamp);
  const closingPrices = singleStockHistory.map((stock) => stock.close);

  return (
    <div>
      <div>Showing stocks for the </div>
      <div
        className="ag-theme-balham"
        style={{
          height: "350px",
          width: "620px",
        }}
      >
        <AgGridReact
          columnDefs={table.columns}
          rowData={singleStockHistory}
          pagination={true}
        />
      </div>
      <StockChart days={days} closingPrices={closingPrices} />
    </div>
  );
};

export default HistoryPage;
