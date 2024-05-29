import { jwtDecode } from "jwt-decode";

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const getToken = () => {
  localStorage.getItem("token");
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (getToken()) {
    const decode = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      removeToken();
      return false;
    }
    return true;
  }
  return false;
};

export { storeToken, getToken, removeToken, checkToken };