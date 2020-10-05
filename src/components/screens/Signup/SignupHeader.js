import React from "react";
import { Textview, ImageView, Container } from "../../default";
import AppLogo from "../../../../assets/logo.png";
import { CREATE_ACCOUNT } from "../../../res/strings";

export const SignupHeader = () => (
    <Container>
        <ImageView
            imageStyle={styles.appLogo}
            resizeMode="center"
            imgSource={AppLogo} />
        <Textview text={CREATE_ACCOUNT} textStyle={styles.textStyle} />
    </Container>
)

const styles = {
    appLogo: {
        alignSelf: 'center',
        marginTop: 80,
        width: 100,
        height: 100
    },
    textStyle: {
        alignSelf: 'center',
        color: '#575C62',
        fontSize: 20,
    }
}