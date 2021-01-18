import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  countsItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const CountsItem = ({ label, rawCounts, testID }) => {
  const parseCounts = (counts) => {
    if (counts < 1000) {
      return counts.toString();
    }
    const roundedCounts = Math.floor(counts / 100) / 10;
    return `${roundedCounts}k`;
  };
  return (
    <View style={styles.countsItem}>
      <Text testID={testID} fontWeight='bold'>{parseCounts(rawCounts)}</Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  );
};

export default CountsItem;

