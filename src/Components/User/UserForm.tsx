import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonToolbar } from "rsuite";
import { FormUserType } from "../../@types";
import { useLoading } from "../../Contexts/LoadingContext";

type Props = {
  handleClose: () => void;
  handleAddUser: (formState: FormUserType) => void;
};

const UserForm: FC<Props> = ({ handleClose, handleAddUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onLoading } = useLoading()

  const onSubmit = (data: any) => {
    handleClose();
    handleAddUser(data);
    onLoading();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-bold mb-2">First name</label>
        <input
          {...register("firstName", { required: true })}
          className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          placeholder="First name"
        />
        {errors.firstName && (
          <p className="text-red-500 text-xs">This field is required.</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Last name</label>
        <input
          {...register("lastName", { required: true })}
          className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Last name"
        />
        {errors.lastName && (
          <p className="text-red-500 text-xs">This field is required.</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Phone</label>
        <input
          {...register("phone", { required: true })}
          className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Phone"
        />
        {errors.phone && (
          <p className="text-red-500 text-xs">This field is required.</p>
        )}
      </div>
      <ButtonToolbar className="mt-10">
        <Button appearance="primary" type="submit">
          Submit
        </Button>
        <Button appearance="default" onClick={handleClose}>
          Cancel
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default UserForm;
