import instance from ".";
import { storeToken } from "./storage";

const login = async (username, password) => {
  const { data } = await instance.post("/mini-project/api/auth/login", {
    username,
    password,
  });
  if (data.token) {
    storeToken(data.token);
  }
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );
  storeToken(data.token);

  return data;
};

const getProfile = async (user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const getAllTransactions = async (user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.get("/mini-project/api/transactions/my");
  return data;
};

const getAllUsers = async (user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};

const updateProfile = async (formData, user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.put(
    "/mini-project/api/auth/profile",
    formData
  );
  return data;
};

const deposit = async (amount, user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.put(
    "/mini-project/api/transactions/deposit",
    {
      amount,
    }
  );
  return data;
};

const withdraw = async (amount, user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    {
      amount,
    }
  );
  return data;
};

const transfer = async (amount, username, user) => {
  if (!user) {
    return { message: "User not logged in" };
  }
  const { data } = await instance.put(
    `/mini-project/api/transactions/transfer/${username}`,
    {
      amount,
    }
  );
  return data;
};

const getUserInfoById = async (userId) => {
  const { data } = await instance.get(`/mini-project/api/auth/user/${userId}`);
  return data;
};

export {
  login,
  register,
  getProfile,
  getAllTransactions,
  getAllUsers,
  updateProfile,
  deposit,
  withdraw,
  transfer,
  getUserInfoById,
};
