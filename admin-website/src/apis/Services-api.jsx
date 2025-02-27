import axios from "axios";
import socket from "../socket";
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
  socket.emit("updateData")
  return response;
};

export const updateService = async (id, value = {}) => {
  const response = await axios.put(baseURL + "/services/" + id, value, {
    withCredentials: true,
  });
  socket.emit("updateData")
  return response;
};

export const deleteService = async (id) => {
  const response = await axios.delete(`${baseURL}/services/${id}`, {
    withCredentials: true,
  });
  socket.emit("updateData")
  return response;
};
