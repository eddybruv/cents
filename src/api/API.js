import axios from "axios";

const API = axios.create({
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const user = sessionStorage.getItem("user");
  let accessToken = "";
  if (user) {
    accessToken = JSON.parse(user).accessToken;
  }
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default API;
