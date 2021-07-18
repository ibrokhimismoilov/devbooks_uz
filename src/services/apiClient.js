import axios from "axios";

const apiClient = axios.create({
  // baseURL: "/api",
  baseURL: "https://book.alitechbot.uz/api",
  timeout: 10000,
});

export default apiClient;
