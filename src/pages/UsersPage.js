import React, { useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { getAllUsers, transfer, getProfile } from "../api/auth";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [user, setUser] = useContext(UserContext);
  const [transferAmount, setTransferAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(user),
  });

  const transferMutation = useMutation({
    mutationFn: ({ amount, username }) => transfer(amount, username, user),
    onSuccess: async () => {
      alert("Transfer successful");
      setTransferAmount("");
      setSelectedUser(null);
      setIsModalOpen(false);
      const updatedUser = await getProfile(user);
      setUser(updatedUser);
      refetch();
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Transfer failed");
    },
  });

  const handleTransfer = () => {
    if (selectedUser && transferAmount > 0) {
      transferMutation.mutate({
        amount: transferAmount,
        username: selectedUser.username,
      });
    } else {
      alert("Please enter a valid amount.");
    }
  };

  useEffect(() => {
    if (user) {
      getProfile(user).then((updatedUser) => {
        setUser(updatedUser);
      });
    }
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-5xl text-center">
          <h2 className="text-3xl mb-5">Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users?.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-md p-6 text-center border-2 border-orange-600"
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
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setIsModalOpen(true);
                  }}
                  className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
                >
                  Transfer
                </button>
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white shadow-md rounded-md p-8 m-4 w-full max-w-md text-center border-2 border-orange-600">
              <h3 className="text-xl mb-4 text-orange-600">
                Transfer to {selectedUser.username}
              </h3>
              <p className="mb-4">
                Your Balance: {user.balance}{" "}
                <span className="text-orange-600">BTC</span>
              </p>
              <input
                type="text"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 mb-4"
                placeholder="Amount"
                style={{ appearance: "none" }}
              />
              <button
                onClick={handleTransfer}
                className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
              >
                Transfer
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-2 w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Cancel
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
              About
            </Link>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              Privacy Policy
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              Licensing
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          © 2024 CODED™. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default UsersPage;
