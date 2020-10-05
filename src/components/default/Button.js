import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Textview } from './index';

export const Button = (props) => {

    const {
        onPress,
        textStyle,
        title,
        style
    } = props;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={style}>
            {props.children}
            {title != null ? <Textview textStyle={textStyle} text={title} /> : null}
        </TouchableOpacity>
    );
}
