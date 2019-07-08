import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';

import { Adminheader } from '../UI/AdminHeader.js';

let config = require('../config');

export default class AdminReport extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)

    this.state = {
      post: [],
      id: this.props.navigation.getParam('id'),
      isFetching: true,
      title: this.props.navigation.getParam('title'),
     // count0: 0,
     // count1: 0,
    };

    this.__load = this.__load.bind(this);
  }

  componentDidMount() {
    this.__load();
  }

  __load() {
    console.warn(this.state.id)
    let url = config.settings.serverPath + '/php_rest_diecs/api/participation/read_single.php?id=' + this.state.id;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          alert.alert('Error', response.status.toString());
          throw Error('Error' + response.status);
        }
        return response.json()
      })
      .then((responseJson) => {
        this.setState({ post: responseJson});
        console.warn(responseJson)
        this.setState({ isFetching: false });
      })
      .catch((error) => {
        console.log(error)
      });
  }

  // counter0(item) {

  //   if (item == 0) {
  //     this.setState({ count0: this.state.count0 + 1 });
  //   }
  // }

  // counter1(item) {
  //   console.log(item+" from 1")
  //   if (item == 1) {
  //     this.setState({ count1: this.state.count1 + 1 });
  //   }
  // }

  renderJoiningRecord(item) {
   // this.counter0(item.status);
    if (item.status == 0) {
      return (
        <Row data={[item.sId, item.studentName, item.createdAt]} textStyle={reportStyle.text} />

      );

    }
  }

  rendernotRecord(item) {
   // this.counter1(item.status);
    if (item.status == 1) {
      return (
        <Row data={[item.sId, item.studentName, item.createdAt]} textStyle={reportStyle.text} />
      );
    }
  }

  render() {
    if (this.state.isFetching) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View>
        <Adminheader />
        <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <Image style={reportStyle.goback} source={require('../Images/back.png')} />
          </TouchableWithoutFeedback>
          <Text style={{ padding: 10, fontSize: 23, fontWeight: 'bold' }}>{this.state.title}</Text>
        </View>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>List of student participation</Text>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Joining</Text>
        <Table>
          <Row data={['Student ID', 'Student Name', 'Created date']} style={reportStyle.head} textStyle={reportStyle.text} />
          <FlatList
            data={this.state.post}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => this.renderJoiningRecord(item)}
            keyExtractor={(item) => { item.id.toString() }}
          />
        </Table>
        <Text style={{ padding: 10, fontSize: 20, fontWeight: 'bold' }}>Not joining</Text>
        <Table>
          <Row data={['Student ID', 'Student Name', 'Created date']} style={reportStyle.head} textStyle={reportStyle.text} />
          <FlatList
            data={this.state.post}
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => this.rendernotRecord(item)}
            keyExtractor={(item) => { item.id.toString() }}
          />
        </Table>
{/* 
        <Text style={{ padding: 10, fontSize: 15, fontWeight: 'bold' }}> Number of students joining: {this.state.count0}</Text>
        <Text style={{ padding: 10, fontSize: 15, fontWeight: 'bold' }}> Number of students  not joining: {this.state.count1}</Text> */}

      </ScrollView>
      </View>
    );
  }
}

const reportStyle = StyleSheet.create({
  goback: {
    width: 50,
    height: 50,
  },
  background2: {
    backgroundColor: "#c4c4c4",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    height: 550,
    borderRadius: 15,
  },
  user: {
    width: 90,
    height: 90,
    marginTop: 10,
    marginLeft: 10,
  },
  category: {
    backgroundColor: "#ea0b30",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  floatingButton: {
    width: 50,
    height: 50,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
