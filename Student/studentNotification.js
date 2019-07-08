import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {Studentheader} from '../UI/Studentheader.js';

export default class StudentNotification extends Component{

  static navigationOptions = {
    header :null,
  }

  constructor(props) {
    super(props)

    this.state = {
      student: null,
      id: this.props.navigation.getParam('id'),

    };
   
  }
    render(){
      
        return(
          <View style={{flex:1}}>
              <Studentheader/>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('StudentDetail')}}>
                <View style={notiStyle.individual}>
                    <View style={{flexDirection:'row'}}>
                      <Image style={notiStyle.user} source={require('../Images/userlogo.jpg')}/>
                      <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center',marginLeft:10}}>Dr. ABC</Text>
                      <Text style={{fontSize:18,marginLeft:10,alignSelf:'center'}}>has an update</Text>
                    </View>

                    <Text style={{fontSize:18,fontWeight:'bold'}}>Data Warehousing Talk</Text>
                    <Text style={{fontSize:15,position:'absolute',bottom:5,right:10}}>(Updated 10 mins ago)</Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('StudentDetail')}}>
                <View style={notiStyle.individual}>
                    <View style={{flexDirection:'row'}}>
                      <Image style={notiStyle.user} source={require('../Images/userlogo.jpg')}/>
                      <Text style={{fontSize:25,fontWeight:'bold',alignSelf:'center',marginLeft:10}}>Dr. ABC</Text>
                      <Text style={{fontSize:18,marginLeft:10,alignSelf:'center'}}>has an update</Text>
                    </View>

                    <Text style={{fontSize:18,fontWeight:'bold'}}>Data Warehousing Talk</Text>
                    <Text style={{fontSize:15,position:'absolute',bottom:5,right:10}}>(Updated 10 mins ago)</Text>
                </View>
                </TouchableOpacity>
              
          </View>
        );
    }
}

const notiStyle = StyleSheet.create({
  individual:{
    backgroundColor:"#e5e5e3",
    borderBottomColor:"black",
    borderBottomWidth:1,
  },
  user:{
    width:50,
    height:50,
    marginTop:10,
    marginLeft:10,
  },
  category:{
    backgroundColor:"#ea0b30",
  },
});
