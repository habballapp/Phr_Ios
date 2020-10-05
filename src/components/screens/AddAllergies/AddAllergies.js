import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Picker,ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';


var Name = '';
var Contact = '';
var Email = '';
var Haddress = '';
var Eaddress = '';
var Econtact = '';
var Mstatus = '';
var Gender = '';
var userUID = '';
var date = '';





export default class AddAllergies extends Component {

    fieldDesRef = React.createRef();
   
    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {
            description: '',
            value: '',
            errorFieldDes: '',
            isLoading: false
        }
    }

    _onUserCreation = () => { this.props.navigation.navigate("HealthBio") };

    saveData() {

        var error = false;
        if (this.state.description == '') {
            this.setState({ errorFieldDes: 'Please enter Description' });
            error = true;
            // return;
        }
        if (this.state.value == '') {
            Toast.show('Please Enter Category');
            error = true;
            // return;
        }
        if (error) {
            return;
        }

        this.setState({ isLoading: true });

        userUID = firebase.auth().currentUser.uid;
       
        firebase.database().ref('Register_User/' + userUID + '/AddAllergies').push({


            Description: this.state.description,
            AllergyType: this.state.value,




        }).catch((err) => {

        }).then(() => {
            this.setState({ isLoading: false });
            this._onUserCreation();
        }
        );

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


                    <TouchableOpacity
                     
                     onPress={() => { this.props.navigation.openDrawer() }}
                    >
                        <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} size={22} color="#ffffff" />
                    </TouchableOpacity>

                    <Title style={{
                        alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -50
                        , borderBottomWidth: 5, paddingBottom: 4
                    }}>Add Allergies</Title>

                </Container>
                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                        <Container ContainerStyle={styles.formContainer, { alignItems:'center',justifyContent: 'center', width: '100%' }}>


                            <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                <Textview textStyle={{ width: '25%', fontSize: 18, color:'#767981' }}>
                                    Allergy Type:
                            </Textview>
                                <Container
                                    ContainerStyle={{
                                        backgroundColor: 'white',
                                        width: '80%',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        borderRadius: 5,
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: ' rgba(158, 150, 150, .5)'

                                    }}>
                                    <Picker
                                        selectedValue={this.state.value}
                                        style={{ height: 50, width: '100%', color:'#767981'}}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ value: itemValue })
                                        }>
                                        <Picker.Item label="Please Select Category" value="" disabled />


                                        <Picker.Item label="Skin" value="Skin" />
                                        <Picker.Item label="Food" value="Food" />
                                        <Picker.Item label="Medication" value="Medication" />
                                        <Picker.Item label="Other" value="Other" />

                                    </Picker>
                                </Container>
                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginRight: 30 }}>
                              
                            <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Description"}
                                        multiline = {true}
                                        numberOfLines={5}
                                        error={this.state.errorFieldDes}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                        this.setState({
                                            description: event
                                        })
                                    }}
                                    ref={this.fieldDesRef}
                                />

                            </Container>





                        </Container>
                        <Button

                            onPress={() => { this.saveData() }}
                            title="Submit" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >
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
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 10,
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
        marginTop: 120,
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
        marginLeft: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 30
    },
    myContainerStyle: {
        width: '100%',
        height: 70,
        marginLeft: 20,
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