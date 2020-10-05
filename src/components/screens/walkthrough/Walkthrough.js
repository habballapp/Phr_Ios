import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {Statusbar, Container} from '../../default';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import Slider from "./Slider";
import {ActiveDot} from './ActiveDot';
import {InActiveDot} from './InActiveDot';
import {styles} from './walkthrough_styles';
import { FIRST_EVER_APP_START, LOGIN_CHECK } from "../../../constants/StorageConstans";
// import console = require('console');

export default class Walkthrough extends Component {
  data = [
    { 
      title: 'Urgent Care', 
      des: 'Health is Life!',
      lastPageKey: false 
    },
    { 
      title: 'Find the Best Doctors', 
      des: 'We will provide you the best available professionals in your town. Which will eventually save your time.', 
      imageSource: require('../../../../assets/doctor.png'),
      lastPageKey: false
    },
    {
      title: 'Find the Best Medical Centers', 
      des: 'We will provide you the best available professionals in your town. Which will eventually save your time.',
      imageSource: require('../../../../assets/hospital.png'),
      lastPageKey: false
    },
    { 
      title: 'Schedule your Appointment', 
      des: 'You can schedule your appointment anytime from any doctor you may feel comfortable with.',
      imageSource: require('../../../../assets/schedule_appointment.png'),
      lastPageKey: false
    },
    { 
      title: 'Track your Appointments', 
      des: 'You can track the appointments history which you scheduled from any specific doctor.',
      imageSource: require('../../../../assets/schedule_history.png'),
      lastPageKey: true
    }
    
  ]

  constructor(props){
    super(props);
    this.swiper
    this.index = 1
    this.state = { BackShow: false , NextShow:true, StartShow:false }
  }

  swipeEnd(){
    AsyncStorage.setItem(FIRST_EVER_APP_START, 'true').then(() => {
      this.props.navigation.navigate('HomeScreen');
    });
  }

  swipeForward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = targetIndex- currentIndex;
    this.swiper.scrollBy(offset);
  }

  swipeBackward(targetIndex) {
    const currentIndex = this.swiper.state.index;
    const offset = currentIndex - targetIndex;
    this.swiper.scrollBy(offset);
  }

  onIndexChanged = (newIndex) => {
    const { onIndexChanged } = this.props;
    console.log("onIndexChanged>>> this.index>>", this.index);
    console.log("onIndexChanged>>> newIndex>>", newIndex);
    this.index = newIndex+1;
    if(newIndex > 0){ //middle page
      if (newIndex == 4){ //end page
        this.updateStates(false, true);
      }
      else{
        this.updateStates(true, false, true)
      }
    }
    else if (newIndex == 0){ //start page
      this.updateStates(true, false, false)
    }
    if (onIndexChanged) {
        onIndexChanged(newIndex);
    }
  };

  updateStates(nextShow, startShow, backShow = false){
    this.setState({
      NextShow: nextShow,
      StartShow: startShow,
      BackShow: backShow
    })
  }

  render () {
    return (
      <Container ContainerStyle={styles.container}>
          <Statusbar 
          backgroundColor={'#0080ff'}
          barStyle='light-content' />
          <LinearGradient
            colors={['#fff','#fff']}
            style={styles.imgBackground}
          />
          <Swiper style={styles.wrapper}
            dot={<InActiveDot/>}
            activeDot={<ActiveDot/>}
            paginationStyle={{
              bottom: 70
            }}
            ref={component => this.swiper = component}
            showsButtons={false} 
            onIndexChanged={this.onIndexChanged}
            loop={false}>
                {this.data.map((item, key) =>{ return <Slider pageItem={item} key={key} index={this.index}/> })}
          </Swiper>
          {this.state.NextShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeForward(this.index)} >
                  <Text style={styles.buttonTextStyles}>NEXT</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.StartShow ? (
          <TouchableOpacity style={styles.nextButtonStyles} onPress={()=>this.swipeEnd()} >
                  <Text style={styles.buttonTextStyles}>START</Text>
          </TouchableOpacity>
          ) : null }
          {this.state.BackShow ? (
          <TouchableOpacity style={styles.PreviosButtonStyles} onPress={()=>this.swipeBackward(this.index)} >
                  <Text style={styles.buttonTextStyles}>BACK</Text>
          </TouchableOpacity>
          ) : null }
        </Container>
      )
  }
}