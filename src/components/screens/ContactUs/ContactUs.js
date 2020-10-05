import React, {Component} from 'react';
import {Container, Textview, Button} from '../../default';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'react-native-firebase';
import {Platform,ActivityIndicator,Alert,Linking,TouchableOpacity,PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


export default class ContactUs extends Component{
    constructor(props){
        super(props);
        // this.setState({ urgentcareID: global.urgentcareid }).then(function() {
        //     console.log("Contact uS ",urgentcareID)
        //     this.onHomeIconPressed();
        // })
        // this.setState({urgentcareID: global.urgentcareid},()=>{
        //     console.log("Contact uS ",urgentcareID)
        //     this.onHomeIconPressed();
        // });
        this.state = {
            urgentcareID: global.urgentcareid
        }

    }

    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Contact Us';
        let drawerIcon= (                            
            <FontAwesome name="phone" size={20} color="red"/>
            )
        return {drawerLabel, drawerIcon};
    }

componentDidMount(){
    console.log("Contact uS ",this.state.urgentcareID)
    this.onHomeIconPressed();

    // this.setState({ urgentcareID: global.urgentcareid }).then(function() {
    //     console.log("Contact uS ",urgentcareID)
    //     this.onHomeIconPressed();
    // })


    // AsyncStorage.getItem("urgentcareid").then((value) => {
    //     if (value != null) {
    //         console.log("value", value);
    //         this.setState({ urgentcareID: value }).then(function() {
    //             console.log("Contact uS ",urgentcareID)
    //             this.onHomeIconPressed();
    //         })
    //     }     
    // });
   
    
  
}

onHomeIconPressed(){

    let Number_;
    console.log("Contact uS ",this.state.urgentcareID)
    try {
        var dbref = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/`);
    dbref.on("value", (snapshot)=>{
        console.log("pending_data", snapshot._value);
        Number_ = snapshot._value.pnumber
        console.log("pending_data number",Number_);

            
        let phoneNumber = Number_;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${Number_}`;
        }
        else  {
            phoneNumber = `tel:${Number_}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } 
            else {
                return Linking.openURL(phoneNumber);
            }
        })
    })
    } catch (error) {
        
    }
    
   
   
}

    render(){
        return(
            <Container {...this.onHomeIconPressed()}>
                
            </Container>
        )
    }
}