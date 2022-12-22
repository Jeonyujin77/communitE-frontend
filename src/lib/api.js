import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    withCredentials: true,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  config.headers.access = `${accessToken}`;
  config.headers.refresh = `${refreshToken}`;

  return config;
});

export default api;
