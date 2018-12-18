import React from 'react'
import { Text, View,TouchableHighlight,Alert, StyleSheet } from 'react-native';
import t from 'tcomb-form-native'
import ImageFactory from 'react-native-image-picker-form'
 
let Form = t.form.Form
const DocumentFormStruct = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,               // a required number
  // rememberMe: t.Boolean  ,
  image: t.String,
})
 
type Props = {}
type State = {
  value: Object,
  options: Object
}
 
export default class EntryForm extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      value: {},
      options: {
        fields: {
          image: {
            config: {
              title: 'Select image',
              options: ['Open camera', 'Select from gallery', 'Cancel'],
              // Used on Android to style BottomSheet
              style: {
                titleFontFamily: 'Roboto'
              }
            },
            error: 'No image provided',
            factory: ImageFactory
          }
        }
      }
    }
  }
 
  getInitialState() {
    return {
      value: {
        name: 'Giulio',
        surname: 'Canti'
      }
    };
  }
  onChange(value) {
    this.setState({value});
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      Alert.alert(value)
      console.log(value);
    }
  }

  render() {
    return (
      <View style={styles.container}>
      <Form
        ref={(ref: any) => {
          this.form = ref
        }}
        type={DocumentFormStruct}
        value={this.state.value}
        options={this.state.options}
      />
      <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableHighlight>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});