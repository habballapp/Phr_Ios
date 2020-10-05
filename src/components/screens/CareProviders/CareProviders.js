import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import AwesomeIcon from 'react-native-vector-icons/Ionicons';
import { Header, Title } from 'native-base';


const data_insurance = [
    { "name": "ABC" },
    { "name": "ABC" },
    { "name": "ABC" },
    { "name": "ABC" },
    { "name": "ABC" },
    { "name": "ABC" }
];


export default class CareProviders extends Component {

    render() {

        return (
            <Container ContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Header style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0000FF', height: 70 }}>

                    <Statusbar
                        translucent
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginRight: '80%' }} size={22} color="#ffffff" />
                    </TouchableOpacity>
                    {/* <Title style={styles.titleStyles,{alignSelf:'center',justifyContent:'center',marginRight: '80%'}}>Home</Title> */}

                </Header>
                <Container ContainerStyle={{ marginTop: 30, height: '85%' }}>

                    <Textview
                        textStyle={{ paddingBottom: 10, alignSelf: 'center', fontSize: 20, width: '90%', color: '#0000FF' }}

                    >
                        List Of Care Providers
                    </Textview>
                    <FlatList
                        data={data_insurance}
                        extraData={this.state}

                        renderItem={({ item, index }) => (
                            <Container ContainerStyle={{ padding: 20, alignSelf: 'center', marginBottom: 20, height: 160, backgroundColor: '#FFF', width: '90%', borderWidth: 1, borderColor: "#3f3f3f", borderRadius: 16, flexDirection: 'row' }}>
                                <Container ContainerStyle={{ flex: 1, width: '30%', alignItems: 'center', flexDirection: 'row' }}>



                                    <Container ContainerStyle={{ marginLeft: 10, width: '100%' }}>
                                        <Container
                                          ContainerStyle ={{alignSelf:'flex-end'}}
                                        >

                                        <FontAwesome
                                            name="edit"
                                            size={15}
                                            color="blue"

                                        />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Provider Type: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Doctor" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Provider ID: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="0123" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Provider Name: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Dr.Steve" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Currently Visiting: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Yes" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Last Visited?: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="15/07/2020" />
                                        </Container>


                                    </Container>


                                </Container>

                            </Container>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: 60,
                            height: 60,
                            backgroundColor: '#0000FF',
                            borderRadius: 50,
                            marginTop: 20
                        }}
                        onPress={() => this.props.navigation.navigate("AddProvider")}
                    >
                        <FontAwesome
                            name="plus"
                            size={15}
                            color="white"
                        />
                    </TouchableOpacity>



                </Container>
            </Container>
        )


    }
}