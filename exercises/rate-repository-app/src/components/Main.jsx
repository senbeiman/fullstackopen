import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Redirect, Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import SignOut from './SignOut';
import RepositoryItem from './RepositoryList/RepositoryItem';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/sign_in' exact>
          <SignIn />
        </Route>
        <Route path='/sign_out' exact>
          <SignOut />
        </Route>
        <Route path='/sign_up' exact>
          <SignUp />
        </Route>
        <Route path='/create' exact>
          <ReviewForm />
        </Route>
        <Route path='/my_reviews' exact>
          <MyReviews />
        </Route>
        <Route path='/:id'>
          <RepositoryItem />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;