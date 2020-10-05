import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Picker, ActivityIndicator  } from "react-native";
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


var Otype = '';
var Ldate = '';
var Phoneno = '';
var Paddress = '';
var Pname = '';
var Pno = '';
var Ptype = '';
var Speciality = '';


var value = '';


export default class AddOtherProviders extends Component {

    fieldOtypeRef = React.createRef();
    fieldPnoRef = React.createRef();
    fieldPnameRef = React.createRef();
    fieldPhoneRef = React.createRef();
    fieldSpecialityRef = React.createRef();
    fieldAddressRef = React.createRef();

    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {

            response: {},
            Otype: '',
            date: '2016-05-15',
            Pno: '',
            Paddress: '',
            Pname: '',
            Phoneno: '',
            Ptype: '',
            Speciality: '',
            value: '',
            val: '',
            errorFieldPtype: '',
            errorFieldPno: '',
            errorFieldPname: '',
            errorFieldSpeciality: '',
            errorFieldAddress: '',
            errorFieldContact: '',
            isLoading: false





        }
    }

    _onUserCreation = () => { this.props.navigation.navigate('CareProviders') };

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
                    val: response.fileName,
                    response: response
                });
            }
        });
    //    this.setState({ value: response.name })

    }

    async saveData() {

        const that = this;
        var error = false;



        
        if (this.state.value == '') {
            Toast.show('Please Select Category');
            error = true;
            // return;
        }
        if (this.state.Pno == '') {
            this.setState({ errorFieldPno: 'Please enter Providers No' });
            error = true;
            // return;
        }
        if (this.state.Pname == '') {
            this.setState({ errorFieldPname: 'Please enter Providers Name' });
            error = true;
            // return;
        }
        if (this.state.date == '2016-05-15') {
            Toast.show('Please Enter Last Visit Date');
            error = true;
            // return;
        }
        if (this.state.Speciality == '') {
            this.setState({ errorFieldSpeciality: 'Please enter Speciality' });
            error = true;
            // return;
        }
        if (this.state.Paddress == '') {
            this.setState({ errorFieldAddress: 'Please enter Providers Address' });
            error = true;
            // return;
        }
        if (this.state.Pno == '') {
            this.setState({ errorFieldContact: 'Please enter Phone No' });
            error = true;
            // return;
        }
        if (this.state.val == '') {
            Toast.show('Please Upload Note');
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

            Otype = this.state.Otype,
            Ldate = this.state.date,
            Phoneno = this.state.Phoneno,
            Paddress = this.state.Paddress,
            Speciality = this.state.Speciality,
            Pname = this.state.Pname,
            Pno = this.state.Pno,
            Ptype = this.state.value




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
                 
                    firebase.database().ref(`Register_User/${userID}/AddOtherProvider`).push({
                        Notes: downloadURL,
                        IfTypeOther: Otype,
                        PhoneNo: Phoneno,
                        Speciality: Speciality,
                        LastVisitDate: Ldate,
                        ProviderAddress: Paddress,
                        ProviderName: Pname,
                        ProviderType: Ptype,
                        ProviderNo: Pno,
                        User_Key: userID
                    }).catch((err) => {
                        Toast.show("Upload finished with error");
                    }).then(() => {
                        that.setState({ isLoading: false }),
                        that.props.navigation.navigate('Providers')
                    }
                        );
                });
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
                    }}>Add Other Providers</Title>

                </Container>

                <SafeViewArea style={{ flex: 1 }}>

                    <Scrollview >

                        <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '100%' }}>


                            <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center',  width: '85%' }}>
                              <Textview textStyle={{ width: '25%', fontSize: 18, color: '#767981' }}>
                                    Provider:
                            </Textview>
                                <Container
                                    ContainerStyle={{
                                        backgroundColor: 'white',
                                        width: '75%',
                                        alignSelf: 'center',
                                        marginTop: 10,
                                        borderRadius: 5,
                                        marginBottom: 10,
                                        borderWidth: 1,
                                        borderColor: ' rgba(158, 150, 150, .5)'

                                    }}>
                                    <Picker
                                        selectedValue={this.state.value}
                                        style={{ height: 50, width: '100%', borderColor: '#653dd6', borderWidth: 1, color:'#767981' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ value: itemValue })
                                        }>
                                        <Picker.Item label="Please select Category" value="" disabled />


                                        <Picker.Item label="Hospitals" value="Hospitals" />
                                        <Picker.Item label="Urgent Care Centres" value="Urgent Care Centres" />
                                        <Picker.Item label="Pharmacies" value="Pharmacies" />
                                        <Picker.Item label="Physiotherapist" value="Physiotherapist" />
                                        <Picker.Item label="Nurses" value="Nurses" />
                                        <Picker.Item label="Other" value="Other" />

                                    </Picker>
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
                                    label={"If Provider Type(Other)"}
                                    error={this.state.errorFieldPtype}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Otype: event })
                                    }}
                                    ref={this.fieldOtypeRef}
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
                                    label={"Providers No"}
                                    keyboardType='numeric'
                                    error={this.state.errorFieldPno}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Pno: event })
                                    }}
                                    ref={this.fieldPnoRef}

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
                                    label={"Providers Name"}
                                    error={this.state.errorFieldPname}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Pname: event })
                                    }}
                                    ref={this.fieldPnameRef}

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
                                    label={"Providers Address"}
                                    error={this.state.errorFieldAddress}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Paddress: event })
                                    }}
                                    ref={this.fieldAddressRef}

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
                                    keyboardType='numeric'
                                    label={"Phone No"}
                                    error={this.state.errorFieldContact}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Phoneno: event })
                                    }}
                                    ref={this.fieldPhoneRef}

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
                                    label={"Speciality"}
                                    error={this.state.errorFieldSpeciality}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Speciality: event })
                                    }}
                                    ref={this.fieldSpecialityRef}

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

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Textview textStyle={{ width: '30%', fontSize: 18, color: '#767981' }}>
                                    Notes:
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
        width: '70%',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
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