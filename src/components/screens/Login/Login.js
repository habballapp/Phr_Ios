import React, { Component } from 'react'
import { StyleSheet, View,TouchableOpacity,ActivityIndicator } from "react-native";
import firebase from 'react-native-firebase'
import { Container, Textview, Scrollview, Input, Button, SafeViewArea } from '../../default';
import { Logintag } from './LoginTag';
import { StackNavigator } from 'react-navigation';
import { styles } from './login_styles';
import Snackbar from 'react-native-snackbar';
import Toast from 'react-native-simple-toast';
import { LOGIN_CHECK } from "../../../constants/StorageConstans";
import AsyncStorage from '@react-native-community/async-storage';

var errorEmail = '';
var errorPass = '';


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            isLoading: false

        }
    }

    onLoginPressed(){
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        const {email,password} = this.state;
        if(email != '' && password != ''){
            this.setState({isLoading:true})
            if(email != '' && password != ''){
               
                if(reg.test(email) != false && password.length > 5 ){
                    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
                        this.setState({loading:false},()=>{
                            AsyncStorage.setItem(LOGIN_CHECK, 'true').then(()=>{
                               
                                this.props.navigation.navigate("HomeScreen")
                            });    
                        })
                    }).catch(()=>{
                        
                        this.setState({isLoading:false})
                        Snackbar.show({
                            text: 'Invalid Email or Password combination',
                            duration: Snackbar.LENGTH_INDEFINITE,    
                            action: {
                                text: 'OK',
                                textColor: 'green',
                                onPress: () => { Snackbar.dismiss() },
                            },
                        });
                    })
                }
                else{
                    this.setState({isLoading:false})
    
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
        else{
            this.setState({isLoading:false})
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
                                placeholder="Email"
                                placeholderTextColor="#000"
                                keyboardType="email-address"
                                returnKeyType={"next"}
                                inputStyle={styles.input}
                                onChangeText={(event) => {
                                    this.setState({email:event})
                                    errorEmail = ''
                                }}

                            />

                            <Container ContainerStyle={{ padding: 5 }}></Container>

                            <Container  style={{flexDirection: 'row'}}>

                            </Container>


                            <Input
                                placeholder="Password"
                                placeholderTextColor="#000"
                                secureTextEntry={true}
                                returnKeyType={"next"}
                                inputStyle={styles.input}
                                onChangeText={(event) => {
                                    this.setState({password:event})
                                    errorPass = ''
                                }}


                            />


                            <Container ContainerStyle={{ padding: 7 }}></Container>
                            <Button
    
                            onPress={()=>{this.onLoginPressed()}}
                            title="Login" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} />

                        </Container>

                    </Scrollview>
                </SafeViewArea>

               
                <Container ContainerStyle={{
                    alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10,
                    position: 'absolute', bottom: 20
                }}>
                      <TouchableOpacity
                      onPress={() =>this.props.navigation.navigate("Register")}
                      >
                    <Textview
                    
                    style={styles.loginButtonText}>
                        Not Registered Yet? Register Now
                            </Textview>

                            </TouchableOpacity>
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



