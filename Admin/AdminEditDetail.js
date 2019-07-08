import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
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

export default class AdminEdit extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {

    super(props);

    this.state = {
      id: this.props.navigation.getParam('id'),
      title: '',
      description: '',
      category_id: 0,
      image: '',
      imageName: '',
      date: '',
      document: '',
      documentName: '',
      categories: [],
      admin_id: '',
      studentgroups: [],
      sgId:'',
      documentSelected:false,
      imageSelected:false,
      data:'',
    };

    this._load = this._load.bind(this);
    this.__loadcategory = this.__loadcategory.bind(this);
    this.__loadgroup = this.__loadgroup.bind(this);
    this._update = this._update.bind(this);

  }

  componentDidMount() {
    this._readSetting();
    this._load();
    this.__loadcategory();
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


  _load() {
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/read_single.php?id=' + this.state.id;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }

        return response.json()
      })
      .then((post) => {
        this.setState({
          title: post.title,
          description: post.description,
          category_id: post.category_id,
          image: post.image,
          imageName: post.imageName,
          date: post.date,
          document: post.document,
          documentName: post.documentName,
          admin_id: post.admin_id,
          sgId: post.sgId,
          
          
        });
        if(post.imageName==null||post.imageName==''){
          this.setState({imageSelected: false});
        }else if(post.documentName==null||post.documentName==''){
          this.setState({imageSelected: false});
        }else{
          this.setState({imageSelected: true,documentSelected: true});
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  __loadcategory() {

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

  _update() {
    console.log('update pressed')
    let url = config.settings.serverPath + '/php_rest_diecs/api/post/update.php?id=' + this.state.id;

    fetch(url, {
      method: 'PUT',
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

        return response.json()
      })
      .then(() => {
       
          Alert.alert('Record Updated', 'Record for `' + this.state.title + '` has been updated');
        
        this.props.navigation.getParam('refresh');
        this.props.navigation.getParam('indexRefresh');
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
        this.setState({ document: res.uri,
          documentName: res.fileName,
          documentSelected: true ,
          data:res
        });
        
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
      <View>
        <Adminheader />
        <ScrollView>
          <Text style={{ padding: 10, fontSize: 22, fontWeight: 'bold' }}>Update</Text>
          <Text style={{ padding: 10, fontSize: 15, fontWeight: 'bold', color: 'red' }}>* required field</Text>
          <InputWithLabel 
              label={'Title *'}
              orientation={'horizontal'}
              editable={true}
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
           <View style={{ flexDirection: 'row'}}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Category</Text>
            <Picker
              selectedValue={this.state.category_id}
              value={this.state.category_id}
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
            value={this.state.date}
            onDateChange={(date) => {this.setState({date: date});}}
          />
          </View>

          <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Description *</Text>
          <MultiLineText multiline={true} numberofLines={4} onChangeText={(description) => this.setState({ description })} value={this.state.description} />
          
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Student Group *</Text>
            <Picker
              selectedValue={this.state.sgId}
              value={this.state.sgId}
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
                style={updateStyle.floatingAction1}
                onPress={()=>{this.props.navigation.goBack()}}>
                <Text style={updateStyle.selectionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={ ()=>{this._update();this.uploadDocument();}} 
                style={updateStyle.floatingAction2}>
                <Text style={updateStyle.selectionText}>update</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const updateStyle = StyleSheet.create({
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
