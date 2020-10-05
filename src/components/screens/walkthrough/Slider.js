import React from 'react'
import {styles} from './walkthrough_styles';
import {Container, Textview, Button, ImageView} from '../../default';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
// import console = require('console');

export default Slider = (props) => {
    const { title, des, imageSource, lastPageKey } = props.pageItem;

    // if(lastPageKey){
    //    return(<LastPage/>)
    // }
    // else{
    //     return(<DescriptionPages title={title} des={des} imageSource={imageSource}/>)
    // }

    return(<DescriptionPages title={title} des={des} imageSource={imageSource}/>)
    
}
const DescriptionPages = (props) => {
    const { title, des, imageSource } = props;
    return(
        <Container ContainerStyle={styles.sliderMainContainer}>
                {/* IMAGE WILL COME HERE DOCTOR LOGO... */}
                <ImageView imageStyle={styles.sliderImageStyle} resizeMode='cover' imgSource={imageSource} />
                <Container ContainerStyle={{padding:15}} ></Container>                   
                <Container ContainerStyle={{flexDirection:'row'}}>
                    <Container ContainerStyle={{alignItems:'center', flex:1, paddingLeft:10, paddingRight:10}}>
                        <Textview textStyle={styles.sliderPageTitleStyle} text={title} />  
                        {/* FIND BEST DOCTORS SMALL TEXT PARAGRAPH... */}
                        <Textview textStyle={styles.sliderPageDescriptionStyle} text={des}/>  
                    </Container>
                </Container>
            </Container>
    )
}
// const LastPage = () => {
//     return(
//         <Container ContainerStyle={{flexDirection:'column', flexGrow:1, justifyContent:'center', alignItems:'center'}}>
//                 <Button
//                     style={{borderRadius: 5,backgroundColor: '#EA2626', height:45, width:270, alignItems:'center', flexDirection:'row'}} 
//                     textStyle={{fontSize:18, color:'white',marginLeft:15}} 
//                     title="Register with Facebook">
//                     <FontAwesomeIcon name = 'facebook' size={25} style={{marginLeft:12, color:'#fff'}} />
//                 </Button>
//                 <Container ContainerStyle={{padding:7}}></Container>
//                 <Button 
//                     style={{borderRadius: 5,backgroundColor: '#EA2626', height:45, width:270, alignItems:'center', flexDirection:'row'}} 
//                     textStyle={{fontSize:18, color:'white',marginLeft:15}} 
//                     title="Register with Google">
//                     <FontAwesomeIcon name = 'google' size={25} style={{marginLeft:12, color:'#fff'}} />
//                 </Button>
//                 <Container ContainerStyle={{padding:7}}></Container>                
//                 <Button
//                     style={{borderRadius: 5,backgroundColor: '#EA2626', height:45, width:270, alignItems:'center', flexDirection:'row'}} 
//                     textStyle={{fontSize:18, color:'white',marginLeft:15}}  
//                     title="Register with Email">
//                     <FontAwesomeIcon name = 'envelope' size={25} style={{marginLeft:12, color:'#fff'}} />
//                 </Button>
//             </Container>
//     )
// }