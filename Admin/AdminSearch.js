import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';


let config = require('../config');

export default class AdminSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            keyword: '',
            sid: this.props.navigation.getParam('id'),
        };
        this.renderRow = this.renderRow.bind(this);
    }

    loadPost() {
        let url = config.settings.serverPath + '/php_rest_diecs/api/Search/search.php?keyword='+this.state.keyword;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    alert.alert('Error', response.status.toString());
                    throw Error('Error' + response.status);
                }
                return response.json()
            })
            .then((responseJson) => {
                this.setState({ data: responseJson.data });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    onTextChange(keyword) {
        if (keyword) {
            this.setState({
                keyword
            }, function () {
                this.loadPost()
            });
        }
    }
    renderRow(item) {
        if (item) {
            return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.navigate('AdminDetail', {
                      id: item.id, 
                      admin:this.state.id,
                      refresh: this._load,
                    })
                  }}>
                            <View style={SearchStyle.individual} >
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Image style={SearchStyle.user} source={require('../Images/userlogo.jpg')} />
                                    <View style={{ flexDirection: 'column', marginLeft: 10, alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.admin_name}</Text>
                                        <Text style={{ fontSize: 15 }}>({item.admin_position})</Text>
                                    </View>
                                </View>

                                <Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>{item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
            )

        }else{
            return(
                <Text>No result found</Text>
            );
        }

    }


    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "black",
                }}
            />
        );
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={SearchStyle.container}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('AdminHome',
                                { id: this.state.sid })
                        }}
                    >
                        <Image source={require('../Images/back.png')} style={SearchStyle.back} />
                    </TouchableOpacity>
                    <TextInput
                        style={SearchStyle.searchText}
                        placeholder="Search ..."
                        underlineColorAndroid="black"
                        onChangeText={(keyword) => this.onTextChange(keyword)}
                    />
                    <TouchableOpacity
                        onPress={() => { alert(this.state.keyword) }}
                    >
                        <Image source={require('../Images/searchicon.png')} style={SearchStyle.image} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={true}
                    refreshing={this.state.isFetching}
                    renderSeparator={this.ListViewItemSeparator}
                    onRefresh={this.__load}
                    renderItem={({ item }) => this.renderRow(item)}
                    keyExtractor={(item) => { item.id.toString() }}
                    enableEmptySections={true}
                />

            </View>
        );
    }
}

const SearchStyle = StyleSheet.create({
    rowViewContainer: {
        fontSize: 17,
        padding: 10
    },
    container: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    searchText: {
        flex: 1,
    },
    image: {
        height: 50,
        width: 50,
        marginBottom: 8,
    },
    back: {
        height: 30,
        width: 30,
        marginTop: 10,
    },
    individual: {
        backgroundColor: "#bcc0c6",
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
});


