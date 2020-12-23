import * as React from "react";
import { Car } from "interfaces";
import { ModalForm } from "components/ModalForm";
import { Form } from "./Form";
import { useUpdateCar } from "./useUpdateCar";

interface EditCarModalProps {
  car: Car;
  open: boolean;
  closeModal: () => void;
}

export const EditCarModal: React.FC<EditCarModalProps> = ({ car, open, closeModal }) => {
  const { updateCar } = useUpdateCar();
  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    if (!car?.id) return { ok: false };
    try {
      const res = await updateCar({ id: car.id, ...values });
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
        numbers: car?.numbers ?? "",
        name: car?.name ?? "",
        owner_id: car?.owner_id ?? "",
        color: car?.color ?? "",
        year: car?.year ?? "",
        miles: car?.miles ?? "",
        comment: car?.comment ?? "",
        air_condition: String(car?.air_condition) === "+",
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
      title="Edit Car"
      subTitle="Update current row data inside 'cars' table"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Form />
    </ModalForm>
  );
};
