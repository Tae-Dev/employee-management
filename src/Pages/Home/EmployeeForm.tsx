import React, { FC, useState } from "react";
import { Button, ButtonToolbar, Form } from "rsuite";
import { EmployeeType } from "../../Contexts/EmployeeContext";

type Props = {
  handleClose: () => void;
  handleAddEmployee: (formState: EmployeeType) => void;
};

const EmployeeForm: FC<Props> = ({ handleClose, handleAddEmployee }) => {
  const [formState, setFormState] = useState<EmployeeType>({
    firstName: "",
    lastName: "",
    phone: "",
  });

  return (
    <Form fluid>
      <Form.Group controlId="firstName">
        <Form.ControlLabel>First name</Form.ControlLabel>
        <Form.Control
          name="firstName"
          onChange={(e: any) => setFormState({ ...formState, firstName: e })}
        />
        <Form.HelpText>Username is required</Form.HelpText>
      </Form.Group>
      <Form.Group controlId="LastName">
        <Form.ControlLabel>Last name</Form.ControlLabel>
        <Form.Control
          name="LastName"
          onChange={(e: any) => setFormState({ ...formState, lastName: e })}
        />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.ControlLabel>Phone</Form.ControlLabel>
        <Form.Control
          name="phone"
          onChange={(e: any) => setFormState({ ...formState, phone: e })}
        />
      </Form.Group>
      <Form.Group>
        <ButtonToolbar>
          <Button
            appearance="primary"
            onClick={() => {
              handleAddEmployee(formState);
              handleClose();
            }}
          >
            Submit
          </Button>
          <Button appearance="default" onClick={handleClose}>
            Cancel
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
};

export default EmployeeForm;
