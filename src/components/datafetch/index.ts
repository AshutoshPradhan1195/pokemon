import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: APIURL,
});
