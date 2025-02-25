import axios from "axios";
const baseURL = "http://localhost:8000/api";

export const getService = async () => {
  const response = await axios.get(baseURL + "/services/");
  return response.data;
};

export const getProduct = async () => {
  const response = await axios.get(baseURL + "/products/");
  return response.data;
};

export const getResearch = async () => {
  const response = await axios.get(baseURL + "/research/");
  return response.data;
};
