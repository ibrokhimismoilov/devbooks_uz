import axios from "axios";

let config = {
  baseURL: "http://book.alitechbot.uz/api",
  headers: {
      "Accept": "*/*",
      "Content-type": "application/json",
  },
};

const apiClient = axios.create(config);

const authInterceptor = (config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return config;
};

apiClient.interceptors.request.use(authInterceptor);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Siz tizimga kirmagansiz");
    }
    if (error.response.status === 500) {
      console.log("Serverning ichki xatoligi");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
