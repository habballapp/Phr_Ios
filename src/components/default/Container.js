import React from 'react';
import { View } from 'react-native';

export const Container = (props) => {
    const {
        ContainerStyle
    } = props;
    return (
        <View style={ContainerStyle}>
            {props.children}
        </View>
    )
}