import { useApolloClient } from '@apollo/react-hooks';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const SignOut = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();
  useEffect(() => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  }, []);
  return null;
};

export default SignOut;