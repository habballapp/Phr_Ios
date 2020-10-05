import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker'






export default class AddInsurance extends Component {

    constructor(props){
        super(props)
        this.state = { date: "2016-05-15" }
    }
    

    render() {
        return (

            <Container ContainerStyle={{
                flex: 1, backgroundColor: '#FFFFFF',
            }}>

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
                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                        <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '75%',marginTop:40}}>


                            

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: '#0000FF' }}>
                                    Provider:
                            </Textview>
                                <Input
                                    placeholder="Policy Provider"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={style.input_personal_details}

                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: '#0000FF' }}>
                                    Policy Type:
                            </Textview>
                                <Input
                                    placeholder="Select Status"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={style.input_personal_details}

                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%',marginTop:10 }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: '#0000FF' }}>
                                   Start Date:
                            </Textview>
                                <DatePicker
                                    style={{ width: 200 }}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="Autofill"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: '#0000FF' }}>
                                    Current Status:
                            </Textview>
                                <Input
                                    placeholder="Autofill"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={style.input_personal_details}

                                />

                            </Container>


                            <Container ContainerStyle={{ padding: 7 }}></Container>

                        </Container>
                        <Button
                        title="Save" style={styles.insuranceButtonStyles} textStyle={styles.insuranceButtonText} >
                            <FontAwesome
                            name="upload"
                            size={15}
                            color="white"
                            />
                        </Button>





                    </Scrollview>
                </SafeViewArea>



            </Container>

        );
    }
}

const style = StyleSheet.create({

    MainContainer: {

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10

    },

    TextInputStyleClass: {

        // Setting up Hint Align center.
        textAlign: 'center',

        // Setting up TextInput height as 50 pixel.
        height: 50,

        // Set border width.
        borderWidth: 2,

        // Set border Hex Color Code Here.
        borderColor: '#FF5722',

        // Set border Radius.
        borderRadius: 20,

        //Set background color of Text Input.
        backgroundColor: "#FFFFFF"

    },
    input1: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 20
    },
    input_personal_details: {
        fontSize: 20,
        color: '#000',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ' rgba(158, 150, 150, .5)',
        width: '90%',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20
    },
    loginButtonStyles1: {
        // marginTop: 25,
        // width: '75%',
        // borderRadius: 15,
        // justifyContent: 'center',
        // alignSelf: 'center',
        // alignItems: 'center',
        // backgroundColor: '#0000FF',
        // height: 50,

        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FF',
        flexDirection: 'row',
        height: 50,
    },

});