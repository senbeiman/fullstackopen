import { useMutation, useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Alert, FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 12,
    marginBottom: 0
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 12,
    flexShrink: 1
  },
  rating: {
    color: theme.colors.primary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    margin: 6,
    padding: 12 ,
    flexGrow: 1,
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: theme.colors.textError
  },
  header: {
    paddingBottom: 10,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review: { id, rating, createdAt, text, repository }, refetch }) => {
  const history = useHistory();
  const [mutation] = useMutation(DELETE_REVIEW);
  const formattedCreatedAt = createdAt.slice(8, 10) + '.' + createdAt.slice(5, 7) + '.' + createdAt.slice(0, 4);
  const createAlert = () => 
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            await mutation({ variables: { id }});
            refetch();
          }
        }
      ],
      {cancelable: true}
    );
  return (
    <View>
      <View style={styles.topContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating} fontWeight='bold' fontSize='subheading'>{rating}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text fontSize='subheading' fontWeight='bold'>{repository.fullName}</Text>
          <Text color='textSecondary'>{formattedCreatedAt}</Text>
          <Text>{text}</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableWithoutFeedback onPress={() => {history.push(`/${repository.id}`);}}><Text style={styles.button} fontWeight='bold'>View repository</Text></TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={createAlert}><Text style={[styles.button, styles.deleteButton]} fontWeight='bold'>Delete review</Text></TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, refetch } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });
  if (!data) {
    return null;
  }
  const reviews = data.authorizedUser.reviews;
  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : []; 
  return <FlatList
          data={reviewNodes}
          renderItem={({ item }) => <ReviewItem review={item} refetch={refetch}/>}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={({ id }) => id}
        />;
};
export default MyReviews;
