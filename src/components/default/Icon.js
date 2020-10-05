import React from "react";
import AwesomeIcon from "react-native-vector-icons/Ionicons";

export const Icon = (props) => (
    <AwesomeIcon name={props.iconName} size={props.iconSize} color={props.color} style={props.style} />
)