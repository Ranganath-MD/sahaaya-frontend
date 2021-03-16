/* eslint-disable @typescript-eslint/ban-types */
import { navigate } from "@reach/router";
import axios from "axios";

class Service {
  service: any;
  constructor () {
    const service = axios.create({
      // baseURL: "http://localhost:8080",
      baseURL: "https://dev-sahaaya.herokuapp.com",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = (response: any) => {
    return response;
  };

  handleError = (error: any) => {
    switch (error.response.status) {
    case 400:
      navigate("/400", { state: { status: "400", errMsg: "BAD REQUEST" } });
      break;
    case 401:
      return error.response.data;
    case 403:
      navigate("/403", { state: { status: "404", errMsg: "FORBIDDEN" } });
      break;
    case 404:
      navigate("/404", {
        state: {
          status: "404",
          errMsg: "The page you are looking for is not exists",
        },
      });
      break;
    case 409:
      return error.response.data;
    default:
      navigate("/500", {
        state: { status: "500", errMsg: "Internal Server Error" },
      });
      break;
    }
    return Promise.reject(error);
  };

  get (path: string, params?: {}) {
    return this.service({
      method: "GET",
      url: path,
      params,
    });
  }

  post (path: string, body: any) {
    return this.service({
      method: "POST",
      url: path,
      data: body,
    });
  }

  delete (path: string) {
    return this.service({
      method: "DELETE",
      url: path
    });
  }
}

export const apiService = new Service();
