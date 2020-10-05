import React from 'react';
import { ScrollView } from 'react-native';

export const Scrollview = (props) => {
    const {
        style,
        contentContainerStyle,
        behavior,
        keyboardShouldPersistTaps
    } = props;
    return (
        <ScrollView style={style} 
        contentContainerStyle={contentContainerStyle} 
        behavior={behavior} 
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
            {props.children}
        </ScrollView>
    )
}