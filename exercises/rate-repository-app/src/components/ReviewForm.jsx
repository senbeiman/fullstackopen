import { Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';
import { useApolloClient, useMutation } from '@apollo/react-hooks';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: ''
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').integer().min(0).max(100),
  review: yup.string()
});
export const ReviewFromContainer = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput style={styles.input} name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput style={styles.input} name="repositoryName" placeholder="Repository name" />
          <FormikTextInput style={styles.input} keyboardType='numeric' name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput style={styles.input} multiline name="text" placeholder="Review" />
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <Text testID='submitButton' fontWeight='bold' style={styles.button}>Create a review</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
};
const ReviewForm = () => {
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();
  const apolloClient = useApolloClient();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const { data } = await mutate({ variables: { ownerName, repositoryName, rating: parseInt(rating), text }});
      apolloClient.resetStore();
      history.push(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return <ReviewFromContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
