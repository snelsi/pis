import * as React from "react";
import { Client } from "interfaces";
import dayjs from "dayjs";
import { ModalForm } from "components/ModalForm";
import { prettyDate } from "scripts/helpers";
import { useUpdateClient } from "./useUpdateClient";
import { Form } from "./Form";

interface EditClientModalProps {
  client: Client;
  open: boolean;
  closeModal: () => void;
}

export const EditClientModal: React.FC<EditClientModalProps> = ({ client, open, closeModal }) => {
  const { updateClient } = useUpdateClient();
  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    if (!client?.id) return { ok: false };
    try {
      const res = await updateClient({ id: client.id, ...values });
      return { ok: !!res, res };
    } catch (e) {
      console.error(e);
      return { ok: false, error: e };
    }
  };

  const trimmedBirthday = client?.birthday?.trim();
  const birthday = dayjs(trimmedBirthday);

  return (
    <ModalForm
      open={open}
      initialValues={{
        name: client?.name ?? "",
        phone: client?.phone ?? "",
        email: client?.email ?? "",
        sex: client?.sex ?? "",
        comment: client?.comment ?? "",
        birthday: prettyDate(birthday.toDate()),
      }}
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
      title="Edit Client"
      subTitle="Update current row data inside 'clients' table"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Form />
    </ModalForm>
  );
};
