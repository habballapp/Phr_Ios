import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar, ImageView } from '../../default/index';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Ionicons";
import firebase from 'react-native-firebase';
import DocumentPicker from "react-native-document-picker";
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import AppLogo from '../../../assets/logo1.png';



var phistory = ''

export default class InsurancePlan extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: "2016-05-15",
            value: '',
            Name: '',
            Lno: '',
            Hname: '',
            Cno: '',
            Email: '',
            response: {},
            phistory: ''

        }
    }






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
                        alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -40
                        , borderBottomWidth: 5, paddingBottom: 4
                    }}>Personal Health Record</Title>

                </Container>

                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                    <Container ContainerStyle={{
                flex: 1, backgroundColor: '#FFFFFF',
            }}>

                    <Container ContainerStyle={style.loginTagContainer}>
                                <ImageView
                                    resizeMode="center"
                                    imageStyle={style.appLogo}
                                    imgSource={AppLogo}
                                />

                            </Container>

                        <Container ContainerStyle={{ flexDirection: 'row', alignSelf: 'center' }}>

                          
                            <Button

                                // onPress={() => this.props.navigation.navigate("Home")}
                                // onPress={() => this.saveData()}
                                title="Generate PDF" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >
                                <FontAwesome
                                    name="upload"
                                    size={15}
                                    color="white"
                                />
                            </Button>

                            <Button
                                // onPress={() => this.props.navigation.navigate("Home")}
                                // onPress={() => this.saveData()}
                                title="Email" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >
                                <FontAwesome
                                    name="upload"
                                    size={15}
                                    color="white"
                                />
                            </Button>
                        </Container>



                       </Container>

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
        marginLeft: 20,
        height: 100
    },
    input_personal_details1: {
        fontSize: 20,
        color: '#000',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ' rgba(158, 150, 150, .5)',
        width: '65%',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 5

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

        marginBottom: 10,
        marginTop: 25,
        marginLeft: 20,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 40,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 40,
        borderColor: '#653dd6',
        borderWidth: 1
    },
    input: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        marginLeft: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 30
    },
    loginTagContainer: {
        marginTop: 60,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center'
    },
    appLogo: {
        height: 400,
        width: '100%',
    }

});

