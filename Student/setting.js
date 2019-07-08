import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
} from 'react-native';

import {Studentheader} from '../UI/Studentheader.js';
//import {Switch} from '../UI/toggleSwitch.js';

export default class Setting extends Component{
    constructor(props) {
      super(props);
      this.state = { switchValue: false }
    }
    toggleSwitch = (value) => {
      this.setState({switchValue: value})
   }
    render(){
        return(
          <View style={{flex:1}}>
              <Studentheader/>
                  <Text style={{fontSize:30,fontWeight: 'bold',padding:20}}>Setting</Text>
                  <View style={{borderBottomColor:'grey',borderBottomWidth: 2,margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={{fontSize:20}}>Turn On Notification</Text>
                    <Switch
                    onValueChange={(value) => this.toggleSwitch(value)}
                    style={{marginBottom: 10,marginLeft:10}}
                    value={this.state.switchValue} />
                  </View>
          </View>
        );
    }
}

const detailStyle = StyleSheet.create({


  user:{
    width:100,
    height:100,
    marginTop:10,
    marginLeft:10,
    alignSelf:'center',
  },
  table:{
    flex:1,
    flexDirection:'row',
  },
  floatingAction1:{
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius:50,
    backgroundColor: '#f7e70c',
  },
  floatingButton:{
    width: 50,
    height: 50,
  },
});
