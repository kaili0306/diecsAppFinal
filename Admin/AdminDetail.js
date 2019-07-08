import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Adminheader } from '../UI/AdminHeader.js';

import RNFetchBlob from 'react-native-fetch-blob';

let config = require('../config');

var jobColour = '#ff1e2d';
var siteColour = '#ff961e';
var eventColour = '#ffe81e';
var generalColour = '#83ff1e';
var talkColour = '#1effdd';
var extraColour = '#1e29ff';
var competitionColour = '#991eff';


export default class AdminDetail extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      post: null,
      id: this.props.navigation.getParam('id'),
      adminid: this.props.navigation.getParam('admin'),
      documentName:'',
    };

    this.__load = this.__load.bind(this);
    this.__delete = this.__delete.bind(this);
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/read_single.php?id=' + this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ post: responseJson,
          documentName:responseJson.documentName
         });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  __delete() {
    Alert.alert('Confirm Deletion?', '',[
      {
        text: 'No',
        onPress: () => { },
      },
      {
        text: 'Yes',
        onPress: () => {
          let url = config.settings.serverPath + '/php_rest_diecs/api/post/delete.php?id=' + this.state.id;

          fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: this.state.id,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                Alert.alert('Error', response.status.toString());
                throw Error('Error ' + response.status);
              }

              return response.json()
            })
            .then((responseJson) => {
              if (responseJson.affected == 0) {
                Alert.alert('Error deleting record');
              }

              this.props.navigation.getParam('refresh');
              this.props.navigation.goBack();
            })
            .catch((error) => {
              console.error(error);
            });
        },
      },
    ], { cancelable: false });
  }

  categorySwitch(category_name) {
    switch (category_name) {
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

  downloadFile=(url)=>{
    let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob
    .config({
      path : dirs.DownloadDir +'/' +url,
      appendExt : 'pdf',
      fileCache : true
    })
    .fetch('GET', config.settings.serverPath + '/document/' +  url,console.log(url,'from get'))
    // .fetch('GET','')
    .then((res) => {
      // the temp file path
      Alert.alert('The file saved to ', res.path())
      console.log('The file saved to ', res.path())
    })
  }


  render() {
    let item = this.state.post;
    
    return (
      <View style={{ flex: 1}}>
        <Adminheader />
        <ScrollView style={detailStyle.background1}>
          <View style={detailStyle.background2}>
            <View style={{ backgroundColor: this.categorySwitch(item ? item.category_name : ''), borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
              <Text style={{ fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>{item ? item.category_name : ''}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Image style={detailStyle.user} source={require('../Images/userlogo.jpg')} />
              <View style={{ flex: 1, flexDirection: 'column', marginLeft: 10, alignSelf: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item ? item.admin_name : ''}</Text>
                <Text style={{ fontSize: 15 }}>({item ? item.admin_position : ''})</Text>
                <Text style={{ fontSize: 13 }}>{item ? item.admin_department : ''}</Text>
              </View>
            </View>
            <View style={{ borderBottomWidth: 5, borderBottomColor: '#706f6f', marginLeft: 10, marginRight: 10, marginTop: 5 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, padding: 10 }}>{item ? item.title : ''}</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold', marginLeft: 10, padding: 5 }}>Date: {item ? item.date : ''}</Text>
            <Text style={{ fontSize: 15, padding: 10 }}>{item ? item.description : ''}</Text>
            <Image style={{height:200,width:100,padding: 10,alignSelf:'center'}} source={{uri:item ? item.image : ''}}/>
            <TouchableOpacity onPress={()=>this.downloadFile(this.state.documentName)}>
              <Text style={{ fontSize: 15, padding: 10,textDecorationLine:'underline'}}>{item ? item.documentName : ''}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const detailStyle = StyleSheet.create({
  background1: {
    backgroundColor: "#302f2f",
    height: Dimensions.get('window').height,
  },
  background2: {
    backgroundColor: "#c4c4c4",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 15,
  },
  user: {
    width: 90,
    height: 90,
    marginTop: 10,
    marginLeft: 10,
  },
});
