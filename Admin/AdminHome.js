import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { Adminheader } from '../UI/AdminHeader.js';

let config = require('../config');
var jobColour='#ff1e2d';
var siteColour='#ff961e';
var eventColour='#ffe81e';
var generalColour='#83ff1e';
var talkColour='#1effdd';
var extraColour='#1e29ff';
var competitionColour='#991eff';

export default class AdminHome extends Component {

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
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/read.php';
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
        <Adminheader />
        
        <View style={homeStyle.background}>
        <Text style={homeStyle.text}>Slide left to access menu</Text>
        <FlatList
              data={this.state.posts}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this.__load}
              renderItem={({ item }) =>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('AdminDetail', {
                      id: item.id, 
                      admin:this.state.id,
                    })
                  }}>
                  <View style={homeStyle.individual} >
                    <View style={{backgroundColor:this.categorySwitch(item.category_name)}}>
                      <Text style={{ color:this.colorSwitch(item.category_name),fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>
                        {item.category_name}
                      </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image style={homeStyle.user} source={{uri:item.admin_image}} />
                      <View style={{ flexDirection: 'column', marginLeft: 10, alignSelf: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.admin_name}</Text>
                        <Text style={{ fontSize: 15 }}>({item.admin_position})</Text>
                      </View>
                    </View>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>{item.title}</Text>

                  </View>
                </TouchableWithoutFeedback>
              }
              keyExtractor={(item) => { item.id.toString() }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={homeStyle.floatingaction}
              onPress={()=>{this.props.navigation.navigate('AdminCreate',{id:this.state.id,refresh:()=> this.__load},console.log('refreshed'))}}
            >
              <Image style={homeStyle.floatingbutton} source={require('../Images/add.png')}/>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}
}

const homeStyle = StyleSheet.create({
  background: {
    backgroundColor: "black",
    height: 600
  },
  individual: {
    backgroundColor: "white",
    marginTop: 10,
  },
  user: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  top: {
    flex: 1,
    flexDirection: "row",
  },
  floatingaction:{
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 50,
    backgroundColor: '#8c041f',
  },
  floatingbutton:{
    width: 50,
    height: 50,
  },
  text: {
    color: 'white',
    textAlign: "right",
  },
});
