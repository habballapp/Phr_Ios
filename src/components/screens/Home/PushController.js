import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component {
  async componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        if(notification.action == 'Confirm'){
            console.log("Notification Confirmed Pressed..",notification.action)
        }
      },
      popInitialNotification: true,
    });
  }

  render() {
    return null;
  }
}