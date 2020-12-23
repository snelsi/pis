import * as React from "react";
import { Ticket } from "interfaces";
import { ModalForm } from "components/ModalForm";
import { Form } from "./Form";
import { useCreateTicket } from "./useCreateTicket";

interface CreateTicketModalProps {
  open: boolean;
  closeModal: () => void;
}

export const CreateTicketModal: React.FC<CreateTicketModalProps> = ({ open, closeModal }) => {
  const { createTicket } = useCreateTicket();

  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    try {
      const res = await createTicket(values);
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
        status: "Waiting",
        client_id: null,
        car_id: null,
        charges: null,
        description: "",
        feedback: "",
      }}
      title="Add New Ticket"
      subTitle="Create new row inside 'tickets' table."
      onClose={handleClose}
      onSubmit={handleSubmit}
      validate={(values: Partial<Ticket>) => {
        const errors: { [x: string]: string } = {};
        if (!values.status) {
          errors.status = "Status is required";
        }
        if (!values.charges || values.charges < 0) {
          errors.email = "Charges should be greater then zero";
        }
        return errors;
      }}
    >
      <Form />
    </ModalForm>
  );
};
