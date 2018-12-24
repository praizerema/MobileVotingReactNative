import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView,
  Button,
  TouchableHighlight,
  Alert,
  Modal,
  TextInput
} from "react-native";
import NavigationBar from "react-native-navbar";
import TouchID from "react-native-touch-id";

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      passcode: "",
      data:[]
    };
  }


   fetchContestants = async () => {
    let url = "https://tosyngy.000webhostapp.com/mobilevoting/contestant.php"
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
  submitVote = async (vote,voter_id) => {
    let url = "https://tosyngy.000webhostapp.com/mobilevoting/castvote.php"
    const param={
      vote:{...vote},
      voter_id
    }
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(param),
    }
    fetch(url, options)
      .then((response) => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        throw err;
      });
  }


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{
          marginLeft: 15,
          justifyContent: "center"
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            marginRight: 15,
            padding:10,
            justifyContent: "space-around"
          }}
          source={require("../../assets/mobilevoting.png")}
        /></View>
        
      ),

      headerTitleStyle: {
        // backgroundColor: "#000000",
        alignItems: "center"
      },
      headerRight: (
        <View style={styles.popupButtons}>
        <TouchableOpacity onPress={e => params.setVisibleModal(true)}>
        <Text style={{color:"#00BFFF",justifyContent:"space-around", fontSize:16}}>Am Done !</Text>
        </TouchableOpacity>
        </View>
      )
    };
  };
  clearVote=()=>{
    this.state.data.find(p => {
      p.data.find(a => {
        if (a[0].voted==1) {
          const {newvote} = a[0];
          newvote.voted=0;
          this.setState({newvote: newvote.voted});
        }
      });
    });

  }
  isVoted = (data)=>{
    return data.voted == 1
  };
  processBiometric() {
    let votes=[];
    this.state.data.find(p => {
      let d=p.data.filter(this.isVoted)
        votes.unshift({'post_id':d[0].position,'const_id':d[0].id});
    });
    if (votes.length == this.state.data.length) { 
      if (this.state.passcode === this.state.user[0].password) {
        this.submitVote(votes,this.state.user[0].id)
        Alert.alert(
          "Mobile Vote",
          "Authentication Successful",
          [
            // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "Done", onPress: () => {this.clearVote;this.props.navigation.navigate("Main") }}
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert("Info", "Compromise Information Supplied");
        this.clearVote;
        this.props.navigation.navigate("Main");
      }
    } else Alert.alert("Info", "Please vote from each position category");
  }
  
  componentDidMount() {
    this.fetchContestants();
    this.props.navigation.setParams({ setVisibleModal: this.setModalVisible });
  }
  _pressHandler() {
    const optionalConfigObject = {
      title: "Authentication Required", // Android
      imageColor: "#e00606", // Android
      imageErrorColor: "#ff0000", // Android
      sensorDescription: "Touch sensor", // Android
      sensorErrorDescription: "Failed", // Android
      cancelText: "close", // Android
      fallbackLabel: "Show Passcode", // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // iOS
    };
    TouchID.isSupported()
      .then(biometryType => {
        if (biometryType === "TouchID") {
          // Touch ID is supported on iOS
        } else if (biometryType === "FaceID") {
          // Face ID is supported on iOS
        } else if (biometryType === true) {
          TouchID.authenticate("Place your hand to vote", optionalConfigObject)
            .then(success => {
              this.processBiometric();
            })
            .catch(error => {
              Alert.alert("Error", "Authentication Failed");
            });
        } else {
          Alert.alert("Not Supported, Fingerprint Device Required");
        }
      })
      .catch(error => {
        // User's device does not support Touch ID (or Face ID)
        // This case is also triggered if users have not enabled Touch ID on their device
      });
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    let user = this.props.navigation.getParam('user');
    return (
      <View style={[styles.container,{backgroundColor:'#fff'}]}>
        <Modal
          animationType={"fade"}
          transparent={true}
          onRequestClose={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <View style={styles.popupOverlay}>
            <View style={styles.popup}>
              <View style={styles.popupContent}>
                <ScrollView contentContainerStyle={styles.modalInfo}>
                <View style={styles.header}>
              <Text style={styles.headerTitle}>
                My Candidates Choice
              </Text>
          </View>
                  <SectionList
                    sections={this.state.data}
                    renderSectionHeader={({ section }) => {
                      return (
                        <View style={styles.titleContainer}>
                          <Text style={styles.title}>{section.title}</Text>
                        </View>
                      );
                    }}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={
                            item.voted ==1
                              ? styles.container2
                              : [styles.container, { display: "none" }]
                          }
                        >
                           <View style={styles.contentHeader}>
                    <Image style={styles.image} source={{ uri: item.imageurl }} />
                    <View style={styles.content}>  
                    <View style={styles.name}>
                      <Text style={styles.name}>{item.lastname+' '+item.firstname}</Text>
                      </View>
                    </View>
                  </View>
                        </View>
                      );
                    }}
                  />
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputs}
                      placeholder="Passcode"
                      underlineColorAndroid="transparent"
                      onChangeText={passcode => this.setState({ passcode })}
                      keyboardType={'name-phone-pad'}
                    />
                    <Image
                      style={styles.inputIcon}
                      source={require("../../assets/passcode.png")}
                    />
                  </View>
              </View>
              <View style={styles.popupButtons}>
                <TouchableOpacity
                  onPress={() => {
                    this._pressHandler(true);
                    this.setState({user:user})
                    this.setModalVisible(false);
                  }}
                  style={styles.btnClose}
                >
                  <Text style={styles.txtClose}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(false);
                  }}
                  style={[styles.btnClose, { backgroundColor: "#ffffff" }]}
                >
                  <Text style={styles.txtClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <SectionList
          sections={this.state.data}
          renderSectionHeader={({ section }) => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{section.title}</Text>
              </View>
            );
          }}
          renderItem={({ item, index, section, separators }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  section.data.find(p => {
                    p['voted']=0
                    separators.updateProps("leading", p);
                  });
                  item['voted']=(item.voted+1)%2
                  separators.updateProps("trailing", item);
                  this.forceUpdate();
                }}
              >
                <View style={item.voted==1 ? styles.container2 : styles.container}>
                  <View style={styles.contentHeader}>
                    <Image style={styles.image} source={{ uri: item.imageurl }} />
                    <View style={styles.content}>
                      <Text style={item.voted==1 ? styles.name2 : styles.name}>{item.lastname+' '+item.firstname}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "#00BFFF",
    padding: 5
  },
  title: {
    fontSize: 25,
    color: "#FFFFFF",
    padding:15,
  },
  container: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    margin:1
  },
  container2: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#5bc0de",
    margin:5
  },
  hiddenContainer: {
    top: window.height,
    bottom: -window.height
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
    justifyContent: "space-between",
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
  name2: {
    fontSize: 16,
    color:'#ffffff'
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
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080"
  },
  loginText: {
    color: "white"
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
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    margin: 5,
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
  header:{
    padding:20,
    alignItems: 'center',
    backgroundColor: "#00BFFF",
    width:'100%'
  },
  headerTitle:{
    fontSize:30,
    color:"#FFFFFF",
  },
  //Modal style
  popup: {
    backgroundColor: "white",
    marginTop: 10,
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
    height: 450
  },
  popupHeader: {
    marginBottom: 45
  },
  popupButtons: {
    marginRight: 15,
    padding:10,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#eee",
    justifyContent: "center"
  },
  popupButton: {
    flex: 1,
    marginVertical: 16
  },
  btnClose: {
    fontSize: 16,
    backgroundColor: "#20b2aa",
    padding: 20,
    marginRight: 50,
    marginLeft: 50,
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 10
  },
  modalInfo: {
    alignItems: "center",
    justifyContent: "center"
  }
});
