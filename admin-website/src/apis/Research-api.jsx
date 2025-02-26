import axios from "axios";
const baseURL = "http://localhost:8000/api";

export const getResearch = async () => {
  const response = await axios.get(baseURL + "/research/");
  return response.data;
};

export const createResearch = async (value = {}) => {
  const response = await axios.post(
    baseURL + "/research/create",
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

export const updateResearch = async (id, value = {}) => {
  const response = await axios.put(baseURL + "/research/" + id, value, {
    withCredentials: true,
  });
  return response;
};

export const deleteResearch = async (id) => {
  const response = await axios.delete(`${baseURL}/research/${id}`, {
    withCredentials: true,
  });
  return response;
};
