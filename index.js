import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {YellowBox} from 'react-native';
import App from './src/navigator/navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

Icon.loadFont();
FontAwesome.loadFont();
MaterialCommunityIcons.loadFont();
Feather.loadFont();

YellowBox.ignoreWarnings(['ViewPagerAndroid']);
YellowBox.ignoreWarnings(['Async Storage']);

AppRegistry.registerComponent(appName, () => App);
