
import { WebView } from 'react-native-webview';
import React, { Component } from 'react'
import { StyleSheet, View,TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { Logintag } from '../Login/LoginTag';
import { styles } from '../Login/login_styles';
import { Header,Title } from 'native-base';
import Menu, { MenuItem, } from 'react-native-material-menu';

 
// ...

export default class Search extends Component {
  render() {
    return (
    <Container ContainerStyle={{
        flex: 1, backgroundColor: '#FFFFFF',
    }}>
        <Container ContainerStyle={{
                    marginTop: 20
                    
                }}>

                    <TouchableOpacity
                     onPress={() => { this.props.navigation.openDrawer() }}
                    >
                        <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center' }} size={22} color="#ffffff" />
                    </TouchableOpacity>

                    <Title style={{
                        alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -40
                        , borderBottomWidth: 5, paddingBottom: 4
                    }}>Search</Title>

                </Container>
    <WebView style = {{height: '80%'}}
    source={{ uri: 'https://phr.matz.group/map.html' }} />
    </Container>
    );
  }
}