import { jwtDecode } from "jwt-decode";
import client from "./client";
import setAuthToken from "../utils/setAuthToken";

function handleResponse({ user, token }) {
  localStorage.set("token", token);
  setAuthToken(token);
  return { user, token };
}

async function loadUser() {
  const token = getToken();

  if (!token) {
    return Promise((resolve, reject) => {
      resolve({ user: null });
    });
  }

  setAuthToken(token);

  const decoded = jwtDecode(token);
  try {
    const res = await client.get(`users/${decoded.sub}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

function registerUser(userData) {
  return client
    .post("/auth/register", userData)
    .then((res) => handleResponse(res.data));
}
function loginUser(userData) {
  return client.post("/auth/login", userData).then((res) => {
    handleResponse(res.data);
  });
}
function logOutUser() {
  localStorage.removeItem("token");
  setAuthToken(null);
}

function getToken() {
  return localStorage.getItem("token");

  // i think it is better to set the token on cookies
  //   return Cookies;
}

export { registerUser, loginUser, logOutUser, getToken, loadUser };
