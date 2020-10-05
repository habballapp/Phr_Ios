import React from 'react';
import { StatusBar, Platform } from 'react-native';

export const Statusbar = (props) => {
    const {
        backgroundColor,
        barStyle
    } = props;
    return (
        <StatusBar
            animated={true}
            backgroundColor={backgroundColor ? backgroundColor : '#fff'}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : barStyle } />
    )
}