import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../libs/reactQuery";
import { getUserInfo } from "../api";

const AuthContext = createContext({
  // This Context responsible form having result of checking user Authentication .
  isLogin: false,
  userInfo: {},
  userToken: null,
  isPending: true,
  isError: false,
  login: () => {},
  logout: () => {},
  refetchMe: () => {},
});

const AuthProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token")); // get token
  // Authorizing User >>>>>
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: queryKeys.userInfo.all,
    retry: false,
    queryFn: () => getUserInfo(),
  });
  // Login Method == >
  const login = useCallback((token) => {
    if (!token) return;
    localStorage.setItem("token", JSON.stringify({ userToken: token || null }));
    refetch(); // when user click on submit at login page or register page here we call refetch to check again .
  }, []);
  // Logout Method === >
  const logout = useCallback(async () => {
    localStorage.removeItem("token"); // Remove Token
    queryClient.removeQueries({ queryKey: queryKeys.userInfo.all });
    refetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin: !!token?.userToken,
        userInfo: data,
        userToken: token?.userToken,
        isPending: isLoading,
        isError,
        login,
        logout,
        refetchMe: refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
