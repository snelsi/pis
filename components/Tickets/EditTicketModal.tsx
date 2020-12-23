import * as React from "react";
import { Ticket } from "interfaces";
import { ModalForm } from "components/ModalForm";
import { useUpdateTicket } from "./useUpdateTicket";
import { Form } from "./Form";

interface EditTicketModalProps {
  ticket: Ticket;
  open: boolean;
  closeModal: () => void;
}

export const EditTicketModal: React.FC<EditTicketModalProps> = ({ ticket, open, closeModal }) => {
  const { updateTicket } = useUpdateTicket();
  const handleClose = () => {
    closeModal();
  };
  const handleSubmit = async (values) => {
    if (!ticket?.id) return { ok: false };
    try {
      const res = await updateTicket({ id: ticket.id, ...values });
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
        status: ticket?.status_value ?? "Waiting",
        client_id: ticket?.client_id ?? null,
        car_id: ticket?.car_id ?? null,
        charges: ticket?.charges ?? 0,
        description: ticket?.description ?? "",
        feedback: ticket?.feedback ?? "",
      }}
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
      title="Edit Ticket"
      subTitle="Update current row data inside 'tickets' table"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Form />
    </ModalForm>
  );
};
