import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: '',
  password: ''
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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
});
export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput testID='username' style={styles.input} name="username" placeholder="Username" />
          <FormikTextInput testID='password' style={styles.input} secureTextEntry name="password" placeholder="Password" />
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text testID='submitButton' fontWeight='bold' style={styles.button}>Sign in</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};
const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;