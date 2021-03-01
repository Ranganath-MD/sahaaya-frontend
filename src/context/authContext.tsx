import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const register = (formData: IFormInput) => {
    console.log(formData);
  };

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
