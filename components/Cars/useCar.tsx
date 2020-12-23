import { gql, useQuery } from "@apollo/client";
import { Car } from "interfaces";

export interface GET_CAR_DATA {
  car: Car;
}
export interface GET_CAR_VARIABLES {
  id: number;
}
export const GET_CAR = gql`
  query getCar($id: Int!) {
    car(id: $id) {
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

export const useCar = (id) => {
  const { data, ...props } = useQuery<GET_CAR_DATA, GET_CAR_VARIABLES>(GET_CAR, {
    variables: {
      id,
    },
  });

  const car = data?.car ?? null;

  return {
    ...props,
    car,
  };
};
