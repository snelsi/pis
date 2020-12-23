import { gql, useQuery } from "@apollo/client";
import { Client } from "interfaces";

export interface GET_CLIENTS_DATA {
  clients: Client[];
}
export interface GET_CLIENTS_VARIABLES {
  filter: string;
  offset: number;
  limit: number;
  orderBy: object;
}
export const GET_CLIENTS = gql`
  query getClientsList(
    $filter: String!
    $offset: Int!
    $limit: Int!
    $orderBy: [clients_order_by!]
  ) {
    clients(
      offset: $offset
      limit: $limit
      where: { name: { _ilike: $filter } }
      order_by: $orderBy
    ) {
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
export interface GET_CLIENTS_TOTAL_DATA {
  clients_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
export interface GET_CLIENTS_TOTAL_VARIABLES {
  filter: string;
}
export const GET_CLIENTS_TOTAL = gql`
  query getClientsTotal($filter: String!) {
    clients_aggregate(where: { name: { _ilike: $filter } }) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;
export const useClients = ({
  filter = `%%`,
  limit = 20,
  offset = 0,
  orderProp = "id",
  orderDirection = "asc",
} = {}) => {
  const { loading, error, refetch: refetchClients, ...props } = useQuery<
    GET_CLIENTS_DATA,
    GET_CLIENTS_VARIABLES
  >(GET_CLIENTS, {
    variables: {
      filter,
      offset,
      limit,
      orderBy: {
        [orderProp]: orderDirection,
      },
    },
  });
  const { data, loading: totalLoading, error: totalError, refetch: refetchTotal } = useQuery<
    GET_CLIENTS_TOTAL_DATA,
    GET_CLIENTS_TOTAL_VARIABLES
  >(GET_CLIENTS_TOTAL, {
    variables: {
      filter,
    },
  });
  const clients = props?.data?.clients ?? null;
  const total = data?.clients_aggregate?.aggregate?.count ?? null;

  const refetch = () => {
    refetchClients();
    refetchTotal();
  };

  return {
    ...props,
    loading: loading || totalLoading,
    error: error || totalError,
    clients,
    total,
    refetch,
  };
};
