/* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable @typescript-eslint/ban-types */
// import Axios, {  AxiosInstance } from "axios";

// class AxiosBaseRequests {
//     baseUrl: string | undefined;
//     constructor () {
//       const axios: AxiosInstance = Axios.create({
//         // baseURL: "https://dev-sahaaya.herokuapp.com",
//         baseURL: "http://localhost:8080",
//         headers: {
//           "Authorization": localStorage.getItem("token")
//         }
//       });
//     }

//     getBaseUrl = () => {
//       return this.baseUrl;
//     }

//     request = async (
//       { url, method, params, body, options }:
//       { url: string, method: "delete" | "get" | "patch" | "post" | "put", params, body?: {}, options?: {}, headers?: {} },
//     ) => {
//       return await axios({
//         method,
//         url,
//         params,
//         baseURL: this.baseUrl,
//         data: body,
//         ...(options || {}),
//       }).then((response) => {
//         return response.data;
//       }).catch((error) => {
//         const res = error.response;
//         if (!res) {
//           console.error(res);
//           throw new Error(error);
//         }
//         if (res.status >= 400) {
//           console.log(res.status);
//         }
//       });
//     }
//     post = async (url: string, body?: {}, params: {} = {}, options?: {}) => {
//       return await this.request({
//         url,
//         body,
//         params,
//         options,
//         method: "post",
//       });
//     }
// }
// export const baseRequest = new AxiosBaseRequests();
import { navigate } from "@reach/router";
import axios, { AxiosResponse } from "axios";

interface IRequest {
  method: String;
  url: String,
  body?: {},
  params?: {},
  options?: {},
}
class Service {
  service: any;
  constructor () {
    const service = axios.create({
      // baseURL: "http://localhost:8080",
      baseURL: "https://dev-sahaaya.herokuapp.com",
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = (response: any) => {
    return response;
  }

  handleError = (error: any) => {
    switch (error.response.status) {
    case 401:
      navigate("/401",{ state: { status: "401", errMsg: "" } });
      break;
    case 404:
      navigate("/404",{ state: { status: "404", errMsg: "" } });
      break;
    default:
      this.redirectTo(document, "/500");
      break;
    }
    return Promise.reject(error);
  }

  redirectTo = (document: any, path: any) => {
    document.location = path;
  }
  async request ({ method, url, body, params, options } : IRequest) {
    return await this.service({
      method,
      baseURL: this.service.baseURL,
      url,
      data: body,
      headers: this.service.headers,
      params,
      ...(options || {})
    });
  }


  get = async (path: string) => {
    await this.request({
      method: "GET",
      url: path
    });
  }

  // patch(path, payload, callback) {
  //   return this.service.request({
  //     method: "PATCH",
  //     url: path,
  //     responseType: "json",
  //     data: payload
  //   }).then((response) => callback(response.status, response.data));
  // }

  // post(path, payload, callback) {
  //   return this.service.request({
  //     method: "POST",
  //     url: path,
  //     responseType: "json",
  //     data: payload
  //   }).then((response) => callback(response.status, response.data));
  // }
}

export const apiService = new Service();