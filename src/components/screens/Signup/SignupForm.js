import React, { useState } from "react";
import { Container, Input, Textview } from "../../default";
import { CheckBox, StyleSheet, Platform, Switch, TouchableHighlightBase, TouchableOpacity, Alert } from 'react-native';
import Modal from "react-native-modal";
import { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, CONFIRM_PASS_PLACEHOLDER, FIRST_NAME, LAST_NAME, TERMS_AND_CONDITIONS, SOCIAL_SECURITY_NO } from "../../../res/strings";
import { View } from "native-base";
import { Icon, } from 'native-base';



export const FormOne = (props) => {

    const [icon, setIcon] = useState("eye-off")
    const [hidePassword, setHidePassword] = useState(true)

    _changeIcon = () => {
        icon !== "eye-off"
            ? (setIcon("eye-off"), setHidePassword(true))
            : (setIcon("eye"), setHidePassword(false))
    }

    const { emailChangeHandler, passwordChangeHandler, confirmPasswordHandler } = props;
    return (
        <Container ContainerStyle={styles.formContainer}>
            <Input
                placeholder={EMAIL_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                keyboardType="email-address"
                returnKeyType={"next"}
                blurOnSubmit={true}
                inputStyle={styles.input}
                onChangeText={emailChangeHandler} />
            <Input
                placeholder={PASSWORD_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                secureTextEntry={hidePassword}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={passwordChangeHandler} />

            <Icon style={{ marginTop: -40, alignSelf: 'flex-end' }}
                name={icon} size={20} onPress={() => _changeIcon()}
            />
            <Input
                placeholder={CONFIRM_PASS_PLACEHOLDER}
                placeholderTextColor='rgba(0,0,0,0.7)'
                secureTextEntry={hidePassword}
                returnKeyType={"next"}
                inputStyle={styles.input}
                blurOnSubmit={true}
                onChangeText={confirmPasswordHandler} />

            <Icon style={{ marginTop: -40, alignSelf: 'flex-end' }}
                name={icon} size={20} onPress={() => _changeIcon()}
            />
        </Container>
    )
}



export const FormTwo = (props) => {

    var  urgent_care = global.urgentcare_data.terms.terms;
    
    const { firstNameChangeHandler, lastNameChangeHandler, securityNoChangeHandler, agreementValue, onCheckHandler } = props;
    return (

        <Container ContainerStyle={styles.formContainer}>
            <Container ContainerStyle={styles.formContainer}>


                <Input
                    placeholder={LAST_NAME}
                    placeholderTextColor='rgba(0,0,0,0.7)'
                    returnKeyType={"next"}
                    inputStyle={styles.input}
                    blurOnSubmit={true}
                    onChangeText={lastNameChangeHandler} />
                <Input
                    placeholder={FIRST_NAME}
                    placeholderTextColor='rgba(0,0,0,0.7)'
                    returnKeyType={"next"}
                    blurOnSubmit={true}
                    inputStyle={styles.input}
                    onChangeText={firstNameChangeHandler} />

                <Input
                    placeholder={SOCIAL_SECURITY_NO}
                    placeholderTextColor='rgba(0,0,0,0.7)'
                    returnKeyType={"next"}
                    blurOnSubmit={true}
                    keyboardType="number-pad"
                    inputStyle={styles.input}
                    onChangeText={securityNoChangeHandler} />

            </Container>

            <Container ContainerStyle={styles.agreementsContainer}>
                {Platform.OS === 'android' ? (
                    <CheckBox onValueChange={onCheckHandler} value={agreementValue} />
                ) : (
                        <Switch onValueChange={onCheckHandler} value={agreementValue} />
                    )}
                <TouchableOpacity
                    onPress={() => Alert.alert("TERMS AND CONDITIONS",urgent_care)}

                >
                    <Textview text={TERMS_AND_CONDITIONS} textStyle={styles.termsConditionText} />
                </TouchableOpacity>
            </Container>


        </Container>



    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: 5,
        marginLeft: 30,
        marginRight: 30



    },
    input: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.5)',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: '100%',
        padding: 10,
        marginTop: 20,
    },
    agreementsContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0

    },
    termsConditionText: {
        color: '#A9A9A9',
        marginLeft: 10,
        fontSize: 16
    }
})