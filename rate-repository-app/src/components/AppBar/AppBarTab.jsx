import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';

const styles = StyleSheet.create({
  flexItem: {
    flexGrow: 0,
    padding: 12,
  },
  text: {
    color: 'white'
  }
});
const AppBarTab = ({ label, linkTo }) => {
  return (
    <View style={styles.flexItem}>
      <Link to={linkTo} component={TouchableWithoutFeedback}>
        <Text style={styles.text} fontSize='subheading' fontWeight='bold'>{label}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
