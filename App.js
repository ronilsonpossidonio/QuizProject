import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { SwitchNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import Main from './Main'
import Finish from './Finish'
import Story from './Story'

// create our app's navigation stack

export default createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Finish,
    Story
  },
  {
    initialRouteName: 'Loading'
  }
));