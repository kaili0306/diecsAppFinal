import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import {Adminheader} from '../UI/AdminHeader.js';

let config = require('../config');
var jobColour='#ff1e2d';
var siteColour='#ff961e';
var eventColour='#ffe81e';
var generalColour='#83ff1e';
var talkColour='#1effdd';
var extraColour='#1e29ff';
var competitionColour='#991eff';

export default class AdminHistory extends Component{

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      isFetching: true,
      id: this.props.navigation.getParam('id'),
    };

    this.__load = this.__load.bind(this);
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/read_admin.php?id='+this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((posts) => {
        this.setState({ posts: posts.data });
        this.setState({ isFetching: false });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  categorySwitch(category_name){
    switch(category_name){
      case 'Job opportunity':
        return jobColour;
        case 'Site Visit':
        return siteColour;
        case 'Event Week':
        return eventColour;
        case 'General Information':
        return generalColour;
        case 'Talk':
        return talkColour;
        case 'Extra curricular':
        return extraColour;
        case 'Competition/Contest':
        return competitionColour;
      }
  }

  colorSwitch(category_name){
    switch(category_name){
      case 'Job opportunity':
        return 'white';
        case 'Site Visit':
        return 'black';
        case 'Event Week':
        return 'black';
        case 'General Information':
        return 'black';
        case 'Talk':
        return 'black';
        case 'Extra curricular':
        return 'white';
        case 'Competition/Contest':
        return 'white';
    }
  }

    render(){
      if (this.state.isFetching) {
        return (
          <View>
            <ActivityIndicator />
          </View>
        )
      }
        return(
          <View style={{flex:1}}>
              <Adminheader/>
              <ScrollView>
                <Text style={{padding:10,fontSize:20,fontWeight:'bold'}}>HISTORY</Text>
                <View style={historyStyle.individual}>              
                <FlatList
              data={this.state.posts}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this.__load}
              renderItem={({ item }) =>
              <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('AdminUpdate', {
                  id: item.id, 
                  admin:this.state.id,
                  refresh: this.__load,
                })
              }}>
                  <View style={historyStyle.individual} >
                    <View style={{backgroundColor:this.categorySwitch(item.category_name)}}>
                      <Text style={{ color:this.colorSwitch(item.category_name),fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>
                        {item.category_name}
                      </Text>
                    </View>

                      <Text style={{fontSize:15}}>created on {item.created_at}</Text>
                   
                      <Text style={{fontSize:18,fontWeight:'bold',padding:15,marginBottom:10}}>{item.title}</Text>

                    <TouchableOpacity
                    style={historyStyle.viewButton}
                      onPress={() => {
                        this.props.navigation.navigate('AdminReport', {
                          id: item.id, refresh: this._load,
                          title:item.title
                        })
                      }}>
                      <Text style={{fontSize:15,color:'white',alignSelf:'center'}}>
                      View Report
                      </Text>
                    </TouchableOpacity>
                  </View>
                  </TouchableWithoutFeedback>
              }
              keyExtractor={(item) => { item.id.toString() }}
            />
             </View>
            </ScrollView>
          </View>
        );
    }
}

const historyStyle = StyleSheet.create({
  individual:{
    backgroundColor:"white",
    borderBottomColor:"black",
    borderBottomWidth:1,
  },
  report:{
    fontSize:15,
    color:'#0978ef',
    position:'absolute',
    bottom:5,
    right:10,
  },
  viewButton:{
    backgroundColor:"#0061ff",
    position:'absolute',
    right:1,
    bottom:5,
    height:20,
    width:100
  },
});
