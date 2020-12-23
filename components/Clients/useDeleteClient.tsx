import { useMutation, gql, MutationResult } from "@apollo/client";

export interface DELETE_CLIENT_VALUE {
  delete_client: {
    id: number;
  };
}
export interface DELETE_CAR_PROPS {
  id: number;
}
export const DELETE_CLIENT = gql`
  mutation deleteClient($id: Int!) {
    delete_client(id: $id) {
      id
    }
  }
`;

export const useDeleteClient = ({ afterDelete = () => {} } = {}): [
  (id: number) => void,
  MutationResult<DELETE_CLIENT_VALUE>,
] => {
  const [executeMutation, props] = useMutation<DELETE_CLIENT_VALUE, DELETE_CAR_PROPS>(
    DELETE_CLIENT,
  );

  const deleteClient = async (id: number) => {
    await executeMutation({
      variables: {
        id,
      },
      update(cache) {
        cache.modify({
          fields: {
            clients(existingClientsRefs, { readField }) {
              return existingClientsRefs.filter((clientRef) => id !== readField("id", clientRef));
            },
          },
        });
      },
    });
    afterDelete?.();
  };

  return [deleteClient, props];
};
