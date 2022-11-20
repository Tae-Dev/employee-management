import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../Components/Login/LoginForm";
import { useAuth } from "../../Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {  user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return <LoginForm />;
};

export default Login;
