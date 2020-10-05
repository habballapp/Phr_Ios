import React from 'react';
import { SafeAreaView } from "react-native";

export const SafeViewArea = (props) => {
    return (
        <SafeAreaView style={props.style}>
            {props.children}
        </SafeAreaView>
    )
}