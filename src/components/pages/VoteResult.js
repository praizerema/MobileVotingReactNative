import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView,
  Modal,
  TextInput
} from "react-native";
import NavigationBar from "react-native-navbar";
import TouchID from "react-native-touch-id";

export default class VoteResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      passcode: "",
      data:[],
     };
  }


  fetctResults = async () => {
    let url = "https://tosyngy.000webhostapp.com/mobilevoting/result.php"
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }
    fetch(url, options)
      .then((response) => response.json())
      .then(result => {
        this.setState({data:result})
      })
      .catch(err => {
        throw err;
      });
  }
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Image
          style={{
            width: 50,
            height: 50,
            marginRight: 15,
            justifyContent: "space-around"
          }}
          source={require("../../assets/mobilevoting.png")}
        />
      ),
      headerRight: (
        <Text style={{fontSize:20,marginRight:10,color:'#333000'}}>Voting Result</Text>
      )
    };
  };

  componentDidMount() {
    this.fetctResults();
  }
  render() {
    return (
      <View style={[styles.container,{backgroundColor:'#fff'}]}>
        <SectionList
          sections={this.state.data}
          renderSectionHeader={({ section }) => {
            return (
              <View style={styles.container2}>
                <Text style={styles.title}>{section.title}</Text>
              </View>
            );
          }}
          renderItem={({ item, index, section, separators }) => {
            return (
                <View style={styles.container2}>
                  <View style={item.voted==1 ? styles.container2 : styles.container}>
                  <View style={styles.contentHeader}>
                    <Image style={styles.image} source={{ uri: item.imageurl }} />
                    <View style={styles.content}>
                    <View style={styles.name}>
                      <Text style={styles.name}>{item.lastname+' '+item.firstname}</Text>
                      </View>
                      <View style={styles.voteInline}>
                      <Text style={styles.vote}>{item.res}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    padding: 10
  },
  contentContainer: {
    backgroundColor: "#fff"
    // width: '100%',
  },
  titleContainer: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  title: {
    fontSize: 25,
    color: "#FFFFFF",
    padding:15,
  },
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    margin:5
  },
  container2: {
    paddingVertical: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#00BFFF"
  },
  content: {
    marginLeft: 15,
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080"
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color:'#808080'
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: "center"
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
  },
  vote:{
    fontSize: 11,
    alignSelf: 'flex-end',
    padding:5,
    backgroundColor: "#d9534f",
    color:"#FFFFFF",
    shadowColor: "#808080",
    borderRadius:50,
    marginRight: 10,
    marginLeft:10,
    marginBottom:10
  },
  voteInline:{
    fontSize: 11,
    color:"#FFFFFF"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  //Modal style
  popup: {
    backgroundColor: "white",
    marginTop: 80,
    marginHorizontal: 20,
    borderRadius: 7
  },
  popupOverlay: {
    backgroundColor: "#00000057",
    flex: 1,
    marginTop: 30
  },
  popupContent: {
    //alignItems: 'center',
    margin: 5,
    height: 250
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginTop: 15,
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    justifyContent: "center"
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    // height:20,
    fontSize: 16,
    backgroundColor: "#20b2aa",
    padding: 20,
    marginRight: 50,
    marginLeft: 50,
    borderColor: "#00000057",
    borderWidth: 1,
    borderRadius: 10
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center"
  }
});
