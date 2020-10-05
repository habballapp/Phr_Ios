import React, { Component } from 'react';
import { Container, Textview, Button, Statusbar, Checkbox } from '../../default';
import { Text, StyleSheet, Platform, FlatList, ScrollView, TouchableOpacity, Alert } from 'react-native'

import { Icon, Header, Title } from 'native-base';

import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import CalendarPicker from 'react-native-calendar-picker';
import { UnCheckbox } from '../../default/uncheckbox';
import firebase from 'react-native-firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import TimePicker from "react-native-24h-timepicker";

var appointment_subject;
var app_date;
var app_time;
const today = new Date();
var d = new Date(); // get current date
d.setHours(d.getHours(), d.getMinutes() + 15, 0, 0);



class BookAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedDate: null,
            enableScrollViewScroll: true,
            appointmentSubject: '',
            mode: 'time',
            show: false,
            time: 'Select Appointment Time',
            defaultText: 'Select Appointment Time',
            defaltTime: new Date('2020-06-12T14:42:42'),
            // defaltTime: d,time:d.toLocaleTimeString(),
            urgentcareID: this.props.navigation.getParam('urgentcareID')
        }
        this.onTimeChanged = this.onTimeChanged.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onDonePressed = this.onDonePressed.bind(this);
       
    }
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Book Appointment';
        let drawerIcon = (
            <MaterialCommunityIcons name="calendar-clock" size={20} color="red" />
        )
        return { drawerLabel, drawerIcon };
    }
    onDateChange(date) {
        console.log("DDDDD", date)

        date = moment(date).add(1, 'day');
        date = new Date(date).toUTCString();
        date = date.split(' ').slice(0, 4).join(' ');

        console.log("GGGG", date)

        date = moment(date).format('MM/DD/YYYY');



        console.log("VVV", date)
        this.setState({
            selectedDate: date,
        });
    }
    onCancel() {
        this.TimePicker.close();
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}` });
        console.log("time.. ", this.state.time)
        this.show('time');
        this.TimePicker.close();
    }

    onDonePressed() {


        appointment_subject = this.state.appointmentSubject;
        app_date = this.state.selectedDate;
        app_time = this.state.time;


        console.log("Date..", app_date)



        if (appointment_subject == '' || app_date == null || app_time == 'Select Appointment Time') {

            Alert.alert("Please Enter Missing Fileds.")
        }
        else {
            let key = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/`).child('appointments').push().key;
            console.log("Key.. ", key);
            let userID = firebase.auth().currentUser.uid;
            firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/`).child('appointments').child(key).set({
                time_slot: this.state.time,
                date: this.state.selectedDate.toString(),
                appointment_subject: this.state.appointmentSubject,
                status: 'pending',
                key: key,
                userID: userID
            });
            Alert.alert("Appointment Booked!","Your Appointment has been sent for confirmation. Once your Appointment is confirmed you will be notified")
            this.props.navigation.navigate("Home")
        }

    }
    onTimeChanged = (event, time) => {
        // time = time + 15;
        console.log("time changed picked.. ");
        console.log("time event picked.. ", event);
        console.log("time picked.. ", time);
        console.log("time moment picked.. ", moment(time).format('HH:mm'));
        // this.setState({time: moment(time).add(15,'minutes').format('HH:mm'), show:false})
        this.setState({ time: moment(time).format('HH:mm'), show: false })
        console.log("time.. ", this.state.time)
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
        return (
            <Container ContainerStyle={{ flex: 1 }}>
                <ScrollView scrollEnabled={this.state.enableScrollViewScroll}>
                    <Container ContainerStyle={{ flex: 1 }}>
                        <Header style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', height: 70 }}>
                            <Statusbar
                                translucent
                                backgroundColor='white'
                                barStyle='dark-content'
                            />
                            <TouchableOpacity onPress={() => { this.props.navigation.openDrawer(); }}>
                                <FontAwesome name="bars" size={20} style={{ padding: 10, marginLeft: 10 }} color='#653dd6' />
                            </TouchableOpacity>
                            <Title style={styles.titleStyles}>Book Appointment</Title>
                        </Header>
                    </Container>
                    <Container ContainerStyle={{ borderColor: '#707070', borderWidth: 0.5, width: '90%', alignSelf: 'center', marginTop: 20 }}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Select Issue Type:',
                                value: null,
                            }}
                            onValueChange={(value) => this.setState({ appointmentSubject: value })}
                            items={[
                                { label: 'Abscess incision and drainage', value: 'Abscess incision and drainage' },
                                { label: 'Allergic reactions', value: 'Allergic reaction' },
                                { label: 'Allergies', value: 'Allergies' },
                                { label: 'Asthma', value: 'Asthma' },
                                { label: 'Athlete’s foot/fungus infection', value: 'Athlete’s foot/fungus infection' },
                                { label: 'Bronchitis', value: 'Bronchitis' },
                                { label: 'Burns from heat or chemical exposure', value: 'Burns from heat or chemical exposure' },
                                { label: 'Congestion', value: 'Congestion' },
                                { label: 'Corona Symptoms', value: 'Corona Symptoms' },
                                { label: 'Cough', value: 'Cough' },
                                { label: 'Diaper rash', value: 'Diaper rash' },
                                { label: 'Ear infection', value: 'Ear infection' },
                                { label: 'Earache', value: 'Earache' },
                                { label: 'Eye infection/Pink Eye', value: 'Eye infection/Pink Eye' },
                                { label: 'Fever', value: 'Fever' },
                                { label: 'Flu symptoms', value: 'Flu symptoms' },
                                { label: 'Gastrointestinal disorders', value: 'Gastrointestinal disorders' },
                                { label: 'Insect bites', value: 'Insect bites' },
                                { label: 'Fever', value: 'Fever' },
                                { label: 'Itchy skin', value: 'Itchy skin' },
                                { label: 'Migraine', value: 'Migraine' },
                                { label: 'Nausea', value: 'Nausea' },
                                { label: 'Rashes', value: 'Rashes' },
                                { label: 'Runny nose', value: 'Runny nose' },
                                { label: 'Sinus infection', value: 'Sinus infection' },
                                { label: 'Skin allergy', value: 'Skin allergy' },
                                { label: 'Skin infections', value: 'Skin infections' },
                                { label: 'Sore throat', value: 'Sore throat' },
                                { label: 'STD testing and treatment', value: 'STD testing and treatment' },
                                { label: 'Stomachaches and stomach pains', value: 'Stomachaches and stomach pains' },
                                { label: 'Urinary tract infections', value: 'Urinary tract infections' },
                                { label: 'Wound infection', value: 'Wound infection' },
                            ]}
                        />
                    </Container>


                    <Container ContainerStyle={{ borderColor: '#707070', borderWidth: 0.5, width: '90%', height: 50, alignSelf: 'center', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Container>
                            <TouchableOpacity
                                onPress={() => this.TimePicker.open()}
                                
                            >
                                <Text textStyle={styles.loginButtonText}>
                                    {this.state.time}
                            </Text>
                            </TouchableOpacity>
                           
                        </Container>


                        <TimePicker
                            ref={ref => {
                                this.TimePicker = ref;
                            }}
                            style={{height: '50%'}}
                            minuteInterval={15}
                            onCancel={() => this.onCancel()}
                            onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                        />
                        

                    </Container>
                    <Container ContainerStyle={{ padding: 10, borderColor: '#707070', borderWidth: 0.5, width: '90%',flexWrap: "wrap", alignSelf: 'center', marginTop: 20 }}>
                        <CalendarPicker
                            onDateChange={this.onDateChange}
                            width={420}
                            height={310}
                            minDate={today}



                        />
                    </Container>
                    <Button title="Done" style={styles.loginButtonStyles} textStyle={styles.loginButtonText} onPress={this.onDonePressed} />
                </ScrollView>

                <Container ContainerStyle={{
                    alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10,
                    position: 'absolute', bottom: 0
                }}>
                    <Textview >
                        Powered by Matz Solutions Pvt Ltd Ⓒ
                            </Textview>
                </Container>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        marginTop: 40
    },
    map: {
        height: 200,
        width: 200,
        alignSelf: 'center'
    },
    titleStyles: { fontWeight: 'bold', fontSize: 26, alignSelf: 'center', flex: 1, color: '#EA2626', },
    loginButtonStyles: {
        marginTop: 30,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 50
    },
    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 22
    },
    button: {
        backgroundColor: "#EA2626",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
    }
});
const mapStateToProps = state => {
    return state;
}
export default connect(mapStateToProps)(BookAppointment);