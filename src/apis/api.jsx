import axios from "axios";
import React, { useEffect, useState } from "react";

// API endpoint and API key for fetching stock data
const URL = "https://aij1hx90oj.execute-api.ap-southeast-2.amazonaws.com/prod/";
const API_KEY = process.env.REACT_APP_API_KEY;

// Custom hook for fetching stock data based on search criteria
export const useFetchStock = (search) => {
  // State variables for loading state, stock data, and error handling
  const [loading, setLoading] = useState(true);
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState({
    hasError: false,
    status: "200",
    message: "Everything is working",
  });

  // Function to fetch all stocks from the API
  const getAllStocks = async () => {
    const url = URL + "all";

    // Make an API request to fetch all stocks
    const response = await axios(url, { headers: { "x-api-key": API_KEY } });
    console.log(response.data);
    return response.data;
  };

  // Function to fetch stocks based on a specific industry
  const getSpecificStock = async (search) => {
    const url = URL + `industry?industry=${search}`;

    // Make an API request to fetch stocks for a specific industry
    const response = await axios(url, { headers: { "x-api-key": API_KEY } });
    const industryStocks = response.data;

    // Remove duplicate stocks based on symbol
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

  // Effect to fetch all stocks when the component mounts
  useEffect(() => {
    (async () => {
      try {
        const stocks = await getAllStocks();
        setStocks(stocks);
        setLoading(false);
      } catch (error) {
        // Handle error for fetching all stocks
        setError({
          hasError: true,
          status: "400",
          message: "Something is not working",
        });
        setLoading(false);
      }
    })();
  }, []);

  // Effect to fetch stocks based on a specific search term (industry)
  useEffect(() => {
    if (search) {
      (async () => {
        try {
          const stocks = await getSpecificStock(search);
          setStocks(stocks);
          setLoading(false);
        } catch (error) {
          // Handle error for fetching specific stocks based on industry
          setError({
            hasError: true,
            status: "400",
            message: "Industry does not exist",
          });
          setLoading(false);
        }
      })();
    }
  }, [search]);

  // Return the loading state, stock data, and error state
  return { loading, stocks, error };
};
