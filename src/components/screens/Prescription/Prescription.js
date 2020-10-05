import React, { Component } from 'react';
import { Textview, Container, ImageView, Statusbar, Scrollview, Input, Button } from '../../default';
import { Text, View, Platform, TouchableOpacity } from 'react-native'
import { Icon, Header, Title, } from 'native-base';
import { Button as NavButton } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase'




var flag = 0;
var medicines = [];

export default class Prescription extends Component {
    state = {
        loading: true,
        isModalVisible: false,
        medicine: '',
        refresh: false,
        medicineno: []
    };
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Our Services';
        let drawerIcon = (
            <FontAwesome name="handshake-o" size={20} color="red" />
        )
        return { drawerLabel, drawerIcon };
    }
    // _head(item){
    //     return(
    //         <Container ContainerStyle={{borderRadius:10,height:50,backgroundColor:'#EA2626',marginBottom:2,justifyContent:'center'}}>
    //           <Text style={styles.title}>{item.title}</Text>
    //         </Container>
    //     );
    // }

    // _body(item){
    //     return (
    //         <View style={{padding:10}}>
    //           <Text style={styles.description}>{item.body}</Text>
    //         </View>
    //     );
    // }

    onAddPrescription() {
        this.setState({ isModalVisible: true });
    }

    onMedicineChange(event) {

        this.setState({ medicine: event });
    }

    onSavePressed() {
        // const Messages = {
        //     relation: this.state.relationToBeAdded,
        //     number: this.state.numberToBeAdded

        // }
        //  console.log("In saved pressed")
        this.setState({ isModalVisible: false })
        this.setState({ loading: true })
        let userID = firebase.auth().currentUser.uid;
        var dbref = firebase.database().ref(`users/patients/${userID}/Prescription/`);
        let key = dbref.push().key;
        firebase.database().ref(`users/patients/${userID}/Prescription/`).child(key).set({

            medicine: this.state.medicine

        }).then(() => {
            flag = 0;
            this.setState({ loading: false });
        })
    }
    onCancelPressed() {
        this.setState({ isModalVisible: false });
    }


    componentDidMount() {
        // console.log("asdasdasd", this.props.navigation.state.params.emergencynumbers)
        this.takeMedicines();

        // flag=1;
        // this.updateState(flag);
    }
    uniqBy(a, key) {
        var index = [];
        return a.filter(function (item) {
            var k = key(item);
            return index.indexOf(k) >= 0 ? false : index.push(k);
        });
    }
    async takeMedicines() {
        var tempVar = [];


        if (flag == 0) {
            try {
                let userID = firebase.auth().currentUser.uid;
                var dbref = firebase.database().ref(`users/patients/${userID}/Prescription/`);
                dbref.on("value", (snapshot) => {
                    snapshot.forEach((data) => {
                        tempVar.push(data.val());
                    })
                    medicines = tempVar;
                    console.log("medicines", medicines)
                    if (medicines !== undefined || medicines !== '' || medicines !== null) {
                        this.setState({ medicineno: medicines }, () => {
                            this.setState({ loading: false, refresh: !this.state.refresh })
                        })
                    }
                    tempVar = [];
                })
            } catch (error) {

            }
        }
        else {
            this.setState({ medicineno: medicines }, () => {
                this.setState({ loading: false })
            })
        }
    }



    render() {
        return (
            <Container ContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
                <Header style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', height: 70, marginBottom: 25 }}>
                    <Statusbar
                        translucent
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <NavButton transparent style={{ position: 'absolute', left: 0 }} onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name={Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} color="#0080ff" />
                    </NavButton>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginLeft: 10 }} size={20} color='#653dd6' />
                    </TouchableOpacity>
                    <Title style={styles.titleStyles}>Add Prescription</Title>

                </Header>
                <Container ContainerStyle={{ marginTop: 20, height: 260, borderColor: '#707070', borderWidth: 0.5, marginLeft: 30, marginRight: 30 }}>
                    <FlatList
                        data={this.state.medicineno}
                        extraData={this.state.medicineno}
                        refreshing={this.state.medicineno}
                        renderItem={({ item, index }) => (
                            <Container ContainerStyle={{ paddingRight: 10, paddingLeft: 10, height: 40, flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                <Textview text={item.medicine} textStyle={{ textAlign: 'center', fontSize: 18, color: 'black', marginRight: 20 }} />

                            </Container>
                        )}
                    //   keyExtractor={(item)=>item.number.toString()}
                    />
                </Container>

                <Container ContainerStyle={{ width: 180, alignItems: 'center', justifyContent: 'center', marginTop: 20, height: 60, borderColor: '#707070', borderWidth: 0.5, alignSelf: 'center', backgroundColor: '#EA2626', borderRadius: 15 }}>
                    <Button onPress={() => { this.onAddPrescription() }} title="Add Prescription" textStyle={{ fontSize: 18, color: 'white', justifyContent: 'center' }} style={{ alignItems: 'center', flexDirection: 'row' }}>
                        {/* <Icon name="md-add" style={{fontSize:20,alignSelf:'center',marginRight:5,backgroundColor:'#fff'}}/> */}
                    </Button>
                </Container>


                <Modal
                    isVisible={this.state.isModalVisible}
                    style={{ justifyContent: 'flex-end', }}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={800}
                    backdropTransitionOutTiming={800}
                >
                    <Container ContainerStyle={{ backgroundColor: '#fff', padding: 20, height: 300, borderRadius: 15, marginLeft: 20, marginRight: 20 }}>
                        <Input
                            placeholder="Enter Medicine"
                            placeholderTextColor="#D3D3D3"
                            inputStyle={styles.inputModal}
                            onChangeText={(event) => { this.onMedicineChange(event) }}
                        />

                        <Container ContainerStyle={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                            <Button title="Save" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={() => { this.onSavePressed() }} />
                            <Button title="Cancel" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={() => { this.onCancelPressed() }} />
                        </Container>
                    </Container>
                </Modal>


                <Container ContainerStyle={{
                    alignSelf: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10,
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
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    title: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
    },

    inputModal: {
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height: 60,
    },
    ModalButton: {
        marginTop: 15,
        width: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 40,
        marginRight: 10,
        marginBottom: 10
    },
    ModalButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18
    },

    ModalButton2: {
        marginTop: 15,
        width: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 40,
        marginLeft: 30,
        marginRight: 10,
        marginBottom: 10
    },
    description: {
        fontSize: 19,
        color: 'grey',
        paddingTop: 10
    },
    titleStyles: { fontWeight: 'bold', fontSize: 26, alignSelf: 'center', flex: 1, color: '#EA2626' },

}