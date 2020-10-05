import GetLocation from 'react-native-get-location';
import firebase from 'react-native-firebase'
import {LOCATION_ACCESSED} from './types'
import { getData } from './getData';

export const getUserLocation = () => {
    return (dispatch) => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
            dispatch({
                type:LOCATION_ACCESSED,
                payload:location
            });
        })
        .catch(error => {
            const { code, message } = error;
        })        
    }
}