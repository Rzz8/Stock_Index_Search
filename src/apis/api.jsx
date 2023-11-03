import axios from "axios";
import React, { useEffect, useState } from "react";

const URL = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
const API_KEY = process.env.REACT_APP_API_KEY;

export const useFetchStock = (search) => {
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState({
    "hasError": false,
    "status": "200",
    "message": "Every thing is working"
  });

  const getAllStocks = async () => {
    const url = URL + "all";

    const response = await axios(url, { headers: { "x-api-key": API_KEY } });
    return response.data;
  };

  const getSpecificStock = async (search) => {
    const url = URL + `industry?industry=${search}`;

    const response = await axios(url, { headers: { "x-api-key": API_KEY } });
    const industryStocks = response.data;

    const uniqueSymbols = new Set();

    const uniqueStocks = industryStocks.filter((item) => {
      if (!uniqueSymbols.has(item.symbol)) {
        uniqueSymbols.add(item.symbol);
        return true;
      }
      return false;
    });

    return uniqueStocks;
  };

  useEffect(() => {
    (async () => {
      try {
        const stocks = await getAllStocks();
        setStocks(stocks);
        setLoading(false);
      } catch (error) {
        setError({
          "hasError": true,
          "status": "400",
          "message": "Something is not working"
        });
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (search) {
      (async () => {
        try {
          const stocks = await getSpecificStock(search);
          setStocks(stocks);
          setLoading(false);
        } catch (error) {
          setError({
            "hasError": true,
            "status": "400",
            "message": "Industry does not exist"
          });
          setLoading(false);
        }
      })();
    }
  }, [search]);

  return { loading, stocks, error };
};
