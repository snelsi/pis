import { gql, useQuery } from "@apollo/client";
import { Car } from "interfaces";

export interface GET_CARS_DATA {
  cars: Car[];
}
export interface GET_CARS_VARIABLES {
  filter: string;
  offset: number;
  limit: number;
  orderBy: object;
}
export const GET_CARS = gql`
  query getCarsList($filter: String!, $offset: Int!, $limit: Int!, $orderBy: [cars_order_by!]) {
    cars(offset: $offset, limit: $limit, where: { name: { _ilike: $filter } }, order_by: $orderBy) {
      id
      numbers
      owner_id
      name
      color
      year
      miles
      comment
      air_condition
      created_at
      updated_at
    }
  }
`;
export interface GET_CARS_TOTAL_DATA {
  cars_aggregate: {
    aggregate: {
      count: number;
    };
  };
}
export interface GET_CARS_TOTAL_VARIABLES {
  filter: string;
}
export const GET_CARS_TOTAL = gql`
  query getCarsTotal($filter: String!) {
    cars_aggregate(where: { name: { _ilike: $filter } }) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;
export const useCars = ({
  filter = `%%`,
  limit = 20,
  offset = 0,
  orderProp = "id",
  orderDirection = "asc",
} = {}) => {
  const { loading, error, refetch: refetchCars, ...props } = useQuery<
    GET_CARS_DATA,
    GET_CARS_VARIABLES
  >(GET_CARS, {
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
    GET_CARS_TOTAL_DATA,
    GET_CARS_TOTAL_VARIABLES
  >(GET_CARS_TOTAL, {
    variables: {
      filter,
    },
  });
  const cars = props?.data?.cars ?? null;
  const total = data?.cars_aggregate?.aggregate?.count ?? null;

  const refetch = () => {
    refetchCars();
    refetchTotal();
  };

  return {
    ...props,
    loading: loading || totalLoading,
    error: error || totalError,
    cars,
    total,
    refetch,
  };
};
