import React from 'react';
import { TextInput } from 'react-native';

export const Input = (props) => {
    const {
        placeholder, 
        placeholderTextColor,
        keyboardType,
        returnKeyType,
        blurOnSubmit,
        onChangeText,
        secureTextEntry,
        inputStyle,
        value,
        editable,
        dense,
        multiline,
        numberOfLines
    } = props;

    return(
        <TextInput 
        style={ inputStyle }
        placeholder = {placeholder}
        placeholderTextColor = {placeholderTextColor}
        keyboardType = {keyboardType}
        defaultValue={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        returnKeyType = {returnKeyType}
        blurOnSubmit = {blurOnSubmit}
        onChangeText = {onChangeText}
        secureTextEntry = {secureTextEntry}
        editable = {editable}
        dense={dense}/>
    );
}
