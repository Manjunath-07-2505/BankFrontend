import axios from "axios";

const BASE_URL = "http://localhost:9090/api/accounts";

export const createAccount = (accountData) => {
  return axios.post(`${BASE_URL}/create`, accountData);
};
