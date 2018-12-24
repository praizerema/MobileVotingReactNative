import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Icon,
  TextInput,
  Alert
} from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      matric: ""
    };
    // setTimeout(() => {
    // this.props.navigation.navigate('Main')
    // }, 500);
  }
  fetchPasscode = async () => {
    let url = "https://tosyngy.000webhostapp.com/mobilevoting/password.php";
    //let reference= new Date().getTime()
    let param = {
      username: this.state.matric
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(param)
    };
    console.log(JSON.stringify(param));
    fetch(url, options)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.length != 0) {
          if (result[0].voted == "1")
            Alert.alert("Response", "You already cast vote");
          else this.props.navigation.navigate("Vote", { user: result });
        } else
          Alert.alert("Response", "Details Does not match any Voters record");
      })
      .catch(err => {
        throw err;
      });
  };
  // componentDidMount() {
  //   this.fetchPasscode();
  // }
  render() {
    const LOGO = require("../../assets/mobilevoting.png");
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image style={styles.avatar} source={LOGO} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>Mobile Voting</Text>
            <Text style={styles.description}>
              This system uses finger print for voting authentication system
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                placeholder="Matric"
                underlineColorAndroid="transparent"
                onChangeText={matric => this.setState({ matric })}
                keyboardType={"visible-password"}
              />
              <Image
                style={styles.inputIcon}
                source={require("../../assets/matric.png")}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                let ch5 = this.state.matric.match(
                  /(f|p)\/(hd|nd)\/\d{2}\/321\d{4}/i
                );
                if (ch5 !== null) {
                  this.state.matric == ch5[0];
                  this.fetchPasscode(ch5[0]);
                } else Alert.alert("Warning", "Invalid Matric No");
              }}
            >
              <Text>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => this.props.navigation.navigate("VoteResult")}
            >
              <Text style={styles.linkContainer}>Election Progress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF"
  },
  linkContainer: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#00BFFF",
    justifyContent: "flex-end",
    // alignSelf: 'flex-end',
    margin: 50
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center"
  }
});
