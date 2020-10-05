import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';



var userUID = '';

export default class AddReminders extends Component {

    fieldAppointmentRef = React.createRef();
    fieldNameRef = React.createRef();
    fieldAddressRef = React.createRef();
    fieldPhoneRef = React.createRef();

    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {
            address: '',
            appointment: '',
            name: '',
            phoneno: '',
            time: '',
            value: '',
            date: "2016-05-15",
            time: 'Select Appointment Time',
            defaultText: 'Select Appointment Time',
            defaltTime: new Date('2020-06-12T14:42:42'),
            errorFieldAppointment: '',
            errorFieldName: '',
            errorFieldAddress: '',
            errorFieldPhone: '',
            isLoading: false






        }
    }

    _onUserCreation = () => { this.props.navigation.navigate("Reminders") };

    saveData() {


        const that = this;
        var error = false;

        if (this.state.appointment == '') {
            this.setState({ errorFieldAppointment: 'Please Enter Appointmnet' });
            error = true;
            // return;
        }
        if (this.state.name == '') {
            this.setState({ errorFieldName: 'Please Enter Name' });
            error = true;
            // return;
        }
        if (this.state.date == '2016-05-15') {
            Toast.show('Please Enter Date');
            error = true;
            // return;
        }
        if (this.state.address == '') {
            this.setState({ errorFieldAddress: 'Please Enter Adress' });
            error = true;
            // return;
        }
        if (this.state.phoneno == '') {
            this.setState({ errorFieldPhone: 'Please Enter Phone No' });
            error = true;

            // return;
        }
        if (this.state.time == '') {
            Toast.show('Please Enter Date');
            error = true;
            // return;
        }
        if (error) {
            return;
        }

        this.setState({ isLoading: true });

        userUID = firebase.auth().currentUser.uid;
        
        firebase.database().ref('Register_User/' + userUID + '/AddReminders').push({


            Address: this.state.address,
            Appointment: this.state.appointment,
            Date: this.state.date,
            Name: this.state.name,
            PhoneNo: this.state.phoneno,
            Time: this.state.time,
            User_Key: userUID,




        }).catch((err) => {

        }).then(() => {
            that.setState({ isLoading: false }),
                that.props.navigation.navigate('Reminders')
        }
        );
        // this.props.navigation.navigate("Me")

    }


    show = mode => {
        this.setState({
            show: true,
            mode,
        });
    }
    timepicker = () => {
        this.show('time');
    }

    render() {
        this.onTimeChanged = (event, time) => {
            console.log("time event picked.. ", event);
            console.log("time picked.. ", time);
            console.log("time moment picked.. ", moment(time).format('HH:mm'));
            this.setState({
                time: moment(time).format('HH:mm'),
                show: false
            })
            console.log("time.. ", this.state.time)
        }
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
                        marginTop: 40
                    }}>

                        <TouchableOpacity

                            onPress={() => { this.props.navigation.openDrawer() }}

                        >
                            <FontAwesome name="bars" style={{ color: '#000000', padding: 10, marginRight: 10, marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 }} size={22} color="#ffffff" />
                        </TouchableOpacity>

                        <Title style={{
                            alignSelf: 'center', color: '#000000', marginLeft: 10, marginRight: 10, marginTop: -50
                            , borderBottomWidth: 5, paddingBottom: 4
                        }}>Add Reminders</Title>

                    </Container>
                    <SafeViewArea style={{ flex: 1 }}>

                        <Scrollview >

                            <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '100%' }}>


                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: '20%' }}>
                                    <Textview textStyle={{ width: '20%', fontSize: 18, color: '#767981' }}>
                                        Date:
                            </Textview>
                                    <DatePicker
                                        style={{ width: 250, borderColor: '#653dd6', borderWidth: 1 }}
                                        date={this.state.date}
                                        mode="date"
                                        placeholder="select date"
                                        format="YYYY-MM-DD"
                                        minDate="1900-05-01"
                                        maxDate="2025-12-31"
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

                                <Container ContainerStyle={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 30 }}>
                                    <Textview textStyle={{ width: '20%', fontSize: 18, color: '#767981' }}>
                                        Time:
                            </Textview>
                                    <Container ContainerStyle={{ borderColor: '#707070', borderWidth: 0.5, width: '80%', height: 50, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>

                                        <Container>
                                            <Text onPress={this.timepicker} style={{ color: '#767981', fontSize: 18 }}>
                                                {this.state.time}
                                            </Text>
                                        </Container>
                                        {this.state.show && <DateTimePicker
                                            value={this.state.defaltTime}
                                            mode={this.state.mode}
                                            is24Hour={false}
                                            display="spinner"
                                            onChange={this.onTimeChanged} />
                                        }
                                    </Container>
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
                                        label={"Appointment"}
                                        error={this.state.errorFieldAppointment}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ appointment: event })
                                        }}
                                        ref={this.fieldAppointmentRef}

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

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 10 }}>

                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Address"}
                                        error={this.state.errorFieldAddress}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ address: event })
                                        }}
                                        ref={this.fieldAddressRef}

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
                                        label={"Phone No"}
                                        keyboardType='numeric'
                                        error={this.state.errorFieldPhone}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ phoneno: event })
                                        }}
                                        ref={this.fieldPhoneRef}

                                    />


                                </Container>

                                <Container ContainerStyle={{ padding: 7 }}></Container>




                            </Container>
                            <Button

                                onPress={() => { this.saveData() }}
                                title="Save" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >

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
    input: {
        fontSize: 18,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 30,
        marginTop: 20,
    },
    input_personal_details: {
        fontSize: 20,
        color: '#000',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ' rgba(158, 150, 150, .5)',
        width: '60%',
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
        width: '60%',
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
        borderWidth: 2
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