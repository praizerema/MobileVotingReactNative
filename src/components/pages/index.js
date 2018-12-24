import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator,TouchableOpacity } from 'react-native'

export default class Index extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {

    }
    setTimeout(() => {
    this.props.navigation.navigate('Main')
    }, 500);

  }
  componentDidMount() {
    StatusBar.setHidden(false);
    // this.props.navigation.navigate('Auth')
  }

  render() {
    return (
        // <View>
        <ActivityIndicator />
        // {/* <Main /> */}
        // </View>
    )
  }
}
// const iconStyles = {
//   size: 100,
//   color: '#FC515B',
// };

const STYLE = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
    // backgroundColor: '#eee',
    // padding: 0,
  },
  mainText: {
    fontFamily: 'Montserrat',
    // fontSize: 12,
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 30,
    // fontWeight: 'bold',
    marginVertical: 15,
  }
})

