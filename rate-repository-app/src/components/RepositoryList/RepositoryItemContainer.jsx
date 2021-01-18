import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../../theme';
import CountsItem from './CountsItem';
import Text from '../Text';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  countsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 12
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    flexShrink: 1
  },
  description: {
    margin: 3,
  },
  topContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 12,
    marginBottom: 0,
  },
  avator: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    margin: 3,
    padding: 6
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 5,
    margin: 12,
    padding: 12 ,
    textAlign: 'center'
  },
});

const RepositoryItemContainer = ({ item, hasButton }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.avator} source={{uri: item.ownerAvatarUrl}}/>
        <View style={styles.descriptionContainer}>
          <Text testID='fullName' style={styles.description} fontWeight='bold' fontSize='subheading'>{item.fullName}</Text>
          <Text testID='description' style={styles.description} color='textSecondary'>{item.description}</Text>
          <Text testID='language' style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <CountsItem testID='stargazers' label='Stars' rawCounts={item.stargazersCount} />
        <CountsItem testID='forks' label='Forks' rawCounts={item.forksCount} />
        <CountsItem testID='review' label='Reviews' rawCounts={item.reviewCount} />
        <CountsItem testID='rating' label='Rating' rawCounts={item.ratingAverage} />
      </View>
      {hasButton && <TouchableWithoutFeedback onPress={() => {Linking.openURL(item.url);}}><Text style={styles.button} fontWeight='bold'>Open in GitHub</Text></TouchableWithoutFeedback>}
    </View>
  );
};

export default RepositoryItemContainer;
