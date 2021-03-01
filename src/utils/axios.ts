import Axios from "axios";

export const axios = Axios.create({
  baseURL: "/",
  headers: {
    "x-auth": localStorage.getItem("token")
  }
});
