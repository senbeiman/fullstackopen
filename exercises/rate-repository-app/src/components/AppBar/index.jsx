import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from './AppBarTab';
import { useQuery } from '@apollo/react-hooks';
import { GET_AUTHORIZED_USER } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: 72,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network'
  });
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" linkTo='/'/>
        {
          data?.authorizedUser ?
          <>
            <AppBarTab label="Create a review" linkTo='/create'/>
            <AppBarTab label="My reviews" linkTo='/my_reviews'/>
            <AppBarTab label="Sign out" linkTo='/sign_out' />
          </>
          :
          <>
            <AppBarTab label="Sign in" linkTo='/sign_in' />
            <AppBarTab label="Sign up" linkTo='/sign_up' />
          </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;