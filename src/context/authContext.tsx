import axios from "axios";
import React, { createContext, useState } from "react";
// import { baseRequest } from "../utils/axiosBaseRequest";

export const AuthContext = createContext<any>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const register = async (formData: IFormInput, reset: any) => {
    try{
      // const user = await baseRequest.post("/users/register", formData);
      // console.log(user)
      reset();
    } catch(e){
      console.log("not a user");
    }
  };
  // console.log(baseRequest.getBaseUrl);


  return (
    <AuthContext.Provider
      value={{
        showPassword, setShowPassword,
        register,
        showConfirmPassword, setShowConfirmPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
