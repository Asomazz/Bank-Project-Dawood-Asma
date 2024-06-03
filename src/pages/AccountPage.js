import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { deposit, withdraw, getProfile } from "../api/auth";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";

const AccountPage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useContext(UserContext);
  const [balance, setBalance] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (user) {
        const profileData = await getProfile(user);
        setBalance(profileData.balance || 0);
      }
    };
    fetchBalance();
  }, [user]);

  const handleTransaction = async () => {
    const transactionAmount = parseFloat(amount);

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      toast.error(t("pleaseEnterValidAmount"));
      return;
    }

    let data;
    if (!isDeposit) {
      if (balance >= transactionAmount) {
        data = await withdraw(transactionAmount, user);
      } else {
        toast.error(t("insufficientBalance"));
        return;
      }
    } else {
      data = await deposit(transactionAmount, user);
    }

    if (data.message === "User not logged in") {
      toast.error(data.message);
    } else {
      const updatedUser = await getProfile(user);
      setUser(updatedUser);
      setBalance(updatedUser.balance);
    }

    setAmount("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-80 text-center">
          <h2 className="text-2xl mb-4">{t("yourCrypto")}</h2>
          <p className="text-4xl text-orange-600">{balance} BTC</p>
        </div>
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-80 text-center">
          <div className="flex items-center justify-center mb-4">
            <span
              className={`${
                isDeposit ? "text-orange-600" : "text-gray-500"
              } mr-2`}
            >
              {t("deposit")}
            </span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!isDeposit}
                onChange={() => setIsDeposit(!isDeposit)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-orange-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 transition-colors duration-200 ease-in-out"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></div>
            </label>
            <span
              className={`${
                !isDeposit ? "text-orange-600" : "text-gray-500"
              } ml-2`}
            >
              {t("withdraw")}
            </span>
          </div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 text-center mb-1"
          >
            {t("amount")}
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-center text-orange-600"
            placeholder={t("amount")}
          />
          <button
            onClick={handleTransaction}
            className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none mt-4"
          >
            {t("submit")}
          </button>
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

export default AccountPage;
