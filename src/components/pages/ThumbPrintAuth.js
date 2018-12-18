import React, { Component } from 'react';
import { Text, View,TouchableHighlight,Alert } from 'react-native';
import TouchID from 'react-native-touch-id';

export default class ThumbPrintAuth extends Component {
  _pressHandler() {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "Cancel", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    }
    TouchID.isSupported()
    .then(biometryType => {
      if (biometryType === 'TouchID') {
        // Touch ID is supported on iOS
      } else if (biometryType === 'FaceID') {
        // Face ID is supported on iOS
      } else if (biometryType === true) {
        TouchID.authenticate('Touch to vote', optionalConfigObject)
        .then(success => {
          console.log(success)
          Alert.alert('Authenticated Successfully');
        })
        .catch(error => {
          Alert.alert('Authentication Failed');
        });
      }else{
        Alert.alert('Not Supported');
      }
    })
    .catch(error => {
      // User's device does not support Touch ID (or Face ID)
      // This case is also triggered if users have not enabled Touch ID on their device
    });

  }
  render() {
    return (
      <View>
          <TouchableHighlight onPress={this._pressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}