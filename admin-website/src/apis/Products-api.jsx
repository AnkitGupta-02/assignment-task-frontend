import axios from "axios";
const baseURL = "http://localhost:8000/api";

export const getProduct = async () => {
  const response = await axios.get(baseURL + "/products/");
  return response.data;
};

export const createProduct = async (value = {}) => {
  const response = await axios.post(
    baseURL + "/products/create",
    value,
    {
      withCredentials: true,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const updateProduct = async (id, value = {}) => {
  const response = await axios.put(baseURL + "/products/" + id, value, {
    withCredentials: true,
  });
  return response;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseURL}/products/${id}`, {
    withCredentials: true,
  });
  return response;
};
