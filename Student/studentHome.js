import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import { Studentheader } from '../UI/Studentheader.js';


let config = require('../config.js');
var jobColour='#ff1e2d';
var siteColour='#ff961e';
var eventColour='#ffe81e';
var generalColour='#83ff1e';
var talkColour='#1effdd';
var extraColour='#1e29ff';
var competitionColour='#991eff';

export default class StudentHome extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      isFetching: true,
      id: '',
      student:null,
      groupid:'',
    };

    this.__loadStudent = this.__loadStudent.bind(this);
    this.__load = this.__load.bind(this);
    
  }

  componentDidMount() {
    this._readSetting();
    //this.__load();
    
  }

  async _readSetting(){
    try{
      let id = await AsyncStorage.getItem('studentid');
      if(id !== null){
        this.setState({id:id});
        this.__loadStudent();
        console.log('from async ',this.state.id) 
      }
    }catch(error){
      console.log('ERROR READING ITEM: ',error);
    }
  }
  __loadStudent() {
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
        this.setState({ groupid: responseJson.groupid },this.__load); 
      })
      .catch((error) => {
        console.log(error)
      });
  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/read_group.php?id='+this.state.groupid;
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
          <ActivityIndicator size="large"/>
        </View>
      )
    } else {
      return (
        <View style={{ flex: 1}}>
          <Studentheader/>
          <ScrollView style={homeStyle.background}>
          <Text style={homeStyle.text}>Slide left to access menu</Text>
            <FlatList
              data={this.state.posts}
              showsVerticalScrollIndicator={true}
              refreshing={this.state.isFetching}
              onRefresh={this.__load}
              renderItem={({ item }) =>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('StudentDetail', {
                      id: item.id,
                      sid:this.state.id,
                      refresh: this._load,
                    })
                  }}>
                  <View style={homeStyle.individual} >
                    <View style={{backgroundColor:this.categorySwitch(item.category_name)}}>
                      <Text style={{ color:this.colorSwitch(item.category_name),fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>
                        {item.category_name}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Image style={homeStyle.user} source={require('../Images/userlogo.jpg')} />
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
          </ScrollView>

        </View>

      );
    }
  }
}

const homeStyle = StyleSheet.create({
  background: {
    backgroundColor: "#5b5b5b",
    height: 2000,
  },
  individual: {
    backgroundColor: "#eaeaea",
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
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
  text: {
    color: 'white',
    textAlign: "right",
  },
});
