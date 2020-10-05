import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { Logintag } from '../Login/LoginTag';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import Menu, { MenuItem, } from 'react-native-material-menu';
import AntDesign from 'react-native-vector-icons/AntDesign';





export default class Payments extends Component {

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
                        <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} size={22} color="#ffffff" />
                    </TouchableOpacity>

                    <Title style={{
                        alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -50
                        , borderBottomWidth: 5, paddingBottom: 4
                    }}>Payments</Title>

                </Container>



                <Container ContainerStyle={{ marginTop: '50%', marginLeft: '40%', marginRight: '40%' }}>
                     
                    <Button textStyle={styles.loginButtonText} title="Credit Card" style={{
                        shadowColor: 'rgba(46, 229, 157, 0.4)', shadowOpacity: 1.5, elevation: 8, shadowRadius: 20, shadowOffset: { width: 1, height: 13 },
                        borderRadius: 25, borderWidth: 4, borderColor: 'white', backgroundColor: '#653dd6', height: 80, width: 300, alignSelf: 'center', marginBottom: 20, justifyContent: 'center', alignItems: 'center'
                    }} >
                          {/* <AntDesign name="right" style={{ color: '#fff',alignContent:'flex-end'}} size={40} color="#ffffff" /> */}

                    </Button>

                    <Button textStyle={styles.loginButtonText} title="Health Saving Account" style={{
                        shadowColor: 'rgba(46, 229, 157, 0.4)', shadowOpacity: 1.5, elevation: 8, shadowRadius: 20, shadowOffset: { width: 1, height: 13 },
                         borderRadius: 25, borderWidth: 4, borderColor: 'white', backgroundColor: '#653dd6', height: 80, width: 300, alignSelf: 'center', marginBottom: 20, justifyContent: 'center', alignItems: 'center'
                    }} >
                          {/* <AntDesign name="right" style={{ color: '#fff',alignContent:'flex-end'}} size={40} color="#ffffff" /> */}

                    </Button>

                    <Button textStyle={styles.loginButtonText} title="Flex Pending" style={{
                        shadowColor: 'rgba(46, 229, 157, 0.4)', shadowOpacity: 1.5, elevation: 8, shadowRadius: 20, shadowOffset: { width: 1, height: 13 },
                          borderRadius: 25, borderWidth: 4, borderColor: 'white', backgroundColor: '#653dd6', height: 80, width: 300, alignSelf: 'center', marginBottom: 20, justifyContent: 'center', alignItems: 'center'
                    }} >
                          {/* <AntDesign name="right" style={{ color: '#fff',alignContent:'flex-end'}} size={40} color="#ffffff" /> */}

                    </Button>


                </Container>


            </Container>

        );
    }
}



