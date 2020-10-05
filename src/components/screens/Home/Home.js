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
} from '../../default';
import {Logintag} from '../Login/LoginTag';
import {styles} from '../Login/login_styles';
import {Header, Title} from 'native-base';
import Menu, {MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {Platform} from 'react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => {
    let drawerLabel = 'Home';
    let drawerIcon = (
      <Icon
        name={Platform.OS == 'ios' ? 'ios-home' : 'md-home'}
        style={{color: 'red'}}
        size={20}
      />
    );
    let Header = null;
    return {drawerLabel, drawerIcon, Header};
  };

  async componentDidMount() {
    Icon.loadFont();
    FontAwesome.loadFont();
    MaterialCommunityIcons.loadFont();
    Feather.loadFont();
  }
  render() {
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
            Dashboard
          </Title>
        </Container>

        <Scrollview
          style={{
            backgroundColor: '#FFFFFF',
            marginTop: 50,
          }}>
          <Container
            ContainerStyle={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                marginRight: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Me')}>
              <FontAwesome
                name="user"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Me
              </Title>
            </Button>

            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('HealthBio')}>
              <MaterialCommunityIcons
                name="dna"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Health Bio
              </Title>
            </Button>
          </Container>

          <Container
            ContainerStyle={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                marginRight: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Medication')}>
              <MaterialCommunityIcons
                name="medical-bag"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Medication
              </Title>
            </Button>

            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Symptoms')}>
              <FontAwesome
                name="clipboard"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  marginRight: 10,
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Symptoms
              </Title>
            </Button>
          </Container>

          <Container
            ContainerStyle={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                marginRight: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Providers')}>
              <MaterialCommunityIcons
                name="hospital-marker"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Providers
              </Title>
            </Button>

            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Reminders')}>
              <MaterialCommunityIcons
                name="bell-ring"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  marginRight: 10,
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Reminders
              </Title>
            </Button>
          </Container>

          <Container
            ContainerStyle={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                marginRight: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Payments')}>
              <FontAwesome
                name="credit-card"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Payments
              </Title>
            </Button>

            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Search')}>
              <FontAwesome
                name="search"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  marginRight: 10,
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Search
              </Title>
            </Button>
          </Container>

          <Container
            ContainerStyle={{
              flexDirection: 'row',
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                marginRight: 20,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.props.navigation.navigate('ViewEmergency')}>
              <Feather
                name="phone-call"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 10,
                  fontWeight: 'bold',
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Emergency
              </Title>
            </Button>

            <Button
              textStyle={styles.loginButtonText}
              style={{
                shadowColor: 'rgba(46, 229, 157, 0.4)',
                shadowOpacity: 1.5,
                elevation: 8,
                shadowRadius: 20,
                shadowOffset: {width: 1, height: 13},
                color: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: 'black',
                backgroundColor: '#ffffff',
                height: 180,
                width: 140,
                alignSelf: 'center',
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="md-help-circle"
                style={{color: '#653dd6', padding: 10, alignSelf: 'center'}}
                size={60}
                color="#ffffff"
              />
              <Title
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginLeft: 5,
                  marginRight: 10,
                  borderBottomWidth: 2,
                  paddingBottom: 2,
                }}>
                Help
              </Title>
            </Button>
          </Container>

          <Container ContainerStyle={{padding: 10}}></Container>
        </Scrollview>
      </Container>
    );
  }
}
