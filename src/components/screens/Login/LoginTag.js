import React from 'react';
import { Textview, Container, ImageView } from '../../default/index';
import AppLogo from "../../../assets/logo.png";
import { WELCOME, LOGIN_HEADER } from '../../../res/strings';
import { ImageBackground } from 'react-native';

export const Logintag = () => {
    const { appLogo, loginTagContainer} = styles;
    return (
        <Container ContainerStyle={loginTagContainer}>
            <ImageView 
             
                resizeMode="center"
                imageStyle={appLogo}
                 imgSource={AppLogo} 
                />
            
        </Container>
    )
}

const styles = {
    loginTagContainer: {
        marginTop: 60,
        marginLeft: 30,
        alignItems:'center'
    },
    appLogo: {
        height: 200,
        width: 200,
    },
    headingOne: {
        marginTop: 25,
        fontSize: 24,
        color: 'black'
    },
    headingTwo: {
        fontSize: 16,
        color: 'black'
    }
}