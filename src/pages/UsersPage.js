import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { getAllUsers, transfer, getProfile } from "../api/auth";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import "react-toastify/dist/ReactToastify.css";

const UsersPage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [transferAmount, setTransferAmount] = useState(
    searchParams.get("amount") || ""
  );
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(user),
    onSettled: () => {
      setLoadingUsers(false);
    },
  });

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => getProfile(user),
  });

  const transferMutation = useMutation({
    mutationFn: ({ amount, username }) => transfer(amount, username, user),
    onSuccess: async () => {
      toast.success(t("transferSuccessful"));
      const updatedUser = await getProfile(user);
      setUser(updatedUser);
      await refetch();
      const recipientUser = users.find(
        (u) => u.username === selectedUser.username
      );
      if (recipientUser) {
        toast.info(
          `${t("newBalanceFor")} ${selectedUser.username}: ${
            recipientUser.balance + parseFloat(transferAmount)
          } BTC`
        );
      }
      toast.info(
        `${t("newBalanceFor")} ${user.username}: ${updatedUser.balance} BTC`
      );
      setTransferAmount("");
      setSelectedUser(null);
      setIsModalOpen(false);
      setSearchParams({});
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("transferFailed"));
    },
  });

  const handleSearch = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleTransfer = () => {
    if (selectedUser && transferAmount > 0) {
      transferMutation.mutate({
        amount: transferAmount,
        username: selectedUser.username,
      });
    } else {
      toast.error(t("pleaseEnterValidAmount"));
    }
  };

  useEffect(() => {
    if (user) {
      getProfile(user).then((updatedUser) => {
        setUser(updatedUser);
      });
    }

    if (searchParams.get("modal")) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [user, searchParams]);

  useEffect(() => {
    const username = searchParams.get("username");
    const amount = searchParams.get("amount");

    if (username && users) {
      const userToSelect = users.find((u) => u.username === username);
      if (userToSelect) {
        setSelectedUser(userToSelect);
        setTransferAmount(amount || "");
      }
    }
  }, [searchParams, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
    setSearchParams({
      username: user.username,
      amount: "",
      modal: true,
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setTransferAmount("");
    setSearchParams({});
  };

  const queryUsers = users
    ?.filter((user) => user.username?.toLowerCase().includes(query))
    .reverse();

  const renderLoadingSkeleton = () => (
    <div className="bg-white shadow-md rounded-md p-6 text-center border-2 border-orange-600 animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-slate-200 rounded w-full"></div>
      </div>
    </div>
  );

  if (isPending || isLoading)
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
        <Navbar />
        <main className="flex flex-col items-center justify-center flex-grow p-6">
          <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-5xl text-center">
            <div className="relative flex gap-2">
              <input
                type="search"
                className="form-input rounded w-full px-4 py-2 border border-gray-300"
                placeholder="Enter a username or balance"
                onChange={handleSearch}
              />
              <button
                onClick={() => {}}
                className={` w-40 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none ${
                  !query ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Search
              </button>
            </div>
            <h2 className="text-3xl mb-5">Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>{renderLoadingSkeleton()}</div>
              ))}
            </div>
          </div>
        </main>
        <footer className="bg-white shadow-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <div className="flex space-x-4">
              <Link to="/about" className="text-gray-700 hover:text-orange-600">
                {t("about")}
              </Link>
              <a
                href="/privacy"
                className="text-gray-700 hover:text-orange-600"
              >
                {t("privacyPolicy")}
              </a>
              <a
                href="/licensing"
                className="text-gray-700 hover:text-orange-600"
              >
                {t("licensing")}
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-orange-600"
              >
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

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-5xl text-center">
          <div className="relative flex gap-2">
            <input
              type="search"
              className="form-input rounded w-full px-4 py-2 border border-gray-300"
              placeholder="Enter a username or balance"
              onChange={handleSearch}
            />
            <button
              className={` w-40 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none ${
                !query ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Search
            </button>
          </div>

          <h2 className="text-3xl mb-5">Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {queryUsers?.map((user) => (
              <div
                key={user.id}
                className={`bg-white shadow-md rounded-md p-6 text-center border-2 border-orange-600 `}
              >
                <img
                  src={
                    "https://react-bank-project.eapi.joincoded.com/" +
                    user.image
                  }
                  alt="User"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-orange-600">
                  {user.username}
                </h3>
                <p className="text-lg text-gray-600">
                  Balance: {user.balance}{" "}
                  <span className="text-orange-600">BTC</span>
                </p>
                {user.username !== data.username && (
                  <button
                    onClick={() => handleUserClick(user)}
                    className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
                  >
                    Transfer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-md text-center border-2 border-orange-600">
              <h3 className="text-xl mb-4 text-orange-600">
                {t("transferTo")} {selectedUser?.username}
              </h3>
              <p className="mb-4">
                {t("yourBalance")}: {user.balance}{" "}
                <span className="text-orange-600">BTC</span>
              </p>
              <input
                type="text"
                value={transferAmount}
                onChange={(e) => {
                  setTransferAmount(e.target.value);
                  setSearchParams({
                    username: selectedUser?.username,
                    amount: e.target.value,
                    modal: true,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4 text-orange-600"
                placeholder={t("amount")}
                style={{ appearance: "none" }}
              />
              {!transferAmount && (
                <span className="text-xs text-red-500 mt-2 flex justify-start ">
                  Please enter a valid amount
                </span>
              )}
              <br></br>
              <button
                onClick={handleTransfer}
                className={`w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none ${
                  !transferAmount ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {t("transfer")}
              </button>
              <button
                onClick={closeModal}
                className="mt-2 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-700 hover:text-orange-600">
              {t("about")}
            </Link>
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

export default UsersPage;
