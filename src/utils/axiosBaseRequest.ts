/* eslint-disable @typescript-eslint/ban-types */
import { navigate } from "@reach/router";
import axios from "axios";
import { config } from "../config";
class Service {
  service: any;
  constructor () {
    const service = axios.create({
      baseURL: process.env.NODE_ENV === "production"  ? config.prod : config.local,
      // baseURL: "https://dev-sahaaya.herokuapp.com",
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

  handleAuthorization = (data: any) => {
    if (data.status === 401) {
      localStorage.clear();
      apiService.service.defaults.headers["Authorization"] = null;
      navigate("/");
    }
  }

  handleError = (error: any) => {
    switch (error.response.status) {
    case 400:
      navigate("/400", { state: { status: "400", errMsg: "BAD REQUEST" } });
      break;
    case 401:
      this.handleAuthorization(error.response);
      return;
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

  delete (path: string, body?: any) {
    return this.service({
      method: "DELETE",
      url: path,
      data: body
    });
  }

  upload (path: string, body: any, handleProgress?: any, ) {
    return this.service({
      method: "POST",
      url: path,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data: any) => {
        handleProgress(data);
      }
    });
  }

}

export const apiService = new Service();
