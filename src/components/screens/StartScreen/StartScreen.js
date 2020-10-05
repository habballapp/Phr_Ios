import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Textview,
  Scrollview,
  Input,
  Button,
  SafeViewArea,
  Statusbar,
  ImageView,
} from '../../default';
import {Logintag} from '../Login/LoginTag';
import {Header, Title} from 'native-base';
import Menu, {MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppLogo from '../../../assets/logo1.png';
import DoctorLogo from '../../../assets/logo2.png';

export default class Home extends Component {
  render() {
    const {appLogo, loginTagContainer, loginTagContainer1} = styles;
    return (
      <Container
        ContainerStyle={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <Container ContainerStyle={loginTagContainer}>
          <ImageView
            resizeMode="center"
            imageStyle={appLogo}
            imgSource={AppLogo}
          />
        </Container>

        <Container ContainerStyle={loginTagContainer1}>
          <ImageView
            resizeMode="center"
            imageStyle={appLogo}
            imgSource={DoctorLogo}
          />

          <Container ContainerStyle={{marginLeft: 40, marginRight: 40}}>
            <Button
              title="Log In"
              textStyle={styles.loginButtonText1}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: '#6fd355',
                backgroundColor: '#3ab54c',
                height: 50,
                width: 160,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Login')}></Button>

            <Button
              title="Create Account"
              style={{
                fontWeight: 'bold',
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: '#6fd355',
                backgroundColor: '#ffffff',
                height: 50,
                width: 160,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                this.props.navigation.navigate('Register')
              }></Button>
          </Container>
        </Container>
      </Container>
    );
  }
}

const styles = {
  loginTagContainer: {
    marginTop: 60,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },
  loginTagContainer1: {
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },
  appLogo: {
    height: 250,
    width: '100%',
  },
  headingOne: {
    fontSize: 24,
    color: 'black',
  },
  headingTwo: {
    fontSize: 16,
    color: 'black',
  },
  loginButtonText1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};
