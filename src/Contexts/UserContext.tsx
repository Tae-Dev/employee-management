import { createContext, FC, useContext, useMemo, useState } from "react";
import { FormUserType } from "../@types";

type UserContextType = {
  userData: FormUserType[];
  handleAddUser: (formState: FormUserType) => void;
  totalUser: number;
  handleSetUser: (userCount: number) => void;
  remainingUsers: number;
};

const UserContext = createContext<UserContextType>({
  userData: [],
  handleAddUser: () => {},
  totalUser: 0,
  handleSetUser: () => {},
  remainingUsers: 0,
});

const UserProvider: FC<any> = ({ children }) => {
  const [userData, setUserData] = useState<FormUserType[]>([]);
  const [totalUser, setTotalUser] = useState(0);

  const remainingUsers = useMemo(() => {
    return totalUser - userData.length;
  }, [userData, totalUser]);

  const handleAddUser = (formState: FormUserType) => {
    setUserData([...userData, formState]);
  };

  const handleSetUser = (userCount: number) => {
    const userDataSort = userData.filter((f, index) => index < userCount);
    setUserData(userDataSort);
    setTotalUser(userCount);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        handleAddUser,
        totalUser,
        handleSetUser,
        remainingUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
