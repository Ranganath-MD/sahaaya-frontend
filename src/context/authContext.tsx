import { navigate } from "@reach/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { apiService, socket } from "utils";
import { ProfileContext } from "./user/profileContext";

export const AuthContext: React.Context<any> = createContext<any>({});

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const profile = useContext(ProfileContext);

  const getProfile = async () => {
    const user = await apiService.get("/users/profile");
    setCurrentUser(user.data);
    profile.setData(user.data);
  };
  useEffect(() => {
    if(isAuthenticated){
      getProfile();
    }
  }, []);

  const register = async (formData: IFormInput, reset: any) => {
    setIsLoading(true);
    try{
      const result = await apiService.post("/users/register", formData);
      if (result.status !== undefined && result.status === 409) {
        setShowMessageBox(true);
        setMessage(result.message);
        setIsLoading(false);
      }
      if (result.data) {
        setIsLoading(false);
        navigate("/login", {
          state: { email: result.data.email }
        });
        reset();
      }
    } catch(e){
      setIsLoading(false);
    }
  };
  const openProfile = () => {
    setAnchorEl(null);
    navigate("/user/profile");
  };

  const setToken = (user: any) => {
    localStorage.setItem("token", user.token);
    localStorage.setItem("type", user.type);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    handleIsAuthenticated(false);
    navigate("/");
  };

  const isAdmin = () => {
    return localStorage.getItem("type") === "Admin";
  };

  const handleIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const handleLogin = (data: any) => {
    if(data.type === "Admin") {
      navigate("/admin/dashboard", {
        replace: true
      });
    }else {
      navigate("/dashboard", {
        replace: true
      });
    }
    return null;
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const login = async (formData: IFormInput, reset: any) => {
    setIsLoading(true);
    try{
      const result = await apiService.post("/users/login", formData);
      if (result.status !== undefined && result.status === 401) {
        setShowMessageBox(true);
        setMessage(result.message);
        setIsLoading(false);
      }
      if (result.data) {
        setIsLoading(false);
        apiService.service.defaults.headers["Authorization"] = result.data.token;
        setToken(result.data);
        handleLogin(result.data);
        handleIsAuthenticated(true);
        getProfile();
        setCurrentUser(result.data);
        reset();
      }
    } catch(e){
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try{
      const result = await apiService.delete("/users/logout");
      if (result.status !== undefined && result.status === 401) {
        setShowMessageBox(true);
        setMessage(result.message);
        setIsLoading(false);
        socket.off();
      }
      if (result) {
        setIsLoading(false);
        apiService.service.defaults.headers["Authorization"] = null;
        handleLogout();
      }
    }catch(err){
      setIsLoading(false);
    }
    setAnchorEl(null);
  };

  return (
    <AuthContext.Provider
      value={{
        showPassword, setShowPassword,
        register,isLoading,
        showConfirmPassword, setShowConfirmPassword,
        showMessageBox, setShowMessageBox,
        message,
        login,
        isAuthenticated, setIsAuthenticated,
        isAdmin,
        isLoggedIn,
        getProfile,
        anchorEl, setAnchorEl,
        currentUser,
        logout, openProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
