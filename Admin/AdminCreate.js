import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

import DatePicker from 'react-native-datepicker'

import RNFetchBlob from 'react-native-fetch-blob';

import { Adminheader } from '../UI/AdminHeader.js';
import MultiLineText from '../UI/MultiLineText.js';
import InputWithLabel from '../UI/InputWithLabel';

let config = require('../config');

import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';

export default class AdminCreate extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      category_id: 1,
      image: '',
      imageName: '',
      date: this.ShowCurrentDate(),
      document: '',
      documentName: '',
      categories: [],
      admin_id: '',
      studentgroups: [],
      sgId:1,
      documentSelected:false,
      imageSelected:false,
      data:''
    };

    this.__load = this.__load.bind(this);
    this.__loadgroup = this.__loadgroup.bind(this);
    this.__create = this.__create.bind(this);
  }

  componentDidMount() {
    this._readSetting();
    this.__load();
    this.__loadgroup();
  }

  componentWillUnmount() {
    this.props.navigation.state.params.refresh()
  }

  async _readSetting(){
    try{
      let id = await AsyncStorage.getItem('adminid');
      if(id !== null){
        this.setState({admin_id:id});
      }
    }catch(error){
      console.log('ERROR READING ITEM: ',error);
    }
  }

  __load() {

    let url = config.settings.serverPath + '/php_rest_diecs/api/category/read.php';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((categories) => {
        this.setState({ categories: categories.data });
        this.setState({ isFetching: false });
      })
      .catch((error) => {
        console.log(error)
      });

  }

  __loadgroup() {

    let url = config.settings.serverPath + '/php_rest_diecs/api/studentgroup/read.php';
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((studentgroups) => {
        this.setState({ studentgroups: studentgroups.data });
        this.setState({ isFetching: false });
      })
      .catch((error) => {
        console.log(error)
      });

  }

  ShowCurrentDate=()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();

    return(year + '-' + month + '-' + date+ ' ' + hour+ ':' + minutes);

   }
  

  __create() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/create.php';

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        category_id: this.state.category_id,
        image: this.state.image,
        imageName: this.state.imageName,
        date: this.state.date,
        document: this.state.document,
        documentName: this.state.documentName,
        admin_id: this.state.admin_id,
        sgId: this.state.sgId,
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
          Alert.alert('Record Saved');
        this.props.navigation.getParam('refresh');
        this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleChange() {
    //Opening Document Picker
  
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.pdf()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
        
      },
      (error, res) => {
        if(res!=null){
        this.setState({ document: res.uri });
        this.setState({ documentName: res.fileName,
        data:res,
      });
        this.setState({ documentSelected: true });
        console.log(res,'responseABC')
        
      }
      }
    );
  }

  uploadDocument=()=>{
    let url=config.settings.serverPath + '/uploadDoc.php';
    RNFetchBlob.fetch('POST', url, {
    'Content-Type' : 'multipart/form-data',
    // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
    // Or simply wrap the file path with RNFetchBlob.wrap().
  }, [{name:'document', filename:this.state.documentName,data:RNFetchBlob.base64.encode(this.state.data)}])
  .then((res) => {
    console.log(res)
  })
  
  }

  handleChangeImage() {
    //Opening Document Picker
    DocumentPicker.show(
      {
        filetype: [DocumentPickerUtil.images()],
        //All type of Files DocumentPickerUtil.allFiles()
        //Only PDF DocumentPickerUtil.pdf()
        //Audio DocumentPickerUtil.audio()
        //Plain Text DocumentPickerUtil.plainText()
      },
      (error, res) => {
        if(res!=null){
        this.setState({ image: res.uri });
        this.setState({ imageName: res.fileName });
        this.setState({ imageSelected: true });
      }
    }
    );
  }

  displayBeforeDocument=()=>{
    return(
      <Text style={{ padding: 10, fontSize: 10 }}>Please attach your document here</Text>
    );
  }
  displayAfterDocument=()=>{
    return(
      <Text style={{ padding: 10, fontSize: 10 }}>{this.state.documentName}</Text>
    );
  }

  displayBeforeImage=()=>{
    return(
      <Text style={{ padding: 10, fontSize: 10 }}>Please attach your Image here</Text>
    );
  }

  displayAfterImage=()=>{
    return(
      <Text style={{ padding: 10, fontSize: 10 }}>{this.state.imageName}</Text>
    );
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <Adminheader />
        <ScrollView >
          <Text style={{ padding: 10, fontSize: 22, fontWeight: 'bold' }}>Create</Text>
          <Text style={{ padding: 10, fontSize: 15, fontWeight: 'bold' , color: 'red' }}>* required field</Text>
          <InputWithLabel 
              label={'Title *'}
              orientation={'horizontal'}
              editable={true}
              onChangeText={(title) => this.setState({ title })}
            />
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Category</Text>
            <Picker
              selectedValue={this.state.category_id}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue) =>
                this.setState({ category_id: itemValue })}>

              { this.state.categories.map((item)=>(
                  <Picker.Item label={item.name} value={item.id} />)
              )}

            </Picker>
          </View>
          
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Date</Text>
            <DatePicker
            style={{width: 200,marginLeft:10}}
            date={this.state.date}
            mode="datetime"
            format="YYYY-MM-DD HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={(date) => {this.setState({date: date});}}
          />
          </View>

          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Description *</Text>
          <MultiLineText multiline={true} numberofLines={10} onChangeText={(description) => this.setState({ description })} value={this.state.description} />
          
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Student Group *</Text>
            <Picker
              selectedValue={this.state.sgId}
              style={{ height: 50, width: 200 }}
              onValueChange={(itemValue) =>
                this.setState({ sgId: itemValue })}>

              { this.state.studentgroups.map((item)=>(
                  <Picker.Item label={item.description} value={item.id} />)
              )}

            </Picker>
          </View>
          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Image</Text>
          <View style={{ flexDirection: 'row'}}>
            <Button title='Upload' onPress={this.handleChangeImage.bind(this)}/>
            {this.state.imageSelected===true?this.displayAfterImage():this.displayBeforeImage()}
          </View>

          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Document</Text>
          <View style={{ flexDirection: 'row'}}>
            <Button title='Upload' onPress={this.handleChange.bind(this)}/>
            {this.state.documentSelected===true?this.displayAfterDocument():this.displayBeforeDocument()}
          </View>
          <View style={{flexDirection: 'row',marginTop:20}}>
              <TouchableOpacity
                style={createStyle.floatingAction1}
                onPress={()=>{this.props.navigation.goBack()}}>
                <Text style={createStyle.selectionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{this.__create();this.uploadDocument();} }
                style={createStyle.floatingAction2}>
                <Text style={createStyle.selectionText}>Create</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const createStyle = StyleSheet.create({
  floatingAction1: {
    height: 40,
    width:Dimensions.get('window').width/2,
    backgroundColor: '#ff1616',
   
  },
  floatingAction2: {
    height: 40,
    width:Dimensions.get('window').width/2,
    backgroundColor: '#1dff16',
    
  },
  selectionText: {
    color:'white',
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:20

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
