import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  console.log(props, "ini props sobs");

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
