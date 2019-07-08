import React, {Component} from 'react';
import {StyleSheet,
        Text,
        View,
        Image,
      } from 'react-native';

export class Adminheader extends Component {

  render() {
    return (
      <View style={headerStyle.headerBackground}>
          <View style={headerStyle.header}>
            <Image source={require('../Images/logon.jpg')} style={headerStyle.logo} />
            <Text style={{marginLeft:20 ,fontSize: 20, fontWeight: 'bold', color: 'white' }}>UTAR DIECS</Text>
          </View>
        </View>
    );
  }
}

const headerStyle= StyleSheet.create({
  headerBackground: {
    backgroundColor: 'orange',
    width: 'auto',
    height: 80,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  images: {
    width: 55,
    height: 55,
  },
});

export default Adminheader;
