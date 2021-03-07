/* eslint-disable @typescript-eslint/ban-types */
import Axios, {  AxiosInstance } from "axios";

export const axios: AxiosInstance = Axios.create({
  // baseURL: "https://dev-sahaaya.herokuapp.com",
  baseURL: "http://localhost:8080",
  headers: {
    "x-auth": localStorage.getItem("token")
  }
});

class AxiosBaseRequests {
    baseUrl: string | undefined;
    constructor () {
      this.baseUrl = axios.defaults.baseURL;
    }

    getBaseUrl = () => {
      return this.baseUrl;
    }

    request = async (
      { url, method, params, body, options, headers }:
      { url: string, method: "delete" | "get" | "patch" | "post" | "put", params?: {}, body?: {}, options?: {}, headers?: {} },
    ) => {
      return await axios({
        method,
        url,
        params,
        baseURL: this.baseUrl,
        data: body,
        headers: (headers ? headers : { "content-type": "application/json" }),
        withCredentials: true,
        ...(options || {}),
      }).then((response) => {
        return response.data;
      }).catch((error) => {
        const res = error.response;
        if (!res) {
          console.error(res);
          throw new Error(error);
        }
        if (res.status >= 400) {
          console.log(res.status);
        }
      });
    }
    post = async (url: string, body?: {}, params: {} = {}, options?: {},  headers?: {}) => {
      return await this.request({
        url,
        body,
        params,
        options,
        headers,
        method: "post",
      });
    }
}
export const baseRequest = new AxiosBaseRequests();
