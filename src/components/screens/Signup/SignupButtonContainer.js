import React from "react";
import { Icon, Container, Button } from "../../default";
import { CONTINUE } from "../../../res/strings";

export const SignupButtons = (props) => {
    const { continueSignup, goBack } = props;
    return (
        <Container ContainerStyle={styles.buttonContainer}>
            <Button
                onPress={goBack}
                style={styles.backStyles}>
                <Icon iconName="ios-arrow-back" iconSize={24} color="white" style={{ alignSelf: 'center' }} />
            </Button>
            <Button
                onPress={continueSignup}
                title={CONTINUE}
                style={styles.signupNext}
                textStyle={styles.nextButtonText} />
        </Container>
    )
}

const styles = {
    buttonContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginTop:50,
        flexDirection: 'row',
    },
    signupNext: {
        flex: 4,
        borderRadius: 10,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 50,
        marginTop: 20
    },
    backStyles: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#343434',//'red',
        marginRight: 5,
        height: 50,
        marginTop: 20
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 20
    }
}