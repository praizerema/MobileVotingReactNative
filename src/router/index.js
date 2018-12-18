import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import React, { Component } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";

import EntryForm from '../components/pages/EntryForm';
import Vote from '../components/pages/Vote';
import ThumbPrintAuth from '../components/pages/ThumbPrintAuth';
import Main from '../components/pages/Main';
import Index from "../components/pages";


RootStack = createStackNavigator({
  Vote: {
    screen: Vote
  }, 
  EntryForm: {
    screen: EntryForm
  },
  ThumbPrintAuth: { screen: ThumbPrintAuth },
  Main: { screen: Main }
});


export default createSwitchNavigator(
  {
    Index: Index,
    App: RootStack
    // Onboarding: {
    //   screen: Onboarding
    // }
  },
  {
    initialRouteName:"Index" 
  }
);
