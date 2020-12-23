import { gql, useMutation } from "@apollo/client";

interface CREATE_TICKET_DATA {
  create_ticket: {
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
interface CREATE_TICKET_VARIABLES {
  car_id?: number;
  charges: number;
  client_id?: number;
  description?: string;
  feedback?: string;
  status?: string;
}
export const CREATE_TICKET = gql`
  mutation createTicket(
    $car_id: Int
    $charges: numeric
    $client_id: Int
    $description: String
    $feedback: String
    $status: String
  ) {
    create_ticket(
      object: {
        car_id: $car_id
        charges: $charges
        client_id: $client_id
        description: $description
        feedback: $feedback
        status: $status
        worker_id: 6
      }
    ) {
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

export const useCreateTicket = () => {
  const [executeMutation, hookProps] = useMutation<CREATE_TICKET_DATA, CREATE_TICKET_VARIABLES>(
    CREATE_TICKET,
  );

  const createTicket = ({ car_id, charges, client_id, description, feedback, status }) => {
    if (!charges) {
      return null;
    }
    return executeMutation({
      variables: {
        car_id,
        charges,
        client_id,
        description,
        feedback,
        status,
      },
    });
  };

  return { createTicket, ...hookProps };
};
