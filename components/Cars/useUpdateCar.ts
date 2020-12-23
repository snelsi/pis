import { gql, useMutation } from "@apollo/client";

interface UPDATE_CAR_DATA {
  update_car: {
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
interface UPDATE_CAR_VARIABLES {
  id: number;
  name: string;
  numbers: string;
  owner_id: number;
  color?: string;
  miles?: number;
  year?: number;
  comment?: string;
  air_condition?: boolean;
}

export const UPDATE_CAR = gql`
  mutation updateCar(
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
    update_car(
      pk_columns: { id: $id }
      _set: {
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

export const useUpdateCar = () => {
  const [executeMutation, hookProps] = useMutation<UPDATE_CAR_DATA, UPDATE_CAR_VARIABLES>(
    UPDATE_CAR,
  );

  const updateCar = ({
    id,
    name,
    numbers,
    owner_id,
    color,
    miles,
    year,
    comment = null,
    air_condition,
  }) => {
    if (!id || !name || !numbers || !owner_id) {
      return null;
    }
    return executeMutation({
      variables: {
        id,
        name,
        numbers,
        owner_id,
        color: color ?? null,
        miles: miles ?? null,
        year: year ?? null,
        comment: comment ?? null,
        air_condition: air_condition ?? false,
      },
    });
  };

  return { updateCar, ...hookProps };
};
