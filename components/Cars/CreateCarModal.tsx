import * as React from "react";
import { ModalForm } from "components/ModalForm";
import { Car } from "interfaces";
import { Form } from "./Form";
import { useCreateCar } from "./useCreateCar";

interface CreateCarModalProps {
  open: boolean;
  closeModal: () => void;
}

export const CreateCarModal: React.FC<CreateCarModalProps> = ({ open, closeModal }) => {
  const { createCar } = useCreateCar();

  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    try {
      const res = await createCar(values);
      return { ok: !!res, res };
    } catch (e) {
      console.error(e);
      return { ok: false, error: e };
    }
  };

  return (
    <ModalForm
      open={open}
      initialValues={{
        numbers: "",
        name: "",
        owner_id: "",
        color: "",
        year: "",
        miles: "",
        comment: "",
        air_condition: false,
      }}
      validate={(values: Partial<Car>) => {
        const errors: Partial<Car> = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.numbers) {
          errors.numbers = "Numbers is required";
        }
        return errors;
      }}
      title="Add New Car"
      subTitle="Create new row inside 'cars' table"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Form />
    </ModalForm>
  );
};
