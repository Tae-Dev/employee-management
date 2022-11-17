import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { Router } from "./Components/Router";
import AuthProvider from "./Contexts/AuthContext";
import EmployeeProvider from "./Contexts/EmployeeContext";
import ModalContext from "./Contexts/ModalContext";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <ModalContext>
        <AuthProvider>
          <EmployeeProvider>
            <Router />
          </EmployeeProvider>
        </AuthProvider>
      </ModalContext>
      {/* </Layout> */}
    </BrowserRouter>
  );
}

export default App;
