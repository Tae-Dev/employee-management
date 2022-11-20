import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/login";
import { appNavs } from "./AppNavs";
import Frame from "./Frame/Frame";
  
  export const Router = () => {
    return (
      <Routes>
        <Route path="/" element={<Frame navs={appNavs} />}>
            <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    );
  };
  