import { useFetchStock } from "../apis/api";
import { useState } from "react";
import StockSearch from "../components/StockSearch";
import "../App.css";

// The Landing page mainly includes the StockSearch component
const Landing = () => {
  // State to manage the search input value
  const [search, setSearch] = useState("");

  // Custom hook to fetch stock data based on the search input
  const { loading, stocks, error } = useFetchStock(search);

  // Handler for stock search form submission
  const stockSearchHandler = (searchItem) => {
    console.log("Search item is", searchItem);
    // Perform any additional actions based on the search item if needed
  };

  // Loading state: Display a loading message while fetching data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state: Display an error message and redirect after a delay (e.g., 3 seconds)
  if (error.hasError) {
    setTimeout(() => {
      setSearch(""); // Reset search to clear the error
      window.location.href = "/"; // Redirect to the main page
    }, 3000);

    return (
      <p>
        Error occurs: {error.message}. Redirecting to the main page...
      </p>
    );
  }

  // Render the Landing component
  return (
    <div className="center">
      {/* Page title */}
      <div className="title">Home | Stocks</div>

      {/* Content section with stock search functionality */}
      <div className="content">
        {/* Instruction for stock search */}
        Search stock with its name, symbol, or industry

        {/* StockSearch component with stocks and onSubmit handler */}
        <StockSearch stocks={stocks} onSubmit={stockSearchHandler} />
      </div>
    </div>
  );
};

export default Landing;
