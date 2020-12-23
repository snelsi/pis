import { useMutation, gql, MutationResult } from "@apollo/client";

export interface DELETE_TICKET_VALUE {
  delete_ticket: {
    id: number;
  };
}
export interface DELETE_TICKET_PROPS {
  id: number;
}
export const DELETE_TICKET = gql`
  mutation deleteTicket($id: Int!) {
    delete_ticket(id: $id) {
      id
    }
  }
`;

export const useDeleteTicket = ({ afterDelete = () => {} } = {}): [
  (id: number) => void,
  MutationResult<DELETE_TICKET_VALUE>,
] => {
  const [executeMutation, props] = useMutation<DELETE_TICKET_VALUE, DELETE_TICKET_PROPS>(
    DELETE_TICKET,
  );

  const deleteTicket = async (id: number) => {
    await executeMutation({
      variables: {
        id,
      },
      update(cache) {
        cache.modify({
          fields: {
            tickets(existingTicketsRefs, { readField }) {
              return existingTicketsRefs.filter((ticketRef) => id !== readField("id", ticketRef));
            },
          },
        });
      },
    });
    afterDelete?.();
  };

  return [deleteTicket, props];
};
