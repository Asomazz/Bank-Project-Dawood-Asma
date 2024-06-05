import React, { useState, useEffect } from "react";
import { getAllTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";

const Transactions = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [query, setQuery] = useState(queryParams.get("query") || "");
  const [filterType, setFilterType] = useState(
    queryParams.get("filterType") || "all"
  );
  const [fromDate, setFromDate] = useState(
    queryParams.get("fromDate") ? new Date(queryParams.get("fromDate")) : null
  );
  const [toDate, setToDate] = useState(
    queryParams.get("toDate") ? new Date(queryParams.get("toDate")) : null
  );
  const [searchQuery, setSearchQuery] = useState(query);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: transactions, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (filterType) params.set("filterType", filterType);
    if (fromDate) params.set("fromDate", fromDate.toISOString());
    if (toDate) params.set("toDate", toDate.toISOString());
    navigate({ search: params.toString() });
  }, [query, filterType, fromDate, toDate, navigate]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setQuery("");
    }
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
    const transactionAmount = parseFloat(searchQuery);

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      toast.error(t("pleaseEnterValidAmount"));
      return;
    }

    setIsSubmitting(true);
    setQuery(searchQuery);
    setIsSubmitting(false);
    toast.info(t("search"));
  };

  const queryTransactions = transactions?.filter((transaction) => {
    if (!query) return true;
    return transaction.amount == query;
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const transactionList = datedTransactions?.map((transaction) => (
    <div
      key={transaction.id}
      className="bg-white shadow-md rounded-md p-4 mb-4 border-l-4 border-orange-600"
    >
      <div className="flex justify-between items-center">
        <span
          className={`text-lg font-bold ${
            transaction.type === "deposit"
              ? "text-green-600"
              : transaction.type === "withdraw"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {transaction.amount > 0 ? "+" : ""}
          {transaction.amount}
        </span>
        <span className="text-gray-600">
          {formatDate(transaction.createdAt)}
        </span>
        <span className="text-gray-600 capitalize">{t(transaction.type)}</span>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-4xl">
          <div className="flex flex-col space-y-4">
            <div className="relative flex gap-2">
              <input
                type="search"
                className="form-input rounded w-full px-4 py-2 border border-gray-300"
                placeholder={t("enterAmount")}
                value={searchQuery}
                onChange={handleSearch}
              />
              <button
                onClick={handleSearchClick}
                className={` w-40 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none ${
                  !searchQuery ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4zm2 5.292A7.962 7.962 0 014 12h2c0 1.105.289 2.145.812 3.071l-1.562 2.221z"
                      ></path>
                    </svg>
                    {t("submitting")}
                  </>
                ) : (
                  t("search")
                )}
              </button>
            </div>
            {!searchQuery || !isNaN(parseFloat(searchQuery)) ? null : (
              <span className="text-xs text-red-500 mt-2 flex justify-start">
                {t("pleaseEnterValidAmount")}
              </span>
            )}
            <div className="flex space-x-4 items-center">
              <span className="text-gray-700">{t("filter")}</span>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="all"
                  checked={filterType === "all"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">{t("all")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="deposit"
                  checked={filterType === "deposit"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">{t("deposit")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="withdraw"
                  checked={filterType === "withdraw"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">{t("withdraw")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="transfer"
                  checked={filterType === "transfer"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">{t("transfer")}</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="byDate"
                  checked={filterType === "byDate"}
                  onChange={handleFilterChange}
                  className="form-radio text-orange-600"
                />
                <span className="ml-2 text-gray-700">{t("byDate")}</span>
              </label>
            </div>
            {filterType === "byDate" && (
              <div className="flex space-x-4">
                <div className="flex flex-col">
                  <label htmlFor="from-date" className="text-gray-700">
                    {t("fromDate")}
                  </label>
                  <DatePicker
                    selected={fromDate}
                    onChange={handleFromDate}
                    className="form-input rounded w-full px-4 py-2 border border-gray-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="to-date" className="text-gray-700">
                    {t("toDate")}
                  </label>
                  <DatePicker
                    selected={toDate}
                    onChange={handleToDate}
                    className="form-input rounded w-full px-4 py-2 border border-gray-300"
                  />
                </div>
              </div>
            )}
            <div className="mt-4"></div>
          </div>
          <div className="mt-6">
            {error ? (
              <div className="text-center py-4 text-red-500">
                {t("errorFetchingTransactions")}
              </div>
            ) : transactionList && transactionList.length > 0 ? (
              transactionList
            ) : (
              <div className="text-center py-4">{t("noTransactions")}</div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              {t("about")}
            </a>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              {t("privacyPolicy")}
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              {t("licensing")}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          {t("allRightsReserved")}
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default Transactions;
