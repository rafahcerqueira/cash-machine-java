import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:8080",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
