import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';

import { Floatinglabel } from './UI/Floatinglabel.js';


let config = require('./config');

export default class LoginScreen extends Component {

  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      password: '',
    };
  }

  componentDidMount(){
    this._readSetting();
  }



  async _saveSetting(id){
    try {
      await AsyncStorage.setItem('studentid',id);
      
    }catch(error){
      console.log('ERROR SAVING ITEM: ',error);
    }
  }

  async _readSetting(){
    try{
      let id = await AsyncStorage.getItem('studentid');
      if(id !== null){
        this.props.navigation.navigate('studentDrawer',{id:id});
      }
    }catch(error){
      console.log('ERROR READING ITEM: ',error);
    }
  }

  login = () => {
    const { id, password } = this.state;
    if (id == "") {
      alert("Please enter Student ID.");
    }
    else if (password == "") {
      alert("Please enter password.");
    }
    else {
      fetch(config.settings.serverPath + '/php_rest_diecs/login/loginStudent.php', {
        method: 'post',
        header: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          password: password
        })

      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson == "ok") {
            this._saveSetting(this.state.id);
            this.props.navigation.navigate('studentDrawer', { id:id });
          } else {
            alert(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    Keyboard.dismiss();
  }

  render() {
    return (
      <KeyboardAvoidingView >
        <ImageBackground style={imageStyle.utarImage} source={require('./Images/utar1.jpg')}>
        <View style={{ flex: 1,justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.4)' }}>
            <Image style={imageStyle.logo} source={require('./Images/logon.jpg')} />
            <Text style={imageStyle.logoText}>Department of Internet Engineering</Text>
            <Text style={imageStyle.logoText}> and Computer Science</Text>
            
            <View style={imageStyle.loginContainer}>
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={imageStyle.tabStyle} value="student" onPress={() => this.props.navigation.navigate('StudentLogin')}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>STUDENT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={imageStyle.tabStyle1} value="admin" onPress={() => this.props.navigation.navigate('AdminLogin')}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>STAFF</Text>
                </TouchableOpacity>
            </View>
                <Floatinglabel
                  label="STUDENT ID"
                  value={this.state.id}
                  onChangeText={(id) => this.setState({ id })}
                  keyboardType={"numeric"}
                />
                <Floatinglabel
                  label="PASSWORD"
                  value={this.state.password}
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry={true}
                />
                <TouchableOpacity style={imageStyle.buttonStyle} onPress={this.login}>
                  <Text style={imageStyle.buttonText}>
                    SIGN IN
                  </Text>
                </TouchableOpacity>
              </View>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const imageStyle = StyleSheet.create({
  utarImage: {
    width: "auto",
    height: 660,
  },
  logo: {
    alignSelf: 'center',
    height: 100,
    width: 200,
  },
  logoText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    top: 10,
  },
  tabStyle: {
    backgroundColor: '#afceff',
    width: 100,
    height: 30,
  },
  tabStyle1: {
    backgroundColor: '#d2d7dd',
    width: 100,
    height: 30,
  },
  loginContainer: {
    backgroundColor: 'white',
    height: 250,
    width: 350,
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonStyle: {
    height: 50,
    width: 350,
    backgroundColor: '#043a91',
    position: 'absolute',
    bottom: 0,
  },
  buttonText: {
    top: 10,
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
