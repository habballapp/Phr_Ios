import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from "react-native";
import firebase from 'react-native-firebase'
import { Container, Textview, Scrollview, Input, Button, SafeViewArea } from '../../default';
import { Logintag } from '../Login/LoginTag';
import { StackNavigator } from 'react-navigation';
import { styles } from '../Login/login_styles';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGIN_CHECK } from "../../../constants/StorageConstans";


var errorEmail = '';
var errorPass = '';


export default class Register extends Component {

    constructor(props) {
        super(props);
        this._onUserCreation = this._onUserCreation.bind(this)
        this.state = {
            email: '',
            password: '',
            name: '',
            mo_number: '',
            loading: false,
            isLoading: false


        }
    }

    _onUserCreation = () => { this.props.navigation.navigate('Me') };


    onLoginPressed() {
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const that = this;
        const { email, password } = this.state;


        if (this.state.email != '' && this.state.password != '' && this.state.name != '' && this.state.mo_number != '') {
            this.setState({ isLoading: true })
            if (email != '' && password != '') {

                if (reg.test(email) != false && password.length > 5) {
                    firebase.auth().createUserWithEmailAndPassword(that.state.email, that.state.password)
                        .then(function (user) {
                            console.log(user)
                            var userId = firebase.auth().currentUser.uid;
                            firebase.database().ref('Register_User/').child(userId).set({
                                username: that.state.name,
                                useremail: that.state.email,
                                userpassword: that.state.password,
                                mo_number: that.state.number

                            }).then(() => {
                                that.setState({ loading: false }, () => {
                                    AsyncStorage.setItem(LOGIN_CHECK, 'true').then(() => {
                                       
                                        that.props.navigation.navigate("HomeScreen")
                                    });
                                })
                            }).catch(() => {
                                    that.setState({ isLoading: false })
                                    // Snackbar.show({
                                    //     text: 'Email Address Already Registered',
                                    //     duration: Snackbar.LENGTH_INDEFINITE,
                                    //     action: {
                                    //         text: 'OK',
                                    //         textColor: 'green',
                                    //         onPress: () => { Snackbar.dismiss() },
                                    //     },
                                    // });
                                })
                        }).catch(function (error) {

                            that.setState({ isLoading: false })
                            Snackbar.show({
                                text: 'Email Address Already Registered',
                                duration: Snackbar.LENGTH_INDEFINITE,
                                action: {
                                    text: 'OK',
                                    textColor: 'green',
                                    onPress: () => { Snackbar.dismiss() },
                                },
                            });
                        })
                }
                else {
                    this.setState({ isLoading: false })
                    if (reg.test(email) == false) {
                        Snackbar.show({
                            text: 'Email badly formatted',
                            duration: Snackbar.LENGTH_INDEFINITE,
                            action: {
                                text: 'OK',
                                textColor: 'green',
                                onPress: () => { Snackbar.dismiss() },
                            },
                        });
                        //     errorEmail = "";
                    }
                    if (password.length < 5) {
                        Snackbar.show({
                            text: 'Password badly formatted',
                            duration: Snackbar.LENGTH_INDEFINITE,
                            action: {
                                text: 'OK',
                                textColor: 'green',
                                onPress: () => { Snackbar.dismiss() },
                            },
                        });

                        //     errorPass = "Password badly formatted";
                    }
                }
            }
        }
        else {
            this.setState({ isLoading: false })
            Snackbar.show({
                text: 'Please enter all required Fields.',
                duration: Snackbar.LENGTH_INDEFINITE,
                action: {
                    text: 'OK',
                    textColor: 'green',
                    onPress: () => { Snackbar.dismiss() },
                },
            });
        }
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
                    <SafeViewArea style={{ height: '100%' }}>

                        <Scrollview style={{ height: '100%' }}>
                            <Logintag />

                            <Container ContainerStyle={styles.formContainer}>

                                <Input
                                    placeholder="Username"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={styles.input}
                                    onChangeText={(event) => {
                                        this.setState({ name: event })
                                        errorEmail = ''
                                    }}

                                />

                                <Input
                                    placeholder="Email"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={styles.input}
                                    onChangeText={(event) => {
                                        this.setState({ email: event })
                                        errorEmail = ''
                                    }}

                                />

                                <Input
                                    placeholder="Phone No"
                                    placeholderTextColor="#000"
                                    returnKeyType={"next"}
                                    inputStyle={styles.input}
                                    keyboardType='numeric'
                                    onChangeText={(event) => {
                                        this.setState({ mo_number: event })
                                        errorEmail = ''
                                    }}

                                />

                                <Container ContainerStyle={{ padding: 5 }}></Container>

                                <Container style={{ flexDirection: 'row' }}>

                                </Container>


                                <Input
                                    placeholder="Password"
                                    placeholderTextColor="#000"
                                    secureTextEntry={true}
                                    returnKeyType={"next"}
                                    inputStyle={styles.input}
                                    onChangeText={(event) => {
                                        this.setState({ password: event })
                                        errorPass = ''
                                    }}


                                />


                                <Container ContainerStyle={{ padding: 7 }}></Container>
                                <Button

                                    onPress={() => { this.onLoginPressed() }}
                                    title="Sign Up" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />

                            </Container>

                        </Scrollview>
                    </SafeViewArea>

                    <Container ContainerStyle={{
                        alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10,
                        position: 'absolute', bottom: 20
                    }}>
                        <Textview style={styles.loginButtonText}>

                        </Textview>
                    </Container>

                </Container>

            );
        }
    }
}

const style = StyleSheet.create({

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }


});

