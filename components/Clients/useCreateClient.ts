import { gql, useMutation } from "@apollo/client";

interface CREATE_CLIENT_DATA {
  create_client: {
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
interface CREATE_CLIENT_VARIABLES {
  name: string;
  phone: string;
  email: string;
  sex: string;
  comment?: string;
  birthday?: string;
}
export const CREATE_CLIENT = gql`
  mutation createClient(
    $name: String!
    $phone: String!
    $email: String!
    $sex: String!
    $comment: String = ""
    $birthday: timestamptz = ""
  ) {
    create_client(
      object: {
        name: $name
        phone: $phone
        email: $email
        sex: $sex
        comment: $comment
        birthday: $birthday
      }
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

export const useCreateClient = () => {
  const [executeMutation, hookProps] = useMutation<CREATE_CLIENT_DATA, CREATE_CLIENT_VARIABLES>(
    CREATE_CLIENT,
  );

  const createClient = ({ name, phone, email, sex, comment = null, birthday = null }) => {
    if (!name || !phone || !email) {
      return null;
    }
    return executeMutation({
      variables: {
        name,
        phone,
        email,
        sex: sex || null,
        comment,
        birthday: birthday || null,
      },
    });
  };

  return { createClient, ...hookProps };
};
