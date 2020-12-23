import { gql, useMutation } from "@apollo/client";

interface CREATE_CAR_DATA {
  create_car: {
    id: number;
    name: string;
    numbers: string;
    owner_id: number;
    color: string;
    miles: number;
    year: number;
    comment: string;
    air_condition: boolean;
  };
}
interface CREATE_CAR_VARIABLES {
  name: string;
  numbers: string;
  owner_id: number;
  color?: string;
  miles?: number;
  year?: number;
  comment?: string;
  air_condition?: boolean;
}
export const CREATE_CAR = gql`
  mutation createCar(
    $id: Int!
    $air_condition: Boolean = false
    $color: String = ""
    $comment: String = ""
    $miles: Int = null
    $name: String!
    $numbers: String!
    $owner_id: Int!
    $year: Int = null
  ) {
    create_car(
      object: {
        air_condition: $air_condition
        color: $color
        comment: $comment
        miles: $miles
        name: $name
        numbers: $numbers
        owner_id: $owner_id
        year: $year
      }
    ) {
      air_condition
      color
      comment
      id
      miles
      name
      numbers
      owner_id
      updated_at
      year
    }
  }
`;

export const useCreateCar = () => {
  const [executeMutation, hookProps] = useMutation<CREATE_CAR_DATA, CREATE_CAR_VARIABLES>(
    CREATE_CAR,
  );

  const createCar = ({ name, numbers, owner_id, color, miles, year, comment, air_condition }) => {
    if (!name || !numbers) {
      return null;
    }
    return executeMutation({
      variables: {
        numbers,
        name,
        owner_id,
        color,
        miles,
        year,
        comment,
        air_condition,
      },
    });
  };

  return { createCar, ...hookProps };
};
