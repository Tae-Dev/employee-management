import {
  createContext,
  FC, useContext, useState
} from "react";
import { useNavigate } from "react-router-dom";

  export type EmployeeType = {
    firstName: string,
    lastName: string,
    phone: string,
  }
  
  type EmployeeContextType = {
    employeeData: EmployeeType[]
    handleAddEmployee: (formState : EmployeeType) => void
  };
  
  const EmployeeContext = createContext<EmployeeContextType>({
    employeeData: [],
    handleAddEmployee: () => {}
  });
  
  const EmployeeProvider: FC<any> = ({ children }) => {
    const navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState<EmployeeType[]>([])

    const handleAddEmployee = (formState : EmployeeType) => {
      setEmployeeData([...employeeData, formState])
    }
    
  
    return (
      <EmployeeContext.Provider value={{ employeeData, handleAddEmployee }}>
        {children}
      </EmployeeContext.Provider>
    );
  };
  
  export default EmployeeProvider;
  export const useEmployee = () => useContext(EmployeeContext);
  