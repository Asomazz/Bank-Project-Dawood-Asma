import React, { useState } from "react";
import { getAllTransactions } from "../api/auth";
import TransactionItem from "../components/TransactionItem";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import Navbar from "../components/Navbar";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import "react-datepicker/dist/react-datepicker.css";

const Transactions = () => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  const queryTransactions = transactions?.filter((transaction) => {
    return transaction.amount.toString().includes(query);
  });

  const filteredTransactions = queryTransactions?.filter((transaction) => {
    if (filterType === "all") return true;
    if (filterType === "byDate") return true;
    return transaction.type === filterType;
  });

  const datedTransactions = filteredTransactions?.filter((transaction) => {
    if (filterType !== "byDate") return true;
    const transactionDate = new Date(transaction.createdAt);
    return (
      (!fromDate || transactionDate >= new Date(fromDate)) &&
      (!toDate || transactionDate <= new Date(toDate))
    );
  });

  const transactionList = datedTransactions?.map((transaction) => {
    return <TransactionItem transaction={transaction} key={transaction.id} />;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Navbar />{" "}
      <main className="flex flex-col items-center justify-center flex-grow">
        {" "}
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-4xl">
          {" "}
          <div className="flex flex-col space-y-4">
            {" "}
            <div className="relative">
              {" "}
              <input
                type="search"
                className="form-input rounded w-full px-4 py-2 border border-gray-300"
                placeholder="Enter an amount"
                onChange={handleSearch}
              />{" "}
            </div>{" "}
            <div className="flex space-x-4 items-center">
              <span className="text-gray-700">Filter:</span>{" "}
              <label className="flex items-center">
                {" "}
                <input
                  type="radio"
                  value="all"
                  checked={filterType === "all"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">All</span>{" "}
              </label>{" "}
              <label className="flex items-center">
                {" "}
                <input
                  type="radio"
                  value="deposit"
                  checked={filterType === "deposit"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />{" "}
                <span className="ml-2 text-gray-700">Deposit</span>{" "}
              </label>{" "}
              <label className="flex items-center">
                {" "}
                <input
                  type="radio"
                  value="withdraw"
                  checked={filterType === "withdraw"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />{" "}
                <span className="ml-2 text-gray-700">Withdraw</span>{" "}
              </label>{" "}
              <label className="flex items-center">
                {" "}
                <input
                  type="radio"
                  value="transfer"
                  checked={filterType === "transfer"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />{" "}
                <span className="ml-2 text-gray-700">Transfer</span>{" "}
              </label>{" "}
              <label className="flex items-center">
                {" "}
                <input
                  type="radio"
                  value="byDate"
                  checked={filterType === "byDate"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />{" "}
                <span className="ml-2 text-gray-700">By Date</span>{" "}
              </label>{" "}
            </div>{" "}
            {filterType === "byDate" && (
              <div className="flex space-x-4">
                {" "}
                <div className="flex flex-col">
                  {" "}
                  <label htmlFor="from-date" className="text-gray-700">
                    From Date:{" "}
                  </label>{" "}
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDate}
                    className="form-input rounded w-full px-4 py-2 border border-gray-300"
                  />{" "}
                </div>{" "}
                <div className="flex flex-col">
                  {" "}
                  <label htmlFor="to-date" className="text-gray-700">
                    To Date:{" "}
                  </label>{" "}
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDate}
                    className="form-input rounded w-full px-4 py-2 border border-gray-300"
                  />{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="mt-4">
              {" "}
              <button
                onClick={handleSearchClick}
                className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Search{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <table className="w-full mt-6 border-collapse">
            {" "}
            <thead>
              {" "}
              <tr className="text-left border-b">
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>{" "}
                <th className="px-4 py-2">Type</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {transactionList && transactionList.length > 0 ? (
                transactionList
              ) : (
                <tr>
                  {" "}
                  <td colSpan="3" className="text-center py-4">
                    No transactions found.{" "}
                  </td>{" "}
                </tr>
              )}{" "}
            </tbody>{" "}
          </table>{" "}
        </div>{" "}
      </main>{" "}
      <footer className="bg-white shadow-md py-4">
        {" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />{" "}
          <div className="flex space-x-4">
            {" "}
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              About{" "}
            </a>{" "}
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              Privacy Policy{" "}
            </a>{" "}
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              Licensing{" "}
            </a>{" "}
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              Contact{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
        <div className="text-center text-gray-500 text-sm mt-2">
          © 2024 CODED™. All Rights Reserved.{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
};

export default Transactions;
