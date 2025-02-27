import axios from "axios";
const baseURL = "http://localhost:8000/api";

export const getService = async () => {
  const response = await axios.get(baseURL + "/services/");
  return response.data;
};

export const createService = async (value = {}) => {
  const response = await axios.post(
    baseURL + "/services/create",
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

export const updateService = async (id, value = {}) => {
  const response = await axios.put(baseURL + "/services/" + id, value, {
    withCredentials: true,
  });
  return response;
};

export const deleteService = async (id) => {
  const response = await axios.delete(`${baseURL}/services/${id}`, {
    withCredentials: true,
  });
  return response;
};
