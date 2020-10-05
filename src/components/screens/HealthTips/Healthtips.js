import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  FlatList,
  ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import {Header, Title, Icon} from 'native-base';
import {Button as NavButton} from 'native-base';
import firebase from 'react-native-firebase';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage'

import {Statusbar, Container, Textview, ImageView} from '../../default';
import Swiper from 'react-native-swiper'

var arr_images = [];
var s = [];


export default class HealthTips extends Component{
    constructor(props){
        super(props);
        // urgentcareid = this.props.navigation.getParam('urgentcareID');
        // if(urgentcareid === undefined)
        // urgentcareid = global.urgentcareid;
        this.state={
            loading:true,
            // urgentcareID: urgentcareid, 
            swiperIndex: 0,
            imagesSlider:[
                require('./tip01.jpg'),
                require('./tip02.jpg'),
                require('./tip03.jpg'),
                require('./tip04.png') 
                
           
            ],
            images: []
        }
        
        

    }
    static navigationOptions = ({navigation}) => {
        let drawerLabel = 'Health Tips';
        let drawerIcon= (                            
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="red"/> 
        )
        return {drawerLabel, drawerIcon};
    }

    componentDidMount(){
        this.setState({loading:true});
		AsyncStorage.getItem("urgentcareid").then((value) => {
			if (value != null) {
				this.setState({ urgentcareID: value })
                this.takeAppointments();
			}
			this.setState({ loading: false })
		});

        

    }

    takeAppointments(){
       // let userID = firebase.auth().currentUser.uid;
       console.log("arr_images",this.state.urgentcareID);
       try {
        var dbref = firebase.database().ref(`users/urgentcare/${this.state.urgentcareID}/splashImages/`);
        dbref.on("value", (snapshot)=>{
            snapshot.forEach((data)=>{
                arr_images.push(data.val())
               // console.log("snapshot urgent care... ",arr_images)
            })
          //  arr_images = snapshot._value;
            console.log("arr_images", arr_images);
            this.setState({images: arr_images}, ()=>{
               
                console.log("arr_images123", this.state.images);
                arr_images = [];
            })                        
        })
        this.setState({loading:false});
           
       } catch (error) {
           
       }
       

        
    }
   
    render(){
        return(
            this.state.loading ? <ActivityIndicator size="large" color='#653dd6' style={{flex:1,alignSelf:'center'}} /> :
            <Container ContainerStyle={{flex:1}}>
                 <Header style={{flexDirection:'row',alignItems:'center',backgroundColor:'#fff',height:70}}>
                    <Statusbar 
                        translucent 
                        backgroundColor='white'
                        barStyle='dark-content'
                    />
                    <NavButton transparent style={{position:'absolute', left:0}} onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon name= {Platform.OS == 'ios' ? "ios-arrow-back" : "md-arrow-back"} color="#0080ff" />
                    </NavButton>
                    <TouchableOpacity onPress={() => { this.props.navigation.openDrawer() }}>
                        <FontAwesome name="bars" style={{ padding: 10, marginLeft: 10 }} size={20} color='#653dd6' />
                    </TouchableOpacity>
                    <Title style={styles.titleStyles}>Health Tips</Title>
                  
                </Header>
                <Container ContainerStyle={{marginTop:50,flex:1,backgroundColor:'#fff',justifyContent:'center',}}>
                    <Container ContainerStyle={{height:450,backgroundColor:'white',justifyContent:'center',width:'100%',alignSelf:'center'}}>
                        <Swiper 
                            autoplay={true}
                            height={250}
                            width={'100%'}
                            dot={<Container></Container>}
                            autoplayTimeout={5}
                            activeDot={<Container></Container>}
                            >
                            {
                                this.state.images.map && this.state.images.map( (item) =>  (
                                    <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                        <ImageView imageStyle={{width:'100%',height:400}} imgSource={ { uri: item.URL } }/>
                                    </Container>
                                    )
                                )
                            }
                            {/* <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip01.jpg')}/>
                            </Container>
                            <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip02.jpg')}/>
                            </Container>
                            <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip03.jpg')}/>
                            </Container>

                            { <Container ContainerStyle={{flex:1, backgroundColor:'white', alignItems:'center',width:'100%'}}>
                                <ImageView imageStyle={{width:'100%',height:400}} imgSource={require('./tip04.png')}/>
                            </Container> } */}

                        </Swiper>
                    </Container>
                </Container>

                <Container ContainerStyle={{alignSelf:'center', justifyContent:'center', flexDirection:'row' ,marginTop:10,
                                position:'absolute', bottom:0}}>
                            <Textview >
                              Powered by Matz Solutions Pvt Ltd Ⓒ
                            </Textview>
                        </Container>
            </Container>
 
        )
    }
}
const styles = StyleSheet.create({
    wrapper: {
       
    },
    slide1: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide2: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    slide3: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    titleStyles: {fontWeight: 'bold',fontSize:26, alignSelf:'center', flex:1,color:'#EA2626'},
  })
