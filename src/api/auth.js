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

export { login };
