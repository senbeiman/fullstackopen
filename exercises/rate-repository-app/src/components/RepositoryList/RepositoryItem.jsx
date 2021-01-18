import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import theme from '../../theme';
import Text from '../Text';
import RepositoryItemContainer from './RepositoryItemContainer';

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
  header: {
    paddingBottom: 10,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review: { rating, user, createdAt, text } }) => {
  const formattedCreatedAt = createdAt.slice(8, 10) + '.' + createdAt.slice(5, 7) + '.' + createdAt.slice(0, 4);
  return (
    <View style={styles.topContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontWeight='bold' fontSize='subheading'>{rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text fontSize='subheading' fontWeight='bold'>{user.username}</Text>
        <Text color='textSecondary'>{formattedCreatedAt}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

const RepositoryItem = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id });
  if (!repository) {
    return null;
  }
  const reviews = repository.reviews;
  const reviewNodes = reviews
  ? reviews.edges.map(edge => edge.node)
  : []; 
  const onEndReach = () => {
    fetchMore();
  };
  return <FlatList
          data={reviewNodes}
          renderItem={({ item }) => <ReviewItem review={item} />}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={({ id }) => id}
          ListHeaderComponent={() => <RepositoryItemContainer item={repository} hasButton />}
          ListHeaderComponentStyle={styles.header}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.5}
        />;
};
export default RepositoryItem;