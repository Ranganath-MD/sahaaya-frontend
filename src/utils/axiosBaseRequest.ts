/* eslint-disable @typescript-eslint/ban-types */
import { redirect } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
class Service {
  service: any;
  constructor () {
    const service = axios.create({
      baseURL:
        process.env.NODE_ENV === "production" ? config.prod : config.local,
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
    if (data.status === 403) {
      localStorage.clear();
      apiService.service.defaults.headers["Authorization"] = null;
      redirect("/");
    }
  };

  handleError = (error: any) => {
    switch (error.response.status) {
    case 400:
      redirect("/400");
      break;
    case 401:
      return error.response.data;
    case 403:
      this.handleAuthorization(error.response);
      break;
    case 404:
      redirect("/404");
      break;
    case 409:
      return error.response.data;
    default:
      redirect("/500");
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
      data: body,
    });
  }

  upload (path: string, body: any, handleProgress?: any) {
    return this.service({
      method: "POST",
      url: path,
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data: any) => {
        handleProgress(data);
      },
    });
  }
}

export const apiService = new Service();
