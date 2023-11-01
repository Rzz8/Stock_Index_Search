import axios from "axios";
import React, { useEffect, useState } from "react";

const URL = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const useFetchStock = () => {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(false);

  // const stocks = [
  //   { symbol: "A", name: "A company", industry: "health" },
  //   { symbol: "B", name: "B company", industry: "sport" },
  //   { symbol: "C", name: "C company", industry: "tech" },
  // ];

  const getAllStocks = async () => {
    const url = URL + "all";
    const response = await axios(url, { headers: { "x-api-key": API_KEY } });

    return response.data;
  };

  useEffect(() => {
    (async () => {
      try {
        const stocks = await getAllStocks();
        setStocks(stocks);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return { loading, stocks, error };
};
