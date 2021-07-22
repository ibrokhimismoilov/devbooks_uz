import axios from "axios";

const apiClient = axios.create({
  // baseURL: "/api",
  baseURL: "https://book.alitechbot.uz/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (configs) => {
    const token = localStorage.getItem("token");
    configs.headers.Authorization = token ? `Berear ${token}` : "";
    configs.headers.language = "uz";
    return configs;
  },
  (err) => {
    console.log("SERVICES REQUEST ERROR", err);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log("SERVICES RESPONSE ERROR", err.response);
    if (err.response.status === 401) {
      localStorage.clear();
      window.location.href = "/sign-in";
    }
  }
);

export default apiClient;
