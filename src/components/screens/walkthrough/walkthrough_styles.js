import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = {
    wrapper: {
      // backgroundColor: '#f00'
    },
    nextButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      right:20,
      bottom:65
    },
    PreviosButtonStyles:{
      backgroundColor:'transparent',
      position:'absolute',
      left:20,
      bottom:65
    },
    buttonTextStyles:{
      fontSize:18,
      color:'#808080',
      fontWeight:'bold'
    },
    slide: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      flex: 1,
    },
    imgBackground: {
      width,
      height,
      backgroundColor: 'transparent',
      position: 'absolute'
    },
    registerButtonStyles: {
      
    },
    sliderPageTitleStyle:{
      paddingLeft:15, paddingRight:15, paddingBottom:10,
      fontSize:30, 
      color:'#EA2626',
      textAlign:'center'
    },
    sliderPageDescriptionStyle:{
      fontSize:17, 
      color:'#808080',
      paddingLeft:30, paddingRight:30,
      textAlign:'center', 
      marginBottom:20
    },
    sliderMainContainer: {
      flex:1, 
      marginTop:70
    },
    sliderImageStyle: {
      height:270,
      width:250, 
      alignSelf:'center'
    },
}