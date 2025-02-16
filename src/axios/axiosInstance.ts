import axios from "axios";
import { store } from "../redux/store";
import { setUser, setLoading, setError, resetUserState } from "../redux/userSlice";
import { showSnackbar } from "../redux/globalAlertSlice";
const protectedUrls = ["/api/creature/update", "/protected-route-2", "/another-secure-api"];

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    if (config.url && protectedUrls.some((url) => config.url?.includes(url))) {
      const state = store.getState(); 
      if (!state.user) {
        alert("please login!");
        return Promise.reject(new Error("User not logged in"));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        store.dispatch(
          showSnackbar({ message: "Unauthorized! Please log in.", severity: "error" })
        );
        store.dispatch(resetUserState());
      } 
      else if (status === 403) {
        store.dispatch(
          showSnackbar({ message: "Forbidden! You don't have permission.", severity: "warning" })
        );
      } 
      else {
        store.dispatch(
          showSnackbar({ message: "An error occurred!", severity: "error" })
        );
      }
    }

    return Promise.reject(error);
  }
);


export default api;