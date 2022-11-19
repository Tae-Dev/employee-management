import {
  createContext,
  FC, useContext, useMemo, useState
} from "react";

  export type UserType = {
    firstName: string,
    lastName: string,
    phone: string,
  }
  
  type UserContextType = {
    userData: UserType[]
    handleAddUser: (formState : UserType) => void,
    totalUser: number,
    handleSetUser: (userCount: number) => void,
    remainingUsers: number
  };
  
  const UserContext = createContext<UserContextType>({
    userData: [],
    handleAddUser: () => {},
    totalUser: 0,
    handleSetUser: () => {},
    remainingUsers: 0
  });
  
  const UserProvider: FC<any> = ({ children }) => {
    const [userData, setUserData] = useState<UserType[]>([])
    const [totalUser, setTotalUser] = useState(0)

    const remainingUsers = useMemo(() => {
      return totalUser - userData.length
    }, [userData, totalUser])

    const handleAddUser = (formState : UserType) => {
      setUserData([...userData, formState])
    }

    const handleSetUser = (userCount: number) => {
      setTotalUser(userCount)
    }
    
  
    return (
      <UserContext.Provider value={{ userData, handleAddUser, totalUser, handleSetUser, remainingUsers }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;
  export const useUser = () => useContext(UserContext);
  