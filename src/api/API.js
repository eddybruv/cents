import axios from "axios";

const API = axios.create({
  withCredentials: true,
});

// Inject auth token into every request
API.interceptors.request.use((config) => {
  const user = sessionStorage.getItem("user");
  if (user) {
    const { accessToken } = JSON.parse(user);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// Normalize error responses and handle 401 redirect
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Extract the user-facing error message from the standardized { error, code } envelope
    const serverMessage = error.response?.data?.error;
    if (serverMessage) {
      error.userMessage = serverMessage;
    }

    return Promise.reject(error);
  },
);

/**
 * Extract a user-friendly error message from an axios error.
 * Works with the backend's standardized { error, code } response shape.
 */
export function getErrorMessage(error, fallback = "Something went wrong") {
  if (error?.userMessage) return error.userMessage;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.message && error.message !== "Network Error") return error.message;
  if (error?.message === "Network Error") return "Unable to reach the server";
  return fallback;
}

export default API;
