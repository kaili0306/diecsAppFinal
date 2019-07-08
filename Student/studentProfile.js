import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text
} from 'react-native';

import { Studentheader } from '../UI/Studentheader.js';
import { InputWithLabel } from '../UI/InputWithLabel';

let config = require('../config.js');

export default class StudentProfile extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      student: null,
      id:this.props.navigation.getParam('id'),
      name: '',
      department: '',
      image: '',
      course: '',
      gender: '',
      phone: '',
      email: '',
      DOB: '',
    };

    this.__load = this.__load.bind(this);
  }

  componentDidMount() {
    this.__load();
  }

  __load() {

    let url = config.settings.serverPath + '/php_rest_diecs/api/student/read_single.php?id=' + this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ name: responseJson.name,
          department: responseJson.department,
          image: responseJson.image,
          course: responseJson.course,
          gender: responseJson.gender,
          phone: responseJson.phone,
          email: responseJson.email,
          DOB: responseJson.DOB });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  render() {

    let sgender;
    if(this.state.gender===0){
      sgender='Male';
    }else{
      sgender='Female';
    }

    return (
      <View>
        <Studentheader />
        <View style={detailStyle.background1}>
          <View style={detailStyle.background2}>
            <Image style={detailStyle.user} source={require('../Images/userlogo.jpg')} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 10, alignSelf: 'center' }}>{this.state.name}</Text>
            <Text style={{ fontSize: 15, alignSelf: 'center', padding: 10, }}>{this.state.department}</Text>

            <InputWithLabel style={detailStyle.data}
              label={'Student ID '}
              value={this.state.id}
              orientation={'horizontal'}
              editable={false}
            />

            <InputWithLabel style={detailStyle.data}
              label={'Course '}
              value={this.state.course}
              orientation={'horizontal'}
              editable={false}
            />

            <InputWithLabel style={detailStyle.data}
              label={'Gender '}
              value={sgender}
              orientation={'horizontal'}
              editable={false}
            />

            <InputWithLabel style={detailStyle.data}
              label={'Date Of Birth'}
              value={this.state.DOB}
              orientation={'horizontal'}
              editable={false}
            />

            <InputWithLabel style={detailStyle.data}
              label={'H/P Number '}
              value={this.state.phone}
              orientation={'horizontal'}
              editable={false}
            />

            <InputWithLabel style={detailStyle.data}
              label={'Email '}
              value={this.state.email}
              orientation={'horizontal'}
              editable={false}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={detailStyle.floatingAction1}
              onPress={() => this.props.navigation.navigate('StudentEdit', {
                id: this.state.id,
                refresh: this.__load,
                indexRefresh: this.props.navigation.getParam('refresh'),
              })}>
              <Image style={detailStyle.floatingButton} source={require('../Images/pencil2.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const detailStyle = StyleSheet.create({
  background1: {
    backgroundColor: "#302f2f",
    height: 2000,
  },
  background2: {
    backgroundColor: "#c4c4c4",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 550,
    borderRadius: 15,
  },
  user: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: 10,
    alignSelf: 'center',
  },
  floatingAction1: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: '#f7e70c',
  },
  floatingButton: {
    width: 50,
    height: 50,
  },
  data: {
    fontSize: 15,
  },
});
