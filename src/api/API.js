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

API.interceptors.response.use(
  (response) => {
    // pass through successful responses
    return response;
  },
  (error) => {
    // handle responses with error status codes (e.g., 401)
    if (error.response && error.response.status === 401) {
      // handle unauthorized access, e.g., redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
