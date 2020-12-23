import { gql, useMutation } from "@apollo/client";

interface UPDATE_CLIENT_DATA {
  update_client: {
    id: number;
    name: string;
    phone: string;
    email: string;
    sex: string;
    comment: string;
    birthday: string;
    created_at: string;
    updated_at: string;
  };
}
interface UPDATE_CLIENT_VARIABLES {
  id: number;
  name: string;
  phone: string;
  email: string;
  sex: string;
  comment?: string;
  birthday?: string;
}
export const UPDATE_CLIENT = gql`
  mutation updateClient(
    $id: Int!
    $birthday: timestamptz = null
    $comment: String = null
    $email: String!
    $name: String!
    $phone: String!
    $sex: String!
  ) {
    update_client(
      pk_columns: { id: $id }
      _set: {
        birthday: $birthday
        comment: $comment
        email: $email
        name: $name
        phone: $phone
        sex: $sex
      }
    ) {
      birthday
      comment
      email
      id
      name
      phone
      sex
      updated_at
    }
  }
`;

export const useUpdateClient = () => {
  const [executeMutation, hookProps] = useMutation<UPDATE_CLIENT_DATA, UPDATE_CLIENT_VARIABLES>(
    UPDATE_CLIENT,
  );

  const updateClient = ({ id, name, phone, email, sex, comment = null, birthday = null }) => {
    if (!id || !name || !phone || !email) {
      return null;
    }
    return executeMutation({
      variables: {
        id,
        name,
        phone,
        email,
        sex: sex || null,
        comment,
        birthday: birthday || null,
      },
    });
  };

  return { updateClient, ...hookProps };
};
