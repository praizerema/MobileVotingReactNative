import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  ScrollView
} from "react-native";

export default class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true,
      data: [
        {
          title: "President",
          data: [
            {
              key: 1,
              name: "Contestant 1",
              image: "https://bootdey.com/img/Content/avatar/avatar6.png",
              vote: false
            },
            {
              key: 2,
              name: "Contestant 2",
              image: "https://bootdey.com/img/Content/avatar/avatar1.png",
              vote: false
            },
            {
              key: 3,
              name: "Contestant 3",
              image: "https://bootdey.com/img/Content/avatar/avatar7.png",
              vote: false
            },
            {
              key: 4,
              name: "Contestant 4",
              image: "https://bootdey.com/img/Content/avatar/avatar3.png",
              vote: false
            },
            {
              key: 5,
              name: "Contestant 5",
              image: "https://bootdey.com/img/Content/avatar/avatar4.png",
              vote: false
            }
          ]
        },
        {
          title: "Gen Sec",
          data: [
            {
              key: 1,
              name: "Contestant 1",
              image: "https://bootdey.com/img/Content/avatar/avatar3.png",
              vote: false
            },
            {
              key: 2,
              name: "Contestant 2",
              image: "https://bootdey.com/img/Content/avatar/avatar4.png",
              vote: false
            }
          ]
        },
        {
          title: "AGS",
          data: [
            {
              key: 1,
              name: "Contestant 1",
              image: "https://bootdey.com/img/Content/avatar/avatar5.png",
              vote: false
            }
          ]
        },
        {
          title: "PRO",
          data: [
            {
              key: 1,
              name: "Contestant 1",
              image: "https://bootdey.com/img/Content/avatar/avatar2.png",
              vote: false
            }
          ]
        }
      ]
    };
  }
  _onPress = () => {
    this.props.onPressItem(this.props.id);
    console.log(this.props.id);
  };
  onClickListener = viewId => {
    Alert.alert("Alert", "Button pressed " + viewId);
  };

  render() {
    return (
      <View style={styles.container}>
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
                      separators.updateProps("leading", (p.vote = false));
                    });
                    separators.updateProps(
                      "trailing",
                      (item.vote = !item.vote)
                    );
                    this.forceUpdate();
                  }}
                >
                  <View
                    style={item.vote ? styles.container2 : styles.container}
                  >
                    <View style={styles.contentHeader}>
                      <Image
                        style={styles.image}
                        source={{ uri: item.image }}
                      />
                      <View style={styles.content}>
                        <Text style={styles.name}>{item.name}</Text>
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
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  title: {
    fontSize: 25,
    color: "#000000"
  },
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#DCDCDC"
  },
  container2: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgb(38, 154, 241)"
  },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
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
    fontWeight: "bold"
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
  }
});
