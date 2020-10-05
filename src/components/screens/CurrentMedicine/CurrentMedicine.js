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


export default class CurrentMedicine extends Component {

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
                        List Of Current Medicines
                    </Textview>
                    <FlatList
                        data={data_insurance}
                        extraData={this.state}

                        renderItem={({ item, index }) => (
                            <Container ContainerStyle={{ padding: 20, alignSelf: 'center', marginBottom: 20, height: 420, backgroundColor: '#FFF', width: '90%', borderWidth: 1, borderColor: "#3f3f3f", borderRadius: 16, flexDirection: 'row' }}>
                                
                               
                            
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
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Name: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="XYZ" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Prescription: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Prescription" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Pharmacy ID: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="12345" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Pharmacy Name: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="XYZ Name" />
                                        </Container>

                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Prescription: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Prescription" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="Currently Taking: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Yes" />
                                        </Container>
                                        <Container ContainerStyle={{ width: '100%', flex: 1, width: '50%', alignItems: 'center', flexDirection: 'row' }}>
                                            <Textview textStyle={{ fontSize: 18, color: '#0000FF' }} text="When Stopped: " />
                                            <Textview textStyle={{ fontSize: 12, color: '#6d6e72' }} text="Not Available" />
                                        </Container>
                                    </Container>
                                </Container>

                            </Container>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    {/* <Button
                        title="Add Insurance" style={styles.insuranceButtonStyles} textStyle={styles.insuranceButtonText} >
                            <FontAwesome
                            name="plus-square-o"
                            size={15}
                            color="white"
                            />
                        </Button> */}

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
                        onPress={() => this.props.navigation.navigate("AddMediciene")}
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