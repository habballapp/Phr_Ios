import React, { Component } from 'react';
import { Container, Textview, Input, Button,Statusbar, ImageView } from '../../default';
import {FlatList,ActivityIndicator, TouchableOpacity,Linking,Text} from 'react-native'
import {Header, Title,} from 'native-base';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {RNCamera} from 'react-native-camera'
import Modal from "react-native-modal";
import DocumentPicker from 'react-native-document-picker';
import AudioRecord from 'react-native-audio-record';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

var message_array = [];
var flag = 0;
var audioFile = '';

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            messages: [],
            send_message: '',
            capture_image:'',
            cameraOpen: false,
            confirmsend:false,
            imageType:false,
            recording: false,
            stoppedRecording: false,
            hasPermission: undefined,
            currentTime: 0.0,
            voiceRecorderOpen:false,
            curTime:0,
            counter:0,
            AnimatedEllipsis:false
        }
    }
      
    componentDidMount(){
        this.takeMessages();
        console.log("This Old Screen")
        
    }
    async takeMessages(){
        if(flag==0){
            var userId = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userId}/messages/`);
            dbref.on("value", (snapshot)=>{
                snapshot.forEach((data)=>{
                    message_array.push(data.val())
                })  
                if(message_array!==undefined || message_array!=='' || message_array!==null){
                    this.reverseObject(message_array);
                }
                message_array = [];
            })
        }
        else{
            this.setState({messages:message_array},()=>{
                this.setState({loading:false})
            })
        }
        
    }
    reverseObject(object) {
        var newObject = [];
        var j=0;
        for (var i = object.length - 1; i >= 0; i--) {
                newObject[i]= object[j];
                j++;
        }    
        if(newObject !==undefined || newObject!=='' || newObject!==null){
            this.setState({messages:newObject},()=>{
                this.setState({loading:false})
            })    
        }
    }
    onMessageChange(event){
        this.setState({send_message:event});
    }
    onSendMessage = () => {
        if(this.state.send_message!=''){
            var today = new Date();
            var time = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
    
            var hour = time.getHours();
            var minutes = time.getMinutes();
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
            }
            if (hour.toString().length == 1) {
                hour = "0" + hour;
            }

            time = hour + ':' + minutes + " " + ampm;
    
            this.setState({loading:true})
            let userID = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userID}/messages/`);
            let key = dbref.push().key;
            firebase.database().ref(`users/patients/${userID}/messages/`).child(key).set({
                from: 'User',
                message_text: this.state.send_message,
                date: today,
                time: time
            }).then(()=>{
                flag=0;
                this.setState({send_message:'',loading:false})
            })    
        }
    }
    downloadDocument(message_uri){
        const url = message_uri;
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }
    renderRow = ({ item }) => {
        var check = 0;
        if(item.message_uri != undefined){
            var temp = item.message_uri;
            if(typeof item.message_uri.split('?') !== undefined)
                temp = item.message_uri.split('?')[0];
            temp = temp.split('/')[temp.split('/').length-1];
            typeOfUri = temp;
            var httpsReferenceName = temp;
            httpsReferenceName = httpsReferenceName.split('.')[0];
            typeOfUri = typeOfUri.split('.')[1];
            httpsReferenceName = httpsReferenceName.replace(/[^a-zA-Z ]/g, '');
            httpsReferenceName = httpsReferenceName+"."+typeOfUri;
            if(typeOfUri == 'jpeg' || typeOfUri == 'jpg' || typeOfUri == 'png' || typeOfUri == 'gif' || typeOfUri == 'bmp'){
                check = 1;
            }
        }
        return (
            <Container ContainerStyle={{
                flexDirection: 'row',
                width: '70%',
                alignSelf: item.from === 'Admin' ? 'flex-start' : 'flex-end',
                backgroundColor: item.from === 'Admin' ? '#5abeff' : '#20b2aa',
                borderRadius: 10,
                marginBottom: 10,
                padding:5,
                transform: [{ scaleY: -1 }]
            }}>
                {item.message_uri == undefined ?   
                    <Container>
                        <Textview
                        text={item.message_text}
                        textStyle={{
                            color: '#fff',
                            padding: 5,
                            fontSize: 18,
                            flex:1
                        }}
                        />
                    <Textview
                        text={item.time}
                        textStyle={{
                            color: '#fff',
                            padding: 5,
                            fontSize: 13,
                            alignSelf:'flex-end'
                        }}
                    />
                    </Container>
                :
                check==1  ? 
                    <Container ContainerStyle={{height: 200,width: '100%'}}>
                        <ImageView 
                            resizeMode="contain"
                            imageStyle={{height: 170,width: '100%',alignSelf:'center'}}
                            imgSource={{uri:item.message_uri}}
                        />
                        <Textview
                            text={item.time}
                            textStyle={{
                                color: '#fff',
                                padding: 5,
                                fontSize: 13,
                                alignSelf:'flex-end'
                            }}
                        />
                    </Container>
                    :
                    <Container>
                        <Button onPress={()=>{this.downloadDocument(item.message_uri)}}>
                            <Icon name="md-document" size={40} color="black"/>
                        </Button>
                        <Textview
                            text={httpsReferenceName}
                            textStyle={{
                                color: '#fff',
                                padding: 5,
                                fontSize: 16,
                                alignSelf:'flex-start'
                            }}
                        />
                        <Textview
                            text={item.time}
                            textStyle={{
                                color: '#fff',
                                padding: 5,
                                fontSize: 13,
                                alignSelf:'flex-end'
                            }}
                        />
                    </Container>
                }
            </Container>
        )
    }
    
    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        this.setState({capture_image:data.uri},()=>{
            if(data !== null || data !== '' || data !== undefined){
                camera_capture = data;
                this.setState({cameraOpen:false},()=>{
                    this.setState({confirmsend:true});
                    console.log("image data",data.uri)
                })
            }
        });
    };
    renderCamera(){
        this.setState({cameraOpen:true})
    }
    async attachFile(){
        try {
            const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
            });
            var today = new Date();
            var time = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;

            var hour = time.getHours();
            var minutes = time.getMinutes();
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
            }
            if (hour.toString().length == 1) {
                hour = "0" + hour;
            }

            time = hour + ':' + minutes + " " + ampm;

            this.setState({loading:true})

            let userID = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userID}/messages/`);
            let key = dbref.push().key;
            
            var uploadTask = firebase.storage().ref(`/${res.name}`).put(res.uri);
            var refTemp = firebase.storage().ref(`/${res.name}`);

            uploadTask.on('state_changed', function(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
            }, function(error) {
            }, function() {
                refTemp.getDownloadURL().then(function(downloadURL) {
                    downloadURLGlobal = downloadURL;

                    firebase.database().ref('users/patients/' + userID + '/messages/').push({
                        from: 'User',
                        message_uri: downloadURLGlobal,
                        date: today,
                        time: time
                    });
                });
            });


        } catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
            //If user canceled the document selection
            alert('Canceled from single doc picker');
            } else {
            //For Unknown Error
            alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
            }
        }
    }
    onSendImage(){
        this.setState({confirmsend:!this.state.confirmsend})
        console.log("send image...")
        if(this.state.capture_image!=''){
            var today = new Date();
            var time = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
    
            var hour = time.getHours();
            var minutes = time.getMinutes();
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12;
            if (minutes.toString().length == 1) {
                minutes = "0" + minutes;
            }
            if (hour.toString().length == 1) {
                hour = "0" + hour;
            }

            time = hour + ':' + minutes + " " + ampm;
    
            this.setState({loading:true})
            let userID = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userID}/messages/`);
            let key = dbref.push().key;
            var filename = time+hour+".jpg"
            var uploadTask = firebase.storage().ref(`/${filename}`).put(this.state.capture_image);
            var refTemp = firebase.storage().ref(`/${filename}`);
            uploadTask.on('state_changed', function(snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                }
            }, function(error) {
                    // Handle unsuccessful uploads
            }, function() {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                refTemp.getDownloadURL().then(function(downloadURL) {
                    downloadURLGlobal = downloadURL;
    
                    firebase.database().ref('users/patients/' + userID + '/messages/').push({
                        from: 'User',
                        message_uri: downloadURLGlobal,
                        date: today,
                        time: time
                    });
                });
            });
        }    
    }

    async onVoiceRecordPress(){
        this.setState({voiceRecorderOpen:true,AnimatedEllipsis:true})
        
        const options = {
            sampleRate: 16000,  // default 44100
            channels: 1,        // 1 or 2, default 1
            bitsPerSample: 16,  // 8 or 16, default 16
            audioSource: 6,     // android only (see below)
            wavFile: 'test.wav' // default 'audio.wav'
        };
        AudioRecord.init(options);
        AudioRecord.start();
    }

    async onVoiceRecordRelease(){
        AudioRecord.stop();
        audioFile = await AudioRecord.stop();
        console.log("onVoiceRecordRelease : ",audioFile)
        var today = new Date();
        var time = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        var hour = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }
        if (hour.toString().length == 1) {
            hour = "0" + hour;
        }

        time = hour + ':' + minutes + " " + ampm;

        this.setState({voiceRecorderOpen:false},()=>{
            this.setState({loading:true})
        })

        let userID = firebase.auth().currentUser.uid;
        var dbref = firebase.database().ref(`users/patients/${userID}/messages/`);
        let key = dbref.push().key;
        var audioname = time+hour+".aav"
        var uploadTask = firebase.storage().ref(`/${audioname}`).put(audioFile);
        var refTemp = firebase.storage().ref(`/${audioname}`);
        uploadTask.on('state_changed', function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("uploading in progress... completed: ",progress)
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    break;
            }
        }, function(error) {
                // Handle unsuccessful uploads
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            refTemp.getDownloadURL().then(function(downloadURL) {
                downloadURLGlobal = downloadURL;

                firebase.database().ref('users/patients/' + userID + '/messages/').push({
                    from: 'User',
                    message_uri: downloadURLGlobal,
                    date: today,
                    time: time
                });
            });
        });
    }
    render() {   
        return (
            this.state.loading ? <ActivityIndicator size="large" color='#653dd6' style={{flex:1,alignSelf:'center'}} /> :
                this.state.cameraOpen ? 
                    <Container ContainerStyle={{flex:1}}>
                        <RNCamera
                            style={{flex: 1,justifyContent: 'flex-end',alignItems: 'center',}}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                        >
                            {({ camera, status }) => {
                                if (status !== 'READY') return <ActivityIndicator size="large" color="#0000ff" style={{flex:1,alignSelf:'center'}} />;
                                return (
                                    <Container ContainerStyle={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this.takePicture(camera)} style={{flex: 0,backgroundColor: '#fff',borderRadius: 5,padding: 15,paddingHorizontal: 20,alignSelf: 'center',margin: 20,}}>
                                            <Textview text="Capture" textStyle={{ fontSize: 18 }}/>
                                        </TouchableOpacity>
                                    </Container>
                                );
                            }}
                        </RNCamera>
                    </Container>
                    :
                    <Container ContainerStyle={{ flex: 1 }}>
                        <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                            <Statusbar
                                translucent 
                                backgroundColor='white'
                                barStyle='dark-content'
                            />
                            <Title style={styles.titleStyles}>Chat</Title>
                        </Header>
                        <FlatList
                            style={{padding:10,flex:1,transform: [{ scaleY: -1 }]}}
                            data={this.state.messages}
                            extraData={this.state}
                            renderItem={this.renderRow}
                            keyExtractor={(item, index) => index.toString()}

                        />
                        <Container ContainerStyle={{ marginTop:10,marginBottom:10,marginLeft:10,flexDirection: 'row', alignItems: 'center' }}>
                            <Container ContainerStyle={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:20,borderWidth:0.5,borderColor:'black',borderRadius:10,}}>
                                <Input
                                    placeholder="Enter Message to Send"
                                    inputStyle={{flex:1,marginRight:20}} 
                                    onChangeText={(event) => {this.onMessageChange(event)}} />
                                <Button style={{marginRight:10}} onPress={()=>this.attachFile()}>
                                    <Icon name="md-attach" color= {"#EA2626"} size={30}/>
                                </Button> 
                                <Button style={{marginRight:10}} onPress={()=>this.renderCamera()}>
                                    <Icon name="md-camera" color= {"#EA2626"} size={30}/>
                                </Button>      
                            </Container>
                            {this.state.send_message === '' ?  
                            <Container ContainerStyle={{marginRight:10,borderRadius:50,justifyContent:'center',alignItems:'center',backgroundColor:'#0080ff'}}>
                                <TouchableOpacity onPressIn={()=>{this.onVoiceRecordPress()}} onPressOut={()=>{this.onVoiceRecordRelease()}} >
                                    <MaterialIcons name="keyboard-voice" color="white" size={30}/>
                                </TouchableOpacity>
                            </Container> :
                            <Button style={{marginRight:10}} onPress={this.onSendMessage}>
                                <Icon name="md-send" color='#653dd6' size={30}/>
                            </Button>}
                        </Container>
                        <Modal
                            isVisible={this.state.voiceRecorderOpen}
                            style={{justifyContent: 'flex-end'}}
                            transparent={true}
                            animationIn="fadeInLeftBig"
                            animationOut="fadeInRightBig"
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            >
                                <Container ContainerStyle={{flexDirection:'row',borderRadius:15,backgroundColor: '#fff',height:70,width:'90%',padding:20,alignItems:'center',alignSelf:'center'}}>
                                    <Text style={{fontSize:18,marginLeft:30}}>
                                        Recording 
                                    </Text>
                                    <Container ContainerStyle={{marginLeft:-10,flex:1,height:70,padding:30,alignSelf:'center',justifyContent:'center'}}>
                                        <AnimatedEllipsis 
                                            numberOfDots={3}
                                            minOpacity={0}
                                            animationDelay={200}
                                            style={{
                                                color: '#0000ff',
                                                fontSize: 60,
                                                letterSpacing: -5,
                                                marginBottom:35,
                                            }}
                                            isVisible={this.state.AnimatedEllipsis}
                                        />
                                    </Container>
                                </Container>
                        </Modal>
                        <Modal
                            isVisible={this.state.confirmsend}
                            style={{justifyContent: 'flex-end',}}
                                
                            >
                                <Container ContainerStyle={{flexDirection:'column',backgroundColor: '#fff', padding: 20,height: 500, width:'90%',borderRadius:15,alignSelf:'center'}}>
                                    <ImageView
                                        resizeMode="stretch"
                                        imageStyle={{flex:1,zIndex:0,height:450,width: '100%',borderRadius:15}}
                                        imgSource={{uri:this.state.capture_image}}
                                    />
                                    <Container ContainerStyle={{position:'absolute',bottom:15,right:15,zIndex: 1,height:50,width:50,borderRadius:50,alignSelf:'flex-end',justifyContent:'center',alignItems:'center',backgroundColor:'#0080ff'}}>
                                        <Button onPress={()=>{this.onSendImage()}}>
                                            <Icon name="md-send" style={{marginLeft:5}} color= {"#fff"} size={35}/>
                                        </Button>
                                    </Container>
                                </Container> 
                        </Modal>
                    </Container>
        )
    }
}
const styles = {
    titleStyles: {fontSize:26, alignSelf:'center', flex:1,color:'#000'},
    loginButtonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
        alignSelf:'center',
        textAlign:'center'
    },
    appLogo: {
        height: 100,
        width: 100,
        alignSelf:'center'
    },
}