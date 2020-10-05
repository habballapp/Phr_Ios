import React, { Component, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import TimePicker from 'react-native-simple-time-picker';
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';




var date = '';
var Description = '';
var SymptomsType = '';
var TestDate = '';
var Time = '';





export default class AddSymptoms extends Component {

    fieldSymptomRef = React.createRef();
    fieldDescriptionRef = React.createRef();

    constructor(props) {
        super(props)
        this._onUserCreation = this._onUserCreation.bind(this)
        this.saveData = this.saveData.bind(this)
        this.state = {
            date: "2016-05-15",
            date1: "2016-05-15",
            value: '',
            Description: '',
            SymptomsType: '',
            TestDate: '',
            Time3: '',
            selectedHours: 0,
            selectedMinutes: 0,
            time: 'Select Appointment Time',
            defaultText: 'Select Appointment Time',
            defaltTime: new Date('2020-06-12T14:42:42'),
            errorFieldSymptom: '',
            errorFieldDescription: '',
            isLoading: false,
            timePassed: false



        }



    }


    _onUserCreation = () => { this.props.navigation.navigate('Symptoms') };


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

        if (this.state.SymptomsType == '') {
            this.setState({ errorFieldSymptom: 'Please enter Symptoms Type' });
            error = true;
            // return;
        }
        if (this.state.Description == '') {
            this.setState({ errorFieldDescription: 'Please enter your Description' });
            error = true;
            // return;
        }
        if (this.state.value == '') {
            Toast.show("Please UPload Test Results")
            error = true;
            // return;
        }
        if (this.state.date == '2016-05-15') {
            Toast.show('Please enter your Date ');
            error = true;
            // return;
        }
        if (this.state.date1 == '2016-05-15') {
            Toast.show('Please enter your Date ');
            error = true;
            // return;
        }
        if (this.state.time == 'Select Appointment Time') {
            Toast.show('Please enter Test Time');
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

        date = this.state.date;
        TestDate = this.state.date1;
        SymptomsType = this.state.SymptomsType;
        Description = this.state.Description;

        Time = this.state.time;
        //    Time= Time1.concat(" " ,Time2 );

        //    this.setState({Time3 : Time});





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
                 
                    firebase.database().ref(`Register_User/${userID}/AddSymptoms&Tests`).push({
                        TestResult: downloadURL,
                        Date: date,
                        TestDate: TestDate,
                        Description: Description,
                        SymptomsType: SymptomsType,
                        Time: Time,
                        User_Key: userID
                    }).catch((err) => {
                        Toast.show("Upload finished with error");
                    }).then(() => {
                        setTimeout(function () { }, 3000);
                        that.setState({ isLoading: false });
                        that._onUserCreation();
                    }
                    );
                });
            }
        );


    }

    navigate = () => { this.props.navigation };

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
                    }}>Add Symptoms</Title>

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
                                    label={"Symptom Type"}
                                    error={this.state.errorFieldSymptom}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ SymptomsType: event })
                                    }}
                                    ref={this.fieldSymptomRef}

                                />

                            </Container>


                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 30 }}>
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
                                            marginLeft: 36,

                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />

                            </Container>

                            <Container ContainerStyle={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <Textview textStyle={{ width: '20%', marginLeft: 20, fontSize: 18, color: '#767981' }}>
                                    Time:
                            </Textview>
                                <Container ContainerStyle={{ borderColor: '#707070', borderWidth: 0.5, width: '70%', height: 50, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
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
                                    label={"Descritpion"}
                                    error={this.state.errorFieldDescription}
                                    containerStyle={style.myContainerStyle}
                                    inputContainerStyle={style.myInputContainerStyle}
                                    labelTextStyle={style.myLabelTextStyle}
                                    onChangeText={(event) => {
                                        this.setState({ Description: event })
                                    }}
                                    ref={this.fieldDescriptionRef}

                                />

                            </Container>

                            <Textview textStyle={{ width: '90%', fontSize: 25, color: "#767981", marginTop: 30 }}>
                                Test:
                                </Textview>


                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%', marginTop: 30 }}>
                                <Textview textStyle={{ width: '20%', fontSize: 18, color: '#767981' }}>
                                    Test Date:
                            </Textview>
                                <DatePicker
                                    style={{ width: 250, borderColor: '#653dd6', borderWidth: 1 }}
                                    date={this.state.date1}
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
                                            marginLeft: 36,

                                        }
                                        // ... You can check the source to find the other keys.
                                    }}
                                    onDateChange={(date1) => { this.setState({ date1: date1 }) }}
                                />
                            </Container>

                            <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                <Textview textStyle={{ width: '40%', fontSize: 18, color: "#767981" }}>
                                    Test Result:
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



                            <Container ContainerStyle={{ padding: 7 }}></Container>




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


// const Example = () => {
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date) => {
//         console.warn("A date has been picked: ", date);
//         hideDatePicker();
//     };

//     return (
//         <View>
//             <Button title="Show Date Picker" onPress={showDatePicker} />
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="date"
//                 onConfirm={handleConfirm}
//                 onCancel={hideDatePicker}
//             />
//         </View>
//     );
// };

// export default Example;