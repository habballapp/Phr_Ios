import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity,ActivityIndicator } from "react-native";
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



export default class AddMedicine extends Component {

    fieldMnameRef = React.createRef();
    fieldMgsRef = React.createRef();
    fieldQuantityRef = React.createRef();
    fieldPhysicianRef = React.createRef();
    fieldPnameRef = React.createRef();
    fieldPCodeRef = React.createRef();

    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {
            mname: '',
            mgs: '',
            quantity: '',
            value: 'Yes',
            physician: '',
            pname: '',
            pcode: '',
            errorFieldMname: '',
            errorFieldMgs: '',
            errorFieldQuantity: '',
            errorFieldPhysician: '',
            errorFieldMaritalStatus: '',
            errorFieldPname: '',
            errorFieldPCode: '',
            isLoading: false






        }
    }

    _onUserCreation = () => { this.props.navigation.navigate("Medication") };

    saveData() {


        const that = this;
        var error = false;
        if (this.state.mname == '') {
            this.setState({ errorFieldMname: 'Please enter Medicine Name' });
            error = true;
            // return;
        }
        if (this.state.mgs == '') {
            this.setState({ errorFieldMgs: 'Please enter Mgs' });
            error = true;
            // return;
        }
        if (this.state.quantity == '') {
            this.setState({ errorFieldQuantity: 'Please enter Quantity' });
            error = true;
            // return;
        }
        if (this.state.physician == '') {
            this.setState({ errorFieldPhysician: 'Please enter Physicain' });
            error = true;
            // return;
        }
        if (this.state.pname == '') {
            this.setState({ errorFieldPname: 'Please enter your Physicain Name' });
            error = true;
            // return;
        }
        if (this.state.pcode == '') {
            this.setState({ errorFieldPCode: 'Please enter Physicain Code' });
            error = true;
            // return;
        }
        if(error) {
            return;
        }

        this.setState({ isLoading: true });

        userUID = firebase.auth().currentUser.uid;
        
        firebase.database().ref('Register_User/' + userUID + '/AddMedicine').push({



            MedicineName: this.state.mname,
            Mgs: this.state.mgs,
            PharmacyCode: this.state.pcode,
            User_Key: userUID,
            PharmacyName: this.state.pname,
            CurrentTaking: this.state.value,
            Physician: this.state.physician,
            QuantityAvailable: this.state.quantity




        }).catch((err) => {

        }).then(() => {
            this.setState({ isLoading: false });
             this._onUserCreation();
        }
            );
    }


    render() {
        if(this.state.isLoading == true)
        {
            return  (
             <ActivityIndicator
                    size="large"
                    color='#653dd6'
                    style={style.activityIndicator}
                />
            )
        }else{
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
                    }}>Add Medicine</Title>

                </Container>

                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                        <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '100%' }}>


                            <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                               
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Medicine Name"}
                                    error={this.state.errorFieldMname}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ mname: event })
                                    }}
                                    ref={this.fieldMnameRef}
                                    

                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Mgs"}
                                    error={this.state.errorFieldMgs}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ mgs: event })
                                    }}
                                    ref={this.fieldMgsRef}

                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                               
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Quantity"}
                                    keyboardType = 'numeric'
                                    error={this.state.errorFieldQuantity}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ quantity: event })
                                    }}
                                    ref={this.fieldQuantityRef}

                                />

                            </Container>


                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Physician"}
                                    error={this.state.errorFieldPhysician}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ physician: event })
                                    }}
                                    ref={this.fieldPhysicianRef}
                                
                                   

                                />

                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 30 }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, fontWeight: 'bold', color: '#767981' }}>
                                    Currently Taking:
                            </Textview>

                                <RadioForm
                                    radio_props={radio_props}
                                    initial={0}
                                    buttonSize={10}
                                    onPress={(value) => { this.setState({ value: value }) }}
                                    buttonColor={'#767981'}
                                    labelColor={'#767981'}
                                    selectedButtonColor = {'#767981'}
                                    formHorizontal={true}
                                    labelStyle={{marginRight:10}}
                                />


                            </Container>


                            <Container ContainerStyle={{ padding: 7 }}></Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                
                                      
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Physician Name"}
                                    error={this.state.errorFieldPname}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ pname: event })
                                    }}
                                    ref={this.fieldPnameRef}

                                />

                            </Container>

                            <Container ContainerStyle={{ padding: 7 }}></Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                            <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    keyboardType = 'numeric'
                                    label={"Physician Code"}
                                    error={this.state.errorFieldPCode}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ pcode: event })
                                    }}
                                    ref={this.fieldPCodeRef}

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