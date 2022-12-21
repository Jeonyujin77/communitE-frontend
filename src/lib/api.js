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
  const refreshToken = document.cookie.split(";")[1];

  if (accessToken !== undefined && refreshToken !== undefined) {
    const access = accessToken.split("accessToken=")[1];
    const refresh = refreshToken.split("refreshToken=")[1];
    config.headers.access = `${access}`;
    config.headers.refresh = `${refresh}`;
  }
  return config;
});

export default api;
