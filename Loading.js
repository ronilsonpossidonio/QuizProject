// Loading.js
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'

import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDYOfmFrLL-MvBhU-5LaoQZntqcJh8C6Mc",
  authDomain: "quizproject-c2877.firebaseapp.com",
  databaseURL: "https://quizproject-c2877.firebaseio.com",
  projectId: "quizproject-c2877",
  storageBucket: "quizproject-c2877.appspot.com",
  messagingSenderId: "707920676760"
};

firebase.initializeApp(firebaseConfig);

export default class Loading extends React.Component {


  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'SignUp')
    })
  }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#ffef92"
  }
})