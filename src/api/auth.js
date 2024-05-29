import instance from ".";
import { storeToken } from "./storage";

const login = async (username, password) => {
  try {
    const { data } = await instance.post(
      "/mini-project/api/auth/login",
      username,
      password
    );
    if (data.token) {
      storeToken(data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/auth/register", formData);
  storeToken(data.token);

  return data;
};
export { login, register };
