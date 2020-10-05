import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform,Image } from 'react-native';
import {Container, Statusbar, Textview, Button} from '../../default';
import {Header, Title} from 'native-base';
import {Button as NavButton} from 'native-base';
import { TouchableOpacity, } from 'react-native';
import MapView from 'react-native-maps';
import Autocomplete from 'react-native-autocomplete-input';
import { Keyboard } from 'react-native';
import firebase from 'react-native-firebase';
import { LOGIN_CHECK } from '../../../constants/StorageConstans';
import AsyncStorage from '@react-native-community/async-storage'
import GetLocation from 'react-native-get-location';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert} from 'react-native';

var i = 0;
var uc_data = [];
var urgentcares = [];
var copyDoctorsList = [];
var dotImage = require('./clinic.png');

class Doctors extends Component{

    constructor(props) {
        super(props);
    
        this.onAutoCompleteListPressed = this.onAutoCompleteListPressed.bind(this);

        this._mapview = null;

        console.ignoredYellowBox = ['VirtualizedList: missing keys'];

        this.state = {
            search: '',
            doctorsList: [],
            addFilters:false,
            modalVisible:false,
            close:false,
            loading:false,
            longitude:0,
            latitude:0
          };

      }

      _menu = null;
 
      setMenuRef = ref => {
        this._menu = ref;
      };
     
      hideMenu = () => {
          AsyncStorage.getItem(LOGIN_CHECK).then((value) => {
              if (value != null) {
                  firebase.auth().signOut().then(()=>{
                      this._menu.hide();
                      AsyncStorage.setItem(LOGIN_CHECK, '').then(() => {
                          this.props.navigation.goBack();
                      });  
                    //   this.props.navigation.navigate("Home")
                  }).catch(()=>{
                      this._menu.hide();
                      Alert.alert("You are not signed in.")
                  });
              }
              else{
                  this._menu.hide();
              }
          });
      };
     
      showMenu = () => {
        this._menu.show();
      };
     
      updateSearch = (search) => {

       
        this.setState({close:false,search:search})
        let doctor = copyDoctorsList.filter((item) => {
            // return String(item.first_name.toLowerCase()).includes(search.toLowerCase())
            return String(item.first_name.toLowerCase()).startsWith(search.toLowerCase())
        })
        this.setState({
            doctorsList: doctor
        })
    }
    AddFilters() {
        console.log(this.state.addFilters)
        
    }
    getUCdata(){
         
        this.setState({loading:true})
        try {
             
        var dbref = firebase.database().ref(`users/urgentcare/`);
        dbref.on("value", (snapshot)=>{
            snapshot.forEach((data)=>{
                uc_data.push(data.val())
                console.log("snapshot urgent care... ", uc_data)
            })
          
          
           function compare(a, b) {
            if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) return 1;
            if (b.first_name.toLowerCase() > a.first_name.toLowerCase()) return -1;
          
            return 0;
          }

            urgentcares = uc_data.sort(compare);
            uc_data = [];
           
                
                if(urgentcares != null && urgentcares != undefined && urgentcares != ''){
                    copyDoctorsList = urgentcares
                    this.setState({doctorsList:uc_data},()=>{
                        GetLocation.getCurrentPosition({
                            enableHighAccuracy: true,
                            timeout: 15000,
                        })
                        .then(location => {
                            this.setState({latitude:location.latitude,longitude:location.longitude},()=>{
                                this.setState({loading:false});
                                this.geoDistance(this.state.latitude, this.state.longitude);
                            });
                        }) .catch((error) => {
                            Alert.alert("Location Not Available","Please Turn On Your Location To Proceed");
                            
                        })
                    });
                }
              
          
        }) 
        } catch (error) { 
           
        }
        

        console.log("urgent care", urgentcares)
    }
    componentDidMount(){
        this.getUCdata();
        console.log("props... ", this.state.doctorsList)
    }

    radian2Degree(angle) {
        return angle * 57.29577951308232;
    }
    
    degree2Radians(angle) {
        const pi = Math.PI;
        return angle * (pi/180);
    }

    geoDistance(userLatitude, userLongitude){
        const searchingRadius = 4000;
        const earthRadius = 6371;
        const maxLatitude = userLatitude + this.radian2Degree(searchingRadius/earthRadius);
        const minLatitude = userLatitude - this.radian2Degree(searchingRadius/earthRadius);
        const maxLongitude = userLongitude + this.radian2Degree(Math.asin(searchingRadius/earthRadius) / Math.cos(this.degree2Radians(userLatitude)));
        const minLongitude = userLongitude - this.radian2Degree(Math.asin(searchingRadius/earthRadius) / Math.cos(this.degree2Radians(userLatitude)));
        
        this.filterMarkers(maxLatitude,minLatitude,maxLongitude,minLongitude);
    }

    filterMarkers(maxLatitude,minLatitude,maxLongitude,minLongitude){

      
        let doctor = copyDoctorsList.filter((item) => {
            if(item.lat <= maxLatitude && item.lat >= minLatitude && item.lng <= maxLongitude && item.lng >= minLongitude){
                return item;
            }
        })
        this.setState({
            doctorsList: doctor
        })
    }
      
    
    findList(search){
        if(search == ''){
            return [];
        }
        return this.state.doctorsList;
    }

    onAutoCompleteListPressed(item){
        Keyboard.dismiss();
        this.setState({search: item.first_name, close:true}, () => {
            this._mapview.animateToRegion({
                latitude: item.lat,
                longitude:item.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121
            },1000)  
        })
    }

    markerPressed(marker,index){
        console.log("marker data",marker)
        this.props.navigation.navigate("Home",{'urgent_care_data':marker})
       
    }
    
    render(){
        if(this.state.loading){
            return null;
        }
        else{
            return(
                <Container style={{flex:1, backgroundColor:'grey'}}>
                    <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                        <Statusbar 
                            backgroundColor={'white'}
                            barStyle='dark-content'
                        />
                        <Title style={styles.titleStyles}>Find Urgent Cares</Title>
                        
                    </Header>  

                    <Container ContainerStyle={{                 
                        flex: 1,
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 75,
                        zIndex: 1,
                        }} >
                        <Autocomplete
                        placeholder="Search for Urgent Cares"
                        onChangeText={this.updateSearch}
                        defaultValue={this.state.search}
                        containerStyle={{alignSelf:'center',width:'95%',borderTopWidth: 0,borderBottomWidth: 0}}
                        data={this.findList(this.state.search)}
                        keyExtractor={(item,index)=>item.key.toString()}
                        renderItem={({ item }) => (
                            //you can change the view you want to show in suggestion from here
                            <Container ContainerStyle={{flex:1,width:'100%',height:50,borderTopWidth: 0,borderBottomWidth: 1}}>
                                <TouchableOpacity onPress={() => this.onAutoCompleteListPressed(item)}>
                                    <Textview textStyle={{fontSize:20,color:'black'}} text={item.first_name}/>
                                </TouchableOpacity>
                            </Container>
                        )}
                        hideResults={this.state.close}
                        />
                    </Container>
                    <MapView
                        style={styles.map}
                        ref={(mapview) => this._mapview = mapview}
                        region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                        }}
                        scrollEnabled={true}
                        zoomEnabled={true}
                        rotateEnabled={true}
                    >
                    {
                        this.state.doctorsList[0] != null && this.state.doctorsList.map((marker, index) => (
                        <MapView.Marker
                            // source={dotImage}
                            // style={{height: 6, width: 6}}
                            key = {index}
                            coordinate = {{
                                latitude: marker.lat,
                                longitude: marker.lng
                            }}   
                        >
                             <Image source={dotImage} style={{height: 50, width:50 }} />
                            <MapView.Callout tooltip={true} onPress={()=>{this.markerPressed(marker,index)}}>
                                <Container ContainerStyle={{height:230, width:230, alignnItems:'center',borderWidth:3,borderColor:'#0080ff', justifyContent:'center', backgroundColor:'white', borderRadius:250}}>
                                    <Container ContainerStyle={{alignSelf:'center',alignItems:'center'}}>
                                        <Textview textStyle={{fontSize:16, marginBottom:10}} text={marker.first_name}/>
                                        <Textview textStyle={{fontSize:16, marginBottom:10}} text={marker.pnumber}/>
                                        <Button textStyle={{fontSize:14, marginBottom:10, textAlign:'center'}} 
                                        style={{}}
                                        title={"Tap Here to Book"}/>
                                    </Container>                                                              
                                </Container>
                            </MapView.Callout>
                        </MapView.Marker>
                        ))
                    }
                    </MapView>
                </Container>
            )
        }
    }
}

export default Doctors;

const styles = {
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#EA2626'},
    container: {
    },
    map: {
        width:'100%',
        height:'100%'
    },
    // titleStyles: {fontSize:24, alignSelf:'center'}

   };