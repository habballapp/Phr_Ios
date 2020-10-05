import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    scrollViewStyles: {
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'

    },
    input: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        height: 70,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },
    inputText: {
        fontSize: 20,
        color: '#ffffff',
        width: '100%',
        height: 70,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 20,
    },
    loginButtonStyles: {
        marginTop: 25,
        width: '100%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6fd355',
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#6fd355'

    },
    insuranceButtonStyles: {
        marginTop: 25,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#0000FF',
        flexDirection: 'row',
        height: 50,
        shadowColor: 'rgba(46, 229, 157, 0.4)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 13 },
        color: '#FFFFFF'

    },

    homeButtonStyles: {

        borderWidth: 1.5,
        borderRadius: 10, borderColor: 'black',
        backgroundColor: '#0000FF',
        height: 80,
        width: 150,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(46, 229, 157, 0.4)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 13 },
        color: '#FFFFFF'
    },
    insuranceButtonText: {
        fontWeight: 'bold',
        color: '#653dd6',
        fontSize: 16,
        marginLeft: 10,
        alignSelf:'center'
    },

    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
       

    },

    loginButtonText1: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
        marginLeft: '20%'


    },

    loginButtonText2: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 12
    },
    lineStyle: {
        borderBottomColor: '#EA2626',
        borderBottomWidth: 3,
        width: 70,
        marginLeft: 30,
        marginTop: 10
    },
    forgetPasswordButton: {
        marginTop: 15,
    },
    forgetPasswordStyle: {
        marginTop: 10,
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
    signup: {
        marginTop: 15,
        // marginBottom:70
    },
    signuphere: {
        fontSize: 18,
        color: '#0080ff',
        fontWeight: 'bold',
    },
    invalidInputStyles: {
        marginTop: 5,
        alignSelf: 'center',
        color: 'red'
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 50, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 40 },
    text: { textAlign: 'center' }
})