import React, { createContext, useState, useEffect } from "react";
import { apiService } from "utils";
import { RiMovie2Line } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { GiHourglass, GiFarmTractor } from "react-icons/gi";
import farmer from "../assets/ill/farmer.svg";
import talents from "../assets/ill/talents.svg";
import movies from "../assets/ill/movies.svg";
import startup from "../assets/ill/startup.svg";
export const BaseContext = createContext<any>({});

export const BaseProvider: React.FC = ({ children }) => {
  const [ categories, setCategories ] = useState<ICategory | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const result = await apiService.get("categories");
      setCategories(result.data);
      setLoading(false);
    }catch(err){
      setLoading(false);
    }
  };

  const renderCategoryIcons = (key: string) => {
    switch (key) {
    case "c1":
      return <GiFarmTractor size={30}/>;
    case "c2":
      return <HiOutlineLightBulb size={30}/>;
    case "c3":
      return <RiMovie2Line size={30}/>;
    case "c4":
      return <GiHourglass size={30}/>;
    default:
      return null;
    }
  };
  const renderBackground = (key: string) => {
    switch (key) {
    case "c1":
      return farmer;
    case "c2":
      return talents;
    case "c3":
      return movies;
    case "c4":
      return startup;
    default:
      return null;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <BaseContext.Provider value={{
      categories, setCategories,
      loading,
      renderCategoryIcons,
      renderBackground
    }}>
      {children}
    </BaseContext.Provider>
  );
};
