import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Container, Textview, Scrollview, Input, Button, SafeViewArea, Statusbar } from '../../default';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import { Header, Title } from 'native-base';
import DatePicker from 'react-native-datepicker';
import Icon from "react-native-vector-icons/Ionicons";
import firebase from 'react-native-firebase';
import DocumentPicker from "react-native-document-picker";
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';

var Name = '';
var Lno = '';
var Hname = '';
var Cno = '';
var Email = ''

export default class HealtInfoBio extends Component {

    fieldNameRef = React.createRef();
    fieldLicense = React.createRef();
    fieldHname = React.createRef();
    fieldCnoRef = React.createRef();
    fieldEmailRef = React.createRef();

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
            errorFieldName: '',
            errorFieldLno: '',
            errorFieldHname: '',
            errorCno: '',
            errorEmail: '',
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

        var error = false;
        const that = this;

        console.log("Image::::", this.state.value)

        if (this.state.value == '') {
            Toast.show('Please Upload your Insurance info');
            error = true;
            // return;
        }
        if (this.state.Name == '') {
            this.setState({ errorFieldName: 'Please enter your name' });
            error = true;
            // return;
        }
        if (this.state.Lno == '') {
            this.setState({ errorFieldLno: 'Please enter your License No' });
            error = true;
            // return;
        }
        if (this.state.Hname == '') {
            this.setState({ errorFieldHname: 'Please enter Name' });
            error = true;
            // return;
        }
        if (this.state.Cno == '') {
            this.setState({ errorCno: 'Please enter your Cell No' });
            error = true;
            // return;
        }
        if (this.state.Email == '') {
            this.setState({ errorEmail: 'Please enter your Email' });
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
        Name = this.state.Name;
        Lno = this.state.Lno;
        Hname = this.state.Hname;
        Email = this.state.Email;
        Cno = this.state.Cno;

        console.log("Name", Name);


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
                // Toast.show("Progress: " + progress);
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
                // console.log("progress " + progress);
            },
            (error) => {
                Toast.show("Upload finished with error");
                console.log("error");
                console.log(error);
                console.log(error.code);
            },
            () => {
                refTemp.getDownloadURL().catch((error) => { }).then(function (downloadURL) {
                 
                    firebase.database().ref(`Register_User/${userID}/HealthInfo`).set({
                        Issurance_info: downloadURL,
                        Pmr_Name: Name,
                        Dr_LisenceNo: Lno,
                        Hcp_Name: Hname,
                        Cell_No: Cno,
                        Email_Address: Email,
                        User_Key: userID
                    }).catch((err) => {
                        Toast.show("Upload finished with error");
                    }).then(() =>
                        // this._onUserCreation()
                    that.setState({ isLoading: false }),
                        that.props.navigation.navigate('Me')

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
                        }}>Health Info</Title>

                    </Container>
                    <SafeViewArea style={{ flex: 1 }}>

                        <Scrollview >

                            <Container ContainerStyle={styles.formContainer, { alignItems: 'center', justifyContent: 'center', width: '90%' }}>


                                <Container ContainerStyle={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                                    <Textview textStyle={{ width: '50%', fontSize: 18, fontWeight: 'bold', color: '#767981' }}>
                                        Insurance Info:
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

                                <Textview textStyle={{ width: '90%', fontSize: 25, fontWeight: 'bold', color: '#767981', marginTop: 10 }}>
                                    Primary Medical Doctor:
                                </Textview>

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

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
                                            this.setState({ Name: event })
                                        }}
                                        ref={this.fieldNameRef}
                                    />

                                </Container>

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"License No"}
                                        keyboardType='numeric'
                                        error={this.state.errorFieldLno}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ Lno: event })
                                        }}
                                        ref={this.fieldLicense}

                                    />

                                </Container>

                                <Textview textStyle={{ width: '90%', fontSize: 25, fontWeight: 'bold', color: '#767981', marginTop: 30 }}>
                                    Health Care Proxy:
                                </Textview>


                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Name"}
                                        error={this.state.errorFieldHname}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ Hname: event })
                                        }}
                                        ref={this.fieldHname}

                                    />

                                </Container>

                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Phone Number"}
                                        keyboardType='numeric'
                                        error={this.state.errorCno}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ Cno: event })
                                        }}
                                        ref={this.fieldCnoRef}

                                    />

                                </Container>


                                <Container ContainerStyle={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <TextField
                                        tintColor={'#000'}
                                        lineWidth={1}
                                        activeLineWidth={1}
                                        disabledLineWidth={1}
                                        labelFontSize={12}
                                        fontSize={20}
                                        textColor={'#000'}
                                        label={"Email"}
                                        error={this.state.errorEmail}
                                        containerStyle={style.myContainerStyle}
                                        inputContainerStyle={style.myInputContainerStyle}
                                        labelTextStyle={style.myLabelTextStyle}
                                        onChangeText={(event) => {
                                            this.setState({ Email: event })
                                        }}
                                        ref={this.fieldEmailRef}

                                    />

                                </Container>

                                <Container ContainerStyle={{ padding: 7 }}></Container>




                            </Container>
                            <Button

                                // onPress={() => this.props.navigation.navigate("Home")}
                                onPress={() => this.saveData()}
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
        width: '65%',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 10,
        marginTop: 10,
        marginRight: 20,
        marginLeft: 20
    },
    input: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        height: 70,
        marginLeft: 20,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 30,
        marginTop: 20,
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
        marginLeft: 20,
        backgroundColor: '#fff',
        marginTop: 20
    },
    myInputContainerStyle: {
        paddingLeft: 10,
        paddingRight: 30,
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

