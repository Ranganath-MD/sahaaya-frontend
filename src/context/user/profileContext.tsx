import React, { createContext, useState } from "react";
import { apiService, socket } from "utils";

export const ProfileContext: React.Context<any> = createContext<any>({});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    phone: null,
    email: "",
    about: "",
    work: "",
    city: "",
    state: "",
    campaigns: [],
    avatar: null,
  });
  const [progress, setProgress] = useState(0);
  const handleProgress = (data: any) => {
    setProgress(Math.round((100 * data.loaded) / data.total));
  };

  const setData = (data: any) => {
    setUser({
      id: data?._id,
      email: data?.email,
      username: data?.username,
      phone: data?.phone,
      about: data?.about,
      work: data?.occupation,
      city: data?.city,
      state: data?.state,
      campaigns: data?.campaigns,
      avatar: data?.avatar,
    });
  };
  const updateUserdetails = (key: string, value: any) => {
    if (!user?.id) return null;
    const payload: any = {
      id: user?.id,
      key,
      value,
    };
    socket.emit("update-user", payload);
    // socket.on("user", (data) => {
    //   console.log(data)
    // });
  };
  const handleAvatar = async (e: any) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0], e.target.files[0].name);
    formData.append("id", user?.id);
    const result = await apiService.upload(
      "/users/upload",
      formData,
      handleProgress
    );

    setUser({ ...user, avatar: result.data?.file });
  };
  const handleUsername = () => {
    if (user.username === "") {
      return null;
    } else {
      updateUserdetails("username", user.username);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        user,
        setData,
        setUser,
        handleUsername,
        updateUserdetails,
        handleAvatar,
        progress,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
