import React from 'react'
import { KeyboardAvoidingView } from "react-native";

export const KeyboardAvoidView = (props) => {
    return (
        <KeyboardAvoidingView behavior="position">
            {props.children}
        </KeyboardAvoidingView>
    )
}