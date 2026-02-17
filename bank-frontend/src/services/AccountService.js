import axios from "axios";

const BASE_URL = "http://localhost:8080/api/accounts";

export const createAccount = (accountData) => {
  return axios.post(`${BASE_URL}/create`, accountData);
};
