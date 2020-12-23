import * as React from "react";
import { ModalForm } from "components/ModalForm";
import { Form } from "./Form";
import { useCreateClient } from "./useCreateClient";

interface CreateClientModalProps {
  open: boolean;
  closeModal: () => void;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  sex: string;
  comment: string;
  birthday: string;
  created_at?: string;
  updated_at?: string;
}

export const CreateClientModal: React.FC<CreateClientModalProps> = ({ open, closeModal }) => {
  const { createClient } = useCreateClient();

  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    try {
      const res = await createClient(values);
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
        name: "",
        phone: "",
        email: "",
        sex: "",
        comment: "",
        birthday: "",
      }}
      title="Add New Client"
      subTitle="Create new row inside 'clients' table. Requires name and phone."
      onClose={handleClose}
      onSubmit={handleSubmit}
      validate={(values: Partial<Client>) => {
        const errors: Partial<Client> = {};
        if (!values.name) {
          errors.name = "Name is required";
        }
        if (!values.phone) {
          errors.phone = "Phone is required";
        }
        if (!values.email) {
          errors.email = "Email is required";
        }
        if (!values.sex) {
          errors.email = "This field is required";
        }
        return errors;
      }}
    >
      <Form />
    </ModalForm>
  );
};
