import axios from "axios";
const baseURL = "http://localhost:8000/api";


export const createAdmin = async (adminData) => {
  const response = await axios.post(`${baseURL}/admin/signup`, adminData, {});
  return response;
};

export const loginAdmin = async (data) => {
  const response = await axios.post(`${baseURL}/admin/login`, data, {
    withCredentials: true,
  });
  return response;
};

export const fetchAdmin = async () => {
  const response = await axios.get(`${baseURL}/admin/profile`, {
    withCredentials: true,
  });

  return response.data;
};

export const logout = async () => {
  await axios.post(baseURL + "/admin/logout", {}, { withCredentials: true });
};
