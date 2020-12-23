import { gql, useQuery } from "@apollo/client";
import { Ticket } from "interfaces";

export interface GET_TICKET_DATA {
  ticket: Ticket;
}
export interface GET_TICKET_VARIABLES {
  id: number;
}
export const GET_TICKET = gql`
  query getTicket($id: Int!) {
    ticket(id: $id) {
      id
      client_id
      client {
          id
          name
      }
      car_id
      car {
          id
          name
      }
      description
      charges
      status
      feedback
      created_at
      updated_at
    }
  }
`;

export const useTicket = (id) => {
  const props = useQuery<GET_TICKET_DATA, GET_TICKET_VARIABLES>(GET_TICKET, {
    variables: {
      id,
    },
  });

  const ticket = props?.data?.ticket ?? null;

  return {
    ...props,
    ticket,
  };
};
