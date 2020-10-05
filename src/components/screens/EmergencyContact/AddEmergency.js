import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';



var userUID = '';


var radio_props = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
];



export default class AddEmergency extends Component {
    fieldContactRef = React.createRef();
    fieldNameRef = React.createRef();
    fieldRelationRef = React.createRef();

    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {
            name: '',
            contact: '',
            relation: '',
            errorFieldContact: '',
            errorFieldName: '',
            errorFieldRelation: '',
            isLoading: false


        }
    }

    _onUserCreation = () => { this.props.navigation.navigate("ViewEmergency") };

    saveData() {

        const that = this;
        var error = false;

        if (this.state.name == '') {
            this.setState({ errorFieldName: 'Please Enter Name' });
            error = true;
            // return;
        }
        if (this.state.contact == '') {
            this.setState({ errorFieldContact: 'Please Enter Contact Number' });
            error = true;
            // return;
        }
        if (this.state.relation == '') {
            this.setState({ errorFieldRelation: 'Please Enter Relation' });
            error = true;
            // return;
        }
        if (error) {
            return;
        }
        this.setState({ isLoading: true });

        userUID = firebase.auth().currentUser.uid;
        
        firebase.database().ref('Register_User/' + userUID + '/AddEmergencyContact').push({


            ContactNumber: this.state.contact,
            Name: this.state.name,
            Relation: this.state.relation,
            User_Key: userUID





        }).catch((err) => {

        }).then(() => {
            that.setState({ isLoading: false }),
                that.props.navigation.navigate('ViewEmergency')
        }
        );
        // this.props.navigation.navigate("Me")

    }


    render() {
        if (this.state.isLoading == true) {
            return (
                <ActivityIndicator
                    size="large"
                    color='#653dd6'
                    style={style.activityIndicator}
                />
            )
        } else {
            return (

                <Container ContainerStyle={{
                    flex: 1, backgroundColor: '#FFFFFF',
                }}>

                    <Container ContainerStyle={{
                        marginTop: 20
                    }}>


                        <TouchableOpacity>
                            <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} size={22} color="#ffffff" />
                        </TouchableOpacity>

                        <Title style={{
                            alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -50
                            , borderBottomWidth: 5, paddingBottom: 4
                        }}>Add Emergency Contact</Title>

                    </Container>

                    <SafeViewArea style={{ flex: 1 }}>

                        <Scrollview >

                            <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '100%' }}>


                                <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', width: '90%' }}>

                                    {/* <Input
                                    placeholder="Contact Number"
                                    placeholderTextColor='#767981'
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ contact: event })
                                    }}
                                    

                                /> */}
                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        keyboardType='numeric'
                                        textColor={'#000'}
                                        label={"Contact Number"}
                                        error={this.state.errorFieldContact}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ contact: event })
                                        }}
                                        ref={this.fieldContactRef}

                                    />
                                </Container>

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>

                                    {/* <Input
                                    placeholder="Name"
                                    placeholderTextColor='#767981'
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ name: event })
                                    }}

                                /> */}
                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Name"}
                                        error={this.state.errorFieldName}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ name: event })
                                        }}
                                        ref={this.fieldNameRef}

                                    />
                                </Container>

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>

                                    {/* <Input
                                    placeholder=" Relation"
                                    placeholderTextColor='#767981'
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ relation: event })
                                    }}

                                /> */}
                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Relation"}
                                        error={this.state.errorFieldRelation}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ relation: event })
                                        }}
                                        ref={this.fieldRelationRef}

                                    />
                                </Container>


                                <Container ContainerStyle={{ padding: 7 }}></Container>


                            </Container>
                            <Button

                                onPress={() => { this.saveData() }}
                                title="Save" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >
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
    input_personal_details1: {
        fontSize: 20,
        color: '#000',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ' rgba(158, 150, 150, .5)',
        width: '90%',
        height: 100,
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

        marginBottom: 10,
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
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
        height: 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 30,
        marginTop: 30,
    },
    myContainerStyle: {
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        marginTop: 30
    },
    myInputContainerStyle: {
        paddingLeft: 10,
        paddingRight: 20,
    },
    myLabelTextStyle: {
        color: '#767981'
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});