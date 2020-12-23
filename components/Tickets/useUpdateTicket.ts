import { gql, useMutation } from "@apollo/client";

interface UPDATE_TICKET_DATA {
  update_ticket: {
    id: number;
    client_id: number;
    client: {
      id: number;
      name: string;
    };
    car_id: number;
    car: {
      id: number;
      name: string;
    };
    description: string;
    charges: number;
    status: string;
    feedback: string;
    created_at: string;
    updated_at: string;
  };
}
interface UPDATE_TICKET_VARIABLES {
  id: number;
  car_id?: number;
  charges?: number;
  client_id?: number;
  description?: string;
  feedback?: string;
  status?: string;
}
export const UPDATE_TICKET = gql`
  mutation updateTicket(
    $id: Int!
    $car_id: Int
    $charges: numeric
    $client_id: Int
    $description: String = ""
    $feedback: String = ""
    $status: String = ""
  ) {
    update_ticket(
      pk_columns: { id: $id }
      _set: {
        car_id: $car_id
        charges: $charges
        client_id: $client_id
        description: $description
        feedback: $feedback
        status: $status
      }
    ) {
      car_id
      charges
      client_id
      description
      feedback
      id
      status
      updated_at
      worker_id
    }
  }
`;

export const useUpdateTicket = () => {
  const [executeMutation, hookProps] = useMutation<UPDATE_TICKET_DATA, UPDATE_TICKET_VARIABLES>(
    UPDATE_TICKET,
  );

  const updateTicket = ({ id, car_id, charges, client_id, description, feedback, status }) => {
    if (!id || !charges) {
      return null;
    }
    return executeMutation({
      variables: {
        id,
        car_id,
        charges,
        client_id,
        description,
        feedback,
        status,
      },
    });
  };

  return { updateTicket, ...hookProps };
};
