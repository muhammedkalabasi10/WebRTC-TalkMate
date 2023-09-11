import axios from "axios";
import React, { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import jwtInterceptor from "./jwtInterceptor";
import { registerNewUser } from "../wssConnection/wssConnection";

const AuthContext = createContext();
const API = axios.create({ baseURL: process.env.REACT_APP_API + "/user" });

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (localStorage.getItem("token")) {
      return jwt_decode(JSON.parse(localStorage.getItem("token")).accessToken);
    }
    return null;
  });

  const signup = async (payload, navigate) => {
    try {
      const apiResponse = await API.post("/signup", payload, {
        withCredentials: true,
      });
      localStorage.setItem("token", JSON.stringify(apiResponse.data));
      const user=await jwt_decode(apiResponse.data.accessToken);
      setUser(user);
      await navigate(`/`);
      return user;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const login = async (payload) => {
    try {
      const apiResponse = await API.post("/signin", payload, {
        withCredentials: true,
      });
      await localStorage.setItem("token", JSON.stringify(apiResponse.data));
      const user=await jwt_decode(apiResponse.data.accessToken);
      await setUser(user);
      return user;
    } catch (error) {
      return error.response.data.message;
    }
  };

  const updateUser = async (payload, id) => {
    try {
      const apiResponse = await jwtInterceptor.patch(`/user/${id}`, payload, {
        withCredentials: true,
      });
      localStorage.setItem("token", JSON.stringify(apiResponse.data));
      setUser(jwt_decode(apiResponse.data.accessToken));
    } catch (error) {
      return error.response.data.message;
    }
  };

  const logout = async () => {
    API.post("/logout");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
