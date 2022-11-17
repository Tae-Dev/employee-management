import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Input, Panel, Table } from "rsuite";
import { useAuth } from "../../Contexts/AuthContext";
import { useEmployee } from "../../Contexts/EmployeeContext";
import { useModal } from "../../Contexts/ModalContext";
import EmployeeForm from "./EmployeeForm";
const { Column, HeaderCell, Cell } = Table;

export const Home = () => {
  const { handleOpen, handleClose } = useModal()
  const { employeeData, handleAddEmployee } = useEmployee()
  const [data, setData] = useState(employeeData);
  const { user } = useAuth()

  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();

  useEffect(() => {
    console.log('employeeData', employeeData);
    
    setData(employeeData)
  }, [employeeData])
  

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
    setData(employeeData.filter(d => d.firstName.includes(e) || d.lastName.includes(e)))
  }

  return (
    <Panel header={<h3 className="title">Dashboard</h3>}>
      <div className="flex flex-col gap-2">
      {user?.role === 'User' && <ButtonToolbar>
        <Button appearance="primary" onClick={() => 
          handleOpen('Add Employee', <EmployeeForm handleClose={handleClose} handleAddEmployee={handleAddEmployee}/>)}>Add employee</Button>
      </ButtonToolbar>}
        <Input placeholder="Search" onChange={handleSearch}/>
        <Table
          sortColumn={sortColumn}
          sortType={sortType}
          onSortColumn={handleSortColumn}
          height={400}
          data={getData()}
        >
          <Column minWidth={60} align="center" sortable>
            <HeaderCell>No.</HeaderCell>
            <Cell dataKey="rowIndex" rowIndex={1} />
          </Column>

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
