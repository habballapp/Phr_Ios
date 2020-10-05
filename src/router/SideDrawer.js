import React from 'react';
import {View, Text, Dimensions, Platform} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import AppLogo from '../assets/logo.png';
import {
  Container,
  Scrollview,
  ImageView,
  Textview,
} from '../components/default';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LOGIN_CHECK} from '../constants/StorageConstans';

const {width} = Dimensions.get('window');
const CustomHeaderContentComponent = (props) => {
  const logout = () => {
    AsyncStorage.setItem(LOGIN_CHECK, 'false')
      .then(() => {
        props.navigation.navigate('Login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const screenHeight = Dimensions.get('window').height;
  return (
    <View>
      <Scrollview contentContainerStyle={{flexGrow: 1}}>
        <Container
          ContainerStyle={{
            justifyContent: 'center',
            alignSelf: 'center',
            padding: 20,
            marginTop: 15,
          }}>
          <ImageView
            resizeMode="center"
            imageStyle={styles.appLogo}
            imgSource={AppLogo}
          />
          <Textview
            textStyle={{
              fontSize: 26,
              color: 'black',
              fontWeight: 'bold',
              alignSelf: 'center',
            }}
            text={global.urgentname}
          />
        </Container>
        <Container
          ContainerStyle={{
            backgroundColor: '#FFFFFF',
          }}>
          {/* <Container ContainerStyle={{
                        backgroundColor: '#FFFFFF', flexDirection: 'row'
                    }}>

                        <FontAwesome5 name="wallet" style={{ paddingLeft: 15, paddingRight: 15, marginLeft: 5 }} size={22} color="#653dd6" />
                        <Text style={{
                            color: '#000000', marginLeft: 20, fontWeight: 'bold'
                        }}>Wallet</Text>
                        <Text style={{
                            color: '#000000', alignSelf: 'flex-end', marginLeft: '40%'
                        }}>$50</Text>

                    </Container> */}
          <DrawerItems {...props} activeTintColor="#653dd6" />
          <Container
            ContainerStyle={{
              backgroundColor: '#FFFFFF',
              marginBottom: 100,
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => {
                logout();
              }}>
              <FontAwesome
                name="sign-out"
                style={{paddingLeft: 15, paddingRight: 15, marginLeft: 5}}
                size={22}
                color="#653dd6"
              />
              <Text
                style={{
                  color: '#000000',
                  marginLeft: 20,
                  fontWeight: 'bold',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </Container>
        </Container>
      </Scrollview>
    </View>
  );
};

const styles = {
  headerUserTextStyle: {
    color: 'white',
    fontSize: 24,
    position: 'absolute',
    bottom: 1,
    alignSelf: 'center',
  },
  headerContainerStyle: {
    height: 120,
    backgroundColor: '#0080ff',
  },
  appLogo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
};

export const DrawerNavigationConfig = {
  drawerWidth: width / 1.3,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: CustomHeaderContentComponent,
};
