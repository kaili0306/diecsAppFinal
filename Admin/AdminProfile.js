import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

import InputWithLabel from '../UI/InputWithLabel';

import {Adminheader} from '../UI/AdminHeader';

let config = require('../config.js');

export default class AdminProfile extends Component{

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      admin: null,
      id: this.props.navigation.getParam('id'),

    };

    this.__load = this.__load.bind(this);
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/admin/read_single.php?id=' + this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ admin: responseJson });
      })
      .catch((error) => {
        console.log(error)
      });
  }

    render(){
      let item = this.state.admin;
        return(
          <View style={{flex:1}}>
              <Adminheader/>
              <ScrollView>
                <Image style={profileStyle.user} source={require('../Images/userlogo.jpg')}/>
                
                <InputWithLabel style={profileStyle.data}
              label={'Name '}
              value={item ? item.name : ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Faculty'}
              value={item ? item.faculty : ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Department'}
              value={item ? item.department : ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Designation'}
              value={item ? item.designation : ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Administrative Position'}
              value={item ? item.position: ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={' Departmental Administrative Position'}
              value={item ? item.depPosition: ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Telephone number'}
              value={item ? item.phone: ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Email Address'}
              value={item ? item.email : ''}
              orientation={'horizontal'}
              editable={false}
            />
            <InputWithLabel style={profileStyle.data}
              label={'Qualifications'}
              value={item ? item.qualification : ''}
              orientation={'horizontal'}
              editable={false}
              multiline={true}
            />
              </ScrollView>
          </View>
        );
    }
}

const profileStyle = StyleSheet.create({
  user:{
    width:100,
    height:100,
    marginTop:10,
    marginLeft:10,
    alignSelf:'center',
  },
  label:{
    padding:10,
    fontWeight:'bold',
    fontSize:18,
  },
  data: {
    fontSize: 15,
  },
});
