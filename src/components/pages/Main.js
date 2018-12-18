import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Icon,
  TextInput
} from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        header: null
      };
      constructor(props) {
        super(props)
        this.state = {
          text: '',
          matric:'',
        }
        // setTimeout(() => {
        // this.props.navigation.navigate('Main')
        // }, 500);
    
      }
  render() { 
    // const { navigate } = this.props.navigation;
    // const MyIcon = (<FontAwesome5 name={'comments'} style={styles.avatar}/>);
    const LOGO = require('../../assets/mobilevoting.png')
    return ( 
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={LOGO}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Mobile Voting</Text>
              <Text style={styles.description}>
                  This system uses finger print for voting authentication system
              </Text>
              <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Matric"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(matric) => this.setState({matric})}/>
          <Image style={styles.inputIcon} source={require('../../assets/matric.png')}/>
        </View>
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate("Vote")} >
                <Text>Continue</Text>  
              </TouchableOpacity>  
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
});

