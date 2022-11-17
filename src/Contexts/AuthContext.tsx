import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

enum Employee {
  userNameUser = "user",
  passwordUser = "user",
  userNameAdmin = "admin",
  passwordAdmin = "admin",
}

type userType = {
  username: string;
  password: string;
  role: string;
};

type AuthContextType = {
  user: userType | null | undefined;
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
  const [user, setUser] = useState<userType | null | undefined>();

  useEffect(() => {
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
      console.log("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ username: username, password: password, role: username === 'user' ? 'User' : 'Admin' })
      );
      setUser({ username: username, password: password, role: username === 'user' ? 'User' : 'Admin' })
      navigate("/");
    } else {
      console.log("error");
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
