import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const StockChart = ({ days, closingPrices }) => {
  const chartRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!days || !closingPrices) return;

    // Reverse the arrays to have the latest date on the right side
    const reversedDays = [...days].reverse();
    const reversedClosingPrices = [...closingPrices].reverse();

    // Filter data based on the selected date
    const filteredDays = selectedDate
      ? reversedDays.slice(reversedDays.indexOf(selectedDate))
      : reversedDays;
    const filteredClosingPrices = selectedDate
      ? reversedClosingPrices.slice(
          reversedDays.indexOf(selectedDate)
        )
      : reversedClosingPrices;

    const chartData = {
      labels: filteredDays,
      datasets: [
        {
          label: 'Closing Prices',
          data: filteredClosingPrices,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
        },
      ],
    };

    const ctx = chartRef.current.getContext('2d');

    // Create a new chart instance
    const myChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
    });

    // Cleanup when the component unmounts
    return () => {
      myChart.destroy();
    };
  }, [days, closingPrices, selectedDate]);

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      {/* Dropdown for selecting the date */}
      <select onChange={handleDateChange}>
        <option value="">Select Date From</option>
        {days.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <canvas ref={chartRef} width="800" height="400"></canvas>
    </div>
  );
};

export default StockChart;
