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
  const accessToken = document.cookie.split(";")[0];
  const token = accessToken.split("accessToken=")[1];

  if (token !== undefined) {
    config.headers.common["authorization"] = `${token}`;
  }
  return config;
});

export default api;
