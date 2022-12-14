import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonToolbar } from "rsuite";
import { useLoading } from "../../Contexts/LoadingContext";
import { useModal } from "../../Contexts/ModalContext";

type Props = {
  handleClose: () => void;
  handleSetUser: (userCount: number) => void;
  totalUser: number;
  userData: any;
};

const AdminForm: FC<Props> = ({
  handleClose,
  handleSetUser,
  totalUser,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onLoading } = useLoading();
  const { handleOpenModal, handleCloseModal } = useModal();

  const ConfirmSetUser = (data: any) => {
    const onConfirm = () => {
      handleClose();
      handleSetUser(data.registeredUser);
      onLoading();
    };

    return (
      <ButtonToolbar className="mt-10">
        <Button appearance="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button appearance="default" onClick={handleClose}>
          Cancel
        </Button>
      </ButtonToolbar>
    );
  };

  const onSubmit = (data: any) => {
    handleOpenModal("confirm set registered user", ConfirmSetUser(data));
    // handleClose();
    // handleSetUser(data.registeredUser);
    // onLoading();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-bold mb-2">Registered user</label>
        <input
          defaultValue={totalUser}
          type="text"
          {...register("registeredUser", {
            required: {
              value: true,
              message: "This field is required.",
            },
            pattern: {
              value: /^(0|[1-9]\d*)(\\d+)?$/,
              message: "This field is integer number only.",
            },
          })}
          className="appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Registered user"
        />
        {errors.registeredUser && (
          <p className="text-red-500 text-xs">
            {errors.registeredUser.message?.toString()}
          </p>
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

export default AdminForm;
