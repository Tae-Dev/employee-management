import PeoplesIcon from "@rsuite/icons/Peoples";
import SentToUserIcon from "@rsuite/icons/SentToUser";
import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Input, Panel, Table } from "rsuite";
import AdminForm from "../../Components/Admin/AdminForm";
import UserForm from "../../Components/User/UserForm";
import { useAuth } from "../../Contexts/AuthContext";
import { useModal } from "../../Contexts/ModalContext";
import { useUser } from "../../Contexts/UserContext";
const { Column, HeaderCell, Cell } = Table;

const Home = () => {
  const { handleOpenModal, handleCloseModal } = useModal();
  const { userData, handleAddUser, totalUser, handleSetUser, remainingUsers } =
    useUser();
  const [data, setData] = useState(userData);
  const { user } = useAuth();

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  useEffect(() => {
    setData(userData);
  }, [userData]);

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          //@ts-ignore
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          //@ts-ignore
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setTimeout(() => {
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  const handleSearch = (e: any) => {
    setData(
      userData.filter((d) => d.firstName.includes(e) || d.lastName.includes(e))
    );
  };

  return (
    <>
      <div>
        <Panel shaded bordered className="m-4 bg-white">
          <div className="lg:flex lg:flex-row gap-10 xs:gap-3">
            <div className="flex items-center gap-2">
              <PeoplesIcon className="text-lg" />
              <h5 className="text-black">
                Total Registered Users: {userData.length}
              </h5>
            </div>
            <div className="flex items-center gap-2">
              <SentToUserIcon className="text-lg" />
              <h5 className="text-black">Remaining Users: {remainingUsers}</h5>
            </div>
          </div>
        </Panel>
      </div>

      <Panel shaded bordered className="m-4 bg-white">
        <div className="flex flex-col gap-2">
          {user?.role === "User" ? (
            <ButtonToolbar>
              <Button
                disabled={remainingUsers === 0}
                appearance="primary"
                onClick={() =>
                  handleOpenModal(
                    "Add User",
                    <UserForm
                      handleClose={handleCloseModal}
                      handleAddUser={handleAddUser}
                    />
                  )
                }
              >
                Add User
              </Button>
            </ButtonToolbar>
          ) : (
            <ButtonToolbar>
              <Button
                appearance="primary"
                color="red"
                onClick={() =>
                  handleOpenModal(
                    "Set registered user",
                    <AdminForm
                      handleClose={handleCloseModal}
                      handleSetUser={handleSetUser}
                      totalUser={totalUser}
                      userData={userData}
                    />
                  )
                }
              >
                Set registered user
              </Button>
            </ButtonToolbar>
          )}
          <Input placeholder="Search" onChange={handleSearch} />
          <Table
            autoHeight
            virtualized
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            height={400}
            data={getData()}
          >
            {/* <Column minWidth={60} align="center">
              <HeaderCell>No.</HeaderCell>
              <Cell dataKey="index"/>
            </Column> */}

            <Column flexGrow={1} width={150} sortable>
              <HeaderCell>First Name</HeaderCell>
              <Cell dataKey="firstName" />
            </Column>

            <Column flexGrow={1} width={150} sortable>
              <HeaderCell>Last Name</HeaderCell>
              <Cell dataKey="lastName" />
            </Column>

            <Column flexGrow={1} width={150} sortable>
              <HeaderCell>Phone</HeaderCell>
              <Cell dataKey="phone" />
            </Column>
          </Table>
        </div>
      </Panel>
    </>
  );
};

export default Home;
