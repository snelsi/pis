import { gql, useQuery } from "@apollo/client";
import { Ticket } from "interfaces";

export interface GET_TICKETS_DATA {
  tickets: Ticket[];
}
export interface GET_TICKETS_VARIABLES {
  filter: string;
  offset: number;
  limit: number;
  orderBy: object;
}
export const GET_TICKETS = gql`
  query getTicketsList(
    $filter: String!
    $offset: Int!
    $limit: Int!
    $orderBy: [tickets_order_by!]
  ) {
    tickets(
      offset: $offset
      limit: $limit
      where: { description: { _ilike: $filter } }
      order_by: $orderBy
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
export interface GET_TICKETS_TOTAL_DATA {
  tickets_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
export interface GET_TICKETS_TOTAL_VARIABLES {
  filter: string;
}
export const GET_TICKETS_TOTAL = gql`
  query getTicketsTotal($filter: String!) {
    tickets_aggregate(where: { description: { _ilike: $filter } }) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;
export const useTickets = ({
  filter = `%%`,
  limit = 20,
  offset = 0,
  orderProp = "id",
  orderDirection = "asc",
} = {}) => {
  const { loading, error, refetch: refetchTickets, ...props } = useQuery<
    GET_TICKETS_DATA,
    GET_TICKETS_VARIABLES
  >(GET_TICKETS, {
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
    GET_TICKETS_TOTAL_DATA,
    GET_TICKETS_TOTAL_VARIABLES
  >(GET_TICKETS_TOTAL, {
    variables: {
      filter,
    },
  });
  const tickets = props?.data?.tickets ?? null;
  const total = data?.tickets_aggregate?.aggregate?.count ?? null;

  const refetch = () => {
    refetchTickets();
    refetchTotal();
  };

  return {
    ...props,
    loading: loading || totalLoading,
    error: error || totalError,
    tickets,
    total,
    refetch,
  };
};
