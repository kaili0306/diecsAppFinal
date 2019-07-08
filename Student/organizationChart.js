import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { Studentheader } from '../UI/Studentheader.js';

let config = require('../config.js');

export default class OrganizationChart extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      admins: [],
      isFetching: true,
    };

    this.__load = this.__load.bind(this);
  }

  componentDidMount() {
    this.__load();

  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/admin/read.php';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ admins: responseJson.data });
        this.setState({ isFetching: false });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  positionSwitch(number){
    switch(number){
      case '1':
        return "#f20707";
        case '2':
        return "#f19006";
        case '3':
        return '#efeb09';
        case '4':
        return "#fffd9b";
    }
  }

  render() {
    if (this.state.isFetching) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1}}>
          <Studentheader />
            <Text style={{ fontSize: 25, fontWeight: 'bold', padding: 20 }}>Organization member</Text>
            <Text style={{ fontSize: 10, fontWeight: 'bold', padding: 5 }}> **Darker colour illustrates higher administrative position</Text>
            <FlatList
              data={this.state.admins}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this.__load}
              renderItem={({ item }) =>
              <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AdminProfile',{
                  id: item.id,refresh: this._load,
                })}>
                  <View style={{backgroundColor: this.positionSwitch(item.number),alignItems: 'center',width: 140,height: 140,justifyContent: 'center',padding: 10,}}>
                    <Image style={organizationStyle.user} source={require('../Images/userlogo.jpg')} />
                    <Text style={{ fontSize: 15, fontWeight: 'bold',alignSelf: 'center', marginTop: 5 }}>{item.name}</Text>
                    <Text style={{ fontSize: 10, alignSelf: 'center'}}>{item.depPosition}</Text>
                  </View>
                </TouchableOpacity>
              </View>
          }
          keyExtractor={(item) => { item.id.toString() }}
          numColumns={2}
        />
        
          
        </View>
      );
    }
  }
}

  const organizationStyle = StyleSheet.create({
    background: {
      backgroundColor: "#393b3f",
      height: 2000,
    },
    user: {
      width: 50,
      height: 50,

    },
  }
  );
