import axios from "axios";
import store from "../store";
import { clearUserAction } from "../store/actions/userActions";

const apiClient = axios.create({
  // baseURL: "/api", // CORS error uchun
  baseURL: "https://book.alitechbot.uz/api",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (configs) => {
    const token =
      store.getState().user.token || "";
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
      store.dispatch(clearUserAction());
    }
    return Promise.reject(err);
  }
);

export default apiClient;
