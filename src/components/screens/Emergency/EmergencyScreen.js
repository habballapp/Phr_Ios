import React,{Component} from 'react';
import {Textview, Container,Statusbar, Scrollview,Input,Button} from '../../default/';
import {Text,View,Platform, Alert,Linking,ActivityIndicator, TouchableOpacity} from 'react-native'
import { Header, Title,Icon } from 'native-base';
import {Button as NavButton} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SendSMS from 'react-native-sms'
import firebase from 'react-native-firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

var flag = 0;
var emergency_numbers = [];
export default class EmergencyScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            refresh:false,
            isModalVisible: false,
            message:'',
            message1:'I need help',
            numbers: [],
            numberToBeAdded: 0,
            relationToBeAdded:'default',
            defnumberToBeAdded: 555-22-33,
            defrelationToBeAdded:'Rescue',
            // UrgentCareNo:255-55-66,
            // UrgentCareName:this.props.navigation.getParam('urgentcareName')
            PHR : this.props.navigation.getParam('urgentcare')
            

        }
    }
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Emergency Call';
        let drawerIcon= (                            
            <MaterialIcons name="add-alert" size={20} color="blue"/>
        )
        return {drawerLabel, drawerIcon};
    }
    componentDidMount(){
        // console.log("asdasdasd", this.props.navigation.state.params.emergencynumbers)
        this.takeEmergencyNumbers();
        this. ondefNumberChange();
        this.ondefRelationshipChange();
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
    async takeEmergencyNumbers(){
        var tempVar = [];

       
        if(flag==0){
            try {
                let userID = firebase.auth().currentUser.uid;
                var dbref = firebase.database().ref(`users/patients/${userID}/EmergencyContacts/`);
                dbref.on("value", (snapshot)=>{
                    snapshot.forEach((data)=>{
                        tempVar.push(data.val());
                    })  
                    emergency_numbers = tempVar;
                    console.log("emergency numbers", emergency_numbers)
                    if(emergency_numbers!==undefined || emergency_numbers!=='' || emergency_numbers!==null){    
                        this.setState({numbers: emergency_numbers}, ()=>{
                            this.setState({loading:false,refresh: !this.state.refresh})
                        })                        
                    }
                    tempVar = [];
                })   
            } catch (error) {
                
            }
        }
        else{
            this.setState({numbers:emergency_numbers}, ()=>{
                this.setState({loading:false})
            })
        }
    }
    onAddNumberPressed(){
        this.setState({ isModalVisible: true });
    }
    onSavePressed(){
            const newNumbers = {
                relation: this.state.relationToBeAdded,
                number: this.state.numberToBeAdded
                
            }
            this.setState({isModalVisible:false})
            this.setState({loading:true})
            let userID = firebase.auth().currentUser.uid;
            var dbref = firebase.database().ref(`users/patients/${userID}/EmergencyContacts/`);
            let key = dbref.push().key;
            firebase.database().ref(`users/patients/${userID}/EmergencyContacts/`).child(key).set({
                relation: this.state.relationToBeAdded,
                number: this.state.numberToBeAdded,
                default: this.state.defrelationToBeAdded,
                defno:this.state.defnumberToBeAdded

            }).then(()=>{
                flag=0;
                this.setState({ loading:false });
            })
    }
    onCancelPressed(){
        this.setState({ isModalVisible: false });
    }
    onNumberChange(event){
        this.setState({numberToBeAdded:event});
    }

    onRelationshipChange(event){
        this.setState({relationToBeAdded:event});
    }

    ondefNumberChange(){
        this.setState({defnumberToBeAdded:this.state.defrelationToBeAdded});
    }

    ondefRelationshipChange(){
        this.setState({defrelationToBeAdded:this.state.defrelationToBeAdded});
    }
    
    onCallIconPressed(item){
        let Number_ = item.number;
        let phoneNumber = item.number;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${Number_}`;
        }
        else  {
            phoneNumber = `tel:${Number_}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } 
            else {
                return Linking.openURL(phoneNumber);
            }
        })
    }

    onEmergencyIconPressed(){
        let Number_ = 911;
        let phoneNumber = 911;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${Number_}`;
        }
        else  {
            phoneNumber = `tel:${Number_}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } 
            else {
                return Linking.openURL(phoneNumber);
            }
        })
    }


    onHomeIconPressed(){
        let Number_ =this.state.PHR.pnumber;
        let phoneNumber = Number_;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${Number_}`;
        }
        else  {
            phoneNumber = `tel:${Number_}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('Phone number is not available');
            } 
            else {
                return Linking.openURL(phoneNumber);
            }
        })
    }
    onMessageSendPressed(){
        let phoneNumber=[];
        for(var i=0;i<this.state.numbers.length;i++){
            console.log("numbers..",this.state.numbers[i].number)
            phoneNumber.push(this.state.numbers[i].number.toString());
            console.log("phoneNumber:", phoneNumber);
        } 
            SendSMS.send({
                //Message body
                body: this.state.message,
                //Recipients Number
                recipients: phoneNumber,
                //An array of types that would trigger a "completed" response when using android
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {
                if(completed){
                console.log('SMS Sent Completed');
                }else if(cancelled){
                console.log('SMS Sent Cancelled');
                }else if(error){
                console.log('Some error occured');
                }
            });
        }
    onMessageTextChanged(event){
        this.setState({message:event});
    }

    onTemplateMessageChanged(template){

        let phoneNumber=[];
        for(var i=0;i<this.state.numbers.length;i++){
            console.log("numbers..",this.state.numbers[i].number)
            phoneNumber.push(this.state.numbers[i].number.toString());
            console.log("phoneNumber:", phoneNumber);
        } 
            SendSMS.send({
                //Message body
                body: template,
                //Recipients Number
                recipients: phoneNumber,
                //An array of types that would trigger a "completed" response when using android
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {
                if(completed){
                console.log('SMS Sent Completed');
                }else if(cancelled){
                console.log('SMS Sent Cancelled');
                }else if(error){
                console.log('Some error occured');
                }
            });








    }

    render(){
        if(this.state.loading){
            return(
                <ActivityIndicator size="large" animating color="#0000ff" style={{flex:1,alignSelf:'center'}} />
            )
        }
        else{
            return(
                <Container ContainerStyle={{ height:'100%' }}>
                    <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#F08080',marginBottom:10}}>
                        <Statusbar 
                            backgroundColor={'#F08080'}
                            barStyle='light-content'
                        />
                        <TouchableOpacity style={{position:'absolute', left:30}} onPress={() => {this.props.navigation.openDrawer(); } }>
                            <FontAwesome name="bars" size={20} color="white"/>
                        </TouchableOpacity>
                        <Title style={styles.titleStyles}>Emergency Call Setup</Title>
                    </Header>
                    <Container ContainerStyle={{padding:25}} >
                        <Textview text="Enter Text Message below to save:" textStyle={{fontSize:18, color:'black',marginBottom:10}}/>
                        <Container ContainerStyle={{alignItems:'flex-start',height:200, borderColor:'#707070', borderWidth:0.5,}} >
                            <Input 
                                placeholder="Text Message.."
                                placeholderTextColor="#D3D3D3"
                                inputStyle={styles.input}
                                dense={true}
                                onChangeText={(event) => {this.onMessageTextChanged(event)}} 
                            />
        
                        <Container ContainerStyle={{flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
                        <Button title="I need help" style={styles.ModalButton1} textStyle={{fontSize:18, color:'black',marginBottom:10}} onPress={()=>{this.onTemplateMessageChanged('I need help')}}/>
                        <Button title="Please Call!." style={styles.ModalButton2} textStyle={{fontSize:18, color:'black',marginBottom:10}} onPress={()=>{this.onTemplateMessageChanged('Please Call!')}}/>

                        </Container>

                        </Container>
                        <Container ContainerStyle={{marginTop:20,height:100, borderColor:'#707070', borderWidth:0.5,}}>
                            <FlatList
                                data={this.state.numbers}
                                extraData={this.state.numbers}
                                refreshing={this.state.refresh}
                                renderItem={({item,index})=>(
                                    <Container ContainerStyle={{paddingRight:10,paddingLeft:10,height:40,flexDirection:'row', flex:1, alignItems:'center'}}>
                                        <Textview text={item.relation} textStyle={{textAlign:'center',fontSize:18,color:'black',marginRight:20}}/>
                                        <Textview text={item.number} textStyle={{flex:1,fontSize:18,color:'black'}}/>
                                        <NavButton transparent onPress={()=>{this.onCallIconPressed(item)}}>
                                            <FontAwesomeIcon name="phone" size={20}/>
                                        </NavButton>
                                    </Container>
                                )}
                                keyExtractor={(item)=>item.number.toString()}
                            />
                        </Container>
                        <Container ContainerStyle={{width:150,alignItems:'center',justifyContent:'center',marginTop:20,height:40, borderColor:'#707070', borderWidth:0.5,alignSelf:'center'}}>
                            <Button onPress={()=>{this.onAddNumberPressed()}} title="Add Number" textStyle={{fontSize:18, color:'black'}} style={{alignItems:'center',flexDirection:'row'}}>
                                <Icon name="md-add" style={{fontSize:22,alignSelf:'center',marginRight:5}}/>
                            </Button>
                        </Container>
                        <Button onPress={()=>{this.onMessageSendPressed()}} textStyle={{fontWeight: 'bold',color: 'white',fontSize: 22}} title="Send" style={{marginTop: 20,width: '100%',borderRadius: 15,justifyContent: 'center',alignItems: 'center',backgroundColor: '#EA2626',height: 40}}/>
                    

                       

                        <Modal
                            isVisible={this.state.isModalVisible}
                            style={{justifyContent: 'flex-end',}}
                            animationIn="slideInUp"
                            animationOut="slideOutDown"
                            animationInTiming={1000}
                            animationOutTiming={1000}
                            backdropTransitionInTiming={800}
                            backdropTransitionOutTiming={800}    
                            >
                            <Container ContainerStyle={{ backgroundColor: '#fff', padding: 20,height: 300, borderRadius:15 }}>
                                <Input 
                                    placeholder="Enter Number"
                                    placeholderTextColor="#D3D3D3"
                                    keyboardType="number-pad"
                                    inputStyle={styles.inputModal}
                                    onChangeText={(event) => {this.onNumberChange(event)}} 
                                />
                                <Input 
                                    placeholder="Relationship"
                                    placeholderTextColor="#D3D3D3"
                                    inputStyle={styles.inputModal}
                                    onChangeText={(event) => {this.onRelationshipChange(event)}} 
                                />
                            <Container ContainerStyle={{flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
                                <Button title="Save" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onSavePressed()}} />
                                <Button title="Cancel" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onCancelPressed()}} />
                            </Container>
                            </Container>
                        </Modal>
                         
                        <Container ContainerStyle={{flexDirection:'row', alignSelf:'center', alignItems:'center'}}>
                        <Button title="Call 911" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onEmergencyIconPressed()}}/>
                        <Button title="Call Us" style={styles.ModalButton} textStyle={styles.ModalButtonText} onPress={()=>{this.onHomeIconPressed()}}/>
                        </Container>
                    
                    </Container>
                      
                    <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,
                                position:'absolute', bottom:0}}>
                            <Textview >
                                Powered by Matz Solutions Pvt Ltd Ⓒ
                            </Textview>
                        </Container>
                    
                </Container>
            )
    
        }
    }
}
const styles = {
    input: {
        fontSize: 18,
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height:150,
        alignSelf:'flex-start',
        textAlignVertical: 'top'
    },
    titleStyles: {
        fontSize:22, 
        marginLeft:20,
        alignSelf:'center'
    },
    inputModal:{
        borderRadius:10,
        marginBottom:15,
        marginTop:15,
        borderWidth: 1,
        borderColor: '#000',
        fontSize: 18,
        color: '#000',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        height:60,
    },
    ModalButton: {
        marginTop: 15,
        width: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EA2626',
        height: 40,
        marginRight:10,
        marginBottom:180
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
        marginLeft:30,
        marginRight:10,
        marginBottom:60
    },

    ModalButton1: {
        marginTop: 15,
        width: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 40,
        marginRight:10,
        marginBottom:60
    }
}