import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Picker, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';


var Dno = '';
var Fname = '';
var Lname = '';
var Speciality = '';
var Daddress = '';
var Pno = '';
var Vdate = '';
var userUID = '';
var date = '';
var Lno = '';



export default class AddDoctors extends Component {

    fieldLNameRef = React.createRef();
    fieldFNameRef = React.createRef();
    fieldLnoRef = React.createRef();
    fieldPhoneRef = React.createRef();
    fieldSpecialityRef = React.createRef();
    fieldAddressRef = React.createRef();



    constructor(props) {
        super(props)

        this.state = {
            date: "2016-05-15",
            Dno: '',
            Fname: '',
            Lname: '',
            Speciality: '',
            Daddress: '',
            Pno: '',
            Vdate: '',
            response: {},
            Lno: '',
            errorFieldLName: '',
            errorFieldFname: '',
            errorFieldLno: '',
            errorFieldSpeciality: '',
            errorFieldAddress: '',
            errorFieldContact: '',
            value: '',
            isLoading: false




        }
    }



    async attachFile() {

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        // try {

        ImagePicker.launchImageLibrary(options, (response) => {
            // const response = await DocumentPicker.pick({
            //     type: [DocumentPicker.types.images],
            // });

            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    value: response.fileName,
                    response: response
                });
            }
        });
    }

    async saveData() {
        const that = this;
        var error = false;


        if (this.state.Lno == '') {
            this.setState({ errorFieldLno: 'Please enter License No' });
            error = true;
            // return;
        }
        if (this.state.Fname == '') {
            this.setState({ errorFieldFname: 'Please enter your First Name' });
            error = true;
            // return;
        }
        if (this.state.Lname == '') {
            this.setState({ errorFieldLName: 'Please enter your Last Name' });
            error = true;
            // return;
        }
        if (this.state.date == '2016-05-15') {
            Toast.show('Please enter your Date of Birth');
            error = true;
            // return;
        }
        if (this.state.Speciality == '') {
            this.setState({ errorFieldSpeciality: 'Please enter your Speciality' });
            error = true;
            // return;
        }
        if (this.state.Daddress == '') {
            this.setState({ errorFieldAddress: 'Please enter Doctor Address' });
            error = true;
            // return;
        }
        if (this.state.Pno == '') {
            this.setState({ errorFieldContact: 'Please enter your Phone No' });
            error = true;
            // return;
        }
        if (this.state.value == '') {
            Toast.show('Please Upload Doctor Note');
            error = true;
            // return;
        }
        if (this.state.date == '2016-05-15') {
            Toast.show('Please enter Last Visit Date');
            error = true;
            // return;
        }
        if (error) {
            return;
        }

         
        this.setState({ isLoading: true });


        let userID = firebase.auth().currentUser.uid;

        let response = this.state.response;
        const source = { uri: response.uri };

        Dno = this.state.Dno;
        Fname = this.state.Fname;
        Lname = this.state.Lname;
        Daddress = this.state.Daddress;
        Vdate = this.state.date;
        Pno = this.state.Pno;
        Speciality = this.state.Speciality;
        Lno = this.state.Lno;




        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        var uploadTask = firebase
            .storage()
            .ref(`images/${response.fileName}`)
            .putFile(response.uri)
        // .on('state_changed', (snapshot) => {
        //  Toast.show("Uploading " );

        // }, (err) => {

        // }, (uploadedAsset) => {

        // })
        var refTemp = firebase.storage().ref(`images/${response.fileName}`);
        console.log("uploadTask");
        console.log(uploadTask);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                let progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         Toast.show("Uploading" );
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
                console.log("progress " + progress);
            },
            (error) => {
                Toast.show("Upload finished with error");
                console.log("error");
                console.log(error);
                console.log(error.code);
            },
            () => {
                refTemp.getDownloadURL().catch((error) => { }).then(function (downloadURL) {
                 
                    firebase.database().ref(`Register_User/${userID}/AddDoctors`).push({
                        DoctorAddress: Daddress,
                        DoctorNote: downloadURL,
                        FirstName: Fname,
                        LastName: Lname,
                        DoctorLisenceNo: Lno,
                        PhoneNo: Pno,
                        Speciality: Speciality,
                        LastVisitDate: Vdate,
                        User_Key: userID
                    }).catch((err) => {
                        Toast.show("Upload finished with error");
                    }).then(() => {
                        // this._onUserCreation()
                        that.setState({ isLoading: false }),
                        that.props.navigation.navigate('Providers')
                    // this.props.navigation.navigate('Symptoms')                        
                }
                );
            });
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
                    }}>Add Doctor</Title>

                </Container>

                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                        <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: 40 }}>


                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>

                                <TextField
                                    tintColor={'#000'}
                                    lineWidth={1}
                                    activeLineWidth={1}
                                    disabledLineWidth={1}
                                    labelFontSize={12}
                                    fontSize={20}
                                    textColor={'#000'}
                                    label={"Doctor License No"}
                                    keyboardType='numeric'
                                    error={this.state.errorFieldLno}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Lno: event })
                                    }}
                                    ref={this.fieldLnoRef}

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
                                    label={"First Name"}
                                    error={this.state.errorFieldFname}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Fname: event })
                                    }}
                                    ref={this.fieldFNameRef}

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
                                    label={"Last Name"}
                                    error={this.state.errorFieldLName}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Lname: event })
                                    }}
                                    ref={this.fieldLNameRef}

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
                                    label={"Speciality"}
                                    error={this.state.errorFieldSpeciality}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Speciality: event })
                                    }}
                                    ref={this.fieldSpecialityRef}

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
                                    label={"Doctor Address"}
                                    error={this.state.errorFieldAddress}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Daddress: event })
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
                                    error={this.state.errorFieldContact}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Pno: event })
                                    }}
                                    ref={this.errorFieldContact}

                                />

                            </Container>



                            <Container ContainerStyle={{ padding: 7 }}></Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 30 }}>
                                <Textview textStyle={{ width: '20%', fontSize: 18, color: '#767981' }}>
                                    Last Visit Date:
                            </Textview>

                                <DatePicker
                                    style={{ width: 250, borderColor: '#653dd6', borderWidth: 1, marginTop: 20, marginLeft: 5 }}
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

                            <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', width: '80%' }}>
                                <Textview textStyle={{ width: '30%', fontSize: 18, color: '#767981' }}>
                                    Doctor Note:
                                </Textview>
                                <Button

                                    style={style.loginButtonStyles2} textStyle={styles.insuranceButtonText}
                                    title="Upload"
                                    onPress={() => this.attachFile()}
                                >
                                    <FontAwesome
                                        name="upload"
                                        size={15}
                                        color="blue"
                                    />
                                </Button>

                            </Container>

                            <Container ContainerStyle={{ padding: 7 }}></Container>




                        </Container>

                        <Button
                            styles={{ marginTop: 20 }}
                            onPress={() => { this.saveData() }}
                            title="Submit" style={style.loginButtonStyles1} textStyle={styles.insuranceButtonText} >

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
        marginRight: 20,
        marginLeft: 20
    },
    input_personal_details1: {
        fontSize: 20,
        color: '#000',
        borderWidth: 1,
        borderRadius: 16,
        borderColor: ' rgba(158, 150, 150, .5)',
        width: '70%',

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
    loginButtonStyles2: {
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
        borderRadius: 10,
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