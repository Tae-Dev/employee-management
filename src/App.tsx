import { BrowserRouter } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import { Router } from "./Components/Router";
import AuthProvider from "./Contexts/AuthContext";
import EmployeeProvider from "./Contexts/UserContext";
import LoadingProvider from "./Contexts/LoadingContext";
import ModalContext from "./Contexts/ModalContext";

function App() {
  return (
    <BrowserRouter>
      {/* <Layout> */}
      <LoadingProvider>
        <ModalContext>
          <AuthProvider>
            <EmployeeProvider>
              <Router />
            </EmployeeProvider>
          </AuthProvider>
        </ModalContext>
      </LoadingProvider>
      {/* </Layout> */}
    </BrowserRouter>
  );
}

export default App;
