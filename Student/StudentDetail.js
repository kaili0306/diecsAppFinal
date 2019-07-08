import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';

import { Studentheader } from '../UI/Studentheader.js';

import RNFetchBlob from 'react-native-fetch-blob';

let config = require('../config.js');

var jobColour = '#ff1e2d';
var siteColour = '#ff961e';
var eventColour = '#ffe81e';
var generalColour = '#83ff1e';
var talkColour = '#1effdd';
var extraColour = '#1e29ff';
var competitionColour = '#991eff';

export default class StudentDetail extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      post: null,
      id: this.props.navigation.getParam('id'),
      status:0,
      sid: this.props.navigation.getParam('sid'),
      isResponded:false,
      documentName:'',
    };
    
    this.__load = this.__load.bind(this);
    this.__loadStatus = this.__loadStatus.bind(this);
  }

  componentDidMount() {
    this.__load();
    this.__loadStatus();
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
          documentName:responseJson.documentName });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  __loadStatus() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/participation/read_status.php?id='+this.state.id+'&sid='+this.state.sid;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        console.log('data',responseJson);
        if(responseJson.message){
          this.setState({isResponded:false})
        }else{
          this.setState({isResponded:true})
        }

      })
      .catch((error) => {
        console.log(error)
      });
  }

  redirect(){
    let url = config.settings.serverPath + '/php_rest_diecs/api/participation/create.php';

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sId: this.state.sid,
        pId: this.state.id,
        status: this.state.status,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.text()
      })
      .then(() => {
        Alert.alert("you have responded to this","",[
               {
                 text: 'Yes',onPress: () => this.props.navigation.goBack()
               }
             ]);
       
        this.props.navigation.getParam('refresh');
        
      })
      .catch((error) => {
        console.error(error);
      });
  }

  categorySwitch(category_name) {
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


  displaybutton=()=>{
    return(
      <View style={detailStyle.selection}>
      <TouchableOpacity 
      style={detailStyle.floatingAction2} onPress={() => { this.setState({status:1},this.redirect);this.props.navigation.goBack();}}>
        <Text style={detailStyle.selectionText}>
          Not Joining
          </Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={detailStyle.floatingAction1} onPress={() => {this.setState({status:0},this.redirect)}}>
        <Text style={detailStyle.selectionText}> 
          Joining
          </Text>
      </TouchableOpacity>
    </View>
    );
  }

  displayRespond=()=>{
    return(
      <View>
        <Text style={{color:'white',alignSelf:'center',fontSize:20}}>
          You have responded
        </Text>
      </View>
    );
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
      <View style={{flex:1}}>
        <Studentheader />
        <ScrollView style={detailStyle.background1}>
          <View style={detailStyle.background2}>
            <View style={{ backgroundColor: this.categorySwitch(item ? item.category_name : ''), borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
              <Text style={{ color: this.colorSwitch(item ? item.category_name : ''),fontSize: 17, fontWeight: 'bold', alignSelf: 'center' }}>{item ? item.category_name : ''}</Text>
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
          {this.state.isResponded===false?this.displaybutton():this.displayRespond()}
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
    backgroundColor: "white",
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
  selection: {
    flex:1,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:10
    //position:'absolute',
    //bottom:0,
    //justifyContent:'flex-end',
  },
  floatingAction1: {
    height: 40,
    width:Dimensions.get('window').width/2,
    backgroundColor: '#2cd602',
   
  },
  floatingAction2: {
    height: 40,
    width:Dimensions.get('window').width/2,
    backgroundColor: '#f7160e',
    
  },
  selectionText: {
    color:'white',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:20

  },
});
