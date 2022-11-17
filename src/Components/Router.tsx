import { Route, Routes } from "react-router-dom";
import About from "../Pages/About/About";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { Home } from "../Pages/Home";
import Login from "../Pages/Login/login";
import Frame from "./Common/Frame";
import { appNavs } from "./config";
  
  export const Router = () => {
    return (
      <Routes>
        <Route path="/" element={<Frame navs={appNavs} />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    );
  };
  