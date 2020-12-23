import { gql, useQuery } from "@apollo/client";
import { Client } from "interfaces";

export interface GET_CLIENT_DATA {
  client: Client;
}
export interface GET_CLIENT_VARIABLES {
  id: number;
}
export const GET_CLIENT = gql`
  query getClient($id: Int!) {
    client(id: $id) {
      id
      name
      phone
      email
      sex
      comment
      birthday
      created_at
      updated_at
    }
  }
`;

export const useClient = (id) => {
  const props = useQuery<GET_CLIENT_DATA, GET_CLIENT_VARIABLES>(GET_CLIENT, {
    variables: {
      id,
    },
  });

  const client = props?.data?.client ?? null;

  return {
    ...props,
    client,
  };
};
