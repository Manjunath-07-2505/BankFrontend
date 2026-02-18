import axios from "axios";

const BASE_URL = "http://localhost:9090/api/auth";

export const registerUser = (user) => {
  return axios.post(`${BASE_URL}/register`, user);
};

export const loginUser = (user) => {
  return axios.post(`${BASE_URL}/login`, user);
};
