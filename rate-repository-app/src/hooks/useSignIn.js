import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password }});
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;