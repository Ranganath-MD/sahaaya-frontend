// /* eslint-disable @typescript-eslint/ban-types */
// import Axios, {  AxiosInstance } from "axios";

// export const axios: AxiosInstance = Axios.create({
//   baseURL: "https://dev-sahaaya.herokuapp.com",
//   headers: {
//     "x-auth": localStorage.getItem("token")
//   }
// });

// export class BaseRequest {
//   static headers: any = axios.defaults.headers;
//   static baseURL: string | undefined = axios.defaults.baseURL;

//   static async request (
//     { url, method, params, body, options, headers }:
//     { url: string, method: "delete" | "get" | "patch" | "post" | "put", params?: {}, body?: {}, options?: {}, headers?: {} },
//   ): Promise <{}> {
//     // axios.defaults.withCredentials = true
//     try {
//       const response = await axios({
//         method,
//         url,
//         params,
//         baseURL: this.baseURL,
//         data: body,
//         headers: (headers ? headers : { "content-type": "application/json" }),
//         withCredentials: true,
//         ...(options || {}),
//       });
//       return response.data;
//     } catch (error) {
//       const res = error.response;
//       if (!res) {
//         console.error(res);
//         throw new Error(error);
//       }
//       if (res.status >= 400) {
//         const serverError = new Error(error);
//         throw serverError;
//       }
//     }
//   }
//   static async post (url: string, data: any) {
//     this.request({
//       url,
//       body: data,
//       method: "get",
//     });
//   }
// }
export {};

