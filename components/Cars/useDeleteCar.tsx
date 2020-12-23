import { useMutation, gql, MutationResult } from "@apollo/client";

export interface DELETE_CAR_VALUE {
  delete_car: {
    id: number;
  };
}
export interface DELETE_CAR_PROPS {
  id: number;
}
export const DELETE_CAR = gql`
  mutation deleteCar($id: Int!) {
    delete_car(id: $id) {
      id
    }
  }
`;

export const useDeleteCar = ({ afterDelete = () => {} } = {}): [
  (id: number) => void,
  MutationResult<DELETE_CAR_VALUE>,
] => {
  const [executeMutation, props] = useMutation<DELETE_CAR_VALUE, DELETE_CAR_PROPS>(DELETE_CAR);

  const deleteCar = async (id: number) => {
    await executeMutation({
      variables: {
        id,
      },
      update(cache) {
        cache.modify({
          fields: {
            cars(existingCarsRefs, { readField }) {
              return existingCarsRefs.filter((carRef) => id !== readField("id", carRef));
            },
          },
        });
      },
    });
    afterDelete?.();
  };

  return [deleteCar, props];
};
