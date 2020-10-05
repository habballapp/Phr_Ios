import React, { Component } from 'react';
import { Container, Textview, ImageView } from '../../default';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView from 'react-native-maps';
import AppLogo from "../../../../assets/logo.png";
import { StyleSheet, Platform, TouchableOpacity, Text, Linking, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeProvider } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


var arr = [];
export default class OurLocation extends Component {
    constructor(props) {
        super(props);

        urgent_care = global.urgentcare_data;
        this.state = {
            latitude: 24.858017,
            longitude: 66.995622,
            loading: true,
            // urgent_care_data:this.props.navigation.getParam('urgentcare')
            urgent_care_data: urgent_care
        }


    }


    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Our Location';
        let drawerIcon = (
            <MaterialCommunityIcons name="map-marker" size={20} color="red" />
        )
        return { drawerLabel, drawerIcon };
    }
    openMap() {
        if (Platform.OS == 'android') {
            Linking.openURL(`http://maps.google.com/maps?daddr=${this.state.urgent_care_data.lat},${this.state.urgent_care_data.lng}`);
        }
        else {
            Linking.openURL(`http://maps.apple.com/maps?daddr=${this.state.urgent_care_data.lat},${this.state.urgent_care_data.lng}`);
        }
    }
    render() {
        return (
            <Container ContainerStyle={{ flex: 1 }}>
                <Container ContainerStyle={{ justifyContent: 'center', alignSelf: 'center', padding: 20, marginTop: 5, marginBottom: 10 }}>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginRight:"90%"}} size={20} color='#653dd6' />
                    </TouchableOpacity>
                    <ImageView
                        resizeMode="center"
                        imageStyle={styles.appLogo}
                        imgSource={AppLogo}
                    />
                    <Textview textStyle={{ fontSize: 30, color: 'black', fontWeight: 'bold', alignSelf: 'center' }} text="Our Location" />
                </Container>
                <Container ContainerStyle={{ borderColor: 'black', borderWidth: 1.5, overflow: 'hidden', justifyContent: 'center', width: '75%', height: '62%', alignSelf: 'center', padding: 20, borderRadius: 15, marginBottom: 20 }}>
                    <MapView
                        style={[{ ...StyleSheet.absoluteFillObject }, { borderRadius: 10.4 }]}
                        region={{
                            latitude: this.state.urgent_care_data.lat,
                            longitude: this.state.urgent_care_data.lng,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                        scrollEnabled={false}
                        zoomEnabled={false}
                        rotateEnabled={false}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: this.state.urgent_care_data.lat,
                                longitude: this.state.urgent_care_data.lng
                            }}
                        >
                            <MapView.Callout onPress={() => { this.openMap() }}>
                                <TouchableOpacity>
                                    <Icon name="md-navigate" style={{ fontSize: 24 }} />
                                    <Text
                                        style={{ fontSize: 13, fontWeight: "700", lineHeight: 14 }}
                                    >
                                        NAVIGATE
                                    </Text>
                                </TouchableOpacity>
                            </MapView.Callout>
                        </MapView.Marker>
                    </MapView>
                </Container>

                <Container ContainerStyle={{
                        alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 15,
                        position: 'absolute', bottom: 0
                    }}>
                        <Textview >
                            Powered by Matz Solutions Pvt Ltd Ⓒ
                            </Textview>
                    </Container>
                
            </Container>
            
        )
    }
}
const styles = {
    map: {
        width: '90%',
        height: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        shadowOffset: { width: 16.4, height: 1.6 },
        borderColor: 'black',
        borderWidth: 1
    },
    appLogo: {
        height: 100,
        width: 100,
        alignSelf: 'center'
    },
};