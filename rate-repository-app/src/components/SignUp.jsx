import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { SIGN_UP } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    margin: 12,
    padding: 12,
    textAlign: 'center'
  }
});
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordConfirmation: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], 'does not match with password'),
});
export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput style={styles.input} name="username" placeholder="Username" />
          <FormikTextInput secureTextEntry name="password" placeholder="Password" />
          <FormikTextInput secureTextEntry name="passwordConfirmation" placeholder="Password confirmation" />
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text testID='submitButton' fontWeight='bold' style={styles.button}>Sign up</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};
const SignUp = () => {
  const [mutate] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({ variables: { username, password }});
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;