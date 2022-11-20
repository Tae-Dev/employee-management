import { createContext, FC, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UserType } from "../@types";
import { Employee, Role } from "../Lib/Constants";
import { useLoading } from "./LoadingContext";

type AuthContextType = {
  user: UserType | null | undefined;
  onLogin: (
    username: string,
    password: string,
    navigate: NavigateFunction
  ) => void;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});

const AuthProvider: FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null | undefined>();
  const { onLoading } = useLoading();

  useEffect(() => {
    onLoading();
    const user = localStorage.getItem("user");
    user && setUser(JSON.parse(user));
    if (!user) {
      navigate("/login");
    }
  }, []);

  const onLogin = (
    username: string,
    password: string,
    navigate: NavigateFunction
  ) => {
    if (
      (username === Employee.userNameUser &&
        password === Employee.passwordUser) ||
      (username === Employee.userNameAdmin &&
        password === Employee.passwordAdmin)
    ) {
      onLoading(() => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: username,
            password: password,
            role: username === Employee.userNameUser ? Role.User : Role.Admin,
          })
        );
        setUser({
          username: username,
          password: password,
          role: username === Employee.userNameUser ? Role.User : Role.Admin,
        });
        navigate("/");
      });
    } else {
    }
  };

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
