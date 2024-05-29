import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionFilters = ({ onFilterChange, onDateChange }) => {
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterSelect = (event) => {
    setFilterType(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleDateChange = (dates) => {
    setStartDate(dates[0]);
    setEndDate(dates[1]);
    onDateChange(dates);
  };

  return (
    <div>
      <label>Filter by:</label>
      <select value={filterType} onChange={handleFilterSelect}>
        <option value="all">All</option>
        <option value="withdraw">Withdraw</option>
        <option value="deposit">Deposit</option>
        <option value="transfer">Transfer</option>
      </select>
      {filterType === "date" && (
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy-MM-dd"
        />
      )}
    </div>
  );
};

export default TransactionFilters;
