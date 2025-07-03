import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();
function AuthenticationProvider({ children }) {
  const navigate = useNavigate();
  const loginInfo = {
    email: "alireza@yahoo.com",
    password: "123456",
    name: "Alireza",
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [approve, setApprove] = useState(false);
  function checkLogin() {
    if (email === loginInfo.email && password === loginInfo.password) {
      navigate("/", { replace: true });
      setApprove(true);
    }
  }
  return (
    <AuthenticationContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        checkLogin,
        approve,
        setApprove,
        loginInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
