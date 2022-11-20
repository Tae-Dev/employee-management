import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Input, Panel, Table } from "rsuite";
import { useAuth } from "../../Contexts/AuthContext";
import { useModal } from "../../Contexts/ModalContext";
import { useUser } from "../../Contexts/UserContext";
import AdminForm from "../Admin/AdminForm";
import UserForm from "../User/UserForm";
const { Column, HeaderCell, Cell } = Table;

const PanelTable= () => {
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
  );
};

export default PanelTable;
