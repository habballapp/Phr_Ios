import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Textview,
  Scrollview,
  Input,
  Button,
  SafeViewArea,
  Statusbar,
} from '../../default';
import {StackNavigator} from 'react-navigation';
import {styles} from '../Login/login_styles';
import {Header, Title} from 'native-base';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
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
import RNPickerSelect from 'react-native-picker-select';

export default class PersonalDetails extends Component {
  fieldNameRef = React.createRef();
  fieldAddressRef = React.createRef();
  fieldPhoneRef = React.createRef();
  fieldEmailRef = React.createRef();
  fieldMaritalStatusRef = React.createRef();
  fieldEContactRef = React.createRef();
  fieldEAddressRef = React.createRef();

  constructor(props) {
    super(props);
    this._onUserCreation = this._onUserCreation.bind(this);
    this.state = {
      date: '2016-05-15',
      Name: '',
      Contact: '',
      dob: '',
      Email: '',
      Haddress: '',
      Eaddress: '',
      Econtact: '',
      Mstatus: '',
      Gender: '',
      value: '',
      errorFieldName: '',
      errorFieldAddress: '',
      errorFieldPhone: '',
      errorFieldEmail: '',
      errorFieldMaritalStatus: '',
      errorFieldEContact: '',
      errorFieldEAddress: '',
      isLoading: false,
      timePassed: false,
    };
  }

  // formatText = (text) => {
  //     return text.replace(/[^+\d]/g, '');
  // };

  // onSubmit = () => {
  //     let { current: field } = this.fieldRef;

  //     console.log(field.value());
  // };

  _onUserCreation = () => {
    this.props.navigation.navigate('Me');
  };

  saveData() {
    const that = this;
    var error = false;
    if (this.state.Name == '') {
      this.setState({errorFieldName: 'Please enter your name'});
      error = true;
      // return;
    }
    if (this.state.Haddress == '') {
      this.setState({errorFieldAddress: 'Please enter your Home Address'});
      error = true;
      // return;
    }
    if (this.state.Contact == '') {
      this.setState({errorFieldPhone: 'Please enter your Phone Number'});
      error = true;
      // return;
    }
    if (this.state.date == '2016-05-15') {
      Toast.show('Please enter your Date of Birth');
      error = true;
      // return;
    }
    if (this.state.Email == '') {
      this.setState({errorFieldEmail: 'Please enter your Email'});
      error = true;
      // return;
    }
    if (this.state.Mstatus == '') {
      this.setState({
        errorFieldMaritalStatus: 'Please enter your Marital Status',
      });
      error = true;
      // return;
    }
    if (this.state.value == '') {
      Toast.show('Please select your Gender');
      error = true;
      // return;
    }
    if (this.state.Econtact == '') {
      this.setState({errorFieldEContact: 'Please enter Emergency Contact'});
      error = true;
      // return;
    }
    if (this.state.Eaddress == '') {
      this.setState({errorFieldEAddress: 'Please enter Emergency Address'});
      error = true;
      // return;
    }
    if (error) {
      return;
    }

    this.setState({isLoading: true});

    userUID = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref('Register_User/' + userUID + '/Bio')
      .set({
        B_Name: this.state.Name,
        B_dob: this.state.date,
        B_Phoneno: this.state.Contact,
        B_HomeAddress: this.state.Haddress,
        B_Email: this.state.Email,
        B_MaritalStatus: this.state.Mstatus,
        B_Gender: this.state.value,
        B_EmergencyContNo: this.state.Econtact,
        B_EmergencyAddress: this.state.Eaddress,
      })
      .catch((err) => {})
      .then(() => {
        this.setState({isLoading: false});
        this._onUserCreation();
      });
  }

  navigateToMe() {
    this.props.navigation.navigate('Me');
  }

  render() {
    if (this.state.isLoading == true) {
      return (
        <ActivityIndicator
          size="large"
          color="#653dd6"
          style={style.activityIndicator}
        />
      );
    } else {
      return (
        <Container
          ContainerStyle={{
            flex: 1,
            backgroundColor: '#FFFFFF',
          }}>
          <Container
            ContainerStyle={{
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.openDrawer();
              }}>
              <FontAwesome
                name="bars"
                style={{
                  color: '#000000',
                  padding: 10,
                  marginRight: 10,
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                size={22}
                color="#ffffff"
              />
            </TouchableOpacity>

            <Title
              style={{
                alignSelf: 'center',
                color: '#000000',
                marginLeft: 10,
                marginRight: 10,
                marginTop: -50,
                borderBottomWidth: 5,
                paddingBottom: 4,
              }}>
              Personal Details
            </Title>
          </Container>

          <SafeViewArea style={{flex: 1}}>
            <Scrollview>
              <Container
                ContainerStyle={
                  (styles.formContainer,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                  })
                }>
                <Container
                  ContainerStyle={{
                    marginTop: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder="Name"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Name: event })
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
                    label={'Name'}
                    error={this.state.errorFieldName}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Name: event});
                    }}
                    ref={this.fieldNameRef}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder="Home Address"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Haddress: event })
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
                    label={'Home Address'}
                    error={this.state.errorFieldAddress}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Haddress: event});
                    }}
                    ref={this.fieldAddressRef}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder="Phone Number"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Contact: event })
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
                    label={'Phone Number'}
                    keyboardType="numeric"
                    error={this.state.errorFieldPhone}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Contact: event});
                    }}
                    ref={this.fieldPhoneRef}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '90%',
                    marginTop: 30,
                  }}>
                  <Textview
                    textStyle={{width: '20%', fontSize: 18, color: '#767981'}}>
                    D.O.B:
                  </Textview>
                  <DatePicker
                    style={{
                      width: 250,
                      borderColor: '#653dd6',
                      borderWidth: 1,
                      marginTop: 20,
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1900-05-01"
                    maxDate="2025-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateInput: {
                        marginLeft: 30,
                      },
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },

                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                      this.setState({date: date});
                    }}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder="Email"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Email: event })
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
                    label={'Email'}
                    error={this.state.errorFieldEmail}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Email: event});
                    }}
                    ref={this.fieldEmailRef}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder="Marital Status"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Mstatus: event })
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
                    label={'Marital Status'}
                    error={this.state.errorFieldMaritalStatus}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Mstatus: event});
                    }}
                    ref={this.fieldMaritalStatusRef}
                  />
                </Container>

                <Container
                  ContainerStyle={{
                    marginTop: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '85%',
                    marginRight: 5,
                  }}>
                  <Textview
                    textStyle={{width: '25%', fontSize: 18, color: '#767981'}}>
                    Gender:
                  </Textview>

                  {/* <Picker
                                        selectedValue={this.state.value}
                                        style={{ height: 50, width: '100%', borderColor: '#653dd6', borderWidth: 1, color: '#767981' }}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ value: itemValue })
                                        }>
                                        <Picker.Item label="Please select Category" value="" disabled />
                                        <Picker.Item label="Male" value="Male" />
                                        <Picker.Item label="Female" value="Female" />


                                    </Picker> */}
                  <Container
                    ContainerStyle={{
                      backgroundColor: 'white',
                      width: '70%',
                      marginTop: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      paddingLeft: 50,
                      paddingRight: 50,
                      borderColor: ' rgba(158, 150, 150, .5)',
                    }}>
                    {/* <Picker
                                                selectedValue={this.state.value}
                                                style={{ height: 50, width: '100%', borderColor: '#653dd6', borderWidth: 1, color: '#767981' }}
                                                onValueChange={(itemValue, itemIndex) => {

                                                    this.setState({ value: itemValue })
                                                }
                                                }>
                                                <Picker.Item label="Select Category" value="" disabled />
                                                {serviceItems} */}
                    {/* <Picker.Item label={this.state.data[0].category} value={this.state.data[0].category}/> */}
                    {/* </Picker> */}

                    <RNPickerSelect
                      style={{
                        padding: 10,
                        alignSelf: 'center',
                        fontSize: 20,
                      }}
                      onValueChange={(value) => this.setState({value: value})}
                      value={this.state.value}
                      items={[
                        {label: 'Male', value: 'Male'},
                        {label: 'Female', value: 'Female'},
                      ]}
                    />
                  </Container>
                </Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder=" Emergency Contact No"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Econtact: event })
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
                    label={'Emergency Contact No'}
                    keyboardType="numeric"
                    error={this.state.errorFieldEContact}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Econtact: event});
                    }}
                    ref={this.fieldEContactRef}
                  />
                </Container>

                <Container ContainerStyle={{padding: 7}}></Container>

                <Container
                  ContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  {/* <Input
                                    placeholder=" Emergency Address"
                                    placeholderTextColor="#767981"
                                    returnKeyType={"next"}
                                    inputStyle={style.input}
                                    onChangeText={(event) => {
                                        this.setState({ Eaddress: event })
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
                    label={'Emergency Address'}
                    error={this.state.errorFieldEAddress}
                    containerStyle={style.myContainerStyle}
                    inputContainerStyle={style.myInputContainerStyle}
                    labelTextStyle={style.myLabelTextStyle}
                    onChangeText={(event) => {
                      this.setState({Eaddress: event});
                    }}
                    ref={this.fieldEAddressRef}
                  />
                </Container>

                <Container ContainerStyle={{padding: 7}}></Container>
              </Container>
              <Button
                styles={{marginTop: 20}}
                onPress={() => {
                  this.saveData();
                }}
                title="Submit"
                style={style.loginButtonStyles1}
                textStyle={styles.insuranceButtonText}></Button>
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
    margin: 10,
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
    backgroundColor: '#FFFFFF',
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
    marginRight: 20,
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
    marginLeft: 20,
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
    marginTop: 30,
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
    borderWidth: 1,
  },
  myContainerStyle: {
    width: '100%',
    height: 70,
    marginLeft: 20,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  myInputContainerStyle: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  myLabelTextStyle: {
    color: '#767981',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
