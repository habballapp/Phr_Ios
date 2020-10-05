// importing navigation routers from react navigation;
import {createSwitchNavigator} from 'react-navigation';
// importing navigation options and header props for  different screens
import {NonHeaderProps} from './HeaderProps';
// importing different screen layouts
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {Platform} from 'react-native';

// importing side drawer component props
import {DrawerNavigationConfig} from './SideDrawer';

import Home from '../components/screens/Home/Home';
import Login from '../components/screens/Login/Login';
import Register from '../components/screens/Register/Register';
import InsurancePlan from '../components/screens/InsurancePlan/Insurance';
import CareProviders from '../components/screens/CareProviders/CareProviders';
import CurrentMedicine from '../components/screens/CurrentMedicine/CurrentMedicine';
import PersonalDetails from '../components/screens/Personal Details/PersonalDetails';
import VitalSign from '../components/screens/VitalSign/VitalSign';
import AddVital from '../components/screens/AddVital/AddVital';
import AddProvider from '../components/screens/AddProvider/AddProvider';
import AddInsurance from '../components/screens/Add Insurance/AddInsurance';
import Me from '../components/screens/Me/Me';
import HealtInfoBio from '../components/screens/Personal Details/HealthInfoBio';
import PersonalHistory from '../components/screens/Personal Details/PersonalHistory';
import HealthBio from '../components/screens/Health Bio/HealthBio';
import AddAllergies from '../components/screens/AddAllergies/AddAllergies';
import Medication from '../components/screens/Medication/Medication';
import AddMedicine from '../components/screens/Medication/AddMedicine';
import Symptoms from '../components/screens/Symptoms&Tests/Symptoms';
import Providers from '../components/screens/CareProviders/Providers';
import AddSurgeries from '../components/screens/Health Bio/AddSurgeries';
import AddSymptoms from '../components/screens/Symptoms&Tests/AddSymptoms';
import AddDoctors from '../components/screens/CareProviders/AddDoctors';
import AddOtherProviders from '../components/screens/CareProviders/AddOtherProviders';
import Reminders from '../components/screens/Reminders/Reminders';
import AddReminders from '../components/screens/Reminders/AddReminders';
import Payments from '../components/screens/Payments/Payments';
import Search from '../components/screens/Search/Search';
import StartScreen from '../components/screens/StartScreen/StartScreen';
import ViewEmergency from '../components/screens/EmergencyContact/ViewEmergency';
import AddEmergency from '../components/screens/EmergencyContact/AddEmergency';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
const LoginStackScreen = createStackNavigator({
  StartScreen: {
    screen: StartScreen,
    navigationOptions: NonHeaderProps,
  },
  Login: {
    screen: Login,
    navigationOptions: NonHeaderProps,
  },
  Register: {
    screen: Register,
    navigationOptions: NonHeaderProps,
  },
});

const ApplicationStackScreen = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: NonHeaderProps,
  },
  Home1: {
    screen: Home,
    navigationOptions: NonHeaderProps,
  },
  HealthBio: {
    screen: HealthBio,
    navigationOptions: NonHeaderProps,
  },
  AddAllergies: {
    screen: AddAllergies,
    navigationOptions: NonHeaderProps,
  },
  InsurancePlan: {
    screen: InsurancePlan,
    navigationOptions: NonHeaderProps,
  },
  AddInsurance: {
    screen: AddInsurance,
    navigationOptions: NonHeaderProps,
  },
  Search: {
    screen: Search,
    navigationOptions: NonHeaderProps,
  },
  AddSurgeries: {
    screen: AddSurgeries,
    navigationOptions: NonHeaderProps,
  },
  Payments: {
    screen: Payments,
    navigationOptions: NonHeaderProps,
  },
  AddDoctors: {
    screen: AddDoctors,
    navigationOptions: NonHeaderProps,
  },
  Reminders: {
    screen: Reminders,
    navigationOptions: NonHeaderProps,
  },
  AddReminders: {
    screen: AddReminders,
    navigationOptions: NonHeaderProps,
  },
  AddOtherProviders: {
    screen: AddOtherProviders,
    navigationOptions: NonHeaderProps,
  },
  AddSymptoms: {
    screen: AddSymptoms,
    navigationOptions: NonHeaderProps,
  },
  Medication: {
    screen: Medication,
    navigationOptions: NonHeaderProps,
  },
  AddMedicine: {
    screen: AddMedicine,
    navigationOptions: NonHeaderProps,
  },
  Symptoms: {
    screen: Symptoms,
    navigationOptions: NonHeaderProps,
  },
  CareProviders: {
    screen: CareProviders,
    navigationOptions: NonHeaderProps,
  },
  Providers: {
    screen: Providers,
    navigationOptions: NonHeaderProps,
  },
  AddProvider: {
    screen: AddProvider,
    navigationOptions: NonHeaderProps,
  },
  CurrentMedicine: {
    screen: CurrentMedicine,
    navigationOptions: NonHeaderProps,
  },

  PersonalDetails: {
    screen: PersonalDetails,
    navigationOptions: NonHeaderProps,
  },
  Me: {
    screen: Me,
    navigationOptions: NonHeaderProps,
  },
  HealtInfoBio: {
    screen: HealtInfoBio,
    navigationOptions: NonHeaderProps,
  },
  VitalSign: {
    screen: VitalSign,
    navigationOptions: NonHeaderProps,
  },
  AddVital: {
    screen: AddVital,
    navigationOptions: NonHeaderProps,
  },
  PersonalHistory: {
    screen: PersonalHistory,
    navigationOptions: NonHeaderProps,
  },
  ViewEmergency: {
    screen: ViewEmergency,
    navigationOptions: NonHeaderProps,
  },
  AddEmergency: {
    screen: AddEmergency,
    navigationOptions: NonHeaderProps,
  },
});

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const Drawer = createDrawerNavigator(
  {
    Wallet: {
      screen: ApplicationStackScreen,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <FontAwesome
            name={Platform.OS == 'ios' ? 'wallet' : 'wallet'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Home: {
      screen: Home,
      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Icon
            name={Platform.OS == 'ios' ? 'md-home' : 'md-home'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Me: {
      screen: Me,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <FontAwesome
            name={Platform.OS == 'ios' ? 'user' : 'user'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },

    'Health Bio': {
      screen: HealthBio,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name={Platform.OS == 'ios' ? 'dna' : 'dna'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Medication: {
      screen: Medication,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name={Platform.OS == 'ios' ? 'medical-bag' : 'medical-bag'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Providers: {
      screen: Providers,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name={Platform.OS == 'ios' ? 'hospital-marker' : 'hospital-marker'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    'Symptoms and Tests': {
      screen: Symptoms,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <FontAwesome
            name={Platform.OS == 'ios' ? 'clipboard' : 'clipboard'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Reminder: {
      screen: Reminders,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name={Platform.OS == 'ios' ? 'bell-ring' : 'bell-ring'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Payments: {
      screen: Payments,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Feather
            name={Platform.OS == 'ios' ? 'credit-card' : 'credit-card'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    'Emergency Contact': {
      screen: ViewEmergency,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <Feather
            name={Platform.OS == 'ios' ? 'phone-call' : 'phone-call'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
    Search: {
      screen: Search,

      navigationOptions: {
        drawerIcon: ({tintColor}) => (
          <FontAwesome
            name={Platform.OS == 'ios' ? 'search' : 'search'}
            style={{color: '#653dd6'}}
            size={20}
          />
        ),
      },
    },
  },
  DrawerNavigationConfig,
);

export const createRootNavigator = (signedIn) => {
  return createSwitchNavigator(
    {
      HomeScreen: {
        screen: Drawer,
        // screen: PersonalDetails,
      },
      Login: {
        screen: LoginStackScreen,
      },
    },
    {
      initialRouteName:
        signedIn === 'GOTOLOGIN'
          ? 'Login'
          : signedIn === 'GOTOHOME'
          ? 'HomeScreen'
          : null,
    },
  );
};
