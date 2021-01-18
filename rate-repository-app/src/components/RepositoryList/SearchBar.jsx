import React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  bar: {
    margin: 12,
  }
});
const SearchBar = ({onChange, value}) => {

  return (
    <Searchbar
      placeholder='Search'
      onChangeText={onChange}
      value={value}
      style={styles.bar}
    />
  );
};

export default SearchBar;
